import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const appBaseUrl = process.env.APP_BASE_URL;

if (!appBaseUrl) {
  throw new Error("APP_BASE_URL is required. Example: https://your-vercel-domain.vercel.app");
}

const server = new Server(
  {
    name: "person-crud-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

const tools = [
  {
    name: "person_list",
    description: "List all people",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "person_get",
    description: "Get one person by id",
    inputSchema: {
      type: "object",
      properties: { id: { type: "number" } },
      required: ["id"],
      additionalProperties: false,
    },
  },
  {
    name: "person_create",
    description: "Create one person",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        age: { type: "number" },
        city: { type: "string" },
      },
      required: ["name", "email", "age", "city"],
      additionalProperties: false,
    },
  },
  {
    name: "person_update",
    description: "Update one person by id",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "number" },
        name: { type: "string" },
        email: { type: "string" },
        age: { type: "number" },
        city: { type: "string" },
      },
      required: ["id"],
      additionalProperties: false,
    },
  },
  {
    name: "person_delete",
    description: "Delete one person by id",
    inputSchema: {
      type: "object",
      properties: { id: { type: "number" } },
      required: ["id"],
      additionalProperties: false,
    },
  },
];

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const toolName = request.params.name;
  const args = request.params.arguments ?? {};

  const response = await fetch(`${appBaseUrl}/api/mcp/execute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ toolName, args }),
  });

  const payload = await response.json();

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(payload, null, 2),
      },
    ],
  };
});

const transport = new StdioServerTransport();
await server.connect(transport);
