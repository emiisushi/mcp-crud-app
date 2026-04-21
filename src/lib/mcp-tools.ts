import {
  createPerson,
  deletePerson,
  getPerson,
  listPeople,
  parsePersonInput,
  parsePersonPatchInput,
  updatePerson,
} from "@/lib/person-service";

export type ToolDefinition = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
};

export const personMcpTools: ToolDefinition[] = [
  {
    name: "person_list",
    description: "List all people in the Person database",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: "person_get",
    description: "Get one person by id",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "number", description: "Person id" },
      },
      required: ["id"],
      additionalProperties: false,
    },
  },
  {
    name: "person_create",
    description: "Create a person",
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
    description: "Update a person by id",
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
    description: "Delete a person by id",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "number" },
      },
      required: ["id"],
      additionalProperties: false,
    },
  },
];

export async function executePersonMcpTool(toolName: string, args: Record<string, unknown>) {
  switch (toolName) {
    case "person_list": {
      const people = await listPeople();
      return { ok: true, tool: toolName, data: people };
    }
    case "person_get": {
      const id = Number(args.id);
      const person = await getPerson(id);
      return { ok: true, tool: toolName, data: person };
    }
    case "person_create": {
      const person = await createPerson(parsePersonInput(args));
      return { ok: true, tool: toolName, data: person };
    }
    case "person_update": {
      const id = Number(args.id);
      const patch = { ...args };
      delete patch.id;
      const person = await updatePerson(id, parsePersonPatchInput(patch));
      return { ok: true, tool: toolName, data: person };
    }
    case "person_delete": {
      const id = Number(args.id);
      const deleted = await deletePerson(id);
      return { ok: true, tool: toolName, data: { id, deleted } };
    }
    default:
      throw new Error(`Unknown MCP tool: ${toolName}`);
  }
}
