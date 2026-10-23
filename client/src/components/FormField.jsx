// Label + control + error message, wired together for screen readers.
export default function FormField({ id, label, optional, error, hint, children }) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {optional && <span className="ml-1 font-normal text-slate-ink">(optional)</span>}
      </label>
      {children({ id, 'aria-invalid': error ? true : undefined, 'aria-describedby': describedBy })}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-slate-ink">{hint}</p>
      )}
      {error && (
        <p id={`${id}-error`} className="field-error">{error}</p>
      )}
    </div>
  );
}

// Hidden field that people never see or fill in; bots usually do.
export function Honeypot({ value, onChange }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="website">Leave this field empty</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={value} onChange={onChange} />
    </div>
  );
}
