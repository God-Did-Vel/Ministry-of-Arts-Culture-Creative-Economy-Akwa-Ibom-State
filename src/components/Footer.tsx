'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Landmark, Mail, Phone, MapPin, Send, HelpCircle, CheckCircle } from 'lucide-react';
import { useApp } from './AppContext';

export default function Footer() {
  const { t } = useApp();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#111A2E] text-white/80 border-t-4 border-[#C7A349] py-12 md:py-16 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Column 1: Ministry Info & Contacts */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
            src="https://res.cloudinary.com/duweg8kpv/image/upload/v1777919226/ak-removebg-preview_cuhg4u.png"
            alt="Ministry of Arts,Culture"
            className="h-8 w-auto object-contain grayscale brightness-50 contrast-200"
          />
            <div>
              <h4 className="font-playfair text-[#FAF8F5] text-sm md:text-base font-bold leading-tight">
                Ministry of Arts, Culture<br />& Creative Economy<br />
                <span className="text-[#C7A349]">Akwa Ibom State</span>
              </h4>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-white/70">
            Preserving the golden cultural heritage of Akwa Ibom State (&quot;The Land of Promise&quot;), empowering creative minds, and advancing the modern creative economy.
          </p>
          <div className="space-y-2.5 text-xs pt-2">
            <div className="flex items-start gap-2">
              <MapPin size={14} className="text-[#C7A349] shrink-0 mt-0.5" />
              <span>Idongesit Nkanga Secretariat Complex, Uyo, Akwa Ibom State, Nigeria.</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-[#C7A349] shrink-0" />
              <span>+234 (0) 85 200 450 | +234 (0) 802 345 6789</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-[#C7A349] shrink-0" />
              <span>info@culture.akwaibomstate.gov.ng | grants@creative.akwaibomstate.gov.ng</span>
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links / Departments */}
        <div className="space-y-4">
          <h4 className="font-playfair text-white text-sm font-bold tracking-wider uppercase border-b border-[#C7A349]/30 pb-2">
            Departments & Parastatals
          </h4>
          <ul className="space-y-2 text-xs text-white/70">
            <li><Link href="/about" className="hover:text-[#C7A349] transition-colors">Department of Cultural Heritage & Monuments</Link></li>
            <li><Link href="/about" className="hover:text-[#C7A349] transition-colors">Akwa Ibom State Council for Arts and Culture</Link></li>
            <li><Link href="/about" className="hover:text-[#C7A349] transition-colors">Oron Maritime & Bronze Museum Board</Link></li>
            <li><Link href="/about" className="hover:text-[#C7A349] transition-colors">Ikot Ekpene Crafts & Raffia Incubation Bureau</Link></li>
            <li><Link href="/about" className="hover:text-[#C7A349] transition-colors">Ibomwood Film & Creative Media Board</Link></li>
            <li><Link href="/about" className="hover:text-[#C7A349] transition-colors">State Cultural Performing Troupe</Link></li>
          </ul>
        </div>

        {/* Column 3: E-Services & Transparency */}
        <div className="space-y-4">
          <h4 className="font-playfair text-white text-sm font-bold tracking-wider uppercase border-b border-[#C7A349]/30 pb-2">
            E-Government Services
          </h4>
          <ul className="space-y-2 text-xs text-white/70">
            <li><Link href="/citizen?tab=artist" className="hover:text-[#C7A349] transition-colors">Akwa Ibom Artist Directory Registration</Link></li>
            <li><Link href="/citizen?tab=grant" className="hover:text-[#C7A349] transition-colors">State Creative Seed Grants (Up to ₦5M)</Link></li>
            <li><Link href="/citizen?tab=permit" className="hover:text-[#C7A349] transition-colors">Festival & Public Event Hosting Permits</Link></li>
            <li><Link href="/citizen?tab=foi" className="hover:text-[#C7A349] transition-colors">Submit Freedom of Information (FOI) Request</Link></li>
            <li><Link href="/citizen?tab=complaint" className="hover:text-[#C7A349] transition-colors">Feedback, Complaints & Resolution Portal</Link></li>
            <li><Link href="/procurement" className="hover:text-[#C7A349] transition-colors">Open Tenders & Procurement Bids</Link></li>
          </ul>
        </div>

        {/* Column 4: Newsletter & Publications */}
        <div className="space-y-4">
          <h4 className="font-playfair text-white text-sm font-bold tracking-wider uppercase border-b border-[#C7A349]/30 pb-2">
            Newsletter & Publications
          </h4>
          <p className="text-xs text-white/60">
            Subscribe to our weekly news bulletin for announcements on creative funds, state festivals, and youth development opportunities.
          </p>
          
          {subscribed ? (
            <div className="flex items-center gap-2 text-xs text-green-400 bg-green-500/10 border border-green-500/30 p-3 rounded">
              <CheckCircle size={16} />
              <span>Subscription successful! Thank you.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full bg-white/10 text-white border border-white/20 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C7A349]"
              />
              <button 
                type="submit"
                className="bg-[#C7A349] text-white hover:bg-[#b08e3d] rounded px-3 py-2 text-xs transition-colors flex items-center justify-center"
                aria-label="Subscribe button"
              >
                <Send size={14} />
              </button>
            </form>
          )}
          
          <div className="pt-2">
            <h5 className="text-xs font-semibold opacity-90 mb-1">Download Center</h5>
            <div className="flex flex-wrap gap-2">
              <a href="#" className="text-[10px] bg-white/10 hover:bg-white/20 border border-white/15 px-2.5 py-1 rounded text-white font-medium transition-all">Akwa Ibom Creative Blueprint (PDF)</a>
              <a href="#" className="text-[10px] bg-white/10 hover:bg-white/20 border border-white/15 px-2.5 py-1 rounded text-white font-medium transition-all">State Cultural Policy (PDF)</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mx-auto max-w-7xl px-4 mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/50 gap-4">
        <div>
          © {new Date().getFullYear()} Ministry of Arts, Culture & Creative Economy Akwa Ibom State. All Rights Reserved.
        </div>
        <div className="flex flex-wrap gap-6">
          <Link href="/about" className="hover:underline">Ministry Leadership</Link>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <span className="text-[#C7A349] font-semibold">Government of Akwa Ibom State</span>
        </div>
      </div>
    </footer>
  );
}
