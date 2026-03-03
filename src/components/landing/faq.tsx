'use client';

import React from 'react';

const faqs = [
  {
    q: 'Does this replace Roblox Studio?',
    a: 'No. Its a template + workflow. You still build in Studio, but with better repo architecture and runtime verification.',
  },
  {
    q: 'Do I need Rojo experience?',
    a: 'No, but it helps. The template includes setup guidance and a consistent structure so you can learn by shipping.',
  },
  {
    q: 'Does it work on Mac and Windows?',
    a: 'Yes  the goal is a cross-platform happy path for the template tooling and docs.',
  },
  {
    q: 'Is Stripe checkout live?',
    a: 'Not yet. The landing page is being rebranded first; then well wire Stripe test-mode checkout and delivery, then go live.',
  },
];

export default function FAQ() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <h2 className="text-3xl font-extrabold">FAQ</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {faqs.map((f) => (
          <div key={f.q} className="rounded-xl border p-6">
            <p className="font-semibold">{f.q}</p>
            <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
