import { useEvents } from "./useEvents";
import { EventCard } from "./EventCard";
import { useState,useCallback } from "react";
import { BookingForm } from "../bookings/BookingForm";
import { CreateBooking } from "../../api/events";
type EventListProps = {
  city: string;
};

export function EventList({ city }: EventListProps) {
  const { events, loading, error } = useEvents(city);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const handleBook = useCallback((eventId: number) => {
    setSelectedEventId(eventId);
  }, []);

  if (!city) {
    return <p>Select a city to view upcoming events.</p>;
  }

  if (loading) {
    return <p>Loading events for {city}...</p>; // A simple loading text (skeleton works too!)
  }

  if (error) {
    return (
      <div
        role="alert"
        style={{
          color: "#b53737",
          padding: "16px",
          background: "#fce8e8",
          borderRadius: "8px",
        }}
      >
        <strong>Error:</strong> {error.message}
      </div>
    );
  }

  if (events.length === 0) {
    return <p>No events found for {city}. Try another location!</p>;
  }

  return (
    <>
      {/* If an event is selected, show the form above the list */}
      {selectedEventId && (
        <div style={{ marginBottom: "32px" }}>
          <BookingForm 
            eventId={selectedEventId}
            onSubmit={async (bookingData) => {
              await CreateBooking({ eventId: selectedEventId, ...bookingData });
              setSelectedEventId(null); // Close the form on success
            }}
          />
          <button 
            onClick={() => setSelectedEventId(null)}
            style={{ marginTop: "12px", color: "#1E8F8E", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
          >
            Cancel Booking
          </button>
        </div>
      )}

      {/* Your existing list */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {events.map((event) => (
          <li key={event.id}>
            <EventCard event={event} onBook={handleBook} />
          </li>
        ))}
      </ul>
    </>
  );
}
