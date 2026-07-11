/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Room {
  id: string;
  name: string;
  description: string;
  size: string; // e.g., "350 sq ft"
  bed: string; // e.g., "King Bed"
  maxOccupancy: string; // e.g., "3 Guests"
  price: number; // in INR
  image: string;
  amenities: string[];
  features: string[];
  category: 'deluxe' | 'suite' | 'club' | 'presidential';
}

export interface Review {
  id: string;
  rating: number;
  author: string;
  date: string;
  comment: string;
  source: string;
  stayType: string;
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  type: 'starter' | 'main' | 'dessert' | 'beverage';
  category: 'veg' | 'non-veg';
  price: number;
  isPopular?: boolean;
}

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'Confirmed' | 'Pending';
  createdAt: string;
}

export interface EventQuote {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventType: string; // e.g. "Wedding Reception", "Corporate Seminar", "Social Gathering"
  date: string;
  guestCount: number; // e.g. 100-350
  sections: ('reception' | 'snacks_lounge' | 'dining_hall')[];
  includeFood: boolean;
  estimatedPrice: number;
  createdAt: string;
}
