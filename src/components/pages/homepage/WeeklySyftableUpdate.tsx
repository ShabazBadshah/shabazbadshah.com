import { Lightbulb } from 'lucide-react';

import { trackWeeklyUpdateCTAClicked } from '@/analytics/tracking';
import { Button } from '@/components/ui/button';

const WeeklySyftableUpdate = (): JSX.Element => {
  return (
    <div className="flex flex-col-reverse sm:flex-row-reverse flex-wrap sm:flex-nowrap justify-center items-center gap-4">
      <div className="w-full sm:w-1/2">
        <p className="font-bold">
          I'm currently pivoting to Syftable v2
          {/* <Link
            href="https://syftable.com?utm_source=shabazbadshah.com&utm_medium=website_link&utm_campaign=analytics&utm_content=description_blurb"
            className="no-underline"
          >
            <span className="text-primary border-b-2 border-dotted border-black">
              Syftable
            </span>
          </Link> */}
        </p>

        <p className="mt-1">
          A tool to help reduce your cognitive overload with all of your digital data, making it
          easier for you to get your work done faster.
        </p>
        <p className="mt-2 italic">
          Stay tuned to the blog for updates!
          <span className="text-lg">&nbsp;🚀</span>
        </p>
      </div>
      <div className="w-full sm:w-1/2 bg-[#085CC510] p-5 rounded-xl border border-border shadow-[0_1px_5px_-4px_#767676b1,0_4px_8px_#2424240d]">
        <div className="flex flex-row items-center gap-1">
          <Lightbulb className="w-5 h-5 text-primary" />
          <p className="text-lg font-semibold">Weekly Syftable Update</p>
        </div>
        <p className="text-sm font-medium mt-1">May 2025</p>
        <p className="mt-2 leading-[1.4rem]">
          Syftable v1 - the competitor analysis news aggregator is no more. After 4 months of
          supporting it, and slowing traction (thanks ChatGPT), I'm going to pursue some other
          projects.
        </p>

        <Button
          variant="outline"
          size="default"
          className="mt-3 w-full bg-black text-white border-black font-medium rounded-full normal-case hover:text-primary hover:border-[#085CC5] hover:bg-[#085dc515]"
          asChild
        >
          <a
            href="https://shabazbadshah.com/blog/posts/syftable-v1-shutting-down"
            onClick={() => trackWeeklyUpdateCTAClicked()}
          >
            Check out the latest update <span className="text-lg">&nbsp; 👀</span>
          </a>
        </Button>
      </div>
    </div>
  );
};

export default WeeklySyftableUpdate;
