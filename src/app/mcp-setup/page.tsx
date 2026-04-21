import Image from "next/image";

const setupSteps = [
  "Deploy this app to Vercel and copy your production URL.",
  "Create a .env.local file for local development with DATABASE_URL and APP_BASE_URL.",
  "Run the MCP server from this repository: node mcp-server/person-mcp-server.mjs.",
  "Add the MCP server command to Claude Desktop config.",
  "In Claude Desktop, invoke tools: person_list, person_create, person_get, person_update, person_delete.",
];

export default function MpcSetupPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="uppercase tracking-[0.24em] text-xs font-semibold text-[#1f3f34]">Evaluator Guide</p>
        <h1 className="hero-title">MCP Setup</h1>
        <p className="max-w-3xl text-sm sm:text-base">
          Step-by-step setup instructions for connecting the Person CRUD MCP server to Claude Desktop and validating
          live database operations.
        </p>
      </div>

      <div className="panel space-y-5">
        <h2 className="text-2xl" style={{ fontFamily: "var(--font-display)" }}>
          1) Setup Steps
        </h2>
        <ol className="list-decimal pl-6 space-y-2">
          {setupSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="panel space-y-3">
          <h2 className="text-2xl" style={{ fontFamily: "var(--font-display)" }}>
            2) Claude Desktop Config Example
          </h2>
          <pre className="mono text-xs sm:text-sm whitespace-pre-wrap break-words bg-[#f4efe2] p-4 rounded-xl border border-[#d9d1be]">{`{
  "mcpServers": {
    "person-crud": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-crud-app/mcp-server/person-mcp-server.mjs"],
      "env": {
        "APP_BASE_URL": "https://personsearch-omega.vercel.app"
      }
    }
  }
}`}</pre>
        </div>

        <div className="panel space-y-3">
          <h2 className="text-2xl" style={{ fontFamily: "var(--font-display)" }}>
            3) API + MCP Tool Contracts
          </h2>
          <pre className="mono text-xs sm:text-sm whitespace-pre-wrap break-words bg-[#f4efe2] p-4 rounded-xl border border-[#d9d1be]">{`REST API
GET    /api/people
POST   /api/people
GET    /api/people/:id
PATCH  /api/people/:id
DELETE /api/people/:id

MCP Tools
person_list()
person_get({ id })
person_create({ name, email, age, city })
person_update({ id, ...fields })
person_delete({ id })`}</pre>
        </div>
      </div>

      <div className="panel space-y-3">
        <h2 className="text-2xl" style={{ fontFamily: "var(--font-display)" }}>
          4) Claude Desktop Working Example
        </h2>
        <p className="text-sm">Example screenshot/mock showing MCP tools running successfully.</p>
        <Image
          src="/claude-mcp-example.svg"
          alt="Claude Desktop MCP tools example"
          width={1200}
          height={700}
          className="w-full h-auto rounded-xl border border-[#d9d1be]"
        />
      </div>
    </section>
  );
}
