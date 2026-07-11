/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, Bed, Utensils, Award, Users, Star, ArrowRight, ShieldCheck, MapPin, CheckCircle, Trash2, Ticket } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Rooms from './components/Rooms';
import Dining from './components/Dining';
import Banquet from './components/Banquet';
import Reviews from './components/Reviews';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';
import SettingsDrawer from './components/SettingsDrawer';
import FullScreenGallery from './components/FullScreenGallery';
import Gallery from './components/Gallery';
import { ROOMS, HOTEL_CONTACT, IMAGES } from './data';
import { Booking } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string>('deluxe-room');
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Load bookings from local storage
  const loadBookings = () => {
    const saved = localStorage.getItem('hotel_bookings');
    if (saved) {
      setMyBookings(JSON.parse(saved));
    } else {
      setMyBookings([]);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [activeTab, isBookingOpen]);

  // Handle quick book from Hero widget
  const handleQuickBook = (params: { roomType: string; checkIn: string; checkOut: string; guests: number }) => {
    setSelectedRoomId(params.roomType);
    setIsBookingOpen(true);
  };

  const handleOpenBookingForRoom = (roomId: string) => {
    setSelectedRoomId(roomId);
    setIsBookingOpen(true);
  };

  const handleCancelBooking = (bookingId: string) => {
    const updated = myBookings.filter(b => b.id !== bookingId);
    localStorage.setItem('hotel_bookings', JSON.stringify(updated));
    setMyBookings(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-luxury-cream text-gray-800 antialiased font-sans">
      
      {/* Premium Glass Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={() => {
          setSelectedRoomId('deluxe-room');
          setIsBookingOpen(true);
        }}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Dynamic Tab Views */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <div id="home-view" className="animate-fade-in space-y-0">
            {/* Immersive Hero section */}
            <Hero
              onQuickBook={handleQuickBook}
              onExploreRooms={() => setActiveTab('rooms')}
              onExploreBanquet={() => setActiveTab('banquet')}
            />

            {/* Core Values / Welcome Segment */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Descriptive */}
                  <div className="lg:col-span-6 space-y-6">
                    <div className="flex items-center space-x-1.5 text-luxury-gold text-xs font-bold uppercase tracking-widest">
                      <Award className="h-4 w-4" />
                      <span>About our Luxury Property</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-luxury-dark tracking-tight">
                      A New Paradigm of <span className="text-luxury-gold">Luxury Stay</span> in Ghaziabad
                    </h2>

                    <p className="text-gray-600 font-light text-sm sm:text-base leading-relaxed">
                      At <span className="font-semibold text-luxury-dark">SK Premium Park</span>, we bring the premium standards of international 5-star lodging directly to the vibrant hub of Mohan Nagar. Unmatched convenience, spotless spaces, and exceptional client hospitality characterize our stay experiences.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-luxury-gold" />
                        <span className="font-semibold text-gray-700">Direct World Square Mall access</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-luxury-gold" />
                        <span className="font-semibold text-gray-700">Spotless, well-maintained suites</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-luxury-gold" />
                        <span className="font-semibold text-gray-700">Famous buffet with Rogan Josh</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-luxury-gold" />
                        <span className="font-semibold text-gray-700">Private entry decorated banquets</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Bento-style Visual Highlights Grid */}
                  <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Grid item 1: Rooms */}
                    <div className="bg-luxury-cream p-6 rounded-lg border border-gray-100 flex flex-col justify-between hover:border-luxury-gold/50 hover:shadow-lg transition-all space-y-4">
                      <div className="space-y-2">
                        <Bed className="h-6 w-6 text-luxury-gold" />
                        <h4 className="font-display font-bold text-lg text-luxury-dark">Spotless Sanctuaries</h4>
                        <p className="text-xs text-gray-500 font-light">
                          Well-appointed Premium Deluxe rooms and suites equipped with elegant orthopedic bedding.
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab('rooms')}
                        className="text-xs font-bold text-luxury-gold hover:text-luxury-gold-dark flex items-center space-x-1 text-left mt-2"
                      >
                        <span>View Rooms</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Grid item 2: Dining */}
                    <div className="bg-luxury-cream p-6 rounded-lg border border-gray-100 flex flex-col justify-between hover:border-luxury-gold/50 hover:shadow-lg transition-all space-y-4">
                      <div className="space-y-2">
                        <Utensils className="h-6 w-6 text-luxury-gold" />
                        <h4 className="font-display font-bold text-lg text-luxury-dark">Gourmet Buffets</h4>
                        <p className="text-xs text-gray-500 font-light">
                          Delectable slow-simmered Kashmiri Rogan Josh and cardamom Saffron Rasmalai.
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab('dining')}
                        className="text-xs font-bold text-luxury-gold hover:text-luxury-gold-dark flex items-center space-x-1 text-left mt-2"
                      >
                        <span>View Menus</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Grid item 3: Banquets */}
                    <div className="bg-luxury-cream p-6 rounded-lg border border-gray-100 flex flex-col justify-between hover:border-luxury-gold/50 hover:shadow-lg transition-all space-y-4 sm:col-span-2">
                      <div className="space-y-2">
                        <Award className="h-6 w-6 text-luxury-gold" />
                        <h4 className="font-display font-bold text-lg text-luxury-dark">Three-Part Grand Banquet Halls</h4>
                        <p className="text-xs text-gray-500 font-light">
                          Smart division including reception areas, chat lounges, and dining halls. Perfect for events of 300 to 350 guests.
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab('banquet')}
                        className="text-xs font-bold text-luxury-gold hover:text-luxury-gold-dark flex items-center space-x-1 text-left mt-2"
                      >
                        <span>Event Planners</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            </section>

            {/* Dynamic visual highlights showcase banner */}
            <section className="py-20 bg-luxury-cream border-y border-gray-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
                  <span className="text-luxury-gold uppercase tracking-[0.15em] text-xs font-bold block">Sanctuary Gallery</span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-luxury-dark">Premium Property Corners</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Photo 1: Lobby */}
                  <div className="group relative h-64 rounded-lg overflow-hidden shadow-md">
                    <img src={IMAGES.lobbyHero} alt="Lobby Lounge" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                      <span className="text-white text-sm font-bold tracking-wider">Grand Lobby Entrance</span>
                    </div>
                  </div>

                  {/* Photo 2: Dining */}
                  <div className="group relative h-64 rounded-lg overflow-hidden shadow-md">
                    <img src={IMAGES.diningBuffet} alt="Buffet Dining" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                      <span className="text-white text-sm font-bold tracking-wider">The Golden Palate Buffet</span>
                    </div>
                  </div>

                  {/* Photo 3: Banquet */}
                  <div className="group relative h-64 rounded-lg overflow-hidden shadow-md">
                    <img src={IMAGES.banquetHall} alt="Banquet Setup" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                      <span className="text-white text-sm font-bold tracking-wider">Grand Banquet Ballroom</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonial Quote Section */}
            <section className="py-20 bg-white">
              <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
                <div className="flex justify-center text-luxury-gold space-x-1">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-5 w-5 fill-current" />)}
                </div>
                
                <blockquote className="font-display text-2xl sm:text-3xl font-light text-luxury-dark italic leading-relaxed">
                  “Better than country inn or Radisson. SK Premium is no less than any 5 star property in the vicinity. One of the finest sales team I've met so far, Miss Meenakshi and Miss Sandhya both are very friendly and professional at the same time.”
                </blockquote>
                
                <div>
                  <h4 className="font-bold text-base text-luxury-dark">Deepak Sharma</h4>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mt-0.5">Verified Social Banquet Host & Guest</p>
                </div>

                <button
                  onClick={() => setActiveTab('reviews')}
                  className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest font-bold text-luxury-gold hover:text-luxury-gold-dark mt-4"
                >
                  <span>Read All Guest Testimonials</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'rooms' && (
          <div className="animate-fade-in">
            <Rooms onSelectRoom={handleOpenBookingForRoom} />
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="animate-fade-in">
            <Gallery onOpenBooking={() => {
              setSelectedRoomId('deluxe-room');
              setIsBookingOpen(true);
            }} />
          </div>
        )}

        {activeTab === 'dining' && (
          <div className="animate-fade-in">
            <Dining />
          </div>
        )}

        {activeTab === 'banquet' && (
          <div className="animate-fade-in">
            <Banquet />
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="animate-fade-in">
            <Reviews />
          </div>
        )}

        {activeTab === 'bookings' && (
          <section id="bookings-view" className="py-24 bg-luxury-cream min-h-[70vh]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              
              {/* Header */}
              <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                <span className="text-luxury-gold uppercase tracking-widest text-xs font-bold block">Stay Records</span>
                <h2 className="text-3xl font-bold text-luxury-dark tracking-tight font-display">My Sanctuary Reservations</h2>
                <div className="w-12 h-0.5 bg-luxury-gold mx-auto"></div>
                <p className="text-xs text-gray-500">Track and manage your verified upcoming stays at SK Premium Park</p>
              </div>

              {/* Stays list */}
              {myBookings.length === 0 ? (
                <div className="bg-white rounded-lg p-12 text-center border border-gray-150 shadow-sm space-y-4 max-w-xl mx-auto">
                  <div className="h-12 w-12 bg-luxury-cream rounded-full flex items-center justify-center mx-auto text-luxury-gold">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-semibold text-lg text-luxury-dark">No Bookings Recorded Yet</h3>
                    <p className="text-xs text-gray-500">Create a luxury booking to check in, review invoices, and track your reservation voucher details.</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedRoomId('deluxe-room');
                      setIsBookingOpen(true);
                    }}
                    className="bg-luxury-dark hover:bg-luxury-gold text-white hover:text-luxury-dark text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-sm transition-colors duration-200 cursor-pointer"
                  >
                    Configure Your First Stay
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {myBookings.map((booking) => (
                    <div
                      key={booking.id}
                      id={`my-booking-card-${booking.id}`}
                      className="bg-white rounded-lg border border-gray-250 shadow-md p-6 sm:p-8 flex flex-col md:flex-row justify-between gap-6"
                    >
                      {/* Left: stay summary */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Ticket className="h-5 w-5 text-luxury-gold shrink-0" />
                          <span className="font-mono text-sm font-bold text-gray-400">ID: {booking.id}</span>
                          <span className="bg-green-100 text-green-800 text-[9px] uppercase tracking-widest font-extrabold px-2 py-0.5 rounded font-sans">
                            {booking.status}
                          </span>
                        </div>

                        <h3 className="font-display font-bold text-xl text-luxury-dark">
                          {booking.roomType}
                        </h3>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-6 text-xs text-gray-600">
                          <p>Guest: <strong className="text-gray-800 font-medium">{booking.customerName}</strong></p>
                          <p>Check In: <strong className="text-gray-800 font-mono">{booking.checkIn}</strong></p>
                          <p>Check Out: <strong className="text-gray-800 font-mono">{booking.checkOut}</strong></p>
                          <p>Guests Count: <strong className="text-gray-800">{booking.guests} Guests</strong></p>
                          <p className="col-span-2">Contact: <strong className="text-gray-800 font-mono">{booking.customerPhone}</strong></p>
                        </div>
                      </div>

                      {/* Right: pricing & action cancellations */}
                      <div className="border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-8 flex flex-col justify-between items-end shrink-0 min-w-[200px]">
                        <div className="text-right">
                          <span className="block text-[10px] text-gray-400 uppercase tracking-widest">Total Invoice Amount</span>
                          <span className="text-2xl font-bold font-mono text-luxury-gold">
                            ₹{booking.totalPrice.toLocaleString('en-IN')}
                          </span>
                          <span className="block text-[8px] text-gray-400 uppercase tracking-wider mt-0.5">Payable At Hotel Check-in</span>
                        </div>

                        <div className="flex items-center space-x-3 w-full sm:w-auto mt-4 md:mt-0">
                          <button
                            onClick={() => {
                              setSelectedRoomId(ROOMS.find(r => r.name === booking.roomType)?.id || 'deluxe-room');
                              setIsBookingOpen(true);
                            }}
                            className="w-full sm:w-auto bg-luxury-cream hover:bg-gray-200 text-gray-700 text-[10px] uppercase tracking-widest font-bold py-2 px-4 rounded border"
                          >
                            Receipt
                          </button>
                          
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="w-full sm:w-auto bg-red-50 hover:bg-red-100 text-red-600 text-[10px] uppercase tracking-widest font-bold py-2 px-4 rounded flex items-center justify-center space-x-1 border border-red-200"
                          >
                            <Trash2 className="h-3 w-3 shrink-0" />
                            <span>Cancel Stay</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </section>
        )}
      </main>

      {/* Booking Simulator Modal Dialog */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedRoomId={selectedRoomId}
      />

      {/* Elegant Settings Sidebar Drawer */}
      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onOpenGallery={() => setIsGalleryOpen(true)}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />

      {/* Exquisite Full-Screen Interactive Gallery */}
      <FullScreenGallery
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />

      {/* Elegant Map Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
