'use client';

import React from 'react';

export default function Hero() {
  return (
    <section id="hero" className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-3 inline-flex rounded-full border px-3 py-1 text-xs text-muted-foreground">
            Roblox dev template • Rojo • MCP • Runtime smoke tests
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Ship Roblox features faster
without turning your codebase into spaghetti.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            BloxKit AI is a production-minded Roblox template that pairs <b>Repo AI</b> (Codex/Claude Code)
            with <b>Studio AI</b> (Roblox Assistant via MCP), and forces runtime verification so you dont
            ship broken gameplay.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#pricing"
              className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Get the template
            </a>
            <a
              href="#whats-included"
              className="rounded-md border px-5 py-3 text-sm font-semibold hover:bg-muted"
            >
              See whats included
            </a>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Works on Mac + Windows. Designed for Roblox developers who care about architecture and speed.
          </p>
        </div>

        <div className="rounded-xl border bg-muted/30 p-6">
          <p className="text-sm font-semibold">The core loop</p>
          <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <span className="font-semibold text-foreground">1)</span> Build systems in the repo (Rojo) with Codex/Claude Code.
            </li>
            <li>
              <span className="font-semibold text-foreground">2)</span> Use Studio AI via MCP for assets + live DataModel work.
            </li>
            <li>
              <span className="font-semibold text-foreground">3)</span> Run runtime smoke tests (Play + logs) before calling it done.
            </li>
          </ol>

          <div className="mt-6 rounded-lg bg-background p-4">
            <p className="text-xs font-semibold text-muted-foreground">Example</p>
            <pre className="mt-2 overflow-auto text-xs">
{`npm run setup
npm run validate:full
# then run MCP smoke test in Studio
npm run studio:smoke`}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}
