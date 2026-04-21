import { z } from "zod";
import { ensurePeopleTable, getSqlClient } from "@/lib/db";

const personInputSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  age: z.number().int().positive().max(130),
  city: z.string().min(2).max(80),
});

const personUpdateSchema = personInputSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "Provide at least one field to update.",
);

export type PersonInput = z.infer<typeof personInputSchema>;
export type PersonPatchInput = z.infer<typeof personUpdateSchema>;

export type PersonRecord = {
  id: number;
  name: string;
  email: string;
  age: number;
  city: string;
  created_at: string;
  updated_at: string;
};

export function parsePersonInput(payload: unknown): PersonInput {
  return personInputSchema.parse(payload);
}

export function parsePersonPatchInput(payload: unknown): PersonPatchInput {
  return personUpdateSchema.parse(payload);
}

export async function listPeople(): Promise<PersonRecord[]> {
  await ensurePeopleTable();
  const sql = getSqlClient();
  const rows = await sql<PersonRecord[]>`
    SELECT id, name, email, age, city, created_at, updated_at
    FROM people
    ORDER BY id DESC;
  `;
  return rows;
}

export async function getPerson(id: number): Promise<PersonRecord | null> {
  await ensurePeopleTable();
  const sql = getSqlClient();
  const rows = await sql<PersonRecord[]>`
    SELECT id, name, email, age, city, created_at, updated_at
    FROM people
    WHERE id = ${id}
    LIMIT 1;
  `;
  return rows[0] ?? null;
}

export async function createPerson(input: PersonInput): Promise<PersonRecord> {
  await ensurePeopleTable();
  const sql = getSqlClient();
  const rows = await sql<PersonRecord[]>`
    INSERT INTO people (name, email, age, city)
    VALUES (${input.name}, ${input.email}, ${input.age}, ${input.city})
    RETURNING id, name, email, age, city, created_at, updated_at;
  `;
  return rows[0];
}

export async function updatePerson(id: number, patch: PersonPatchInput): Promise<PersonRecord | null> {
  await ensurePeopleTable();
  const current = await getPerson(id);
  if (!current) {
    return null;
  }

  const nextState: PersonInput = {
    name: patch.name ?? current.name,
    email: patch.email ?? current.email,
    age: patch.age ?? current.age,
    city: patch.city ?? current.city,
  };

  const sql = getSqlClient();
  const rows = await sql<PersonRecord[]>`
    UPDATE people
    SET
      name = ${nextState.name},
      email = ${nextState.email},
      age = ${nextState.age},
      city = ${nextState.city},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING id, name, email, age, city, created_at, updated_at;
  `;

  return rows[0] ?? null;
}

export async function deletePerson(id: number): Promise<boolean> {
  await ensurePeopleTable();
  const sql = getSqlClient();
  const rows = await sql<{ id: number }[]>`
    DELETE FROM people
    WHERE id = ${id}
    RETURNING id;
  `;
  return rows.length > 0;
}
