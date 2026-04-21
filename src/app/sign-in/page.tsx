"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    const result = signIn(email, password);
    setMessage(result.message);

    if (result.ok) {
      router.push("/");
    }
  }

  return (
    <section className="auth-wrap">
      <div className="auth-card panel">
        <p className="uppercase tracking-[0.24em] text-xs font-semibold text-[#7f8da8]">Welcome Back</p>
        <h1 className="hero-title auth-title">Sign In</h1>
        <p className="text-sm text-[#8ea0c8]">Sign in to your Person App account.</p>

        <form className="space-y-3 mt-4" onSubmit={handleSignIn}>
          <button className="btn btn-outline w-full" type="button">
            Continue with Google
          </button>
          <button className="btn btn-outline w-full" type="button">
            Continue with GitHub
          </button>

          <label className="auth-label" htmlFor="signin-email">
            Email Address
          </label>
          <input
            id="signin-email"
            className="field auth-field"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="auth-label" htmlFor="signin-password">
            Password
          </label>
          <input
            id="signin-password"
            className="field auth-field"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-primary w-full" type="submit">
            Sign In
          </button>
        </form>

        <p className="text-sm mt-3">{message}</p>
        <p className="text-sm mt-2">
          Don&apos;t have an account? <Link href="/sign-up">Sign up</Link>
        </p>
      </div>
    </section>
  );
}
