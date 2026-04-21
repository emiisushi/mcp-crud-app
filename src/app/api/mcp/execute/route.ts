import { NextResponse } from "next/server";
import { executePersonMcpTool, personMcpTools } from "@/lib/mcp-tools";

export async function GET() {
  return NextResponse.json({ ok: true, tools: personMcpTools });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      toolName?: string;
      args?: Record<string, unknown>;
    };

    if (!body.toolName) {
      return NextResponse.json({ ok: false, error: "toolName is required." }, { status: 400 });
    }

    const result = await executePersonMcpTool(body.toolName, body.args ?? {});
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "MCP call failed.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
