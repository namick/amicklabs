import { handleSupport, issueToken } from "@/lib/support";

export const runtime = "nodejs";

export function GET() {
  return issueToken();
}

export async function POST(request: Request) {
  return handleSupport(request);
}
