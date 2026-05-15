import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="space-y-3">
    <h2 className="text-xl font-bold text-foreground">{title}</h2>
    <div className="text-muted-foreground leading-relaxed space-y-2">{children}</div>
  </section>
);

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-background">
    <Navigation />

    <div className="max-w-2xl mx-auto px-6 py-24">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10">
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>

      <h1 className="text-4xl font-black text-foreground mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-12">Last updated: May 15, 2026</p>

      <div className="space-y-10">

        <Section title="1. What we collect">
          <p>When you book a transfer with TrueRide we collect:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Full name, email address, and phone number</li>
            <li>Pickup and drop-off locations</li>
            <li>Travel date, time, and passenger count</li>
            <li>Flight number (optional, for airport pickups)</li>
          </ul>
          <p>We do not collect payment card data. No account or password is required.</p>
        </Section>

        <Section title="2. How we use your data">
          <p>Your information is used only to:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Confirm and coordinate your transfer</li>
            <li>Share trip details with your assigned driver</li>
            <li>Send you a booking confirmation by email</li>
            <li>Contact you about changes or delays</li>
          </ul>
          <p>We do not sell your data, send marketing emails, or use your data for profiling.</p>
        </Section>

        <Section title="3. Who we share data with">
          <p>Your booking details are shared only with:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong className="text-foreground">Your driver</strong> — name, phone, pickup location, and trip details</li>
            <li><strong className="text-foreground">Resend</strong> (resend.com) — our email delivery provider, used solely to send booking confirmations</li>
          </ul>
          <p>No other third parties have access to your personal information.</p>
        </Section>

        <Section title="4. Data retention">
          <p>Booking records are retained for 12 months for operational and legal compliance purposes, then permanently deleted.</p>
        </Section>

        <Section title="5. Cookies">
          <p>We use a single session cookie to remember your theme preference (light/dark). No tracking or advertising cookies are used.</p>
        </Section>

        <Section title="6. Your rights">
          <p>You have the right to:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Request a copy of the data we hold about you</li>
            <li>Ask us to correct or delete your data</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <p>To exercise any of these rights, contact us below.</p>
        </Section>

        <Section title="7. Contact">
          <p>
            Questions about this policy?{" "}
            <a href="https://wa.me/14153172089" target="_blank" rel="noopener noreferrer"
              className="text-foreground underline hover:opacity-70 transition-opacity">
              Message us on WhatsApp
            </a>
            {" "}or email{" "}
            <a href="mailto:djadavin2@gmail.com"
              className="text-foreground underline hover:opacity-70 transition-opacity">
              djadavin2@gmail.com
            </a>
          </p>
        </Section>

      </div>
    </div>
  </div>
);

export default PrivacyPolicy;
