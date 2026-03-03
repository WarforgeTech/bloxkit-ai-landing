'use client';

import React from 'react';

const quotes = [
  {
    quote:
      'Finally a Roblox template that treats runtime testing as a first-class citizen. The smoke-test workflow is clutch.',
    name: 'Roblox Developer',
    role: 'Indie dev',
  },
  {
    quote:
      'The Repo AI vs Studio AI split makes it obvious what to do. No more AI-generated mess across 50 files.',
    name: 'Studio Builder',
    role: 'Solo creator',
  },
  {
    quote:
      'Rojo + a clean architecture + quick iteration is exactly what I needed to ship features without breaking everything.',
    name: 'Systems Engineer',
    role: 'Team lead',
  },
];

export default function SocialProof() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <h2 className="text-3xl font-extrabold">Built for builders</h2>
      <p className="mt-3 max-w-3xl text-muted-foreground">
        BloxKit AI is engineered for developers who ship systems, not just scenes.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {quotes.map((q) => (
          <div key={q.quote} className="rounded-xl border p-6">
            <p className="text-sm text-muted-foreground">“{q.quote}”</p>
            <div className="mt-4 text-sm">
              <p className="font-semibold">{q.name}</p>
              <p className="text-muted-foreground">{q.role}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        Note: testimonials are placeholders until we collect real customer feedback.
      </p>
    </section>
  );
}
