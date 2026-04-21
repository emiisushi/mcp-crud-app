import type { Metadata } from "next";
import Link from "next/link";
import { DM_Serif_Display, Space_Grotesk } from "next/font/google";
import ThemeToggle from "@/components/theme-toggle";
import "./globals.css";

const display = DM_Serif_Display({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const body = Space_Grotesk({
  variable: "--font-body",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Person MCP CRUD App",
  description: "Production-ready Person CRUD app with MCP server integration",
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/github", label: "GitHub" },
  { href: "/mcp-setup", label: "MCP Setup" },
  { href: "/mcp-demo", label: "MCP Demo" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
  const saved = localStorage.getItem('app-theme');
  const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset.theme = saved ?? (preferredDark ? 'dark' : 'light');
})();`,
          }}
        />
      </head>
      <body className="min-h-full app-bg">
        <div className="min-h-full">
          <header className="site-header">
            <div className="shell site-header-inner">
              <Link href="/" className="logo-mark">
                Person.search
              </Link>
              <nav className="nav-row" aria-label="Main Navigation">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="nav-link">
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="nav-actions">
                <ThemeToggle />
                <Link href="/sign-in" className="btn btn-outline nav-action-btn no-underline">
                  Sign In
                </Link>
                <Link href="/sign-up" className="btn btn-primary nav-action-btn no-underline">
                  Sign Up
                </Link>
              </div>
            </div>
          </header>
          <main className="shell py-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
