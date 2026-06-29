import { memo } from "react";
import { type Event } from "../../api/events";
type EventCardProps = {
  event: Event;
  onBook: (eventId: number) => void;
};
export const EventCard = memo(function EventCard({
  event,
  onBook,
}: EventCardProps) {
  const dateLabel = new Date(event.eventDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/80 bg-white/85 p-5 shadow-lg shadow-purple-900/10 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-fuchsia-900/15">
      <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-gradient-to-br from-cyan-200/70 to-fuchsia-200/80" />
      <div className="relative">
        <p className="mb-3 inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-black uppercase text-cyan-700">
          {event.venue.name}
        </p>
        <h3 className="mb-3 text-2xl font-black text-slate-950">
          {event.title}
        </h3>
        <p className="mb-5 text-sm font-semibold text-slate-500">
          {dateLabel} · {event.capacity} seats
        </p>
      </div>
      <button
        onClick={() => onBook(event.id)}
        className="relative w-full cursor-pointer rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-purple-900/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-900/30 focus:outline-none focus:ring-4 focus:ring-purple-500/30"
      >
        Book Event
      </button>
    </article>
  );
});
