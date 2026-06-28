import { useState, useEffect } from "react";
import { ListEvents, type Event } from "../../api/events";

export function useEvents(city: string) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    if (!city) {
      setEvents([]);
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    ListEvents(city)
      .then((events) => {
        if (!controller.signal.aborted) {
          setEvents(events);
          setLoading(false);
        }
      })
      .catch((e) => {
        if (!controller.signal.aborted) {
          setError(e instanceof Error ? e : new Error("Something went wrong"));
          setLoading(false);
        }
      });
    return () => controller.abort();
  }, [city]);
  return { events, loading, error };
}
