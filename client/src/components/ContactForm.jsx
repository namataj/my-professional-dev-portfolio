import { CircleAlert, CircleCheck, LoaderCircle } from 'lucide-react';
import FormField, { Honeypot } from './FormField.jsx';
import useFormSubmit from '../hooks/useFormSubmit.js';
import { validateContact } from '../services/validation.js';
import { submitContact } from '../services/api.js';

const emptyContact = { name: '', email: '', subject: '', message: '', website: '' };

export default function ContactForm() {
  const { values, errors, status, serverMessage, onChange, onSubmit, reset } = useFormSubmit({
    initialValues: emptyContact,
    validate: validateContact,
    submit: submitContact,
  });

  if (status === 'success') {
    return (
      <div role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8">
        <CircleCheck size={36} className="text-emerald-600" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-bold text-navy-900">Message sent</h2>
        <p className="mt-2 text-charcoal">{serverMessage || "Thanks for getting in touch. I'll reply by email soon."}</p>
        <button type="button" onClick={reset} className="btn-ghost-light mt-6 bg-white">
          Send another message
        </button>
      </div>
    );
  }

  const submitting = status === 'submitting';

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-6">
      {status === 'error' && serverMessage && (
        <div role="alert" className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <CircleAlert size={20} className="shrink-0" aria-hidden="true" />
          {serverMessage}
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField id="c-name" label="Name" error={errors.name}>
          {(a) => <input {...a} name="name" type="text" autoComplete="name" className="field" value={values.name} onChange={onChange} maxLength={100} />}
        </FormField>
        <FormField id="c-email" label="Email address" error={errors.email}>
          {(a) => <input {...a} name="email" type="email" autoComplete="email" className="field" value={values.email} onChange={onChange} maxLength={254} />}
        </FormField>
      </div>
      <FormField id="c-subject" label="Subject" optional error={errors.subject}>
        {(a) => <input {...a} name="subject" type="text" className="field" value={values.subject} onChange={onChange} maxLength={150} />}
      </FormField>
      <FormField id="c-message" label="Message" error={errors.message} hint="Please don't include any patient health information.">
        {(a) => <textarea {...a} name="message" rows={6} className="field resize-y" value={values.message} onChange={onChange} maxLength={5000} />}
      </FormField>
      <Honeypot value={values.website} onChange={onChange} />
      <button type="submit" disabled={submitting} className="btn-primary w-full py-3.5 text-base disabled:opacity-70 sm:w-auto sm:px-8">
        {submitting && <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />}
        {submitting ? 'Sending message…' : 'Send Message'}
      </button>
    </form>
  );
}
