import { PlaybookDemoCard } from "./demo-card";

const items = [
  { title: "Notifications", detail: "Email, push, and in-app alerts" },
  { title: "Privacy", detail: "Who can see your profile and activity" },
];

function SettingsList({ readable = false }: { readable?: boolean }) {
  return (
    <div className="w-72 space-y-4 text-left">
      {items.map((item) => (
        <div key={item.title}>
          <p className="text-content-primary text-sm font-medium">{item.title}</p>
          <p
            className={`mt-0.5 text-sm ${readable ? "text-content-secondary" : "text-content-extra-muted"}`}
          >
            {item.detail}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function TextContrastDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Low"
      withLabel="Readable"
      contentClassName="flex w-full justify-center"
      without={<SettingsList />}
      with={<SettingsList readable />}
    />
  );
}
