import { useEffect, useState } from "react";
import { PlaybookDemoCard } from "./demo-card";

function CounterValue({
  value,
  tabular,
}: {
  value: number;
  tabular?: boolean;
}) {
  const display = (value % 1000000).toLocaleString();

  return (
    <span
      className={`text-content-primary text-5xl font-medium tracking-tight sm:text-6xl ${tabular ? "tabular-nums" : ""}`}
    >
      {display}
    </span>
  );
}

export default function TabularNumsDemo() {
  const [value, setValue] = useState(9876);

  useEffect(() => {
    const id = window.setInterval(() => {
      setValue((current) => current + 1);
    }, 50);

    return () => window.clearInterval(id);
  }, []);

  return (
    <PlaybookDemoCard
      withoutLabel="Default nums"
      withLabel="Tabular nums"
      contentClassName="flex w-full justify-center"
      without={<CounterValue value={value} />}
      with={<CounterValue value={value} tabular />}
    />
  );
}
