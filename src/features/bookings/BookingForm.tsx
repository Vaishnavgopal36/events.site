import { useState } from "react";

type BookingFormProps = {
  eventId: number;
  onSubmit: (booking: {
    name: string;
    email: string;
    seats: number;
  }) => Promise<void>;
};

export function BookingForm({ eventId, onSubmit }: BookingFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [seats, setSeats] = useState<number | "">(1);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit =
    name.trim().length > 0 &&
    isEmailValid &&
    typeof seats === "number" &&
    seats >= 1 &&
    seats <= 10 &&
    !submitting;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await onSubmit({ name, email, seats: seats as number });
      setName("");
      setEmail("");
      setSeats(1);
      alert("Booking successful!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Booking failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        border: "2px solid #1E8F8E",
        padding: "20px",
        borderRadius: "8px",
        marginTop: "16px",
        background: "#E3F7F6",
      }}
    >
      <h4 style={{ marginTop: 0, color: "#135858" }}>Book Tickets</h4>

      {error && (
        <div
          role="alert"
          style={{
            color: "white",
            background: "#F47E7E",
            padding: "8px",
            marginBottom: "16px",
            borderRadius: "4px",
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
              boxSizing: "border-box",
            }}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={email !== "" && !isEmailValid}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
              boxSizing: "border-box",
            }}
          />
        </label>

        <label>
          Seats (1-10):
          <input
            type="number"
            min="1"
            max="10"
            value={seats}
            onChange={(e) =>
              setSeats(e.target.value === "" ? "" : parseInt(e.target.value))
            }
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
              boxSizing: "border-box",
            }}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        style={{
          padding: "10px 20px",
          background: canSubmit ? "#17A4A3" : "#7E8A9A",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: canSubmit ? "pointer" : "not-allowed",
        }}
      >
        {submitting ? "Booking..." : "Confirm Booking"}
      </button>
    </form>
  );
}
