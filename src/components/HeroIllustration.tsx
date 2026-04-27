const HeroIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center gap-4" style={{ minHeight: 340 }}>

    {/* ── LEFT: Pain ─────────────────────────────── */}
    <div className="flex-1 relative rounded-3xl overflow-hidden" style={{ height: 340 }}>
      {/* Photo — stressed person at airport at night */}
      <img
        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=680&fit=crop&q=80"
        alt="Stressed at airport"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        {/* Top badge */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-white/80 text-xs font-semibold uppercase tracking-wide">Ride app · 3:47 AM</span>
        </div>

        {/* Bottom info */}
        <div>
          <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/40 rounded-xl px-3 py-1.5 mb-3">
            <span className="text-red-400 text-sm font-bold">Surge ×2.8</span>
          </div>
          <div className="text-white font-black text-2xl leading-tight mb-1">Driver<br />cancelled.</div>
          <div className="text-white/50 text-xs">Est. $280–$340 · No guarantee</div>
        </div>
      </div>
    </div>

    {/* ── Divider ─────────────────────────────────── */}
    <div className="shrink-0 w-8 h-8 rounded-full bg-foreground flex items-center justify-center z-10">
      <span className="text-background text-[10px] font-black">VS</span>
    </div>

    {/* ── RIGHT: Solution ─────────────────────────── */}
    <div className="flex-1 relative rounded-3xl overflow-hidden" style={{ height: 340 }}>
      {/* Photo — luxury SUV interior */}
      <img
        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=680&fit=crop&q=80"
        alt="Black SUV city"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        {/* Top badge */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-white/80 text-xs font-semibold uppercase tracking-wide">TrueRide · 3:47 AM</span>
        </div>

        {/* Bottom info */}
        <div>
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-xl px-3 py-1.5 mb-3">
            <span className="text-white text-sm font-bold">Fixed $160</span>
          </div>
          <div className="text-white font-black text-2xl leading-tight mb-1">Driver<br />confirmed.</div>
          <div className="text-white/50 text-xs">Booked in advance · No surprises</div>
        </div>
      </div>
    </div>

  </div>
);

export default HeroIllustration;
