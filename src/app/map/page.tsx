'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getStateCulturalData, CULTURAL_STATES } from '@/lib/db';
import { useApp } from '@/components/AppContext';
import { Map, Info, Volume2, Search, Landmark, Award, ShieldAlert } from 'lucide-react';

const STATE_LIST = [
  "Uyo", "Ikot Ekpene", "Oron", "Eket", "Ikot Abasi", "Itu", "Ibiono Ibom"
];

const REGIONS = [
  { name: "Akwa Ibom North-East", label: "Uyo Senatorial District", color: "bg-emerald-800 border-emerald-900" },
  { name: "Akwa Ibom North-West", label: "Ikot Ekpene Senatorial District", color: "bg-teal-800 border-teal-900" },
  { name: "Akwa Ibom South", label: "Eket Senatorial District", color: "bg-amber-700 border-amber-800" }
];

export default function CulturalMapPage() {
  const { t, speak } = useApp();
  const [selectedState, setSelectedState] = useState('Uyo');
  const [searchQuery, setSearchQuery] = useState('');

  const stateData = getStateCulturalData(selectedState);

  // Filter states based on query
  const filteredStates = STATE_LIST.filter(st => 
    st.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStateClick = (stateName: string) => {
    setSelectedState(stateName);
    const data = getStateCulturalData(stateName);
    speak(`${stateName} Local Government Area. Headquarters is ${data.capital}. ${data.folklore}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      
      {/* Title & Introduction */}
      <motion.div 
        className="text-center space-y-3 max-w-2xl mx-auto font-outfit"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-1.5 text-gov-gold bg-gov-gold/10 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
          <Map size={14} /> Geographical Heritage
        </div>
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gov-navy">
          Interactive LGA Cultural Map
        </h1>
        <p className="text-xs text-gray-500">
          Click any Local Government Area on the map or select from the index directory below to discover localized traditional clothing, gastronomy, dialects, and historic landmarks.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Map Visualizer and State Directories (Col span 7) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Map Grid / Graphical Layout */}
          <motion.div 
            className="bg-white border border-gov-gold/20 rounded-xl p-6 shadow-md space-y-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-playfair text-sm font-bold text-gov-navy border-b border-gray-100 pb-2">
              Akwa Ibom Senatorial Districts & Cultural Zones
            </h3>
            
            {/* Visual Region Zones (Mock representation of States layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {REGIONS.map((region) => {
                // Find states in this region
                const statesInRegion = STATE_LIST.filter(st => {
                  if (region.name === "Akwa Ibom North-East") return ["Uyo", "Itu", "Ibiono Ibom"].includes(st);
                  if (region.name === "Akwa Ibom North-West") return ["Ikot Ekpene"].includes(st);
                  if (region.name === "Akwa Ibom South") return ["Oron", "Eket", "Ikot Abasi"].includes(st);
                  return false;
                });

                return (
                  <motion.div 
                    key={region.name} 
                    className="border border-gray-150 rounded p-4 bg-gray-50 flex flex-col justify-between"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="mb-3">
                      <span className="text-[9px] font-bold text-gov-gold uppercase tracking-wide block">District Zone</span>
                      <span className="text-[11px] font-bold text-gov-navy block font-playfair">{region.label}</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {statesInRegion.map(st => (
                        <button
                          key={st}
                          onClick={() => handleStateClick(st)}
                          className={`text-left text-[11px] px-3 py-2 rounded font-semibold transition-all ${
                            selectedState === st 
                              ? 'bg-gov-green text-white shadow' 
                              : 'bg-white text-gray-700 hover:bg-gov-cream border border-gray-200'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="text-[10px] text-gray-400 italic text-center font-outfit">
              *Map zones represent the three senatorial districts of Akwa Ibom State.
            </div>
          </motion.div>

          {/* Searchable State Directory */}
          <motion.div 
            className="bg-white border border-gov-gold/20 rounded-xl p-6 shadow-md space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-150 rounded px-3 py-2">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search local government areas (e.g. Uyo, Ikot Ekpene, Oron)..."
                className="w-full bg-transparent text-xs focus:outline-none text-gray-700 font-outfit"
              />
            </div>
            
            <div className="h-44 overflow-y-auto border border-gray-100 rounded p-3 flex flex-wrap gap-1.5">
              {filteredStates.map((st) => (
                <button
                  key={st}
                  onClick={() => handleStateClick(st)}
                  className={`text-xs px-3 py-2 rounded transition-all font-medium ${
                    selectedState === st
                      ? 'bg-gov-gold text-white font-bold'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {st}
                </button>
              ))}
              {filteredStates.length === 0 && (
                <div className="text-xs text-gray-400 italic p-4 w-full text-center">No LGA matches your search.</div>
              )}
            </div>
          </motion.div>

        </div>

        {/* RIGHT COLUMN: Cultural Details Display Panel (Col span 5) */}
        <motion.div 
          className="lg:col-span-5 bg-white border-2 border-gov-gold/30 rounded-xl p-6 shadow-xl space-y-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="border-b border-gray-100 pb-4 space-y-1">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] bg-gov-green/10 text-gov-green font-bold px-2 py-0.5 rounded uppercase tracking-wider font-outfit">LGA Registry</span>
                <h2 className="font-playfair text-2xl font-bold text-gov-green mt-1">{stateData.name} LGA</h2>
              </div>
              <button 
                onClick={() => speak(`${stateData.name} Local Government Area, capital is ${stateData.capital}. ${stateData.folklore}`)}
                className="p-2 rounded-full bg-gov-cream hover:bg-gov-gold/20 text-gov-green transition-all"
                title="Speak details"
              >
                <Volume2 size={18} />
              </button>
            </div>
            <p className="text-xs text-gray-500 font-semibold font-outfit">Headquarters: {stateData.capital}</p>
          </div>

          {/* Details sections */}
          <div className="space-y-4 text-xs font-outfit leading-relaxed">
            
            {/* Traditional Attire */}
            <div className="space-y-1 p-3 bg-gray-50 rounded border border-gray-100">
              <h4 className="font-bold text-gov-navy flex items-center gap-1.5 font-playfair text-sm">
                <Award size={14} className="text-[#C7A349]" />
                Traditional Clothing & Textiles
              </h4>
              <p className="text-gov-green font-semibold">{stateData.attire}</p>
              <p className="text-gray-500 text-[11px] mt-0.5">{stateData.attireDesc}</p>
            </div>

            {/* Local Cuisine */}
            <div className="space-y-1 p-3 bg-gray-50 rounded border border-gray-100">
              <h4 className="font-bold text-gov-navy flex items-center gap-1.5 font-playfair text-sm">
                <Award size={14} className="text-[#C7A349]" />
                Gastronomy & Local Cuisine
              </h4>
              <p className="text-gov-green font-semibold">{stateData.cuisine}</p>
              <p className="text-gray-500 text-[11px] mt-0.5">{stateData.cuisineDesc}</p>
            </div>

            {/* Languages */}
            <div className="space-y-1">
              <h4 className="font-bold text-gov-navy font-playfair text-sm">Languages Spoken</h4>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {stateData.languages.map((lang) => (
                  <span key={lang} className="bg-gov-green/10 text-gov-green text-[10px] font-bold px-2 py-0.5 rounded">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Folklore */}
            <div className="space-y-1 border-t border-gray-100 pt-3">
              <h4 className="font-bold text-gov-navy font-playfair text-sm">Folklore & Traditions</h4>
              <p className="text-gray-600 text-[11px]">{stateData.folklore}</p>
            </div>

            {/* UNESCO Sites */}
            {stateData.unescoSites.length > 0 && (
              <div className="space-y-1 pt-2 border-t border-gray-100">
                <h4 className="font-bold text-gov-gold flex items-center gap-1 font-playfair text-sm">
                  <Landmark size={12} /> Local Historical Landmarks
                </h4>
                <ul className="list-disc pl-4 text-gray-600 text-[11px] space-y-0.5">
                  {stateData.unescoSites.map(site => (
                    <li key={site}>{site}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Local Museums */}
            {stateData.museums.length > 0 && (
              <div className="space-y-1 pt-2 border-t border-gray-100">
                <h4 className="font-bold text-gov-navy flex items-center gap-1 font-playfair text-sm">
                  <Landmark size={12} /> Local Museums & Galleries
                </h4>
                <ul className="list-disc pl-4 text-gray-600 text-[11px] space-y-0.5">
                  {stateData.museums.map(mus => (
                    <li key={mus}>{mus}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          <div className="pt-4 border-t border-gray-100">
            <Link
              href="/museum"
              className="w-full bg-gov-green hover:bg-gov-darkgreen text-white font-bold text-xs py-3 rounded text-center block transition-all shadow glow-btn"
            >
              Examine Artifact Collections
            </Link>
          </div>
        </motion.div>
      </div>

      {/* SECTION 5: GEOGRAPHICAL HERITAGE PRESERVATION CHARTER */}
      <motion.section 
        className="bg-gov-navy text-white p-6 md:p-8 rounded-xl border border-gov-gold/15 space-y-6 font-outfit"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 bg-gov-gold/20 text-gov-gold rounded flex items-center justify-center shrink-0">
            <ShieldAlert size={22} />
          </div>
          <div className="space-y-2">
            <h3 className="font-playfair text-lg font-bold text-gov-gold">State Heritage & Antiquities Preservation Charter</h3>
            <p className="text-xs text-white/80 leading-relaxed">
              Under Akwa Ibom State Cultural Antiquities Laws, all structural ruins, Oron ancestral Ekpu carvings, and historic monuments located in Uyo, Ikot Ekpene, Oron, and Eket Senatorial Districts receive active government protection.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs pt-2">
          <div className="space-y-1.5 border-l-2 border-gov-gold/40 pl-4">
            <h4 className="font-bold text-gov-cream font-playfair">1. Reporting Excavations</h4>
            <p className="text-white/70 leading-relaxed text-[11px]">
              Any accidental discovery of ancient carvings or bronzes during construction in any LGA must be immediately reported to the Ministry Heritage Board.
            </p>
          </div>

          <div className="space-y-1.5 border-l-2 border-gov-gold/40 pl-4">
            <h4 className="font-bold text-gov-cream font-playfair">2. Export Bans</h4>
            <p className="text-white/70 leading-relaxed text-[11px]">
              The illegal purchase, sale, or transportation of returned Oron carvings or heritage textiles out of state boundaries is punishable under federal conservation codes.
            </p>
          </div>

          <div className="space-y-1.5 border-l-2 border-gov-gold/40 pl-4">
            <h4 className="font-bold text-gov-cream font-playfair">3. Structural Preservation</h4>
            <p className="text-white/70 leading-relaxed text-[11px]">
              Ancient structural sites (like colonial cottages in Ikot Abasi or Oron Maritime galleries) must retain their visual facades without ad-hoc alterations.
            </p>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
