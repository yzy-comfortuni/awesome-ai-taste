import { PlaybookDemoCard } from "./demo-card";

const title =
  "How to ship interface polish without slowing down the rest of the team, even when every stakeholder has a different opinion on what polish means";

function ArticleCard({ clamped = false }: { clamped?: boolean }) {
  return (
    <div className="w-64 text-left">
      <h3
        className={`text-content-primary text-base font-medium leading-snug ${clamped ? "line-clamp-2" : ""}`}
      >
        {title}
      </h3>
      <p className="text-content-secondary mt-2 text-sm">Updated 2 hours ago</p>
    </div>
  );
}

export default function LineClampDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Wraps"
      withLabel="Clamped"
      contentClassName="flex w-full justify-center"
      without={<ArticleCard />}
      with={<ArticleCard clamped />}
    />
  );
}
