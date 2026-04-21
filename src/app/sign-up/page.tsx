"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setMessage("Please complete all fields.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const result = signUp(name, email, password);
    setMessage(result.message);

    if (result.ok) {
      router.push("/");
    }
  }

  return (
    <section className="auth-wrap">
      <div className="auth-card panel">
        <p className="uppercase tracking-[0.24em] text-xs font-semibold text-[#7f8da8]">Create Account</p>
        <h1 className="hero-title auth-title">Sign Up</h1>
        <p className="text-sm text-[#8ea0c8]">Join Person App today.</p>

        <form className="space-y-3 mt-4" onSubmit={handleSignUp}>
          <button className="btn btn-outline w-full" type="button">
            Continue with Google
          </button>
          <button className="btn btn-outline w-full" type="button">
            Continue with GitHub
          </button>

          <label className="auth-label" htmlFor="signup-name">
            Full Name
          </label>
          <input
            id="signup-name"
            className="field auth-field"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="auth-label" htmlFor="signup-email">
            Email Address
          </label>
          <input
            id="signup-email"
            className="field auth-field"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="auth-label" htmlFor="signup-password">
            Password
          </label>
          <input
            id="signup-password"
            className="field auth-field"
            type="password"
            placeholder="Min. 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className="auth-label" htmlFor="signup-confirm">
            Confirm Password
          </label>
          <input
            id="signup-confirm"
            className="field auth-field"
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="btn btn-primary w-full" type="submit">
            Create Account
          </button>
        </form>

        <p className="text-sm mt-3">{message}</p>
        <p className="text-sm mt-2">
          Already have an account? <Link href="/sign-in">Sign in</Link>
        </p>
      </div>
    </section>
  );
}
