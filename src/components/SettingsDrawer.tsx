/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, MapPin, Phone, Mail, Award, ArrowRight, ShieldCheck, HelpCircle, Compass, Star } from 'lucide-react';
import { HOTEL_CONTACT } from '../data';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenGallery: () => void;
  setActiveTab: (tab: string) => void;
  activeTab: string;
}

export default function SettingsDrawer({
  isOpen,
  onClose,
  onOpenGallery,
  setActiveTab,
  activeTab
}: SettingsDrawerProps) {
  if (!isOpen) return null;

  const menuItems = [
    { id: 'home', label: 'Hotel Home Page', description: 'Interactive overview and booking' },
    { id: 'rooms', label: 'Suites & Living', description: 'Explore premium business chambers' },
    { id: 'gallery', label: 'Experiential Gallery', description: 'Sleek continuous visual exhibition' },
    { id: 'dining', label: 'Gastronomy Enclaves', description: 'Fine dining options and menus' },
    { id: 'banquet', label: 'Ballrooms & banquets', description: 'Grand social & corporate affairs' },
    { id: 'reviews', label: 'Guest Chronicles', description: 'Verified experiences & reviews' },
    { id: 'bookings', label: 'My Bookings', description: 'Manage and track your stay invoices' }
  ];

  const handleNavigate = (tabId: string) => {
    setActiveTab(tabId);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        id="settings-drawer-backdrop"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      ></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        {/* Sliding Panel */}
        <div
          id="settings-drawer-panel"
          className="w-screen max-w-md bg-luxury-dark text-white shadow-2xl flex flex-col justify-between border-l border-luxury-gold/20 transform transition-transform duration-500 ease-out translate-x-0"
        >
          {/* Drawer Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-luxury-gold" />
              <div>
                <span className="block font-display text-sm uppercase tracking-widest font-semibold text-luxury-gold">
                  SK PREMIUM PARK
                </span>
                <span className="block text-[8px] uppercase tracking-[0.2em] text-white/50">
                  Lounge Settings & Curation
                </span>
              </div>
            </div>

            <button
              id="close-settings-drawer-btn"
              onClick={onClose}
              className="p-1.5 rounded-full text-white/60 hover:text-luxury-gold hover:bg-white/5 transition-colors focus:outline-none cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-grow overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-luxury-gold scrollbar-track-transparent">
            
            {/* General Navigation Options */}
            <div className="space-y-3">
              <span className="block text-[10px] text-luxury-gold uppercase tracking-[0.2em] font-bold">
                Luxury Segments
              </span>
              
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    id={`drawer-nav-${item.id}`}
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full text-left p-3.5 rounded-lg border transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                      activeTab === item.id
                        ? 'bg-luxury-gold/10 border-luxury-gold/35 text-luxury-gold'
                        : 'bg-white/3 border-transparent hover:bg-white/5 hover:border-white/10 text-white/80'
                    }`}
                  >
                    <div>
                      <span className="block text-xs uppercase tracking-widest font-semibold font-sans">
                        {item.label}
                      </span>
                      <span className="block text-[10px] text-white/45 font-light mt-0.5">
                        {item.description}
                      </span>
                    </div>
                    <ArrowRight className={`h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all ${
                      activeTab === item.id ? 'opacity-100 text-luxury-gold' : 'text-white/40'
                    }`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Guest Services Certifications */}
            <div className="p-4 bg-white/3 rounded-lg border border-white/5 space-y-3 text-xs font-light text-white/70">
              <span className="block text-[9px] text-luxury-gold uppercase tracking-[0.2em] font-semibold">
                Client Guarantees
              </span>
              <div className="space-y-2.5">
                <div className="flex items-start space-x-2.5">
                  <ShieldCheck className="h-4 w-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span>Spotless & verified pristine premium interiors</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <Star className="h-4 w-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span>High-class international lodging standards</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <Compass className="h-4 w-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span>Approachable, well-connected Grand Trunk Road route</span>
                </div>
              </div>
            </div>

          </div>

          {/* Drawer Footer */}
          <div className="p-6 border-t border-white/10 bg-black/40 space-y-4">
            <div className="space-y-2">
              <span className="block text-[9px] text-white/40 uppercase tracking-[0.2em] font-bold">
                Direct Curation Desk
              </span>
              
              <div className="space-y-2 text-xs text-white/75 font-mono">
                <a
                  href={`tel:${HOTEL_CONTACT.phone}`}
                  className="flex items-center hover:text-luxury-gold transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-luxury-gold mr-2.5" />
                  <span>{HOTEL_CONTACT.phone}</span>
                </a>
                <a
                  href={`mailto:${HOTEL_CONTACT.email}`}
                  className="flex items-center hover:text-luxury-gold transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-luxury-gold mr-2.5" />
                  <span>{HOTEL_CONTACT.email}</span>
                </a>
                <div className="flex items-start">
                  <MapPin className="h-3.5 w-3.5 text-luxury-gold mr-2.5 shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-relaxed font-sans font-light text-white/50">
                    {HOTEL_CONTACT.address}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 text-[9px] text-white/30 text-center font-mono tracking-wider uppercase">
              © {new Date().getFullYear()} SK PREMIUM PARK • GHAZIABAD
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
