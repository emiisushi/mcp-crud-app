"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getCurrentUser, signOut, type AuthUser } from "@/lib/auth-client";

export default function NavAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const syncUser = () => setUser(getCurrentUser());
    syncUser();

    window.addEventListener("person-auth-changed", syncUser);
    return () => window.removeEventListener("person-auth-changed", syncUser);
  }, []);

  const initials = useMemo(() => {
    if (!user) {
      return "U";
    }

    return user.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [user]);

  if (!user) {
    return (
      <>
        <Link href="/sign-in" className="btn btn-outline nav-action-btn no-underline">
          Sign In
        </Link>
        <Link href="/sign-up" className="btn btn-primary nav-action-btn no-underline">
          Sign Up
        </Link>
      </>
    );
  }

  return (
    <div className="auth-menu-wrap">
      <button className="btn btn-outline nav-action-btn auth-pill" type="button" onClick={() => setMenuOpen((prev) => !prev)}>
        <span className="auth-avatar">{initials}</span>
        <span className="auth-name">{user.name}</span>
      </button>

      {menuOpen ? (
        <div className="panel auth-dropdown">
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm mono">{user.email}</p>
          <button
            className="btn btn-primary mt-2"
            type="button"
            onClick={() => {
              signOut();
              setMenuOpen(false);
            }}
          >
            Sign Out
          </button>
        </div>
      ) : null}
    </div>
  );
}
