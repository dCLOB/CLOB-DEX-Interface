import { userService } from "@/app/api/mocks/services/users";

export async function POST(request: Request) {
  const req = await request.json();
  userService.deposit(req.address, req.token, req.amount);

  return Response.json("ok");
}
