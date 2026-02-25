import Image from 'next/image';

export default function About(): JSX.Element {
  return (
    <>
      <div className="flex gap-2 items-center mb-2">
        <div className="relative w-16 h-16 rounded-full border border-black overflow-hidden">
          <Image
            src="https://avatars.githubusercontent.com/u/4944388?v=4"
            alt="Shabaz Badshah"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div>
          <h3 className="text-base font-medium leading-5 text-foreground">Shabaz Badshah</h3>
          <p className="text-sm text-foreground">Technical Product Consultant</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        I integrate product strategy with technical execution to solve impactful business problems.
        Today, I'm focused on advancing healthcare digitization efforts for independent healthcare
        services in Ontario.
      </p>
    </>
  );
}
