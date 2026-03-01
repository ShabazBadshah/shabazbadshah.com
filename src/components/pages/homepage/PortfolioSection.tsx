import FeaturedWork from './FeaturedWork';
import PortfolioGrid from './PortfolioGrid';

export default function PortfolioSection(): JSX.Element {
  return (
    <div>
      <div className="mb-4 flex flex-col gap-2">
        <span
          data-slot="badge"
          className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-2 py-0.5 whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3 text-foreground [a]:hover:bg-accent [a]:hover:text-accent-foreground text-sm font-normal"
        >
          Portfolio
        </span>
        <h2 className="text-2xl font-semibold">Curated list of works and their impact</h2>
      </div>

      <FeaturedWork />
      <PortfolioGrid />
    </div>
  );
}
