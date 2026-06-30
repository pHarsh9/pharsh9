'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import Drawer from './Drawer';
import ContactDrawer from './ContactDrawer';
import { API_BASE_URL } from '@/config';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [monogram, setMonogram] = useState('pHarsh9');

  // Scroll reveal/hide effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const shouldBeVisible = prevScrollPos > currentScrollPos || currentScrollPos < 100;
      
      setVisible(shouldBeVisible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/portfolio/profile`)
      .then(res => res.json())
      .then(resJson => {
        if (resJson.isOk && resJson.data?.monogram) {
          setMonogram(resJson.data.monogram);
        }
      })
      .catch(err => console.error("Error loading navbar monogram:", err));
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-outline-variant/30 flex justify-between items-center px-container-margin py-stack-md transition-transform duration-300 ease-editorial ${
          visible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Brand Logo */}
        <Link href="/" className="font-display text-2xl font-bold tracking-tighter text-primary hover:opacity-75 transition-opacity">
          {monogram}
        </Link>

        {/* Action Controls */}
        <div className="flex items-center gap-stack-lg">
          {/* Light/Dark Toggle */}
          <button
            onClick={toggleTheme}
            className="hover:opacity-70 transition-opacity p-unit flex items-center justify-center cursor-pointer"
            aria-label="Toggle theme"
          >
            <span className="material-symbols-outlined text-primary text-[20px]">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Menu Trigger */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-stack-sm hover:opacity-70 transition-opacity cursor-pointer p-unit"
          >
            <span className="font-label-caps text-label-caps uppercase text-primary">Menu</span>
            <span className="material-symbols-outlined text-primary text-[20px]">menu</span>
          </button>
        </div>
      </nav>

      {/* Drawer Component */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onContactClick={() => setIsContactOpen(true)}
      />

      {/* Contact Drawer */}
      <ContactDrawer isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
