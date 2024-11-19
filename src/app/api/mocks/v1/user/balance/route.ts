import { UserData, userService } from "@/app/api/mocks/services/users";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const address = request.headers.get("Authorization");
  if (!address) return Response.json("", { status: 401 });

  const response: UserData = await userService.getOrCreateUser(address);
  return Response.json(response);
}
