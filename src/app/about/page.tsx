'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, Users, Award, ShieldCheck, ChevronRight, HelpCircle } from 'lucide-react';
import { useApp } from '@/components/AppContext';

export default function AboutPage() {
  const { t } = useApp();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  } as const;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-16 overflow-hidden">
      
      {/* Title */}
      <motion.div 
        className="text-center space-y-3 max-w-2xl mx-auto font-outfit"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-1.5 text-gov-gold bg-gov-gold/10 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
          <Landmark size={14} /> Ministry Leadership & Structure
        </div>
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gov-navy">
          About the Ministry
        </h1>
        <p className="text-xs text-gray-500">
          Discover our legal mandate, cultural preservation history, strategic pillars, and executive structural flowcharts.
        </p>
      </motion.div>

      {/* MISSION, VISION, MANDATE GRIDS */}
      <motion.section 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.div className="bg-white border border-gray-150 p-6 rounded-lg shadow-sm space-y-3 luxury-card" variants={itemVariants}>
          <div className="h-10 w-10 bg-gov-green/10 text-gov-green rounded flex items-center justify-center">
            <ShieldCheck size={20} />
          </div>
          <h3 className="font-playfair text-lg font-bold text-gov-navy">Our Mandate</h3>
          <p className="text-xs text-gray-600 leading-relaxed font-outfit">
            To formulate, monitor, and implement policies aimed at preserving Akwa Ibom State&apos;s rich cultural antiquities, registering local artists, and scaling creative economy exports.
          </p>
        </motion.div>

        <motion.div className="bg-white border border-gray-150 p-6 rounded-lg shadow-sm space-y-3 luxury-card" variants={itemVariants}>
          <div className="h-10 w-10 bg-gov-gold/10 text-gov-gold rounded flex items-center justify-center">
            <Award size={20} />
          </div>
          <h3 className="font-playfair text-lg font-bold text-gov-navy">Our Vision</h3>
          <p className="text-xs text-gray-600 leading-relaxed font-outfit">
            To position Akwa Ibom&apos;s heritage assets as a global gold standard for cultural diversity, making the creative sector a key contributor to the state&apos;s GDP and youth employment.
          </p>
        </motion.div>

        <motion.div className="bg-white border border-gray-150 p-6 rounded-lg shadow-sm space-y-3 luxury-card" variants={itemVariants}>
          <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded flex items-center justify-center">
            <Users size={20} />
          </div>
          <h3 className="font-playfair text-lg font-bold text-gov-navy">Our Mission</h3>
          <p className="text-xs text-gray-600 leading-relaxed font-outfit">
            Empower creative talents through grants, build digital archives of historical carvings, support local tourism centers, and restore historical monuments.
          </p>
        </motion.div>
      </motion.section>

      {/* STRATEGIC PILLARS & HISTORIC MANDATES */}
      <motion.section 
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gov-cream p-6 md:p-8 rounded-xl border border-gov-gold/15"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="lg:col-span-7 space-y-4">
          <h2 className="font-playfair text-2xl font-bold text-gov-navy border-l-4 border-gov-gold pl-4">
            Preserving History, Empowering Tomorrow
          </h2>
          <p className="text-xs text-gray-600 leading-relaxed font-outfit">
            Established as a dedicated state department, the Ministry has evolved to oversee parastatals like the Council for Arts and Culture, the Oron Museum Board, and the Ikot Ekpene Crafts Bureau. We coordinate locally and internationally to ensure that Akwa Ibom&apos;s historic relics, colonial cottages, and local landscapes receive structural protection.
          </p>
          <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-gov-green font-outfit">
            <div className="flex items-center gap-2">
              <ChevronRight size={14} className="text-gov-gold" />
              <span>State Heritage Protection</span>
            </div>
            <div className="flex items-center gap-2">
              <ChevronRight size={14} className="text-gov-gold" />
              <span>Digital Archive scanning</span>
            </div>
            <div className="flex items-center gap-2">
              <ChevronRight size={14} className="text-gov-gold" />
              <span>Creative Industry Grants</span>
            </div>
            <div className="flex items-center gap-2">
              <ChevronRight size={14} className="text-gov-gold" />
              <span>Global Museum Relations</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 h-[220px] bg-[url('https://res.cloudinary.com/duweg8kpv/image/upload/v1784676949/creatv_z0syzg.jpg')] bg-cover bg-center rounded-lg shadow-md border border-gov-gold/20"></div>
      </motion.section>

      {/* EXECUTIVE ORGANOGRAM FLOWCHART */}
      <motion.section 
        className="bg-white border border-gray-150 p-6 md:p-8 rounded-xl shadow-md space-y-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center space-y-1 font-outfit">
          <h3 className="font-playfair text-lg font-bold text-gov-navy">Ministry Leadership Organogram</h3>
          <p className="text-[11px] text-gray-400">Official reporting hierarchy structure of the Ministry directors and parastatals.</p>
        </div>

        {/* Organogram Chart Nodes */}
        <div className="space-y-6 max-w-2xl mx-auto text-xs text-center font-outfit">
          
          {/* Level 1: Commissioner */}
          <div className="flex justify-center">
            <motion.div 
              className="bg-gov-green border-2 border-gov-gold text-white p-4 rounded-lg shadow-md w-64"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-[9px] text-gov-gold font-bold block uppercase tracking-wider">Cabinet Head</span>
              <span className="font-bold text-sm">Honourable Commissioner</span>
              <span className="text-[10px] text-white/70 block mt-0.5">Arts, Culture & Creative Economy</span>
            </motion.div>
          </div>

          {/* Connector Line */}
          <div className="flex justify-center"><div className="h-6 w-0.5 bg-gov-gold/45"></div></div>

          {/* Level 2: Permanent Secretary */}
          <div className="flex justify-center">
            <motion.div 
              className="bg-gov-navy border border-gray-250 text-white p-3 rounded-lg shadow-md w-56"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-[9px] text-[#C7A349] font-bold block uppercase tracking-wider">Administrative Chief</span>
              <span className="font-bold">Permanent Secretary</span>
            </motion.div>
          </div>

          {/* Connector Line */}
          <div className="flex justify-center"><div className="h-6 w-0.5 bg-gov-gold/45"></div></div>

          {/* Level 3: Departments & Agencies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Dept A */}
            <motion.div 
              className="bg-gray-50 border border-gray-150 p-3 rounded-lg shadow-sm hover:border-gov-gold/40 transition-all"
              whileHover={{ y: -3 }}
            >
              <span className="font-bold text-gov-green">Heritage Department</span>
              <p className="text-[10px] text-gray-500 mt-1">Oversees Museum Inspections, Antiquities Preservation, and Local historical sites.</p>
            </motion.div>

            {/* Dept B */}
            <motion.div 
              className="bg-gray-50 border border-gray-150 p-3 rounded-lg shadow-sm hover:border-gov-gold/40 transition-all"
              whileHover={{ y: -3 }}
            >
              <span className="font-bold text-gov-green">Arts & Culture Council</span>
              <p className="text-[10px] text-gray-500 mt-1">Directs the State Performing Troupe, theater guilds, and creative industry permits.</p>
            </motion.div>

            {/* Dept C */}
            <motion.div 
              className="bg-gray-50 border border-gray-150 p-3 rounded-lg shadow-sm hover:border-gov-gold/40 transition-all"
              whileHover={{ y: -3 }}
            >
              <span className="font-bold text-gov-green">Affiliated Parastatals</span>
              <p className="text-[10px] text-gray-500 mt-1">Includes the Oron Museum Board, Ikot Ekpene Crafts Bureau, and Ibomwood Film Board.</p>
            </motion.div>

          </div>

        </div>
      </motion.section>

      {/* SECTION 5: AFFILIATED PARASTATALS ADVISORY DIRECTORY */}
      <motion.section 
        className="bg-gov-navy text-white p-6 md:p-8 rounded-xl border border-gov-gold/15 space-y-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-[10px] text-gov-gold uppercase tracking-wider font-bold">Official Registry Directory</span>
          <h2 className="font-playfair text-xl sm:text-2xl font-bold">Affiliated State Councils & Bureaus</h2>
          <p className="text-[11px] text-white/70 leading-relaxed font-outfit">
            These parastatal boards coordinate directly under the ministry to execute cultural heritage conservation directives and regulate creative enterprise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 font-outfit">
          <div className="p-5 bg-white/5 border border-white/10 rounded-lg space-y-3">
            <h4 className="font-playfair text-gov-gold text-sm font-bold">Oron Maritime Museum Board</h4>
            <p className="text-[10px] text-white/70 leading-relaxed">
              Maintains the physical Oron Maritime gallery collections, oversees returned ancestral carvings, and regulates state conservation clearances.
            </p>
            <div className="text-[10px] text-white/50 space-y-1">
              <div>📍 Oron Maritime Museum Road, Oron</div>
              <div>✉️ oronboard@culture.akwaibomstate.gov.ng</div>
            </div>
          </div>

          <div className="p-5 bg-white/5 border border-white/10 rounded-lg space-y-3">
            <h4 className="font-playfair text-gov-gold text-sm font-bold">Raffia City Crafts Bureau</h4>
            <p className="text-[10px] text-white/70 leading-relaxed">
              Provides capacity training for local weavers, issues indigenous artisan tags, and coordinates raffia textile global export channels.
            </p>
            <div className="text-[10px] text-white/50 space-y-1">
              <div>📍 Raffia City Complex, Ikot Ekpene</div>
              <div>✉️ crafts@culture.akwaibomstate.gov.ng</div>
            </div>
          </div>

          <div className="p-5 bg-white/5 border border-white/10 rounded-lg space-y-3">
            <h4 className="font-playfair text-gov-gold text-sm font-bold">Ibomwood Film & Media Guild</h4>
            <p className="text-[10px] text-white/70 leading-relaxed">
              Regulates theatrical permits, coordinates filming location registries, and supports indigenous dramatists through the State Creative Fund.
            </p>
            <div className="text-[10px] text-white/50 space-y-1">
              <div>📍 Creative Hub, Uyo, Akwa Ibom State</div>
              <div>✉️ ibomwood@culture.akwaibomstate.gov.ng</div>
            </div>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
