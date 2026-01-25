import { getGuestIdUseCase } from "@/core/di";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  console.log("guestId");
  const guestId = request.cookies.get("guest_id");

  if (guestId) {
    return NextResponse.next();
  }

  const newGuestId = await getGuestIdUseCase.execute();

  const response = NextResponse.next();

  response.cookies.set("guest_id", newGuestId, {
    httpOnly: true,
    path: "/",
  });

  return response;
}
