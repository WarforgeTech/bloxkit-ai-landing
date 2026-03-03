'use client';

import React from 'react';

const items = [
  {
    title: 'Template + project structure',
    body: 'A clean Rojo layout with sensible server/client/shared boundaries and batteries-included modules.',
  },
  {
    title: 'Automation + validation',
    body: 'One-command structure checks, Rojo build, formatting checks, and cleanup gates.',
  },
  {
    title: 'MCP-first runtime testing',
    body: 'A runtime smoke test script + workflow designed to run through Studio MCP (Play + logs + PASS/FAIL).',
  },
  {
    title: 'AI workflows that dont destroy architecture',
    body: 'Clear guidance on when to use Repo AI (Codex/Claude Code) vs Studio AI (Roblox Assistant).',
  },
];

export default function Curriculum() {
  return (
    <section id="whats-included" className="mx-auto max-w-6xl px-6 py-14">
      <h2 className="text-3xl font-extrabold">Whats included</h2>
      <p className="mt-3 max-w-3xl text-muted-foreground">
        This is not a course. Its a working template + workflow that helps you ship real Roblox features.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {items.map((i) => (
          <div key={i.title} className="rounded-xl border p-6">
            <h3 className="text-lg font-bold">{i.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{i.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
