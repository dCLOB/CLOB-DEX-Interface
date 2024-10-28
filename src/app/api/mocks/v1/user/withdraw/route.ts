import { userService } from "@/app/api/mocks/services/users";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const address = request.headers.get("Authorization");
  if (!address) return Response.json("", { status: 401 });

  const req = await request.json();

  userService.addBalance(address, req.token, -req.amount);

  return Response.json("ok");
}
