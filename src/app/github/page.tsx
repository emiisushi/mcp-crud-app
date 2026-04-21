import Link from "next/link";

const appRepoUrl = "https://github.com/emiisushi/mcp-crud-app";
const mcpRepoUrl = "https://github.com/emiisushi/mcp-crud-app/tree/main/mcp-server";
const profileUrl = "https://github.com/emiisushi";

const localRunSteps = [
  {
    command: "git clone https://github.com/emiisushi/mcp-crud-app.git",
    detail: "Clone the full-stack app repository",
  },
  {
    command: "git clone https://github.com/emiisushi/mcp-crud-app.git",
    detail: "Clone the MCP server repository folder from the same project",
  },
  {
    command: "cd mcp-crud-app && npm install",
    detail: "Install app dependencies",
  },
  {
    command: "cp .env.example .env # Add your DATABASE_URL",
    detail: "Set up environment variables",
  },
  {
    command: "npm run build",
    detail: "Build the app and MCP server",
  },
  {
    command: "npm run dev",
    detail: "Start the development server at localhost:3000",
  },
];

export default function GithubPage() {
  return (
    <section className="space-y-8">
      <div>
        <p className="uppercase tracking-[0.24em] text-xs font-semibold text-[#1f3f34]">Repository</p>
        <h1 className="hero-title">GitHub Repository</h1>
        <p className="max-w-3xl text-sm sm:text-base">
          All source code for this project is publicly available on GitHub. Click the links below to view the
          repositories.
        </p>
      </div>

      <div className="panel space-y-4">
        <div className="panel space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-3xl" style={{ fontFamily: "var(--font-display)" }}>
              person_search
            </h2>
            <Link href={appRepoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary no-underline">
              View on GitHub
            </Link>
          </div>
          <p>
            Full-stack Person CRUD application built with Next.js, TypeScript, and PostgreSQL. Includes complete
            create, read, update, and delete operations with MCP integration.
          </p>
          <p className="mono text-sm">Next.js 16 · TypeScript · MCP · PostgreSQL · Tailwind CSS · Vercel</p>
        </div>

        <div className="panel space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-3xl" style={{ fontFamily: "var(--font-display)" }}>
              person_mcp_server
            </h2>
            <Link href={mcpRepoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary no-underline">
              View on GitHub
            </Link>
          </div>
          <p>
            MCP server that enables Claude Desktop to perform Person CRUD operations through tool calls connected to
            the app backend.
          </p>
          <p className="mono text-sm">MCP · Node.js · TypeScript · SQL</p>
        </div>

        <div className="panel space-y-3">
          <h2 className="text-3xl" style={{ fontFamily: "var(--font-display)" }}>
            GitHub Profile
          </h2>
          <p className="text-xl font-semibold">Rexie Vargas</p>
          <p className="mono text-sm">@emiisushi</p>
          <p>3rd Year BSIT Student · St. Paul University Philippines</p>
          <Link href={profileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary no-underline">
            @emiisushi
          </Link>
        </div>

        <div className="panel space-y-4">
          <h2 className="text-4xl" style={{ fontFamily: "var(--font-display)" }}>
            How to Run Locally
          </h2>
          <div className="space-y-3">
            {localRunSteps.map((step, index) => (
              <div key={step.command} className="panel">
                <p className="mono text-sm">{index + 1}  {step.command}</p>
                <p className="text-sm mt-1">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
