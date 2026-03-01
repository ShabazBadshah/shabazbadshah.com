import Image from 'next/image';

export default function About(): JSX.Element {
  return (
    <div className="cursor-default">
      <div className="flex gap-2 items-center mb-4">
        <div className="relative w-10 h-10 rounded-full border border-black overflow-hidden">
          <Image src="/images/avatar.webp" alt="Shabaz Badshah" layout="fill" objectFit="cover" />
        </div>
        <div>
          <h3 className="text-sm font-medium leading-5 text-foreground">Shabaz Badshah</h3>
          <p className="text-sm text-foreground">Technical Product Consultant</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-5.5">
        I integrate product strategy with technical execution to solve impactful business problems.
        Today, I'm focused on advancing healthcare digitization efforts for independent healthcare
        services in Ontario.
      </p>
    </div>
  );
}
