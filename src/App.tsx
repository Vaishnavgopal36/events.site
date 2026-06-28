import { useState } from "react";
import { EventList} from "./features/events/EventList";

export default function App() {
  const [city, setCity] = useState("");
  return(
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px", fontFamily: "sans-serif" }}>
      <h1>Upcoming Events</h1>
      
      <div style={{ marginBottom: "24px" }}>
        <label style={{ marginRight: "12px", fontWeight: "bold" }}>Choose a city:</label>
        <select 
          value={city} 
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: "8px", borderRadius: "4px" }}
        >
          <option value="">-- Select a city --</option>
          <option value="Bengaluru">Bengaluru</option>
          <option value="Mumbai">Mumbai</option>
        </select>
      </div>
      <main>
        <EventList city={city} />
      </main>
      </div>
  );
}