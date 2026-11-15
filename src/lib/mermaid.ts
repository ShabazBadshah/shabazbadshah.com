/** The part of mermaid's API used here, typed by hand: its own types need a newer TypeScript */
type Mermaid = {
  initialize: (config: Record<string, unknown>) => void;
  render: (id: string, source: string) => Promise<{ svg: string }>;
};

let count = 0;

/**
 * Draws the ```mermaid code blocks under `root` as diagrams, in the site's colours. Each block is
 * swapped for a container that keeps its source, so a theme change can draw it again. Mermaid is
 * only loaded on a page that has a diagram.
 */
export async function renderDiagrams(root: HTMLElement | null): Promise<void> {
  if (!root) return;
  root.querySelectorAll('pre > code.language-mermaid').forEach((code) => {
    const container = document.createElement('div');
    container.dataset.mermaid = code.textContent ?? '';
    container.className =
      'my-6 flex justify-center overflow-x-auto [&_svg]:h-auto [&_svg]:max-w-full';
    code.parentElement?.replaceWith(container);
  });
  const diagrams = Array.from(root.querySelectorAll<HTMLElement>('[data-mermaid]'));
  if (diagrams.length === 0) return;

  // A string, so TypeScript doesn't load mermaid's types; the bundler still sees 'mermaid'
  const { default: mermaid }: { default: Mermaid } = await import('mermaid' as string);
  const styles = getComputedStyle(document.documentElement);
  const token = (name: string) => styles.getPropertyValue(name).trim();
  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    fontFamily: getComputedStyle(root).fontFamily,
    themeVariables: {
      darkMode: document.documentElement.classList.contains('dark'),
      background: token('--surface'),
      primaryColor: token('--surface'),
      primaryTextColor: token('--text'),
      primaryBorderColor: token('--text-secondary'),
      lineColor: token('--text-secondary'),
      textColor: token('--text'),
      fontSize: '14px'
    }
  });
  for (const diagram of diagrams) {
    const source = diagram.dataset.mermaid ?? '';
    count += 1;
    try {
      diagram.innerHTML = (await mermaid.render(`mermaid-${count}`, source)).svg;
    } catch {
      // A diagram that doesn't parse stays readable as its source
      diagram.textContent = source;
    }
  }
}
