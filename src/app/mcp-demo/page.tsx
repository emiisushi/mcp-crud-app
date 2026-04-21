"use client";

import Link from "next/link";
import { useState } from "react";

type ToolCall = {
  label: string;
  toolName: string;
  args: Record<string, unknown>;
  colorClass: string;
  description: string;
};

const demoCalls: ToolCall[] = [
  {
    label: "List All Persons",
    toolName: "person_list",
    args: {},
    colorClass: "text-sky-400",
    description: "Fetches all person records via MCP",
  },
  {
    label: "Create Person",
    toolName: "person_create",
    args: {
      name: "Demo Person",
      email: `demo-${Date.now()}@mail.com`,
      age: 26,
      city: "Manila",
    },
    colorClass: "text-emerald-400",
    description: "Creates a new person via MCP tool",
  },
  {
    label: "Search Persons",
    toolName: "person_list",
    args: {},
    colorClass: "text-purple-400",
    description: "Searches persons by name or email",
  },
  {
    label: "Get Person by ID",
    toolName: "person_get",
    args: { id: 1 },
    colorClass: "text-yellow-400",
    description: "Retrieves a specific person record",
  },
  {
    label: "Update Person",
    toolName: "person_update",
    args: { id: 1, city: "Quezon City" },
    colorClass: "text-orange-400",
    description: "Updates an existing person record",
  },
  {
    label: "Delete Person",
    toolName: "person_delete",
    args: { id: 1 },
    colorClass: "text-red-400",
    description: "Removes a person from the database",
  },
];

export default function MpcDemoPage() {
  const [result, setResult] = useState<string>("Run a CRUD demo action to see MCP output.");
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
    <section className="space-y-8">
      <div>
        <h1 className="hero-title">MCP Demo</h1>
        <p className="max-w-3xl text-sm sm:text-base">
          Live demonstration of MCP server CRUD operations. Each action below simulates how Claude Desktop uses MCP
          tools to manage Person records.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="panel text-center">
          <p className="font-semibold">Claude Desktop</p>
          <p className="text-sm">You type a natural language request</p>
        </div>
        <div className="panel text-center">
          <p className="font-semibold">MCP Protocol</p>
          <p className="text-sm">Claude calls the right MCP tool</p>
        </div>
        <div className="panel text-center">
          <p className="font-semibold">Neon Database</p>
          <p className="text-sm">Operation executes on real data</p>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-4xl" style={{ fontFamily: "var(--font-display)" }}>
          Live CRUD Demo
        </h2>
        <p>Click any operation below to run it against the real database, just like the MCP server does.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {demoCalls.map((call) => (
            <button
              key={call.label}
              className="panel text-left"
              onClick={() => runCall(call)}
              disabled={loadingLabel !== null}
            >
              <p className={`text-2xl ${call.colorClass}`} style={{ fontFamily: "var(--font-display)" }}>
                {loadingLabel === call.label ? "Running..." : call.label}
              </p>
              <p className="mono text-sm mt-1">{call.toolName}()</p>
              <p className="text-sm mt-1">{call.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="panel space-y-3">
        <h2 className="text-4xl" style={{ fontFamily: "var(--font-display)" }}>
          Example Claude Desktop Conversations
        </h2>

        <div className="panel space-y-2">
          <p className="mono text-sm">USER   List all persons in the database</p>
          <p className="mono text-sm">CLAUDE I&apos;ll use the list_persons MCP tool to fetch all records.</p>
          <p className="mono text-sm">TOOL   list_persons()</p>
          <p className="mono text-sm">{`RESULT [{ id: 1, name: "Maria Santos", email: "maria.santos@email.com" }]`}</p>
        </div>

        <div className="panel space-y-2">
          <p className="mono text-sm">
            USER   Add a new person: John Doe, john@example.com, age 25, phone number +63 946 882 2314, and address
            Ilagan City, Isabela
          </p>
          <p className="mono text-sm">CLAUDE Creating a new person record using the create_person MCP tool.</p>
          <p className="mono text-sm">TOOL   create_person({`{ name: "John Doe", email: "john@example.com" }`})</p>
          <p className="mono text-sm">RESULT {`{ id: 6, name: "John Doe", email: "john@example.com" }`}</p>
        </div>

        <div className="panel space-y-2">
          <p className="mono text-sm">USER   Delete the person with ID 1</p>
          <p className="mono text-sm">CLAUDE I&apos;ll remove that record using the delete_person MCP tool.</p>
          <p className="mono text-sm">TOOL   delete_person({`{ id: 1 }`})</p>
          <p className="mono text-sm">RESULT {`{ message: "Person deleted successfully" }`}</p>
        </div>
      </div>

      <div className="panel text-center space-y-3">
        <h2 className="text-4xl" style={{ fontFamily: "var(--font-display)" }}>
          Ready to Try It Yourself?
        </h2>
        <p>Follow the setup guide to connect this MCP server to your own Claude Desktop.</p>
        <Link href="/mcp-setup" className="btn btn-primary no-underline inline-block">
          View Setup Guide
        </Link>
      </div>

      <div className="panel space-y-3">
        <h2 className="text-3xl" style={{ fontFamily: "var(--font-display)" }}>
          Live MCP Output
        </h2>
        <pre className="mono text-xs sm:text-sm whitespace-pre-wrap break-words">{result}</pre>
      </div>
    </section>
  );
}
