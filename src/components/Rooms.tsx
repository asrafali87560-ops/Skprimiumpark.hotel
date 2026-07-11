/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Maximize2, BedDouble, Users, Sparkles, Check, ChevronRight } from 'lucide-react';
import { ROOMS } from '../data';
import { Room } from '../types';

interface RoomsProps {
  onSelectRoom: (roomId: string) => void;
}

export default function Rooms({ onSelectRoom }: RoomsProps) {
  const [filter, setFilter] = useState<'all' | 'deluxe' | 'club' | 'suite' | 'presidential'>('all');

  const filteredRooms = filter === 'all'
    ? ROOMS
    : ROOMS.filter(r => r.category === filter);

  return (
    <section id="rooms-section" className="py-20 bg-luxury-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-luxury-gold uppercase tracking-[0.2em] text-xs font-bold block">
            Premium Accommodation
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-luxury-dark">
            Luxurious Rooms & Executive Suites
          </h2>
          <div className="w-16 h-0.5 bg-luxury-gold mx-auto"></div>
          <p className="text-gray-600 font-light text-sm sm:text-base">
            Exquisitely furnished, spotless, and designed with high-class aesthetics. Our rooms represent the pinnacle of comfort in Sahibabad, giving you a relaxing ambiance and top-tier hospitality.
          </p>
        </div>

        {/* Filter Tab Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {([
            { id: 'all', label: 'All Sanctuary Tiers' },
            { id: 'deluxe', label: 'Premium Deluxe' },
            { id: 'club', label: 'Club Premium' },
            { id: 'suite', label: 'Executive Suites' },
            { id: 'presidential', label: 'Presidential Sanctuary' }
          ] as const).map((tab) => (
            <button
              key={tab.id}
              id={`room-filter-${tab.id}`}
              onClick={() => setFilter(tab.id)}
              className={`px-5 py-2.5 text-xs uppercase tracking-widest font-semibold rounded-full transition-all duration-300 border ${
                filter === tab.id
                  ? 'bg-luxury-gold border-luxury-gold text-luxury-dark shadow-md'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-luxury-gold hover:text-luxury-gold'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Rooms Layout (Alternating Cards or Premium Grid) */}
        <div className="space-y-16">
          {filteredRooms.map((room, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={room.id}
                id={`room-card-${room.id}`}
                className={`flex flex-col lg:flex-row bg-white rounded-lg overflow-hidden shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-luxury-gold/30 ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Room Image Container */}
                <div className="relative w-full lg:w-1/2 min-h-[300px] sm:min-h-[400px] overflow-hidden group">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white text-xs tracking-wider uppercase flex items-center">
                      <Sparkles className="h-4 w-4 mr-1.5 text-luxury-gold fill-current" />
                      Strictly Spotless & Well-Maintained
                    </p>
                  </div>
                  <div className="absolute top-4 left-4 bg-luxury-dark/90 text-luxury-gold text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded border border-luxury-gold/30">
                    ₹{room.price.toLocaleString('en-IN')} / Night
                  </div>
                </div>

                {/* Room Details Panel */}
                <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                  {/* Top Header */}
                  <div>
                    <div className="flex items-center space-x-1.5 text-luxury-gold text-xs font-bold uppercase tracking-widest mb-2">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>{room.category === 'suite' || room.category === 'presidential' ? 'VIP Class' : 'Executive Class'}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-luxury-dark font-display">
                      {room.name}
                    </h3>
                    <p className="text-gray-500 font-light text-sm mt-3 leading-relaxed">
                      {room.description}
                    </p>
                  </div>

                  {/* Core Specifications */}
                  <div className="grid grid-cols-3 gap-2 py-4 border-y border-gray-100 text-center">
                    <div className="flex flex-col items-center">
                      <Maximize2 className="h-4 w-4 text-luxury-gold mb-1" />
                      <span className="text-[10px] uppercase tracking-widest text-gray-400">Dimensions</span>
                      <span className="text-xs font-semibold text-gray-700 font-mono mt-0.5">{room.size}</span>
                    </div>
                    <div className="flex flex-col items-center border-x border-gray-100">
                      <BedDouble className="h-4 w-4 text-luxury-gold mb-1" />
                      <span className="text-[10px] uppercase tracking-widest text-gray-400">Bedding</span>
                      <span className="text-xs font-semibold text-gray-700 mt-0.5">{room.bed}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Users className="h-4 w-4 text-luxury-gold mb-1" />
                      <span className="text-[10px] uppercase tracking-widest text-gray-400">Occupancy</span>
                      <span className="text-xs font-semibold text-gray-700 mt-0.5">{room.maxOccupancy}</span>
                    </div>
                  </div>

                  {/* Special Features & Amenities Grid */}
                  <div>
                    <h4 className="text-xs font-bold text-luxury-dark uppercase tracking-widest mb-3">
                      Exclusive Comforts & Amenities
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {room.features.concat(room.amenities.slice(0, 2)).map((feature, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-600">
                          <Check className="h-3.5 w-3.5 text-luxury-gold mr-2 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom booking CTA */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
                    <div>
                      <span className="block text-[10px] text-gray-400 uppercase tracking-widest">Starting From</span>
                      <span className="text-2xl font-bold font-mono text-luxury-dark">
                        ₹{room.price.toLocaleString('en-IN')}
                        <span className="text-xs font-light text-gray-400 font-sans"> / night</span>
                      </span>
                    </div>
                    <button
                      id={`book-room-btn-${room.id}`}
                      onClick={() => onSelectRoom(room.id)}
                      className="w-full sm:w-auto bg-luxury-dark hover:bg-luxury-gold text-white hover:text-luxury-dark font-sans font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-sm transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer shadow-md"
                    >
                      <span>Reserve Sanctuary</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
