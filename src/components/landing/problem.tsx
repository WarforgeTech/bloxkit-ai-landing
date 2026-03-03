'use client';

import React from 'react';

export default function Problem() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-xl border p-6">
          <h2 className="text-2xl font-bold">The problem</h2>
          <p className="mt-3 text-muted-foreground">
            Roblox Studio AI is getting scary-good at world building (assets, placement, quick behavior scripts)…
            but its not reliable for long-term architecture.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>It struggles to refactor existing code safely.</li>
            <li>It cant enforce consistent patterns across server/client/shared.</li>
            <li>It doesnt naturally prove runtime behavior before you ship.</li>
          </ul>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="text-2xl font-bold">What devs actually need</h2>
          <p className="mt-3 text-muted-foreground">
            A template that intentionally uses two AIs:
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <b className="text-foreground">Repo AI</b> (Codex/Claude Code) for architecture, modules, and safe refactors.
            </li>
            <li>
              <b className="text-foreground">Studio AI</b> (via MCP) for live DataModel work, assets, and rapid iteration.
            </li>
            <li>
              <b className="text-foreground">Runtime gates</b> so changes are verified, not hoped.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
