"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { MessageSquareText, Send, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type SubmitState = "idle" | "submitting" | "success" | "error";

const FEEDBACK_DELAY_MS = 15000;
const MAX_FEEDBACK_LENGTH = 1000;

const FeedbackPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => setIsOpen(true), FEEDBACK_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    textareaRef.current?.focus();

    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedFeedback = feedback.trim();

    if (!trimmedFeedback) {
      setSubmitState("error");
      setMessage("Please enter feedback before submitting.");
      return;
    }

    if (trimmedFeedback.length > MAX_FEEDBACK_LENGTH) {
      setSubmitState("error");
      setMessage(`Feedback must be ${MAX_FEEDBACK_LENGTH} characters or fewer.`);
      return;
    }

    setSubmitState("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/user-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feedback: trimmedFeedback,
          page: window.location.pathname,
        }),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Feedback submission failed.");
      }

      setFeedback("");
      setSubmitState("success");
      setMessage(data.message || "Thank you. Your feedback was submitted.");
    } catch (error) {
      setSubmitState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Network error. Please try submitting feedback again.",
      );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          role="dialog"
          aria-modal="false"
          aria-labelledby="feedback-popup-title"
          aria-describedby="feedback-popup-description"
          className="fixed bottom-4 right-4 z-[90] w-[calc(100vw-2rem)] max-w-md sm:bottom-6 sm:right-6"
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 48, rotateX: 18, rotateY: -16, scale: 0.92 }
          }
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1 }
          }
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 24, rotateX: 10, scale: 0.96 }
          }
          transition={{ type: "spring", stiffness: 230, damping: 24 }}
          style={{ transformPerspective: 900 }}
        >
          <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#071113]/95 p-4 shadow-[0_24px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-5">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(89,222,202,0.18),transparent_34%),radial-gradient(circle_at_88%_82%,rgba(148,234,255,0.12),transparent_31%)]" />
            </div>

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                    <MessageSquareText size={19} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-martian-mono text-xs uppercase tracking-widest text-primary">
                      Feedback
                    </p>
                    <h2
                      id="feedback-popup-title"
                      className="mt-1 text-xl font-bold text-white"
                    >
                      How is this page feeling?
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close feedback pop-up"
                  className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-white transition hover:border-primary/60 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              <p
                id="feedback-popup-description"
                className="mt-3 text-sm leading-6 text-light-200"
              >
                Share what worked, what felt confusing, or what you would improve.
              </p>

              <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
                <label className="flex flex-col gap-2 text-sm text-light-100">
                  Your Feedback
                  <textarea
                    ref={textareaRef}
                    value={feedback}
                    onChange={(event) => {
                      setFeedback(event.target.value);
                      if (submitState !== "submitting") {
                        setSubmitState("idle");
                        setMessage("");
                      }
                    }}
                    maxLength={MAX_FEEDBACK_LENGTH}
                    rows={4}
                    placeholder="Tell me what you think..."
                    className="max-h-44 min-h-28 resize-y rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-light-200/70 focus:border-primary/70 focus:ring-2 focus:ring-primary/20"
                    aria-invalid={submitState === "error"}
                  />
                </label>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-xs text-light-200">
                    {feedback.length}/{MAX_FEEDBACK_LENGTH}
                  </span>

                  <button
                    type="submit"
                    disabled={submitState === "submitting"}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-black transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitState === "submitting" ? "Submitting..." : "Submit"}
                    <Send size={17} aria-hidden="true" />
                  </button>
                </div>

                {message && (
                  <p
                    role="status"
                    aria-live="polite"
                    className={
                      submitState === "success"
                        ? "text-sm text-primary"
                        : "text-sm text-red-300"
                    }
                  >
                    {message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default FeedbackPopup;
