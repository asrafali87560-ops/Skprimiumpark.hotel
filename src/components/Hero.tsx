/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, Users, ShieldCheck, MapPin, Star } from 'lucide-react';
import { HOTEL_CONTACT, ROOMS, IMAGES } from '../data';

interface HeroProps {
  onQuickBook: (params: { roomType: string; checkIn: string; checkOut: string; guests: number }) => void;
  onExploreRooms: () => void;
  onExploreBanquet: () => void;
}

export default function Hero({ onQuickBook, onExploreRooms, onExploreBanquet }: HeroProps) {
  const [roomType, setRoomType] = useState(ROOMS[0].id);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  // Set default dates if empty: today and tomorrow
  const handleCheckAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    
    onQuickBook({
      roomType,
      checkIn: checkIn || today,
      checkOut: checkOut || tomorrow,
      guests
    });
  };

  return (
    <section id="hero-section" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image with Dark & Golden Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.lobbyHero}
          alt="SK Premium Park Lobby"
          className="w-full h-full object-cover scale-105 animate-[scaleUp_20s_infinite_alternate]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-dark/95 via-luxury-dark/85 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-transparent to-black/40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-20 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Descriptive Text & Pitch */}
        <div className="w-full lg:w-3/5 text-left text-white space-y-6">
          <div className="inline-flex items-center space-x-2 bg-luxury-gold/10 border border-luxury-gold/30 px-3 py-1.5 rounded-full text-luxury-gold text-xs font-semibold uppercase tracking-widest">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span>Ghaziabad's Premier Luxury Landmark</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            Redefining <span className="text-luxury-gold">Luxury & Hospitality</span> in Sahibabad
          </h1>

          <p className="text-white/80 text-base sm:text-lg font-light max-w-xl leading-relaxed">
            Ideally situated at World Square Mall, <span className="font-semibold text-white">SK Premium Park</span> is acclaimed as 
            <em> "no less than any 5-star property in the vicinity."</em> Discover spotless luxury rooms, gourmet buffet dining, and magnificent multi-tier banquets.
          </p>

          {/* Key Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-start space-x-3">
              <div className="p-1.5 bg-luxury-gold/20 rounded-md text-luxury-gold">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white/95">Five-Star Elegance</h4>
                <p className="text-xs text-white/70">Often favored above Country Inn and Radisson for comfort & value.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-1.5 bg-luxury-gold/20 rounded-md text-luxury-gold">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white/95">Seamless Connectivity</h4>
                <p className="text-xs text-white/70">At World Square Mall, Grand Trunk Road. Directly connected, private entries.</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              id="hero-explore-rooms-btn"
              onClick={onExploreRooms}
              className="bg-luxury-gold hover:bg-luxury-gold-dark text-luxury-dark font-sans font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-sm transition-all duration-300 shadow-lg cursor-pointer"
            >
              Explore Rooms & Suites
            </button>
            <button
              id="hero-explore-banquet-btn"
              onClick={onExploreBanquet}
              className="bg-transparent hover:bg-white/10 border border-white/50 hover:border-luxury-gold text-white hover:text-luxury-gold font-sans font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-sm transition-all duration-300 cursor-pointer"
            >
              Banquets & Weddings
            </button>
          </div>
        </div>

        {/* Floating Quick Booking Widget */}
        <div className="w-full lg:w-2/5 max-w-md bg-luxury-slate/95 backdrop-blur-md p-6 sm:p-8 rounded-lg shadow-2xl border border-luxury-gold/30 glow-gold">
          <div className="mb-6 text-center lg:text-left">
            <h3 className="font-display text-2xl font-bold text-white tracking-wide">
              Book Your Experience
            </h3>
            <p className="text-xs text-luxury-gold mt-1 uppercase tracking-widest">
              Best Rate Guaranteed Direct
            </p>
          </div>

          <form id="quick-booking-form" onSubmit={handleCheckAvailability} className="space-y-4">
            {/* Select Room Category */}
            <div className="space-y-1.5">
              <label className="block text-white/70 text-xs font-semibold tracking-wider uppercase">
                Accommodation Class
              </label>
              <select
                id="hero-booking-room-type"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full bg-luxury-dark text-white border border-white/20 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-luxury-gold transition-colors font-sans"
              >
                {ROOMS.map((room) => (
                  <option key={room.id} value={room.id} className="bg-luxury-slate">
                    {room.name} — ₹{room.price}/Night
                  </option>
                ))}
              </select>
            </div>

            {/* Check-in and Check-out Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-white/70 text-xs font-semibold tracking-wider uppercase flex items-center">
                  <Calendar className="h-3 w-3 mr-1 text-luxury-gold" />
                  <span>Check In</span>
                </label>
                <input
                  type="date"
                  id="hero-booking-check-in"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full bg-luxury-dark text-white border border-white/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-luxury-gold transition-colors font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-white/70 text-xs font-semibold tracking-wider uppercase flex items-center">
                  <Calendar className="h-3 w-3 mr-1 text-luxury-gold" />
                  <span>Check Out</span>
                </label>
                <input
                  type="date"
                  id="hero-booking-check-out"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || new Date().toISOString().split('T')[0]}
                  required
                  className="w-full bg-luxury-dark text-white border border-white/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-luxury-gold transition-colors font-mono"
                />
              </div>
            </div>

            {/* Guests Count Selector */}
            <div className="space-y-1.5">
              <label className="block text-white/70 text-xs font-semibold tracking-wider uppercase flex items-center">
                <Users className="h-3.5 w-3.5 mr-1 text-luxury-gold" />
                <span>Guests Count</span>
              </label>
              <div className="flex items-center justify-between bg-luxury-dark border border-white/20 rounded px-3 py-1.5">
                <button
                  type="button"
                  onClick={() => setGuests(prev => Math.max(1, prev - 1))}
                  className="text-luxury-gold hover:text-white px-2 py-1 text-lg font-bold"
                >
                  -
                </button>
                <span className="text-white text-sm font-semibold font-mono">{guests} Guest{guests > 1 ? 's' : ''}</span>
                <button
                  type="button"
                  onClick={() => setGuests(prev => Math.min(4, prev + 1))}
                  className="text-luxury-gold hover:text-white px-2 py-1 text-lg font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Check Button */}
            <button
              type="submit"
              id="hero-check-availability-submit"
              className="w-full bg-luxury-gold hover:bg-luxury-gold-dark text-luxury-dark font-sans font-bold text-sm uppercase tracking-widest py-3.5 rounded transition-all duration-300 mt-4 cursor-pointer shadow-lg hover:shadow-luxury-gold/10"
            >
              Book Direct & Save
            </button>
          </form>

          <p className="text-[10px] text-white/50 text-center mt-3 tracking-wide">
            ★ Free High-Speed Wi-Fi & Sumptuous Breakfast Buffet included
          </p>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes scaleUp {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
      `}</style>
    </section>
  );
}
