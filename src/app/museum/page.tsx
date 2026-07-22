'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/components/AppContext';
import { Landmark, Compass, Eye, ShieldAlert, Sparkles, ChevronLeft, ChevronRight, Info, Heart, Volume2 } from 'lucide-react';

const ARTIFACTS = [
  {
    id: "art-ekpu-1",
    title: "Oron Ancestral Wooden Carving (Ekpu)",
    origin: "Oron Local Government Area",
    period: "circa 17th - 18th Century",
    status: "Returned from European Collection, housed in Oron Maritime Museum",
    description: "Extremely rare wooden ancestral carving (Ekpu) representing a deceased elder patriarch of the Oron people. Carved from heavy ironwood, it depicts chieftaincy attributes like facial scarification and decorative ceremonial hats. These wood carvings are among the oldest in Sub-Saharan Africa.",
    imageUrl: "https://res.cloudinary.com/duweg8kpv/image/upload/v1784680642/raggi_gdclip.jpg"
  },
  {
    id: "art-raffia-1",
    title: "Annang Ceremonial Raffia Mask",
    origin: "Ikot Ekpene (Raffia City)",
    period: "Mid 20th Century",
    status: "Archived in Ikot Ekpene Incubation Gallery",
    description: "A traditional ceremonial mask featuring complex patterns of natural dyed raffia fibers woven directly into the wooden framework. Used during Annang agricultural harvest dances and warrior rituals to invoke protective spirits.",
    imageUrl: "https://res.cloudinary.com/duweg8kpv/image/upload/v1784680389/acul_qlpjij.jpg"
  },
  {
    id: "art-ekpe-1",
    title: "Ekpe Society Ceremonial Regalia & Staff",
    origin: "Ibiono Ibom / Uyo Nation",
    period: "Late 19th Century",
    status: "Ibom Cultural Center Archives",
    description: "A display of the sacred secret society regalia, including detailed embroidered black and red cloths bearing Nsibidi writing symbols. It is accompanied by a heavy brass-encrusted chieftaincy staff of authority.",
    imageUrl: "https://res.cloudinary.com/duweg8kpv/image/upload/v1784680383/bbc_rpgzcd.jpg"
  }
];

export default function VirtualMuseumPage() {
  const { speak } = useApp();
  const [activeIdx, setActiveIdx] = useState(0);
  const [panAngle, setPanAngle] = useState(0); // simulation angle (degrees)
  const [hotspotInfo, setHotspotInfo] = useState<string | null>(null);

  const activeArtifact = ARTIFACTS[activeIdx];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % ARTIFACTS.length);
    setHotspotInfo(null);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + ARTIFACTS.length) % ARTIFACTS.length);
    setHotspotInfo(null);
  };

  const panLeft = () => {
    setPanAngle(prev => (prev - 15) % 360);
  };

  const panRight = () => {
    setPanAngle(prev => (prev + 15) % 360);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      
      {/* Title */}
      <motion.div 
        className="text-center space-y-3 max-w-2xl mx-auto font-outfit"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-1.5 text-gov-gold bg-gov-gold/10 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
          <Landmark size={14} /> Digital Gallery Archives
        </div>
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gov-navy">
          Virtual Museum & Artifact Center
        </h1>
        <p className="text-xs text-gray-500">
          Step into our high-definition virtual collections to inspect returned treasures and interact with 360° panoramas of the National Museum halls.
        </p>
      </motion.div>

      {/* SECTION 1: SIMULATED 360 DEGREE PANORAMA VIEWER */}
      <motion.div 
        className="bg-white border border-gov-gold/20 rounded-xl p-6 shadow-md space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between items-center border-b border-gray-100 pb-3 font-outfit">
          <h3 className="font-playfair text-sm font-bold text-gov-navy flex items-center gap-1.5">
            <Compass size={18} className="text-[#C7A349]" />
            Oron Maritime Museum Gallery 360° (Simulated Tour)
          </h3>
          <span className="text-[10px] bg-green-500/10 text-green-700 font-bold px-2 py-0.5 rounded uppercase tracking-wider">Live stream online</span>
        </div>

        {/* Viewport container */}
        <div className="w-full h-80 sm:h-96 bg-gray-900 rounded-lg relative overflow-hidden flex items-center justify-center">
          
          {/* Panoramas backgrounds offset based on panAngle */}
          <div 
            className="absolute inset-0 bg-[url('https://res.cloudinary.com/duweg8kpv/image/upload/v1784675692/mu_af3yjy.jpg')] bg-cover bg-center transition-transform duration-500 ease-out opacity-60 scale-110"
            style={{ transform: `translateX(${panAngle * -1.5}px) rotateY(${panAngle * 0.1}deg)` }}
          ></div>

          {/* Golden Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent z-0"></div>

          {/* Interactive clickable Hotspots */}
          <button 
            onClick={() => setHotspotInfo("Exhibits: Returned Wooden Ekpu ancestral carvings.")}
            className="absolute z-10 h-6 w-6 rounded-full bg-[#C7A349] border-2 border-white text-white flex items-center justify-center font-bold animate-ping cursor-pointer"
            style={{ left: `${40 + (panAngle * -0.5)}%`, top: '45%' }}
            aria-label="Interactive hotspot: Ekpu carvings"
          ></button>
          
          <button 
            onClick={() => setHotspotInfo("Exhibits: Traditional Annang woven masks and regalia.")}
            className="absolute z-10 h-6 w-6 rounded-full bg-[#0B5E3C] border-2 border-white text-white flex items-center justify-center font-bold animate-pulse cursor-pointer"
            style={{ left: `${70 + (panAngle * -0.5)}%`, top: '35%' }}
            aria-label="Interactive hotspot: Annang masks"
          ></button>

          {/* Hotspot details layer */}
          <AnimatePresence>
            {hotspotInfo && (
              <motion.div 
                className="absolute top-4 left-4 right-4 bg-gov-navy/95 text-white p-3 rounded border border-gov-gold/30 text-xs z-20 flex justify-between items-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <span className="font-semibold font-outfit">{hotspotInfo}</span>
                <button onClick={() => setHotspotInfo(null)} className="text-gov-gold font-bold hover:underline ml-2 cursor-pointer font-outfit">Close</button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom control panel overlay */}
          <div className="absolute bottom-4 z-20 flex gap-4">
            <button 
              onClick={panLeft}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full p-2 transition-all cursor-pointer"
              aria-label="Pan left"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="bg-gov-navy/90 text-white border border-gov-gold/30 text-[10px] font-bold px-4 py-2 rounded flex items-center gap-1.5 select-none uppercase tracking-wider font-outfit">
              <Compass size={12} className="text-[#C7A349] animate-spin-slow" /> Angle: {panAngle}°
            </span>
            <button 
              onClick={panRight}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full p-2 transition-all cursor-pointer"
              aria-label="Pan right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* SECTION 2: DIGITAL ARTIFACT ARCHIVE SLIDER */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gov-cream p-6 md:p-8 rounded-xl border border-gov-gold/15"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        
        {/* Artifact details pane (Col span 7) */}
        <div className="lg:col-span-7 space-y-4 font-outfit">
          <div className="space-y-1">
            <span className="text-[9px] bg-gov-gold/20 text-[#0B5E3C] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Artifact {activeIdx + 1} of {ARTIFACTS.length}</span>
            <h2 className="font-playfair text-2xl font-bold text-gov-navy leading-tight">{activeArtifact.title}</h2>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-500 pt-1">
              <span>LGA: {activeArtifact.origin}</span>
              <span>•</span>
              <span>Period: {activeArtifact.period}</span>
            </div>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed">
            {activeArtifact.description}
          </p>

          <div className="p-3 bg-white border border-gov-gold/20 text-xs rounded-lg flex items-center gap-2 text-gov-green font-bold shadow-sm">
            <Sparkles size={16} className="text-gov-gold shrink-0 animate-pulse" />
            <span>Repository Status: {activeArtifact.status}</span>
          </div>

          <div className="flex gap-2 pt-2">
            <button 
              onClick={handlePrev}
              className="bg-gov-green hover:bg-gov-darkgreen text-white p-2.5 rounded shadow transition-all cursor-pointer"
              aria-label="Previous artifact"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={handleNext}
              className="bg-gov-green hover:bg-gov-darkgreen text-white p-2.5 rounded shadow transition-all cursor-pointer"
              aria-label="Next artifact"
            >
              <ChevronRight size={16} />
            </button>
            <button 
              onClick={() => speak(`${activeArtifact.title}. From ${activeArtifact.origin}. ${activeArtifact.description}`)}
              className="border border-gov-green hover:bg-gov-green/10 text-gov-green px-5 py-2 rounded text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
            >
              <Volume2 size={14} /> Play Narrative Audio
            </button>
          </div>
        </div>

        {/* High resolution render visualization (Col span 5) */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="absolute inset-0 bg-[#0B5E3C]/10 rounded-2xl rotate-2 border border-gov-gold/25"></div>
          <motion.div 
            className="relative z-10 w-full max-w-[340px] aspect-square rounded-2xl border-4 border-white shadow-2xl bg-cover bg-center"
            style={{ backgroundImage: `url(${activeArtifact.imageUrl})` }}
            key={activeArtifact.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          ></motion.div>
        </div>

      </motion.div>

      {/* SECTION 4: ARCHAEOLOGICAL EXCAVATION HISTORY TIMELINE */}
      <motion.section 
        className="bg-white border border-gray-150 p-6 md:p-8 rounded-xl shadow-md space-y-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-[10px] text-gov-gold uppercase tracking-wider font-bold">Research Chronicles</span>
          <h2 className="font-playfair text-xl sm:text-2xl font-bold text-gov-navy">History of Oron Archaeological Excavations</h2>
          <p className="text-[11px] text-gray-500 leading-relaxed font-outfit">
            Tracing the discovery, preservation, and global repatriation efforts of the iconic Oron ancestral wooden Ekpu carvings.
          </p>
        </div>

        <div className="relative border-l border-gov-gold/30 ml-4 md:ml-10 space-y-6 font-outfit text-xs">
          <div className="relative pl-6 md:pl-8">
            <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-gov-green border-2 border-white -translate-x-1.5 shadow"></span>
            <span className="font-bold text-gov-navy block">Pre-1900s: Traditional Preservation</span>
            <p className="text-gray-600 mt-1">Ekpu carvings were carefully preserved in ancestral lineage shrines across Oron, representing living links to lineage elders.</p>
          </div>

          <div className="relative pl-6 md:pl-8">
            <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-gov-gold border-2 border-white -translate-x-1.5 shadow"></span>
            <span className="font-bold text-gov-navy block">1945: The Kenneth Murray Cataloging</span>
            <p className="text-gray-600 mt-1">Kenneth Murray, Nigeria&apos;s first surveyor of antiquities, catalogs over 600 unique wooden sculptures, highlighting their global artistic significance.</p>
          </div>

          <div className="relative pl-6 md:pl-8">
            <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-gov-green border-2 border-white -translate-x-1.5 shadow"></span>
            <span className="font-bold text-gov-navy block">1959: Museum Commissioning</span>
            <p className="text-gray-600 mt-1">The official Oron Maritime Museum is built to house the collections, under global archaeological conservation standards.</p>
          </div>

          <div className="relative pl-6 md:pl-8">
            <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-gov-gold border-2 border-white -translate-x-1.5 shadow"></span>
            <span className="font-bold text-gov-navy block">2020-Present: Global Repatriation</span>
            <p className="text-gray-600 mt-1">The ministry, in collaboration with the National Commission for Museums and Monuments, coordinates the return of stolen antiquities from international museums.</p>
          </div>
        </div>
      </motion.section>

      {/* SECTION 5: VIRTUAL MUSEUM VISITOR GUIDELINES */}
      <motion.section 
        className="bg-gov-navy text-white p-6 md:p-8 rounded-xl border border-gov-gold/15 space-y-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between font-outfit">
          <div className="space-y-2">
            <h3 className="font-playfair text-lg font-bold text-gov-gold flex items-center gap-1.5">
              <Info size={20} /> Visitor Policy & Photo Clearances
            </h3>
            <p className="text-xs text-white/70 max-w-2xl leading-relaxed">
              Visiting the physical galleries in Oron and Uyo requires booking credentials. Educational tours and commercial photography require explicit permits which can be submitted via the Citizen Portal.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-center min-w-[100px]">
              <span className="text-[9px] text-gov-gold block font-semibold uppercase">Hours</span>
              <span className="text-xs font-bold font-mono">09:00 - 17:00</span>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-center min-w-[100px]">
              <span className="text-[9px] text-gov-gold block font-semibold uppercase">Days</span>
              <span className="text-xs font-bold">Mon - Sat</span>
            </div>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
