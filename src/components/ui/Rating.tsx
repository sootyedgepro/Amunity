import { Star } from 'lucide-react';

export default function Rating({ value, count, compact = false }: { value: number; count?: number; compact?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${i <= Math.round(value) ? 'fill-gold text-gold' : 'text-ink/15'}`}
          />
        ))}
      </div>
      {!compact && count !== undefined && (
        <span className="text-xs text-muted">
          {value.toFixed(1)} ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
}
