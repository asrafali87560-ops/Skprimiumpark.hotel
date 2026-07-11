/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Mail, Phone, CreditCard, Sparkles, CheckCircle, Receipt, Info } from 'lucide-react';
import { ROOMS } from '../data';
import { Room, Booking } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoomId: string;
}

export default function BookingModal({ isOpen, onClose, selectedRoomId }: BookingModalProps) {
  const [roomId, setRoomId] = useState(selectedRoomId);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<Booking | null>(null);

  useEffect(() => {
    if (selectedRoomId) {
      setRoomId(selectedRoomId);
    }
  }, [selectedRoomId]);

  // Set default dates if they open modal empty
  useEffect(() => {
    if (isOpen && !checkIn) {
      const today = new Date();
      const tomorrow = new Date(Date.now() + 86400000);
      setCheckIn(today.toISOString().split('T')[0]);
      setCheckOut(tomorrow.toISOString().split('T')[0]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedRoom = ROOMS.find((r) => r.id === roomId) || ROOMS[0];

  // Compute number of stay nights
  const getNightsCount = () => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end.getTime() - start.getTime();
    const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  };

  const nights = getNightsCount();
  const roomCost = selectedRoom.price * nights;
  const luxuryTax = Math.round(roomCost * 0.12); // 12% luxury stay tax
  const grandTotal = roomCost + luxuryTax;

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate database write
    setTimeout(() => {
      const newBooking: Booking = {
        id: 'SKP-' + Math.floor(100000 + Math.random() * 900000),
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        roomType: selectedRoom.name,
        checkIn,
        checkOut,
        guests,
        totalPrice: grandTotal,
        status: 'Confirmed',
        createdAt: new Date().toLocaleString()
      };

      // Save to local storage
      const existing = localStorage.getItem('hotel_bookings');
      const list = existing ? JSON.parse(existing) : [];
      localStorage.setItem('hotel_bookings', JSON.stringify([newBooking, ...list]));

      setBookingResult(newBooking);
      setIsSubmitting(false);
    }, 1200);
  };

  const handleResetAndClose = () => {
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setBookingResult(null);
    onClose();
  };

  return (
    <div
      id="booking-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div
        id="booking-modal-content"
        className="relative bg-white w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row max-h-[90vh]"
      >
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-luxury-gold p-1.5 rounded-full hover:bg-gray-100 z-10 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Side Panel: Booking Form or Success Receipt */}
        <div className="w-full md:w-3/5 p-6 sm:p-8 overflow-y-auto">
          {!bookingResult ? (
            // Booking Form Mode
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-luxury-dark">
                  Configure Your Sanctuary Stay
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Fill in your details to secure direct-booking discounts and VIP lounge features
                </p>
              </div>

              <form onSubmit={handleSubmitBooking} className="space-y-4">
                
                {/* Select Room Tier */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block">
                    Sanctuary Accommodation Tier
                  </label>
                  <select
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="w-full bg-luxury-cream border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold font-sans"
                  >
                    {ROOMS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} — ₹{r.price}/Night
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dates & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 flex items-center">
                      <Calendar className="h-3 w-3 mr-1 text-luxury-gold" /> Check In
                    </label>
                    <input
                      type="date"
                      required
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-luxury-cream border border-gray-200 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-luxury-gold font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 flex items-center">
                      <Calendar className="h-3 w-3 mr-1 text-luxury-gold" /> Check Out
                    </label>
                    <input
                      type="date"
                      required
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || new Date().toISOString().split('T')[0]}
                      className="w-full bg-luxury-cream border border-gray-200 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-luxury-gold font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                      Stay Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full bg-luxury-cream border border-gray-200 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-luxury-gold font-sans"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                    </select>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="space-y-3 pt-2 border-t border-gray-100">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-luxury-gold-dark">
                    Guest Credentials
                  </h4>

                  <div className="space-y-3">
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-luxury-cream border border-gray-200 rounded pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-luxury-gold"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
                        <input
                          type="email"
                          required
                          placeholder="Email Address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-luxury-cream border border-gray-200 rounded pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-luxury-gold"
                        />
                      </div>

                      <div className="relative">
                        <Phone className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
                        <input
                          type="tel"
                          required
                          placeholder="Phone Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-luxury-cream border border-gray-200 rounded pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-luxury-gold font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <textarea
                        placeholder="Special Requests (e.g. airport taxi shuttle, high-floor, extra towel suite, etc.)"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={2}
                        className="w-full bg-luxury-cream border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Action booking btn */}
                <button
                  type="submit"
                  id="booking-submit-confirm-btn"
                  disabled={isSubmitting}
                  className="w-full bg-luxury-dark hover:bg-luxury-gold text-white hover:text-luxury-dark font-sans font-bold text-xs uppercase tracking-widest py-3.5 rounded transition-colors duration-200 shadow-lg cursor-pointer flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                      <span>Processing Luxury Booking...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-3.5 w-3.5" />
                      <span>Confirm Reservation (Pay At Hotel)</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            // Success Receipt / Voucher Mode
            <div className="space-y-6 py-4">
              <div className="text-center space-y-2">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-luxury-dark">
                  Stay Booking Confirmed!
                </h3>
                <p className="text-xs text-gray-500">
                  Your reservation request is completed. Thank you for booking with us!
                </p>
              </div>

              {/* Printable Receipt layout */}
              <div id="booking-invoice-voucher" className="border-2 border-dashed border-luxury-gold/50 rounded-lg p-5 bg-luxury-cream/40 space-y-4">
                <div className="flex justify-between items-center border-b pb-3 border-gray-200/60">
                  <div>
                    <span className="block text-xs uppercase tracking-widest font-extrabold text-luxury-gold-dark font-display">SK PREMIUM PARK</span>
                    <span className="block text-[8px] text-gray-400">World Square Mall, Mohan Nagar</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[9px] text-gray-400">RESERVATION ID</span>
                    <span className="block text-xs font-mono font-bold text-luxury-dark">{bookingResult.id}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs">
                  <div>
                    <span className="block text-[9px] text-gray-400 uppercase">Guest Name</span>
                    <span className="font-semibold text-gray-800">{bookingResult.customerName}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-gray-400 uppercase">Sanctuary Room</span>
                    <span className="font-semibold text-gray-800">{bookingResult.roomType}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-gray-400 uppercase">Check In</span>
                    <span className="font-semibold text-gray-800 font-mono">{bookingResult.checkIn}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-gray-400 uppercase">Check Out</span>
                    <span className="font-semibold text-gray-800 font-mono">{bookingResult.checkOut}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-gray-400 uppercase">Stay Duration</span>
                    <span className="font-semibold text-gray-800">{nights} Night{nights > 1 ? 's' : ''}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-gray-400 uppercase">Total Guests</span>
                    <span className="font-semibold text-gray-800">{bookingResult.guests} Guest{bookingResult.guests > 1 ? 's' : ''}</span>
                  </div>
                </div>

                <div className="border-t pt-3 border-gray-200/60 space-y-1 text-xs">
                  <div className="flex justify-between font-mono">
                    <span>Base Lodging ({nights} Nights):</span>
                    <span>₹{roomCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-mono text-gray-400">
                    <span>Luxury Stay Taxes (12%):</span>
                    <span>₹{luxuryTax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-mono font-bold text-sm text-luxury-gold-dark border-t pt-1.5">
                    <span>Total Amount (Pay at Hotel):</span>
                    <span>₹{bookingResult.totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Advisory details */}
              <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded text-xs flex items-start space-x-2.5">
                <Info className="h-4 w-4 mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <span className="font-bold">Check-In Instruction:</span>
                  <p className="text-blue-700/90 leading-relaxed">
                    Standard check-in begins at 12:00 PM; check-out is by 11:00 AM. Please present a government-issued photo ID upon arrival. For smooth event setups or special coordinate planning, contact Miss Meenakshi or Miss Sandhya from our sales desks.
                  </p>
                </div>
              </div>

              {/* Close CTAs */}
              <button
                onClick={handleResetAndClose}
                className="w-full bg-luxury-dark hover:bg-luxury-gold-dark text-white text-xs uppercase tracking-widest font-bold py-3 rounded cursor-pointer"
              >
                Close Receipt & Continue
              </button>
            </div>
          )}
        </div>

        {/* Right Side Panel: Price Summary & Highlights */}
        <div className="w-full md:w-2/5 bg-luxury-slate text-white p-6 sm:p-8 flex flex-col justify-between overflow-y-auto border-t md:border-t-0 md:border-l border-white/10">
          
          {/* Room quick highlight */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-luxury-gold uppercase tracking-widest text-[9px] font-bold block">
                Selected Suite Specs
              </span>
              <h4 className="font-display text-xl font-bold text-white leading-snug">
                {selectedRoom.name}
              </h4>
              <div className="w-12 h-0.5 bg-luxury-gold"></div>
            </div>

            <p className="text-[11px] text-white/75 font-light leading-relaxed">
              {selectedRoom.description}
            </p>

            {/* Quick specifications list */}
            <div className="space-y-2 text-xs text-white/80 font-mono py-4 border-y border-white/10">
              <div className="flex justify-between">
                <span>Room Size:</span>
                <span className="font-semibold text-white">{selectedRoom.size}</span>
              </div>
              <div className="flex justify-between">
                <span>Bed Style:</span>
                <span className="font-semibold text-white">{selectedRoom.bed}</span>
              </div>
              <div className="flex justify-between">
                <span>Max Capacity:</span>
                <span className="font-semibold text-white">{selectedRoom.maxOccupancy}</span>
              </div>
            </div>
          </div>

          {/* Dynamic Price computation ticket */}
          <div className="space-y-4 pt-6 md:pt-0">
            <div className="flex items-center space-x-1.5 text-luxury-gold">
              <Receipt className="h-4 w-4" />
              <span className="uppercase tracking-widest text-[9px] font-bold">Stay Pricing Breakdown</span>
            </div>

            <div className="space-y-2 text-xs text-white/80">
              <div className="flex justify-between font-mono">
                <span>Room Rate / Night:</span>
                <span>₹{selectedRoom.price.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-mono">
                <span>Lodging Nights Count:</span>
                <span>{nights} Night{nights > 1 ? 's' : ''}</span>
              </div>
              
              <div className="border-t border-white/10 pt-2 flex justify-between font-mono">
                <span>Lodging Subtotal:</span>
                <span>₹{roomCost.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="flex justify-between font-mono text-white/50">
                <span>Luxury Stay Taxes (12%):</span>
                <span>₹{luxuryTax.toLocaleString('en-IN')}</span>
              </div>

              <div className="border-t border-white/20 pt-3 flex justify-between font-mono text-base font-bold text-luxury-gold">
                <span>Total Stay Cost:</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="bg-luxury-gold/10 p-3 rounded border border-luxury-gold/30 text-[10px] text-white/85 text-center mt-4">
              ★ Complimentary Sumptuous Breakfast buffet included daily.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
