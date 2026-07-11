/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { X, Heart, Eye, ArrowLeft, ArrowRight, Compass, Shield, Award } from 'lucide-react';
import { IMAGES } from '../data';

interface FullScreenGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: string;
  description: string;
  aestheticTag: string;
  likes: number;
}

export default function FullScreenGallery({ isOpen, onClose }: FullScreenGalleryProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
  const [likesCount, setLikesCount] = useState<Record<string, number>>({
    'lobby': 128,
    'suite': 245,
    'dining': 189,
    'banquet': 156,
    'rooftop': 210,
  });

  if (!isOpen) return null;

  const galleryItems: GalleryItem[] = [
    {
      id: 'lobby',
      url: IMAGES.lobbyHero,
      title: "The Grand Façade & Entrance",
      category: "Exterior & Arrival",
      description: "An upscale modern exterior featuring towering double-glazed glass paneling, custom gold-lit ceiling, and a premium luxury vehicle awaiting your grand entrance.",
      aestheticTag: "Opulent Arrival",
      likes: likesCount['lobby']
    },
    {
      id: 'suite',
      url: IMAGES.luxurySuite,
      title: "The Executive Luxury Suite",
      category: "Premium Rooms",
      description: "Indulge in a bespoke bedding experience styled with customized gold spotlighting, authentic local tapestry, plush velvet armchairs, and breathtaking night city skylines.",
      aestheticTag: "Elite Comfort",
      likes: likesCount['suite']
    },
    {
      id: 'dining',
      url: IMAGES.diningBuffet,
      title: "The Saffron Dining Enclave",
      category: "Fine Dining",
      description: "Immerse your senses in royal green button-tufted leather booths, pristine table setups, flickering candlelight, and gourmet culinary setups fit for royalty.",
      aestheticTag: "Gastronomic Elegance",
      likes: likesCount['dining']
    },
    {
      id: 'banquet',
      url: IMAGES.banquetHall,
      title: "The Imperial Grand Ballroom",
      category: "Banquets & Celebrations",
      description: "Host magnificent corporate summits or dreamy family weddings across three partitionable halls adorned with crystal chandeliers and majestic carpets.",
      aestheticTag: "Royal Celebration",
      likes: likesCount['banquet']
    },
    {
      id: 'rooftop',
      url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80",
      title: "The Azure Pool Deck at Dusk",
      category: "Leisure & Wellness",
      description: "Sip mocktails by the glowing blue water under a sunset-lit sky, relaxing on custom loungers framed by clean wooden decking and elegant glass railings.",
      aestheticTag: "Serene Escape",
      likes: likesCount['rooftop']
    }
  ];

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isAlreadyLiked = likedItems[id];
    setLikedItems(prev => ({ ...prev, [id]: !isAlreadyLiked }));
    setLikesCount(prev => ({
      ...prev,
      [id]: isAlreadyLiked ? prev[id] - 1 : prev[id] + 1
    }));
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -500 : 500;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      id="full-screen-gallery-overlay"
      className="fixed inset-0 bg-luxury-dark/98 backdrop-blur-2xl z-[100] flex flex-col justify-between overflow-hidden animate-fade-in text-white py-6 md:py-10"
    >
      {/* Elegantly Styled Top bar */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex items-center justify-between border-b border-white/10 pb-6 shrink-0">
        <div>
          <div className="flex items-center space-x-2 text-luxury-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">
            <Award className="h-4 w-4" />
            <span>SK Premium Park Selection</span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold tracking-tight text-luxury-gold-light">
            Experiential Gallery
          </h1>
          <p className="text-white/60 text-xs mt-1 max-w-xl font-light">
            Indulge in a visual curation of the upscale design, high-class suites, and elite lifestyle at Ghaziabad's finest premium destination.
          </p>
        </div>

        {/* Close Button */}
        <button
          id="close-gallery-btn"
          onClick={onClose}
          className="p-3 bg-white/5 hover:bg-luxury-gold text-white hover:text-luxury-dark rounded-full border border-white/10 hover:border-luxury-gold transition-all duration-300 focus:outline-none flex items-center justify-center cursor-pointer shadow-lg group"
        >
          <X className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90" />
        </button>
      </div>

      {/* Main Horizontal Scroller Content */}
      <div className="relative flex-grow flex items-center justify-center w-full my-auto overflow-hidden">
        {/* Navigation Arrows */}
        <button
          id="gallery-scroll-left"
          onClick={() => scroll('left')}
          className="absolute left-4 md:left-8 z-10 p-3 bg-black/60 hover:bg-luxury-gold text-white hover:text-luxury-dark rounded-full border border-white/10 hover:border-luxury-gold transition-all duration-300 flex items-center justify-center cursor-pointer"
          aria-label="Scroll left"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        {/* The smooth horizontal scrollbar container */}
        <div
          ref={scrollContainerRef}
          id="horizontal-gallery-scroll-bar"
          className="flex overflow-x-auto w-full h-[70vh] items-center space-x-6 md:space-x-10 px-8 md:px-24 py-4 scrollbar-thin scrollbar-thumb-luxury-gold scrollbar-track-white/5 scroll-smooth snap-x snap-mandatory"
        >
          {galleryItems.map((item, idx) => (
            <div
              key={item.id}
              id={`gallery-slide-${item.id}`}
              className="flex-none w-[310px] sm:w-[500px] md:w-[650px] lg:w-[750px] h-[52vh] sm:h-[58vh] md:h-[62vh] rounded-xl overflow-hidden relative group border border-white/10 hover:border-luxury-gold/50 shadow-2xl transition-all duration-500 snap-center select-none"
            >
              {/* Image */}
              <img
                src={item.url}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
              />

              {/* Gradient Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none"></div>

              {/* Top Luxury Accent Tags */}
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <span className="bg-luxury-gold/90 text-luxury-dark text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded shadow-md backdrop-blur-sm">
                  {item.category}
                </span>
                <span className="bg-black/50 text-luxury-gold-light text-[9px] font-medium tracking-wider px-2.5 py-1.5 rounded shadow-md border border-white/10 backdrop-blur-sm flex items-center space-x-1">
                  <Compass className="h-3 w-3 text-luxury-gold animate-spin-slow" />
                  <span>{item.aestheticTag}</span>
                </span>
              </div>

              {/* Card Bottom Meta Data */}
              <div className="absolute bottom-0 left-0 w-full p-5 sm:p-8 flex flex-col justify-end text-left space-y-2 sm:space-y-3 pointer-events-auto">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] sm:text-xs text-luxury-gold font-mono tracking-widest uppercase">
                      Exquisite Exhibit 0{idx + 1}
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-white tracking-tight mt-0.5">
                      {item.title}
                    </h2>
                  </div>

                  {/* Actions Area */}
                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      id={`like-gallery-btn-${item.id}`}
                      onClick={(e) => handleLike(item.id, e)}
                      className={`p-2.5 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer shadow-md ${
                        likedItems[item.id]
                          ? 'bg-red-500 border-red-500 text-white hover:scale-110'
                          : 'bg-black/40 border-white/10 text-white hover:border-luxury-gold hover:text-luxury-gold'
                      }`}
                      title="Appreciate aesthetic"
                    >
                      <Heart className={`h-4 sm:h-5 w-4 sm:w-5 ${likedItems[item.id] ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed max-w-2xl">
                  {item.description}
                </p>

                {/* Engagement Indicator */}
                <div className="flex items-center space-x-4 pt-1 sm:pt-2 border-t border-white/10 text-[10px] sm:text-xs text-white/50 font-mono">
                  <span className="flex items-center">
                    <Heart className="h-3.5 w-3.5 text-red-500 mr-1.5 fill-red-500/20" />
                    {likesCount[item.id]} Luxury Admirations
                  </span>
                  <span className="flex items-center">
                    <Eye className="h-3.5 w-3.5 text-luxury-gold mr-1.5" />
                    {likesCount[item.id] * 3 + 45} Curated Views
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          id="gallery-scroll-right"
          onClick={() => scroll('right')}
          className="absolute right-4 md:right-8 z-10 p-3 bg-black/60 hover:bg-luxury-gold text-white hover:text-luxury-dark rounded-full border border-white/10 hover:border-luxury-gold transition-all duration-300 flex items-center justify-center cursor-pointer"
          aria-label="Scroll right"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      {/* Footer / Interaction help text */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 font-mono tracking-wider shrink-0 mt-2 gap-3">
        <div className="flex items-center space-x-2">
          <Shield className="h-3.5 w-3.5 text-luxury-gold" />
          <span>VOUCHED BY SK PREMIUM PARK HOTEL & RESORTS GROUP</span>
        </div>
        <div className="animate-pulse text-luxury-gold">
          ← DRAG OR SCROLL HORIZONTALLY TO EXPERIENCE →
        </div>
      </div>
    </div>
  );
}
