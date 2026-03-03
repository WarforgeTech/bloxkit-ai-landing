'use client';

import React from 'react';

export default function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="rounded-2xl border bg-muted/30 p-10 text-center">
        <h2 className="text-3xl font-extrabold">Ready to ship Roblox features faster?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Grab BloxKit AI, follow the workflow, and stop guessing if your changes work at runtime.
        </p>
        <div className="mt-6">
          <a
            href="#pricing"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Get the template
          </a>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Checkout goes live after Stripe test-mode is wired and end-to-end verified.
        </p>
      </div>
    </section>
  );
}
