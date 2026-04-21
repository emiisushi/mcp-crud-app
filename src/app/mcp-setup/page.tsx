export default function MpcSetupPage() {
  const toolCards = [
    ["list_persons", "READ", "Get all persons from the database"],
    ["get_person", "READ", "Get a single person by ID"],
    ["create_person", "CREATE", "Create a new person record"],
    ["update_person", "UPDATE", "Update an existing person by ID"],
    ["delete_person", "DELETE", "Delete a person record by ID"],
    ["search_persons", "READ", "Search persons by name or email"],
  ];

  const prompts = [
    "List all persons in the database",
    "Create a new person named John Doe with the email john.doe@email.com, age 25, phone number +63 946 882 2314, and address Ilagan City, Isabela",
    "Get person with ID 2",
    "Update person 2's age to 36",
    "Search for persons named Ana Reyes",
    "Delete person with ID 1",
  ];

  return (
    <section className="space-y-8">
      <div>
        <h1 className="hero-title">MCP Server Setup</h1>
        <p className="max-w-3xl text-sm sm:text-base">
          Step-by-step guide to connect the Person CRUD MCP server to Claude Desktop, enabling AI-powered database
          operations through natural language.
        </p>
      </div>

      <div className="panel space-y-3">
        <h2 className="text-3xl" style={{ fontFamily: "var(--font-display)" }}>
          What is MCP?
        </h2>
        <p>
          Model Context Protocol (MCP) is an open standard that allows AI models like Claude to connect to external
          tools and data sources.
        </p>
        <p>
          This MCP server exposes Person CRUD operations as tools that Claude Desktop can call directly.
        </p>
        <p>
          Once configured, you can ask Claude things like &quot;List all persons&quot;, &quot;Create a person named John Doe&quot;,
          or &quot;Delete person with ID 1&quot; and Claude will execute the database operations automatically.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-4xl" style={{ fontFamily: "var(--font-display)" }}>
          Available MCP Tools
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {toolCards.map(([name, action, detail]) => (
            <div key={name} className="panel space-y-2">
              <p className="mono text-sm">
                {name} <span className="btn btn-outline" style={{ padding: "0.15rem 0.45rem" }}>{action}</span>
              </p>
              <p className="text-sm">{detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-4xl" style={{ fontFamily: "var(--font-display)" }}>
          Setup Steps
        </h2>

        <div className="panel space-y-2">
          <p className="text-3xl" style={{ fontFamily: "var(--font-display)" }}>
            01  Install Claude Desktop
          </p>
          <p>Download and install Claude Desktop from the official Anthropic website.</p>
          <p className="mono text-sm">https://claude.ai/download</p>
        </div>

        <div className="panel space-y-2">
          <p className="text-3xl" style={{ fontFamily: "var(--font-display)" }}>
            02  Clone the MCP Server Repository
          </p>
          <p>Clone the Person CRUD MCP server to your local machine.</p>
          <pre className="mono text-xs sm:text-sm whitespace-pre-wrap break-words">{`git clone https://github.com/emiisushi/mcp-crud-app.git
cd mcp-crud-app
npm install`}</pre>
        </div>

        <div className="panel space-y-2">
          <p className="text-3xl" style={{ fontFamily: "var(--font-display)" }}>
            03  Configure Environment Variables
          </p>
          <p>Create a .env file in the MCP server folder with your database connection.</p>
          <pre className="mono text-xs sm:text-sm whitespace-pre-wrap break-words">{`DATABASE_URL=postgresql://neondb_owner:YOUR_PASSWORD@ep-your-project-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
DIRECT_URL=postgresql://neondb_owner:YOUR_PASSWORD@ep-your-project.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`}</pre>
        </div>

        <div className="panel space-y-2">
          <p className="text-3xl" style={{ fontFamily: "var(--font-display)" }}>
            04  Build the MCP Server
          </p>
          <p>Compile the TypeScript MCP server to JavaScript.</p>
          <pre className="mono text-xs sm:text-sm whitespace-pre-wrap break-words">npm run build</pre>
        </div>

        <div className="panel space-y-2">
          <p className="text-3xl" style={{ fontFamily: "var(--font-display)" }}>
            05  Configure Claude Desktop
          </p>
          <p>Open your Claude Desktop config file and add the MCP server.</p>
          <p className="mono text-sm">Windows: %APPDATA%\Claude\claude_desktop_config.json</p>
          <p className="mono text-sm">Mac: ~/Library/Application Support/Claude/claude_desktop_config.json</p>
          <pre className="mono text-xs sm:text-sm whitespace-pre-wrap break-words">{`{
  "mcpServers": {
    "person-crud": {
      "command": "node",
      "args": ["C:/path/to/mcp-crud-app/mcp-server/person-mcp-server.mjs"],
      "env": {
        "APP_BASE_URL": "https://personsearch-omega.vercel.app"
      }
    }
  }
}`}</pre>
        </div>

        <div className="panel space-y-2">
          <p className="text-3xl" style={{ fontFamily: "var(--font-display)" }}>
            06  Restart Claude Desktop
          </p>
          <p>Fully quit and reopen Claude Desktop. You should see the MCP tools available.</p>
          <pre className="mono text-xs sm:text-sm whitespace-pre-wrap break-words">{`# Look for the hammer icon in Claude Desktop
# This confirms MCP tools are loaded`}</pre>
        </div>
      </div>

      <div className="panel space-y-3">
        <h2 className="text-4xl" style={{ fontFamily: "var(--font-display)" }}>
          Verify It Works
        </h2>
        <p>After restarting Claude Desktop, test the MCP connection by typing these prompts:</p>
        <div className="space-y-2">
          {prompts.map((prompt, index) => (
            <div key={prompt} className="panel">
              <p className="mono text-sm">{index + 1}  {prompt}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="panel space-y-3">
        <h2 className="text-4xl" style={{ fontFamily: "var(--font-display)" }}>
          Troubleshooting
        </h2>

        <div className="panel">
          <p className="font-semibold">MCP tools not showing in Claude Desktop</p>
          <p className="text-sm">Make sure you fully quit (not just close) and reopen Claude Desktop after editing the config file.</p>
        </div>

        <div className="panel">
          <p className="font-semibold">Database connection error</p>
          <p className="text-sm">Double-check your DATABASE_URL in Vercel and make sure your Neon database is active.</p>
        </div>

        <div className="panel">
          <p className="font-semibold">Command not found: node</p>
          <p className="text-sm">Install Node.js from nodejs.org and ensure it is available on your system PATH.</p>
        </div>

        <div className="panel">
          <p className="font-semibold">Config file not found</p>
          <p className="text-sm">Create the file manually at the path shown above. Ensure JSON syntax is valid.</p>
        </div>
      </div>
    </section>
  );
}
