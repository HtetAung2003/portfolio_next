import { ExternalLink, Mail, Phone } from "lucide-react";

import ContactForm from "@/components/ContactForm";

const contactLinks = [
  {
    label: "Email",
    value: "htetaungyeyint1234@gmail.com",
    href: "mailto:htetaungyeyint1234@gmail.com",
    Icon: Mail,
  },
  {
    label: "Phone",
    value: "09 758781180",
    href: "tel:+959758781180",
    Icon: Phone,
  },
  {
    label: "LinkedIn",
    value: "Review my professional profile",
    href: "https://www.linkedin.com/",
    Icon: ExternalLink,
  },
];

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative mt-16 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] px-4 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(89,222,202,0.18),transparent_34%),radial-gradient(circle_at_82%_80%,rgba(148,234,255,0.13),transparent_32%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.06)_48%,transparent)]" />
      </div>

      <div className="relative z-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="font-martian-mono text-xs uppercase tracking-widest text-primary">
            Hire Me
          </p>
          <h3 className="mt-2 text-white">Available for Frontend Developer Roles</h3>
          <p className="mt-4 max-w-xl text-sm leading-7 text-light-200 sm:text-base">
            HR teams and recruiters can contact me for junior React developer,
            frontend developer, or web developer opportunities. Send the role
            details, company name, and interview schedule, and I will respond
            professionally.
          </p>

          <div className="mt-8 grid gap-3">
            {contactLinks.map(({ label, value, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={label === "LinkedIn" ? "_blank" : undefined}
                rel={label === "LinkedIn" ? "noreferrer" : undefined}
                className="group flex items-center gap-4 rounded-lg border border-white/10 bg-black/25 p-4 transition hover:border-primary/60 hover:bg-primary/10"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-black">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-widest text-light-200">
                    {label}
                  </span>
                  <span className="block break-words text-sm font-semibold text-white sm:text-base">
                    {value}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-6">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
