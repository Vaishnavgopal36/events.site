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
  const [bookings, setBookings] = useState<any[]>([]);
  const handleBook = useCallback((eventId: number) => {
    setSelectedEventId(eventId);
  }, []);

  // State 1: Idle
  if (!city) {
    return (
      <p className="text-slate-500">Select a city to view upcoming events.</p>
    );
  }

  // State 2: Loading
  if (loading) {
    return (
      <p className="text-slate-500 animate-pulse">
        Loading events for {city}...
      </p>
    );
  }

  // State 3: Error
  if (error) {
    return (
      <div
        role="alert"
        className="text-red-700 bg-red-50 p-4 rounded-lg border border-red-200"
      >
        <strong>Error:</strong> {error.message}
      </div>
    );
  }

  // State 4a: Success but empty
  if (events.length === 0) {
    return (
      <p className="text-slate-500">
        No events found for {city}. Try another location!
      </p>
    );
  }

  // State 4b: Success with data
  return (
    <>
      {/* 1. The Main Event List */}
      <ul className="list-none p-0 m-0 space-y-4">
        {events.map((event) => (
          <li key={event.id}>
            <EventCard event={event} onBook={handleBook} />
          </li>
        ))}
      </ul>

      {/* 2. The Modal Overlay (Only renders if an event is selected) */}
      {selectedEventId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          {/* Modal Container */}
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
            {/* Close Button (X icon) */}
            <button
              onClick={() => setSelectedEventId(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
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
            <h3 className="text-xl font-bold text-slate-800 mb-1">
              Complete Booking
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Secure your tickets before they sell out.
            </p>

            {/* The Form */}
            <BookingForm
              eventId={selectedEventId}
              onSubmit={async (bookingData) => {
                // 1. Capture the returned data from our mock backend
                const newBooking = await CreateBooking({ 
                  eventId: selectedEventId, 
                  ...bookingData 
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
