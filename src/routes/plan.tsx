import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { generateItinerary } from "@/lib/itinerary.functions";

export const Route = createFileRoute("/plan")({
  head: () => ({
    meta: [
      { title: "Plan Your Trip — TravelMate AI Itinerary" },
      { name: "description", content: "Enter a destination and who's traveling, and get an AI-made day-by-day itinerary." },
      { property: "og:title", content: "Plan Your Trip — TravelMate AI Itinerary" },
      { property: "og:description", content: "Instant AI itineraries for solo travelers, couples and small groups." },
    ],
  }),
  component: Plan,
});

const options = [
  { v: "solo", l: "Solo", i: "🎒" },
  { v: "couple", l: "Couple", i: "💑" },
  { v: "group", l: "Small group", i: "👥" },
] as const;

function Plan() {
  const gen = useServerFn(generateItinerary);
  const [location, setLocation] = useState("");
  const [travelers, setTravelers] = useState<"solo" | "couple" | "group">("solo");
  const [days, setDays] = useState(3);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState("");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(""); setPlan("");
    try {
      const r = await gen({ data: { location, travelers, days } });
      if ("error" in r && r.error) setError(r.error); else if ("text" in r) setPlan(r.text ?? "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally { setLoading(false); }
  }

  return (
    <SiteLayout>
      <PageHeader eyebrow="Plan a trip" title="Where are you headed?" intro="Tell us the place and who's coming. AI does the rest." />
      <section className="mx-auto max-w-3xl px-5 pb-24">
        <form onSubmit={submit} className="space-y-6 rounded-3xl border border-border bg-card p-8 shadow-soft">
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">Destination</label>
            <input required value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Goa, Paris, Kyoto"
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none focus:border-ring" />
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-foreground">Who's traveling?</p>
            <div className="grid grid-cols-3 gap-3">
              {options.map((o) => (
                <button type="button" key={o.v} onClick={() => setTravelers(o.v)}
                  className={`rounded-2xl border p-4 text-center transition ${travelers === o.v ? "border-primary bg-accent text-accent-foreground" : "border-border bg-background text-foreground"}`}>
                  <span className="block text-2xl">{o.i}</span>
                  <span className="mt-1 block text-sm font-semibold">{o.l}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">Number of days: {days}</label>
            <input type="range" min={1} max={7} value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-full accent-primary" />
          </div>
          <button disabled={loading} className="w-full rounded-full bg-sunset py-3 font-semibold text-primary-foreground disabled:opacity-60">
            {loading ? "Planning your trip…" : "Generate itinerary ✨"}
          </button>
        </form>

        {error && <p className="mt-6 rounded-2xl border border-destructive/40 p-4 text-destructive">{error}</p>}
        {loading && <p className="mt-8 animate-pulse text-center text-muted-foreground">Crafting your day-by-day plan — this takes a few seconds…</p>}
        {plan && (
          <article className="itinerary mt-10 rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="mb-4 text-3xl font-semibold text-card-foreground">Your {days}-day trip to {location}</h2>
            <ReactMarkdown>{plan}</ReactMarkdown>
          </article>
        )}
      </section>
    </SiteLayout>
  );
}
