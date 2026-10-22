import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TravelMate — AI Personalized Travel Itinerary Planner" },
      { name: "description", content: "Get a day-by-day travel itinerary built around your budget, style and interests in seconds." },
      { property: "og:title", content: "TravelMate — AI Personalized Travel Itinerary Planner" },
      { property: "og:description", content: "Day-by-day itineraries with attractions, dining, stays and transport — tailored by AI." },
    ],
  }),
  component: Index,
});

const stats = [
  { n: "30s", l: "to a full itinerary" },
  { n: "10+ hrs", l: "of research saved" },
  { n: "1", l: "place for your whole plan" },
];

const sample = [
  { t: "09:00", a: "Breakfast at a local café", c: "₹400" },
  { t: "10:30", a: "Old town walking tour", c: "Free" },
  { t: "13:00", a: "Street-food lunch market", c: "₹350" },
  { t: "16:00", a: "Sunset viewpoint by tram", c: "₹60" },
  { t: "20:00", a: "Dinner at a rooftop bistro", c: "₹1,200" },
];

function Index() {
  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden">
        <img src={hero} alt="Coastal town at golden hour" width={1600} height={912} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-fade" />
        <div className="mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-5 pb-20 pt-32 text-ink-foreground">
          <p className="font-display text-xl italic opacity-85 md:text-2xl">Every journey, thoughtfully planned</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-[1.05] md:text-7xl">
            Spend less time planning. More time <em className="text-accent">wandering.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg opacity-85">
            Tell us where, when and how you like to travel. Get a day-by-day itinerary with attractions, dining, stays and routes — in seconds.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/plan" className="rounded-full bg-sunset px-7 py-3 font-semibold text-primary-foreground shadow-soft">Plan my trip</Link>
            <Link to="/how-it-works" className="rounded-full border border-ink-foreground/40 px-7 py-3 font-semibold">See how it works</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 md:grid-cols-3">
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <p className="font-display text-5xl text-primary">{s.n}</p>
            <p className="mt-2 text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2">
        <div>
          <h2 className="text-4xl font-semibold text-foreground">A plan that feels made for you</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Solo weekend, romantic escape or a group adventure — TravelMate balances your pace, budget and interests, then lays it out hour by hour.
          </p>
          <ul className="mt-6 space-y-3 text-foreground">
            <li>✦ Optimized routes between nearby spots</li>
            <li>✦ Curated restaurants and stays in your budget</li>
            <li>✦ Edit or regenerate any single day</li>
          </ul>
          <Link to="/features" className="mt-8 inline-block font-semibold text-primary">Explore features →</Link>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <p className="font-display text-xl text-card-foreground">Day 1 · Lisbon</p>
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">Food & sightseeing</span>
          </div>
          <ul className="mt-5 divide-y divide-border">
            {sample.map((s) => (
              <li key={s.t} className="flex items-center gap-4 py-3">
                <span className="w-14 text-sm font-semibold text-secondary">{s.t}</span>
                <span className="flex-1 text-card-foreground">{s.a}</span>
                <span className="text-sm text-muted-foreground">{s.c}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-right text-sm font-semibold text-foreground">Day total ≈ ₹2,010</p>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-secondary px-8 py-16 text-center text-secondary-foreground">
          <h2 className="text-4xl font-semibold">Your next trip, planned in seconds</h2>
          <p className="mx-auto mt-4 max-w-xl opacity-80">Pick a place, tell us who is coming, and get your itinerary.</p>
          <Link to="/plan" className="mt-8 inline-block rounded-full bg-sunset px-8 py-3 font-semibold text-primary-foreground">Start planning</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
