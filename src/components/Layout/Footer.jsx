import { Instagram, Phone, Mail, MapPin, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-neutral-dark text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-3">
              AK <span className="text-primary">Enchanted</span> Events
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Creating magical moments for South Asian celebrations. 
              Specializing in Nikkah, Mehndi, and Reception decor.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-primary font-semibold mb-3">Contact Us</h4>
            <div className="space-y-2 text-sm">
              <a href="tel:+1234567890" className="flex items-center gap-2 text-white/70 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                (123) 456-7890
              </a>
              <a href="mailto:hello@akenchanted.com" className="flex items-center gap-2 text-white/70 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                hello@akenchanted.com
              </a>
              <div className="flex items-center gap-2 text-white/70">
                <MapPin className="w-4 h-4" />
                NJ/NY Metro Area
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-primary font-semibold mb-3">Follow Our Work</h4>
            <a 
              href="https://instagram.com/akenchantedevents" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/70 hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
              @akenchantedevents
            </a>
            <p className="text-white/50 text-sm mt-3">
              See our latest setups and real wedding inspiration
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © 2026 AK Enchanted Events. All rights reserved.
          </p>
          <p className="text-white/50 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-primary fill-primary" /> for beautiful celebrations
          </p>
        </div>
      </div>
    </footer>
  );
}

