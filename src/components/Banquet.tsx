/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, Users, Calculator, Gift, Sparkles, MapPin, CheckCircle, Mail, Phone } from 'lucide-react';
import { HOTEL_CONTACT, IMAGES } from '../data';

export default function Banquet() {
  const [eventType, setEventType] = useState('Wedding Reception');
  const [guests, setGuests] = useState(200);
  const [selectedSections, setSelectedSections] = useState<string[]>(['reception', 'snacks_lounge', 'dining_hall']);
  const [cateringType, setCateringType] = useState<'veg' | 'non-veg' | 'snacks-only'>('non-veg');
  const [eventDate, setEventDate] = useState('');
  
  // Inquiry Form state
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [activeLayoutTab, setActiveLayoutTab] = useState<'reception' | 'snacks' | 'dining'>('reception');

  const [savedInquiries, setSavedInquiries] = useState<any[]>(() => {
    const saved = localStorage.getItem('banquet_inquiries');
    return saved ? JSON.parse(saved) : [];
  });

  // Dynamic pricing calculation based on guest count and parameters
  const getCateringPricePerPlate = () => {
    if (cateringType === 'veg') return 950;
    if (cateringType === 'non-veg') return 1250; // Includes Rogan Josh, Kadhai Chicken, Rasmalai, Halwa
    return 650; // Snacks Only
  };

  const getSectionPrice = () => {
    let base = 0;
    if (selectedSections.includes('reception')) base += 25000;
    if (selectedSections.includes('snacks_lounge')) base += 35000;
    if (selectedSections.includes('dining_hall')) base += 45000;
    return base;
  };

  const plateTotal = getCateringPricePerPlate() * guests;
  const venueRent = getSectionPrice();
  const rawTotal = plateTotal + venueRent;
  const taxAmount = Math.round(rawTotal * 0.18); // 18% GST
  const estimatedGrandTotal = rawTotal + taxAmount;

  const handleSectionToggle = (sectionId: string) => {
    if (selectedSections.includes(sectionId)) {
      if (selectedSections.length > 1) {
        setSelectedSections(selectedSections.filter(s => s !== sectionId));
      }
    } else {
      setSelectedSections([...selectedSections, sectionId]);
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInquiry = {
      id: 'inq-' + Math.random().toString(36).substr(2, 9),
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      eventType,
      date: eventDate,
      guestCount: guests,
      sections: selectedSections,
      catering: cateringType,
      estimatedPrice: estimatedGrandTotal,
      createdAt: new Date().toLocaleString()
    };

    const updated = [newInquiry, ...savedInquiries];
    setSavedInquiries(updated);
    localStorage.setItem('banquet_inquiries', JSON.stringify(updated));
    setInquirySuccess(true);

    // Clear form
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setEventDate('');

    setTimeout(() => {
      setInquirySuccess(false);
    }, 10000);
  };

  const handleCancelInquiry = (id: string) => {
    const updated = savedInquiries.filter((inq: any) => inq.id !== id);
    setSavedInquiries(updated);
    localStorage.setItem('banquet_inquiries', JSON.stringify(updated));
  };

  const sectionDetails = {
    reception: {
      title: "1. The Grand Welcoming Reception Hall",
      desc: "An elegant indoor greeting room styled with rich wood and crystal chandeliers, specifically designed to receive guests comfortably, complete with a private wardrobe and luxury powder room access.",
      highlight: "Direct VIP mall entry connection"
    },
    snacks: {
      title: "2. Open-air Chats & Snacks Lounge",
      desc: "A spacious, beautifully decorated intermediate lounge designed for live catering counters, interactive chaat stalls, and hot hors d'oeuvres service. Celebrated for its swift service style.",
      highlight: "Generous standing space for 300+ guests"
    },
    dining: {
      title: "3. Secluded Royal Banquet Dining Hall",
      desc: "Our primary grand dining room, meticulously set up for seated banquets. Features beautifully arranged tables, elegant salad displays, and serving bars for gourmet main courses.",
      highlight: "Serving signature Rogan Josh & Saffron Rasmalai"
    }
  };

  return (
    <section id="banquet-section" className="py-20 bg-luxury-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-luxury-gold uppercase tracking-[0.2em] text-xs font-bold block">
            Banquets & Celebrations
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-luxury-dark">
            Magnificent Event Halls & Catering
          </h2>
          <div className="w-16 h-0.5 bg-luxury-gold mx-auto"></div>
          <p className="text-gray-600 font-light text-sm sm:text-base">
            Whether hosting a wedding reception, corporate launch, or social gathering, enjoy the luxury of direct mall connectivity coupled with a private decorated entry. Perfectly optimized for up to 300 to 350 guests.
          </p>
        </div>

        {/* Feature Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Text block */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-1.5 text-luxury-gold text-xs font-bold uppercase tracking-widest">
              <Sparkles className="h-4 w-4" />
              <span>Luxurious Social Spaces</span>
            </div>

            <h3 className="text-3xl font-bold text-luxury-dark tracking-tight">
              A Highly Decorated, Connected Event Hub
            </h3>

            <p className="text-gray-600 text-sm font-light leading-relaxed">
              Our banquet venue stands out with its smart three-room layout and private entries. This unique design keeps guest flow organized and fluid. We specialize in hosting events of 300 to 350 guests with delicious menus, spotless decoration, and dedicated professional management.
            </p>

            {/* Meet the Sales Team */}
            <div className="p-5 bg-white rounded-lg border border-gray-150 shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-luxury-dark border-b pb-2">
                📞 Direct Banquet Sales Team
              </h4>
              <p className="text-xs text-gray-500 font-light">
                Our elite sales organizers are renowned for their friendly, butter-smooth event management. Reach out directly:
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                <div className="p-3 bg-luxury-cream rounded">
                  <span className="block text-[10px] text-luxury-gold uppercase font-bold">Miss Meenakshi</span>
                  <span className="text-gray-700">Senior Sales Lead</span>
                </div>
                <div className="p-3 bg-luxury-cream rounded">
                  <span className="block text-[10px] text-luxury-gold uppercase font-bold">Miss Sandhya</span>
                  <span className="text-gray-700">Events Coordinator</span>
                </div>
              </div>
            </div>
          </div>

          {/* Image Block */}
          <div className="lg:col-span-7 relative">
            <img
              src={IMAGES.banquetHall}
              alt="SK Premium Park Banquet setup"
              className="w-full h-[400px] object-cover rounded-lg shadow-2xl border border-gray-100"
              referrerPolicy="no-referrer"
            />
            
            {/* Overlay indicators */}
            <div className="absolute top-4 right-4 bg-luxury-dark text-luxury-gold px-4 py-2 text-xs uppercase tracking-widest font-bold rounded shadow-lg border border-luxury-gold/20">
              Capacity: 300 - 350 Guests
            </div>
          </div>
        </div>

        {/* 3-Part Division Interactive Explorer */}
        <div className="bg-white rounded-lg p-6 sm:p-10 shadow-xl border border-gray-100 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="font-display text-2xl font-bold text-luxury-dark">The Celebrated Three-Room Layout</h3>
            <p className="text-xs text-gray-500 mt-1">Our banquet is divided into three distinct, beautifully decorated areas to maximize guest hospitality</p>
          </div>

          {/* Layout Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {([
              { id: 'reception', label: '1. Reception Hall' },
              { id: 'snacks', label: '2. Chaats & Snacks Lounge' },
              { id: 'dining', label: '3. Secluded Dining Hall' }
            ] as const).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveLayoutTab(tab.id)}
                className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all rounded ${
                  activeLayoutTab === tab.id
                    ? 'bg-luxury-dark text-luxury-gold border-b-2 border-luxury-gold'
                    : 'bg-luxury-cream text-gray-600 hover:text-luxury-gold'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Display Tab Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-luxury-cream/40 p-6 rounded-lg border border-gray-100">
            <div className="space-y-4">
              <h4 className="font-display text-xl font-bold text-luxury-dark">
                {sectionDetails[activeLayoutTab].title}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                {sectionDetails[activeLayoutTab].desc}
              </p>
              <div className="inline-flex items-center space-x-2 bg-luxury-gold/15 text-luxury-gold text-xs px-3 py-1 rounded">
                <CheckCircle className="h-4 w-4 shrink-0" />
                <span className="font-semibold">{sectionDetails[activeLayoutTab].highlight}</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
              <h5 className="text-xs font-bold uppercase tracking-widest text-gray-500">Included Decor & Hospitality:</h5>
              <ul className="text-xs text-gray-600 space-y-2">
                <li className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-luxury-gold mr-2"></span> Separately decorated private mall entrance.</li>
                <li className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-luxury-gold mr-2"></span> Custom flower arrangements on dining tables.</li>
                <li className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-luxury-gold mr-2"></span> Spotless silverware, clean linens, and warm ambient lighting.</li>
                <li className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-luxury-gold mr-2"></span> Professional hospitality staff supervised directly by our managers.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dynamic Banquet Pricing Calculator & Inquiry Desk */}
        <div id="banquet-calculator" className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Dynamic Calculator Controls */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-lg shadow-xl border border-gray-100 space-y-6">
            <div className="flex items-center space-x-2 text-luxury-gold">
              <Calculator className="h-5 w-5" />
              <span className="uppercase tracking-widest text-xs font-bold">Dynamic Pricing Tool</span>
            </div>
            
            <h3 className="font-display text-2xl font-bold text-luxury-dark">Instant Event Quote Calculator</h3>
            <p className="text-xs text-gray-500">Customize your venue layouts and menus to see an instant financial estimation</p>

            <div className="space-y-4 pt-2">
              {/* Event Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Event Nature</label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full bg-luxury-cream border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold"
                >
                  <option value="Wedding Reception">Wedding Reception & Dinner</option>
                  <option value="Corporate Seminar">Corporate Annual Seminar</option>
                  <option value="Anniversary Gala">Anniversary / Social Gala</option>
                  <option value="Social Gathering">Moderate Social Gathering</option>
                </select>
              </div>

              {/* Guest Count Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-gray-500">
                  <span>Guest Capacity Count</span>
                  <span className="text-luxury-gold font-mono text-sm">{guests} Guests</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="350"
                  step="10"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="w-full accent-luxury-gold cursor-pointer"
                />
                <span className="block text-[10px] text-gray-400 italic">Optimized specifically for moderate guest counts (100 - 350 max).</span>
              </div>

              {/* Selected Sections */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Venue Sections to Include</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <label className="flex items-center p-3 bg-luxury-cream rounded cursor-pointer hover:border-luxury-gold/50 border border-transparent transition-all">
                    <input
                      type="checkbox"
                      checked={selectedSections.includes('reception')}
                      onChange={() => handleSectionToggle('reception')}
                      className="accent-luxury-gold mr-2.5 h-4 w-4"
                    />
                    <div>
                      <span className="block text-xs font-semibold text-luxury-dark">Reception Hall</span>
                      <span className="text-[9px] text-gray-400">₹25,000 rent</span>
                    </div>
                  </label>

                  <label className="flex items-center p-3 bg-luxury-cream rounded cursor-pointer hover:border-luxury-gold/50 border border-transparent transition-all">
                    <input
                      type="checkbox"
                      checked={selectedSections.includes('snacks_lounge')}
                      onChange={() => handleSectionToggle('snacks_lounge')}
                      className="accent-luxury-gold mr-2.5 h-4 w-4"
                    />
                    <div>
                      <span className="block text-xs font-semibold text-luxury-dark">Snacks Lounge</span>
                      <span className="text-[9px] text-gray-400">₹35,000 rent</span>
                    </div>
                  </label>

                  <label className="flex items-center p-3 bg-luxury-cream rounded cursor-pointer hover:border-luxury-gold/50 border border-transparent transition-all">
                    <input
                      type="checkbox"
                      checked={selectedSections.includes('dining_hall')}
                      onChange={() => handleSectionToggle('dining_hall')}
                      className="accent-luxury-gold mr-2.5 h-4 w-4"
                    />
                    <div>
                      <span className="block text-xs font-semibold text-luxury-dark">Dining Hall</span>
                      <span className="text-[9px] text-gray-400">₹45,000 rent</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Catering Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Catering & Menu Package</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => setCateringType('veg')}
                    className={`p-3 rounded text-left border transition-all ${
                      cateringType === 'veg'
                        ? 'border-luxury-gold bg-luxury-gold/10 text-luxury-dark font-bold'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <span className="block text-xs">Vegetarian Table</span>
                    <span className="block text-[9px] text-gray-400 mt-0.5">₹950 / plate</span>
                  </button>

                  <button
                    onClick={() => setCateringType('non-veg')}
                    className={`p-3 rounded text-left border transition-all ${
                      cateringType === 'non-veg'
                        ? 'border-luxury-gold bg-luxury-gold/10 text-luxury-dark font-bold'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <span className="block text-xs">Premium Non-Veg</span>
                    <span className="block text-[9px] text-gray-400 mt-0.5">₹1,250 / plate</span>
                  </button>

                  <button
                    onClick={() => setCateringType('snacks-only')}
                    className={`p-3 rounded text-left border transition-all ${
                      cateringType === 'snacks-only'
                        ? 'border-luxury-gold bg-luxury-gold/10 text-luxury-dark font-bold'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <span className="block text-xs">Chats & Starters Only</span>
                    <span className="block text-[9px] text-gray-400 mt-0.5">₹650 / plate</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Pricing Summary, Inquiry Form & Saved inquiries */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Quick Price Estimate Ticket */}
            <div className="bg-luxury-dark text-white p-6 rounded-lg border border-luxury-gold/30 shadow-2xl space-y-4">
              <h4 className="font-display text-lg text-luxury-gold border-b border-white/10 pb-2">Estimated Event Quote</h4>
              
              <div className="space-y-2 text-xs text-white/80">
                <div className="flex justify-between font-mono">
                  <span>Plate Cost ({guests} x ₹{getCateringPricePerPlate()}):</span>
                  <span>₹{plateTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>Venue Rent (Included Sections):</span>
                  <span>₹{venueRent.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2 font-mono">
                  <span>Subtotal:</span>
                  <span>₹{rawTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-mono text-white/50">
                  <span>GST Taxes (18%):</span>
                  <span>₹{taxAmount.toLocaleString('en-IN')}</span>
                </div>
                
                <div className="flex justify-between border-t border-white/20 pt-3 text-sm font-bold text-luxury-gold font-mono">
                  <span>Est. Grand Total:</span>
                  <span>₹{estimatedGrandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Quick Submit inquiry */}
            <div className="bg-white p-6 rounded-lg border border-gray-150 shadow-md space-y-4">
              <h4 className="font-display text-base font-bold text-luxury-dark">Lock In This Estimation</h4>
              
              {inquirySuccess && (
                <div id="banquet-inquiry-success-banner" className="bg-green-50 text-green-700 p-3 rounded text-xs border border-green-200 flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  <span>Brilliant! Your quote inquiry has been logged. Miss Meenakshi or Miss Sandhya will reach you shortly with tailored floorplans.</span>
                </div>
              )}

              <form onSubmit={handleInquirySubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-luxury-cream border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-luxury-cream border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold font-mono"
                  />
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-luxury-cream border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold font-mono"
                  />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full bg-luxury-cream border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold"
                />

                <button
                  type="submit"
                  id="banquet-inquiry-submit"
                  className="w-full bg-luxury-dark hover:bg-luxury-gold text-white hover:text-luxury-dark text-xs uppercase tracking-widest font-bold py-2.5 rounded transition-colors duration-200 cursor-pointer"
                >
                  Send Banquet Inquiry
                </button>
              </form>
            </div>

            {/* List of Submitted inquiries */}
            {savedInquiries.length > 0 && (
              <div className="bg-white p-6 rounded-lg border border-gray-150 shadow-md space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-widest text-luxury-dark border-b pb-1.5">
                  My Active Event Inquiries
                </h5>
                <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
                  {savedInquiries.map((inq: any) => (
                    <div key={inq.id} id={`saved-inq-${inq.id}`} className="bg-luxury-cream p-2.5 rounded text-[10px] space-y-1 relative border border-gray-100">
                      <button
                        onClick={() => handleCancelInquiry(inq.id)}
                        className="absolute top-2.5 right-2 text-red-500 hover:text-red-700 uppercase font-bold"
                      >
                        Cancel
                      </button>
                      <p className="font-bold text-gray-800">{inq.eventType} — <span className="font-mono">{inq.date}</span></p>
                      <p className="text-gray-500">Guests: <strong className="text-gray-700">{inq.guestCount}</strong> | Est Quote: <strong className="text-luxury-gold font-mono">₹{inq.estimatedPrice.toLocaleString('en-IN')}</strong></p>
                      <span className="inline-block bg-luxury-gold/15 text-luxury-gold text-[8px] uppercase tracking-widest font-bold px-1 rounded mt-1">Pending Review</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
