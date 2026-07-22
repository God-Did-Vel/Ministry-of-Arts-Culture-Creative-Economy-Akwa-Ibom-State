'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { dbBridge } from '@/lib/db';
import { useApp } from '@/components/AppContext';
import { 
  Award, Landmark, Calendar, FileText, ChevronRight, Download, Music, 
  Map, Film, Globe, Coffee, Volume2, Sparkles, BookOpen, Clock, Heart, Users
} from 'lucide-react';

export default function HomePage() {
  const { t, language, speak } = useApp();
  
  // States for DB contents
  const [stats, setStats] = useState<any>({
    artistsCount: 130,
    grantsCount: 43,
    permitsCount: 90,
    revenue: 125000,
    bidsCount: 11,
    pendingRequests: 2
  });
  const [news, setNews] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  
  // Interactive UI state hooks
  const [activeCuisine, setActiveCuisine] = useState('afang');
  const [activeAttire, setActiveAttire] = useState('onyonyo');
  const [activeLangPhrase, setActiveLangPhrase] = useState('welcome');
  const [speechBubbleText, setSpeechBubbleText] = useState('Select a phrase below to hear it in different indigenous languages!');
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  // Fetch stats, news, and events
  useEffect(() => {
    async function loadData() {
      const dbStats = await dbBridge.getDashboardStats();
      const dbNews = await dbBridge.getNews();
      const dbEvents = await dbBridge.getEvents();
      
      if (dbStats) setStats(dbStats);
      if (dbNews) setNews(dbNews);
      if (dbEvents) setEvents(dbEvents);
    }
    loadData();
  }, []);

  // 11. Indigenous Phrases Transference Data (Akwa Ibom translations)
  const LANG_PHRASES = {
    welcome: {
      en: "Welcome",
      ib: "Mmedi",
      an: "Amesọkọ",
      or: "Mmedi ooo"
    },
    heritage: {
      en: "Our Culture is Our Wealth",
      ib: "Nketa nnyin edi inyene",
      an: "Nketa nnyin edi inyene",
      or: "Nketa nnyin edi inyene"
    },
    peace: {
      en: "Peace and Unity",
      ib: "Emem ye nsobo",
      an: "Emem ye nsobo",
      or: "Emem ye nsobo"
    }
  };

  const handleLanguagePhraseClick = (phraseKey: 'welcome' | 'heritage' | 'peace', targetLang: 'en' | 'ib' | 'an' | 'or') => {
    const text = LANG_PHRASES[phraseKey][targetLang];
    setActiveLangPhrase(phraseKey);
    setSpeechBubbleText(`"${text}" in ${targetLang === 'en' ? 'English' : targetLang === 'ib' ? 'Ibibio' : targetLang === 'an' ? 'Annang' : 'Oron'}`);
    speak(text);
  };

  const handleBookEvent = async (eventId: string, eventTitle: string) => {
    const updated = await dbBridge.registerEventAttendance(eventId);
    if (updated) {
      setBookingSuccess(`Successfully booked ticket for "${eventTitle}"! A digital copy has been simulated to your citizen account.`);
      // reload events
      const dbEvents = await dbBridge.getEvents();
      if (dbEvents) setEvents(dbEvents);
      setTimeout(() => setBookingSuccess(null), 5000);
    }
  };

  return (
    <div className="w-full space-y-20 pb-20 overflow-hidden">
      
      {/* SECTION 1: HERO SECTION */}
      <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden bg-gov-navy text-white">
        {/* Cinematic Backdrop Image Slideshow Mock */}
        <div className="absolute inset-0 z-0 opacity-45 bg-[url('https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center mix-blend-luminosity"></div>
        {/* Golden Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-gov-navy via-gov-navy/70 to-transparent"></div>
        
        <motion.div 
          className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gov-gold/40 bg-gov-gold/10 text-gov-gold text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={12} /> Akwa Ibom State Government • The Land of Promise
          </div>
          
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-gov-cream leading-tight">
            Preserving Our Heritage.<br />
            <span className="text-gov-gold">Empowering Creativity.</span><br />
            Building the Future.
          </h1>
          
          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-white/80 leading-relaxed font-outfit mt-[-2px]">
            Welcome to the official digital portal of the Akwa Ibom State Ministry of Arts, Culture & Creative Economy. We foster the preservation of our golden heritage while powering local creative industries and digital culture exports.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-[-20px]">
            <Link 
              href="/citizen" 
              className="bg-[#C7A349] hover:bg-[#b08e3d] text-white font-bold px-6 py-3 rounded shadow-lg transition-all flex items-center justify-center gap-2 text-xs sm:text-sm glow-btn"
            >
              Explore Services <ChevronRight size={16} />
            </Link>
            <Link 
              href="/about" 
              className="border border-white/30 hover:bg-white/10 text-white font-bold px-6 py-3 rounded transition-all text-xs sm:text-sm"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
        
        {/* Elegant Bottom Angle Cut */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#FAF8F5] clip-path-hero"></div>
      </section>

      {/* SECTION 2: LIVE STATISTICS COUNTERS */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-6 gap-4 bg-white border border-gov-gold/20 p-6 md:p-8 rounded-xl shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center space-y-1 border-r border-gray-100 last:border-0 pr-2">
            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gov-green">{stats.artistsCount}+</div>
            <div className="text-[9px] md:text-xs font-bold text-gray-500 uppercase tracking-wider">Registered Artists</div>
          </div>
          <div className="text-center space-y-1 border-r border-gray-100 last:border-0 pr-2">
            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gov-green">89+</div>
            <div className="text-[9px] md:text-xs font-bold text-gray-500 uppercase tracking-wider">Museums Open</div>
          </div>
          <div className="text-center space-y-1 border-r border-gray-100 last:border-0 pr-2">
            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gov-green">14</div>
            <div className="text-[9px] md:text-xs font-bold text-gray-500 uppercase tracking-wider">Heritage Sites</div>
          </div>
          <div className="text-center space-y-1 border-r border-gray-100 last:border-0 pr-2">
            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gov-green">150+</div>
            <div className="text-[9px] md:text-xs font-bold text-gray-500 uppercase tracking-wider">Annual Festivals</div>
          </div>
          <div className="text-center space-y-1 border-r border-gray-100 last:border-0 pr-2">
            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gov-green">₦{stats.grantsCount}M</div>
            <div className="text-[9px] md:text-xs font-bold text-gray-500 uppercase tracking-wider">Grants Disbursed</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gov-green">384</div>
            <div className="text-[9px] md:text-xs font-bold text-gray-500 uppercase tracking-wider">Creative Projects</div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 3: COMMISSIONER'S WELCOME */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <motion.div 
          className="lg:col-span-4 relative flex justify-center"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gov-gold/10 rounded-2xl rotate-3 border-2 border-dashed border-gov-gold/30"></div>
          {/* Commissioner Profile Frame */}
          <div className="relative z-10 w-full max-w-[320px] aspect-[4/5] rounded-2xl overflow-hidden border-4 border-gov-green shadow-xl bg-[url('https://res.cloudinary.com/duweg8kpv/image/upload/v1784574014/gfd2_ovnid9.jpg')] bg-cover bg-center"></div>
        </motion.div>
        
        <motion.div 
          className="lg:col-span-8 space-y-5"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-gov-navy leading-tight border-l-4 border-gov-gold pl-4">
            {t('welcomeTitle')}
          </h2>
          <p className="text-xs font-bold text-gov-gold uppercase tracking-widest">
            Honourable Commissioner for Arts, Culture & Creative Economy, Akwa Ibom State
          </p>
          <div className="text-xs sm:text-sm text-gray-700 space-y-4 leading-relaxed font-outfit">
            <p className="font-semibold italic">
              &quot;Our heritage is not just an archive of our past; it is the currency of our future.&quot;
            </p>
            <p>
              As the custodian of Akwa Ibom&apos;s vast cultural assets, our ministry is executing a mandate to digitalize art registries, restore historical landmarks like the Oron Maritime Museum under global conservation standards, and provide structured financial seed grants to emerging local creatives.
            </p>
            <p>
              Through this portal, citizens can register in our state artist catalog, apply for project funding, and book entrance credentials to local museums and cultural festivals. We welcome you to actively contribute to building a resilient creative economy in the Land of Promise.
            </p>
          </div>
          <div className="pt-2">
            <a 
              href="#"
              className="inline-flex items-center gap-2 border border-gov-green hover:bg-gov-green hover:text-white text-gov-green font-bold text-xs px-5 py-3 rounded transition-all shadow"
            >
              <Download size={14} /> {t('downloadSpeech')}
            </a>
          </div>
        </motion.div>
      </section>
      
      {/* SECTION 4: QUICK GOVERNMENT SERVICES (E-SERVICES) */}
      <section className="bg-gov-navy text-white py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <motion.div 
            className="text-center space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-gov-cream">{t('quickServicesTitle')}</h2>
            <p className="text-xs text-gov-gold/80 max-w-xl mx-auto">{t('quickServicesSubtitle')}</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Service Cards */}
            <motion.div 
              className="bg-white/5 border border-white/10 hover:border-gov-gold/60 p-6 rounded-lg transition-all space-y-4 luxury-card"
              whileHover={{ y: -6 }}
            >
              <div className="h-10 w-10 bg-gov-gold/10 text-gov-gold rounded flex items-center justify-center">
                <Award size={20} />
              </div>
              <h3 className="font-playfair text-lg font-bold">Artist Directory</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Submit portfolio credentials, obtain state-backed artist registry status, and generate a verified digital ID card with a secure QR code.
              </p>
              <Link href="/citizen" className="text-gov-gold text-xs font-semibold hover:underline flex items-center gap-1">
                Begin Registration <ChevronRight size={12} />
              </Link>
            </motion.div>

            <motion.div 
              className="bg-white/5 border border-white/10 hover:border-gov-gold/60 p-6 rounded-lg transition-all space-y-4 luxury-card"
              whileHover={{ y: -6 }}
            >
              <div className="h-10 w-10 bg-gov-gold/10 text-gov-gold rounded flex items-center justify-center">
                <Landmark size={20} />
              </div>
              <h3 className="font-playfair text-lg font-bold">Creative Grants</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Apply for developmental funding under the ₦50 Million state seed projects. Upload budgets, proposal outlines, and track review status.
              </p>
              <Link href="/citizen" className="text-gov-gold text-xs font-semibold hover:underline flex items-center gap-1">
                Apply For Grant <ChevronRight size={12} />
              </Link>
            </motion.div>

            <motion.div 
              className="bg-white/5 border border-white/10 hover:border-gov-gold/60 p-6 rounded-lg transition-all space-y-4 luxury-card"
              whileHover={{ y: -6 }}
            >
              <div className="h-10 w-10 bg-gov-gold/10 text-gov-gold rounded flex items-center justify-center">
                <Calendar size={20} />
              </div>
              <h3 className="font-playfair text-lg font-bold">Cultural Permits</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Apply for permissions to host cultural festivals, or submit professional museum research/filming requests online. Fast-track approvals.
              </p>
              <Link href="/citizen" className="text-gov-gold text-xs font-semibold hover:underline flex items-center gap-1">
                Obtain Permits <ChevronRight size={12} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5: INTERACTIVE MAP TEASER */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <motion.div 
          className="lg:col-span-7 space-y-5"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-gov-navy border-l-4 border-gov-gold pl-4">
            Explore Akwa Ibom&apos;s Cultural Map
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-outfit">
            Our state is home to 31 Local Government Areas and diverse cultural zones (Ibibio, Annang, Oron, Eket, and others). The ministry has compiled a detailed directory linking geographical locations to local dialects, historic monuments, traditional dress, and heritage museums.
          </p>
          <div className="p-4 bg-gov-cream border border-gov-gold/25 rounded-md flex gap-4 items-center">
            <div className="p-3 bg-gov-green text-white rounded-full">
              <Map size={24} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gov-green">Interactive Heritage Portal</h4>
              <p className="text-[11px] text-gray-500">Tap individual local government areas to view attire, cuisine, and parastatals instantly.</p>
            </div>
          </div>
          <div className="pt-2">
            <Link 
              href="/map"
              className="bg-gov-green hover:bg-gov-darkgreen text-white font-bold text-xs px-6 py-3 rounded transition-all shadow-md inline-flex items-center gap-2 glow-btn"
            >
              Open Interactive Map <ChevronRight size={14} />
            </Link>
          </div>
        </motion.div>
        
        {/* Stylized Map Preview Graphic */}
        <motion.div 
          className="lg:col-span-5 border border-gov-gold/20 rounded-xl p-8 bg-white shadow-2xl flex flex-col justify-center items-center h-[320px] relative overflow-hidden bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-[#0B5E3C]/85 z-0"></div>
          <div className="relative z-10 text-center space-y-3 text-white">
            <Globe size={48} className="mx-auto text-gov-gold animate-spin-slow" />
            <h3 className="font-playfair text-xl font-bold text-gov-cream">Akwa Ibom LGA Cultural Directory</h3>
            <p className="text-[11px] opacity-85 max-w-[280px] font-outfit">Detailed maps tracking local carvings, cuisine, oil-history beach landmarks, and museums.</p>
            <div className="pt-2">
              <span className="bg-[#C7A349] text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">31 LGAs Programmed</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 6: FEATURED NATIONAL FESTIVALS */}
      <section className="bg-gov-cream py-16 border-y border-gov-gold/15 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="space-y-1">
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-gov-navy">{t('featuredFestivals')}</h2>
              <p className="text-xs text-gray-500">Witness the sights and heritage of our state cultural celebrations.</p>
            </div>
            <Link href="/media" className="text-gov-green hover:underline text-xs font-bold flex items-center gap-1">
              View Calendar <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Festival Card 1 */}
            <motion.div 
              className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow hover:shadow-lg transition-all flex flex-col h-full luxury-card"
              whileHover={{ y: -6 }}
            >
              <div className="h-44 bg-[url('https://res.cloudinary.com/duweg8kpv/image/upload/v1784574885/annang_ekong_hmd8xp.jpg')] bg-cover bg-center"></div>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div className="space-y-1.5">
                  <span className="text-[9px] bg-gov-green/10 text-gov-green font-bold px-2 py-0.5 rounded uppercase tracking-wider">Ikot Ekpene Division</span>
                  <h3 className="font-playfair font-bold text-sm text-gov-navy">Annang Ekong Festival</h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-3">A spectacular display of Annang warrior dances, traditional drumming, and intricate wood carving exhibitions.</p>
                </div>
                <div className="border-t border-gray-100 pt-3 mt-4 text-[10px] text-gray-400 flex justify-between">
                  <span>Frequency: Annual</span>
                  <span>Zone: Annang</span>
                </div>
              </div>
            </motion.div>

            {/* Festival Card 2 */}
            <motion.div 
              className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow hover:shadow-lg transition-all flex flex-col h-full luxury-card"
              whileHover={{ y: -6 }}
            >
              <div className="h-44 bg-[url('https://res.cloudinary.com/duweg8kpv/image/upload/v1784574887/ekpe_yucx09.jpg')] bg-cover bg-center"></div>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div className="space-y-1.5">
                  <span className="text-[9px] bg-gov-green/10 text-gov-green font-bold px-2 py-0.5 rounded uppercase tracking-wider">Uyo Senatorial District</span>
                  <h3 className="font-playfair font-bold text-sm text-gov-navy">Ekpe Cultural Fiesta</h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-3">Historic gathering celebrating the ancient Ekpe Sacred Secret Society, featuring authentic masquerades and Nsibidi symbols.</p>
                </div>
                <div className="border-t border-gray-100 pt-3 mt-4 text-[10px] text-gray-400 flex justify-between">
                  <span>Frequency: Seasonal</span>
                  <span>Zone: Ibibio / Efik</span>
                </div>
              </div>
            </motion.div>

            {/* Festival Card 3 */}
            <motion.div 
              className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow hover:shadow-lg transition-all flex flex-col h-full luxury-card"
              whileHover={{ y: -6 }}
            >
              <div className="h-44 bg-[url('https://res.cloudinary.com/duweg8kpv/image/upload/v1784574886/boot_gjn16u.jpg')] bg-cover bg-center"></div>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div className="space-y-1.5">
                  <span className="text-[9px] bg-gov-green/10 text-gov-green font-bold px-2 py-0.5 rounded uppercase tracking-wider">Oron Nation coastal</span>
                  <h3 className="font-playfair font-bold text-sm text-gov-navy">Oron Boat Regatta</h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-3">High-energy river canoe racing and traditional maritime choreography on the cross-river estuary.</p>
                </div>
                <div className="border-t border-gray-100 pt-3 mt-4 text-[10px] text-gray-400 flex justify-between">
                  <span>Frequency: Dec (Annual)</span>
                  <span>Zone: Oron</span>
                </div>
              </div>
            </motion.div>

            {/* Festival Card 4 */}
            <motion.div 
              className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow hover:shadow-lg transition-all flex flex-col h-full luxury-card"
              whileHover={{ y: -6 }}
            >
              <div className="h-44 bg-[url('https://res.cloudinary.com/duweg8kpv/image/upload/v1784574886/eket_f_aj6xfq.jpg')] bg-cover bg-center"></div>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div className="space-y-1.5">
                  <span className="text-[9px] bg-gov-green/10 text-gov-green font-bold px-2 py-0.5 rounded uppercase tracking-wider">Eket Divisional Area</span>
                  <h3 className="font-playfair font-bold text-sm text-gov-navy">Mbomm Festival</h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-3">An annual purification and harvest celebration featuring traditional dances, community feasts, and local storytelling.</p>
                </div>
                <div className="border-t border-gray-100 pt-3 mt-4 text-[10px] text-gray-400 flex justify-between">
                  <span>Frequency: Nov (Annual)</span>
                  <span>Zone: Eket</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 7: HISTORIC CULTURAL SITES SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 space-y-10">
        <motion.div 
          className="text-center space-y-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-gov-navy border-b-2 border-gov-gold/30 pb-3 max-w-sm mx-auto">
            State Historical Landmarks
          </h2>
          <p className="text-xs text-gray-500">Important heritage monuments in Akwa Ibom State</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Site 1: Mary Slessor cottage */}
          <motion.div 
            className="bg-white border border-gray-100 rounded-lg p-6 flex flex-col md:flex-row gap-6 shadow-md items-center luxury-card"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full md:w-40 aspect-square bg-[url('https://res.cloudinary.com/duweg8kpv/image/upload/v1784575385/marry_wvidkv.jpg')] bg-cover bg-center rounded-lg shrink-0"></div>
            <div className="space-y-3">
              <h3 className="font-playfair text-lg font-bold text-gov-green">Mary Slessor Cottage (Itu)</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-outfit">
                Located in Itu, this historical mission cottage houses artifacts from the life of Mary Slessor, who famously saved twin babies from local superstitious killings, leaving a legacy of peace and humanity.
              </p>
              <div className="flex gap-2">
                <span className="text-[9px] bg-gov-gold/15 text-gov-gold font-bold px-2 py-0.5 rounded">Colonial Era</span>
                <span className="text-[9px] bg-gov-green/10 text-gov-green font-bold px-2 py-0.5 rounded">Type: Cottage & Museum</span>
              </div>
            </div>
          </motion.div>

          {/* Site 2: Bridge of No Return */}
          <motion.div 
            className="bg-white border border-gray-100 rounded-lg p-6 flex flex-col md:flex-row gap-6 shadow-md items-center luxury-card"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-full md:w-40 aspect-square bg-[url('https://res.cloudinary.com/duweg8kpv/image/upload/v1784575385/brigde_g88hds.jpg')] bg-cover bg-center rounded-lg shrink-0"></div>
            <div className="space-y-3">
              <h3 className="font-playfair text-lg font-bold text-gov-green">Bridge of No Return (Ikot Abasi)</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-outfit">
                The historical concrete jetty in Ikot Abasi where captured slaves were loaded onto waiting European ships, standing today as a solemn memorial of historical resilience and the trade era.
              </p>
              <div className="flex gap-2">
                <span className="text-[9px] bg-gov-gold/15 text-gov-gold font-bold px-2 py-0.5 rounded">Slave Trade Era</span>
                <span className="text-[9px] bg-gov-green/10 text-gov-green font-bold px-2 py-0.5 rounded">Type: Memorial & Jetty</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 8: CREATIVE ECONOMY EXPORTS */}
      <section className="bg-gov-navy text-white py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <motion.div 
            className="lg:col-span-5 space-y-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-2.5 py-0.5 rounded bg-gov-gold/20 text-gov-gold text-[10px] font-bold uppercase tracking-wider">
              Creative Industry Growth
            </div>
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-gov-cream leading-tight">
              Raffia Artistry & Ibomwood:<br />
              Preserving & Exporting
            </h2>
            <p className="text-xs text-white/70 leading-relaxed font-outfit">
              Akwa Ibom&apos;s local film industry (Ibomwood) and traditional Raffia crafts of Ikot Ekpene are leading economic and cultural exports. The Raffia City cluster employs thousands of local artisans, exporting fine woven goods worldwide.
            </p>
            <div className="pt-2 flex gap-4">
              <div className="flex items-center gap-2">
                <Film className="text-gov-gold" size={20} />
                <div>
                  <span className="block text-xs font-bold">10,000+</span>
                  <span className="text-[9px] text-white/50 block">Raffia Artisans</span>
                </div>
              </div>
              <div className="flex items-center gap-2 border-l border-white/20 pl-4">
                <Music className="text-gov-gold" size={20} />
                <div>
                  <span className="block text-xs font-bold">₦500M+</span>
                  <span className="text-[9px] text-white/50 block">Craft Exports Value</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Grid of Industry Achievements */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-white/5 rounded border border-white/10 space-y-2">
              <h3 className="text-gov-gold text-sm font-bold flex items-center gap-1.5">
                <BookOpen size={16} /> Literature & Theater
              </h3>
              <p className="text-[11px] text-white/70 font-outfit">
                Celebrating Akwa Ibom writers and dramatists. Supporting local drama networks, school reading programs, and state theater guilds.
              </p>
            </div>
            
            <div className="p-5 bg-white/5 rounded border border-white/10 space-y-2">
              <h3 className="text-gov-gold text-sm font-bold flex items-center gap-1.5">
                <Music size={16} /> State Performing Troupe
              </h3>
              <p className="text-[11px] text-white/70 font-outfit">
                The Akwa Ibom State Cultural Troupe preserves local choreography, showcasing authentic dances (like Ekombi) at national and global forums.
              </p>
            </div>

            <div className="p-5 bg-white/5 rounded border border-white/10 space-y-2">
              <h3 className="text-gov-gold text-sm font-bold flex items-center gap-1.5">
                <Award size={16} /> Raffia & Textile Weaving
              </h3>
              <p className="text-[11px] text-white/70 font-outfit">
                Promoting traditional raffia fabrics and state-themed fashion on local runways, backed by artisan weaving micro-grants and incubation centers.
              </p>
            </div>

            <div className="p-5 bg-white/5 rounded border border-white/10 space-y-2">
              <h3 className="text-gov-gold text-sm font-bold flex items-center gap-1.5">
                <Landmark size={16} /> Creative Enterprise Hubs
              </h3>
              <p className="text-[11px] text-white/70 font-outfit">
                Establishing incubation spaces in Uyo and Ikot Ekpene to equip young digital designers, craft makers, and filmmakers with tools and workspaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: CUISINE & GASTRONOMY (INTERACTIVE SELECTOR) */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <motion.div 
          className="text-center space-y-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-gov-navy border-b-2 border-gov-gold/30 pb-3 max-w-sm mx-auto">
            Akwa Ibom Gastronomy & Spices
          </h2>
          <p className="text-xs text-gray-500">Click a traditional dish below to view ingredients and cultural significance.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* List of foods */}
          <div className="md:col-span-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
            <button
              onClick={() => setActiveCuisine('afang')}
              className={`w-full p-4 rounded text-left transition-all font-bold text-xs shrink-0 flex justify-between items-center ${
                activeCuisine === 'afang' ? 'bg-gov-green text-white border-l-4 border-gov-gold' : 'bg-white border border-gray-150 text-gov-navy hover:bg-gray-50'
              }`}
            >
              <span>Afang Soup</span>
              <Coffee size={14} />
            </button>
            <button
              onClick={() => setActiveCuisine('edikang')}
              className={`w-full p-4 rounded text-left transition-all font-bold text-xs shrink-0 flex justify-between items-center ${
                activeCuisine === 'edikang' ? 'bg-gov-green text-white border-l-4 border-gov-gold' : 'bg-white border border-gray-150 text-gov-navy hover:bg-gray-50'
              }`}
            >
              <span>Edikang Ikong</span>
              <Coffee size={14} />
            </button>
            <button
              onClick={() => setActiveCuisine('ekpang')}
              className={`w-full p-4 rounded text-left transition-all font-bold text-xs shrink-0 flex justify-between items-center ${
                activeCuisine === 'ekpang' ? 'bg-gov-green text-white border-l-4 border-gov-gold' : 'bg-white border border-gray-150 text-gov-navy hover:bg-gray-50'
              }`}
            >
              <span>Ekpang Nkukwo</span>
              <Coffee size={14} />
            </button>
            <button
              onClick={() => setActiveCuisine('fisherman')}
              className={`w-full p-4 rounded text-left transition-all font-bold text-xs shrink-0 flex justify-between items-center ${
                activeCuisine === 'fisherman' ? 'bg-gov-green text-white border-l-4 border-gov-gold' : 'bg-white border border-gray-150 text-gov-navy hover:bg-gray-50'
              }`}
            >
              <span>Fisherman Soup</span>
              <Coffee size={14} />
            </button>
          </div>

          {/* Detailed food display */}
          <div className="md:col-span-8 bg-white border border-gov-gold/20 rounded-lg p-6 md:p-8 shadow-lg min-h-[220px] flex flex-col md:flex-row gap-6 items-center">
            {activeCuisine === 'afang' && (
              <>
                <div className="h-32 w-32 rounded-full bg-[url('https://res.cloudinary.com/duweg8kpv/image/upload/v1784575578/afang_wa8cnz.jpg')] bg-cover bg-center shrink-0 border-2 border-gov-gold"></div>
                <div className="space-y-3">
                  <h3 className="font-playfair text-xl font-bold text-gov-green">Afang Soup (Traditional Heritage)</h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-outfit">
                    Prepared with fresh wild Afang leaves ground very finely, paired with abundant waterleaves, periwinkles, stockfish, and mixed meat, all slow-simmered in pure red palm oil. It represents the golden hospitality of Ibibio families.
                  </p>
                  <div className="text-[10px] text-gray-500"><span className="font-bold">Key Ingredients:</span> Afang Leaves, Waterleaves, Palm Oil, Periwinkles, Stockfish.</div>
                </div>
              </>
            )}
            {activeCuisine === 'edikang' && (
              <>
                <div className="h-32 w-32 rounded-full bg-[url('https://res.cloudinary.com/duweg8kpv/image/upload/v1784576357/edikan_il88px.jpg')] bg-cover bg-center shrink-0 border-2 border-gov-gold"></div>
                <div className="space-y-3">
                  <h3 className="font-playfair text-xl font-bold text-gov-green">Edikang Ikong (Royal Delicacy)</h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-outfit">
                    A highly nutritious soup cooked with a precise balance of pumpkin leaves (Ugu) and waterleaves, seasoned with crayfish, periwinkles, and mixed meats. Traditionally served to guests during grand festivals and state occasions.
                  </p>
                  <div className="text-[10px] text-gray-500"><span className="font-bold">Key Ingredients:</span> Pumpkin Leaves, Waterleaves, Snails, Palm Oil, Crayfish.</div>
                </div>
              </>
            )}
            {activeCuisine === 'ekpang' && (
              <>
                <div className="h-32 w-32 rounded-full bg-[url('https://res.cloudinary.com/duweg8kpv/image/upload/v1784576357/ekpang_h0psyw.jpg')] bg-cover bg-center shrink-0 border-2 border-gov-gold"></div>
                <div className="space-y-3">
                  <h3 className="font-playfair text-xl font-bold text-gov-green">Ekpang Nkukwo (Maritime Stew)</h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-outfit">
                    A laborious masterpiece made of grated cocoyam and water yam wrapped in tender green cocoyam leaves, steamed with periwinkles, dry fish, and native herbs. A staple representing patience and culinary excellence.
                  </p>
                  <div className="text-[10px] text-gray-500"><span className="font-bold">Key Ingredients:</span> Grated Cocoyam, Cocoyam Leaves, Periwinkles, Palm Oil, Dry Fish.</div>
                </div>
              </>
            )}
            {activeCuisine === 'fisherman' && (
              <>
                <div className="h-32 w-32 rounded-full bg-[url('https://res.cloudinary.com/duweg8kpv/image/upload/v1784576357/fish_sxpgla.jpg')] bg-cover bg-center shrink-0 border-2 border-gov-gold"></div>
                <div className="space-y-3">
                  <h3 className="font-playfair text-xl font-bold text-gov-green">Fisherman Soup (Coastal Shorelines)</h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-outfit">
                    A spicy seafood broth made with fresh river catches (fish, crabs, prawns, periwinkles) seasoned with native spices (like Uyayak) and slightly thickened with mashed cocoyam. Celebrates the rich coastal riverine lifestyle of Oron and Ibeno.
                  </p>
                  <div className="text-[10px] text-gray-500"><span className="font-bold">Key Ingredients:</span> Fresh Fish, Ocean Crabs, Uyayak Spice, Mashed Cocoyam.</div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 10: TRADITIONAL ATTIRE & TEXTILES */}
      <section className="bg-white py-16 border-t border-gov-gold/15 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 space-y-10">
          <motion.div 
            className="text-center space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-gov-navy border-b-2 border-gov-gold/30 pb-3 max-w-sm mx-auto">
              Traditional Attire & Textiles
            </h2>
            <p className="text-xs text-gray-500">Explore Akwa Ibom&apos;s rich cultural clothing and weaving designs.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Attire 1 */}
            <div 
              onClick={() => setActiveAttire('onyonyo')}
              className={`p-5 rounded-lg border-2 text-center space-y-3 cursor-pointer transition-all ${
                activeAttire === 'onyonyo' ? 'border-gov-gold bg-gov-cream shadow' : 'border-gray-100 hover:border-gov-gold/50'
              }`}
            >
              <div className="h-32 w-full bg-[url('https://res.cloudinary.com/duweg8kpv/image/upload/v1784576861/yoyo_derk2p.jpg')] bg-cover bg-center rounded"></div>
              <h3 className="font-playfair text-sm font-bold text-gov-green">Onyonyo Dress (Women)</h3>
              <p className="text-[10px] text-gray-500 line-clamp-2">Regal Victorian-inspired floor gown adorned with heavy coral bead chokers.</p>
            </div>

            {/* Attire 2 */}
            <div 
              onClick={() => setActiveAttire('usobo')}
              className={`p-5 rounded-lg border-2 text-center space-y-3 cursor-pointer transition-all ${
                activeAttire === 'usobo' ? 'border-gov-gold bg-gov-cream shadow' : 'border-gray-100 hover:border-gov-gold/50'
              }`}
            >
              <div className="h-32 w-full bg-[url('https://res.cloudinary.com/duweg8kpv/image/upload/v1784576861/uso_qpsm8w.jpg')] bg-cover bg-center rounded"></div>
              <h3 className="font-playfair text-sm font-bold text-gov-green">Usobo Wrapper (Men)</h3>
              <p className="text-[10px] text-gray-500 line-clamp-2">Traditional wrap skirt paired with long gold-embroidered lace shirts.</p>
            </div>

            {/* Attire 3 */}
            <div 
              onClick={() => setActiveAttire('ekpe')}
              className={`p-5 rounded-lg border-2 text-center space-y-3 cursor-pointer transition-all ${
                activeAttire === 'ekpe' ? 'border-gov-gold bg-gov-cream shadow' : 'border-gray-100 hover:border-gov-gold/50'
              }`}
            >
              <div className="h-32 w-full bg-[url('https://res.cloudinary.com/duweg8kpv/image/upload/v1784576861/wovrn_p4j8uz.jpg')] bg-cover bg-center rounded"></div>
              <h3 className="font-playfair text-sm font-bold text-gov-green">Ekpe Society Regalia</h3>
              <p className="text-[10px] text-gray-500 line-clamp-2">Sacred woven patterns, leopard-skin accents, and embroidered Nsibidi script.</p>
            </div>

            {/* Attire 4 */}
            <div 
              onClick={() => setActiveAttire('raffia')}
              className={`p-5 rounded-lg border-2 text-center space-y-3 cursor-pointer transition-all ${
                activeAttire === 'raffia' ? 'border-gov-gold bg-gov-cream shadow' : 'border-gray-100 hover:border-gov-gold/50'
              }`}
            >
              <div className="h-32 w-full bg-[url('https://res.cloudinary.com/duweg8kpv/image/upload/v1784576861/eee34_our2th.jpg')] bg-cover bg-center rounded"></div>
              <h3 className="font-playfair text-sm font-bold text-gov-green">Raffia Craft Wear</h3>
              <p className="text-[10px] text-gray-500 line-clamp-2">Hand-woven raffia vestments and masks constructed in the Ikot Ekpene clusters.</p>
            </div>
          </div>

          {/* Attire Description Display */}
          <div className="bg-gov-cream border border-gov-gold/25 p-5 rounded-lg text-center max-w-2xl mx-auto">
            <h4 className="font-playfair font-bold text-gov-green text-sm">
              {activeAttire === 'onyonyo' && 'Onyonyo Dress (Women\'s Regal Wear)'}
              {activeAttire === 'usobo' && 'Usobo Wrapper (Men\'s Traditional wear)'}
              {activeAttire === 'ekpe' && 'Ekpe Chieftaincy Embroidered Regalia'}
              {activeAttire === 'raffia' && 'Raffia City Traditional Woven Vestments'}
            </h4>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed font-outfit">
              {activeAttire === 'onyonyo' && 'Victorian-inspired flowing gowns worn by women during high-status ceremonies like weddings and coronations. Typically accessorized with royal coral beads, crown pins, and staff canes, symbolizing peak dignity.'}
              {activeAttire === 'usobo' && 'A large wrapper skirt tied around the waist by men. It is usually combined with an imported white lace long shirt, a bowler hat, and a gold-headed cane, symbolizing high-status leadership.'}
              {activeAttire === 'ekpe' && 'A ceremonial dress adorned with patterns in black and red velvet representing Nsibidi script symbols. Reserved for initiations and parading masquerades of the sacred secret Ekpe society.'}
              {activeAttire === 'raffia' && 'Traditional costumes hand-woven using straw fibers extracted from local palm trees. Perfected in the artisan studios of Ikot Ekpene, these garments represent ancient textile engineering.'}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 11: FOLKLORE & NATIVE LANGUAGES SOUNDBOARD SIMULATOR */}
      <section className="max-w-7xl mx-auto px-4 bg-gov-green rounded-xl text-white p-8 md:p-12 shadow-2xl relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Volume2 size={120} />
        </div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="bg-gov-gold text-white text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">Indigenous Languages</span>
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold leading-tight">Preserving Our Dialects</h2>
            <p className="text-xs text-white/80 leading-relaxed font-outfit">
              Akwa Ibom State has rich linguistic dialects including Ibibio, Annang, Oron, and Eket. To prevent language extinction, the ministry is digitalizing speech archives. Click below to hear key phrases translated under our Accessibility Speech Synthesis.
            </p>
            
            {/* Interactive speech feedback */}
            <div className="p-4 bg-white/10 rounded border border-white/20 text-xs">
              <span className="font-bold block text-gov-gold">Reader Narration:</span>
              <p className="italic mt-1">&quot;{speechBubbleText}&quot;</p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 bg-gov-darkgreen p-6 rounded-lg border border-white/10">
            <h3 className="font-playfair text-sm font-bold text-gov-gold flex items-center gap-1.5"><Volume2 size={16} /> Tap to Pronounce:</h3>
            
            {/* Welcomes */}
            <div className="space-y-2">
              <span className="text-[10px] text-white/50 block font-semibold">Phrase: &quot;Welcome&quot;</span>
              <div className="flex gap-2">
                <button onClick={() => handleLanguagePhraseClick('welcome', 'ib')} className="flex-1 bg-white/15 hover:bg-white/25 border border-white/10 py-2 rounded text-xs transition-all font-semibold">Ibibio: Mmedi</button>
                <button onClick={() => handleLanguagePhraseClick('welcome', 'an')} className="flex-1 bg-white/15 hover:bg-white/25 border border-white/10 py-2 rounded text-xs transition-all font-semibold">Annang: Amesọkọ</button>
                <button onClick={() => handleLanguagePhraseClick('welcome', 'or')} className="flex-1 bg-white/15 hover:bg-white/25 border border-white/10 py-2 rounded text-xs transition-all font-semibold">Oron: Mmedi ooo</button>
              </div>
            </div>

            {/* Proverb */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] text-white/50 block font-semibold">Phrase: &quot;Culture is Wealth&quot;</span>
              <div className="flex gap-2">
                <button onClick={() => handleLanguagePhraseClick('heritage', 'ib')} className="flex-1 bg-white/15 hover:bg-white/25 border border-white/10 py-2 rounded text-xs transition-all font-semibold">Ibibio</button>
                <button onClick={() => handleLanguagePhraseClick('heritage', 'an')} className="flex-1 bg-white/15 hover:bg-white/25 border border-white/10 py-2 rounded text-xs transition-all font-semibold">Annang</button>
                <button onClick={() => handleLanguagePhraseClick('heritage', 'or')} className="flex-1 bg-white/15 hover:bg-white/25 border border-white/10 py-2 rounded text-xs transition-all font-semibold">Oron</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12: VIRTUAL MUSEUM TEASER */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <motion.div 
          className="lg:col-span-5 relative"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Sculpture graphic mock */}
          <div className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-gov-gold/20 shadow-2xl bg-[url('https://res.cloudinary.com/duweg8kpv/image/upload/v1784675692/mu_af3yjy.jpg')] bg-cover bg-center"></div>
          <div className="absolute -bottom-4 -right-4 bg-[#C7A349] text-white text-[10px] font-bold px-4 py-2 rounded shadow-lg uppercase tracking-wider">
            Oron Ekpu Collection
          </div>
        </motion.div>

        <motion.div 
          className="lg:col-span-7 space-y-5"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-gov-navy border-l-4 border-gov-gold pl-4">
            Virtual Museum & Ancient Carvings
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-outfit">
            The ministry has launched a 3D digital preservation portal archiving sculptures, Oron ancestral Ekpu carvings, and local bronze works. This allows citizens and researchers worldwide to inspect returned artifacts in high definition.
          </p>
          <ul className="space-y-2 text-xs text-gray-600 font-outfit">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gov-gold"></span>
              <span>3D photogrammetry scans of Oron ancestral wooden carvings.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gov-gold"></span>
              <span>Online virtual tours of the Oron Maritime Museum galleries.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gov-gold"></span>
              <span>Audio guides and historical lineage metadata records.</span>
            </li>
          </ul>
          <div className="pt-2">
            <Link 
              href="/museum"
              className="bg-gov-green hover:bg-gov-darkgreen text-white font-bold text-xs px-6 py-3 rounded transition-all shadow-md inline-flex items-center gap-2 glow-btn"
            >
              Start Virtual Tour <ChevronRight size={14} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* SECTION 13: LATEST NEWS & ANNOUNCEMENTS (CMS-DRIVEN) */}
      <section className="bg-gov-cream py-16 border-y border-gov-gold/15 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="font-playfair text-3xl font-bold text-gov-navy">{t('latestNews')}</h2>
            <p className="text-xs text-gray-500">Government notices, creative sector reports, and press updates.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.slice(0, 3).map((item) => (
              <div key={item.id} className="bg-white rounded-lg border border-gray-150 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full">
                <div>
                  <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${item.imageUrl})` }}></div>
                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-center text-[9px] font-bold text-gov-gold uppercase">
                      <span>{item.category}</span>
                      <span className="flex items-center gap-1"><Clock size={10} /> {new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h3 className="font-playfair font-bold text-sm text-gov-navy leading-snug line-clamp-2">{item.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{item.content}</p>
                  </div>
                </div>
                <div className="border-t border-gray-100 p-4 flex justify-between items-center text-[10px] text-gray-400 bg-gray-50">
                  <span>Author: {item.author}</span>
                  <Link href="/media" className="text-gov-green hover:underline font-bold">Read Full Announcement</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 14: UPCOMING CULTURAL CALENDAR & TICKET BOOKING */}
      <section className="max-w-7xl mx-auto px-4 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="font-playfair text-3xl font-bold text-gov-navy border-b-2 border-gov-gold/30 pb-3 max-w-sm mx-auto">
            Upcoming Cultural Events
          </h2>
          <p className="text-xs text-gray-500">Book free attendance tickets and generate digital invites.</p>
        </div>

        {bookingSuccess && (
          <div className="max-w-xl mx-auto p-4 bg-green-500/10 border border-green-500/30 text-green-700 text-xs rounded-lg text-center flex items-center justify-center gap-2">
            <Heart size={16} />
            <span>{bookingSuccess}</span>
          </div>
        )}

        <div className="space-y-4">
          {events.map((evt) => (
            <div 
              key={evt.id} 
              className="bg-white border border-gray-150 rounded-lg p-5 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row gap-5 items-center w-full md:w-auto">
                <div className="h-16 w-16 bg-gov-green/10 text-gov-green rounded-lg flex flex-col items-center justify-center font-playfair shrink-0">
                  <span className="text-sm font-bold">{new Date(evt.date).getDate()}</span>
                  <span className="text-[9px] uppercase font-bold">{new Date(evt.date).toLocaleString('default', { month: 'short' })}</span>
                </div>
                <div className="text-center md:text-left space-y-1">
                  <h3 className="font-playfair font-bold text-sm text-gov-navy">{evt.title}</h3>
                  <div className="text-[11px] text-gray-500 flex flex-wrap gap-x-4 justify-center md:justify-start">
                    <span>Location: {evt.location}</span>
                    <span>•</span>
                    <span>Registered: {evt.registeredCount} / {evt.capacity} Capacity</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => handleBookEvent(evt.id, evt.title)}
                className="bg-gov-gold hover:bg-gov-darkgold text-white text-xs font-bold px-5 py-2.5 rounded shrink-0 shadow transition-all w-full md:w-auto"
              >
                Register & Book Free Ticket
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 15: STRATEGIC PARTNERS GRID */}
      <section className="bg-white py-12 border-t border-gray-150">
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Affiliated Global Partners</h4>
          <div className="flex flex-wrap justify-center items-center gap-10 opacity-55">
            <span className="font-playfair font-bold text-sm text-gov-navy flex items-center gap-1.5"><Globe size={16} /> UNESCO</span>
            <span className="font-playfair font-bold text-sm text-gov-navy flex items-center gap-1.5"><Landmark size={16} /> National Commission for Museums</span>
            <span className="font-playfair font-bold text-sm text-gov-navy flex items-center gap-1.5"><Users size={16} /> Civil Society Orgs</span>
            <span className="font-playfair font-bold text-sm text-gov-navy flex items-center gap-1.5"><Award size={16} /> Creative Guilds</span>
          </div>
        </div>
      </section>
      
    </div>
  );
}
