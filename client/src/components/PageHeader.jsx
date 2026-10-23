// Dark title band at the top of inner pages.
export default function PageHeader({ title, intro, children }) {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div className="grid-lines absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
      <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-electric/15 blur-[100px]" aria-hidden="true" />
      <div className="container-page relative py-16 sm:py-20">
        <h1 className="max-w-3xl text-4xl font-extrabold sm:text-5xl">{title}</h1>
        {intro && <div className="mt-5 max-w-2xl space-y-4 text-lg leading-relaxed text-steel">{intro}</div>}
        {children}
      </div>
    </section>
  );
}
