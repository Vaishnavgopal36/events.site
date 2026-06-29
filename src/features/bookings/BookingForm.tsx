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
export function BookingForm({ onSubmit }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bookingSchema) as any, // Type assertion to bypass type mismatch
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
      className="mt-5 rounded-3xl border-2 border-purple-100 bg-gradient-to-br from-slate-50 to-fuchsia-50/70 p-5 shadow-inner"
    >
      <h4 className="mb-4 mt-0 text-lg font-black text-purple-900">
        Book Tickets
      </h4>

      {/* Root/API Errors */}
      {errors.root && (
        <div
          role="alert"
          className="mb-4 rounded-2xl border border-rose-200 bg-rose-500 p-3 text-sm font-bold text-white shadow-lg shadow-rose-900/15"
        >
          {errors.root.message}
        </div>
      )}

      <div className="mb-5 flex flex-col gap-4">
        {/* Name Field */}
        <label className="text-sm font-bold text-slate-700">
          Name
          <input
            type="text"
            {...register("name")} // This replaces value={} and onChange={}!
            className="mt-2 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-base font-semibold text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-purple-300 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/30"
          />
          {errors.name && (
            <span className="mt-2 block text-xs font-bold text-rose-500">
              {errors.name.message}
            </span>
          )}
        </label>

        {/* Email Field */}
        <label className="text-sm font-bold text-slate-700">
          Email
          <input
            type="email"
            aria-invalid={!!errors.email}
            {...register("email")}
            className="mt-2 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-base font-semibold text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-purple-300 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/30"
          />
          {errors.email && (
            <span className="mt-2 block text-xs font-bold text-rose-500">
              {errors.email.message}
            </span>
          )}
        </label>

        {/* Seats Field */}
        <label className="text-sm font-bold text-slate-700">
          Seats (1-10)
          <input
            type="number"
            {...register("seats")}
            className="mt-2 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-base font-semibold text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-purple-300 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/30"
          />
          {errors.seats && (
            <span className="mt-2 block text-xs font-bold text-rose-500">
              {errors.seats.message}
            </span>
          )}
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-fuchsia-500 to-purple-600 px-5 py-3 font-black text-white shadow-lg shadow-purple-900/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-900/30 focus:outline-none focus:ring-4 focus:ring-purple-500/30 disabled:translate-y-0 disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-400 disabled:shadow-none"
      >
        {isSubmitting ? "Booking..." : "Confirm Booking"}
      </button>
    </form>
  );
}
