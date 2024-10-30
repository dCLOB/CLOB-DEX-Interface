import { type NextRequest } from "next/server";
import { orderService } from "@/app/api/mocks/services/orders";

type Params = {
  pair: string;
};

export async function GET(request: NextRequest, context: { params: Params }) {
  const orderbook = orderService.getOrderbook(context.params.pair);

  return Response.json(orderbook);
}
