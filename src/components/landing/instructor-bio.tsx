'use client';

import React from 'react';

export default function InstructorBio() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <div className="rounded-2xl border p-8">
        <h2 className="text-3xl font-extrabold">Who this is for</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          BloxKit AI is built for Roblox developers who want to move fast without wrecking architecture.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-muted/30 p-6">
            <p className="text-sm font-semibold">Perfect for</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              <li>Solo devs shipping a real game, not a prototype.</li>
              <li>Small teams that need consistent patterns for AI-assisted coding.</li>
              <li>Builders using Rojo/Wally who want runtime verification baked in.</li>
            </ul>
          </div>

          <div className="rounded-xl bg-muted/30 p-6">
            <p className="text-sm font-semibold">Not for</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              <li>People looking for a course or a one-size-fits-all game framework.</li>
              <li>Teams that dont want any automated gates (format/validate/smoke tests).</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
