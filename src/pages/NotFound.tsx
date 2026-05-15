import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* Nav — matches main site */}
      <nav className="bg-foreground px-6 h-16 flex items-center shrink-0">
        <Link to="/" className="text-xl font-bold text-background tracking-tight">
          TrueRide
        </Link>
      </nav>

      {/* Center content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-sm">

          {/* Big 404 */}
          <div className="text-[112px] font-black text-foreground leading-none tracking-tighter select-none">
            404
          </div>

          <h1 className="text-2xl font-bold text-foreground mt-2 mb-3">
            Page not found
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Looks like this route doesn't exist.<br />
            Let us get you back on track.
          </p>

          <Link
            to="/"
            className="inline-flex items-center h-12 px-8 bg-foreground text-background font-bold rounded-xl hover:opacity-90 transition-opacity text-sm"
          >
            Back to home
          </Link>
        </div>
      </div>

      {/* Footer hint */}
      <div className="pb-10 text-center">
        <p className="text-xs text-muted-foreground">
          Need a ride?{" "}
          <a
            href="https://wa.me/14153172089"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            Message us on WhatsApp
          </a>
        </p>
      </div>

    </div>
  );
};

export default NotFound;
