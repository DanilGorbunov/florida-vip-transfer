import { useState, useRef, useEffect } from "react";
import { MessageCircle, Clock, ChevronDown, MapPin, Calendar, Clock3, Search, X, Loader2 } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import HeroMap from "@/components/HeroMap";
import HeroIllustration from "@/components/HeroIllustration";

const cities = [
  { id: "tpa",     full: "Tampa Airport (TPA)",    icon: "✈️" },
  { id: "parrish", full: "Parrish",                icon: "📍" },
  { id: "anna",    full: "Anna Maria Island",       icon: "🏖️" },
  { id: "srq",     full: "Sarasota / SRQ Airport", icon: "✈️" },
  { id: "siesta",  full: "Siesta Key",              icon: "🏖️" },
  { id: "naples",  full: "Naples",                  icon: "📍" },
  { id: "orlando", full: "Orlando Airport (MCO)",  icon: "✈️" },
  { id: "miami",   full: "Miami",                   icon: "🌆" },
];

const priceMap: Record<string, Record<string, number>> = {
  parrish: { srq: 60,  tpa: 120 },
  srq:     { siesta: 110, anna: 110, tpa: 160, naples: 250, orlando: 300, miami: 700 },
  tpa:     { srq: 250, parrish: 120, naples: 450 },
  orlando: { srq: 400, naples: 600 },
};

const getPrice = (a: string, b: string) =>
  priceMap[a]?.[b] ?? priceMap[b]?.[a] ?? null;

const WHATSAPP = "14153172089";

// ── Location Dropdown ─────────────────────────────────────────────────────────
interface LocationDropdownProps {
  value: string;
  onChange: (id: string) => void;
  placeholder: string;
  disabledId?: string;
  icon: React.ReactNode;
}

const LocationDropdown = ({ value, onChange, placeholder, disabledId, icon }: LocationDropdownProps) => {
  const [open, setOpen]   = useState(false);
  const [query, setQuery] = useState("");
  const ref      = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = cities.find(c => c.id === value);
  const filtered = cities.filter(c =>
    c.id !== disabledId && c.full.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) { setOpen(false); setQuery(""); }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50); }, [open]);

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center gap-3 bg-secondary rounded-2xl px-4 py-4 text-left transition-all ${value ? "ring-2 ring-foreground" : ""}`}>
        <span className="shrink-0">{icon}</span>
        <span className={`flex-1 text-sm ${selected ? "text-foreground font-medium" : "text-muted-foreground"}`}>
          {selected ? selected.full : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-background border border-border rounded-2xl shadow-xl z-30 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input ref={inputRef} type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search city or airport..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
          </div>
          <div className="max-h-56 overflow-y-auto">
            {filtered.length === 0
              ? <div className="px-4 py-3 text-sm text-muted-foreground">No results</div>
              : filtered.map((city, i) => (
                <button key={city.id} type="button"
                  onClick={() => { onChange(city.id); setOpen(false); setQuery(""); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-secondary transition-colors ${i > 0 ? "border-t border-border/40" : ""} ${city.id === value ? "bg-secondary" : ""}`}>
                  <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-base shrink-0">{city.icon}</span>
                  <span className="text-sm font-medium text-foreground">{city.full}</span>
                </button>
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
};

// ── Counter row ───────────────────────────────────────────────────────────────
const Counter = ({ label, value, onChange, min = 0 }: { label: string; value: number; onChange: (v: number) => void; min?: number }) => (
  <div className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
    <span className="text-sm text-foreground">{label}</span>
    <div className="flex items-center gap-2.5">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))}
        className="w-7 h-7 rounded-full bg-background border border-border flex items-center justify-center text-foreground font-medium hover:bg-secondary transition-colors text-base leading-none">−</button>
      <span className="w-4 text-center text-sm font-semibold text-foreground">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)}
        className="w-7 h-7 rounded-full bg-foreground flex items-center justify-center text-background font-medium hover:opacity-80 transition-opacity text-base leading-none">+</button>
    </div>
  </div>
);

// ── Quick Book Modal ──────────────────────────────────────────────────────────
interface QuickBookModalProps {
  fromFull: string; toFull: string;
  price: number | null;
  date: string; time: string;
  onClose: () => void;
}

const QuickBookModal = ({ fromFull, toFull, price, date, time, onClose }: QuickBookModalProps) => {
  const [name,       setName]       = useState("");
  const [phone,      setPhone]      = useState("");
  const [email,      setEmail]      = useState("");
  const [flight,     setFlight]     = useState("");
  const [passengers, setPassengers] = useState(1);
  const [luggage,    setLuggage]    = useState(0);
  const [carSeats,   setCarSeats]   = useState(0);
  const [boosters,   setBoosters]   = useState(0);
  const [loading,    setLoading]    = useState(false);
  const [done,       setDone]       = useState(false);
  const [error,      setError]      = useState("");
  const [agreed,     setAgreed]     = useState(false);

  // Validate that scheduled date/time is not in the past
  const isPast = (() => {
    if (!date || date === "ASAP") return false;
    const scheduled = new Date(`${date}T${time || "00:00"}`);
    return scheduled < new Date();
  })();

  const canSubmit = name.trim() && phone.trim() && email.trim() && agreed && !isPast;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    if (isPast) { setError("The selected date/time is in the past. Please choose a future time."); return; }
    setLoading(true);
    setError("");

    const extras = [
      carSeats > 0  ? `Car seats: ${carSeats}`     : "",
      boosters > 0  ? `Booster seats: ${boosters}` : "",
    ].filter(Boolean).join(", ");

    try {
      const res = await fetch("/api/send-booking-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerEmail: email.trim(),
          customerName:  name,
          bookingData: {
            name,
            email:          email.trim(),
            phone,
            pickupLocation: fromFull,
            destination:    toFull,
            date:           date  || "ASAP",
            time:           time  || "ASAP",
            passengers:     String(passengers),
            service:        "Transfer",
            flightNumber:   flight,
            luggage:        luggage > 0 ? `${luggage} bag${luggage > 1 ? "s" : ""}` : "",
            message:        extras,
          },
          confirmationEmail: {
            subject: "TrueRide — Booking received",
            message: "Your booking has been received. We will confirm shortly.",
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Error ${res.status}`);
      }
      setDone(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full bg-secondary rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-foreground/50 transition-shadow";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-background rounded-t-3xl sm:rounded-3xl shadow-2xl mx-0 sm:mx-4 max-h-[88vh] flex flex-col">

        {/* Header */}
        <div className="px-5 pt-5 pb-3 shrink-0 border-b border-border">
          <button onClick={onClose} className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
            <X className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
          <h3 className="text-base font-bold text-foreground pr-8">Book a transfer</h3>
          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
            {fromFull} → {toFull}
            {price != null && <span className="font-semibold text-foreground"> · ${price} fixed</span>}
          </p>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-5 pt-4 pb-5 flex-1 space-y-4">
          {done ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-3">✅</div>
              <div className="font-bold text-foreground text-lg">Booking received!</div>
              <div className="text-sm text-muted-foreground mt-1">We'll confirm shortly.</div>
              <button onClick={onClose} className="mt-6 h-10 px-8 bg-foreground text-background font-semibold rounded-xl text-sm">
                Done
              </button>
            </div>
          ) : (
            <>
              {/* Required contacts */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Contacts</p>
                <input type="text"  placeholder="Full name *"     value={name}  onChange={e => setName(e.target.value)}  className={inputCls} />
                <input type="tel"   placeholder="Phone number *"  value={phone} onChange={e => setPhone(e.target.value)} className={inputCls} />
                <input type="email" placeholder="Email *"         value={email} onChange={e => setEmail(e.target.value)} className={inputCls} />
              </div>

              {/* Optional row: flight number */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Optional</p>
                <input type="text" placeholder="Flight number (if airport pickup)" value={flight} onChange={e => setFlight(e.target.value)} className={inputCls} />
              </div>

              {/* Trip details */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Trip details</p>
                <div className="bg-secondary rounded-2xl px-4">
                  <Counter label="Passengers"    value={passengers} onChange={setPassengers} min={1} />
                  <Counter label="Luggage bags"  value={luggage}    onChange={setLuggage} />
                  <Counter label="Car seats"     value={carSeats}   onChange={setCarSeats} />
                  <Counter label="Booster seats" value={boosters}   onChange={setBoosters} />
                </div>
              </div>

              {/* Past date warning */}
              {isPast && (
                <div className="px-3.5 py-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-600 dark:text-amber-400">
                  ⚠️ The selected date/time is in the past. Please go back and choose a future time.
                </div>
              )}

              {/* No-cancellation checkbox */}
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <div className="relative mt-0.5 shrink-0">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={e => setAgreed(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-4.5 h-4.5 w-[18px] h-[18px] rounded-[5px] border-2 flex items-center justify-center transition-colors ${agreed ? "bg-foreground border-foreground" : "bg-transparent border-border"}`}>
                    {agreed && <svg className="w-2.5 h-2.5 text-background" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground leading-relaxed">
                  I understand that bookings <span className="text-foreground font-medium">cannot be cancelled less than 24 hours</span> before the scheduled pickup time. A no-show fee may apply.
                </span>
              </label>

              {error && (
                <div className="px-3.5 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-500">{error}</div>
              )}

              <button onClick={handleSubmit} disabled={!canSubmit || loading}
                className="w-full py-3.5 bg-foreground text-background font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-40 hover:opacity-90 transition-opacity text-sm">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm booking"}
              </button>
              <p className="text-[11px] text-muted-foreground text-center -mt-2">
                Booking details sent to email + Google Calendar
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => {
  const [from,         setFrom]         = useState("");
  const [to,           setTo]           = useState("");
  const [schedule,     setSchedule]     = useState<"now" | "later">("now");
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [date,         setDate]         = useState("");
  const [time,         setTime]         = useState("");
  const [showModal,    setShowModal]    = useState(false);
  const { openBookingDialog } = useBooking();

  const todayISO = new Date().toISOString().split("T")[0];
  const price    = from && to && from !== to ? getPrice(from, to) : null;
  const fromCity = cities.find(c => c.id === from);
  const toCity   = cities.find(c => c.id === to);
  const canSee   = !!from && !!to && from !== to;

  const whatsappUrl = (() => {
    if (!from || !to) return "#";
    const dateStr = schedule === "later" && date
      ? new Date(date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
      : null;
    const timeStr = schedule === "later" && time
      ? new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
      : null;

    const lines = [
      "Hi! 🚗 I'd like to book a transfer.",
      "",
      `📍 From: ${fromCity?.full}`,
      `📍 To:   ${toCity?.full}`,
      price != null ? `💰 Price: $${price} fixed` : "💰 Price: custom quote needed",
      dateStr && timeStr ? `📅 ${dateStr} · ${timeStr}` : dateStr ? `📅 ${dateStr}` : "📅 ASAP",
      "",
      "Please confirm availability. Thanks!",
    ].join("\n");
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines)}`;
  })();

  return (
    <section id="home" className="min-h-screen bg-background flex items-center">
      <div className="w-full max-w-7xl mx-auto px-6 py-28 lg:py-0 lg:min-h-screen lg:flex lg:items-center">
        <div className="grid lg:grid-cols-2 gap-20 items-center w-full">

          {/* ── Left ───────────────────────────────────────────── */}
          <div className="max-w-md">

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-5">
              <MapPin className="w-3.5 h-3.5" />
              Sarasota, FL
            </div>

            <h1 className="text-[56px] md:text-[72px] font-black text-foreground leading-[0.95] tracking-tight mb-4">
              No surge.<br />No cancels.
            </h1>
            <p className="text-base text-muted-foreground mb-8 max-w-sm">
              Private transfers across Florida — fixed price, guaranteed pickup. Any hour.
            </p>

            {/* Schedule pill */}
            <div className="relative mb-4">
              <button onClick={() => setScheduleOpen(!scheduleOpen)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-secondary rounded-full text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors">
                <Clock className="w-4 h-4" />
                {schedule === "now" ? "Pickup now" : "Schedule later"}
                <ChevronDown className={`w-4 h-4 transition-transform ${scheduleOpen ? "rotate-180" : ""}`} />
              </button>
              {scheduleOpen && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-background border border-border rounded-2xl shadow-lg overflow-hidden z-20">
                  {[{ value: "now", label: "Pickup now" }, { value: "later", label: "Schedule later" }].map((opt, i) => (
                    <button key={opt.value}
                      onClick={() => { setSchedule(opt.value as "now" | "later"); setScheduleOpen(false); }}
                      className={`w-full text-left px-5 py-4 text-sm font-medium text-foreground hover:bg-secondary transition-colors ${i > 0 ? "border-t border-border" : ""} ${schedule === opt.value ? "bg-secondary" : ""}`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Location inputs */}
            <div className="relative mb-4">
              <div className="absolute left-[19px] top-[54px] bottom-[54px] w-0.5 bg-border z-10 pointer-events-none" />
              <div className="mb-2">
                <LocationDropdown value={from} onChange={setFrom} placeholder="Pickup location" disabledId={to}
                  icon={<div className="w-4 h-4 rounded-full border-2 border-foreground bg-foreground flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-background" /></div>} />
              </div>
              <LocationDropdown value={to} onChange={setTo} placeholder="Dropoff location" disabledId={from}
                icon={<div className="w-4 h-4 rounded-sm bg-foreground flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-sm bg-background" /></div>} />
            </div>

            {/* Date / Time */}
            {schedule === "later" && (
              <div className="flex gap-2 mb-4">
                <div className={`flex-1 relative flex items-center bg-secondary rounded-2xl ${date ? "ring-2 ring-foreground" : ""}`}>
                  <Calendar className="absolute left-4 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <input type="date" value={date} min={todayISO} onChange={e => setDate(e.target.value)}
                    className="w-full bg-transparent pl-10 pr-4 py-4 text-sm outline-none text-foreground cursor-pointer" />
                </div>
                <div className={`flex-1 relative flex items-center bg-secondary rounded-2xl ${time ? "ring-2 ring-foreground" : ""}`}>
                  <Clock3 className="absolute left-4 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <input type="time" value={time} onChange={e => setTime(e.target.value)}
                    className="w-full bg-transparent pl-10 pr-4 py-4 text-sm outline-none text-foreground cursor-pointer" />
                </div>
              </div>
            )}

            {/* Price */}
            {canSee && (
              <div className="mb-4 px-5 py-4 bg-secondary rounded-2xl">
                <div className="text-xs text-muted-foreground mb-1">{fromCity?.full} → {toCity?.full}</div>
                {price != null
                  ? <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-foreground">${price}</span>
                      <span className="text-sm text-muted-foreground">fixed · no surge</span>
                    </div>
                  : <div className="text-base font-semibold text-foreground">Custom quote — we cover this route</div>
                }
              </div>
            )}

            {/* CTAs */}
            {!canSee ? (
              <div className="flex items-center gap-4">
                <button disabled className="h-14 px-8 bg-foreground text-background font-bold text-base rounded-xl opacity-25 cursor-not-allowed">
                  Book now
                </button>
                <span className="text-sm text-muted-foreground">No account needed</span>
              </div>
            ) : (
              <div className="flex gap-3">
                <button onClick={() => setShowModal(true)}
                  className="h-14 px-7 bg-foreground text-background font-bold rounded-xl hover:opacity-90 transition-opacity text-sm">
                  Book now
                </button>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 h-14 px-5 bg-secondary text-foreground font-medium rounded-xl hover:bg-secondary/70 transition-colors text-sm outline-none focus:outline-none">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            )}

            {/* Stats */}
            <div className="flex gap-8 mt-10 pt-8 border-t border-border">
              {[
                { value: "500+", label: "Rides" },
                { value: "5.0★", label: "Rating" },
                { value: "3",    label: "Airports" },
                { value: "24/7", label: "Support" },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-lg font-bold text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: illustration → map after city selected ──── */}
          <div className="hidden lg:block" style={{ height: "560px" }}>
            <div className="relative w-full h-full">
              {/* Illustration — visible when no city selected */}
              <div className={`absolute inset-0 transition-opacity duration-500 ${from ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                <HeroIllustration />
              </div>
              {/* Map — fades in when city selected */}
              <div className={`absolute inset-0 transition-opacity duration-500 ${from ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <HeroMap from={from} to={to} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile sticky CTAs */}
      {canSee && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-background border-t border-border md:hidden flex gap-3">
          <button onClick={() => setShowModal(true)}
            className="flex-1 h-14 bg-foreground text-background font-bold text-base rounded-xl">
            Book now
          </button>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 h-14 px-5 bg-secondary text-foreground font-medium rounded-xl text-sm">
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>
      )}

      {/* Quick Book Modal */}
      {showModal && fromCity && toCity && (
        <QuickBookModal
          fromFull={fromCity.full} toFull={toCity.full}
          price={price} date={date} time={time}
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
};

export default Hero;
