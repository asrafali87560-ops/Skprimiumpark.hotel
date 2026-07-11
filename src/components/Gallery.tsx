/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Award, 
  Compass, 
  Eye, 
  Heart, 
  Maximize2, 
  Sparkles, 
  Play, 
  Pause,
  ChevronLeft,
  ChevronRight,
  X,
  Volume2,
  VolumeX,
  Calendar
} from 'lucide-react';
import { IMAGES, HOTEL_CONTACT } from '../data';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
  description: string;
  exhibitNumber: string;
  likes: number;
}

export default function Gallery({ onOpenBooking }: { onOpenBooking: () => void }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [likedImages, setLikedImages] = useState<Record<string, boolean>>({});
  const [likesCounts, setLikesCounts] = useState<Record<string, number>>({
    'exhibit-1': 342,
    'exhibit-2': 512,
    'exhibit-3': 289,
    'exhibit-4': 415,
    'exhibit-5': 198,
    'exhibit-6': 307,
    'exhibit-7': 256,
    'exhibit-8': 443,
    'exhibit-9': 221,
    'exhibit-10': 389,
    'exhibit-11': 176,
    'exhibit-12': 295,
  });

  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeftState, setScrollLeftState] = useState<number>(0);

  const images: GalleryImage[] = [
    {
      id: 'exhibit-1',
      url: IMAGES.lobbyHero,
      title: "The Grand Façade & Royal Entrance",
      category: "Arrival & Architecture",
      description: "A sweeping panoramic view of SK Premium Park's majestic entrance featuring high ceilings, warm architectural glow, and professional guest hosting.",
      exhibitNumber: "01",
      likes: likesCounts['exhibit-1']
    },
    {
      id: 'exhibit-2',
      url: IMAGES.luxurySuite,
      title: "The Executive Luxury Suite Bed Chamber",
      category: "Premium Suites",
      description: "Thoughtfully crafted bedroom featuring custom gold spotlighting, premium wooden flooring, elegant seating, and orthopedic luxury mattress bedding.",
      exhibitNumber: "02",
      likes: likesCounts['exhibit-2']
    },
    {
      id: 'exhibit-3',
      url: IMAGES.diningBuffet,
      title: "The Saffron Fine Dining Enclave",
      category: "Gastronomy",
      description: "Sophisticated gastronomy enclave featuring rich emerald green velvet booths, warm lighting, flawless table dressings, and delicious buffet setups.",
      exhibitNumber: "03",
      likes: likesCounts['exhibit-3']
    },
    {
      id: 'exhibit-4',
      url: IMAGES.banquetHall,
      title: "The Imperial Grand Ballroom",
      category: "Banquets & Celebrations",
      description: "Lavish social spaces with majestic drapery, sparkling chandeliers, and beautifully decorated banquet buffet arenas perfect for grand occasions.",
      exhibitNumber: "04",
      likes: likesCounts['exhibit-4']
    },
    {
      id: 'exhibit-5',
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
      title: "Gilded Corridor of the VIP Wings",
      category: "Interior Spaces",
      description: "Elegant, serene hotel corridor showcasing warm symmetry, beautiful art frames, premium carpeting, and elite design accents.",
      exhibitNumber: "05",
      likes: likesCounts['exhibit-5']
    },
    {
      id: 'exhibit-6',
      url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80",
      title: "Azure Rooftop Infinity Pool Deck",
      category: "Leisure & Wellness",
      description: "Stunning infinity pool styled with luxury chaise lounges, warm lamps, and a clear twilight sunset sky for therapeutic guest unwinding.",
      exhibitNumber: "06",
      likes: likesCounts['exhibit-6']
    },
    {
      id: 'exhibit-7',
      url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
      title: "The Marble Reception & Greeting Desk",
      category: "Arrival & Architecture",
      description: "Chic main lobby check-in counter built of pure white marble, brushed brass details, and high-class customer desk hospitality.",
      exhibitNumber: "07",
      likes: likesCounts['exhibit-7']
    },
    {
      id: 'exhibit-8',
      url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
      title: "Gourmet Lamb Rogan Josh Presentation",
      category: "Gourmet Cuisine",
      description: "Expert culinary preparation of our signature mutton Rogan Josh served on designer premium dinnerware with fresh coriander garnish.",
      exhibitNumber: "08",
      likes: likesCounts['exhibit-8']
    },
    {
      id: 'exhibit-9',
      url: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1200&q=80",
      title: "Royal Indian Desserts & Pastry Buffet",
      category: "Gastronomy",
      description: "Decadent dessert selection including saffron-infused rasmalai and hot gajar ka halwa, prepared daily by master chefs.",
      exhibitNumber: "09",
      likes: likesCounts['exhibit-9']
    },
    {
      id: 'exhibit-10',
      url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      title: "Imperial Guest Seating & Lounge",
      category: "Interior Spaces",
      description: "Lush velvet armchairs and pristine coffee tables in the lobby lounge, offering the perfect spot for quiet readings or corporate encounters.",
      exhibitNumber: "10",
      likes: likesCounts['exhibit-10']
    },
    {
      id: 'exhibit-11',
      url: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
      title: "Appetizer Assortment & Banquet Catering",
      category: "Gourmet Cuisine",
      description: "Mouthwatering banquet setup with fresh salad selections, savory snacks, and premium starters arranged beautifully for delegates.",
      exhibitNumber: "11",
      likes: likesCounts['exhibit-11']
    },
    {
      id: 'exhibit-12',
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      title: "Sleek Chandeliers & Restaurant Diners",
      category: "Gastronomy",
      description: "A wider cinematic preview of our main restaurant dining room, showcasing crystal drop pendant lighting and comfortable family setups.",
      exhibitNumber: "12",
      likes: likesCounts['exhibit-12']
    }
  ];

  // Auto-scrolling feature logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        if (scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          const maxScroll = container.scrollWidth - container.clientWidth;
          
          if (container.scrollLeft >= maxScroll - 5) {
            // Loop back to start smoothly
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            container.scrollBy({ left: 350, behavior: 'smooth' });
          }
        }
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Track progress of horizontal scroll bar
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const currentScroll = container.scrollLeft;
      
      const progress = maxScroll > 0 ? (currentScroll / maxScroll) * 100 : 0;
      setScrollProgress(progress);

      // Identify active slide index based on scroll position
      const scrollPercent = currentScroll / container.scrollWidth;
      const index = Math.min(
        Math.round(scrollPercent * images.length),
        images.length - 1
      );
      setActiveImageIdx(index);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -420 : 420;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Like action handler
  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const alreadyLiked = likedImages[id];
    setLikedImages(prev => ({ ...prev, [id]: !alreadyLiked }));
    setLikesCounts(prev => ({
      ...prev,
      [id]: alreadyLiked ? prev[id] - 1 : prev[id] + 1
    }));
  };

  // Mouse Drag to Scroll implementation
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftState(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.8; // speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeftState - walk;
  };

  // Lightbox Navigation
  const handleNextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % images.length);
    }
  };

  const handlePrevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <div id="experiential-gallery-page" className="bg-luxury-dark text-white py-12 md:py-20 overflow-hidden relative min-h-screen flex flex-col justify-between">
      
      {/* Absolute Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-luxury-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-luxury-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Luxury Intro Header */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-8 md:pb-12 text-center relative z-10 space-y-4">
        <div className="flex items-center justify-center space-x-2 text-luxury-gold text-xs font-bold uppercase tracking-[0.25em]">
          <Award className="h-4 w-4 text-luxury-gold animate-pulse" />
          <span>Vouched Curation</span>
          <span className="h-1 w-1 bg-luxury-gold rounded-full"></span>
          <span>Exquisite Portfolio</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight text-white">
          The Experiential <span className="text-luxury-gold italic">Gallery</span>
        </h1>
        
        <p className="text-white/60 text-xs sm:text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
          Savor an uncompromised continuous exhibition showcasing our spotless chambers, grand social salons, and world-class fine gastronomy. Touch, swipe, or click any frame to expand.
        </p>

        {/* Gallery Mode Controls */}
        <div className="flex items-center justify-center space-x-6 pt-2">
          {/* Active indicator */}
          <span className="text-[10px] font-mono uppercase tracking-widest text-luxury-gold bg-luxury-gold/10 px-3 py-1 rounded-full border border-luxury-gold/20">
            EXHIBIT {activeImageIdx + 1} OF {images.length}
          </span>

          {/* Autoplay toggle */}
          <button
            id="gallery-autoplay-toggle"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center space-x-1.5 text-xs font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
              isPlaying 
                ? 'bg-luxury-gold text-luxury-dark border-luxury-gold font-bold shadow-lg shadow-luxury-gold/10' 
                : 'bg-white/5 border-white/10 text-white/70 hover:text-luxury-gold hover:border-luxury-gold/50'
            }`}
            title={isPlaying ? "Pause automatic tour" : "Play automatic slideshow tour"}
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5 fill-current" />
                <span>Autoplay: On</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Autoplay: Off</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Exhibition Stage: The Continuous Horizontal Scroll Bar */}
      <div className="relative w-full py-4 z-10 flex items-center group/stage">
        
        {/* Navigation Arrow Left - Desktop */}
        <button
          id="gallery-scroll-arrow-left"
          onClick={() => scroll('left')}
          className="absolute left-4 md:left-8 z-30 p-3.5 bg-luxury-dark/90 hover:bg-luxury-gold text-luxury-gold hover:text-luxury-dark rounded-full border border-luxury-gold/25 hover:border-luxury-gold transition-all duration-300 flex items-center justify-center cursor-pointer shadow-2xl opacity-0 group-hover/stage:opacity-100 focus:opacity-100"
          aria-label="Scroll Exhibition Left"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        {/* The Horizontal Bar Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          id="continuous-gallery-scroll-bar"
          className={`flex overflow-x-auto w-full items-center space-x-6 md:space-x-8 px-6 sm:px-12 md:px-24 py-8 scroll-smooth snap-x snap-mandatory select-none cursor-grab active:cursor-grabbing scrollbar-none`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((img, idx) => (
            <div
              key={img.id}
              id={`gallery-card-${img.id}`}
              onClick={() => setLightboxIndex(idx)}
              className={`flex-none w-[280px] sm:w-[380px] md:w-[480px] lg:w-[560px] h-[340px] sm:h-[420px] md:h-[480px] rounded-xl overflow-hidden relative group/card border shadow-2xl transition-all duration-500 ease-out snap-center ${
                activeImageIdx === idx 
                  ? 'border-luxury-gold scale-[1.01] shadow-luxury-gold/10' 
                  : 'border-white/10 hover:border-luxury-gold/60 scale-95'
              }`}
            >
              {/* Exhibit Image */}
              <img
                src={img.url}
                alt={img.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105 select-none pointer-events-none"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-luxury-dark/30 to-transparent pointer-events-none"></div>

              {/* Top Bar Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="bg-luxury-gold text-luxury-dark text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded shadow-md font-sans">
                  {img.category}
                </span>
                <span className="bg-black/60 text-white/90 text-[10px] font-mono tracking-widest px-2.5 py-1 rounded border border-white/10">
                  EXHIBIT {img.exhibitNumber}
                </span>
              </div>

              {/* Click to expand hover hint */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 bg-black/35 backdrop-blur-[2px]">
                <div className="p-3 bg-luxury-dark/80 rounded-full border border-luxury-gold text-luxury-gold shadow-xl">
                  <Maximize2 className="h-5 w-5 animate-pulse" />
                </div>
              </div>

              {/* Text Meta Content Area */}
              <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 md:p-8 text-left space-y-1 sm:space-y-2 pointer-events-auto">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-display font-medium text-white tracking-tight leading-tight">
                    {img.title}
                  </h3>
                  
                  {/* Hearts action */}
                  <button
                    id={`like-btn-gallery-${img.id}`}
                    onClick={(e) => toggleLike(img.id, e)}
                    className={`p-1.5 sm:p-2 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer shadow-md shrink-0 ${
                      likedImages[img.id]
                        ? 'bg-red-500 border-red-500 text-white scale-110'
                        : 'bg-black/50 border-white/15 text-white/80 hover:text-luxury-gold hover:border-luxury-gold'
                    }`}
                    title="Acknowledge aesthetic beauty"
                  >
                    <Heart className={`h-3.5 sm:h-4 w-3.5 sm:w-4 ${likedImages[img.id] ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <p className="text-white/70 text-[11px] sm:text-xs font-light line-clamp-2 leading-relaxed">
                  {img.description}
                </p>

                {/* Engagement specs */}
                <div className="flex items-center space-x-4 pt-2 border-t border-white/10 text-[9px] sm:text-[10px] text-white/40 font-mono">
                  <span className="flex items-center">
                    <Heart className="h-3 w-3 text-red-500/80 mr-1 fill-red-500/10" />
                    {likesCounts[img.id]} Admirations
                  </span>
                  <span className="flex items-center">
                    <Eye className="h-3 w-3 text-luxury-gold/80 mr-1" />
                    {likesCounts[img.id] * 2 + 37} Views
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrow Right - Desktop */}
        <button
          id="gallery-scroll-arrow-right"
          onClick={() => scroll('right')}
          className="absolute right-4 md:right-8 z-30 p-3.5 bg-luxury-dark/90 hover:bg-luxury-gold text-luxury-gold hover:text-luxury-dark rounded-full border border-luxury-gold/25 hover:border-luxury-gold transition-all duration-300 flex items-center justify-center cursor-pointer shadow-2xl opacity-0 group-hover/stage:opacity-100 focus:opacity-100"
          aria-label="Scroll Exhibition Right"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      {/* Progress Line Bar Tracker */}
      <div className="max-w-md mx-auto w-full px-8 relative z-10 space-y-2 mt-4">
        <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
          <div 
            id="gallery-progress-bar-indicator"
            className="h-full bg-luxury-gold rounded-full transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center text-[9px] font-mono text-white/40 uppercase tracking-widest">
          <span>Arrival Façade</span>
          <span>Diner Tables</span>
        </div>
      </div>

      {/* Call to action & Interactive Bottom Banner */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-6 relative z-10 text-center border-t border-white/15 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 text-center md:text-left space-y-1">
            <h4 className="font-display text-lg sm:text-xl font-medium text-luxury-gold-light">
              Deeply Connected to Mohan Nagar’s Premier Sanctuary
            </h4>
            <p className="text-xs text-white/50 font-light">
              Every frame represents real stay experiences, immaculate banquet structures, and fine gastronomy.
            </p>
          </div>
          <div className="md:col-span-4 text-center md:text-right">
            <button
              id="gallery-cta-reserve-room"
              onClick={onOpenBooking}
              className="bg-luxury-gold hover:bg-luxury-gold-dark text-luxury-dark font-sans font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded-sm transition-all duration-300 shadow-xl hover:shadow-luxury-gold/20 inline-flex items-center space-x-2 cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span>Reserve My Sanctuary</span>
            </button>
          </div>
        </div>
      </div>

      {/* LIGHTBOX: Fully Responsive Immersive Maximize View */}
      {lightboxIndex !== null && (
        <div 
          id="gallery-lightbox-overlay"
          className="fixed inset-0 bg-black/98 z-[200] flex flex-col justify-between p-4 sm:p-6 md:p-8 animate-fade-in"
        >
          {/* Lightbox Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-2.5">
              <Sparkles className="h-5 w-5 text-luxury-gold animate-spin-slow" />
              <div>
                <span className="block text-[10px] font-mono text-luxury-gold tracking-widest uppercase">
                  MASTERPIECE COLLECTION
                </span>
                <span className="block font-display text-sm sm:text-base font-medium text-white">
                  SK Premium Park Exhibition Frame
                </span>
              </div>
            </div>

            {/* Close */}
            <button
              id="close-lightbox-btn"
              onClick={() => setLightboxIndex(null)}
              className="p-2 sm:p-2.5 bg-white/5 hover:bg-luxury-gold text-white hover:text-luxury-dark rounded-full border border-white/10 hover:border-luxury-gold transition-all duration-300 flex items-center justify-center cursor-pointer shadow-lg group focus:outline-none"
            >
              <X className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>

          {/* Lightbox Main Stage */}
          <div className="flex-grow flex items-center justify-between relative my-4 sm:my-6 overflow-hidden">
            
            {/* Prev arrow */}
            <button
              id="lightbox-prev-btn"
              onClick={handlePrevLightbox}
              className="absolute left-2 sm:left-4 z-10 p-3 bg-black/55 hover:bg-luxury-gold text-white hover:text-luxury-dark rounded-full border border-white/10 transition-colors cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Zoomable Image frame */}
            <div className="max-w-5xl mx-auto max-h-[60vh] sm:max-h-[65vh] md:max-h-[70vh] rounded-lg overflow-hidden shadow-2xl relative border border-white/10 flex items-center justify-center w-full">
              <img
                src={images[lightboxIndex].url}
                alt={images[lightboxIndex].title}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[60vh] sm:max-h-[65vh] md:max-h-[70vh] object-contain rounded animate-fade-in select-none"
              />
            </div>

            {/* Next arrow */}
            <button
              id="lightbox-next-btn"
              onClick={handleNextLightbox}
              className="absolute right-2 sm:right-4 z-10 p-3 bg-black/55 hover:bg-luxury-gold text-white hover:text-luxury-dark rounded-full border border-white/10 transition-colors cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Lightbox Footer text metadata */}
          <div className="max-w-3xl mx-auto w-full border-t border-white/10 pt-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <span className="text-[10px] bg-luxury-gold text-luxury-dark uppercase font-bold tracking-widest px-2.5 py-0.5 rounded">
                  {images[lightboxIndex].category}
                </span>
                <span className="text-white/40 font-mono text-[10px]">
                  EXHIBIT {images[lightboxIndex].exhibitNumber} OF {images.length}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-medium text-luxury-gold-light">
                {images[lightboxIndex].title}
              </h2>
              <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
                {images[lightboxIndex].description}
              </p>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <button
                id="lightbox-like-btn"
                onClick={(e) => toggleLike(images[lightboxIndex].id, e)}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer text-xs font-mono uppercase tracking-wider ${
                  likedImages[images[lightboxIndex].id]
                    ? 'bg-red-500 border-red-500 text-white'
                    : 'bg-white/5 border-white/15 text-white hover:text-luxury-gold hover:border-luxury-gold'
                }`}
              >
                <Heart className={`h-4 w-4 ${likedImages[images[lightboxIndex].id] ? 'fill-current' : ''}`} />
                <span>{likesCounts[images[lightboxIndex].id]} Likes</span>
              </button>
              
              <button
                id="lightbox-book-btn"
                onClick={() => {
                  setLightboxIndex(null);
                  onOpenBooking();
                }}
                className="bg-luxury-gold hover:bg-luxury-gold-dark text-luxury-dark font-sans font-bold text-xs uppercase tracking-wider px-4 py-2 rounded shadow-md transition-colors cursor-pointer"
              >
                Book Stay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
