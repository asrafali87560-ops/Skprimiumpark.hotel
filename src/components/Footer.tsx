/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Phone, Mail, Award, Clock, Star, ExternalLink, ShieldAlert } from 'lucide-react';
import { HOTEL_CONTACT } from '../data';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleQuickLink = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-luxury-dark text-white/90 border-t border-luxury-gold/20">
      
      {/* Top Footer Block with Map and Contact Detail Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Column 1: Branding & Philosophy */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center space-x-2">
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

          <p className="text-xs text-white/60 font-light leading-relaxed max-w-sm">
            Acclaimed as Ghaziabad's premier luxurious destination, we match the comfort of local five-star venues with flawless hospitality. Enjoy unmatched connectivity with Sahibabad, Delhi NCR, and Mohan Nagar.
          </p>

          {/* Social review praise trust */}
          <div className="bg-luxury-slate p-4 rounded border border-white/5 space-y-2">
            <div className="flex items-center space-x-1.5 text-luxury-gold">
              {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-3 w-3 fill-current" />)}
              <span className="text-[10px] uppercase font-bold text-white ml-1">Excellent Stay Grade</span>
            </div>
            <p className="text-[10px] text-white/50 italic leading-snug">
              “SK Premium is no less than any 5 star property in the vicinity... Food was fabulous!”
            </p>
          </div>
        </div>

        {/* Column 2: Quick Links & Services */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-display text-sm font-semibold tracking-wider text-luxury-gold uppercase border-b border-white/10 pb-2">
            Sanctuary Explore
          </h4>
          <ul className="space-y-2 text-xs">
            {([
              { id: 'home', label: 'Hotel Home' },
              { id: 'rooms', label: 'Rooms & Suites' },
              { id: 'gallery', label: 'Experiential Gallery' },
              { id: 'dining', label: 'Dining & Buffet' },
              { id: 'banquet', label: 'Banquets & Weddings' },
              { id: 'reviews', label: 'Guest Feedbacks' },
              { id: 'bookings', label: 'My Stay Records' }
            ]).map(link => (
              <li key={link.id}>
                <button
                  onClick={() => handleQuickLink(link.id)}
                  className="hover:text-luxury-gold text-white/75 transition-colors cursor-pointer text-left"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contacts & Sales Desks */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-display text-sm font-semibold tracking-wider text-luxury-gold uppercase border-b border-white/10 pb-2">
            Reservations Desk
          </h4>
          
          <div className="space-y-3.5 text-xs text-white/70">
            {/* Address */}
            <div className="flex items-start space-x-2">
              <MapPin className="h-4 w-4 text-luxury-gold shrink-0 mt-0.5" />
              <p className="leading-snug">{HOTEL_CONTACT.address}</p>
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-luxury-gold shrink-0" />
              <a href={`tel:${HOTEL_CONTACT.phone}`} className="font-mono text-white hover:text-luxury-gold">
                {HOTEL_CONTACT.phone}
              </a>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-luxury-gold shrink-0" />
              <a href={`mailto:${HOTEL_CONTACT.email}`} className="text-white hover:text-luxury-gold">
                {HOTEL_CONTACT.email}
              </a>
            </div>

            {/* Sales managers */}
            <div className="pt-2 border-t border-white/5 space-y-1">
              <span className="block text-[9px] uppercase tracking-widest text-white/50">Banquet Sales Managers</span>
              <p className="font-semibold text-white">Miss Meenakshi & Miss Sandhya</p>
              <span className="text-[10px] text-luxury-gold italic">Smooth event coordination, friendly assistance</span>
            </div>
          </div>
        </div>

        {/* Column 4: Embedded Google Map of World Square Mall */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-display text-sm font-semibold tracking-wider text-luxury-gold uppercase border-b border-white/10 pb-2">
            Our Location Map
          </h4>
          
          {/* Iframe wrapper */}
          <div className="w-full h-44 rounded overflow-hidden border border-white/10 shadow-lg relative bg-luxury-slate">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.563820251147!2d77.33924767630444!3d28.672740975641775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf16ef39f6979%3A0xe5a3f124cbf5e009!2sWorld%20Square%20Mall!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SK Premium Park - World Square Mall Map Location"
              id="google-maps-embed-frame"
            ></iframe>
          </div>
          
          <a
            href="https://maps.google.com/?q=World+Square+Mall+Mohan+Nagar+Sahibabad"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center space-x-1.5 text-[10px] uppercase tracking-widest font-bold text-luxury-gold hover:text-white transition-colors py-1.5 border border-luxury-gold/35 rounded"
          >
            <span>Get Driving Directions</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

      </div>

      {/* Bottom Footer Credits block */}
      <div className="bg-luxury-slate py-6 border-t border-white/5 text-center text-xs text-white/50 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {currentYear} {HOTEL_CONTACT.name}. All Luxury Rights Reserved.</p>
          <p className="text-[10px] tracking-wide">
            Designed for <strong className="text-luxury-gold font-sans font-semibold">SK Premium Park at World Square Mall</strong>
          </p>
        </div>
      </div>

    </footer>
  );
}
