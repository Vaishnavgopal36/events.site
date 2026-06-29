import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const bookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  seats: z.coerce
    .number()
    .min(1, "At least one seat must be booked")
    .max(10, "You can book a maximum of 10 seats"),
});

type BookingFormData = z.infer<typeof bookingSchema>;
type BookingFormProps = {
  eventId: number;
  onSubmit: (booking: BookingFormData) => Promise<void>;
};
export function BookingForm({ eventId, onSubmit }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      seats: 1,
    },
  });
  const processSubmit = async (data: BookingFormData) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error: any) {
      setError("root", {
        type: "manual",
        message: error.message || "An error occurred",
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(processSubmit)}
      noValidate
      className="border-2 border-teal-600 bg-teal-50 p-5 rounded-lg mt-4"
    >
      <h4 className="mt-0 text-teal-800 font-bold mb-4">Book Tickets</h4>

      {/* Root/API Errors */}
      {errors.root && (
        <div
          role="alert"
          className="bg-red-400 text-white p-2 mb-4 rounded text-sm"
        >
          {errors.root.message}
        </div>
      )}

      <div className="flex flex-col gap-3 mb-4">
        {/* Name Field */}
        <label className="text-sm font-medium text-slate-700">
          Name:
          <input
            type="text"
            {...register("name")} // This replaces value={} and onChange={}!
            className="w-full p-2 mt-1 border border-slate-300 rounded bg-white"
          />
          {errors.name && (
            <span className="text-red-500 text-xs mt-1 block">
              {errors.name.message}
            </span>
          )}
        </label>

        {/* Email Field */}
        <label className="text-sm font-medium text-slate-700">
          Email:
          <input
            type="email"
            aria-invalid={!!errors.email}
            {...register("email")}
            className="w-full p-2 mt-1 border border-slate-300 rounded bg-white"
          />
          {errors.email && (
            <span className="text-red-500 text-xs mt-1 block">
              {errors.email.message}
            </span>
          )}
        </label>

        {/* Seats Field */}
        <label className="text-sm font-medium text-slate-700">
          Seats (1-10):
          <input
            type="number"
            {...register("seats")}
            className="w-full p-2 mt-1 border border-slate-300 rounded bg-white"
          />
          {errors.seats && (
            <span className="text-red-500 text-xs mt-1 block">
              {errors.seats.message}
            </span>
          )}
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-5 py-2 bg-teal-600 text-white border-none rounded cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed hover:bg-teal-700 transition-colors"
      >
        {isSubmitting ? "Booking..." : "Confirm Booking"}
      </button>
    </form>
  );
}
