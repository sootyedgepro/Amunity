const press = ['Vogue', 'Allure', 'Glamour', 'Byrdie', 'Forbes', 'Goop'];

export default function PressStrip() {
  return (
    <section className="border-y border-ink/10 bg-cream/60 py-10">
      <p className="container-x text-center text-xs uppercase tracking-[0.3em] text-muted">
        As featured in
      </p>
      <div className="container-x mt-6 grid grid-cols-3 items-center justify-items-center gap-y-6 md:grid-cols-6">
        {press.map((p) => (
          <span
            key={p}
            className="font-serif text-xl tracking-tight text-ink/40 transition-colors hover:text-ink"
          >
            {p}
          </span>
        ))}
      </div>
    </section>
  );
}
