import { UserData, userService } from "@/app/api/mocks/services/users";
import { type NextRequest } from "next/server";
import { Order } from "@/api/orders/types";
import { orderService } from "@/app/api/mocks/services/orders";

export async function GET(request: NextRequest) {
  const address = request.headers.get("Authorization");
  if (!address) return Response.json("", { status: 401 });

  const user: UserData = await userService.getOrCreateUser(address);
  const orders: Order[] = orderService
    .getUserClosedOrders(user)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return Response.json(orders);
}
