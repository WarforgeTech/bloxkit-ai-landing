'use client';

import React from 'react';

const bonuses = [
  {
    title: 'MCP setup guide',
    body: 'Step-by-step instructions to connect Studio to your AI tool so you can inspect the DataModel and run smoke tests.',
  },
  {
    title: 'Testing workflow',
    body: 'A clear pass/fail runtime gate (Play + logs) so you can ship with confidence.',
  },
  {
    title: 'AI workflow guide',
    body: 'When to use Repo AI vs Studio AI, so you get speed without sacrificing architecture.',
  },
];

export default function Bonuses() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <h2 className="text-3xl font-extrabold">Included guides</h2>
      <p className="mt-3 max-w-3xl text-muted-foreground">
        Everything in BloxKit AI is designed to reduce support burden: clear steps, clear gates, clear outcomes.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {bonuses.map((b) => (
          <div key={b.title} className="rounded-xl border p-6">
            <h3 className="text-lg font-bold">{b.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
