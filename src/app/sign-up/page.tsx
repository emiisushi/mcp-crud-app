export default function SignUpPage() {
  return (
    <section className="auth-wrap">
      <div className="auth-card panel">
        <p className="uppercase tracking-[0.24em] text-xs font-semibold text-[#7f8da8]">Create Account</p>
        <h1 className="hero-title auth-title">Sign Up</h1>
        <p className="text-sm text-[#8ea0c8]">Join Person App and manage data with MCP integration.</p>

        <form className="space-y-3 mt-4">
          <label className="auth-label" htmlFor="signup-name">
            Full Name
          </label>
          <input id="signup-name" className="field auth-field" type="text" placeholder="Your name" />

          <label className="auth-label" htmlFor="signup-email">
            Email Address
          </label>
          <input id="signup-email" className="field auth-field" type="email" placeholder="you@example.com" />

          <label className="auth-label" htmlFor="signup-password">
            Password
          </label>
          <input id="signup-password" className="field auth-field" type="password" placeholder="Min. 6 characters" />

          <label className="auth-label" htmlFor="signup-confirm">
            Confirm Password
          </label>
          <input id="signup-confirm" className="field auth-field" type="password" placeholder="Re-enter password" />

          <button className="btn btn-primary w-full" type="button">
            Create Account
          </button>
        </form>
      </div>
    </section>
  );
}
