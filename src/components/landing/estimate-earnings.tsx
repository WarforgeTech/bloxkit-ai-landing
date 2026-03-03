'use client';

import React from 'react';

export default function EstimateEarnings() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <div className="rounded-2xl border p-8">
        <h2 className="text-3xl font-extrabold">What this saves you</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          The goal is simple: less time fighting setup, less time debugging at runtime, and more time shipping.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-muted/30 p-6">
            <p className="text-sm font-semibold">Setup time</p>
            <p className="mt-2 text-sm text-muted-foreground">
              A consistent Rojo + tooling workflow that works across machines.
            </p>
          </div>
          <div className="rounded-xl bg-muted/30 p-6">
            <p className="text-sm font-semibold">Runtime confidence</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Smoke tests run in Play mode with logs capture so it works is provable.
            </p>
          </div>
          <div className="rounded-xl bg-muted/30 p-6">
            <p className="text-sm font-semibold">AI leverage</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Use Studio AI where its strong, and Repo AI where architecture matters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
