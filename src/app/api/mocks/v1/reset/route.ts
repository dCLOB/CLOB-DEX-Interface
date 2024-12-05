import { type NextRequest } from "next/server";
import { userService } from "@/app/api/mocks/services/users";
import { orderService } from "@/app/api/mocks/services/orders";
import { tradeService } from "@/app/api/mocks/services/trades";

export async function POST(request: NextRequest) {
  const address = request.headers.get("Authorization");
  if (!address) return Response.json("", { status: 401 });

  tradeService.reset();
  orderService.reset();
  userService.reset();

  return Response.json("ok");
}
