/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, MessageSquare, Quote, Calendar, CheckCircle, User, PenTool } from 'lucide-react';
import { REVIEWS } from '../data';
import { Review } from '../types';

export default function Reviews() {
  const [reviewsList, setReviewsList] = useState<Review[]>(() => {
    const saved = localStorage.getItem('guest_reviews');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge saved reviews with default ones to prevent losing default feedback
      return [...parsed, ...REVIEWS];
    }
    return REVIEWS;
  });

  // Review form states
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [stayType, setStayType] = useState('Leisure Weekend Stay');
  const [comment, setComment] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Compute stats
  const totalReviews = reviewsList.length;
  const averageRating = (reviewsList.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview: Review = {
      id: 'rev-user-' + Math.random().toString(36).substr(2, 9),
      rating,
      author: authorName,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      comment,
      source: 'Verified Website Guest',
      stayType
    };

    // Save user reviews specifically in local storage
    const currentSaved = localStorage.getItem('guest_reviews');
    const parsedSaved = currentSaved ? JSON.parse(currentSaved) : [];
    const updatedSaved = [newReview, ...parsedSaved];
    localStorage.setItem('guest_reviews', JSON.stringify(updatedSaved));

    // Update state to render immediately at top of list
    setReviewsList([newReview, ...reviewsList]);
    setSubmitSuccess(true);

    // Reset Form
    setAuthorName('');
    setComment('');
    setRating(5);

    setTimeout(() => {
      setSubmitSuccess(false);
    }, 8000);
  };

  return (
    <section id="reviews-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-luxury-gold uppercase tracking-[0.2em] text-xs font-bold block">
            Guest Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-luxury-dark">
            Authentic Hospitality Experiences
          </h2>
          <div className="w-16 h-0.5 bg-luxury-gold mx-auto"></div>
          <p className="text-gray-600 font-light text-sm sm:text-base">
            Read direct stories from corporate planners, family vacationers, and social coordinators who stayed at our Sahibabad property. Hear why they rate us above neighborhood competitors.
          </p>
        </div>

        {/* Rating Overview & Left Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Rating stats panel */}
          <div className="lg:col-span-4 bg-luxury-cream p-8 rounded-lg border border-gray-100 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-bold text-luxury-dark">Our Reputation</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                We take immense pride in our spotless cleanliness and helpful staff. From checking in to booking grand banquets, our goal is high-fidelity perfection.
              </p>
            </div>

            <div className="py-6 border-y border-gray-200/60 text-center">
              <span className="block text-5xl font-extrabold text-luxury-dark font-mono">{averageRating}</span>
              <div className="flex justify-center text-luxury-gold my-2.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(parseFloat(averageRating))
                        ? 'fill-current'
                        : 'stroke-current text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold font-mono">
                Average Rating based on {totalReviews} reviews
              </p>
            </div>

            <div className="space-y-2.5 text-xs text-gray-600 font-light">
              <div className="flex items-center justify-between">
                <span>Cleanliness & Sanitation</span>
                <span className="font-semibold text-luxury-gold font-mono">4.9/5.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Sales Team & Service</span>
                <span className="font-semibold text-luxury-gold font-mono">4.9/5.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Food & Culinary Taste</span>
                <span className="font-semibold text-luxury-gold font-mono">4.8/5.0</span>
              </div>
            </div>
          </div>

          {/* Reviews Stream list */}
          <div className="lg:col-span-8 space-y-6 max-h-[600px] overflow-y-auto pr-2">
            {reviewsList.map((review) => (
              <div
                key={review.id}
                id={`review-item-${review.id}`}
                className="bg-white p-6 rounded-lg border border-gray-150 shadow-sm hover:border-luxury-gold/40 hover:shadow-md transition-all space-y-4 relative"
              >
                <Quote className="absolute top-6 right-6 h-8 w-8 text-luxury-gold/15 shrink-0" />
                
                {/* Review Header info */}
                <div className="flex items-center space-x-3.5">
                  <div className="p-2.5 bg-luxury-cream rounded-full text-luxury-gold">
                    <User className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-luxury-dark leading-snug">{review.author}</h4>
                    <span className="text-[10px] text-gray-400 uppercase font-mono tracking-wider block mt-0.5">{review.source}</span>
                  </div>
                </div>

                {/* Rating & Date */}
                <div className="flex items-center justify-between py-1 border-b border-gray-100 text-xs">
                  <div className="flex text-luxury-gold">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3.5 w-3.5 ${
                          star <= review.rating ? 'fill-current' : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center text-gray-400 space-x-1 font-mono text-[10px]">
                    <Calendar className="h-3 w-3" />
                    <span>{review.date}</span>
                  </div>
                </div>

                {/* Comment Text */}
                <p className="text-gray-600 font-light text-xs sm:text-sm leading-relaxed italic">
                  “{review.comment}”
                </p>

                {/* Stay Metadata tag */}
                <div className="inline-block bg-luxury-cream/80 text-luxury-gold-dark text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
                  Stay Profile: {review.stayType}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Share your Experience / Left feedback form */}
        <div className="bg-luxury-cream rounded-lg p-8 sm:p-12 shadow-inner border border-gray-200/50 max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <div className="inline-flex items-center space-x-2 text-luxury-gold text-xs uppercase tracking-widest font-bold">
              <PenTool className="h-4 w-4" />
              <span>Share Your Story</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-luxury-dark">Leave Us A Review</h3>
            <p className="text-xs text-gray-500">Your direct, authentic stay feedback drives our sales and service squads to perfection</p>
          </div>

          {submitSuccess && (
            <div id="review-submit-success-banner" className="bg-green-100 border border-green-300 text-green-800 p-4 rounded text-xs flex items-center space-x-2 mb-6 max-w-2xl mx-auto">
              <CheckCircle className="h-5 w-5 shrink-0" />
              <span>Perfect! Your verified guest review has been posted successfully and updated dynamically above. Thank you for your review!</span>
            </div>
          )}

          <form onSubmit={handleSubmitReview} className="space-y-4 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Stay Profile / Trip Purpose</label>
                <select
                  value={stayType}
                  onChange={(e) => setStayType(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold"
                >
                  <option value="Leisure Weekend Stay">Leisure Weekend Stay</option>
                  <option value="Corporate Executive Visit">Corporate Executive Visit</option>
                  <option value="Social Gathering Event">Social Gathering Event</option>
                  <option value="Wedding Festivity Guest">Wedding Festivity Guest</option>
                  <option value="Dining Buffet Visitor">Dining Buffet Visitor</option>
                </select>
              </div>
            </div>

            {/* Interactive Rating selector */}
            <div className="space-y-1.5 flex items-center justify-between bg-white border border-gray-200 rounded px-4 py-2.5">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Select Rating Grade</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-luxury-gold hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`h-5 w-5 ${
                        star <= rating ? 'fill-current' : 'text-gray-200'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review Comment text */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Your Experience Details</label>
              <textarea
                required
                rows={3}
                placeholder="Share your stay experience, food ratings, or any specific mentions (e.g. spotless rooms, banquets, Miss Meenakshi's event assistance, etc.)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              id="review-submit-btn"
              className="w-full bg-luxury-dark hover:bg-luxury-gold text-white hover:text-luxury-dark text-xs uppercase tracking-widest font-bold py-3 rounded transition-colors duration-200 cursor-pointer shadow-md"
            >
              Publish Verified Feedback
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
