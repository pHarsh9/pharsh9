'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ScrollReveal from '@/components/ScrollReveal';
import ContactDrawer from '@/components/ContactDrawer';

import { API_BASE_URL } from '@/config';

interface Project {
  slug: string;
  title: string;
  category: string;
  categoryLabel: string;
  description: string;
  image: string;
  aspectRatio: string;
  cols: string;
}

const PROJECTS_DATA: Project[] = [
  {
    slug: 'collaborative-workspace',
    title: 'Collaborative Workspace',
    category: 'Inference Engines',
    categoryLabel: 'WEB APPLICATION',
    description: 'Real-time collaborative workspace client supporting concurrent document syncing.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQg6at-ASt0WJMUFpORBW3bdXrSJilihgcBsLYYkZWmah7HuHP-ypLlYYMuiMa2Jhx8EB_kNYFkhIjxT0Gl0naRt6pK0SSszfZz8N2OKzSi21SMBtP0JTyoZaui31_MK7ZA17TJpl2MKny7SPFfOnGsLWN1gO-TcDgqeoVztaMKm6BuhGHyZWeH5sPxuvM5QfXWeNICcGm0pPvpOwIqWWnoEqlBz5EbulUs9SNcJDxcq_5uVdd-GNjg0zTeM0kW5vhRaxT6Fn2BMc',
    aspectRatio: 'aspect-video',
    cols: 'md:col-span-8',
  },
  {
    slug: 'native-commerce',
    title: 'Native Commerce',
    category: 'Distributed Systems',
    categoryLabel: 'MOBILE APPLICATION',
    description: 'High-fidelity cross-platform e-commerce app optimized for native iOS & Android rendering.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGrs6GTkhUkxGHKpROslnX89mmXb_llS0Rp1PFznf4kSWhWd8ayl2gfjryiLyo6cCBEPWJ2xFuxLzIoer-Z6CLVfbcenL1dLwis6RHutW0TBX97U6Le-Vrn2afrYMO1EXum5jLse0cr3juWnYo8OkaaQ7f33tW8c3NnMBXSuDbjsPsx8zqW5atqjZ9DvUKcsadHiJgq2uqFS9A39746H23wZ3qAvia3H64FL5uWFspvNPO5iU8YtV_JNv3ogXxfHb5egMSP-YQAcE',
    aspectRatio: 'aspect-[4/5]',
    cols: 'md:col-span-4',
  },
  {
    slug: 'serverless-analytics',
    title: 'Serverless Analytics',
    category: 'Core Kernels',
    categoryLabel: 'BACKEND SYSTEM',
    description: 'Event-driven telemetry processing engine handling billions of serverless events at minimal runtime scale.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNf8Vhi_qKABODyzFkmgZfoeizCEIjlgbqxSYhML4gzFkGO0qldlTY7A_hg0s-d7r6_wNFwWfRd2FjBWe1NCNjOWmFAkcAUpJb-xVymffCy3rSUUIUVF_Aqhxb5jWsaarL1cdizFVi3ZLkA6j8ZLZVXbMX3N1UpT5XAUcTUDgYuV857hVIyZ8IFq7sTajyrFbZ2tGUIeSrpOY7_2fxmuwt88-B8wkrwQCASpJCqyKpvqOfXC5vxQyMkUhmpVBHyUlIad42JiiX7o8',
    aspectRatio: 'aspect-video md:aspect-[21/9]',
    cols: 'md:col-span-12',
  },
];

interface Job {
  company: string;
  role: string;
  period: string;
  description: string;
  bulletPoints: string[];
}

const JOBS_DATA: Job[] = [
  {
    company: 'Monolith Labs',
    role: 'Lead Full Stack Architect',
    period: '2024 — PRESENT',
    description: 'Directing development of high-concurrency client products, serverless microservice meshes, and cross-platform native portals.',
    bulletPoints: [
      'Architected real-time WebSocket state management using React and Next.js, cutting network transit latency by 35%.',
      'Designed native iOS and Android modules in React Native (Expo) supporting custom offline-first synchronization.',
      'Supervised transition of GraphQL API backends to edge runtime middleware, reducing TTFB by 40% globally.'
    ]
  },
  {
    company: 'Core Backplane',
    role: 'Senior Software Engineer',
    period: '2021 — 2024',
    description: 'Developed scalable API backends and interactive single-page dashboards utilizing modern React ecosystems.',
    bulletPoints: [
      'Co-authored concurrent database adapters in Go and Node.js to stream telemetry data at 200k items/second.',
      'Refactored legacy web applications to Next.js server components, optimizing page weight and rendering speeds.',
      'Designed reusable custom CSS UI component libraries with strict accessibility and localization protocols.'
    ]
  },
  {
    company: 'Mesh Protocol',
    role: 'Full Stack Web Developer',
    period: '2019 — 2021',
    description: 'Built interactive dashboard interfaces and RESTful server microservices.',
    bulletPoints: [
      'Developed pixel-perfect, responsive client components matching designer blueprints with Tailwind CSS.',
      'Implemented automated integration test suites for client and server runtime pathways using Jest and Playwright.',
      'Optimized asset loading bundles, cutting web app cold load speeds from 3.5s to under 1.2s.'
    ]
  }
];

const SKILLS_DATA = {
  LANGUAGES: ['TYPESCRIPT', 'JAVASCRIPT', 'GO', 'SWIFT', 'KOTLIN', 'PYTHON', 'SQL', 'HTML / CSS'],
  FRAMEWORKS: ['REACT', 'NEXT.JS', 'REACT NATIVE (EXPO)', 'NODE.JS', 'EXPRESS', 'TAILWIND CSS', 'GRAPHQL'],
  INFRASTRUCTURE: ['POSTGRESQL', 'REDIS', 'AMAZON WEB SERVICES (AWS)', 'VERCEL', 'DOCKER', 'WEBSOCKETS', 'APIS']
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [activeSkillsTab, setActiveSkillsTab] = useState<keyof typeof SKILLS_DATA>('LANGUAGES');
  const [expandedJob, setExpandedJob] = useState<number | null>(0);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const [projects, setProjects] = useState<Project[]>(PROJECTS_DATA);
  const [experiences, setExperiences] = useState<Job[]>(JOBS_DATA);
  const [skills, setSkills] = useState<typeof SKILLS_DATA>(SKILLS_DATA);
  const [profile, setProfile] = useState<any>({
    monogram: "pHarsh9",
    fullName: "Harsh Sharma",
    heroSlogan: "FULL STACK WEB DEVELOPER & MOBILE APPLICATION ENGINEER CONSTRUCTING SCALABLE DIGITAL ARCHITECTURES.",
    bioTitle: "HARSH SHARMA (PHARSH9)",
    bioDescription: "A full stack web developer and mobile application engineer with a passion for designing scalable, high-concurrency software and high-fidelity native layouts.",
    field: "FULL STACK, MOBILE",
    focus: "SYSTEM ARCHITECTURE",
    location: "INDIA [GMT +5:30]",
    availability: "OPEN FOR CONTRACTS",
    socialLinks: [
      { platform: "LinkedIn", url: "#" },
      { platform: "Instagram", url: "#" }
    ],
    copyrightText: "© 2026 PHARSH9 SYSTEMS. ALL RIGHTS RESERVED."
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch profile
        const profRes = await fetch(`${API_BASE_URL}/portfolio/profile`);
        if (profRes.ok) {
          const resJson = await profRes.json();
          if (resJson.isOk && resJson.data) {
            setProfile(resJson.data);
          }
        }

        // Fetch projects
        const projRes = await fetch(`${API_BASE_URL}/portfolio/projects`);
        if (projRes.ok) {
          const resJson = await projRes.json();
          if (resJson.isOk && resJson.data.length > 0) {
            // Map mongoose schema fields to frontend fields
            const mapped = resJson.data.map((p: any, idx: number) => ({
              slug: p.slug,
              title: p.title,
              category: p.category,
              categoryLabel: p.category.toUpperCase(),
              description: p.summary,
              image: p.diagramImage || PROJECTS_DATA[idx % PROJECTS_DATA.length].image,
              aspectRatio: (idx % 3) === 1 ? 'aspect-[4/5]' : (idx % 3) === 2 ? 'aspect-video md:aspect-[21/9]' : 'aspect-video',
              cols: (idx % 3) === 1 ? 'md:col-span-4' : (idx % 3) === 2 ? 'md:col-span-12' : 'md:col-span-8',
            }));
            setProjects(mapped);
          }
        }

        // Fetch experiences
        const expRes = await fetch(`${API_BASE_URL}/portfolio/experiences`);
        if (expRes.ok) {
          const resJson = await expRes.json();
          if (resJson.isOk && resJson.data.length > 0) {
            setExperiences(resJson.data);
          }
        }

        // Fetch skills
        const skillRes = await fetch(`${API_BASE_URL}/portfolio/skills`);
        if (skillRes.ok) {
          const resJson = await skillRes.json();
          if (resJson.isOk && resJson.data.length > 0) {
            const mappedSkills: any = {};
            resJson.data.forEach((s: any) => {
              mappedSkills[s.category.toUpperCase()] = s.skills.map((str: string) => str.toUpperCase());
            });
            if (Object.keys(mappedSkills).length > 0) {
              setSkills(mappedSkills);
            }
          }
        }
      } catch (err) {
        console.error("Error loading dynamic data:", err);
      } finally {
        // Add a slight intentional delay for telemetry reconciliation visual experience
        setTimeout(() => {
          setIsLoading(false);
        }, 1200);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background z-[100] flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-[1px] bg-primary animate-pulse"></div>
        <div className="font-label-caps text-[10px] tracking-[0.25em] text-secondary animate-pulse uppercase">
          RECONCILING TELEMETRY SYSTEMS...
        </div>
      </div>
    );
  }

  // Map filters to fit Full Stack project categories
  const filteredProjects = activeCategory === 'ALL'
    ? projects
    : projects.filter(p => {
        if (activeCategory === 'INFERENCE ENGINES') return p.categoryLabel === 'WEB APPLICATION';
        if (activeCategory === 'DISTRIBUTED SYSTEMS') return p.categoryLabel === 'MOBILE APPLICATION';
        if (activeCategory === 'CORE KERNELS') return p.categoryLabel === 'BACKEND SYSTEM';
        return false;
      });

  const categories = ['ALL', 'WEB APPLICATION', 'MOBILE APPLICATION', 'BACKEND SYSTEM'];

  return (
    <>
      <Navbar />

      <main className="pt-24 flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="px-container-margin py-stack-xl flex flex-col items-start min-h-[618px] justify-center">
          <ScrollReveal>
            <h1 className="font-display text-5xl md:text-8xl leading-none mb-stack-lg tracking-tight">
              Developing <br />
              <span className="italic font-light text-secondary">High-Fidelity</span> Products
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delayMs={150}>
            <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-2xl mb-stack-xl leading-relaxed">
              {profile.heroSlogan}
            </p>
          </ScrollReveal>

          <ScrollReveal delayMs={300}>
            <div className="flex flex-wrap gap-stack-md">
              <a
                href="#projects"
                className="bg-primary text-background px-stack-lg py-stack-sm font-body font-medium uppercase tracking-widest text-[13px] hover:opacity-85 transition-opacity"
              >
                View Dossier
              </a>
              <button
                onClick={() => setIsContactOpen(true)}
                className="border border-outline text-primary px-stack-lg py-stack-sm font-body font-medium uppercase tracking-widest text-[13px] hover:bg-primary/5 transition-colors cursor-pointer"
              >
                Contact
              </button>
            </div>
          </ScrollReveal>
        </section>

        {/* Editorial Line */}
        <div className="px-container-margin">
          <div className="editorial-line w-full"></div>
        </div>

        {/* Identity / About Biography Section */}
        <section id="about" className="px-container-margin py-stack-xl scroll-mt-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
            <div className="md:col-span-4">
              <ScrollReveal>
                <span className="font-label-caps text-label-caps text-secondary block mb-2">IDENTITY</span>
                <h2 className="font-display text-4xl md:text-5xl font-semibold">About Me</h2>
              </ScrollReveal>
            </div>
            <div className="md:col-span-8 space-y-stack-md">
              <ScrollReveal delayMs={100}>
                <p className="font-display text-2xl md:text-3xl text-primary font-medium leading-snug">
                  {profile.bioTitle}
                </p>
              </ScrollReveal>
              <ScrollReveal delayMs={200}>
                <p className="font-body text-base text-secondary leading-relaxed text-justified">
                  {profile.bioDescription}
                </p>
              </ScrollReveal>
              
              {/* Dynamic specs row (horizontal layout matching the typography system) */}
              <ScrollReveal delayMs={250} className="w-full border-y border-outline-variant/30 py-6 my-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex flex-col">
                    <span className="text-secondary font-label-caps text-[10px] tracking-wider mb-2">FIELD</span>
                    <span className="font-display text-[15px] font-medium text-primary uppercase">{profile.field}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-secondary font-label-caps text-[10px] tracking-wider mb-2">FOCUS</span>
                    <span className="font-display text-[15px] font-medium text-primary uppercase">{profile.focus}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-secondary font-label-caps text-[10px] tracking-wider mb-2">LOCATION</span>
                    <span className="font-display text-[15px] font-medium text-primary uppercase">{profile.location}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-secondary font-label-caps text-[10px] tracking-wider mb-2">AVAILABILITY</span>
                    <span className="font-display text-[15px] font-medium text-primary uppercase">{profile.availability}</span>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delayMs={300} className="pt-2">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); alert("Resume PDF downloaded successfully."); }}
                  className="inline-block bg-primary text-background px-stack-lg py-stack-sm font-body font-semibold uppercase tracking-widest text-[12px] hover:opacity-85 transition-opacity"
                >
                  Download CV / Resume
                </a>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Editorial Line */}
        <div className="px-container-margin">
          <div className="editorial-line w-full"></div>
        </div>

        {/* Featured Projects Section */}
        <section id="projects" className="px-container-margin py-stack-xl scroll-mt-24">
          <ScrollReveal className="mb-stack-lg flex flex-col md:flex-row justify-between items-start md:items-end gap-stack-md">
            <div>
              <span className="font-label-caps text-label-caps text-secondary block mb-2">VOLUME 01 — 2026</span>
              <h2 className="font-display text-4xl md:text-5xl font-semibold">Selected Works</h2>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 pt-2 border-t md:border-t-0 border-outline-variant/30 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    if (cat === 'ALL') {
                      setActiveCategory('ALL');
                    } else if (cat === 'WEB APPLICATION') {
                      setActiveCategory('INFERENCE ENGINES');
                    } else if (cat === 'MOBILE APPLICATION') {
                      setActiveCategory('DISTRIBUTED SYSTEMS');
                    } else if (cat === 'BACKEND SYSTEM') {
                      setActiveCategory('CORE KERNELS');
                    }
                  }}
                  className={`px-3 py-1 font-label-caps text-[11px] uppercase tracking-wider transition-all duration-300 border ${
                    (cat === 'ALL' && activeCategory === 'ALL') ||
                    (cat === 'WEB APPLICATION' && activeCategory === 'INFERENCE ENGINES') ||
                    (cat === 'MOBILE APPLICATION' && activeCategory === 'DISTRIBUTED SYSTEMS') ||
                    (cat === 'BACKEND SYSTEM' && activeCategory === 'CORE KERNELS')
                      ? 'border-primary bg-primary text-background'
                      : 'border-outline-variant/40 hover:border-outline text-secondary hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Asymmetric Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter transition-all duration-500">
            {projects.map((project, index) => {
              const isVisible = filteredProjects.some(p => p.slug === project.slug);
              return (
                <div
                  key={project.slug}
                  className={`${project.cols} transition-all duration-500 ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-20 scale-[0.98] pointer-events-none'
                  } group`}
                >
                  <ScrollReveal delayMs={index * 100}>
                    <Link href={`/projects/${project.slug}`}>
                      <div className={`overflow-hidden mb-stack-sm ${project.aspectRatio} bg-surface relative`}>
                        <Image
                          fill
                          className="object-cover grayscale transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
                          alt={project.title}
                          src={project.image}
                          sizes="(max-w-700px) 100vw, 80vw"
                        />
                        <div className="absolute inset-0 border border-white/5 pointer-events-none"></div>
                      </div>

                      <div className="flex justify-between items-start pt-stack-sm">
                        <div>
                          <span className="font-label-caps text-[10px] text-secondary tracking-widest block mb-1">
                            {project.categoryLabel}
                          </span>
                          <h3 className="font-display text-2xl font-medium tracking-tight text-primary transition-colors group-hover:text-secondary">
                            {project.title}
                          </h3>
                          <p className="font-body text-[15px] text-on-secondary-container mt-1 max-w-xl">
                            {project.description}
                          </p>
                        </div>
                        <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform duration-300">
                          arrow_forward
                        </span>
                      </div>
                    </Link>
                  </ScrollReveal>
                </div>
              );
            })}
          </div>
        </section>

        {/* Career Timeline / Experience Section */}
        <section id="experience" className="px-container-margin py-stack-xl scroll-mt-20 border-t border-outline-variant/30">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
            <div className="md:col-span-4">
              <ScrollReveal>
                <span className="font-label-caps text-label-caps text-secondary block mb-2">HISTORY</span>
                <h2 className="font-display text-4xl md:text-5xl font-semibold">Experience</h2>
              </ScrollReveal>
            </div>
            <div className="md:col-span-8 space-y-stack-md">
              {experiences.map((job, index) => {
                const isExpanded = expandedJob === index;
                return (
                  <ScrollReveal key={job.company} delayMs={index * 100} className="border-b border-outline-variant/20 pb-4">
                    <button
                      onClick={() => setExpandedJob(isExpanded ? null : index)}
                      className="w-full flex justify-between items-center text-left py-4 focus:outline-none cursor-pointer group"
                    >
                      <div>
                        <span className="font-label-caps text-[10px] text-secondary tracking-wider block mb-1">
                          {job.period}
                        </span>
                        <h3 className="font-display text-xl md:text-2xl font-medium text-primary group-hover:text-secondary transition-colors">
                          {job.role} <span className="italic font-light text-secondary">@ {job.company}</span>
                        </h3>
                      </div>
                      <span className={`material-symbols-outlined text-primary transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}>
                        expand_more
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-editorial ${
                        isExpanded ? 'max-h-[350px] opacity-100 mt-2' : 'max-h-0 opacity-0 pointer-events-none'
                      }`}
                    >
                      <div className="border-l border-primary pl-4 py-2 space-y-2">
                        <p className="font-body text-[14px] text-secondary leading-relaxed">
                          {job.description}
                        </p>
                        <ul className="list-disc list-inside font-body text-[13px] text-secondary space-y-1">
                          {job.bulletPoints.map((bullet, idx) => (
                            <li key={idx}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Skill Matrix Section */}
        <section id="skills" className="px-container-margin py-stack-xl scroll-mt-20 border-t border-outline-variant/30">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
            <div className="md:col-span-4">
              <ScrollReveal>
                <span className="font-label-caps text-label-caps text-secondary block mb-2">SPECS</span>
                <h2 className="font-display text-4xl md:text-5xl font-semibold">Skill Matrix</h2>
              </ScrollReveal>
            </div>
            <div className="md:col-span-8 space-y-stack-lg">
              {/* Skill Tabs */}
              <ScrollReveal className="flex flex-wrap gap-2 border-b border-outline-variant/20 pb-4">
                {(Object.keys(SKILLS_DATA) as Array<keyof typeof SKILLS_DATA>).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveSkillsTab(tab)}
                    className={`px-3 py-1 font-label-caps text-[11px] uppercase tracking-wider transition-all duration-300 border ${
                      activeSkillsTab === tab
                        ? 'border-primary bg-primary text-background'
                        : 'border-outline-variant/40 hover:border-outline text-secondary hover:text-primary'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </ScrollReveal>

              {/* Skill Chips */}
              <div className="flex flex-wrap gap-2">
                {SKILLS_DATA[activeSkillsTab].map((skill, index) => (
                  <ScrollReveal
                    key={skill}
                    delayMs={index * 30}
                    className="border border-outline-variant/40 px-3 py-1.5 font-label-caps text-[11px] tracking-widest text-primary hover:border-primary transition-colors duration-300"
                  >
                    {skill}
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Text Marquee Ticker */}
        <div className="w-full bg-surface py-6 overflow-hidden border-y border-outline-variant/30 flex whitespace-nowrap">
          <div className="animate-marquee flex gap-12 text-[12px] font-label-caps text-secondary tracking-[0.25em] uppercase">
            <span>Interfaces felt, not waited for</span>
            <span>•</span>
            <span>Scalable Serverless APIs</span>
            <span>•</span>
            <span>Design Centric Engineering</span>
            <span>•</span>
            <span>Native performance by default</span>
            <span>•</span>
            <span>Clean Architecture</span>
            <span>•</span>
            <span>Interfaces felt, not waited for</span>
            <span>•</span>
            <span>Scalable Serverless APIs</span>
            <span>•</span>
            <span>Design Centric Engineering</span>
            <span>•</span>
            <span>Native performance by default</span>
            <span>•</span>
            <span>Clean Architecture</span>
          </div>
          <style jsx>{`
            .animate-marquee {
              display: inline-flex;
              white-space: nowrap;
              animation: marquee 30s linear infinite;
            }
            @keyframes marquee {
              0% { transform: translate3d(0, 0, 0); }
              100% { transform: translate3d(-50%, 0, 0); }
            }
          `}</style>
        </div>

        {/* Philosophy Section */}
        <section id="philosophy" className="bg-surface py-stack-xl px-container-margin scroll-mt-20">
          <div className="max-w-3xl mx-auto text-center py-8">
            <ScrollReveal>
              <div className="font-label-caps text-label-caps text-secondary mb-stack-md tracking-[0.2em]">MANIFESTO</div>
              <h2 className="font-display text-4xl md:text-5xl italic mb-stack-lg leading-tight text-primary">
                Design is the alignment of form and function.
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delayMs={150}>
              <p className="font-body text-lg md:text-xl text-on-surface-variant leading-relaxed">
                I believe in applications that load instantly and respond seamlessly. My work bridges client UI precision with event-driven backend scalability, crafting layouts that feel natural and servers that scale effortlessly.
              </p>
            </ScrollReveal>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="footer" className="w-full border-t border-outline-variant/30 bg-background py-stack-xl px-container-margin flex flex-col items-center space-y-stack-md text-center">
        <ScrollReveal>
          <div className="font-display text-3xl text-primary tracking-tighter mb-stack-md">{profile.monogram}</div>
          <div className="flex gap-gutter mb-stack-md justify-center">
            {(profile.socialLinks || []).map((link: any) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors"
              >
                {link.platform}
              </a>
            ))}
            <button
              onClick={() => setIsContactOpen(true)}
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>
          <p className="font-label-caps text-[10px] tracking-widest text-on-secondary-fixed-variant uppercase">
            {profile.copyrightText}
          </p>
        </ScrollReveal>
      </footer>

      {/* Page specific Contact Drawer */}
      <ContactDrawer isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
