import { type NextRequest } from "next/server";
import { orderService } from "@/app/api/mocks/services/orders";

type Params = {
  id: string;
};

export async function DELETE(request: NextRequest, context: { params: Params }) {
  const address = request.headers.get("Authorization");
  if (!address) return Response.json("", { status: 401 });

  orderService.cancelOrder(context.params.id);
  return Response.json("ok");
}
