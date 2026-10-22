import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/use-cases")({
  head: () => ({
    meta: [
      { title: "Use Cases — Solo, Couples & Groups | TravelMate" },
      { name: "description", content: "See how solo travelers, couples and friend groups plan better trips with TravelMate." },
      { property: "og:title", content: "Use Cases — Solo, Couples & Groups | TravelMate" },
      { property: "og:description", content: "Personalized plans for every kind of traveler." },
    ],
  }),
  component: UseCases,
});

const cases = [
  { tag: "Solo traveler", t: "A weekend getaway, sorted", d: "Short on time? Enter destination, budget, dates and interests like food and sightseeing. Get a balanced plan with nearby attractions and affordable dining — no hours of searching.", pts: ["Optimized travel time", "Budget-friendly eats", "Clear, structured plan"] },
  { tag: "Couples", t: "A vacation that feels personal", d: "Choose relaxed pacing, scenic spots and premium stays. Get curated restaurants and unique experiences, then fine-tune days together.", pts: ["Relaxed pacing", "Regenerate any day", "Track estimated costs"] },
  { tag: "Small groups", t: "Multi-day trips without the chaos", d: "Create a shared trip, add group size and blend everyone's interests and budget limits. Activities and logistics are arranged to avoid conflicts and delays.", pts: ["Shared trip planning", "Combined preferences", "Logistics suggestions"] },
];

function UseCases() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Use cases" title="Made for every kind of traveler" intro="Whether you go alone, as two, or as a crew." />
      <section className="mx-auto max-w-5xl space-y-8 px-5 pb-24">
        {cases.map((c) => (
          <article key={c.tag} className="grid gap-6 rounded-3xl border border-border bg-card p-8 shadow-soft md:grid-cols-[1fr_220px]">
            <div>
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">{c.tag}</span>
              <h2 className="mt-4 text-3xl font-semibold text-card-foreground">{c.t}</h2>
              <p className="mt-3 text-muted-foreground">{c.d}</p>
            </div>
            <ul className="space-y-2 self-center text-sm font-medium text-secondary">
              {c.pts.map((p) => <li key={p}>✓ {p}</li>)}
            </ul>
          </article>
        ))}
      </section>
    </SiteLayout>
  );
}
