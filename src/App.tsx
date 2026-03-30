/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { 
  Terminal, 
  Github, 
  Linkedin, 
  Mail, 
  Database, 
  Server, 
  Layers, 
  ExternalLink, 
  ChevronRight,
  Code2,
  Workflow,
  CheckCircle2,
  MessageSquare,
  Clock,
  Send,
  Instagram,
  Loader2,
  GitBranch,
  Zap,
  Box,
  Shield,
  ShieldCheck,
  Activity,
  BookOpen,
  Share2,
  Link2,
  Download,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

gsap.registerPlugin(ScrollTrigger);

const LENIS_NAV_OFFSET = -96;
const SECTION_PAD = "py-20 md:py-28 px-6 md:px-12";
const PROJECTS_SECTION_PAD =
  "pt-20 md:pt-28 pb-12 md:pb-16 px-6 md:px-12";
const SOFT_SKILLS_SECTION_PAD =
  "pt-14 md:pt-16 pb-20 md:pb-28 px-6 md:px-12";
const SECTION_ANCHOR = "scroll-mt-24 md:scroll-mt-28";

type LenisApi = {
  scrollToHash: (hash: string) => void;
  scrollToTop: () => void;
};

const LenisContext = createContext<LenisApi | null>(null);

function useLenisApi() {
  return useContext(LenisContext);
}

function handleInPageNav(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string | undefined,
  api: LenisApi | null
) {
  if (!href || !href.startsWith("#")) return;
  if (href === "#") {
    e.preventDefault();
    return;
  }
  if (api) {
    e.preventDefault();
    api.scrollToHash(href);
  }
}

// --- Data ---

const NAV_LINKS = [
  { name: "Work", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
];

/** Place your PDF at `public/cv.pdf` (or change path + filename below). */
const CV_HREF = "/cv.pdf";
const CV_DOWNLOAD_FILENAME = "Naveen_Yanamala_CV.pdf";

const TECH_STACK = [
  { name: "Node.js", icon: <Server className="text-accent" /> },
  { name: "Express.js", icon: <Code2 className="text-accent" /> },
  { name: "REST APIs", icon: <Link2 className="text-accent" /> },
  { name: "GraphQL", icon: <Share2 className="text-accent" /> },
  { name: "Fastify", icon: <Zap className="text-accent" /> },
  { name: "MongoDB", icon: <Database className="text-accent" /> },
  { name: "Redis", icon: <Layers className="text-accent" /> },
  { name: "Kafka", icon: <Workflow className="text-accent" /> },
  { name: "Docker", icon: <Box className="text-accent" /> },
  { name: "Nginx", icon: <Shield className="text-accent" /> },
  { name: "Caddy", icon: <ShieldCheck className="text-accent" /> },
  { name: "PM2", icon: <Activity className="text-accent" /> },
  { name: "Swagger", icon: <BookOpen className="text-accent" /> },
  { name: "Git", icon: <GitBranch className="text-accent" /> },
];

const STATS = [
  { label: "Years of Experience", value: 2, suffix: "+" },
  { label: "Projects Completed", value: 10, suffix: "+" },
  { label: "APIs Built", value: 40, suffix: "+" },
  { label: "Test coverage / reliability", value: 90, suffix: "+" },
];

const PROJECTS = [
  {
    title: "Visitor Management System",
    description: "Streamline your visitor management process with our comprehensive system. From registration to queue management, we've got you covered.",
    tags: ["Node.js", "React.js", "MongoDB", "Docker"],
    image: "/images/visitor_management.png",
    featured: true,
    href: "https://github.com/Naveenyanamala/visitorManagement",
  },
  {
    title: "Multi Tenant SaaS Application",
    description: "A multi-tenant SaaS application built with Node.js and PostgreSQL, using Redis for caching and event-driven communication.",
    tags: ["Node.js", "PostgreSQL", "Redis"],
    image: "/images/multi_tenant.png",
    featured: false,
    href: "https://github.com/Naveenyanamala/multi-tenant-REST-API",
  },
  {
    title: "Time Craft App",
    description: "A Habit tracking app built with Dart and Flutter, using Firebase for authentication and real-time database.",
    tags: ["Dart", "Flutter", "Firebase"],
    image: "/images/habit_tracker.png",
    featured: false,
    href: "https://github.com/Naveenyanamala/Chit_Chat",
  },
];

const SOFT_SKILLS = [
  { 
    title: "Quality Focus", 
    icon: <CheckCircle2 className="text-accent" />, 
    desc: "Writing clean, maintainable, and well-tested code is my top priority." 
  },
  { 
    title: "Reliable Communication", 
    icon: <MessageSquare className="text-accent" />, 
    desc: "Clear and proactive communication to ensure project alignment." 
  },
  { 
    title: "On-Time Delivery", 
    icon: <Clock className="text-accent" />, 
    desc: "Consistent delivery of milestones through efficient planning." 
  },
];

type ExperienceEntry = {
  year: string;
  company: string;
  role: string;
  location?: string;
  desc?: string;
  bullets?: string[];
};

const EXPERIENCE: ExperienceEntry[] = [
  {
    year: "Feb 2024 – Feb 2026",
    company: "LayerZeroX Tech Labs Pvt. Ltd.",
    role: "Software Engineer (Backend)",
    location: "India",
    bullets: [
      "Built and scaled backend services using Node.js, Express.js, and MongoDB, supporting Studio, Marketplace, and TV platforms with 5K+ daily users.",
      "Designed and deployed REST and GraphQL APIs, improving system reliability and uptime using Nginx, Caddy, and PM2.",
      "Developed blockchain indexing services for NFT metadata and channel contracts, processing 10K+ on-chain events/day for analytics and search dashboards.",
      "Implemented data migration pipelines (Web2 → Web3) with retry and failure handling, achieving 99%+ migration success rate.",
      "Improved API performance by 30% through query optimization and caching strategies using Redis.",
      "Built and maintained background job systems (cron + BullMQ) for real-time and batch processing.",
      "Contributed to microservices architecture, collaborating across identity, payments, storage, and webhook services.",
      "Developed API documentation using Swagger and ensured reliability through unit and integration testing (Mocha, Chai).",
    ],
  },
];

const SKILLS = [
  { name: "Java", level: 75 },
  { name: "Data Structures", level: 50 },
  { name: "Algorithms", level: 50 },
  { name: "Operating Systems", level: 50 },
  { name: "Computer Networks", level: 50 },
  { name: "Database Management Systems", level: 50 },
  { name: "Node.js", level: 90 },
  { name: "Express.js", level: 88 },
  { name: "REST / OpenAPI", level: 88 },
  { name: "MongoDB", level: 85 },
  { name: "Redis", level: 85 },
  { name: "Kafka", level: 78 },
  { name: "Docker", level: 82 },
  { name: "GraphQL", level: 80 },
  { name: "JavaScript", level: 80 },
];

// --- Components ---

const Navbar = () => {
  const lenisApi = useLenisApi();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12",
        isScrolled ? "py-4 backdrop-blur-nav bg-bg/80 border-b border-border" : "py-8"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => handleInPageNav(e, "#home", lenisApi)}
          className="text-xl font-bold tracking-tighter hover:text-accent transition-colors"
        >
          Naveen Yanamala
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleInPageNav(e, link.href, lenisApi)}
              className="relative group text-sm font-medium text-muted hover:text-ink transition-colors"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={CV_HREF}
            download={CV_DOWNLOAD_FILENAME}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-2 text-xs font-semibold text-ink transition-colors hover:border-accent/50 hover:text-accent sm:gap-2 sm:px-4 sm:text-sm"
          >
            <Download className="size-3.5 shrink-0 sm:size-4" aria-hidden />
            CV
          </a>
          <motion.a
            href="#contact"
            onClick={(e) => handleInPageNav(e, "#contact", lenisApi)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 sm:px-6 bg-ink text-bg text-xs font-bold rounded-full hover:bg-bg hover:text-ink border border-ink transition-all sm:text-sm"
          >
            Contact Me
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
};

const TerminalUI = () => {
  const [text, setText] = useState("");
  const fullText = "> Building scalable APIs...\n> Node.js | Redis | Microservices\n> Deploying to AWS...";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="terminal-window w-full max-w-md mx-auto">
      <div className="terminal-header">
        <div className="terminal-dot bg-[#FF5F56]" />
        <div className="terminal-dot bg-[#FFBD2E]" />
        <div className="terminal-dot bg-[#27C93F]" />
        <span className="ml-2 text-[10px] text-muted font-mono uppercase tracking-widest">bash — 80×24</span>
      </div>
      <div className="terminal-body">
        <pre className="whitespace-pre-wrap text-accent font-mono">
          {text}
          <span className="animate-pulse">_</span>
        </pre>
      </div>
    </div>
  );
};

/** Same scale as “I build” so the rotating words match the headline. */
const HERO_BUILD_LINE =
  "text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tighter leading-[1.08]";

const HERO_ROTATE_WORDS = ["Products", "APIs", "Scalable Systems", "Microservices", "Automation"] as const;

const Hero = () => {
  const words = HERO_ROTATE_WORDS;
  const textRef = useRef<HTMLDivElement>(null);
  const [linePx, setLinePx] = useState<number | null>(null);

  useLayoutEffect(() => {
    const root = textRef.current;
    if (!root?.firstElementChild) return;

    const measure = () => {
      const h = (root.firstElementChild as HTMLElement).getBoundingClientRect().height;
      setLinePx(Math.max(1, Math.round(h)));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const root = textRef.current;
    if (!root || linePx == null) return;

    const totalItems = words.length + 1;
    gsap.set(root, { y: 0, force3D: true });

    const tl = gsap.timeline({ repeat: -1 });
    for (let i = 1; i < totalItems; i++) {
      tl.to(root, {
        y: -linePx * i,
        duration: 1,
        ease: "power2.inOut",
        delay: 2.2,
        force3D: true,
      });
    }
    tl.set(root, { y: 0 });

    return () => {
      tl.kill();
    };
  }, [linePx, words.length]);

  const lenisApi = useLenisApi();

  return (
    <section
      id="home"
      className={cn(
        "min-h-[100svh] flex flex-col justify-start pt-20 md:pt-24 pb-12 md:pb-16 px-6 md:px-12 lg:pt-24 lg:pb-20",
        SECTION_ANCHOR
      )}
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-start lg:justify-center min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start lg:items-center w-full min-h-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex min-w-0 max-w-full flex-col justify-center overflow-x-visible lg:pr-4"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tighter leading-[1.08] mb-4 md:mb-5">
            Hi, I'm Naveen.
          </h1>
          <div className="mb-5 md:mb-6 flex w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-4">
            <span className={cn("text-muted shrink-0", HERO_BUILD_LINE)}>I build</span>
            <span
              className={cn(
                HERO_BUILD_LINE,
                "text-accent relative inline-block max-w-full overflow-hidden align-middle [clip-path:inset(2px_0_2px_0)] w-max",
                linePx == null ? "min-h-[1.08em]" : ""
              )}
              style={linePx != null ? { height: linePx } : undefined}
            >
              <div
                ref={textRef}
                className="flex w-max flex-col will-change-transform [backface-visibility:hidden]"
              >
                {words.map((word, i) => (
                  <span
                    key={i}
                    className="flex shrink-0 items-center whitespace-nowrap text-accent leading-none"
                    style={linePx != null ? { height: linePx, minHeight: linePx } : { minHeight: "1.08em" }}
                  >
                    {word}
                  </span>
                ))}
                <span
                  className="flex shrink-0 items-center whitespace-nowrap text-accent leading-none"
                  style={linePx != null ? { height: linePx, minHeight: linePx } : { minHeight: "1.08em" }}
                >
                  {words[0]}
                </span>
              </div>
            </span>
          </div>
          <p className="text-base md:text-lg text-muted mb-6 md:mb-7 max-w-lg leading-relaxed">
            A Backend Engineer with 2 years of experience specializing in architecting high-performance, 
            distributed systems and robust APIs that scale with your business needs.
          </p>
          <div className="flex flex-wrap gap-3 md:gap-4">
            <motion.a
              href="#projects"
              onClick={(e) => handleInPageNav(e, "#projects", lenisApi)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-ink font-bold rounded-full hover:bg-accent-hover transition-colors"
            >
              See My Work
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="#contact"
              onClick={(e) => handleInPageNav(e, "#contact", lenisApi)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-surface border border-border text-ink font-bold rounded-full hover:border-accent/50 transition-colors"
            >
              Get in Touch
            </motion.a>
            <motion.a
              href={CV_HREF}
              download={CV_DOWNLOAD_FILENAME}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-surface border border-border text-ink font-bold rounded-full hover:border-accent/50 transition-colors"
            >
              <Download className="size-5 shrink-0" aria-hidden />
              Download CV
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center lg:justify-end min-w-0 w-full shrink-0"
        >
          <TerminalUI />
        </motion.div>
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  return (
    <section className={cn(SECTION_PAD, "bg-surface")}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center group"
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-2 group-hover:text-accent transition-colors">
              <Counter value={stat.value} />
              {stat.suffix}
            </h3>
            <p className="text-xs text-muted uppercase tracking-widest font-mono">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Counter = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const state = { n: 0 };
    el.textContent = "0";

    const tween = gsap.to(state, {
      n: value,
      duration: 2.4,
      ease: "power3.out",
      paused: true,
      onUpdate: () => {
        el.textContent = String(Math.round(state.n));
      },
    });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => tween.play(),
    });

    return () => {
      trigger.kill();
      tween.kill();
    };
  }, [value]);

  return <span ref={ref}>0</span>;
};

const TechStack = () => {
  return (
    <section className={SECTION_PAD}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-4xl md:text-7xl font-bold tracking-tighter mb-4"
          >
            Tech Stack
          </motion.h2>
          <p className="text-muted max-w-2xl mx-auto">
            My core technical arsenal for building robust backend systems.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
          {TECH_STACK.map((tech, i) => (
            <motion.div 
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.05 }}
              className="tech-card flex flex-col items-center gap-4 p-6 bg-surface border border-border rounded-2xl hover:border-accent/50 transition-all group"
            >
              <div className="p-3 bg-bg rounded-xl group-hover:scale-110 transition-transform">
                {tech.icon}
              </div>
              <span className="text-xs font-mono text-muted uppercase tracking-widest">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projects" className={cn(PROJECTS_SECTION_PAD, SECTION_ANCHOR)}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-4xl md:text-7xl font-bold tracking-tighter mb-4"
          >
            Projects
          </motion.h2>
          <p className="text-muted max-w-2xl">
            A selection of my recent backend architecture and distributed systems work.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Large Featured Project */}
          <div className="lg:col-span-7 min-h-0">
            <ProjectCard project={PROJECTS[0]} large className="h-full" />
          </div>
          
          {/* Smaller Projects */}
          <div className="lg:col-span-5 grid grid-rows-2 gap-6 lg:gap-8 min-h-0">
            <ProjectCard project={PROJECTS[1]} className="h-full" />
            <ProjectCard project={PROJECTS[2]} className="h-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, large, className }: { project: typeof PROJECTS[0]; large?: boolean; className?: string }) => {
  const lenisApi = useLenisApi();
  const isExternal = /^https?:\/\//i.test(project.href);

  const cardInner = (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-surface border border-border transition-all duration-500 group-hover:border-accent/50 h-full min-h-0 block",
        large ? "min-h-[min(500px,55vh)] lg:min-h-[500px]" : "min-h-[200px]"
      )}
    >
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 size-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
      />
      {/* Readability: dark strip at top for tags; stronger lift at bottom for title + description */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-28 bg-gradient-to-b from-black/85 via-black/35 to-transparent sm:h-32"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-bg from-[18%] via-bg/85 via-[42%] to-transparent to-[58%]"
        aria-hidden
      />

      {isExternal && (
        <span
          className="absolute right-4 top-4 z-[3] flex size-10 items-center justify-center rounded-full border border-border bg-bg/95 text-accent shadow-lg backdrop-blur-sm transition-opacity sm:right-5 sm:top-5"
          aria-hidden
        >
          <ExternalLink className="size-[18px] shrink-0 drop-shadow-sm" strokeWidth={2.25} />
        </span>
      )}

      <div
        className={cn(
          "absolute left-0 right-0 top-0 z-[2] flex flex-wrap gap-2 px-5 pb-2 pt-5 sm:px-6 sm:pt-6",
          isExternal && "pr-14 sm:pr-16"
        )}
      >
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-bg/90 text-[10px] font-mono text-ink/95 backdrop-blur-sm rounded-full border border-border/80 shadow-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        className={cn(
          "absolute bottom-0 left-0 z-[2] w-full px-5 pb-6 pt-10 sm:px-8 sm:pb-8 sm:pt-14",
          large && "max-w-[min(100%,26rem)] md:max-w-[min(100%,28rem)] lg:max-w-[min(100%,32rem)]"
        )}
      >
        <h3 className={cn("font-bold text-ink drop-shadow-sm mb-2", large ? "text-3xl" : "text-xl")}>
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-ink/85 line-clamp-2 [text-shadow:0_1px_12px_rgba(0,0,0,0.75)] sm:line-clamp-3">
          {project.description}
        </p>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className={cn("group", className)}
    >
      {isExternal ? (
        <motion.a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="block h-full min-h-0 overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          {cardInner}
        </motion.a>
      ) : (
        <motion.a
          href={project.href}
          onClick={(e) => handleInPageNav(e, project.href, lenisApi)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="block h-full min-h-0 overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          {cardInner}
        </motion.a>
      )}
    </motion.div>
  );
};

const SoftSkills = () => {
  return (
    <section className={cn(SOFT_SKILLS_SECTION_PAD, "bg-surface")}>
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-7xl font-bold tracking-tighter mb-10 text-center"
        >
          Why Work With Me
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {SOFT_SKILLS.map((skill, i) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: i * 0.06,
                duration: 0.55,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{
                y: -4,
                transition: { type: "spring", stiffness: 320, damping: 28, mass: 0.8 },
              }}
              className="p-8 bg-bg border border-border rounded-2xl shadow-none hover:shadow-lg hover:shadow-accent/5 transition-[box-shadow,border-color] duration-500 ease-out hover:border-accent/25"
            >
              <div className="mb-6 p-3 bg-accent/10 w-fit rounded-xl">
                {skill.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{skill.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{skill.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  return (
    <section id="experience" className={cn(SECTION_PAD, SECTION_ANCHOR)}>
      <div className="mx-auto max-w-3xl px-0">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12 text-center md:mb-14"
        >
          <h2 className="text-4xl font-bold tracking-tighter md:text-6xl">Experience</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted md:text-base">
            Roles and impact — concise, recent-first.
          </p>
        </motion.div>

        <ul className="flex list-none flex-col gap-10 md:gap-12">
          {EXPERIENCE.map((exp) => (
            <li key={`${exp.company}-${exp.year}`}>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-32px" }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden rounded-2xl border border-border bg-surface/80 shadow-sm"
              >
                <div className="flex border-b border-border">
                  <div className="w-1 shrink-0 bg-accent" aria-hidden />
                  <header className="flex min-w-0 flex-1 flex-col gap-4 px-5 py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:px-6 sm:py-6">
                    <div className="min-w-0 space-y-1">
                      <h3 className="text-lg font-bold leading-snug tracking-tight text-ink sm:text-xl">
                        {exp.company}
                      </h3>
                      <p className="text-sm text-muted sm:text-[15px]">
                        <span className="font-medium text-ink/90">{exp.role}</span>
                        {exp.location ? (
                          <>
                            <span className="mx-2 text-border">|</span>
                            <span>{exp.location}</span>
                          </>
                        ) : null}
                      </p>
                    </div>
                    <p className="shrink-0 font-mono text-[11px] uppercase tracking-widest text-accent sm:text-xs">
                      {exp.year}
                    </p>
                  </header>
                </div>

                <div className="px-5 py-5 sm:px-6 sm:py-6">
                  {exp.bullets && exp.bullets.length > 0 ? (
                    <ul className="space-y-3.5">
                      {exp.bullets.map((item, bi) => (
                        <li
                          key={bi}
                          className="flex gap-3 text-sm leading-relaxed text-muted sm:text-[15px] sm:leading-relaxed"
                        >
                          <span
                            className="mt-[0.45em] h-px w-4 shrink-0 bg-accent/70"
                            aria-hidden
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm leading-relaxed text-muted sm:text-base">{exp.desc}</p>
                  )}
                </div>
              </motion.article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const Skills = () => {
  return (
    <section id="skills" className={cn(SECTION_PAD, SECTION_ANCHOR, "bg-surface")}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-4xl md:text-7xl font-bold tracking-tighter mb-4"
          >
            Skills
          </motion.h2>
          <p className="text-muted">
            Proficiency levels in my core technical competencies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {SKILLS.map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium md:text-lg">{skill.name}</span>
                <span className="text-muted text-xs font-mono">{skill.level}%</span>
              </div>
              <div className="skill-bar-bg">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: skill.level / 100 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="skill-bar-fill"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorDetail, setErrorDetail] = useState("");

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  function clearFeedback() {
    if (status === "success" || status === "error") {
      setStatus("idle");
      setErrorDetail("");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorDetail("");

    if (!accessKey?.trim()) {
      setStatus("error");
      setErrorDetail(
        "Add VITE_WEB3FORMS_ACCESS_KEY to a .env file (see .env.example). Get a free key at web3forms.com."
      );
      return;
    }

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setErrorDetail("Please fill in name, email, and message.");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey.trim(),
          subject: `Portfolio: ${name.trim()}`,
          from_name: name.trim(),
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const data = (await res.json()) as { success?: boolean; message?: string };

      if (data.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setErrorDetail(data.message || "Could not send. Try again or use the email link below.");
      }
    } catch {
      setStatus("error");
      setErrorDetail("Network error. Try again or use the email link below.");
    }
  }

  return (
    <section id="contact" className={cn(SECTION_PAD, SECTION_ANCHOR, "bg-surface/30")}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 leading-none">
              Contact <br />
              <span className="text-accent">ME</span>
            </h2>
            <p className="text-muted text-xl max-w-md leading-relaxed">
              Have a project in mind? Let's build something amazing together. 
              Reach out via the form or through my social channels.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-surface border border-border rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-accent/5"
          >
            <form className="space-y-8" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label
                    htmlFor="contact-name"
                    className="text-[10px] font-mono uppercase tracking-widest text-muted ml-1"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(ev) => {
                      clearFeedback();
                      setName(ev.target.value);
                    }}
                    className="w-full bg-bg border border-border rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-all duration-300 placeholder:text-muted/30"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-3">
                  <label
                    htmlFor="contact-email"
                    className="text-[10px] font-mono uppercase tracking-widest text-muted ml-1"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(ev) => {
                      clearFeedback();
                      setEmail(ev.target.value);
                    }}
                    className="w-full bg-bg border border-border rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-all duration-300 placeholder:text-muted/30"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label
                  htmlFor="contact-message"
                  className="text-[10px] font-mono uppercase tracking-widest text-muted ml-1"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  value={message}
                  onChange={(ev) => {
                    clearFeedback();
                    setMessage(ev.target.value);
                  }}
                  className="w-full bg-bg border border-border rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-all duration-300 placeholder:text-muted/30 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {status === "success" && (
                <p className="text-sm font-medium text-accent" role="status">
                  Message sent. I’ll get back to you soon.
                </p>
              )}
              {status === "error" && errorDetail && (
                <p className="text-sm text-red-400/90" role="alert">
                  {errorDetail}
                </p>
              )}

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={status === "sending" ? undefined : { scale: 1.02 }}
                whileTap={status === "sending" ? undefined : { scale: 0.98 }}
                className="w-full py-5 bg-accent text-ink font-bold rounded-2xl hover:bg-accent-hover transition-all duration-300 shadow-lg shadow-accent/25 flex items-center justify-center gap-3 text-lg disabled:opacity-60 disabled:pointer-events-none"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="size-5 animate-spin" aria-hidden />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={20} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Social Links Below */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 pt-16 border-t border-border"
        >
          <a href="mailto:navinyanamalla@gmail.com" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-ink transition-all">
              <Mail size={20} />
            </div>
            <span className="font-bold hidden md:block">Email</span>
          </a>
          <a href="https://github.com/Naveenyanamala" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-ink transition-all">
              <Github size={20} />
            </div>
            <span className="font-bold hidden md:block">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/naveen-yanamala/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-ink transition-all">
              <Linkedin size={20} />
            </div>
            <span className="font-bold hidden md:block">LinkedIn</span>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-ink transition-all">
              <Instagram size={20} />
            </div>
            <span className="font-bold hidden md:block">Instagram</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const BackToTop = () => {
  const lenisApi = useLenisApi();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    if (lenisApi) {
      lenisApi.scrollToTop();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-4 bg-accent text-ink rounded-full shadow-2xl hover:bg-accent-hover transition-colors"
        >
          <ChevronRight className="-rotate-90" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Footer = () => {
  const lenisApi = useLenisApi();

  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-muted text-sm font-mono">
        <p>© 2026 Naveen. Built with precision.</p>
        <div className="flex gap-8">
          <a
            href="#"
            onClick={(e) => handleInPageNav(e, "#", lenisApi)}
            className="hover:text-ink transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            onClick={(e) => handleInPageNav(e, "#", lenisApi)}
            className="hover:text-ink transition-colors"
          >
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisReady, setLenisReady] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;
    setLenisReady(true);

    const onLenisScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onLenisScroll);

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      lenis.off("scroll", onLenisScroll);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      setLenisReady(false);
    };
  }, []);

  const lenisApi = useMemo((): LenisApi | null => {
    const lenis = lenisRef.current;
    if (!lenis) return null;
    return {
      scrollToHash(hash: string) {
        const el = document.querySelector(hash);
        if (!el) return;
        lenis.scrollTo(el as HTMLElement, {
          offset: LENIS_NAV_OFFSET,
          duration: 1.2,
        });
      },
      scrollToTop() {
        lenis.scrollTo(0, { duration: 1.2 });
      },
    };
  }, [lenisReady]);

  return (
    <LenisContext.Provider value={lenisApi}>
      <div className="relative">
        <Navbar />
        <Hero />
        <Stats />
        <TechStack />
        <Projects />
        <SoftSkills />
        <Experience />
        <Skills />
        <Contact />
        <BackToTop />
        <Footer />
      </div>
    </LenisContext.Provider>
  );
}
