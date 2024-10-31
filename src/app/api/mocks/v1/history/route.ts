import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const from = Number(request.nextUrl.searchParams.get("from")) || 0;
  const to = Number(request.nextUrl.searchParams.get("to")) || 0;
  const countback = Number(request.nextUrl.searchParams.get("countback")) || 0;

  const tDiff = Math.trunc((to - from) / countback);

  const res = {
    s: "ok",
    o: Array.from({ length: countback }, () => 0),
    c: Array.from({ length: countback }, () => 0),
    h: Array.from({ length: countback }, () => 0),
    l: Array.from({ length: countback }, () => 0),
    t: Array.from({ length: countback }, (v, i) => from + i * tDiff),
    a: null,
    v: Array.from({ length: countback }, () => 0),
  };

  return Response.json(res);
}
