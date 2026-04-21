export default function AboutPage() {
  const stackItems = [
    {
      title: "Next.js 16",
      description: "React framework with App Router for server-side rendering and API routes.",
    },
    {
      title: "PostgreSQL + Neon",
      description: "Relational database on Neon serverless Postgres for Person data.",
    },
    {
      title: "Tailwind CSS",
      description: "Utility-first CSS framework for fast, responsive interface layout.",
    },
    {
      title: "TypeScript",
      description: "Typed JavaScript for safer APIs and predictable component behavior.",
    },
    {
      title: "Vercel",
      description: "Production deployment platform with automatic CI/CD and global CDN.",
    },
    {
      title: "GitHub",
      description: "Version control, collaboration, and submission repository hosting.",
    },
    {
      title: "MCP Protocol",
      description: "Model Context Protocol for Claude Desktop tool-based CRUD operations.",
    },
    {
      title: "Claude Desktop",
      description: "AI client that invokes MCP tools to manage Person records.",
    },
  ];

  return (
    <section className="space-y-8">
      <div>
        <p className="uppercase tracking-[0.24em] text-xs font-semibold text-[#1f3f34]">Architecture</p>
        <h1 className="hero-title">About Person Search</h1>
        <p className="max-w-3xl text-sm sm:text-base">
          Person Search is a full-stack application with MCP integration, enabling AI-powered database operations
          through Claude Desktop alongside traditional CRUD functionality.
        </p>
      </div>

      <div className="panel space-y-4">
        <h2 className="text-3xl" style={{ fontFamily: "var(--font-display)" }}>
          App Overview
        </h2>
        <p>
          Person Search is a production-grade full-stack web application developed as part of a university coursework
          project. It supports the complete CRUD lifecycle for Person records, backed by a PostgreSQL database and
          enhanced with an MCP server that enables Claude Desktop to perform database operations via natural language.
        </p>
        <p>Built as a complete MCP-enabled Person management platform for evaluation and real-world workflow demos.</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-4xl" style={{ fontFamily: "var(--font-display)" }}>
          MCP Integration Architecture
        </h2>
        <p>
          The MCP server bridges Claude Desktop and the Person database. When Claude receives commands, it invokes MCP
          tools that call the same validated service layer used by the web app.
        </p>

        <div className="panel">
          <pre className="mono text-xs sm:text-sm whitespace-pre-wrap break-words">{`You (User)        -> Type natural language prompt         -> Claude Desktop
Claude Desktop    -> Calls matching MCP tool              -> MCP Server
MCP Server        -> Executes CRUD via API/service layer  -> Neon Database
Neon Database     -> Returns result data                  -> Claude Desktop
Claude Desktop    -> Presents output in chat              -> You (User)`}</pre>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="panel">
            <p className="uppercase tracking-[0.2em] text-xs font-semibold">MCP Tools</p>
            <h3 className="text-3xl" style={{ fontFamily: "var(--font-display)" }}>
              5 tools
            </h3>
            <p className="mono text-sm">list, get, create, update, delete</p>
          </div>

          <div className="panel">
            <p className="uppercase tracking-[0.2em] text-xs font-semibold">Protocol</p>
            <h3 className="text-3xl" style={{ fontFamily: "var(--font-display)" }}>
              MCP v1
            </h3>
            <p>Model Context Protocol by Anthropic</p>
          </div>

          <div className="panel">
            <p className="uppercase tracking-[0.2em] text-xs font-semibold">AI Client</p>
            <h3 className="text-3xl" style={{ fontFamily: "var(--font-display)" }}>
              Claude Desktop
            </h3>
            <p>Connects through standard MCP transport and tool calls.</p>
          </div>

          <div className="panel">
            <p className="uppercase tracking-[0.2em] text-xs font-semibold">Data Access</p>
            <h3 className="text-3xl" style={{ fontFamily: "var(--font-display)" }}>
              SQL Service Layer
            </h3>
            <p>Type-safe validation plus SQL operations over PostgreSQL.</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-4xl" style={{ fontFamily: "var(--font-display)" }}>
          App Architecture
        </h2>

        <div className="panel grid gap-3 sm:grid-cols-[70px_1fr] sm:items-start">
          <p className="text-5xl leading-none" style={{ fontFamily: "var(--font-display)" }}>
            01
          </p>
          <div>
            <h3 className="text-2xl" style={{ fontFamily: "var(--font-display)" }}>
              Client Layer
            </h3>
            <p>Next.js App Router pages and interactive UI for forms, search, and CRUD operations.</p>
          </div>
        </div>

        <div className="panel grid gap-3 sm:grid-cols-[70px_1fr] sm:items-start">
          <p className="text-5xl leading-none" style={{ fontFamily: "var(--font-display)" }}>
            02
          </p>
          <div>
            <h3 className="text-2xl" style={{ fontFamily: "var(--font-display)" }}>
              API Layer
            </h3>
            <p>
              Route handlers at <span className="mono">/api/people</span> and <span className="mono">/api/mcp/execute</span> for
              REST and MCP orchestration.
            </p>
          </div>
        </div>

        <div className="panel grid gap-3 sm:grid-cols-[70px_1fr] sm:items-start">
          <p className="text-5xl leading-none" style={{ fontFamily: "var(--font-display)" }}>
            03
          </p>
          <div>
            <h3 className="text-2xl" style={{ fontFamily: "var(--font-display)" }}>
              Service Layer
            </h3>
            <p>Shared business logic validates payloads and executes safe operations for both UI and MCP calls.</p>
          </div>
        </div>

        <div className="panel grid gap-3 sm:grid-cols-[70px_1fr] sm:items-start">
          <p className="text-5xl leading-none" style={{ fontFamily: "var(--font-display)" }}>
            04
          </p>
          <div>
            <h3 className="text-2xl" style={{ fontFamily: "var(--font-display)" }}>
              Database Layer
            </h3>
            <p>PostgreSQL on Neon stores all Person records with persistent schema and transactional writes.</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-4xl" style={{ fontFamily: "var(--font-display)" }}>
          Technology Stack
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {stackItems.map((item) => (
            <div key={item.title} className="panel space-y-2">
              <h3 className="text-2xl" style={{ fontFamily: "var(--font-display)" }}>
                {item.title}
              </h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="panel space-y-4">
        <h2 className="text-4xl" style={{ fontFamily: "var(--font-display)" }}>
          CRUD Features
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="panel">
            <p className="uppercase tracking-[0.2em] text-xs font-semibold">Create</p>
            <p className="text-lg">Add new person via form or MCP tool.</p>
            <p className="mono text-sm">POST /api/people</p>
          </div>
          <div className="panel">
            <p className="uppercase tracking-[0.2em] text-xs font-semibold">Read</p>
            <p className="text-lg">List and search persons with filtering.</p>
            <p className="mono text-sm">GET /api/people</p>
          </div>
          <div className="panel">
            <p className="uppercase tracking-[0.2em] text-xs font-semibold">Update</p>
            <p className="text-lg">Edit existing person from app or MCP.</p>
            <p className="mono text-sm">PATCH /api/people/:id</p>
          </div>
          <div className="panel">
            <p className="uppercase tracking-[0.2em] text-xs font-semibold">Delete</p>
            <p className="text-lg">Remove person through app or MCP workflow.</p>
            <p className="mono text-sm">DELETE /api/people/:id</p>
          </div>
        </div>
      </div>
    </section>
  );
}
