import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import RevealText from "@/components/RevealText";
import { Button } from "@/components/ui/button";
import {
  BOOKING_DURATION_OPTIONS,
  buildBookingGatePath,
  parseBookingDuration,
} from "@/lib/booking";

type BookingSession = {
  authenticated: boolean;
  email?: string;
  name?: string;
};

const Book = () => {
  const [searchParams] = useSearchParams();
  const bookingDuration = parseBookingDuration(searchParams.get("duration"));
  const bookingOption = useMemo(
    () =>
      BOOKING_DURATION_OPTIONS.find(
        (option) => option.duration === bookingDuration,
      ) ?? BOOKING_DURATION_OPTIONS[0],
    [bookingDuration],
  );

  const [session, setSession] = useState<BookingSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadSession = async () => {
      try {
        const response = await fetch("/api/auth/session", {
          headers: { Accept: "application/json" },
        });

        if (!response.ok) {
          throw new Error("Unable to verify booking access.");
        }

        const data = (await response.json()) as BookingSession;
        if (active) {
          setSession(data);
        }
      } catch {
        if (active) {
          setSession({ authenticated: false });
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadSession();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!loading && session?.authenticated) {
      window.location.replace(
        `/api/bookings/redirect?duration=${bookingDuration}`,
      );
    }
  }, [bookingDuration, loading, session?.authenticated]);

  const loginHref = `/api/auth/google/start?returnTo=${encodeURIComponent(
    buildBookingGatePath(bookingDuration),
  )}`;

  return (
    <PageTransition>
      <div className="noise-overlay min-h-screen pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-start">
            <div>
              <RevealText>
                <span className="text-xs font-detail text-text-dim tracking-widest uppercase">
                  Booking Access
                </span>
              </RevealText>
              <RevealText delay={0.08}>
                <h1 className="text-4xl md:text-6xl font-display font-bold mt-4 leading-tight">
                  Sign in to book
                  <br />
                  <span className="text-gradient">a session</span>
                </h1>
              </RevealText>
              <p className="mt-6 text-text-subtle font-detail text-base leading-relaxed max-w-xl">
                Booking is limited to authenticated users so random bots cannot
                jump straight to Cal.com.
              </p>

              <div className="mt-10 grid gap-4">
                <div className="rounded-2xl border border-border/70 bg-card/70 p-5 md:p-6 backdrop-blur-sm shadow-[0_18px_60px_-24px_rgba(0,0,0,0.45)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                      <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-display text-lg font-semibold text-foreground">
                        {bookingOption.label}
                      </p>
                      <p className="font-detail text-sm text-text-dim">
                        Google sign-in unlocks the booking redirect.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {BOOKING_DURATION_OPTIONS.map((option) => (
                    <Button
                      key={option.duration}
                      asChild
                      variant={
                        option.duration === bookingDuration ? "default" : "outline"
                      }
                      size="sm"
                    >
                      <Link to={buildBookingGatePath(option.duration)}>
                        {option.label}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-border/70 bg-surface/80 p-6 md:p-8 shadow-[0_24px_80px_-28px_rgba(0,0,0,0.55)] backdrop-blur-sm">
              <div className="flex items-center gap-3 text-primary">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
                <span className="text-xs font-detail tracking-[0.2em] uppercase">
                  Step 1 of 2
                </span>
              </div>

              <h2 className="mt-4 text-2xl md:text-3xl font-display font-semibold text-foreground">
                {loading ? "Checking access…" : "Authenticate first"}
              </h2>

              <p className="mt-4 text-sm md:text-base font-detail text-text-subtle leading-relaxed">
                {session?.authenticated
                  ? session.email
                    ? `You're signed in as ${session.email}. Redirecting now.`
                    : "You're signed in. Redirecting now."
                  : "Click below to sign in with Google. After auth, you'll be sent directly to the Cal.com booking page."}
              </p>

              <div className="mt-8 space-y-4">
                {!session?.authenticated ? (
                  <Button asChild className="w-full py-6 text-base">
                    <a href={loginHref}>Continue with Google</a>
                  </Button>
                ) : (
                  <Button
                    asChild
                    className="w-full py-6 text-base"
                    disabled={loading}
                  >
                    <a href={`/api/bookings/redirect?duration=${bookingDuration}`}>
                      Continue to booking
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                )}

                <p className="text-xs font-detail text-text-dim leading-relaxed">
                  Need a different length? You can switch between the available
                  options above before signing in.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Book;
