# Person MCP CRUD App

Production-ready Next.js app that supports Person CRUD directly in the UI and through a Model Context Protocol (MCP) server for Claude Desktop.

## Features

- Person CRUD app with PostgreSQL integration
- MCP server (`mcp-server/person-mcp-server.mjs`) exposing Person CRUD tools
- Real-time MCP testing page (`/mcp-demo`)
- Evaluator setup docs (`/mcp-setup`)
- Architecture page (`/about`) and repository page (`/github`)

## Environment Variables

Create `.env.local`:

```bash
DATABASE_URL=postgres://...
APP_BASE_URL=http://localhost:3000
```

For production, set the same values in Vercel, with `APP_BASE_URL` equal to your Vercel URL.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Run MCP Server

```bash
npm run mcp:start
```

The MCP server forwards tool calls to your app endpoint: `POST /api/mcp/execute`.

## Claude Desktop Config Example

```json
{
	"mcpServers": {
		"person-crud": {
			"command": "node",
			"args": ["/absolute/path/to/mcp-crud-app/mcp-server/person-mcp-server.mjs"],
			"env": {
				"APP_BASE_URL": "https://your-vercel-domain.vercel.app"
			}
		}
	}
}
```

## Deploy to Vercel

```bash
npm run build
```

Deploy using the Vercel dashboard or CLI. Ensure `DATABASE_URL` and `APP_BASE_URL` are configured in project settings.
