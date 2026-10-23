export default function SectionHeading({ title, intro, id, tone = 'light', align = 'left', as: Tag = 'h2', className = '' }) {
  const dark = tone === 'dark';
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
      <Tag
        id={id}
        className={`text-3xl font-bold sm:text-4xl ${dark ? 'text-white' : 'text-navy-900'}`}
      >
        {title}
      </Tag>
      {intro && (
        <p className={`mt-4 text-lg leading-relaxed ${dark ? 'text-steel' : 'text-slate-ink'}`}>{intro}</p>
      )}
    </div>
  );
}
