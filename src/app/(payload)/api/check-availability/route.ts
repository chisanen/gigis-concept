import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "@/lib/payload";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");
  if (!date) {
    return NextResponse.json({ error: "date parameter required" }, { status: 400 });
  }

  try {
    const payload = await getPayload();

    const bookings = await payload.find({
      collection: "bookings",
      where: {
        eventDate: { equals: date },
        status: { in: ["confirmed", "hold", "in_production"] },
      },
      limit: 1,
    });

    const available = bookings.totalDocs === 0;

    return NextResponse.json({
      date,
      available,
      message: available
        ? "This date is available! Book now to secure it."
        : "This date is already booked. Please choose another date or join our waitlist.",
    });
  } catch {
    return NextResponse.json({ available: true, date, message: "Date appears available." });
  }
}
