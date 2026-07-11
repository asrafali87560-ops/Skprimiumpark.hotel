/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Utensils, Award, Clock, Star, Users, Calendar, ChefHat, CheckCircle } from 'lucide-react';
import { DISHES, IMAGES, HOTEL_CONTACT } from '../data';
import { Dish } from '../types';

export default function Dining() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'starter' | 'main' | 'dessert' | 'beverage'>('all');
  const [reserveName, setReserveName] = useState('');
  const [reserveEmail, setReserveEmail] = useState('');
  const [reservePhone, setReservePhone] = useState('');
  const [reserveDate, setReserveDate] = useState('');
  const [reserveTime, setReserveTime] = useState('19:30');
  const [reserveGuests, setReserveGuests] = useState(2);
  const [reserveNote, setReserveNote] = useState('');
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [savedReservations, setSavedReservations] = useState<any[]>(() => {
    const saved = localStorage.getItem('dining_reservations');
    return saved ? JSON.parse(saved) : [];
  });

  const filteredDishes = activeCategory === 'all'
    ? DISHES
    : DISHES.filter(d => d.type === activeCategory);

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const newReservation = {
      id: 'res-' + Math.random().toString(36).substr(2, 9),
      name: reserveName,
      email: reserveEmail,
      phone: reservePhone,
      date: reserveDate,
      time: reserveTime,
      guests: reserveGuests,
      notes: reserveNote,
      createdAt: new Date().toLocaleString()
    };

    const updated = [newReservation, ...savedReservations];
    setSavedReservations(updated);
    localStorage.setItem('dining_reservations', JSON.stringify(updated));
    setReservationSuccess(true);

    // Clear form
    setReserveName('');
    setReserveEmail('');
    setReservePhone('');
    setReserveDate('');
    setReserveNote('');

    setTimeout(() => {
      setReservationSuccess(false);
    }, 10000);
  };

  const handleCancelReservation = (id: string) => {
    const updated = savedReservations.filter((r: any) => r.id !== id);
    setSavedReservations(updated);
    localStorage.setItem('dining_reservations', JSON.stringify(updated));
  };

  return (
    <section id="dining-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-luxury-gold uppercase tracking-[0.2em] text-xs font-bold block">
            Gourmet Cuisine
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-luxury-dark">
            The Golden Palate Restaurant & Buffets
          </h2>
          <div className="w-16 h-0.5 bg-luxury-gold mx-auto"></div>
          <p className="text-gray-600 font-light text-sm sm:text-base">
            Favored for our sumptuous buffet dinners and breakfast table layouts. Although choices are refined and curated, each recipe is executed with absolute precision, crafting a taste that outclasses neighborhood five-star rivals.
          </p>
        </div>

        {/* Feature Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Column: Image with Stats */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl border border-gray-100">
              <img
                src={IMAGES.diningBuffet}
                alt="Sumptuous Dining Buffet Spread"
                className="w-full h-[450px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="inline-block bg-luxury-gold text-luxury-dark text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                  Highly Acclaimed Buffet
                </span>
                <p className="font-display text-2xl font-bold">
                  “The best Rogan Josh & Gajar Halwa in Ghaziabad”
                </p>
                <p className="text-xs text-white/70 italic">
                  — Verbatim rating from our guest events & hotel stay testimonials
                </p>
              </div>
            </div>

            {/* Quick stats floating bar */}
            <div className="absolute -bottom-6 -right-4 bg-luxury-dark text-white p-6 rounded shadow-xl border border-luxury-gold/30 hidden sm:flex space-x-6">
              <div className="text-center">
                <p className="text-luxury-gold font-display text-2xl font-bold">100%</p>
                <p className="text-[9px] uppercase tracking-wider text-white/65">Fresh Ingredients</p>
              </div>
              <div className="h-10 w-px bg-white/20"></div>
              <div className="text-center">
                <p className="text-luxury-gold font-display text-2xl font-bold">Curated</p>
                <p className="text-[9px] uppercase tracking-wider text-white/65">Gourmet Quality</p>
              </div>
              <div className="h-10 w-px bg-white/20"></div>
              <div className="text-center">
                <p className="text-luxury-gold font-display text-2xl font-bold">7 AM - 11 PM</p>
                <p className="text-[9px] uppercase tracking-wider text-white/65">Daily Buffet Timings</p>
              </div>
            </div>
          </div>

          {/* Right Column: Culinary Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-2 text-luxury-gold">
              <ChefHat className="h-5 w-5" />
              <span className="uppercase tracking-widest text-xs font-bold">Chef's Signature Selection</span>
            </div>
            
            <h3 className="text-3xl font-bold text-luxury-dark tracking-tight">
              Sumptuous Buffets & Savory Dishes
            </h3>

            <p className="text-gray-600 font-light text-sm leading-relaxed">
              Our culinary team believes in perfection over quantity. We provide a select, premium lineup of dishes that guarantees maximum flavor depth. From the rich cardamon-infused Saffron Rasmalai to the fiery spices of local kadhai preparations, every meal is smooth as butter.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-luxury-gold mt-2 shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-sm text-luxury-dark">Premium Breakfast Buffet</h4>
                  <p className="text-xs text-gray-500">Served daily with live egg counters, fresh juices, South Indian selections, and bakery delights.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-luxury-gold mt-2 shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-sm text-luxury-dark">Gourmet Dinner Buffet</h4>
                  <p className="text-xs text-gray-500">Featuring our famous savory Rogan Josh, flavorful Kadhai chicken, assortments of flatbreads, and traditional desserts like hot Gajar ka Halwa.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Menu Showcase */}
        <div className="bg-luxury-cream/50 p-8 rounded-lg border border-gray-100 mb-20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <h3 className="font-display text-2xl font-bold text-luxury-dark">Explore Our Curated Menu</h3>
              <p className="text-xs text-gray-500 mt-1">Select from our legendary, high-class recipes</p>
            </div>
            
            {/* Category tabs */}
            <div className="flex flex-wrap gap-1 bg-white p-1 rounded-full border border-gray-100">
              {([
                { id: 'all', label: 'All Dishes' },
                { id: 'starter', label: 'Starters' },
                { id: 'main', label: 'Main Course' },
                { id: 'dessert', label: 'Desserts' },
                { id: 'beverage', label: 'Drinks' }
              ] as const).map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold rounded-full transition-all duration-200 ${
                    activeCategory === cat.id
                      ? 'bg-luxury-gold text-luxury-dark'
                      : 'text-gray-500 hover:text-luxury-gold'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dishes grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDishes.map(dish => (
              <div key={dish.id} id={`menu-dish-${dish.id}`} className="bg-white p-5 rounded border border-gray-100 hover:border-luxury-gold/40 transition-colors flex justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${dish.category === 'veg' ? 'bg-green-600' : 'bg-red-600'}`} title={dish.category === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}></span>
                    <h4 className="font-display font-bold text-base text-luxury-dark">{dish.name}</h4>
                    {dish.isPopular && (
                      <span className="bg-luxury-gold/15 text-luxury-gold text-[8px] uppercase tracking-widest font-extrabold px-1.5 py-0.5 rounded flex items-center">
                        <Star className="h-2 w-2 fill-current mr-0.5" /> Chef Special
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 font-light max-w-sm">{dish.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono text-sm font-bold text-luxury-gold">₹{dish.price}</span>
                  <p className="text-[9px] uppercase tracking-wider text-gray-400 mt-1">Exclusive of taxes</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Table Reservation Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-luxury-dark text-white rounded-lg overflow-hidden shadow-2xl border border-luxury-gold/30">
          
          {/* Reservation Form */}
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
            <div className="flex items-center space-x-2 text-luxury-gold">
              <Utensils className="h-5 w-5" />
              <span className="uppercase tracking-widest text-xs font-bold">Reservation Desk</span>
            </div>
            
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">Reserve A Gourmet Table</h3>
            <p className="text-white/70 text-xs sm:text-sm font-light">
              Skip the queue for our acclaimed buffet layouts. Pre-book your family dinner table or business banquet lounge today. No advance fees required.
            </p>

            {reservationSuccess && (
              <div id="dining-reservation-success-banner" className="bg-green-900/30 border border-green-500 text-green-300 p-4 rounded text-xs flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 shrink-0" />
                <span>Excellent! Your gourmet table reservation has been recorded. The dining manager will contact you at your provided number to confirm!</span>
              </div>
            )}

            <form onSubmit={handleReservation} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-white/60">Full Name</label>
                <input
                  type="text"
                  required
                  value={reserveName}
                  onChange={(e) => setReserveName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full bg-luxury-slate text-white border border-white/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-white/60">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={reservePhone}
                  onChange={(e) => setReservePhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full bg-luxury-slate text-white border border-white/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-white/60">Email Address</label>
                <input
                  type="email"
                  required
                  value={reserveEmail}
                  onChange={(e) => setReserveEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full bg-luxury-slate text-white border border-white/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-white/60">Select Date</label>
                  <input
                    type="date"
                    required
                    value={reserveDate}
                    onChange={(e) => setReserveDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-luxury-slate text-white border border-white/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-white/60">Time Slot</label>
                  <select
                    value={reserveTime}
                    onChange={(e) => setReserveTime(e.target.value)}
                    className="w-full bg-luxury-slate text-white border border-white/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold"
                  >
                    <option value="12:30">12:30 PM (Lunch)</option>
                    <option value="13:30">01:30 PM (Lunch)</option>
                    <option value="19:30">07:30 PM (Dinner)</option>
                    <option value="20:30">08:30 PM (Dinner)</option>
                    <option value="21:30">09:30 PM (Dinner)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-[10px] uppercase tracking-widest text-white/60">Special Culinary Requests / Preferences</label>
                <textarea
                  value={reserveNote}
                  onChange={(e) => setReserveNote(e.target.value)}
                  placeholder="e.g., Less spicy Kashmiri Rogan Josh, high chair for kids, candlelit setup, etc."
                  rows={2}
                  className="w-full bg-luxury-slate text-white border border-white/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                id="dining-reservation-submit"
                className="w-full sm:col-span-2 bg-luxury-gold hover:bg-luxury-gold-dark text-luxury-dark font-sans font-bold text-xs uppercase tracking-widest py-3 rounded transition-colors duration-200 mt-2 cursor-pointer shadow-lg"
              >
                Secure Table Reservation
              </button>
            </form>
          </div>

          {/* Table Reservations List & Stats */}
          <div className="lg:col-span-5 bg-luxury-slate p-8 sm:p-12 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between">
            <div>
              <h4 className="font-display text-xl font-bold text-luxury-gold mb-4">My Food Desk Reservations</h4>
              
              {savedReservations.length === 0 ? (
                <div className="text-center py-12 text-white/40 space-y-3">
                  <Utensils className="h-8 w-8 mx-auto stroke-1" />
                  <p className="text-xs">No current table reservations.</p>
                  <p className="text-[10px] text-white/30">Your booked food tables will appear here for reference.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
                  {savedReservations.map((res: any) => (
                    <div key={res.id} id={`saved-res-${res.id}`} className="bg-luxury-dark p-3.5 rounded border border-white/5 space-y-2 relative">
                      <button
                        onClick={() => handleCancelReservation(res.id)}
                        className="absolute top-2 right-2 text-red-400 hover:text-red-300 text-[10px] uppercase tracking-widest"
                      >
                        Cancel
                      </button>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-white">{res.name}</span>
                        <span className="bg-luxury-gold/10 text-luxury-gold text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded font-mono font-bold">
                          Confirmed
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-[10px] text-white/60">
                        <p>Date: <strong className="text-white/80 font-mono">{res.date}</strong></p>
                        <p>Time: <strong className="text-white/80 font-mono">{res.time}</strong></p>
                        <p className="col-span-2">Notes: <span className="italic text-white/50">{res.notes || 'None'}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-white/10 text-xs text-white/50 space-y-1.5">
              <p>📍 Location: Ground Floor Dining Hall, World Square Mall Entry</p>
              <p>📞 Phone: <span className="font-mono text-white/75">{HOTEL_CONTACT.phone}</span></p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
