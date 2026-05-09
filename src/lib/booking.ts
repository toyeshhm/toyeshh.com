export const BOOKING_DURATION_OPTIONS = [
  { duration: "15", label: "Quick call (15 min)" },
  { duration: "30", label: "Deep dive (30 min+)" },
] as const;

export type BookingDuration = (typeof BOOKING_DURATION_OPTIONS)[number]["duration"];

export const DEFAULT_BOOKING_DURATION: BookingDuration = "15";
export const BOOKING_GATE_PATH = "/book";

export const parseBookingDuration = (
  value: string | null | undefined,
): BookingDuration => (value === "30" ? "30" : DEFAULT_BOOKING_DURATION);

export const buildBookingGatePath = (duration: BookingDuration) =>
  `${BOOKING_GATE_PATH}?duration=${duration}`;
