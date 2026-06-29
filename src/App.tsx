import { useState } from "react";
import { EventList } from "./features/events/EventList";

export default function App() {
  const [city, setCity] = useState("");
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.38),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(217,70,239,0.34),_transparent_32%),linear-gradient(135deg,_#f8fafc_0%,_#ecfeff_42%,_#fff1f2_100%)] px-5 py-8 font-sans text-slate-950 sm:px-8 sm:py-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="rounded-3xl border border-white/70 bg-white/65 p-6 shadow-xl shadow-cyan-900/10 backdrop-blur sm:p-8">
          <p className="mb-2 text-sm font-bold uppercase text-fuchsia-600">
            City experiences
          </p>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-black text-slate-950 sm:text-5xl">
                Upcoming Events
              </h1>
              <p className="mt-3 max-w-2xl text-base font-medium text-slate-600">
                Find bright, memorable events near you and book a seat in a few
                clicks.
              </p>
            </div>

            <label className="flex w-full flex-col gap-2 rounded-2xl border border-white bg-white/80 p-3 text-sm font-bold text-slate-700 shadow-lg shadow-purple-900/10 sm:max-w-xs">
              Choose a city
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full cursor-pointer rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-base font-semibold text-slate-900 outline-none transition-all duration-200 hover:border-purple-300 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/30"
              >
                <option value="">-- Select a city --</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Mumbai">Mumbai</option>
              </select>
            </label>
          </div>
        </header>

        <main>
          <EventList city={city} />
        </main>
      </div>
    </div>
  );
}
