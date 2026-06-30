'use client';

import React, { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language: string;
  filename: string;
}

export default function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code', err);
    }
  };

  return (
    <div className="space-y-stack-md">
      <div className="flex items-center justify-between border-b border-outline-variant/30 pb-2">
        <span className="font-label-caps text-[10px] text-secondary tracking-widest uppercase">
          {language} / {filename}
        </span>
        <button
          onClick={handleCopy}
          className="font-label-caps text-[10px] text-secondary hover:text-primary transition-colors cursor-pointer border border-outline-variant/30 px-2 py-0.5"
        >
          {copied ? 'COPIED' : 'COPY'}
        </button>
      </div>
      <div className="relative group">
        <pre className="code-block p-stack-md overflow-x-auto text-[13px] leading-relaxed text-primary-fixed-dim">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
