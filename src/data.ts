/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Room, Review, Dish } from './types';

export const HOTEL_CONTACT = {
  name: "SK Premium Park",
  tagline: "Unrivaled Luxury at the Gateway of Ghaziabad",
  address: "World Square Mall, Main, Grand Trunk Road, Loni Industrial Area, Mohan Nagar, Sahibabad, Ghaziabad, Uttar Pradesh 201007",
  phone: "0120 692 9999",
  email: "reservations@skpremiumpark.com",
  salesTeam: [
    { name: "Miss Meenakshi", role: "Sales & Events Specialist" },
    { name: "Miss Sandhya", role: "Corporate & Banquet Coordinator" }
  ]
};

export const IMAGES = {
  lobbyHero: "/src/assets/images/hotel_lobby_hero_1783684903613.jpg",
  luxurySuite: "/src/assets/images/hotel_luxury_suite_1783684915983.jpg",
  diningBuffet: "/src/assets/images/hotel_dining_buffet_1783684927904.jpg",
  banquetHall: "/src/assets/images/hotel_banquet_hall_1783684939997.jpg"
};

export const ROOMS: Room[] = [
  {
    id: "deluxe-room",
    name: "Premium Deluxe Room",
    description: "Elegant, spotless, and thoughtfully appointed room with modern fixtures, soothing color palettes, and all contemporary business-class conveniences.",
    size: "320 sq ft",
    bed: "King Bed or Twin Beds",
    maxOccupancy: "3 Guests (2 Adults, 1 Child)",
    price: 4500,
    image: IMAGES.luxurySuite, // Using the premium suite image
    amenities: [
      "High-speed Wi-Fi",
      "43-inch LED Smart TV",
      "Executive Working Desk",
      "Premium Minibar",
      "Tea & Coffee Maker",
      "Luxury Bath Amenities",
      "Electronic Safe"
    ],
    features: [
      "Plush Orthopedic Mattress",
      "Sound-Insulated Windows",
      "Individual Climate Control",
      "24-Hour Room Service"
    ],
    category: "deluxe"
  },
  {
    id: "club-room",
    name: "Club Premium Room",
    description: "Upgrade your stay with exclusive access to premium services. Ideal for corporate delegates who value high-class comfort and flawless hospitality.",
    size: "380 sq ft",
    bed: "Luxury King Bed",
    maxOccupancy: "3 Guests",
    price: 5800,
    image: "https://picsum.photos/seed/clubroom/800/600",
    amenities: [
      "Dedicated Check-in & Check-out",
      "Welcome Fruit Platter",
      "Complimentary Laundry (2 pcs)",
      "High-speed Wi-Fi",
      "55-inch LED TV",
      "Stocked Minibar",
      "Rain Shower"
    ],
    features: [
      "Access to Club Lounge",
      "Complimentary Evening Snacks",
      "Premium Bathrobes & Slippers",
      "Pillow Menu Options"
    ],
    category: "club"
  },
  {
    id: "executive-suite",
    name: "SK Executive Suite",
    description: "A spacious separate living area paired with an opulent master bedroom. Experience a level of hospitality that rivals 5-star properties in the region.",
    size: "520 sq ft",
    bed: "King Size Poster Bed",
    maxOccupancy: "4 Guests (3 Adults, 1 Child)",
    price: 8500,
    image: IMAGES.luxurySuite,
    amenities: [
      "Separate Living & Dining Lounge",
      "Walk-in Wardrobe",
      "Two Smart TVs (55-inch & 43-inch)",
      "Nespresso Espresso Machine",
      "Luxury Jacuzzi Bathtub",
      "Butler Service (On Request)",
      "Panoramic City view"
    ],
    features: [
      "Spotless & Well-maintained Premium Decor",
      "Complimentary Premium Buffet Breakfast & Dinner",
      "Warm Welcome Amenities & Chocolates",
      "VIP Lounge Access"
    ],
    category: "suite"
  },
  {
    id: "presidential-suite",
    name: "The Grand SK Presidential Suite",
    description: "The peak of premium grandeur and luxurious architecture. Features a grand layout, private dining table, state-of-the-art automation, and personalized VIP hosting.",
    size: "850 sq ft",
    bed: "Royal Canopy King Bed",
    maxOccupancy: "4 Guests",
    price: 15000,
    image: "https://picsum.photos/seed/pressuite/800/600",
    amenities: [
      "Royal Living Room",
      "Private Bar Counter",
      "In-suite Dining Table",
      "Kitchenette",
      "Deep Soaking Tub with City Views",
      "Surround Sound System",
      "Personal Butler Service"
    ],
    features: [
      "Highest Level of Security & Privacy",
      "Private separate entrance",
      "In-room Check-In",
      "Unlimited Access to All Facilities"
    ],
    category: "presidential"
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    rating: 5,
    author: "Deepak Sharma",
    date: "July 2, 2026",
    comment: "Better than country inn or Radisson. SK Premium is no less than any 5 star property in the vicinity. One of the finest sales team I've met so far, Miss Meenakshi and Miss Sandhya both are very friendly and professional at the same time. The food was fabulous and management of the event is also smooth as butter.",
    source: "Verified Stay Google Review",
    stayType: "Business Event & Social Gathering"
  },
  {
    id: "rev-2",
    rating: 5,
    author: "Ananya Goel",
    date: "June 25, 2026",
    comment: "We had an absolutely wonderful stay at the hotel. From the moment we arrived, the staff was extremely warm, welcoming, and attentive to all our needs. The check-in process was smooth and hassle-free. The rooms were spotless, well-maintained, and very comfortable, with all the necessary amenities provided. The ambience of the hotel was relaxing and perfect for a pleasant stay.",
    source: "Verified Family Stay",
    stayType: "Leisure Weekend Stay"
  },
  {
    id: "rev-3",
    rating: 5,
    author: "Rahul Verma",
    date: "May 18, 2026",
    comment: "Great ambience and one of the most recommended hotel for stay and their food. Staff are very cooperative and helpful. All over hospitality is excellent.",
    source: "Google Reviewer",
    stayType: "Couples Dining & Stay"
  },
  {
    id: "rev-4",
    rating: 5,
    author: "Vikram Rathore",
    date: "May 10, 2026",
    comment: "3 days stay at the property was very comfortable with sumptuous Breakfast and Dinner buffet. Location of the property is also very convenient with very approachable routes and well connected with important locations. Staff is also very courteous complimenting the overall experience.",
    source: "Verified Business Booking",
    stayType: "3-Night Business Stay"
  },
  {
    id: "rev-5",
    rating: 4,
    author: "Sanjay Gupta",
    date: "April 28, 2026",
    comment: "Nice banquet for social events. Well decorated with separate entry from mall. Hall is divided into 3 parts reception area, open area for chaats and snx and separate dining hall. Area is good enough for 300 -350 person. Now food part: Snx were good, service was ok. Maincourse salads were good with simple and nicely decorated. The food was delicious but limited choice. Rogan josh was very tasty, so was the kadhai chicken, but biryani wasn't so great. In dessert, Gajar ka halwa and rasmalai were very tasty. Overall a great experience for events with moderate guest counts.",
    source: "Event Guest",
    stayType: "Social Gathering"
  }
];

export const DISHES: Dish[] = [
  {
    id: "dish-1",
    name: "Classic Mutton Rogan Josh",
    description: "Slow-cooked tender lamb chunks in a rich aromatic gravy flavored with Kashmiri red chilies and exotic spices. Praised in reviews as extremely tasty!",
    type: "main",
    category: "non-veg",
    price: 645,
    isPopular: true
  },
  {
    id: "dish-2",
    name: "Delectable Kadhai Chicken",
    description: "Juicy chicken pieces tossed with bell peppers and fresh ground spice blend cooked in a traditional iron wok. Highly recommended main course.",
    type: "main",
    category: "non-veg",
    price: 545,
    isPopular: true
  },
  {
    id: "dish-3",
    name: "Authentic Gajar Ka Halwa",
    description: "Rich winter carrot dessert slow-simmered in milk, ghee, and khoya, garnished with slivers of pistachios and almonds. Melt-in-mouth taste.",
    type: "dessert",
    category: "veg",
    price: 245,
    isPopular: true
  },
  {
    id: "dish-4",
    name: "Royal Saffron Rasmalai",
    description: "Soft cottage cheese patties soaked in cardamom and saffron-flavored sweet condensed milk. Served chilled and highly acclaimed by sweet lovers.",
    type: "dessert",
    category: "veg",
    price: 225,
    isPopular: true
  },
  {
    id: "dish-5",
    name: "Assorted Premium Starters & Snacks",
    description: "A platter of freshly grilled paneer tikka, crisp spring rolls, and hot golden snacks. Perfect for banquets or dinner starters.",
    type: "starter",
    category: "veg",
    price: 395
  },
  {
    id: "dish-6",
    name: "Grand Trunk Chicken Biryani",
    description: "Fragrant basmati rice layered with spiced chicken, mint, and caramelized onions. Served with spiced yogurt raita.",
    type: "main",
    category: "non-veg",
    price: 495
  },
  {
    id: "dish-7",
    name: "Gourmet Garden Fresh Salad Bar",
    description: "A beautifully arranged salad array of fresh garden greens, sliced cucumbers, cherry tomatoes, olives, and signature dressings.",
    type: "starter",
    category: "veg",
    price: 215
  },
  {
    id: "dish-8",
    name: "SK Refreshing Mint Cooler",
    description: "A cool and refreshing summer drink made with muddled mint leaves, lime, sugar syrup, and carbonated soda.",
    type: "beverage",
    category: "veg",
    price: 185
  }
];
