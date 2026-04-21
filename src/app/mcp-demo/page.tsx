"use client";

import { useState } from "react";

type ToolCall = {
  label: string;
  toolName: string;
  args: Record<string, unknown>;
};

const defaultCalls: ToolCall[] = [
  {
    label: "Create sample person",
    toolName: "person_create",
    args: {
      name: "MCP Sample",
      email: `mcp-sample-${Date.now()}@mail.com`,
      age: 30,
      city: "Manila",
    },
  },
  {
    label: "List people",
    toolName: "person_list",
    args: {},
  },
  {
    label: "Get person by id=1",
    toolName: "person_get",
    args: { id: 1 },
  },
  {
    label: "Update person id=1",
    toolName: "person_update",
    args: { id: 1, city: "Cebu" },
  },
  {
    label: "Delete person id=1",
    toolName: "person_delete",
    args: { id: 1 },
  },
];

export default function MpcDemoPage() {
  const [result, setResult] = useState<string>("Run an MCP tool call to see live output.");
  const [loadingLabel, setLoadingLabel] = useState<string | null>(null);

  async function runCall(call: ToolCall) {
    setLoadingLabel(call.label);
    setResult("Running...");

    const response = await fetch("/api/mcp/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toolName: call.toolName, args: call.args }),
    });

    const json = await response.json();
    setResult(JSON.stringify(json, null, 2));
    setLoadingLabel(null);
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="uppercase tracking-[0.24em] text-xs font-semibold text-[#1f3f34]">Live MCP Testing</p>
        <h1 className="hero-title">MCP Demo</h1>
        <p className="max-w-2xl text-sm sm:text-base">
          This panel uses the same tool contract as the MCP server. Each action executes live CRUD operations through
          the MCP execution endpoint.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="panel">
          <h2 className="text-2xl mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Tool Calls
          </h2>
          <div className="space-y-2">
            {defaultCalls.map((call) => (
              <button
                key={call.label}
                className="btn btn-secondary w-full text-left"
                onClick={() => runCall(call)}
                disabled={loadingLabel !== null}
              >
                {loadingLabel === call.label ? "Running..." : call.label}
              </button>
            ))}
          </div>
        </div>

        <div className="panel">
          <h2 className="text-2xl mb-3" style={{ fontFamily: "var(--font-display)" }}>
            MCP Output
          </h2>
          <pre className="mono text-xs sm:text-sm whitespace-pre-wrap break-words bg-[#f4efe2] p-4 rounded-xl border border-[#d9d1be]">
            {result}
          </pre>
        </div>
      </div>
    </section>
  );
}
