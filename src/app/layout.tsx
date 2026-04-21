import type { Metadata } from "next";
import Link from "next/link";
import { DM_Serif_Display, Space_Grotesk } from "next/font/google";
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
  { href: "/", label: "People" },
  { href: "/mcp-demo", label: "MCP Demo" },
  { href: "/mcp-setup", label: "MCP Setup" },
  { href: "/about", label: "About" },
  { href: "/github", label: "GitHub" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full app-bg">
        <div className="min-h-full">
          <header className="site-header">
            <div className="shell site-header-inner">
              <Link href="/" className="logo-mark">
                Person MCP Lab
              </Link>
              <nav className="nav-row" aria-label="Main Navigation">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="nav-link">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <main className="shell py-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
