import { userService } from "@/app/api/mocks/services/users";

export async function POST(request: Request) {
  const req = await request.json();
  userService.withdraw(req.address, req.token, req.amount);

  return Response.json("ok");
}
