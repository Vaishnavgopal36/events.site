// src/features/events/EventList.tsx
import { useState, useCallback } from "react";
import { useEvents } from "./useEvents";
import { EventCard } from "./EventCard";
import { BookingForm } from "../bookings/BookingForm";
import { CreateBooking } from "../../api/events";

type EventListProps = {
  city: string;
};

export function EventList({ city }: EventListProps) {
  const { events, loading, error } = useEvents(city);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [, setBookings] = useState<any[]>([]);
  const handleBook = useCallback((eventId: number) => {
    setSelectedEventId(eventId);
  }, []);

  // State 1: Idle
  if (!city) {
    return (
      <div className="rounded-3xl border border-dashed border-purple-200 bg-white/70 p-8 text-center shadow-lg shadow-purple-900/10 backdrop-blur">
        <p className="text-lg font-semibold text-slate-600">
          Select a city to view upcoming events.
        </p>
      </div>
    );
  }

  // State 2: Loading
  if (loading) {
    return (
      <div className="rounded-3xl border border-cyan-100 bg-white/75 p-8 shadow-lg shadow-cyan-900/10 backdrop-blur">
        <p className="animate-pulse text-lg font-semibold text-cyan-700">
          Loading events for {city}...
        </p>
      </div>
    );
  }

  // State 3: Error
  if (error) {
    return (
      <div
        role="alert"
        className="rounded-2xl border-2 border-rose-200 bg-rose-50/90 p-5 text-rose-700 shadow-lg shadow-rose-900/10"
      >
        <strong>Error:</strong> {error.message}
      </div>
    );
  }

  // State 4a: Success but empty
  if (events.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-fuchsia-200 bg-white/70 p-8 text-center shadow-lg shadow-fuchsia-900/10 backdrop-blur">
        <p className="text-lg font-semibold text-slate-600">
          No events found for {city}. Try another location!
        </p>
      </div>
    );
  }

  // State 4b: Success with data
  return (
    <>
      {/* 1. The Main Event List */}
      <ul className="m-0 grid list-none gap-5 p-0 md:grid-cols-2">
        {events.map((event) => (
          <li key={event.id}>
            <EventCard event={event} onBook={handleBook} />
          </li>
        ))}
      </ul>

      {/* 2. The Modal Overlay (Only renders if an event is selected) */}
      {selectedEventId && (
        <div className="fixed inset-0 z-50 flex animate-in fade-in items-center justify-center bg-slate-900/40 p-4 opacity-100 backdrop-blur-md transition-opacity duration-200 ease-out starting:opacity-0">
          {/* Modal Container */}
          <div className="relative w-full max-w-md animate-in fade-in zoom-in-95 scale-100 rounded-3xl border border-white bg-white p-7 opacity-100 shadow-2xl shadow-slate-950/30 transition-all duration-300 ease-out starting:scale-95 starting:opacity-0 sm:p-8">
            {/* Close Button (X icon) */}
            <button
              onClick={() => setSelectedEventId(null)}
              className="absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all duration-200 hover:bg-rose-100 hover:text-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-500/20 active:scale-95"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Modal Header */}
            <h3 className="mb-1 pr-10 text-2xl font-black text-slate-950">
              Complete Booking
            </h3>
            <p className="mb-5 pr-8 text-sm font-medium text-slate-500">
              Secure your tickets before they sell out.
            </p>

            {/* The Form */}
            <BookingForm
              eventId={selectedEventId}
              onSubmit={async (bookingData) => {
                // 1. Capture the returned data from our mock backend
                const newBooking = await CreateBooking({
                  eventId: selectedEventId,
                  ...bookingData,
                });

                // 2. Update our local state array immutably
                setBookings((prevBookings) => {
                  const updatedList = [...prevBookings, newBooking];

                  // 3. Print the full list to the console!
                  console.log(" Current Bookings:", updatedList);

                  return updatedList;
                });

                // 4. Close the modal
                setSelectedEventId(null);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
