import postgres from "postgres";

let client: postgres.Sql | null = null;
let peopleTableReady: Promise<void> | null = null;

export function getSqlClient(): postgres.Sql {
  if (client) {
    return client;
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set. Add it in .env.local and Vercel project settings.");
  }

  client = postgres(databaseUrl, {
    ssl: "require",
    max: 10,
  });

  return client;
}

export async function ensurePeopleTable(): Promise<void> {
  if (!peopleTableReady) {
    const sql = getSqlClient();
    peopleTableReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS people (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          age INTEGER NOT NULL CHECK (age > 0),
          city TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;
    })();
  }

  await peopleTableReady;
}
