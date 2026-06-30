'use client';

import React, { useState } from 'react';
import { API_BASE_URL } from '@/config';

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactDrawer({ isOpen, onClose }: ContactDrawerProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: false, email: false, message: false });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: formData.name.trim() === '',
      email: !validateEmail(formData.email),
      message: formData.message.trim() === '',
    };

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.email && !newErrors.message) {
      setIsSending(true);
      try {
        const response = await fetch(`${API_BASE_URL}/portfolio/inquiries`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log("Inquiry transmitted successfully.");
        }
      } catch (err) {
        console.error("Failed to transmit inquiry to server:", err);
      } finally {
        setIsSending(false);
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 3000);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  return (
    <div
      className={`fixed inset-0 z-[70] bg-background transition-transform duration-700 ease-editorial flex flex-col justify-center items-start px-container-margin ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-container-margin right-container-margin p-stack-sm hover:opacity-70 transition-opacity cursor-pointer"
        aria-label="Close contact drawer"
      >
        <span className="material-symbols-outlined text-[32px] text-primary">close</span>
      </button>

      <div className="max-w-md w-full space-y-stack-lg">
        <div>
          <p className="font-label-caps text-label-caps text-secondary mb-2 tracking-[0.2em]">CONTACT</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold uppercase tracking-tight text-primary">
            Direct Inquiry
          </h2>
        </div>

        {submitted ? (
          <div className="border border-primary/20 p-stack-lg bg-surface text-center space-y-stack-md transition-all">
            <span className="material-symbols-outlined text-4xl text-primary animate-pulse">check_circle</span>
            <h3 className="font-display text-2xl text-primary font-medium">INQUIRY RECORDED</h3>
            <p className="font-body text-secondary text-sm">
              Your transmission has been logged. We will establish connection shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-stack-lg">
            {/* Name Input */}
            <div className="space-y-1">
              <label htmlFor="name" className="font-label-caps text-[10px] tracking-widest text-secondary uppercase block">
                Sender Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full bg-transparent border-b ${
                  errors.name ? 'border-red-500' : 'border-outline-variant/40 focus:border-primary'
                } py-2 font-body text-primary text-sm focus:outline-none transition-colors duration-300`}
                placeholder="E.G. JANE SMITH"
              />
              {errors.name && <p className="text-[10px] text-red-500 font-body">Name field is required.</p>}
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label htmlFor="email" className="font-label-caps text-[10px] tracking-widest text-secondary uppercase block">
                Email Address
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full bg-transparent border-b ${
                  errors.email ? 'border-red-500' : 'border-outline-variant/40 focus:border-primary'
                } py-2 font-body text-primary text-sm focus:outline-none transition-colors duration-300`}
                placeholder="E.G. NAME@DOMAIN.COM"
              />
              {errors.email && <p className="text-[10px] text-red-500 font-body">A valid email address is required.</p>}
            </div>

            {/* Message Input */}
            <div className="space-y-1">
              <label htmlFor="message" className="font-label-caps text-[10px] tracking-widest text-secondary uppercase block">
                Transmission Details
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className={`w-full bg-transparent border-b ${
                  errors.message ? 'border-red-500' : 'border-outline-variant/40 focus:border-primary'
                } py-2 font-body text-primary text-sm focus:outline-none transition-colors duration-300 resize-none`}
                placeholder="DESCRIBE THE SCOPE OF INQUIRY..."
              />
              {errors.message && <p className="text-[10px] text-red-500 font-body">Message details are required.</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSending}
              className="w-full bg-primary text-background py-stack-md font-body font-semibold uppercase tracking-widest text-[12px] hover:opacity-85 transition-opacity cursor-pointer mt-4 disabled:opacity-50"
            >
              {isSending ? 'Transmitting Inquiry...' : 'Transmit Inquiry'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
