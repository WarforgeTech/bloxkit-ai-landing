'use client';

import React from 'react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#hero" className="font-bold font-headline text-lg">
          BloxKit AI
        </a>

        <nav className="flex items-center gap-4">
          <a className="text-sm text-muted-foreground hover:text-foreground" href="#whats-included">
            Whats Included
          </a>
          <a className="text-sm text-muted-foreground hover:text-foreground" href="#pricing">
            Pricing
          </a>
          <a
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
            href="#pricing"
          >
            Get the Template
          </a>
        </nav>
      </div>
    </header>
  );
}
