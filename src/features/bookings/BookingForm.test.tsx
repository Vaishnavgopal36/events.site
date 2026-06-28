// src/features/bookings/BookingForm.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { BookingForm } from "./BookingForm";

describe("BookingForm", () => {
  it("submits the correct payload when the user fills valid data", async () => {
    // 1. Create a "spy" function so we can check if it was called
    const mockOnSubmit = vi.fn().mockResolvedValue(undefined);

    // 2. Render the component into our virtual test browser
    render(<BookingForm eventId={99} onSubmit={mockOnSubmit} />);

    // 3. Set up our virtual user
    const user = userEvent.setup();

    // 4. Simulate a user typing into the inputs
    // We find inputs the way a screen reader does: by their label!
    await user.type(screen.getByLabelText(/name/i), "Alice Engineer");
    await user.type(screen.getByLabelText(/email/i), "alice@example.com");

    const seatsInput = screen.getByLabelText(/seats/i);
    await user.clear(seatsInput); // Clear the default "1"
    await user.type(seatsInput, "3");

    // 5. Click the submit button
    await user.click(screen.getByRole("button", { name: /confirm booking/i }));

    // 6. Assert our spy function was called with the exact right data
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: "Alice Engineer",
      email: "alice@example.com",
      seats: 3,
    });
  });
});
