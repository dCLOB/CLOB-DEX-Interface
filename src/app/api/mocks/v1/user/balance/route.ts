import { UserData, userService } from "@/app/api/mocks/services/users";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get("address");
  if (!address) return Response.json("", { status: 401 });

  const response: UserData = userService.getOrCreateUser(address);
  return Response.json(response);
}
