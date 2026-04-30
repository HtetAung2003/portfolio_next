"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Mail, Phone, X } from "lucide-react";

import ContactForm from "@/components/ContactForm";
import { CONTACT_MODAL_EVENT } from "@/components/contactBus";

const ContactModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const openModal = () => setIsOpen(true);
    window.addEventListener(CONTACT_MODAL_EVENT, openModal);

    return () => window.removeEventListener(CONTACT_MODAL_EVENT, openModal);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      onMouseDown={() => setIsOpen(false)}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg border border-white/10 bg-[#061012] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.55)] sm:p-6"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close contact form"
          className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-white transition hover:border-primary/60 hover:text-primary"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(89,222,202,0.16),transparent_34%),radial-gradient(circle_at_82%_90%,rgba(148,234,255,0.13),transparent_30%)]" />
        </div>

        <div className="relative z-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="pr-8">
            <p className="font-martian-mono text-xs uppercase tracking-widest text-primary">
              Hire Me
            </p>
            <h2
              id="contact-modal-title"
              className="mt-3 font-schibsted-grotesk text-3xl font-bold text-white"
            >
              Hiring for a frontend role?
            </h2>
            <p className="mt-4 text-sm leading-7 text-light-200">
              Recruiters and HR teams can send role details, company
              information, expected skills, and interview availability here.
              I am ready to discuss React, Next.js, and frontend developer
              opportunities.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href="mailto:htetaungyeyint1234@gmail.com"
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/25 p-3 text-light-100 transition hover:border-primary/60 hover:bg-primary/10"
              >
                <Mail className="text-primary" size={19} aria-hidden="true" />
                <span className="break-all text-sm">htetaungyeyint1234@gmail.com</span>
              </a>
              <a
                href="tel:+959758781180"
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/25 p-3 text-light-100 transition hover:border-primary/60 hover:bg-primary/10"
              >
                <Phone className="text-primary" size={19} aria-hidden="true" />
                <span className="text-sm">09 758781180</span>
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/25 p-3 text-light-100 transition hover:border-primary/60 hover:bg-primary/10"
              >
                <ExternalLink className="text-primary" size={19} aria-hidden="true" />
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-5">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
