'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { dbBridge } from '@/lib/db';
import { useApp } from '@/components/AppContext';
import { FileText, Download, Eye, X, ZoomIn, ZoomOut, Printer, Search, Calendar } from 'lucide-react';

const PUBLICATIONS = [
  {
    id: "pub-1",
    title: "National Cultural Policy of Nigeria",
    type: "Official Policy Guidelines",
    size: "2.4 MB",
    pages: 42,
    date: "2024-03-12",
    summary: "The framework governing heritage preservations, creative ecosystem protections, and domestic cultural industry growth initiatives."
  },
  {
    id: "pub-2",
    title: "Strategic Plan 2026 - 2030 Blueprint",
    type: "Strategic Mandate",
    size: "4.8 MB",
    pages: 65,
    date: "2026-01-10",
    summary: "Ministry blueprint target indicators aiming for 50,000 jobs within visual arts, music, and film directories."
  },
  {
    id: "pub-3",
    title: "Acts of Parliament: Preservation of Antiquities Act",
    type: "Legislative Acts",
    size: "1.2 MB",
    pages: 18,
    date: "2023-09-05",
    summary: "Official penal guidelines and legal code protecting historical monuments and prohibiting illegal exportation of artifact carvings."
  }
];

export default function MediaCenterPage() {
  const [news, setNews] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPub, setSelectedPub] = useState<any | null>(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [pageNumber, setPageNumber] = useState(1);

  // Load news
  useEffect(() => {
    async function fetchNews() {
      const list = await dbBridge.getNews();
      if (list) setNews(list);
    }
    fetchNews();
  }, []);

  const filteredPubs = PUBLICATIONS.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      
      {/* Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-gov-gold bg-gov-gold/10 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
          <FileText size={14} /> Publications & Library
        </div>
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gov-navy">
          Media Center & Digital Library
        </h1>
        <p className="text-xs text-gray-500 font-outfit">
          Download strategic blueprints, read legislative acts, review official press releases, and explore the Ministry archive logs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: News Feed (Col span 7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="border-b border-gray-100 pb-3 flex justify-between items-center bg-white p-4 rounded border border-gray-150 shadow-sm">
            <h3 className="font-playfair text-sm font-bold text-gov-navy">Latest Announcements & Speeches</h3>
            <span className="text-[9px] bg-gov-green/10 text-gov-green font-bold px-2 py-0.5 rounded uppercase">CMS Connected</span>
          </div>

          <div className="space-y-6">
            {news.map((item) => (
              <div key={item.id} className="bg-white rounded-lg border border-gray-150 overflow-hidden shadow-sm flex flex-col sm:flex-row h-auto">
                <div className="w-full sm:w-44 h-48 sm:h-auto bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${item.imageUrl})` }}></div>
                <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <span className="text-[9px] bg-gov-gold/20 text-[#0B5E3C] font-bold px-2 py-0.5 rounded uppercase tracking-wider">{item.category}</span>
                    <h4 className="font-playfair font-bold text-sm text-gov-navy leading-snug">{item.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{item.content}</p>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-3 flex justify-between items-center text-[10px] text-gray-400">
                    <span className="flex items-center gap-1"><Calendar size={10} /> {new Date(item.createdAt).toLocaleDateString()}</span>
                    <span>By: {item.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Digital Library Directory (Col span 5) */}
        <div className="lg:col-span-5 bg-white border border-gov-gold/20 rounded-xl p-6 shadow-md space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="font-playfair text-base font-bold text-gov-green flex items-center gap-1">
              <FileText size={18} className="text-[#C7A349]" />
              Strategic Publications
            </h3>
            <p className="text-[10px] text-gray-400">Search and read legislative manuals or blueprints.</p>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-150 rounded px-3 py-2">
            <Search size={14} className="text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search library catalog..."
              className="w-full bg-transparent text-xs focus:outline-none text-gray-700"
            />
          </div>

          {/* Publications List */}
          <div className="space-y-4">
            {filteredPubs.map((pub) => (
              <div key={pub.id} className="p-4 border border-gray-150 rounded-lg hover:border-gov-gold/40 transition-all space-y-2 bg-gray-50/50">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[8px] bg-gov-green/10 text-gov-green font-bold px-2 py-0.5 rounded uppercase tracking-wider">{pub.type}</span>
                    <h4 className="font-bold text-xs text-gov-navy mt-1">{pub.title}</h4>
                  </div>
                  <span className="text-[10px] text-gray-400">{pub.size}</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">{pub.summary}</p>
                
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => { setSelectedPub(pub); setPageNumber(1); }}
                    className="border border-gov-green hover:bg-gov-green/10 text-gov-green font-bold text-[10px] px-3 py-1.5 rounded transition-all flex items-center gap-1"
                  >
                    <Eye size={12} /> Read Online
                  </button>
                  <a
                    href="#"
                    className="bg-gov-green hover:bg-gov-darkgreen text-white font-bold text-[10px] px-3 py-1.5 rounded shadow transition-all flex items-center gap-1"
                  >
                    <Download size={12} /> Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* SECTION 5: MEDIA & PRESS KIT GUIDELINES */}
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
              <FileText size={20} /> Media Resources & Press Clearances
            </h3>
            <p className="text-xs text-white/70 max-w-2xl leading-relaxed">
              Journalists and media organizations can download official state logos, brand assets, and high-resolution photos of Oron Museum collections. For press passes and commissioner interview requests, please submit a clearance form.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a 
              href="#"
              className="bg-gov-gold hover:bg-gov-darkgold text-white text-xs font-bold px-4 py-2.5 rounded shadow transition-all block"
            >
              Download Press Kit (ZIP)
            </a>
          </div>
        </div>
      </motion.section>

      {/* DETAILED DIGITAL PDF VIEWER OVERLAY MODAL */}
      {selectedPub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/80 p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl border border-gov-gold/30 w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden animate-slide-up">
            
            {/* Viewer Header */}
            <div className="bg-gov-navy text-white p-4 flex justify-between items-center border-b border-gov-gold/30">
              <div>
                <span className="text-[9px] bg-gov-gold/25 text-gov-gold font-bold px-2.5 py-0.5 rounded uppercase">{selectedPub.type}</span>
                <h3 className="font-playfair text-sm font-bold text-gov-cream mt-1">{selectedPub.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedPub(null)}
                className="text-white/80 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Viewer Action Bar */}
            <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex justify-between items-center text-xs text-gray-600">
              <div className="flex items-center gap-4">
                <button onClick={() => setPageNumber(p => Math.max(1, p - 1))} className="hover:text-gov-green font-bold">Prev</button>
                <span className="font-mono">Page {pageNumber} of {selectedPub.pages}</span>
                <button onClick={() => setPageNumber(p => Math.min(selectedPub.pages, p + 1))} className="hover:text-gov-green font-bold">Next</button>
              </div>

              <div className="flex items-center gap-4">
                <button onClick={() => setZoomLevel(z => Math.max(50, z - 10))} className="p-1 hover:text-gov-green" title="Zoom out"><ZoomOut size={16} /></button>
                <span className="font-mono">{zoomLevel}%</span>
                <button onClick={() => setZoomLevel(z => Math.min(200, z + 10))} className="p-1 hover:text-gov-green" title="Zoom in"><ZoomIn size={16} /></button>
                <button onClick={() => window.print()} className="p-1 border-l border-gray-250 pl-3 hover:text-gov-green" title="Print document"><Printer size={16} /></button>
              </div>
            </div>

            {/* PDF Canvas Simulation */}
            <div className="flex-1 bg-gray-500 overflow-auto p-8 flex items-start justify-center">
              <div 
                className="bg-white border shadow-2xl p-12 transition-all duration-300 w-full max-w-2xl min-h-[750px] relative font-outfit"
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
              >
                <div className="absolute top-4 right-4 text-[9px] text-gray-300">FEDERAL REPUBLIC OF NIGERIA</div>
                <div className="text-center space-y-6 pt-16 border-b pb-8">
                  <span className="text-4xl">🇳🇬</span>
                  <h4 className="font-playfair text-xl font-bold text-gov-green leading-snug">{selectedPub.title}</h4>
                  <p className="text-xs text-gray-500 font-semibold uppercase">{selectedPub.type}</p>
                </div>
                
                <div className="space-y-6 text-xs text-gray-700 leading-relaxed pt-8 font-outfit">
                  <h5 className="font-bold text-gov-navy text-sm border-b pb-1">Section {pageNumber}: Executive Overview Summary</h5>
                  <p>
                    This document logs official policy indices enacted under parliamentary directives to govern arts structures and visual cataloging systems in Nigeria. Administrative directors are expected to review indices for compliance checks.
                  </p>
                  <p>
                    Under mandate protocols, registered artists receive designated micro-credit seed funds, and local gallery curators are directed to digitalize physical masks in 3D photogrammetry collections.
                  </p>
                  <p>
                    Budget updates indicate an increase in public arts allocations, targeting job programs for high school performing dance clubs and craft workshops.
                  </p>
                </div>
                
                <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] text-gray-400 font-mono">
                  Document Page Reference: {pageNumber} of {selectedPub.pages} pages | Security: PUBLIC DISCLOSURE (ACT 2011)
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
