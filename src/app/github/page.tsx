import Link from "next/link";

const repoUrl = "https://github.com/emiisushi/mcp-crud-app";
const deploymentInspectUrl = "https://vercel.com/emiisushis-projects/mcp-crud-app/4HR7pXPX18uvGRaNk4G21c7ntijB";
const productionUrl = "https://mcp-crud-app.vercel.app";

export default function GithubPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="uppercase tracking-[0.24em] text-xs font-semibold text-[#1f3f34]">Repository</p>
        <h1 className="hero-title">/github</h1>
      </div>

      <div className="panel space-y-4">
        <h2 className="text-2xl" style={{ fontFamily: "var(--font-display)" }}>
          Person MCP Server Repository
        </h2>
        <p>
          Evaluators can inspect source code, MCP server files, and deployment history directly from the repository
          below.
        </p>
        <Link
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary inline-block no-underline"
        >
          Open GitHub Repository
        </Link>
        <p className="mono text-sm bg-[#f4efe2] p-3 rounded-xl border border-[#d9d1be]">{repoUrl}</p>

        <h3 className="text-xl pt-2" style={{ fontFamily: "var(--font-display)" }}>
          Deployment Links
        </h3>
        <div className="flex flex-wrap gap-2">
          <Link
            href={productionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary inline-block no-underline"
          >
            Open Production App
          </Link>
          <Link
            href={deploymentInspectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline inline-block no-underline"
          >
            Open Deployment Inspect
          </Link>
        </div>
        <p className="mono text-sm bg-[#f4efe2] p-3 rounded-xl border border-[#d9d1be]">{deploymentInspectUrl}</p>
      </div>
    </section>
  );
}
