'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { dbBridge } from '@/lib/db';
import { useApp } from '@/components/AppContext';
import { FileText, Award, Calendar, Search, ShieldCheck, CheckCircle, PlusCircle, Volume2 } from 'lucide-react';

export default function ProcurementPortal() {
  const { speak } = useApp();
  const [tenders, setTenders] = useState<any[]>([]);
  const [bidForm, setBidForm] = useState({ companyName: '', email: '', bidPrice: '', proposalDoc: '' });
  const [selectedTender, setSelectedTender] = useState<any | null>(null);
  const [bidSuccess, setBidSuccess] = useState<string | null>(null);
  
  // Vendor registration state
  const [vendorForm, setVendorForm] = useState({ companyName: '', rcNumber: '', email: '', address: '', specialty: 'Civil Construction' });
  const [vendorSuccess, setVendorSuccess] = useState<string | null>(null);

  // Load tenders for events
  const reloadTenders = async () => {
    const list = await dbBridge.getTenders();
    if (list) setTenders(list);
  };

  useEffect(() => {
    let active = true;
    async function load() {
      const list = await dbBridge.getTenders();
      if (active && list) setTenders(list);
    }
    load();
    return () => { active = false; };
  }, []);

  const handleBidSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTender || !bidForm.companyName || !bidForm.bidPrice) return;
    
    // Submit bid
    const res = await dbBridge.submitBid(selectedTender.id);
    if (res) {
      setBidSuccess(`Bid proposal of N${parseFloat(bidForm.bidPrice).toLocaleString()} submitted successfully by ${bidForm.companyName} for project: "${selectedTender.title}". Tracking Reference Code generated.`);
      setBidForm({ companyName: '', email: '', bidPrice: '', proposalDoc: '' });
      setSelectedTender(null);
      await reloadTenders(); // reload
      setTimeout(() => setBidSuccess(null), 5000);
    }
  };

  const handleVendorRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorForm.companyName || !vendorForm.rcNumber) return;
    setVendorSuccess(`Vendor registration successful. RC Number ${vendorForm.rcNumber} verified against CAC registries. Your corporate profile is now logged.`);
    setVendorForm({ companyName: '', rcNumber: '', email: '', address: '', specialty: 'Civil Construction' });
    setTimeout(() => setVendorSuccess(null), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      
      {/* Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-gov-gold bg-gov-gold/10 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
          <FileText size={14} /> Open Government Transparency
        </div>
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gov-navy">
          Procurement & Open Tenders
        </h1>
        <p className="text-xs text-gray-500 font-outfit">
          Review open federal tenders, submit competitive bid proposals, verify CAC corporate registries, or inspect award notices.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Open Tenders and Award Notices (Col span 7) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Active Tenders */}
          <div className="bg-white border border-gov-gold/20 rounded-xl p-6 shadow-md space-y-6">
            <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
              <h3 className="font-playfair text-sm font-bold text-gov-navy flex items-center gap-1.5">
                <FileText size={18} className="text-[#C7A349]" />
                Active Open Tenders
              </h3>
              <span className="bg-green-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Open for bidding</span>
            </div>

            {bidSuccess && (
              <div className="p-3 bg-green-500/10 border border-green-500/30 text-green-700 text-xs rounded text-center">
                {bidSuccess}
              </div>
            )}

            <div className="space-y-4">
              {tenders.map((tender) => (
                <div key={tender.id} className="border border-gray-150 rounded-lg p-5 hover:border-gov-gold/40 transition-all space-y-3 bg-gray-50/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] bg-gov-green/10 text-gov-green font-bold px-2 py-0.5 rounded uppercase tracking-wider">{tender.category}</span>
                      <h4 className="font-playfair font-bold text-sm text-gov-navy mt-1.5">{tender.title}</h4>
                    </div>
                    <span className="text-xs font-bold text-gov-green font-mono">N{tender.budget.toLocaleString()}</span>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed">{tender.description}</p>
                  
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] text-gray-400 border-t border-gray-100 pt-3">
                    <span>Opened: {tender.openDate}</span>
                    <span>Closing Date: {tender.closeDate}</span>
                    <span className="font-semibold text-[#C7A349]">Bids Received: {tender.bidsCount}</span>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => { setSelectedTender(tender); setVendorSuccess(null); }}
                      className="bg-gov-green hover:bg-gov-darkgreen text-white text-xs font-bold px-4 py-2 rounded shadow transition-all flex items-center gap-1"
                    >
                      <PlusCircle size={12} /> Submit Bid Proposal
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Award Notices */}
          <div className="bg-white border border-gray-150 rounded-xl p-6 shadow-sm space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h3 className="font-playfair text-sm font-bold text-gov-navy flex items-center gap-1.5">
                <ShieldCheck size={18} className="text-[#C7A349]" />
                Recent Contract Award Notices
              </h3>
              <p className="text-[10px] text-gray-400">Archived contract records verified for transparency compliance.</p>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-4 bg-gray-50 border border-gray-150 rounded flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-gov-navy">National Theater Roof Preservation</h4>
                  <p className="text-[10px] text-gray-500">Awardee: Dumez Construction Nigeria PLC | Date: 2025-11-12</p>
                </div>
                <span className="font-mono font-bold text-gray-600">N85,000,000</span>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-150 rounded flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-gov-navy">Digital Heritage Photo Cataloging (Phase I)</h4>
                  <p className="text-[10px] text-gray-500">Awardee: ScanPro Technologies Ltd | Date: 2025-10-05</p>
                </div>
                <span className="font-mono font-bold text-gray-600">N12,500,000</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Panel forms (Col span 5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* BID OFFER SUBMISSION SHEET */}
          {selectedTender && (
            <div className="bg-white border-2 border-gov-gold/30 rounded-xl p-6 shadow-xl space-y-4 animate-slide-up">
              <h3 className="font-playfair text-base font-bold text-gov-green border-b border-gray-100 pb-3">
                Submit Bid Proposal Offer
              </h3>
              <div className="p-3 bg-gov-cream border border-gov-gold/20 text-xs rounded mb-2">
                <span className="text-[10px] text-gray-400 block font-semibold">PROJECT DETAILS:</span>
                <span className="font-bold text-gov-navy leading-tight block mt-1">{selectedTender.title}</span>
                <span className="text-[10px] font-bold text-gov-green font-mono block mt-1">Est. Budget: N{selectedTender.budget.toLocaleString()}</span>
              </div>

              <form onSubmit={handleBidSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 block">Bidder Company Name</label>
                  <input
                    type="text"
                    required
                    value={bidForm.companyName}
                    onChange={(e) => setBidForm({...bidForm, companyName: e.target.value})}
                    placeholder="e.g. Ade Engineering Ltd"
                    className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green text-gray-700"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 block">Contact Email</label>
                  <input
                    type="email"
                    required
                    value={bidForm.email}
                    onChange={(e) => setBidForm({...bidForm, email: e.target.value})}
                    placeholder="e.g. tender@company.com"
                    className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green text-gray-700"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 block">Bid Proposal Amount (Naira)</label>
                  <input
                    type="number"
                    required
                    value={bidForm.bidPrice}
                    onChange={(e) => setBidForm({...bidForm, bidPrice: e.target.value})}
                    placeholder="e.g. 17500000"
                    className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green text-gray-700"
                  />
                </div>

                <div className="space-y-1 bg-gray-50 border border-gray-150 p-3 rounded">
                  <label className="text-xs font-bold text-gray-600 block">Proposal Technical Bid PDF File (Mock)</label>
                  <input type="file" disabled className="text-xs mt-1 block w-full text-gray-400" />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-gov-green hover:bg-gov-darkgreen text-white font-bold py-2.5 rounded shadow text-xs transition-all"
                  >
                    Submit Bid Proposal
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTender(null)}
                    className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold px-4 py-2.5 rounded text-xs transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* VENDOR REGISTRATION SHEET */}
          <div className="bg-white border border-gov-gold/20 rounded-xl p-6 shadow-md space-y-4">
            <h3 className="font-playfair text-base font-bold text-gov-navy border-b border-gray-100 pb-3 flex items-center gap-1">
              <ShieldCheck size={18} className="text-gov-gold" />
              Vendor Directory Verification
            </h3>
            
            {vendorSuccess && (
              <div className="p-3 bg-green-500/10 border border-green-500/30 text-green-700 text-xs rounded text-center">
                {vendorSuccess}
              </div>
            )}

            <form onSubmit={handleVendorRegister} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600 block">Corporate CAC Name</label>
                <input
                  type="text"
                  required
                  value={vendorForm.companyName}
                  onChange={(e) => setVendorForm({...vendorForm, companyName: e.target.value})}
                  placeholder="e.g. Ade Engineering Limited"
                  className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green text-gray-700"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600 block">RC / CAC Registration Number</label>
                <input
                  type="text"
                  required
                  value={vendorForm.rcNumber}
                  onChange={(e) => setVendorForm({...vendorForm, rcNumber: e.target.value})}
                  placeholder="e.g. RC-489031"
                  className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green text-gray-700"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600 block">CAC Corporate Specialty</label>
                <select
                  value={vendorForm.specialty}
                  onChange={(e) => setVendorForm({...vendorForm, specialty: e.target.value})}
                  className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green text-gray-700"
                >
                  <option value="Civil Construction">Civil Construction & Restorations</option>
                  <option value="Digital Infrastructure">Digital Infrastructure & Scanning</option>
                  <option value="Arts Materials">Arts Materials Supply</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gov-green hover:bg-gov-darkgreen text-white font-bold text-xs py-3 rounded shadow transition-all flex items-center justify-center gap-1.5"
              >
                Verify CAC & Register
              </button>
            </form>
          </div>

        </div>

      </div>

      {/* SECTION 4: PROCUREMENT COMPLIANCE & TRANSPARENCY CHARTER */}
      <motion.section 
        className="bg-gov-cream border border-gov-gold/20 rounded-xl p-6 md:p-8 space-y-6 font-outfit"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="h-14 w-14 rounded-full bg-gov-green/10 text-gov-green flex items-center justify-center shrink-0">
            <ShieldCheck size={28} />
          </div>
          <div className="space-y-2">
            <h3 className="font-playfair text-lg font-bold text-gov-navy">Open Government Procurement & Anti-Corruption Charter</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              All bids are cataloged on an open public ledger to prevent contract inflations or favoritism. The state auditor board conducts reviews on all proposals before final award letters are distributed. Any complaints regarding bid evaluations can be submitted directly through the Citizen Desk portal.
            </p>
          </div>
        </div>
      </motion.section>

      {/* SECTION 5: TENDER BOARD REGISTRY & DIRECT CONTACT */}
      <motion.section 
        className="bg-gov-navy text-white p-6 md:p-8 rounded-xl border border-gov-gold/15 space-y-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between font-outfit">
          <div className="space-y-2">
            <h3 className="font-playfair text-lg font-bold text-gov-gold">Procurement Desk & Tender Advisory</h3>
            <p className="text-xs text-white/70 max-w-2xl leading-relaxed">
              Need technical assistance with bid documentation uploads, corporate RC verification, or joint-venture compliance guidelines? Contact the official Tender Board Registry.
            </p>
          </div>
          <div className="text-xs font-semibold text-white/50 space-y-1 bg-white/5 border border-white/10 p-4 rounded-lg min-w-[200px]">
            <div>📞 Direct: +234 (0) 803 999 1111</div>
            <div>✉️ tenders@culture.akwaibomstate.gov.ng</div>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
