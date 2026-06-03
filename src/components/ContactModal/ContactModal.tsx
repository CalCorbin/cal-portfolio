import React, { useState } from 'react';
import styles from './ContactModal.module.css';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const ContactModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<FormState>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/mwvjeyne', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setFormState('success');
        form.reset();
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  return (
    <>
      <button
        className={styles.stickyButton}
        onClick={() => setIsOpen(true)}
        aria-label="Open contact form"
      >
        🤝 work with me
      </button>

      {isOpen && (
        <div
          className={styles.overlay}
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          <div className={styles.modal}>
            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="Close contact form"
            >
              ×
            </button>
            <h2 id="contact-modal-title">let&apos;s talk</h2>

            {formState === 'success' ? (
              <p className={styles.successMessage}>
                message sent — i&apos;ll be in touch soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <label htmlFor="contact-name">name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                />

                <label htmlFor="contact-email">email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                />

                <label htmlFor="contact-message">message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                />

                {formState === 'error' && (
                  <p className={styles.errorMessage}>
                    something went wrong — try emailing me directly.
                  </p>
                )}

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={formState === 'submitting'}
                >
                  {formState === 'submitting' ? 'sending...' : 'send'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ContactModal;
