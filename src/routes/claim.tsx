import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Clock, ShoppingBag, ShieldCheck, Users, Star } from "lucide-react";

type Search = { age?: "adult" | "minor" };

export const Route = createFileRoute("/claim")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    age: search.age === "minor" ? "minor" : "adult",
  }),
  head: () => ({
    meta: [
      { title: "Your $750 Bonus Is Ready — Shein Rewards" },
      { name: "description", content: "Your spot is confirmed. Sign up free and pick out trending Shein fashion worth $750 — shipped straight to your door." },
    ],
  }),
  component: ClaimPage,
});

const TESTIMONIALS = [
  { name: "Mia R.", amount: 84, action: "Picked out a summer haul" },
  { name: "Jasmine T.", amount: 127, action: "Grabbed 3 dresses + heels" },
  { name: "Ava L.", amount: 56, action: "Claimed a denim bundle" },
  { name: "Sophia K.", amount: 92, action: "Locked in a fall fit" },
  { name: "Chloe M.", amount: 143, action: "Picked out shoes & bag" },
  { name: "Olivia P.", amount: 68, action: "Snagged a tops haul" },
  { name: "Isabella G.", amount: 110, action: "Got the bestseller bundle" },
  { name: "Emma D.", amount: 75, action: "Claimed accessories drop" },
  { name: "Zoe H.", amount: 99, action: "Picked a streetwear set" },
  { name: "Layla B.", amount: 132, action: "Got the going-out fit" },
  { name: "Aria S.", amount: 47, action: "Picked a basics refresh" },
  { name: "Nora C.", amount: 88, action: "Claimed loungewear pack" },
];

function ClaimPage() {
  const [secondsLeft, setSecondsLeft] = useState(15 * 60 - 7);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [key, setKey] = useState(0);
  const [tick, setTick] = useState(0);

  // shuffle order once per mount
  const order = useMemo(() => {
    const arr = [...TESTIMONIALS.keys()];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  useEffect(() => {
    const id = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setTestimonialIdx((i) => (i + 1) % order.length);
      setKey((k) => k + 1);
      setTick(0);
    }, 4500);
    return () => clearInterval(id);
  }, [order.length]);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [key]);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  const t = TESTIMONIALS[order[testimonialIdx]];
  const timeLabel = tick < 2 ? "just now" : `${tick}s ago`;

  return (
    <main className="min-h-screen px-5 py-6 pb-16">
      <div className="w-full max-w-md mx-auto">
        {/* Live testimonial */}
        <div
          key={key}
          className="bg-card rounded-2xl p-3 pr-4 shadow-sm flex items-center gap-3 mb-6"
          style={{ animation: "slide-down 0.5s ease-out" }}
        >
          <div className="w-11 h-11 rounded-lg bg-foreground flex-shrink-0 flex items-center justify-center text-background font-bold">S</div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-foreground truncate">{t.name} claimed +${t.amount}</div>
            <div className="text-sm text-muted-foreground truncate">{t.action}</div>
          </div>
          <div className="text-sm text-muted-foreground flex-shrink-0">{timeLabel}</div>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-2xl bg-foreground flex items-center justify-center text-background font-bold text-3xl shadow-md">S</div>
        </div>

        {/* Timer */}
        <div className="bg-primary/10 border border-primary/15 rounded-2xl py-4 px-6 mb-6 flex items-center justify-center gap-2 text-primary font-semibold">
          <Clock className="w-5 h-5" />
          <span>Offer expires in {mm}:{ss}</span>
        </div>

        {/* Headline */}
        <h1 className="text-center font-extrabold text-5xl leading-tight tracking-tight mb-5">
          Your $750<br />
          <span className="text-primary">Bonus</span> Is Ready
        </h1>

        <div className="text-center text-primary font-semibold mb-4">
          🎁 $847,641+ in bonuses claimed today
        </div>

        <p className="text-center text-muted-foreground text-lg leading-relaxed mb-8 px-2">
          Your spot is confirmed. Sign up free and pick out trending Shein fashion worth $750 — shipped straight to your door.
        </p>

        {/* CTA */}
        <button
          onClick={() => alert("Sign up flow would start here")}
          className="w-full bg-gradient-to-b from-primary-glow to-primary text-primary-foreground rounded-2xl py-5 px-6 mb-4 shadow-lg shadow-primary/30 font-bold text-xl flex items-center justify-center gap-3 hover:brightness-105 transition-all active:scale-[0.98]"
        >
          <ShoppingBag className="w-6 h-6" />
          Claim My $750 Now — It's Free
        </button>

        {/* Free shipping row */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex -space-x-1">
            {["👜", "👗", "👟", "💄"].map((e) => (
              <div key={e} className="w-9 h-9 rounded-full bg-card flex items-center justify-center text-lg shadow-sm">{e}</div>
            ))}
          </div>
          <span className="text-muted-foreground font-medium ml-2">Free shipping included</span>
        </div>

        {/* How it works */}
        <div className="bg-card/90 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="text-muted-foreground text-sm font-bold tracking-widest mb-4">HOW IT WORKS</div>
          <div className="divide-y divide-border/60">
            {[
              { n: 1, title: "Create Free Account", desc: "Just your email — takes less than 60 seconds" },
              { n: 2, title: "Pick Your Free Items", desc: "Browse trending dresses, tops, shoes & accessories — $750 to spend" },
              { n: 3, title: "Free Delivery", desc: "Shipped straight to your door — track it in real-time" },
            ].map((s) => (
              <div key={s.n} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                <div className="w-9 h-9 rounded-lg bg-primary text-primary-foreground font-bold flex items-center justify-center flex-shrink-0 shadow-md shadow-primary/30">{s.n}</div>
                <div>
                  <div className="font-bold text-foreground text-lg">{s.title}</div>
                  <div className="text-muted-foreground leading-relaxed">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Urgency box */}
        <div className="bg-card/90 rounded-2xl p-5 mb-8 shadow-sm flex gap-3">
          <div className="text-2xl flex-shrink-0">⏳</div>
          <p className="text-foreground leading-relaxed">
            <span className="font-bold text-primary">Limited stock remaining.</span>{" "}
            Complete <span className="font-bold">2 quick steps</span> after signup to lock in your $750 bonus before it's gone.
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-6 mb-3 text-sm">
          <div className="flex items-center gap-1.5 text-foreground"><ShieldCheck className="w-4 h-4 text-primary" /> Verified</div>
          <div className="flex items-center gap-1.5 text-foreground"><Users className="w-4 h-4 text-primary" /> 500K+ shoppers</div>
          <div className="flex items-center gap-1.5 text-foreground"><Star className="w-4 h-4 text-primary fill-primary" /> 4.8 rated</div>
        </div>
        <p className="text-center text-muted-foreground text-sm">
          Trusted by over 500,000 shoppers claiming bonuses daily
        </p>
      </div>
    </main>
  );
}
