import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BloxKit AI — Roblox Template + AI Workflows',
  description:
    'A production-minded Roblox template with Rojo, MCP-first runtime testing, and AI workflows for Codex/Claude Code + Studio Assistant.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
