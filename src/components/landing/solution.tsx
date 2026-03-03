'use client';

import React from 'react';

const bullets = [
  'Rojo-first architecture that keeps server/client/shared clean.',
  'MCP-first runtime smoke tests: start Play, run script, capture logs, PASS/FAIL.',
  'A clear workflow for when to use Repo AI vs Studio AI.',
  'Validation commands so every change goes through the same gates.',
];

export default function Solution() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <div className="rounded-2xl border bg-muted/30 p-8">
        <h2 className="text-3xl font-extrabold">The solution: BloxKit AI</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          A production-minded Roblox template that pairs the best of both worlds: repo-based engineering and
          Studio-based world building — with runtime verification baked in.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-background p-6">
            <p className="text-sm font-semibold">What you get</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              {bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-background p-6">
            <p className="text-sm font-semibold">Why it matters</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><b className="text-foreground">Less rework:</b> features arent done until smoke tests pass.</li>
              <li><b className="text-foreground">Less chaos:</b> consistent patterns prevent AI from spraying code everywhere.</li>
              <li><b className="text-foreground">More shipping:</b> faster iteration without sacrificing structure.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
