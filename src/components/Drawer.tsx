'use client';

import React from 'react';
import Link from 'next/link';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick?: () => void;
}

export default function Drawer({ isOpen, onClose, onContactClick }: DrawerProps) {
  return (
    <div
      className={`fixed inset-0 z-[60] bg-background transition-transform duration-700 ease-editorial flex flex-col justify-center items-start px-container-margin ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-container-margin right-container-margin p-stack-sm hover:opacity-70 transition-opacity cursor-pointer"
        aria-label="Close menu"
      >
        <span className="material-symbols-outlined text-[32px] text-primary">close</span>
      </button>

      {/* Menu Links */}
      <div className="space-y-stack-lg max-w-lg w-full">
        <p className="font-label-caps text-label-caps text-secondary mb-stack-md tracking-[0.2em]">00 — INDEX</p>
        <nav className="flex flex-col space-y-unit">
          <Link
            href="/#projects"
            onClick={onClose}
            className="font-display text-5xl md:text-7xl uppercase hover:translate-x-4 transition-transform duration-500 text-on-surface hover:text-primary font-bold block py-2"
          >
            Works
          </Link>
          <Link
            href="/#about"
            onClick={onClose}
            className="font-display text-5xl md:text-7xl uppercase hover:translate-x-4 transition-transform duration-500 text-secondary hover:text-primary block py-2"
          >
            About
          </Link>
          <Link
            href="/#experience"
            onClick={onClose}
            className="font-display text-5xl md:text-7xl uppercase hover:translate-x-4 transition-transform duration-500 text-secondary hover:text-primary block py-2"
          >
            Experience
          </Link>
          <button
            onClick={() => {
              onClose();
              onContactClick?.();
            }}
            className="font-display text-5xl md:text-7xl uppercase hover:translate-x-4 transition-transform duration-500 text-secondary hover:text-primary text-left block py-2 cursor-pointer"
          >
            Contact
          </button>
        </nav>
      </div>
    </div>
  );
}
