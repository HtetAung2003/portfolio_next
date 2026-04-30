import Image from "next/image";
import type { CSSProperties } from "react";

const backgroundIcons = [
  {
    src: "/images/3dicons-boy-iso-color.png",
    alt: "3D boy icon",
    className: "left-3 top-6 size-20 rotate-[-10deg] sm:left-8 sm:size-28",
    animation: {
      animationDuration: "7.5s",
      animationDelay: "0s",
    },
  },
  {
    src: "/images/3dicons-chat-bubble-dynamic-color.png",
    alt: "3D chat bubble icon",
    className: "right-4 top-10 size-16 rotate-12 sm:right-10 sm:size-24",
    animation: {
      animationDuration: "8.5s",
      animationDelay: "-1.2s",
    },
  },
  {
    src: "/images/3dicons-call-only-dynamic-gradient.png",
    alt: "3D call icon",
    className: "bottom-8 left-6 size-16 rotate-12 sm:left-14 sm:size-24",
    animation: {
      animationDuration: "7s",
      animationDelay: "-2s",
    },
  },
  {
    src: "/images/3dicons-tea-cup-iso-clay.png",
    alt: "3D tea cup icon",
    className: "bottom-5 right-8 size-20 rotate-[-8deg] sm:right-16 sm:size-28",
    animation: {
      animationDuration: "9s",
      animationDelay: "-0.6s",
    },
  },
  {
    src: "/images/3dicons-facebook-dynamic-color.png",
    alt: "3D Facebook icon",
    className: "left-[18%] top-[52%] hidden size-14 rotate-[-14deg] opacity-70 md:block",
    animation: {
      animationDuration: "8s",
      animationDelay: "-3s",
    },
  },
  {
    src: "/images/3dicons-linkedin-dynamic-color.png",
    alt: "3D LinkedIn icon",
    className: "right-[20%] top-[54%] hidden size-14 rotate-12 opacity-70 md:block",
    animation: {
      animationDuration: "7.25s",
      animationDelay: "-1.8s",
    },
  },
];

const About = () => {
  return (
    <section className="relative mt-16 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] px-4 py-12 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(89,222,202,0.16),transparent_44%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:28px_28px] opacity-35" />
        {backgroundIcons.map((icon) => (
          <div
            key={icon.src}
            className={`about-floating-icon absolute ${icon.className}`}
            style={icon.animation as CSSProperties}
            aria-hidden="true"
          >
            <Image
              src={icon.src}
              alt={icon.alt}
              fill
              sizes="112px"
              className="object-contain drop-shadow-[0_18px_35px_rgba(0,0,0,0.35)]"
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="font-martian-mono text-xs uppercase tracking-widest text-primary">
          About Me
        </p>
        <h2 className="mt-3 font-schibsted-grotesk text-3xl font-bold text-white sm:text-4xl">
          I build practical web experiences with clean React interfaces.
        </h2>
        <p className="mt-5 text-sm leading-7 text-light-100 sm:text-base">
          I am a CS graduate and React developer focused on turning ideas into
          polished, usable products. My work blends frontend UI, API
          integration, admin dashboards, and real project delivery from training
          teams to building production web features.
        </p>

        <div className="mt-8 grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
          {["React UI", "API Integration", "Admin Panels"].map((item) => (
            <div
              key={item}
              className="rounded-lg border border-white/10 bg-black/25 px-4 py-3 text-sm font-semibold text-light-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
