import Link from "next/link";

const repoUrl = "https://github.com/emiisushi/mcp-crud-app";
const appLinks = [
  "https://personsearch-omega.vercel.app/",
  "https://personsearch-omega.vercel.app/about",
  "https://personsearch-omega.vercel.app/github",
  "https://personsearch-omega.vercel.app/mcp-setup",
  "https://personsearch-omega.vercel.app/mcp-demo",
];

export default function GithubPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="uppercase tracking-[0.24em] text-xs font-semibold text-[#1f3f34]">Repository</p>
        <h1 className="hero-title">GitHub</h1>
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
        <div className="space-y-2">
          {appLinks.map((link) => (
            <p key={link} className="mono text-sm bg-[#f4efe2] p-3 rounded-xl border border-[#d9d1be]">
              <Link href={link} target="_blank" rel="noopener noreferrer" className="no-underline text-inherit">
                {link}
              </Link>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
