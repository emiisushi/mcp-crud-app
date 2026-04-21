import { NextResponse } from "next/server";
import { createPerson, listPeople, parsePersonInput } from "@/lib/person-service";

export async function GET() {
  try {
    const people = await listPeople();
    return NextResponse.json({ ok: true, data: people });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch people.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const input = parsePersonInput(payload);
    const person = await createPerson(input);
    return NextResponse.json({ ok: true, data: person }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create person.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
