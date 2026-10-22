import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — TravelMate Travel Planner" },
      { name: "description", content: "Smart trip builder, AI itineraries, cost tracking, day regeneration and group planning." },
      { property: "og:title", content: "Features — TravelMate Travel Planner" },
      { property: "og:description", content: "Everything you need to plan a personalized trip in one place." },
    ],
  }),
  component: Features,
});

const features = [
  { i: "🧭", t: "Smart trip builder", d: "Destination, dates, budget, group size, pace and interests — all in one quick form." },
  { i: "✨", t: "AI day-by-day itineraries", d: "Balanced plans with attractions, dining, stays and transport, timed hour by hour." },
  { i: "🗺️", t: "Optimized routes", d: "Nearby stops grouped together so you spend less time in transit." },
  { i: "🔁", t: "Regenerate any day", d: "Not feeling Day 2? Refresh just that day while keeping the rest." },
  { i: "💰", t: "Cost tracking", d: "Estimated costs per activity and per day, kept within your budget." },
  { i: "👥", t: "Shared group trips", d: "Combine everyone's interests and budget limits into one plan." },
];

function Features() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Features" title="Everything a trip needs" intro="From first idea to final day, TravelMate does the research and logistics for you." />
      <section className="mx-auto grid max-w-6xl gap-6 px-5 pb-24 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f.t} className="rounded-3xl border border-border bg-card p-7 shadow-soft">
            <span className="text-3xl">{f.i}</span>
            <h3 className="mt-4 text-2xl font-semibold text-card-foreground">{f.t}</h3>
            <p className="mt-2 text-muted-foreground">{f.d}</p>
          </div>
        ))}
      </section>
    </SiteLayout>
  );
}
