import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — TravelMate" },
      { name: "description", content: "Tell us your trip, let AI plan it, then refine and go. Three simple steps." },
      { property: "og:title", content: "How It Works — TravelMate" },
      { property: "og:description", content: "Three simple steps from idea to a ready-to-follow itinerary." },
    ],
  }),
  component: HowItWorks,
});

const steps = [
  { t: "Tell us about your trip", d: "Enter destination, dates, budget, group size and what you love — food, culture, adventure, scenic views." },
  { t: "AI builds your itinerary", d: "In seconds you get a structured, day-wise plan with timings, places to eat, where to stay and how to get around." },
  { t: "Refine and go", d: "Swap activities, regenerate a day, track costs and save your plan. Then just enjoy the trip." },
];

function HowItWorks() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="How it works" title="From idea to itinerary in three steps" intro="No more juggling dozens of tabs and blogs." />
      <section className="mx-auto max-w-3xl space-y-6 px-5 pb-24">
        {steps.map((s, i) => (
          <div key={s.t} className="flex gap-6 rounded-3xl border border-border bg-card p-7">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sunset font-display text-2xl text-primary-foreground">{i + 1}</span>
            <div>
              <h3 className="text-2xl font-semibold text-card-foreground">{s.t}</h3>
              <p className="mt-2 text-muted-foreground">{s.d}</p>
            </div>
          </div>
        ))}
      </section>
    </SiteLayout>
  );
}
