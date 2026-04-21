export default function AboutPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="uppercase tracking-[0.24em] text-xs font-semibold text-[#1f3f34]">Architecture</p>
        <h1 className="hero-title">About</h1>
      </div>

      <div className="panel space-y-4">
        <h2 className="text-2xl" style={{ fontFamily: "var(--font-display)" }}>
          MCP Integration Flow
        </h2>
        <p>
          This application exposes Person CRUD in two layers: direct app operations and MCP-mediated operations for AI
          agents. Both paths hit the same validated service layer and PostgreSQL database.
        </p>
        <pre className="mono text-xs sm:text-sm whitespace-pre-wrap break-words bg-[#f4efe2] p-4 rounded-xl border border-[#d9d1be]">{`Claude Desktop
   -> person-crud MCP server (mcp-server/person-mcp-server.mjs)
   -> Next.js API endpoints (/api/people, /api/mcp/execute)
   -> person-service (shared validation + business logic)
   -> PostgreSQL (DATABASE_URL)`}</pre>
      </div>

      <div className="panel space-y-4">
        <h2 className="text-2xl" style={{ fontFamily: "var(--font-display)" }}>
          Production Readiness Notes
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Type-safe validation using Zod before DB writes.</li>
          <li>Single shared service layer prevents logic drift between app and MCP calls.</li>
          <li>Vercel-compatible API routes and env-based DB credentials.</li>
          <li>Tool contracts documented and demonstrable in /mcp-demo.</li>
        </ul>
      </div>
    </section>
  );
}
