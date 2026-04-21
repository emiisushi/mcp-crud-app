export default function SignInPage() {
  return (
    <section className="auth-wrap">
      <div className="auth-card panel">
        <p className="uppercase tracking-[0.24em] text-xs font-semibold text-[#7f8da8]">Welcome Back</p>
        <h1 className="hero-title auth-title">Sign In</h1>
        <p className="text-sm text-[#8ea0c8]">Sign in to continue managing People and MCP tests.</p>

        <form className="space-y-3 mt-4">
          <label className="auth-label" htmlFor="signin-email">
            Email Address
          </label>
          <input id="signin-email" className="field auth-field" type="email" placeholder="you@example.com" />

          <label className="auth-label" htmlFor="signin-password">
            Password
          </label>
          <input id="signin-password" className="field auth-field" type="password" placeholder="Enter password" />

          <button className="btn btn-primary w-full" type="button">
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
}
