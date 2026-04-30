"use client";

import { useEffect, useState } from "react";

import LightRays from "@/components/LightRays";
import NetworkBackground from "@/components/ui/NetworkBackground";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 24;

const ScrollBackground = () => {
  const [showNetwork, setShowNetwork] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const updateBackground = () => {
      frameId = 0;
      setShowNetwork(window.scrollY > SCROLL_THRESHOLD);
    };

    const handleScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateBackground);
    };

    updateBackground();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-black">
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-700 ease-in-out",
          showNetwork ? "opacity-0" : "opacity-100"
        )}
      >
        <LightRays
          raysOrigin="top-center-offset"
          raysColor="#5dfeca"
          raysSpeed={0.5}
          lightSpread={0.9}
          rayLength={1.4}
          followMouse={true}
          mouseInfluence={0.02}
          noiseAmount={0}
          distortion={0.01}
        />
      </div>

      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-700 ease-in-out",
          showNetwork ? "opacity-100" : "opacity-0"
        )}
      >
        <NetworkBackground />
      </div>
    </div>
  );
};

export default ScrollBackground;
