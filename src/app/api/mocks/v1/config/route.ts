const res = {
  supported_resolutions: ["30", "60", "1D", "1M", "1", "5", "15", "240", "1W"],
  supports_marks: false,
  supports_timescale_marks: false,
  supports_group_request: true,
  supports_search: false,
};

export async function GET() {
  return Response.json(res);
}
