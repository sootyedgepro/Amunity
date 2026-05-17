'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartLine } from '@/types';

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  add: (line: Omit<CartLine, 'quantity'> & { quantity?: number }) => void;
  remove: (productId: string) => void;
  update: (productId: string, quantity: number) => void;
  toggle: (open?: boolean) => void;
  clear: () => void;
  subtotal: () => number;
  itemCount: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      add: (line) =>
        set((state) => {
          const existing = state.lines.find(
            (l) => l.productId === line.productId && l.subscription === line.subscription
          );
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l === existing ? { ...l, quantity: l.quantity + (line.quantity ?? 1) } : l
              ),
              isOpen: true,
            };
          }
          return {
            lines: [...state.lines, { ...line, quantity: line.quantity ?? 1 }],
            isOpen: true,
          };
        }),
      remove: (productId) =>
        set((state) => ({ lines: state.lines.filter((l) => l.productId !== productId) })),
      update: (productId, quantity) =>
        set((state) => ({
          lines: state.lines
            .map((l) => (l.productId === productId ? { ...l, quantity } : l))
            .filter((l) => l.quantity > 0),
        })),
      toggle: (open) => set((s) => ({ isOpen: open ?? !s.isOpen })),
      clear: () => set({ lines: [] }),
      subtotal: () => get().lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
      itemCount: () => get().lines.reduce((sum, l) => sum + l.quantity, 0),
    }),
    { name: 'amunity-cart' }
  )
);
