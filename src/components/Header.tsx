/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Phone, Award } from 'lucide-react';
import { HOTEL_CONTACT } from '../data';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
  onOpenSettings: () => void;
}

export default function Header({ activeTab, setActiveTab, onOpenBooking, onOpenSettings }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'rooms', label: 'Rooms & Suites' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'dining', label: 'Dining' },
    { id: 'banquet', label: 'Banquets & Events' },
    { id: 'reviews', label: 'Guest Reviews' },
    { id: 'bookings', label: 'My Bookings' }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    // Smooth scroll to top of page when changing tabs
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-luxury-dark/95 backdrop-blur-md shadow-lg border-b border-luxury-gold/20 py-3'
          : 'bg-gradient-to-b from-black/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <div
            id="brand-logo-container"
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleTabClick('home')}
          >
            <div className="p-2 bg-luxury-gold rounded-sm flex items-center justify-center">
              <Award className="h-6 w-6 text-luxury-dark" />
            </div>
            <div>
              <span className="block font-display text-xl sm:text-2xl font-semibold tracking-wider text-luxury-gold leading-none">
                SK PREMIUM PARK
              </span>
              <span className="block text-[9px] uppercase tracking-[0.25em] text-white/70 mt-1">
                World Square Mall • Mohan Nagar
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-navbar" className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => handleTabClick(item.id)}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-medium transition-all duration-200 border-b-2 ${
                  activeTab === item.id
                    ? 'border-luxury-gold text-luxury-gold'
                    : 'border-transparent text-white/85 hover:text-luxury-gold hover:border-luxury-gold/30'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Header Actions Area (Desktop & Mobile Unified) */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Desktop-only Direct Phone */}
            <a
              href={`tel:${HOTEL_CONTACT.phone}`}
              className="hidden xl:flex items-center text-white/80 hover:text-luxury-gold text-xs tracking-wider transition-colors duration-200 animate-fade-in"
            >
              <Phone className="h-3.5 w-3.5 mr-1.5 text-luxury-gold" />
              <span className="font-mono">{HOTEL_CONTACT.phone}</span>
            </a>

            {/* Book Stay CTA - Desktop */}
            <button
              id="cta-book-now-header"
              onClick={onOpenBooking}
              className="hidden sm:flex bg-luxury-gold hover:bg-luxury-gold-dark text-luxury-dark font-sans font-semibold text-xs uppercase tracking-widest px-4 py-2.5 rounded-sm transition-all duration-300 shadow-md hover:shadow-luxury-gold/20 items-center space-x-1.5 cursor-pointer"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Book Stay</span>
            </button>

            {/* Book Stay CTA - Mobile */}
            <button
              id="cta-book-now-mobile"
              onClick={onOpenBooking}
              className="sm:hidden bg-luxury-gold hover:bg-luxury-gold-dark text-luxury-dark text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-sm flex items-center space-x-1 cursor-pointer"
            >
              <Calendar className="h-3 w-3" />
              <span>Book</span>
            </button>

            {/* Classic Three-line Settings Menu Button */}
            <button
              id="three-line-settings-menu"
              onClick={onOpenSettings}
              className="p-2 border border-luxury-gold/30 bg-white/5 text-luxury-gold hover:bg-luxury-gold hover:text-luxury-dark rounded transition-all duration-300 cursor-pointer flex flex-col justify-between items-end h-9 w-9 py-2.5 px-2 group shrink-0 shadow-lg"
              title="Settings & Gallery"
            >
              <span className="block h-0.5 w-full bg-current transition-all duration-300"></span>
              <span className="block h-0.5 w-3/4 bg-current transition-all duration-300 group-hover:w-full"></span>
              <span className="block h-0.5 w-full bg-current transition-all duration-300"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
