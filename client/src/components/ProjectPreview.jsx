// Illustrated stand-in screenshots for concept projects. Replace with a real
// screenshot by setting `image` on the project in data/projects.js.
const bar = (w, extra = '') => <div className={`h-2 rounded-full bg-white/15 ${extra}`} style={{ width: w }} />;

const previews = {
  site: () => (
    <div className="flex h-full flex-col gap-3 p-5">
      <div className="flex items-center justify-between">{bar('28%')}<div className="flex gap-2">{bar('24px')}{bar('24px')}{bar('24px')}</div></div>
      <div className="mt-3 h-3 w-3/4 rounded-full bg-white/70" />
      <div className="h-3 w-1/2 rounded-full bg-white/70" />
      <div className="mt-1 h-6 w-24 rounded-md bg-cyan" />
      <div className="mt-auto grid grid-cols-3 gap-2">{[0, 1, 2].map((i) => <div key={i} className="h-12 rounded-md bg-white/10" />)}</div>
    </div>
  ),
  store: () => (
    <div className="grid h-full grid-cols-3 gap-2.5 p-5">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex flex-col gap-1.5 rounded-md bg-white/10 p-2">
          <div className="flex-1 rounded bg-white/15" />
          {bar('70%')}
          <div className="h-2 w-1/3 rounded-full bg-cyan/80" />
        </div>
      ))}
    </div>
  ),
  table: () => (
    <div className="flex h-full flex-col gap-2 p-5">
      <div className="flex justify-between">{bar('30%')}<div className="h-5 w-16 rounded bg-electric" /></div>
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="grid grid-cols-[1fr_1.4fr_0.6fr] items-center gap-3 rounded bg-white/[0.06] px-3 py-2">
          {bar('80%')}{bar('65%')}<div className="h-2 w-full rounded-full bg-cyan/60" />
        </div>
      ))}
    </div>
  ),
  tests: () => (
    <div className="flex h-full flex-col gap-2 p-5 font-mono text-[10px] leading-none text-white/70">
      {['LoginForm_ValidatesEmail', 'OrdersTable_SortsByDate', 'RevenueChart_RendersSeries', 'Checkout_RequiresAddress', 'Navbar_IsKeyboardAccessible'].map((t, i) => (
        <div key={t} className="flex items-center gap-2 rounded bg-white/[0.06] px-2.5 py-2">
          <span className={`h-2 w-2 rounded-full ${i === 3 ? 'bg-amber-400' : 'bg-emerald-400'}`} />
          <span className="truncate">{t}</span>
        </div>
      ))}
    </div>
  ),
  calendar: () => (
    <div className="grid h-full grid-cols-7 gap-1.5 p-5">
      {Array.from({ length: 28 }, (_, i) => (
        <div key={i} className={`rounded ${[3, 9, 10, 17, 23].includes(i) ? 'bg-cyan/80' : i === 12 ? 'bg-electric' : 'bg-white/10'}`} />
      ))}
    </div>
  ),
  chart: () => (
    <div className="absolute inset-0 flex flex-col gap-3 p-5">
      <div className="grid grid-cols-3 gap-2">{[0, 1, 2].map((i) => <div key={i} className="h-9 rounded-md bg-white/10" />)}</div>
      <div className="relative flex-1">
        <div className="absolute inset-0 flex items-end gap-1.5">
          {[40, 62, 48, 75, 58, 84, 66, 90, 72, 80].map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-electric to-cyan" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  ),
};

export default function ProjectPreview({ type }) {
  const Preview = previews[type] || previews.site;
  return (
    <div className="absolute inset-0 flex flex-col bg-navy-900" aria-hidden="true">
      <div className="flex h-6 shrink-0 items-center gap-1.5 border-b border-white/10 px-3">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
      </div>
      <div className="relative min-h-0 flex-1">
        <Preview />
      </div>
    </div>
  );
}
