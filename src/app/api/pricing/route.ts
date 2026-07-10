import { NextResponse } from "next/server";
import { getPricingData } from "@/lib/pricing";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getPricingData();
  return NextResponse.json(data);
}
