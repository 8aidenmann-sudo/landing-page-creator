import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Claim Your $750 Bonus — Shien Rewards" },
      { name: "description", content: "Pick out free dresses, tops, shoes & accessories on us — $750 to spend, delivered to your door. Limited drop today only." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-md mx-auto">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3 bg-card/80 backdrop-blur-sm pl-2 pr-5 py-2 rounded-full shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-foreground flex items-center justify-center text-background font-bold text-lg">S</div>
            <span className="text-primary font-semibold">Shien Rewards</span>
          </div>
        </div>

        <h1 className="text-center font-extrabold text-5xl leading-tight tracking-tight mb-6">
          Claim Your<br />
          <span className="text-primary">$750 Bonus</span>
        </h1>

        <p className="text-center text-muted-foreground text-lg leading-relaxed mb-10 px-2">
          Pick out free dresses, tops, shoes & accessories on us — $750 to spend, delivered to your door. Limited drop today only.
        </p>

        <div className="bg-card/90 rounded-2xl py-4 px-6 mb-6 shadow-sm flex items-center justify-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-primary" style={{ animation: "pulse-dot 1.5s ease-in-out infinite" }} />
          <span className="text-foreground"><span className="font-bold text-primary">12,866</span> shoppers claiming now</span>
        </div>

        <Link
          to="/claim"
          search={{ age: "adult" }}
          className="block bg-gradient-to-b from-primary-glow to-primary text-primary-foreground rounded-2xl py-5 px-6 mb-4 shadow-lg shadow-primary/30 text-center hover:brightness-105 transition-all active:scale-[0.98]"
        >
          <div className="font-bold text-xl">I'm 18 or older</div>
          <div className="text-sm opacity-90 mt-1">Eligible for the full $750 bonus</div>
        </Link>

        <Link
          to="/claim"
          search={{ age: "minor" }}
          className="block bg-card rounded-2xl py-5 px-6 shadow-sm text-center hover:bg-card/80 transition-all active:scale-[0.98]"
        >
          <div className="font-bold text-xl text-foreground">I'm under 18</div>
          <div className="text-sm text-muted-foreground mt-1">Eligible for $250 voucher with parent consent</div>
        </Link>
      </div>
    </main>
  );
}
