'use client';

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

import NetworkBackground from "@/components/ui/NetworkBackground";
import { cn } from "@/lib/utils";

const Experience = () => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <section className="relative left-1/2 mt-20 min-h-screen -translate-x-1/2 overflow-hidden ">

            <div className="absolute inset-0 z-[1]  backdrop-blur-[10px]" />

            <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl items-center gap-10 px-5 py-16 sm:px-10 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-2xl">
                    <Image
                        src="/images/event-full.png"
                        alt="Work experience portrait"
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-cover"
                        priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                </div>

                <div className="text-white">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                        Work Experience
                    </p>
                    <h2 className="font-schibsted-grotesk text-3xl font-bold sm:text-4xl">
                        KTZ Software | Senior Software Trainer & Implementation Specialist
                    </h2>
                    <p className="mt-3 text-lg font-semibold text-light-100">[2 Years]</p>
                    <p className="mt-2 text-sm text-light-200 sm:text-base">
                        Yangon, Myanmar - 09 758781180 - htetaungyeyint1234@gmail.com
                    </p>

                    <div className="mt-8 border-t border-white/15 pt-8">
                        <h3 className="text-2xl font-bold">
                            Myday Thu Kywal (Software House) | Junior React Web Developer
                        </h3>

                        <button
                            type="button"
                            onClick={() => setShowDetails((current) => !current)}
                            aria-expanded={showDetails}
                            className="mt-5 inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-white/15"
                        >
                            {showDetails ? "See less" : "See more"}
                            <ChevronDown
                                className={cn(
                                    "size-4 transition-transform duration-300 ease-in-out",
                                    showDetails && "rotate-180"
                                )}
                                aria-hidden="true"
                            />
                        </button>

                        <div
                            className={cn(
                                "grid transition-[grid-template-rows,opacity] duration-500 ease-in-out",
                                showDetails ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                            )}
                        >
                            <div className="overflow-hidden">
                                <ul className="mt-5 space-y-4 text-sm leading-7 text-light-100 sm:text-base">
                                    <li>
                                        <span className="font-semibold text-white">Complex API Integration:</span>{" "}
                                        Collaborated closely with the backend team to consume and integrate complex RESTful APIs,
                                        ensuring seamless data flow and high-performance application logic.
                                    </li>
                                    <li>
                                        <span className="font-semibold text-white">Administrative Interface Development:</span>{" "}
                                        Architected and maintained responsive Admin Panels and reporting modules using React,
                                        specifically designed to streamline departmental workflows.
                                    </li>
                                    <li>
                                        <span className="font-semibold text-white">Advanced Data Handling:</span>{" "}
                                        Implemented sophisticated table features, including server-side pagination,
                                        multi-parameter filtering, and real-time search functionality to manage large datasets efficiently.
                                    </li>
                                    <li>
                                        <span className="font-semibold text-white">Full CRUD Implementation:</span>{" "}
                                        Developed robust Create, Read, Update, and Delete operations, ensuring data integrity across
                                        internal management systems.
                                    </li>
                                    <li>
                                        <span className="font-semibold text-white">UI/UX Collaboration:</span>{" "}
                                        Partnered with the UI/UX design team to translate high-fidelity mockups into functional components,
                                        focusing on enhanced data visualization for key stakeholders.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Experience
