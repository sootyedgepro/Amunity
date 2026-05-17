'use client';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export interface AccordionItem {
  q: string;
  a: React.ReactNode;
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <li key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-serif text-lg text-ink">{it.q}</span>
              {isOpen ? <Minus className="h-4 w-4 shrink-0" /> : <Plus className="h-4 w-4 shrink-0" />}
            </button>
            <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden text-sm leading-relaxed text-muted">{it.a}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
