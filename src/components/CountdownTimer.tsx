import React, { useState, useEffect } from "react";
import Countdown from "react-countdown";
import { supabase } from "@/lib/supabase";

interface CountdownTimerProps {
  targetDate?: string;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [countdownDate, setCountdownDate] = useState<string>(
    targetDate || "2025-09-21T00:00:00"
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountdownDate = async () => {
      try {
        setLoading(true);

        // Check if supabase client is available
        if (!supabase) {
          console.log("Supabase client not available, using fallback date");
          setCountdownDate(targetDate || "2025-09-21T00:00:00");
          setLoading(false);
          return;
        }

        console.log("Attempting to fetch countdown date from Supabase...");

        // Fetch from Supabase Countdown table
        const { data, error } = await supabase
          .from("Countdown")
          .select("date")
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        console.log("Countdown query response - data:", data);
        console.log("Countdown query response - error:", error);

        if (error) {
          if (error.code === "PGRST116") {
            console.log("No countdown date found in database, using fallback");
          } else {
            console.error("Supabase countdown error:", error);
          }
          setCountdownDate(targetDate || "2025-09-21T00:00:00");
        } else if (data?.date) {
          console.log("Successfully fetched countdown date:", data.date);
          setCountdownDate(data.date);
        } else {
          console.log("No date field in response, using fallback");
          setCountdownDate(targetDate || "2025-09-21T00:00:00");
        }
      } catch (error) {
        console.error("Error fetching countdown date:", error);
        setCountdownDate(targetDate || "2025-09-21T00:00:00");
      } finally {
        setLoading(false);
      }
    };

    fetchCountdownDate();
  }, [targetDate]);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto text-center">
        <h3 className="text-xl md:text-2xl font-protest mb-6 text-muted-foreground stencil-text">
          COUNTDOWN TO REVOLUTION
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-card border-2 border-primary p-4 md:p-6 brush-stroke"
            >
              <div className="text-3xl md:text-5xl font-protest text-primary animate-pulse">
                --
              </div>
              <div className="text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-wider">
                Loading
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return (
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-protest text-primary animate-glitch">
            THE REVOLUTION IS NOW
          </h2>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-card border-2 border-primary p-4 md:p-6 brush-stroke">
          <div className="text-3xl md:text-5xl font-protest text-primary stencil-text">
            {String(days).padStart(2, "0")}
          </div>
          <div className="text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-wider">
            Days
          </div>
        </div>
        <div className="bg-card border-2 border-primary p-4 md:p-6 brush-stroke">
          <div className="text-3xl md:text-5xl font-protest text-primary stencil-text">
            {String(hours).padStart(2, "0")}
          </div>
          <div className="text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-wider">
            Hours
          </div>
        </div>
        <div className="bg-card border-2 border-primary p-4 md:p-6 brush-stroke">
          <div className="text-3xl md:text-5xl font-protest text-primary stencil-text">
            {String(minutes).padStart(2, "0")}
          </div>
          <div className="text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-wider">
            Minutes
          </div>
        </div>
        <div className="bg-card border-2 border-primary p-4 md:p-6 brush-stroke">
          <div className="text-3xl md:text-5xl font-protest text-primary animate-pulse stencil-text">
            {String(seconds).padStart(2, "0")}
          </div>
          <div className="text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-wider">
            Seconds
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className="text-xl md:text-2xl font-protest text-center mb-6 text-muted-foreground stencil-text">
        COUNTDOWN TO REVOLUTION
      </h3>
      <Countdown date={new Date(countdownDate)} renderer={renderer} />
    </div>
  );
};

export default CountdownTimer;
