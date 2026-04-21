import { NextResponse } from "next/server";
import { deletePerson, getPerson, parsePersonPatchInput, updatePerson } from "@/lib/person-service";

function parseId(idRaw: string): number {
  const id = Number(idRaw);
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid id.");
  }
  return id;
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idRaw } = await params;
    const id = parseId(idRaw);
    const person = await getPerson(id);
    if (!person) {
      return NextResponse.json({ ok: false, error: "Person not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, data: person });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch person.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idRaw } = await params;
    const id = parseId(idRaw);
    const payload = await request.json();
    const patch = parsePersonPatchInput(payload);
    const person = await updatePerson(id, patch);

    if (!person) {
      return NextResponse.json({ ok: false, error: "Person not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, data: person });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update person.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idRaw } = await params;
    const id = parseId(idRaw);
    const deleted = await deletePerson(id);
    if (!deleted) {
      return NextResponse.json({ ok: false, error: "Person not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, data: { id, deleted } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete person.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
