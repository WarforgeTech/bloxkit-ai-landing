'use client';

import React from 'react';
import { PRODUCTS } from '@/lib/product-catalog';

export default function Pricing() {
  const template = PRODUCTS.bloxkit_ai_template;

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-14">
      <h2 className="text-3xl font-extrabold">Pricing</h2>
      <p className="mt-3 max-w-3xl text-muted-foreground">
        Start with the template. Add updates later if you want.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border p-8">
          <p className="text-sm font-semibold">{template.name}</p>
          <p className="mt-2 text-sm text-muted-foreground">{template.description}</p>

          <div className="mt-6">
            <p className="text-4xl font-extrabold">$99</p>
            <p className="mt-1 text-xs text-muted-foreground">One-time purchase (intro pricing).</p>
          </div>

          <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            {template.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          <a
            href="#"
            className="mt-8 inline-flex w-full items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground opacity-60"
            aria-disabled
          >
            Checkout (coming next)
          </a>

          <p className="mt-3 text-xs text-muted-foreground">
            Checkout is disabled until Stripe is configured. Next step is wiring test-mode purchases.
          </p>
        </div>

        <div className="rounded-2xl border p-8">
          <p className="text-sm font-semibold">What you can expect</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><b className="text-foreground">Fast setup:</b> rokit/rojo/wally/stylua guidance included.</li>
            <li><b className="text-foreground">Repeatable gates:</b> validate + runtime smoke test workflow.</li>
            <li><b className="text-foreground">AI leverage:</b> use Studio AI where its strong; repo AI where it matters.</li>
          </ul>

          <div className="mt-8 rounded-xl bg-muted/30 p-6">
            <p className="text-sm font-semibold">Refund policy</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Well add a clear refund policy once Stripe is live.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
