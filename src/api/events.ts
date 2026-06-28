export type Event = {
  id: number;
  title: string;
  capacity: number;
  venue: { name: string };
  city: string;
  eventDate: string;
};
type BookingPayload = {
  eventId: number;
  name: string;
  email: string;
  seats: number;
};
export const ListEvents = async (city: string): Promise<Event[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Diwali Concert",
          capacity: 200,
          venue: { name: "NIMHANS" },
          city,
          eventDate: "2026-11-16T18:00:00Z",
        },
        {
          id: 2,
          title: "UX Meetup",
          capacity: 50,
          venue: { name: "WeWork Koramangala" },
          city,
          eventDate: "2026-11-20T17:30:00Z",
        },
        {
          id: 3,
          title: "Tech Talk",
          capacity: 150,
          venue: { name: "Tarento HQ" },
          city,
          eventDate: "2026-11-22T09:00:00Z",
        },
        {
          id: 4,
          title: "Indie Rock Night",
          capacity: 300,
          venue: { name: "Fandom" },
          city,
          eventDate: "2026-11-25T20:00:00Z",
        },
        {
          id: 5,
          title: "React Workshop",
          capacity: 30,
          venue: { name: "Tarento HQ" },
          city,
          eventDate: "2026-11-28T10:00:00Z",
        },
      ]);
    }, 400);
  });
};
export const CreateBooking = async (data: BookingPayload): Promise<Event[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.seats > 10) {
        return reject(new Error("cannot book more than 10 seats"));
      } else {
        resolve({ bookingId: Math.floor(Math.random() * 1000), ...data });
      }
    }, 300);
  });
};
