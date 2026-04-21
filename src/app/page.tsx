"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Person = {
  id: number;
  name: string;
  email: string;
  age: number;
  city: string;
  created_at: string;
  updated_at: string;
};

type FormState = {
  name: string;
  email: string;
  age: string;
  city: string;
};

const emptyForm: FormState = {
  name: "",
  email: "",
  age: "",
  city: "",
};

export default function HomePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Ready.");

  const isEditing = useMemo(() => editingId !== null, [editingId]);

  const filteredPeople = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return people;
    }

    return people.filter((person) => {
      const haystack = `${person.name} ${person.email} ${person.city}`.toLowerCase();
      return haystack.includes(term);
    });
  }, [people, searchTerm]);

  async function loadPeople() {
    setLoading(true);
    const response = await fetch("/api/people", { cache: "no-store" });
    const json = await response.json();
    if (json.ok) {
      setPeople(json.data as Person[]);
      setStatus("People loaded.");
    } else {
      setStatus(json.error ?? "Failed to load people.");
    }
    setLoading(false);
  }

  useEffect(() => {
    let cancelled = false;

    async function initialLoad() {
      try {
        const response = await fetch("/api/people", { cache: "no-store" });
        const json = await response.json();
        if (cancelled) {
          return;
        }

        if (json.ok) {
          setPeople(json.data as Person[]);
          setStatus("People loaded.");
        } else {
          setStatus(json.error ?? "Failed to load people.");
        }
      } catch (error) {
        if (!cancelled) {
          setStatus(error instanceof Error ? error.message : "Failed to load people.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void initialLoad();

    return () => {
      cancelled = true;
    };
  }, []);

  function beginEdit(person: Person) {
    setEditingId(person.id);
    setForm({
      name: person.name,
      email: person.email,
      age: String(person.age),
      city: person.city,
    });
  }

  function clearForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(isEditing ? "Updating person..." : "Creating person...");

    const payload = {
      name: form.name,
      email: form.email,
      age: Number(form.age),
      city: form.city,
    };

    const response = await fetch(isEditing ? `/api/people/${editingId}` : "/api/people", {
      method: isEditing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await response.json();
    if (!json.ok) {
      setStatus(json.error ?? "Operation failed.");
      return;
    }

    setStatus(isEditing ? "Person updated." : "Person created.");
    clearForm();
    await loadPeople();
  }

  async function removePerson(id: number) {
    setStatus("Deleting person...");
    const response = await fetch(`/api/people/${id}`, { method: "DELETE" });
    const json = await response.json();
    if (!json.ok) {
      setStatus(json.error ?? "Delete failed.");
      return;
    }

    setStatus("Person deleted.");
    await loadPeople();
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="uppercase tracking-[0.24em] text-xs font-semibold text-[#1f3f34]">Week 3 + MCP</p>
        <h1 className="hero-title">Home</h1>
        <p className="max-w-2xl text-sm sm:text-base">
          Manage Person records directly in-app while exposing the same CRUD operations through MCP tools for
          Claude Desktop.
        </p>
      </div>

      <div className="panel space-y-3">
        <h2 className="text-2xl" style={{ fontFamily: "var(--font-display)" }}>
          Search User
        </h2>
        <input
          className="field"
          placeholder="Search by name, email, or city..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <div className="panel">
          <h2 className="text-2xl mb-3" style={{ fontFamily: "var(--font-display)" }}>
            {isEditing ? "Edit Person" : "Add Person"}
          </h2>
          <form className="space-y-3" onSubmit={submitForm}>
            <input
              className="field"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            />
            <input
              className="field"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            />
            <input
              className="field"
              type="number"
              placeholder="Age"
              value={form.age}
              onChange={(e) => setForm((prev) => ({ ...prev, age: e.target.value }))}
            />
            <input
              className="field"
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm((prev) => ({ ...prev, city: e.target.value }))}
            />
            <div className="flex gap-2 pt-2">
              <button className="btn btn-primary" type="submit">
                {isEditing ? "Update" : "Create"}
              </button>
              <button className="btn btn-outline" type="button" onClick={clearForm}>
                Clear
              </button>
            </div>
          </form>
        </div>

        <div className="panel">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-2xl" style={{ fontFamily: "var(--font-display)" }}>
              People
            </h2>
            <button className="btn btn-secondary" onClick={() => loadPeople()}>
              Refresh
            </button>
          </div>

          <p className="mt-3 text-sm">Status: {status}</p>

          {loading ? (
            <p className="mt-4">Loading...</p>
          ) : filteredPeople.length === 0 ? (
            <p className="mt-4">No people yet. Add your first record.</p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left">
                    <th className="py-2">ID</th>
                    <th className="py-2">Name</th>
                    <th className="py-2">Email</th>
                    <th className="py-2">Age</th>
                    <th className="py-2">City</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPeople.map((person) => (
                    <tr key={person.id} className="border-t border-[#d7d0be]">
                      <td className="py-2 pr-2">{person.id}</td>
                      <td className="py-2 pr-2">{person.name}</td>
                      <td className="py-2 pr-2">{person.email}</td>
                      <td className="py-2 pr-2">{person.age}</td>
                      <td className="py-2 pr-2">{person.city}</td>
                      <td className="py-2 pr-2">
                        <div className="flex gap-2">
                          <button className="btn btn-outline" onClick={() => beginEdit(person)}>
                            Edit
                          </button>
                          <button className="btn btn-primary" onClick={() => removePerson(person.id)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
