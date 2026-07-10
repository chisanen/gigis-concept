import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  const slug = req.nextUrl.searchParams.get("slug") || "";

  if (secret !== (process.env.PAYLOAD_SECRET || "default-secret-change-me")) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  const redirectUrl = slug === "home" || !slug ? "/" : `/${slug}`;
  return NextResponse.redirect(new URL(redirectUrl, req.url));
}
