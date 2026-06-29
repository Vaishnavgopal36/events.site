import { useQuery } from "@tanstack/react-query";
import { ListEvents, type Event } from "../../api/events";
export function useEvents(city: string) {
  const query = useQuery({
    queryKey: ["events", city],
    queryFn: () => ListEvents(city),
    enabled: !!city,
  });
  return {
    events: query.data || [],
    loading: query.isLoading && query.fetchStatus !== "idle",
    error: query.error,
  };
}
