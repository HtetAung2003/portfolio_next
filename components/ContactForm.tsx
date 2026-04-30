"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";

type SendState = "idle" | "sending" | "sent" | "error";

const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};

const ContactForm = () => {
  const [sendState, setSendState] = useState<SendState>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSendState("sending");
    setMessage("");

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const userMessage = String(form.get("message") ?? "");
    const sentAt = new Intl.DateTimeFormat("en", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date());

    if (
      !emailjsConfig.serviceId ||
      !emailjsConfig.templateId ||
      !emailjsConfig.publicKey
    ) {
      setSendState("error");
      setMessage("EmailJS keys are missing. Add them to your environment file.");
      return;
    }

    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: emailjsConfig.serviceId,
          template_id: emailjsConfig.templateId,
          user_id: emailjsConfig.publicKey,
          template_params: {
            user_name: name,
            from_name: name,
            reply_to: email,
            from_email: email,
            email,
            time: sentAt,
            message: userMessage,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "EmailJS request failed");
      }

      formElement.reset();
      setSendState("sent");
      setMessage("Thank you. I will reply to your hiring message soon.");
    } catch (error) {
      setSendState("error");
      setMessage(
        error instanceof Error
          ? `Message could not be sent: ${error.message}`
          : "Message could not be sent. Please try again or email me directly.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-light-100">
          Your Name
          <input
            name="name"
            required
          placeholder="HR or recruiter name"
            className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-light-200/70 focus:border-primary/70 focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-light-100">
          Your Email
          <input
            name="email"
            type="email"
            required
          placeholder="hr@company.com"
            className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-light-200/70 focus:border-primary/70 focus:ring-2 focus:ring-primary/20"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm text-light-100">
        Your Message
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Share the role title, company name, required skills, and interview details."
          className="resize-none rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-light-200/70 focus:border-primary/70 focus:ring-2 focus:ring-primary/20"
        />
      </label>

      <button
        type="submit"
        disabled={sendState === "sending"}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-black transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {sendState === "sending" ? "Sending..." : "Send Hiring Message"}
        <Send size={18} aria-hidden="true" />
      </button>

      {message && (
        <p
          className={
            sendState === "sent"
              ? "text-sm text-primary"
              : "text-sm text-red-300"
          }
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default ContactForm;
