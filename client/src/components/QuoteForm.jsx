import { Link } from 'react-router-dom';
import { CircleAlert, CircleCheck, LoaderCircle, ShieldAlert } from 'lucide-react';
import FormField, { Honeypot } from './FormField.jsx';
import useFormSubmit from '../hooks/useFormSubmit.js';
import { validateQuote } from '../services/validation.js';
import { submitInquiry } from '../services/api.js';
import { budgetOptions, serviceOptionGroups, timelineOptions } from '../data/formOptions.js';

const emptyQuote = {
  fullName: '',
  email: '',
  phone: '',
  organization: '',
  service: '',
  description: '',
  budget: '',
  timeline: '',
  noPhiConfirmed: false,
  website: '', // honeypot
};

export default function QuoteForm({ initialService = '' }) {
  const { values, errors, status, serverMessage, onChange, onSubmit, reset } = useFormSubmit({
    initialValues: { ...emptyQuote, service: initialService },
    validate: validateQuote,
    submit: submitInquiry,
  });

  if (status === 'success') {
    return (
      <div role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8">
        <CircleCheck size={36} className="text-emerald-600" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-bold text-navy-900">Request received</h2>
        <p className="mt-2 text-charcoal">
          {serverMessage ||
            "Thanks for reaching out. I'll review your project details and reply by email, usually within two business days."}
        </p>
        <button type="button" onClick={reset} className="btn-ghost-light mt-6 bg-white">
          Send another request
        </button>
      </div>
    );
  }

  const submitting = status === 'submitting';

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-6" aria-describedby="quote-phi-note">
      {status === 'error' && serverMessage && (
        <div role="alert" className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <CircleAlert size={20} className="shrink-0" aria-hidden="true" />
          {serverMessage}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField id="fullName" label="Full name" error={errors.fullName}>
          {(a) => <input {...a} name="fullName" type="text" autoComplete="name" className="field" value={values.fullName} onChange={onChange} maxLength={100} />}
        </FormField>
        <FormField id="email" label="Email address" error={errors.email}>
          {(a) => <input {...a} name="email" type="email" autoComplete="email" className="field" value={values.email} onChange={onChange} maxLength={254} />}
        </FormField>
        <FormField id="phone" label="Phone number" optional error={errors.phone}>
          {(a) => <input {...a} name="phone" type="tel" autoComplete="tel" className="field" value={values.phone} onChange={onChange} maxLength={20} />}
        </FormField>
        <FormField id="organization" label="Business / organization name" optional error={errors.organization}>
          {(a) => <input {...a} name="organization" type="text" autoComplete="organization" className="field" value={values.organization} onChange={onChange} maxLength={150} />}
        </FormField>
      </div>

      <FormField id="service" label="Service needed" error={errors.service}>
        {(a) => (
          <select {...a} name="service" className="field" value={values.service} onChange={onChange}>
            <option value="">Select a service</option>
            {serviceOptionGroups.map((g) => (
              <optgroup key={g.label} label={g.label}>
                {g.options.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </optgroup>
            ))}
          </select>
        )}
      </FormField>

      <FormField
        id="description"
        label="Project description"
        error={errors.description}
        hint="What do you want to build, who is it for, and what should it do?"
      >
        {(a) => (
          <textarea {...a} name="description" rows={6} className="field resize-y" value={values.description} onChange={onChange} maxLength={5000} />
        )}
      </FormField>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField id="budget" label="Estimated budget" error={errors.budget}>
          {(a) => (
            <select {...a} name="budget" className="field" value={values.budget} onChange={onChange}>
              <option value="">Select a range</option>
              {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          )}
        </FormField>
        <FormField id="timeline" label="Expected timeline" error={errors.timeline}>
          {(a) => (
            <select {...a} name="timeline" className="field" value={values.timeline} onChange={onChange}>
              <option value="">Select a timeline</option>
              {timelineOptions.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          )}
        </FormField>
      </div>

      <div id="quote-phi-note" className="flex gap-3 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
        <ShieldAlert size={20} className="shrink-0" aria-hidden="true" />
        <p>
          Please don't include patient names, medical records, or any other protected health
          information. This form is for project inquiries only and is not designed to hold health data.
        </p>
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[0.96rem]">
          <input
            type="checkbox"
            name="noPhiConfirmed"
            checked={values.noPhiConfirmed}
            onChange={onChange}
            aria-invalid={errors.noPhiConfirmed ? true : undefined}
            aria-describedby={errors.noPhiConfirmed ? 'noPhiConfirmed-error' : undefined}
            className="mt-1 h-4 w-4 shrink-0 accent-electric"
          />
          I confirm my request contains no patient health information.
        </label>
        {errors.noPhiConfirmed && <p id="noPhiConfirmed-error" className="field-error">{errors.noPhiConfirmed}</p>}
      </div>

      <Honeypot value={values.website} onChange={onChange} />

      <button type="submit" disabled={submitting} className="btn-primary w-full py-3.5 text-base disabled:opacity-70 sm:w-auto sm:px-8">
        {submitting && <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />}
        {submitting ? 'Sending request…' : 'Submit Request'}
      </button>
      <p className="text-sm text-slate-ink">
        Your details are used only to respond to your request. See the{' '}
        <Link to="/privacy" className="font-medium text-electric underline-offset-2 hover:underline">privacy policy</Link>.
      </p>
    </form>
  );
}
