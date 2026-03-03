'use client';

import React from 'react';

export default function SuccessPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-extrabold">Purchase successful</h1>
      <p className="mt-3 text-muted-foreground">
        Thanks for grabbing BloxKit AI.
      </p>

      <div className="mt-8 rounded-xl border p-6">
        <h2 className="text-xl font-bold">Next steps</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
          <li>Check your email for delivery instructions (well wire this once Stripe is live).</li>
          <li>Clone the template repo and run <code className="rounded bg-muted px-1">npm run setup</code>.</li>
          <li>Connect Roblox Studio MCP and run the runtime smoke test before shipping changes.</li>
        </ol>
      </div>

      <a className="mt-8 inline-flex rounded-md border px-4 py-2 text-sm font-semibold hover:bg-muted" href="/">
        Back to site
      </a>
    </main>
  );
}
