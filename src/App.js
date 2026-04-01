import { useEffect, useRef, useState } from "react";

import img1 from "./assets/profile1.jpeg";
import img2 from "./assets/profile2.jpeg";

/* ═══════════════════════════════════════════
   THEME TOKENS  (light = exact HTML palette)
═══════════════════════════════════════════ */
const THEMES = {
  light: {
    bg:         "#f5f0e8",   // --paper
    bgAlt:      "#ede8dc",   // --cream
    bgCard:     "#ede8dc",
    bgCardHov:  "#e4ddd0",
    text:       "#0d0d0d",   // --ink
    textMuted:  "#7a7068",   // --muted
    textSlate:  "#3a3a3a",   // --slate
    accent:     "#c14b2a",   // --rust
    gold:       "#b8932a",   // --gold
    border:     "rgba(13,13,13,0.12)",   // --line
    navBg:      "rgba(245,240,232,0.88)",
    btnPrimBg:  "#0d0d0d",
    btnPrimTxt: "#f5f0e8",
    footerBg:   "#ede8dc",
    tagBg:      "#f5f0e8",
    projectBg:  "#0d0d0d",
    projectTxt: "#f5f0e8",
    projectMuted:"rgba(245,240,232,0.6)",
    projectBorder:"rgba(245,240,232,0.1)",
    initials:   "#ede8dc",
  },
  dark: {
    bg:         "#111010",
    bgAlt:      "#181614",
    bgCard:     "#181614",
    bgCardHov:  "#1f1c1a",
    text:       "#f0ece4",
    textMuted:  "#7a7470",
    textSlate:  "#a09890",
    accent:     "#e0603e",   // rust warmed up for dark bg
    gold:       "#c9a84c",
    border:     "rgba(240,236,228,0.09)",
    navBg:      "rgba(17,16,16,0.92)",
    btnPrimBg:  "#e0603e",
    btnPrimTxt: "#111010",
    footerBg:   "#181614",
    tagBg:      "#111010",
    projectBg:  "#0d0c0b",
    projectTxt: "#f0ece4",
    projectMuted:"rgba(240,236,228,0.55)",
    projectBorder:"rgba(240,236,228,0.1)",
    initials:   "#1f1c1a",
  },
};

/* ═══════════════════ DATA ═══════════════════ */
const STATS = [
  { value: "3+",   label: "Years Exp." },
  { value: "50%",  label: "Load Reduction" },
  { value: "75%",  label: "Claims Automated" },
];

const EXPERIENCE = [
  {
    company: "Hitachi Digital",
    period: "Mar 2025 – Present",
    role: "Consultant II",
    projects: [
      {
        name: "Nissan GAMMA AMO",
        bullets: [
          "Developed enterprise-grade backend services using Java and Spring Boot for large-scale automotive data platforms.",
          "Designed RESTful microservices improving system reliability, performance, and API consistency.",
          "Worked with AWS infrastructure and cloud-hosted services for scalable deployments.",
          "Performed data analysis and validation using SQL and Snowflake.",
          "Built CI/CD pipelines using Jenkins, Git, Gradle, and SonarQube.",
        ],
      },
      {
        name: "ngCPQ Contract-to-Order Workflow",
        bullets: [
          "Developed full-stack features with React, TypeScript, Redux (frontend) and Java Spring Boot (backend).",
          "Designed and consumed REST APIs for dynamic pricing, contract creation, and order workflows.",
          "Practised TDD using JUnit and Jest for backend and frontend reliability.",
          "Collaborated in Agile/Scrum with PMs, UX designers, and QA teams.",
        ],
      },
    ],
  },
  {
    company: "ValueLabs LLP",
    period: "Jul 2020 – Jun 2022",
    role: "Software Engineer",
    projects: [
      {
        name: null,
        bullets: [
          "Built full-stack web and mobile applications using Java, JavaScript, React Native, and RESTful backend services.",
          "Developed backend APIs and business logic, integrating authentication, data storage, and third-party services.",
          "Worked with SQL and NoSQL databases: PostgreSQL, MongoDB, Firebase.",
          "Improved application performance across frontend and backend layers — up to 50% reduction in load times.",
          "Collaborated with DevOps and QA teams to debug production issues and support cloud-based deployments.",
        ],
      },
    ],
  },
];

const SKILLS = [
  { category: "Backend",           items: ["Java","Spring Boot","REST APIs","Microservices"] },
  { category: "Frontend",          items: ["React JS","TypeScript","JavaScript ES6+","HTML5","CSS3","Redux"] },
  { category: "Cloud",             items: ["AWS Lambda","AWS Step Functions","AWS S3","AWS CDK","AWS RDS","AWS Textract"] },
  { category: "Databases",         items: ["PostgreSQL","MySQL","MongoDB","Snowflake","Firebase"] },
  { category: "DevOps & CI/CD",    items: ["Jenkins","GitHub Actions","Docker","Gradle","SonarQube"] },
  { category: "Testing & Practices",items: ["JUnit","Jest","Playwright","TDD","Agile/Scrum"] },
];

const PROJECTS = [
  {
    stack: "Java · Spring Boot · AWS Lambda · Step Functions · PostgreSQL",
    name:  "Agentic AI Insurance Processor",
    desc:  "Cloud-native backend architecture using Java and Spring Boot integrated with AWS serverless services. Implements RESTful APIs and orchestration logic for automated insurance claims processing at scale.",
    stat:  "▲ 75% reduction in manual claims review effort",
    href:  "https://github.com",
  },
  {
    stack: "Java · Spring Boot · AWS CDK · Lambda · S3 · Textract",
    name:  "Serverless Document Processing Platform",
    desc:  "Document ingestion and processing system using Java-based services and AWS cloud infrastructure. Automated deployments via CI/CD pipelines and Infrastructure-as-Code with AWS CDK.",
    stat:  "▲ 10,000+ documents processed per day",
    href:  "https://github.com",
  },
];

const EDUCATION = [
  {
    period: "Feb 2023 – Dec 2024",
    degree: "Master of Information Technology & IT Management",
    school: "The University of Sydney",
    detail: "Specialisation: Data Analytics",
  },
  {
    period: "Aug 2016 – Aug 2020",
    degree: "B.Tech in Information Technology",
    school: "CVR College of Engineering",
    detail: "CGPA: 9.41 / 10",
  },
];

/* ═══════════════════ HOOKS ═══════════════════ */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(24px)",
      transition: `opacity 0.65s ${delay}s ease, transform 0.65s ${delay}s ease`,
    }}>
      {children}
    </div>
  );
}

/* ═══════════════════ THEME TOGGLE ═══════════════════ */
function ThemeToggle({ dark, onToggle, t }) {
  return (
    <button
      onClick={onToggle}
      title={dark ? "Light mode" : "Dark mode"}
      style={{
        display: "flex", alignItems: "center", gap: "0.45rem",
        background: "transparent",
        border: `1px solid ${t.border}`,
        borderRadius: "2rem",
        padding: "0.28rem 0.65rem",
        cursor: "pointer",
        transition: "border-color 0.2s",
        outline: "none",
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = t.accent}
      onMouseLeave={e => e.currentTarget.style.borderColor = t.border}
    >
      {/* Sun */}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
        stroke={!dark ? t.accent : t.textMuted} strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.3s" }}>
        <circle cx="12" cy="12" r="4.5"/>
        <line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/>
        <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
        <line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/>
        <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
      </svg>
      {/* Track */}
      <div style={{
        width: 26, height: 15, borderRadius: 8, position: "relative", flexShrink: 0,
        background: dark ? t.accent : t.border,
        transition: "background 0.3s",
      }}>
        <div style={{
          position: "absolute", top: 1.5,
          left: dark ? 11 : 1.5,
          width: 12, height: 12, borderRadius: "50%",
          background: dark ? "#fff" : t.text,
          transition: "left 0.25s cubic-bezier(.16,1,.3,1), background 0.3s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }} />
      </div>
      {/* Moon */}
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
        stroke={dark ? t.accent : t.textMuted} strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.3s" }}>
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
      </svg>
    </button>
  );
}

/* ═══════════════════ NAV ═══════════════════ */
const NAV_LINKS = ["Experience","Skills","Projects","Education","Contact"];

function Nav({ scrolled, dark, onToggle, t }) {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "1.25rem 3rem",
      borderBottom: `1px solid ${t.border}`,
      background: t.navBg,
      backdropFilter: "blur(12px)",
      transition: "background 0.4s",
    }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: t.textMuted }}>
      Portfolio
      </span>
      <ul style={{ display: "flex", gap: "2rem", listStyle: "none", alignItems: "center" }}>
        {NAV_LINKS.map(n => (
          <li key={n}>
            <a href={`#${n.toLowerCase()}`}
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: t.textMuted, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = t.accent}
              onMouseLeave={e => e.currentTarget.style.color = t.textMuted}
            >{n}</a>
          </li>
        ))}
        <li><ThemeToggle dark={dark} onToggle={onToggle} t={t} /></li>
      </ul>
    </nav>
  );
}

/* ═══════════════════ HERO ═══════════════════ */
function Hero({ t }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const id = setTimeout(() => setMounted(true), 80); return () => clearTimeout(id); }, []);

  const anim = (delay, extra = {}) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "none" : "translateY(20px)",
    transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
    ...extra,
  });

  return (
    <section style={{
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      paddingTop: "5rem",
      position: "relative",
      overflow: "hidden",
      background: t.bg,
    }}>
      {/* Left */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "5rem 3rem", position: "relative", zIndex: 2 }}>
        <p style={{ ...anim(0.2), fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: t.accent, marginBottom: "1.5rem" }}>
          Java Full-Stack Developer · 3+ Years
        </p>
        <h1 style={{ ...anim(0.35), fontFamily: "'DM Serif Display', serif", fontSize: "clamp(3rem,5vw,5.5rem)", lineHeight: 1.05, color: t.text, marginBottom: "0" }}>
          Hari  <em style={{ fontStyle: "italic", color: t.accent }}>Charan</em><br />
         Krishna Nori
        </h1>
        <p style={{ ...anim(0.5), fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.1rem,2vw,1.6rem)", color: t.textMuted, marginTop: "0.6rem" }}>
          Building scalable systems,<br />one microservice at a time.
        </p>
        <p style={{ ...anim(0.65), fontSize: "0.95rem", color: t.textSlate, maxWidth: 440, lineHeight: 1.8, marginTop: "2rem" }}>
          Cloud-native architect specialising in Java, Spring Boot, React and AWS.
          Currently consulting at Hitachi Digital Services, shaping enterprise platforms for automotive and CPQ workflows.
        </p>
        <div style={{ ...anim(0.8), display: "flex", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
          <a href="#contact" style={{
            background: t.btnPrimBg, color: t.btnPrimTxt,
            padding: "0.75rem 1.75rem",
            fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase",
            textDecoration: "none", border: `1px solid ${t.btnPrimBg}`,
            transition: "background 0.2s, border-color 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = t.accent; e.currentTarget.style.borderColor = t.accent; }}
            onMouseLeave={e => { e.currentTarget.style.background = t.btnPrimBg; e.currentTarget.style.borderColor = t.btnPrimBg; }}
          >Get in Touch</a>
          <a href="#experience" style={{
            background: "transparent", color: t.text,
            padding: "0.75rem 1.75rem",
            fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase",
            textDecoration: "none", border: `1px solid ${t.text}`,
            transition: "background 0.2s, color 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = t.text; e.currentTarget.style.color = t.bg; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = t.text; }}
          >View Work</a>
        </div>

        {/* Stats */}
        <div style={{ ...anim(1.0), display: "flex", gap: "3rem", marginTop: "auto", paddingTop: "3rem" }}>
          {STATS.map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "2rem", color: t.text, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: t.textMuted, marginTop: "0.3rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ position: "absolute", left: "50%", top: "5rem", bottom: 0, width: 1, background: t.border }} />

{/* Right — Profile Image */}
<div style={{
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden"
}}>
  <div style={{
    width: 420,
    height: 520,
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
    border: `1px solid ${t.border}`,
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
    opacity: mounted ? 1 : 0,
    transform: mounted ? "none" : "translateY(20px)",
    transition: "opacity 1s 0.5s ease, transform 1s 0.5s ease",
  }}>

    {/* Image */}
    <img
      src={require("./assets/profile1.jpeg")}
      alt="profile"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />

    {/* Gradient overlay (premium look) */}
    <div style={{
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.35))",
    }} />

    {/* Accent border glow */}
    <div style={{
      position: "absolute",
      inset: 0,
      border: `1px solid ${t.accent}`,
      opacity: 0.15,
      pointerEvents: "none"
    }} />

  </div>
</div>
    </section>
  );
}


/* ═══════════════════ SECTION HEADER ═══════════════════ */
function SectionHeader({ num, title, t, lightText = false }) {
  return (
    <Reveal>
      <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem", marginBottom: "4rem" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: t.accent, letterSpacing: "0.1em" }}>{num}</span>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem,3vw,3rem)", color: lightText ? t.projectTxt : t.text, lineHeight: 1.1 }}>{title}</h2>
      </div>
    </Reveal>
  );
}

/* ═══════════════════ EXPERIENCE ═══════════════════ */
function Experience({ t }) {
  return (
    <section id="experience" style={{ padding: "6rem 3rem", borderTop: `1px solid ${t.border}`, background: t.bgAlt }}>
      <SectionHeader num="01" title="Professional Experience" t={t} />
      <div>
        {EXPERIENCE.map((exp, ei) => (
          <Reveal key={ei} delay={ei * 0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "3rem", padding: "2.5rem 0", borderBottom: ei < EXPERIENCE.length - 1 ? `1px solid ${t.border}` : "none" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: t.accent }}>{exp.company}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: t.textMuted }}>{exp.period}</span>
              </div>
              <div>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.4rem", color: t.text, marginBottom: "0.5rem" }}>{exp.role}</h3>
                {exp.projects.map((proj, pi) => (
                  <div key={pi} style={{ marginTop: pi > 0 ? "1.5rem" : 0 }}>
                    {proj.name && (
                      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: t.gold, marginBottom: "1rem" }}>↳ {proj.name}</p>
                    )}
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {proj.bullets.map((b, bi) => (
                        <li key={bi} style={{ fontSize: "0.9rem", color: t.textSlate, paddingLeft: "1.25rem", position: "relative", lineHeight: 1.7 }}>
                          <span style={{ position: "absolute", left: 0, color: t.accent, fontSize: "0.8rem" }}>—</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════ SKILLS ═══════════════════ */
function Skills({ t }) {
  return (
    <section id="skills" style={{ padding: "6rem 3rem", borderTop: `1px solid ${t.border}`, background: t.bg }}>
      <SectionHeader num="02" title="Technical Skills" t={t} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.5rem" }}>
        {SKILLS.map((sk, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <SkillCard sk={sk} t={t} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SkillCard({ sk, t }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border: `1px solid ${t.border}`,
        padding: "2rem",
        background: t.bgCard,
        position: "relative",
        overflow: "hidden",
        transform: hov ? "translateY(-3px)" : "none",
        boxShadow: hov ? `0 8px 30px rgba(0,0,0,0.07)` : "none",
        transition: "transform 0.25s, box-shadow 0.25s",
      }}
    >
      {/* accent bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
        background: t.accent,
        transform: hov ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition: "transform 0.3s",
      }} />
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: t.accent, marginBottom: "1rem" }}>{sk.category}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {sk.items.map((item, j) => (
          <span key={j} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: t.textSlate, border: `1px solid ${t.border}`, padding: "0.3rem 0.7rem", background: t.tagBg, letterSpacing: "0.04em" }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════ PROJECTS ═══════════════════ */
function Projects({ t }) {
  return (
    <section id="projects" style={{ padding: "6rem 3rem", borderTop: `1px solid ${t.border}`, background: t.projectBg }}>
      <SectionHeader num="03" title="Projects" t={t} lightText />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        {PROJECTS.map((p, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <ProjectCard p={p} t={t} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ p, t }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border: `1px solid ${hov ? t.accent : t.projectBorder}`,
        padding: "2.5rem",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.25s",
        cursor: "default",
      }}
    >
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: t.accent, marginBottom: "1.25rem" }}>{p.stack}</p>
      <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.6rem", color: t.projectTxt, lineHeight: 1.2, marginBottom: "1rem" }}>{p.name}</h3>
      <p style={{ fontSize: "0.88rem", color: t.projectMuted, lineHeight: 1.8 }}>{p.desc}</p>
      <p style={{ marginTop: "1.5rem", fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: t.gold, letterSpacing: "0.08em" }}>{p.stat}</p>
      <a href={p.href} target="_blank" rel="noreferrer"
        style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginTop: "1.5rem", fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: t.projectTxt, textDecoration: "none", borderBottom: `1px solid rgba(245,240,232,0.2)`, paddingBottom: "0.2rem", transition: "color 0.2s, border-color 0.2s" }}
        onMouseEnter={e => { e.currentTarget.style.color = t.accent; e.currentTarget.style.borderColor = t.accent; }}
        onMouseLeave={e => { e.currentTarget.style.color = t.projectTxt; e.currentTarget.style.borderColor = "rgba(245,240,232,0.2)"; }}
      >View on GitHub →</a>
    </div>
  );
}

/* ═══════════════════ EDUCATION ═══════════════════ */
function Education({ t }) {
  return (
    <section id="education" style={{ padding: "6rem 3rem", borderTop: `1px solid ${t.border}`, background: t.bgAlt }}>
      <SectionHeader num="04" title="Education" t={t} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {EDUCATION.map((e, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div style={{ border: `1px solid ${t.border}`, padding: "2.5rem", background: t.bg }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: t.textMuted, letterSpacing: "0.1em", marginBottom: "0.75rem" }}>{e.period}</p>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.25rem", color: t.text, lineHeight: 1.3, marginBottom: "0.5rem" }}>{e.degree}</h3>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: t.accent, letterSpacing: "0.08em", textTransform: "uppercase" }}>{e.school}</p>
              <p style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: t.textMuted, fontFamily: "'DM Mono', monospace" }}>{e.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════ CONTACT ═══════════════════ */
const CONTACT_LINKS = [
  { icon: "✉", label: "Email",    value: "charankrishna1227@gmail.com", href: "mailto:charankrishna1227@gmail.com" },
  { icon: "✆", label: "Phone",    value: "+91 9000 251 277",            href: "tel:+919000251277" },
  { icon: "in",label: "LinkedIn", value: "linkedin.com/in/charan-krishna-n",  href: "https://www.linkedin.com/in/charan-krishna-n/" },
  { icon: "⌥", label: "GitHub",   value: "github.com/Charannkrishna",       href: "https://github.com/CharannKrishna" },
];

function Contact({ t }) {
  return (
    <section id="contact" style={{ padding: "6rem 3rem", borderTop: `1px solid ${t.border}`, background: t.bg }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
        <Reveal>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2.5rem,4vw,4rem)", color: t.text, lineHeight: 1.1 }}>
            Let's build<br />something <em style={{ fontStyle: "italic", color: t.accent }}>great</em><br />together.
          </h2>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {CONTACT_LINKS.map((l, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <ContactItem l={l} t={t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactItem({ l, t }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: "1.25rem",
        padding: "1.25rem 1.5rem",
        border: `1px solid ${t.border}`,
        textDecoration: "none",
        color: hov ? t.bg : t.text,
        background: hov ? t.text : t.bgCard,
        borderColor: hov ? t.text : t.border,
        transition: "background 0.2s, color 0.2s, border-color 0.2s",
      }}
    >
      <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{l.icon}</span>
      <div style={{ flex: 1 }}>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: hov ? t.textMuted : t.accent, marginBottom: "0.2rem", transition: "color 0.2s" }}>{l.label}</p>
        <p style={{ fontSize: "0.9rem", fontWeight: 500 }}>{l.value}</p>
      </div>
    </a>
  );
}

/* ═══════════════════ FOOTER ═══════════════════ */
function Footer({ t }) {
  return (
    <footer style={{ borderTop: `1px solid ${t.border}`, padding: "1.75rem 3rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: t.footerBg }}>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: t.textMuted, letterSpacing: "0.08em" }}>© 2026 Hari Charan Krishna Nori — Hyderabad, India</p>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: t.textMuted, letterSpacing: "0.08em" }}>Java Full-Stack Developer · AWS · React · Spring Boot</p>
    </footer>
  );
}

/* ═══════════════════ APP ═══════════════════ */
export default function App() {
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = THEMES[dark ? "dark" : "light"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&family=Instrument+Sans:wght@400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{font-family:'Instrument Sans',sans-serif;line-height:1.6;overflow-x:hidden}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:${t.bg}}
        ::-webkit-scrollbar-thumb{background:${t.accent}55;border-radius:2px}
        ::selection{background:${t.accent}33}
        @media(max-width:768px){
          nav ul li:not(:last-child){display:none}
          .hero-grid{grid-template-columns:1fr !important}
          .edu-grid{grid-template-columns:1fr !important}
          .proj-grid{grid-template-columns:1fr !important}
          .contact-grid{grid-template-columns:1fr !important}
          .exp-row{grid-template-columns:1fr !important}
        }
      `}</style>

      {/* Grain overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 100, opacity: 0.5,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
      }} />

      <div style={{ background: t.bg, color: t.text, transition: "background 0.35s, color 0.35s", minHeight: "100vh" }}>
        <Nav scrolled={scrolled} dark={dark} onToggle={() => setDark(d => !d)} t={t} />
        <main>
          <Hero t={t} />
          <Experience t={t} />
          <Skills t={t} />
          <Projects t={t} />
          <Education t={t} />
          <Contact t={t} />
        </main>
        <Footer t={t} />
      </div>
    </>
  );
}
