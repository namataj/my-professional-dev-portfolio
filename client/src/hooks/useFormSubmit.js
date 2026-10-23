import { useRef, useState } from 'react';
import { ApiError } from '../services/api.js';

// Shared form state: values, field errors, submit status, and the spam-check
// fields (a hidden honeypot and the time the form was opened).
export default function useFormSubmit({ initialValues, validate, submit }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [serverMessage, setServerMessage] = useState('');
  const startedAt = useRef(Date.now());

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((errs) => ({ ...errs, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Move focus to the first invalid field so keyboard and screen reader users land on it.
      const first = Object.keys(found)[0];
      e.currentTarget.querySelector(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus('submitting');
    setServerMessage('');
    try {
      const data = await submit({ ...values, startedAt: startedAt.current });
      setStatus('success');
      setServerMessage(data.message || '');
    } catch (err) {
      setStatus('error');
      if (err instanceof ApiError) {
        setErrors(err.fieldErrors || {});
        setServerMessage(err.message);
      } else {
        setServerMessage('Something went wrong. Please try again.');
      }
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setStatus('idle');
    setServerMessage('');
    startedAt.current = Date.now();
  };

  return { values, errors, status, serverMessage, onChange, onSubmit, reset };
}
