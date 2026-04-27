import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import { useTheme } from "@/contexts/ThemeContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openBookingDialog } = useBooking();
  const { theme, toggleTheme } = useTheme();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-foreground">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-background tracking-tight">TrueRide</span>
            <span className="text-[10px] text-background/50 font-semibold border border-background/20 px-1.5 py-0.5 rounded-full">BETA</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "How it works", id: "how-it-works" },
              { label: "Pricing",      id: "coverage"     },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm text-background/70 hover:text-background transition-colors"
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full flex items-center justify-center text-background/60 hover:text-background hover:bg-background/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => openBookingDialog()}
              className="h-9 px-5 bg-background text-foreground text-sm font-semibold rounded-full hover:opacity-90 transition-opacity"
            >
              Book a ride
            </button>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="text-background/60 hover:text-background"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => openBookingDialog()}
              className="h-8 px-4 bg-background text-foreground text-xs font-semibold rounded-full"
            >
              Book
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-background">
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-background/10 space-y-1">
            {[
              { label: "How it works", id: "how-it-works" },
              { label: "Pricing",      id: "coverage"     },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="block w-full text-left text-sm text-background/70 hover:text-background py-2.5 px-2 rounded-lg hover:bg-background/10 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
