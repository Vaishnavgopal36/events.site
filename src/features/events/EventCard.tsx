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
    <article
      className="event-card"
      style={{
        border: "1px solid #D8DEE5",
        padding: "16px",
        marginBottom: "16px",
        borderRadius: "8px",
        background: "#FFF",
      }}
    >
      <h3 style={{ margin: "0 0 8px 0" }}>{event.title}</h3>
      <p style={{ margin: "0 0 16px 0", fontSize: "14px", color: "#4A5A70" }}>
        {event.venue.name} . {dateLabel} . {event.capacity} seats
      </p>
      <button
        onClick={() => onBook(event.id)}
        style={{
          padding: "8px 16px",
          background: "#17283C",
          color: "#FFF",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {" "}
        Book Event
      </button>
    </article>
  );
});
