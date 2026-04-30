import type { LucideIcon } from "lucide-react";
import {
  Atom,
  CodeXml,
  Coffee,
  Database,
  Layers3,
  Server,
  Smartphone,
  Star,
} from "lucide-react";

type Skill = {
  name: string;
  level: number;
  focus: string;
  Icon: LucideIcon;
};

const skills: Skill[] = [
  { name: "React", level: 4, focus: "Frontend UI", Icon: Atom },
  { name: "React Native", level: 3, focus: "Mobile apps", Icon: Smartphone },
  { name: "Next.js", level: 3, focus: "Modern web", Icon: Layers3 },
  { name: "Node.js", level: 2, focus: "API logic", Icon: Server },
  { name: "MySQL", level: 3, focus: "Database", Icon: Database },
  { name: "PHP", level: 2, focus: "Backend", Icon: CodeXml },
  { name: "Java", level: 1, focus: "Programming", Icon: Coffee },
];

const TechnicalSkills = () => {
  return (
    <section className="relative mt-16 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] px-4 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:px-6 lg:px-8">

      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-martian-mono text-xs uppercase tracking-widest text-primary">
              Technical Skills
            </p>
            <h3 className="mt-2">Tools I Build With</h3>
          </div>
          <p className="max-w-md text-sm leading-6 text-light-200">
            Clean frontend, useful backend logic, and practical database work.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, skillIndex) => {
            const Icon = skill.Icon;

            return (
            <div
              key={skill.name}
              className="skill-card group rounded-lg border border-white/10 bg-white/[0.07] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-300 hover:-translate-y-1 hover:border-primary/70 hover:bg-white/[0.1] hover:shadow-[0_18px_50px_rgba(89,222,202,0.14)]"
              style={{ animationDelay: `${skillIndex * 90}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-black">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <h4 className="text-base font-semibold text-white transition group-hover:text-primary">
                      {skill.name}
                    </h4>
                    <p className="mt-1 text-xs text-light-200">
                      {skill.focus}
                    </p>
                  </div>
                </div>
                <span className="rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  {skill.level}/5
                </span>
              </div>

              <div
                className="mt-4 flex items-center gap-1"
                aria-label={`${skill.name} skill level ${skill.level} out of 5`}
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={`${skill.name}-${index}`}
                    size={17}
                    className={
                      index < skill.level
                        ? "fill-primary text-primary transition duration-300 group-hover:scale-110"
                        : "text-white/20 transition duration-300 group-hover:text-white/35"
                    }
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;
