'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ScrollReveal from '@/components/ScrollReveal';
import InteractiveTopology from '@/components/InteractiveTopology';
import CodeBlock from '@/components/CodeBlock';
import { notFound } from 'next/navigation';

interface ProjectDetail {
  slug: string;
  projectNumber: string;
  category: string;
  title: string;
  subtitle: string;
  specs: { label: string; value: string }[];
  summary: string;
  figTitle: string;
  figCaption: string;
  diagramImage: string;
  abstractHeader: string;
  abstractBody: string;
  codeBlock: {
    code: string;
    language: string;
    filename: string;
  };
  metrics: { label: string; value: string; desc: string; isHighlight?: boolean }[];
  bottomImage: string;
  bottomText: string;
  liveLink?: string;
  playstoreLink?: string;
  appstoreLink?: string;
  gitLink?: string;
  apkLink?: string;
}

const DETAILS_DATA: Record<string, ProjectDetail> = {
  'collaborative-workspace': {
    slug: 'collaborative-workspace',
    projectNumber: 'PROJECT 074 — WEB PLATFORMS',
    category: 'Web Application',
    title: 'Collaborative Workspace',
    subtitle: 'Collaborative\nWorkspace',
    specs: [
      { label: 'Sync Latency', value: '< 15ms' },
      { label: 'Throughput', value: '25k active users' },
      { label: 'Stack', value: 'Next.js, WebSockets, Tailwind' },
      { label: 'Topology', value: 'Edge Middleware' }
    ],
    summary: 'A real-time collaborative workspace client designed for conflict-free document replication and sub-20ms state syncing.',
    figTitle: 'FIG 01. STATE SYNCHRONIZATION PATTERNS',
    figCaption: 'Real-time sync canvas detailing peer socket handshakes and delta replication.',
    diagramImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9s0a1b0ZU9-ralYj5sINFF7HFXAy4xtt1Mgr3h_3PDHPBYp7_xjn7t_VDlycFMy2WNFMp2Nt___ayF2h99armLnfbVxidzWWm0I8m1rEMqDtWTmu8XduuhIv16wHfU4avALReFO-Rj1_8mpKVhZMH8nJFRqoOcA_BIGrdgQgNyBW28Z-oksDvyAdc_AUg7-6SeIBcBM3VnSTBliEMFS3OYt88pMqLijEB61DqZLkAKMxfu4zSjKOW4tNDFsG7R9HWyuGJFeM5jAk',
    abstractHeader: 'Eliminating state synchronization conflicts at scale.',
    abstractBody: 'By leveraging Conflict-free Replicated Data Types (CRDTs) and multiplexed WebSocket connections, this real-time client handles massive concurrent document edits. We minimized delta payloads to guarantee instantaneous document rendering across global edge servers.',
    codeBlock: {
      code: `// Process peer document delta changes using Yjs CRDTs
export function applyPeerDelta(doc: Y.Doc, encodedDelta: Uint8Array) {
  try {
    Y.applyUpdate(doc, encodedDelta, 'socket-origin');
    const syncState = Y.encodeStateVector(doc);
    broadcastDeltaVector(syncState);
  } catch (error) {
    console.error('State reconciliation failed:', error);
  }
}`,
      language: 'TYPESCRIPT',
      filename: 'SYNC_ENGINE.TS'
    },
    metrics: [
      { label: 'SYNC DELAY', value: '12ms', desc: 'Real-time delta exchange speeds.' },
      { label: 'USER CAPACITY', value: '50k', desc: 'Concurrent active socket streams.' },
      { label: 'INTEGRATION', value: 'NEXT.JS', desc: 'Edge middleware optimized runtime.' },
      { label: 'STATUS', value: 'PRODUCTION', desc: 'v3.2 stable build active.', isHighlight: true }
    ],
    bottomImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ3Cl_ydzh7YB6vXp_NUhVn4QrGxKVb9jcuBFJjfhXhdaUQYpvkpB0BU6rGcu0pI0W5R6TUK5UiaqB0SsDSPSQNNk-434MAmEU3tjIZBXzbh5L5Aik_lRA4OjftRa6PqTEAEevvnSW-byrQSGkR0ZGYrPvLOUnpOF7_brGz4M9mbV_6QFZgPfCm4FFwo4J7BxD1Lxg2gkDG8zLStMYfhdyDlCS6PYzmA0XLwhpAOgov_XqHt8Li9z1oaT1tn3cdDO53qXVoYChn30',
    bottomText: 'We believe that interfaces, when properly engineered, possess a fluid elegance that makes software feel transparent. Collaborative Workspace is the physical manifestation of that belief.'
  },
  'native-commerce': {
    slug: 'native-commerce',
    projectNumber: 'PROJECT 092 — MOBILE ARCHITECTURE',
    category: 'Mobile Application',
    title: 'Native Commerce',
    subtitle: 'Native\nCommerce',
    specs: [
      { label: 'Rendering Frame', value: '60 FPS' },
      { label: 'Cold Launch', value: '0.8s' },
      { label: 'Stack', value: 'React Native, GraphQL, Swift' },
      { label: 'Topology', value: 'Federated Schema' }
    ],
    summary: 'A high-fidelity cross-platform e-commerce application designed with custom native modules for premium mobile rendering speeds.',
    figTitle: 'FIG 01. MOBILE CACHING SCHEMA',
    figCaption: 'Offline schema detailing SQLite thread pools and image disk caching.',
    diagramImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGrs6GTkhUkxGHKpROslnX89mmXb_llS0Rp1PFznf4kSWhWd8ayl2gfjryiLyo6cCBEPWJ2xFuxLzIoer-Z6CLVfbcenL1dLwis6RHutW0TBX97U6Le-Vrn2afrYMO1EXum5jLse0cr3juWnYo8OkaaQ7f33tW8c3NnMBXSuDbjsPsx8zqW5atqjZ9DvUKcsadHiJgq2uqFS9A39746H23wZ3qAvia3H64FL5uWFspvNPO5iU8YtV_JNv3ogXxfHb5egMSP-YQAcE',
    abstractHeader: 'Optimizing native rendering pathways and offline state.',
    abstractBody: 'Designed with React Native and custom Swift TurboModules, the client achieves fluid native-tier layouts. A local SQLite caching layer provides complete offline access and optimistic UI updates for real-time inventory adjustments.',
    codeBlock: {
      code: `// Fetch native offline database cache values
import { SQLiteDatabase } from 'react-native-sqlite-storage';

export async function queryCachedCatalog(db: SQLiteDatabase, category: string) {
  const query = 'SELECT * FROM products WHERE category = ? LIMIT 100';
  const [results] = await db.executeSql(query, [category]);
  return results.rows.raw();
}`,
      language: 'TYPESCRIPT',
      filename: 'OFFLINE_CACHE.TS'
    },
    metrics: [
      { label: 'RENDER RATE', value: '60 FPS', desc: 'Fluid native layout speeds.' },
      { label: 'COLD START', value: '0.8s', desc: 'Optimized native engine launch.' },
      { label: 'OFFLINE SYNC', value: '100%', desc: 'Conflict-free local data integration.' },
      { label: 'STATUS', value: 'APP STORE', desc: 'v1.8 native build live.', isHighlight: true }
    ],
    bottomImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGrs6GTkhUkxGHKpROslnX89mmXb_llS0Rp1PFznf4kSWhWd8ayl2gfjryiLyo6cCBEPWJ2xFuxLzIoer-Z6CLVfbcenL1dLwis6RHutW0TBX97U6Le-Vrn2afrYMO1EXum5jLse0cr3juWnYo8OkaaQ7f33tW8c3NnMBXSuDbjsPsx8zqW5atqjZ9DvUKcsadHiJgq2uqFS9A39746H23wZ3qAvia3H64FL5uWFspvNPO5iU8YtV_JNv3ogXxfHb5egMSP-YQAcE',
    bottomText: 'Our mobile layouts treat physical hardware limits as variables to be mastered. Smooth animations are not decorative; they form the core language of correct native applications.'
  },
  'serverless-analytics': {
    slug: 'serverless-analytics',
    projectNumber: 'PROJECT 103 — BACKEND SYSTEMS',
    category: 'Backend System',
    title: 'Serverless Analytics',
    subtitle: 'Serverless\nAnalytics',
    specs: [
      { label: 'API Ingestion', value: '< 5ms' },
      { label: 'Peak Capacity', value: '800k events/s' },
      { label: 'Stack', value: 'Go, PostgreSQL, AWS' },
      { label: 'Topology', value: 'Serverless Edge' }
    ],
    summary: 'An event-driven serverless processing engine optimized to ingest millions of real-time telemetry events at minimal execution overhead.',
    figTitle: 'FIG 01. INGESTION PIPELINE PATHWAYS',
    figCaption: 'Edge queue pathway displaying Go telemetry routines and PostgreSQL bulk allocations.',
    diagramImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNf8Vhi_qKABODyzFkmgZfoeizCEIjlgbqxSYhML4gzFkGO0qldlTY7A_hg0s-d7r6_wNFwWfRd2FjBWe1NCNjOWmFAkcAUpJb-xVymffCy3rSUUIUVF_Aqhxb5jWsaarL1cdizFVi3ZLkA6j8ZLZVXbMX3N1UpT5XAUcTUDgYuV857hVIyZ8IFq7sTajyrFbZ2tGUIeSrpOY7_2fxmuwt88-B8wkrwQCASpJCqyKpvqOfXC5vxQyMkUhmpVBHyUlIad42JiiX7o8',
    abstractHeader: 'Massive telemetry ingestion with serverless runtimes.',
    abstractBody: 'An event-driven serverless API layer designed to process high-velocity telemetry streams. Utilizing Go runtime optimizations and bulk database inserts, we bypassed traditional connection pools to keep execution times under five milliseconds.',
    codeBlock: {
      code: `// Bulk inserts event batches concurrently to DB
package pipeline

func IngestEventBatch(db *sql.DB, events []TelemetryEvent) error {
	tx, err := db.Begin()
	if err != nil {
		return err
	}
	stmt, _ := tx.Prepare("INSERT INTO events (id, payload, created_at) VALUES ($1, $2, $3)")
	for _, e := range events {
		_, _ = stmt.Exec(e.ID, e.Payload, e.CreatedAt)
	}
	return tx.Commit()
}`,
      language: 'GO',
      filename: 'TELEMETRY_PIPELINE.GO'
    },
    metrics: [
      { label: 'COLD START', value: '12ms', desc: 'Ultra-low latency serverless boot.' },
      { label: 'INGESTION', value: '1.2M/s', desc: 'Telemetry event capacity threshold.' },
      { label: 'CONCURRENCY', value: '20k', desc: 'Parallel edge invocation loops.' },
      { label: 'STATUS', value: 'DEPLOYED', desc: 'Go native runtime cluster live.', isHighlight: true }
    ],
    bottomImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNf8Vhi_qKABODyzFkmgZfoeizCEIjlgbqxSYhML4gzFkGO0qldlTY7A_hg0s-d7r6_wNFwWfRd2FjBWe1NCNjOWmFAkcAUpJb-xVymffCy3rSUUIUVF_Aqhxb5jWsaarL1cdizFVi3ZLkA6j8ZLZVXbMX3N1UpT5XAUcTUDgYuV857hVIyZ8IFq7sTajyrFbZ2tGUIeSrpOY7_2fxmuwt88-B8wkrwQCASpJCqyKpvqOfXC5vxQyMkUhmpVBHyUlIad42JiiX7o8',
    bottomText: 'True serverless optimization requires removing runtime bottlenecks. We operate at the boundaries of database bandwidth and serverless limits with absolute precision.'
  }
};

import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/config';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = React.use(params);
  const [data, setData] = useState<ProjectDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/portfolio/projects/slug/${resolvedParams.slug}`);
        if (res.ok) {
          const resJson = await res.json();
          if (resJson.isOk && resJson.data) {
            setData(resJson.data);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to load project detail dynamically:", err);
      }
      
      // Fallback
      if (DETAILS_DATA[resolvedParams.slug]) {
        setData(DETAILS_DATA[resolvedParams.slug]);
      }
    };

    fetchDetail().finally(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  }, [resolvedParams.slug]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background z-[100] flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-[1px] bg-primary animate-pulse"></div>
        <div className="font-label-caps text-[10px] tracking-[0.25em] text-secondary animate-pulse uppercase">
          RECONCILING SPECIFICATIONS...
        </div>
      </div>
    );
  }

  if (!data) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="pt-[120px] pb-stack-xl flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="px-container-margin grid grid-cols-1 md:grid-cols-12 gap-gutter items-end mb-stack-xl">
          <div className="md:col-span-8">
            <ScrollReveal>
              <p className="font-label-caps text-label-caps text-secondary mb-stack-sm tracking-[0.15em]">
                {data.projectNumber}
              </p>
              <h1 className="font-display text-[8vw] md:text-[7vw] leading-[0.95] uppercase tracking-tighter mb-stack-md whitespace-pre-line text-primary">
                {data.subtitle}
              </h1>
            </ScrollReveal>
          </div>
          
          <div className="md:col-span-4 pb-stack-sm">
            <ScrollReveal delayMs={150}>
              <p className="font-body text-lg text-secondary leading-relaxed border-l border-outline-variant/40 pl-gutter">
                {data.summary}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Main Visual / Widescreen Dynamic Diagram Banner */}
        <section className="px-container-margin mb-stack-xl">
          <ScrollReveal>
            <div className="relative w-full aspect-[21/9] bg-surface-container border border-outline-variant/30 overflow-hidden select-none">
              {/* Dynamic Diagram Banner */}
              <Image
                fill
                priority
                className="object-cover opacity-60 grayscale transition-all duration-700 hover:opacity-100 hover:scale-[1.01]"
                alt={data.figTitle}
                src={data.diagramImage}
                sizes="100vw"
              />

              {/* Title tag overlay */}
              <div className="absolute bottom-stack-md left-stack-md pointer-events-none select-none z-10">
                <span className="font-label-caps text-label-caps bg-background border border-outline-variant/30 text-primary px-3 py-[4px] tracking-widest text-[10px]">
                  {data.figTitle}
                </span>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Content Grid (Asymmetric        {/* Content Grid (Asymmetric) */}
        <section className="px-container-margin grid grid-cols-1 md:grid-cols-12 gap-stack-xl">
          {/* Left Column: Specs & Abstract */}
          <div className="md:col-span-4 space-y-stack-xl">
            {data.specs && data.specs.length > 0 && (
              <ScrollReveal className="border-t border-outline/50 py-stack-md">
                <h3 className="font-label-caps text-label-caps uppercase mb-stack-md tracking-wider text-primary">
                  01 — Technical Specifications
                </h3>
                <ul className="space-y-stack-sm font-body text-[15px] text-on-surface">
                  {(data.specs || []).map((spec) => (
                    <li key={spec.label} className="flex justify-between border-b border-outline-variant/20 pb-2">
                      <span className="text-secondary">{spec.label}</span>
                      <span className="font-medium text-primary">{spec.value}</span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            )}

            {(data.abstractHeader || data.abstractBody) && (
              <ScrollReveal className="space-y-stack-md">
                {data.abstractHeader && (
                  <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-primary leading-snug">
                    {data.abstractHeader}
                  </h3>
                )}
                {data.abstractBody && (
                  <p className="text-secondary font-body text-[15px] leading-relaxed text-justified">
                    {data.abstractBody}
                  </p>
                )}
              </ScrollReveal>
            )}

            {/* Dynamic Link Action Buttons */}
            {(data.liveLink || data.gitLink || data.playstoreLink || data.appstoreLink || data.apkLink) && (
              <ScrollReveal className="border-t border-outline/50 pt-stack-md space-y-3">
                <h3 className="font-label-caps text-label-caps uppercase mb-stack-sm tracking-wider text-primary">
                  02 — Project Access
                </h3>
                <div className="flex flex-col gap-2 font-body text-[13px]">
                  {data.liveLink && (
                    <a
                      href={data.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between border border-primary text-background bg-primary px-4 py-2.5 uppercase tracking-widest hover:opacity-85 transition-opacity text-center font-medium"
                    >
                      <span>Visit Live Site</span>
                      <span className="material-symbols-outlined text-[16px] text-background">arrow_outward</span>
                    </a>
                  )}
                  {data.gitLink && (
                    <a
                      href={data.gitLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between border border-outline text-primary hover:bg-primary/5 px-4 py-2.5 uppercase tracking-widest transition-colors text-center font-medium"
                    >
                      <span>GitHub Repository</span>
                      <span className="material-symbols-outlined text-[16px] text-primary">code</span>
                    </a>
                  )}
                  {data.playstoreLink && (
                    <a
                      href={data.playstoreLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between border border-outline text-primary hover:bg-primary/5 px-4 py-2.5 uppercase tracking-widest transition-colors text-center font-medium"
                    >
                      <span>Google Play Store</span>
                      <span className="material-symbols-outlined text-[16px] text-primary">play_store</span>
                    </a>
                  )}
                  {data.appstoreLink && (
                    <a
                      href={data.appstoreLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between border border-outline text-primary hover:bg-primary/5 px-4 py-2.5 uppercase tracking-widest transition-colors text-center font-medium"
                    >
                      <span>Apple App Store</span>
                      <span className="material-symbols-outlined text-[16px] text-primary">arrow_outward</span>
                    </a>
                  )}
                  {data.apkLink && (
                    <a
                      href={data.apkLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between border border-primary text-primary hover:bg-primary/5 px-4 py-2.5 uppercase tracking-widest transition-all text-center font-medium"
                    >
                      <span>Download Android APK</span>
                      <span className="material-symbols-outlined text-[16px] text-primary">download</span>
                    </a>
                  )}
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Right Column: System Diagrams & Code */}
          <div className="md:col-span-8 space-y-stack-xl">
            {/* System Diagram Card */}
            {data.diagramImage && (
              <ScrollReveal>
                <div className="bg-surface border border-outline-variant/30 p-stack-lg relative overflow-hidden">
                  <div className="mb-stack-lg border-b border-outline-variant/10 pb-4">
                    <h3 className="font-label-caps text-label-caps uppercase mb-1 tracking-wider text-primary">
                      FIG 02. SYSTEM SCHEMATIC
                    </h3>
                    <p className="text-secondary font-body text-[14px]">{data.figCaption}</p>
                  </div>
                  <div className="w-full aspect-video bg-background flex items-center justify-center border border-outline-variant/20 relative">
                    <Image
                      fill
                      className="object-cover opacity-50 grayscale transition-opacity duration-700 hover:opacity-75"
                      alt={data.figTitle}
                      src={data.diagramImage}
                      sizes="(max-w-700px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-48 h-48 border border-primary/10 rounded-full animate-ping"></div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Code Block */}
            {data.codeBlock && data.codeBlock.code && (
              <ScrollReveal>
                <CodeBlock
                  code={data.codeBlock.code || ""}
                  language={data.codeBlock.language || ""}
                  filename={data.codeBlock.filename || ""}
                />
              </ScrollReveal>
            )}
          </div>
        </section>

        {/* Metric Bento Grid */}
        {data.metrics && data.metrics.length > 0 && (
          <section className="px-container-margin mt-stack-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-unit border-t border-outline/50 pt-stack-xl">
              {(data.metrics || []).map((metric, index) => (
                <ScrollReveal
                  key={metric.label}
                  delayMs={index * 100}
                  className={`p-stack-md border border-outline-variant/30 transition-all duration-300 ${
                    metric.isHighlight
                      ? 'bg-primary text-background'
                      : 'hover:bg-surface text-primary'
                  }`}
                >
                  <p className={`font-label-caps text-[10px] tracking-wider mb-stack-md ${
                    metric.isHighlight ? 'text-background/60' : 'text-secondary'
                  }`}>
                    {metric.label}
                  </p>
                  <h4 className="font-display text-[48px] leading-none mb-2 font-bold tracking-tight">
                    {metric.value}
                  </h4>
                  <p className={`font-body text-[13px] ${
                    metric.isHighlight ? 'text-background/80' : 'text-secondary'
                  }`}>
                    {metric.desc}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Visual Asymmetry */}
        {(data.bottomImage || data.bottomText) && (
          <section className="px-container-margin mt-stack-xl grid grid-cols-1 md:grid-cols-2 gap-stack-xl items-center">
            <ScrollReveal>
              <div className="relative w-full aspect-square border border-outline-variant/30 overflow-hidden bg-surface">
                {data.bottomImage && (
                  <Image
                    fill
                    className="object-cover filter grayscale hover:scale-[1.03] hover:grayscale-0 transition-all duration-1000 opacity-60 hover:opacity-100"
                    alt="System Details Close-up"
                    src={data.bottomImage}
                    sizes="(max-w-700px) 100vw, 40vw"
                  />
                )}
              </div>
            </ScrollReveal>
            
            <ScrollReveal delayMs={150} className="flex flex-col justify-center space-y-stack-md">
              <h2 className="font-display text-3xl md:text-4xl uppercase border-b border-outline/50 pb-stack-md text-primary leading-tight">
                Engineering as Art.
              </h2>
              <p className="text-secondary font-body text-lg leading-relaxed text-justified">
                {data.bottomText}
              </p>
              <div className="pt-stack-md">
                <Link
                  href="/"
                  className="inline-block bg-primary text-background px-stack-lg py-stack-md font-body font-medium uppercase tracking-widest text-[12px] hover:opacity-85 transition-opacity"
                >
                  Return to Index
                </Link>
              </div>
            </ScrollReveal>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full mt-stack-xl border-t border-outline-variant/30 bg-surface py-stack-xl px-container-margin space-y-stack-md text-center">
        <ScrollReveal>
          <div className="font-display text-2xl text-primary font-bold">pHarsh9</div>
          <div className="flex justify-center gap-stack-lg">
            <a href="#" className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors">
              Instagram
            </a>
            <a href="#" className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors">
              LinkedIn
            </a>
            <a href="#" className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors">
              Journal
            </a>
          </div>
          <p className="font-label-caps text-label-caps text-on-surface-variant opacity-60">
            © 2026 LUXE MONOGRAPH. ALL RIGHTS RESERVED.
          </p>
        </ScrollReveal>
      </footer>
    </>
  );
}
