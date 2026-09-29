import { Button } from "../button";
import { PlaybookDemoCard } from "./demo-card";

export default function ScaleOnPressDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Default"
      withLabel="Scale on press"
      contentClassName="flex w-full justify-center"
      without={<Button shape="round">Continue</Button>}
      with={
        <Button shape="round" className="scale-100 active:scale-[0.96] transition-transform duration-150 ease-out">
          Continue
        </Button>
      }
    />
  );
}
