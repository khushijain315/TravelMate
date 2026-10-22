import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const nav = [
  { to: "/plan", label: "Plan a trip" },
  { to: "/features", label: "Features" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/use-cases", label: "Use cases" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <Link to="/" className="font-display text-2xl font-semibold text-foreground">
            Travel<span className="text-primary">Mate</span>
          </Link>
          <nav className="hidden gap-7 text-sm font-medium md:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="text-muted-foreground hover:text-foreground" activeProps={{ className: "text-foreground" }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <Link to="/plan" className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
            Plan my trip
          </Link>
        </div>
        <nav className="flex gap-5 overflow-x-auto px-5 pb-3 text-sm md:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="whitespace-nowrap text-muted-foreground">{n.label}</Link>
          ))}
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl">TravelMate</p>
            <p className="mt-2 text-sm opacity-70">Every journey, thoughtfully planned.</p>
          </div>
          <div className="flex flex-col gap-2 text-sm opacity-80">
            {nav.map((n) => <Link key={n.to} to={n.to}>{n.label}</Link>)}
          </div>
          <p className="text-sm opacity-60 md:text-right">© 2026 TravelMate</p>
        </div>
      </footer>
    </div>
  );
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <section className="mx-auto max-w-4xl px-5 pb-10 pt-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
      <h1 className="mt-4 text-4xl font-semibold text-foreground md:text-6xl">{title}</h1>
      <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">{intro}</p>
    </section>
  );
}
