const res = {
  s: "ok",
  symbol: ["USDC-XLM", "VELO-XLM", "RIO-XLM"],
  currency: ["XLM", "XLM", "XLM"],
  description: ["USDC / XLM", "VELO / XLM", "RIO / XLM"],
  minmovement: [1, 1, 1],
  pointvalue: [0.0000001, 0.0000001, 0.0000001],
  pricescale: [10000000, 10000000, 10000000],
  timezone: ["Etc/UTC", "Etc/UTC", "Etc/UTC"],
  type: ["crypto", "crypto", "crypto"],
  "base-currency": ["USDC", "VELO", "RIO"],
  "exchange-listed": ["Orderly", "Orderly", "Orderly"],
  "exchange-traded": ["Orderly", "Orderly", "Orderly"],
  "has-intraday": [true, true, true],
  "session-regular": ["24x7", "24x7", "24x7"],
  "has-daily": [true, true, true],
};

export async function GET() {
  return Response.json(res);
}
