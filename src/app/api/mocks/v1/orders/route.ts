import { UserData, userService } from "@/app/api/mocks/services/users";
import { type NextRequest } from "next/server";
import { Order } from "@/api/orders/types";
import { orderService } from "@/app/api/mocks/services/orders";
import { getCurrenciesFromPair } from "@/utils";

export async function POST(request: NextRequest) {
  const address = request.headers.get("Authorization");
  if (!address) return Response.json("", { status: 401 });

  const user: UserData = userService.getOrCreateUser(address);
  const orderData = await request.json();
  const order: Order = orderService.createOrder(orderData, user);
  console.log(orderData, order, orderData.amount * orderData.price);
  userService.addBalance(
    user.address,
    getCurrenciesFromPair(orderData.pair).quoteCurrency,
    -(orderData.amount * orderData.price),
  );
  return Response.json(order);
}

export async function GET(request: NextRequest) {
  const address = request.headers.get("Authorization");
  if (!address) return Response.json("", { status: 401 });

  const user: UserData = userService.getOrCreateUser(address);
  const orders: Order[] = orderService.getUserOpenOrders(user);
  return Response.json(orders);
}
