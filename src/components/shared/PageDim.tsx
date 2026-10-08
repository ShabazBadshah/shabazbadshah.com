/** Fixed overlay that dims the page (header included). Render it as a sibling of the element to spotlight, and raise that element above z-[45]. */
const PageDim = ({ active }: { active: boolean }): JSX.Element => (
  <div
    aria-hidden="true"
    className={`pointer-events-none fixed inset-0 z-[45] bg-black/30 transition-opacity duration-300 ${
      active ? 'opacity-100' : 'opacity-0'
    }`}
  />
);

export default PageDim;
