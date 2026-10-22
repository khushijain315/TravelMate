import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Early Access — TravelMate" },
      { name: "description", content: "Join the TravelMate early-access list or send us a message." },
      { property: "og:title", content: "Contact & Early Access — TravelMate" },
      { property: "og:description", content: "Be first to try AI-powered personalized travel planning." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const field = "w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none focus:border-ring";
  return (
    <SiteLayout>
      <PageHeader eyebrow="Contact" title="Get early access" intro="Leave your details and we'll let you know when TravelMate is ready." />
      <section className="mx-auto max-w-xl px-5 pb-24">
        {sent ? (
          <div className="rounded-3xl border border-border bg-card p-10 text-center">
            <h2 className="text-3xl font-semibold text-card-foreground">Thanks! 🌍</h2>
            <p className="mt-3 text-muted-foreground">We'll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4 rounded-3xl border border-border bg-card p-8 shadow-soft">
            <input required placeholder="Your name" className={field} />
            <input required type="email" placeholder="Email address" className={field} />
            <textarea rows={4} placeholder="Where would you like to go next?" className={field} />
            <button className="w-full rounded-full bg-sunset py-3 font-semibold text-primary-foreground">Join the waitlist</button>
          </form>
        )}
      </section>
    </SiteLayout>
  );
}
