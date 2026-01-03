import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, Calendar, User, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { useQuoteStore, useSelectedItemsArray, useSubtotal } from '../../store/quoteStore';
import { eventTypes } from '../../data/inventory';
import { Button } from '../UI/Button';

export function QuoteForm({ onClose }) {
  const { customerInfo, setCustomerInfo } = useQuoteStore();
  const selectedItems = useSelectedItemsArray();
  const subtotal = useSubtotal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);

    // Log the quote details (in production, this would be sent to a server)
    console.log('Quote submitted:', {
      customerInfo,
      items: selectedItems,
      subtotal,
    });
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Check className="w-10 h-10 text-green-600" />
        </motion.div>
        <h3 className="text-2xl font-serif font-semibold text-neutral-dark mb-3">
          Quote Request Sent!
        </h3>
        <p className="text-text-muted mb-6 max-w-sm mx-auto">
          Thank you, {customerInfo.name}! We've received your quote request and will reach out within 24 hours.
        </p>
        <div className="bg-neutral-light rounded-xl p-4 mb-6 max-w-sm mx-auto">
          <p className="text-sm text-text-muted mb-1">Your estimated quote:</p>
          <p className="text-3xl font-serif font-bold text-primary">
            ${subtotal.toLocaleString()}
          </p>
          <p className="text-xs text-text-muted mt-1">
            {selectedItems.length} items selected
          </p>
        </div>
        <Button onClick={onClose} variant="outline">
          Continue Browsing
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Quote Summary */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-muted">Your Setup</p>
            <p className="font-semibold text-neutral-dark">
              {selectedItems.length} items selected
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-text-muted">Estimated Total</p>
            <p className="text-2xl font-serif font-bold text-primary">
              ${subtotal.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-neutral-dark mb-1.5">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              name="name"
              value={customerInfo.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className="w-full pl-10 pr-4 py-2.5 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-neutral-dark mb-1.5">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="email"
              name="email"
              value={customerInfo.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              className="w-full pl-10 pr-4 py-2.5 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-neutral-dark mb-1.5">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="tel"
              name="phone"
              value={customerInfo.phone}
              onChange={handleChange}
              required
              placeholder="(123) 456-7890"
              className="w-full pl-10 pr-4 py-2.5 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>
        </div>

        {/* Event Date */}
        <div>
          <label className="block text-sm font-medium text-neutral-dark mb-1.5">
            Event Date *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="date"
              name="eventDate"
              value={customerInfo.eventDate}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2.5 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium text-neutral-dark mb-1.5">
            Event Type *
          </label>
          <select
            name="eventType"
            value={customerInfo.eventType}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none bg-white"
          >
            <option value="">Select event type</option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Venue */}
        <div>
          <label className="block text-sm font-medium text-neutral-dark mb-1.5">
            Venue Name
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              name="venueName"
              value={customerInfo.venueName}
              onChange={handleChange}
              placeholder="Venue name (if known)"
              className="w-full pl-10 pr-4 py-2.5 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-neutral-dark mb-1.5">
          Additional Notes
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-text-muted" />
          <textarea
            name="notes"
            value={customerInfo.notes}
            onChange={handleChange}
            placeholder="Tell us about your vision, color preferences, or any special requests..."
            rows={4}
            className="w-full pl-10 pr-4 py-2.5 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={onClose}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5 border-2 border-neutral-dark/30 border-t-neutral-dark rounded-full"
            />
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Submit Quote Request
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
