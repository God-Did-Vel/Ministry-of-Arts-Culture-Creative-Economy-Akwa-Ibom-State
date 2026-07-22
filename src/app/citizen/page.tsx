'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import { dbBridge } from '@/lib/db';
import { useApp } from '@/components/AppContext';
import { 
  Award, Landmark, Calendar, FileText, Search, PlusCircle, CheckCircle, 
  HelpCircle, Printer, Download, Clock, RefreshCw, XCircle, ArrowRight
} from 'lucide-react';

function CitizenPortalInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t, currentRole } = useApp();
  
  // Tabs management
  const initialTab = searchParams.get('tab') || 'artist';
  const [activeTab, setActiveTab] = useState(initialTab);

  // Forms states
  const [artistForm, setArtistForm] = useState({ name: '', email: '', artistType: 'Visual Arts', stateOfOrigin: 'Akwa Ibom', bio: '', qualifications: '' });
  const [grantForm, setGrantForm] = useState({ artistName: '', email: '', title: '', category: 'Digital Preservation', budgetRequest: '', proposalSummary: '' });
  const [permitForm, setPermitForm] = useState({ name: '', email: '', permitType: 'EVENT', details: '', location: '', date: '' });
  const [complaintForm, setComplaintForm] = useState({ name: '', email: '', subject: '', description: '' });
  const [foiForm, setFoiForm] = useState({ name: '', organization: '', email: '', description: '' });

  // Submission messages
  const [submitSuccess, setSubmitSuccess] = useState<any | null>(null);

  // Tracking query states
  const [trackQuery, setTrackQuery] = useState('');
  const [trackResults, setTrackResults] = useState<any[]>([]);
  const [hasTracked, setHasTracked] = useState(false);

  // Sync tab from URL if changed
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const switchTab = (tabName: string) => {
    setActiveTab(tabName);
    setSubmitSuccess(null);
    // update URL query
    const params = new URLSearchParams(window.location.search);
    params.set('tab', tabName);
    router.push(`?${params.toString()}`);
  };

  // ----------------------------------------
  // FORM SUBMISSION HANDLERS
  // ----------------------------------------
  const handleArtistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!artistForm.name || !artistForm.email) return;
    const res = await dbBridge.registerArtist({
      ...artistForm,
      documentUrl: 'https://example.com/uploads/doc.pdf'
    });
    if (res) {
      setSubmitSuccess({
        type: 'artist',
        title: 'Registration Submitted',
        code: res.certificateCode,
        message: 'Your artist registration has been received successfully. It is now in the review queue for verification.',
        item: res
      });
      setArtistForm({ name: '', email: '', artistType: 'Visual Arts', stateOfOrigin: 'Akwa Ibom', bio: '', qualifications: '' });
    }
  };

  const handleGrantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!grantForm.artistName || !grantForm.title) return;
    const res = await dbBridge.applyGrant({
      artistName: grantForm.artistName,
      title: grantForm.title,
      category: grantForm.category,
      budgetRequest: parseFloat(grantForm.budgetRequest || '0'),
      proposalSummary: grantForm.proposalSummary,
      proposalDocUrl: 'https://example.com/uploads/proposal.pdf'
    });
    if (res) {
      setSubmitSuccess({
        type: 'grant',
        title: 'Grant Proposal Received',
        code: res.id,
        message: 'Your application for the Creative Economy Fund has been logged. The finance review board will audit your budget request.',
        item: res
      });
      setGrantForm({ artistName: '', email: '', title: '', category: 'Digital Preservation', budgetRequest: '', proposalSummary: '' });
    }
  };

  const handlePermitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!permitForm.name || !permitForm.details) return;
    const res = await dbBridge.applyPermit({
      applicantName: permitForm.name,
      applicantEmail: permitForm.email,
      permitType: permitForm.permitType,
      details: permitForm.details,
      location: permitForm.location,
      eventDate: permitForm.date
    });
    if (res) {
      setSubmitSuccess({
        type: 'permit',
        title: 'Permit Approved & Issued',
        code: res.permitCode,
        message: `Your permit request has been automatically approved. Fee: N${res.amountPaid.toLocaleString()} paid. Download your certificate below.`,
        item: res
      });
      setPermitForm({ name: '', email: '', permitType: 'EVENT', details: '', location: '', date: '' });
    }
  };

  const handleComplaintSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintForm.name || !complaintForm.description) return;
    const res = await dbBridge.submitComplaint(complaintForm);
    if (res) {
      setSubmitSuccess({
        type: 'complaint',
        title: 'Feedback Ticket Created',
        code: res.trackingCode,
        message: 'Your ticket has been logged with the staff helpdesk. We will contact you via email once resolved.',
        item: res
      });
      setComplaintForm({ name: '', email: '', subject: '', description: '' });
    }
  };

  const handleFoiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!foiForm.name || !foiForm.description) return;
    const res = await dbBridge.submitFoiRequest(foiForm);
    if (res) {
      setSubmitSuccess({
        type: 'foi',
        title: 'FOI Disclosure Logged',
        code: res.trackingCode,
        message: 'Under the Freedom of Information Act, the Ministry will evaluate your information disclosure query and reply within 7 working days.',
        item: res
      });
      setFoiForm({ name: '', organization: '', email: '', description: '' });
    }
  };

  // ----------------------------------------
  // TRACKING HANDLER
  // ----------------------------------------
  const handleTrackSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackQuery.trim()) return;

    setHasTracked(true);
    const arts = await dbBridge.getArtists(undefined, trackQuery);
    const grts = await dbBridge.getGrants(undefined, trackQuery);

    // Combine tracking search output
    const items = [
      ...arts.map((a: any) => ({ type: 'Artist Registration', code: a.certificateCode, date: a.createdAt, status: a.status, title: a.name, comments: a.comments, raw: a })),
      ...grts.map((g: any) => ({ type: 'Grant Application', code: g.id, date: g.createdAt, status: g.status, title: g.title, comments: g.feedback, raw: g }))
    ];
    setTrackResults(items);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      
      {/* Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-gov-gold bg-gov-gold/10 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
          <Landmark size={14} /> E-Government Services Portal
        </div>
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gov-navy">
          Citizen Services Desk
        </h1>
        <p className="text-xs text-gray-500 font-outfit">
          Access official Ministry portals to register, apply for creative seed funds, download event clearances, or track application status online.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Portals Selector Tabs (Col span 3) */}
        <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0">
          <button
            onClick={() => switchTab('artist')}
            className={`px-4 py-3 rounded text-left text-xs font-bold shrink-0 flex items-center gap-2 w-full transition-all border ${
              activeTab === 'artist' ? 'bg-[#0B5E3C] text-white border-[#C7A349] border-l-4' : 'bg-white border-gray-150 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Award size={16} /> Artist Registration
          </button>
          <button
            onClick={() => switchTab('grant')}
            className={`px-4 py-3 rounded text-left text-xs font-bold shrink-0 flex items-center gap-2 w-full transition-all border ${
              activeTab === 'grant' ? 'bg-[#0B5E3C] text-white border-[#C7A349] border-l-4' : 'bg-white border-gray-150 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Landmark size={16} /> Creative Grants
          </button>
          <button
            onClick={() => switchTab('permit')}
            className={`px-4 py-3 rounded text-left text-xs font-bold shrink-0 flex items-center gap-2 w-full transition-all border ${
              activeTab === 'permit' ? 'bg-[#0B5E3C] text-white border-[#C7A349] border-l-4' : 'bg-white border-gray-150 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Calendar size={16} /> Event & Venue Permits
          </button>
          <button
            onClick={() => switchTab('complaint')}
            className={`px-4 py-3 rounded text-left text-xs font-bold shrink-0 flex items-center gap-2 w-full transition-all border ${
              activeTab === 'complaint' ? 'bg-[#0B5E3C] text-white border-[#C7A349] border-l-4' : 'bg-white border-gray-150 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <HelpCircle size={16} /> Feedback & Complaints
          </button>
          <button
            onClick={() => switchTab('foi')}
            className={`px-4 py-3 rounded text-left text-xs font-bold shrink-0 flex items-center gap-2 w-full transition-all border ${
              activeTab === 'foi' ? 'bg-[#0B5E3C] text-white border-[#C7A349] border-l-4' : 'bg-white border-gray-150 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FileText size={16} /> FOI Request
          </button>
          <button
            onClick={() => switchTab('tracker')}
            className={`px-4 py-3 rounded text-left text-xs font-bold shrink-0 flex items-center gap-2 w-full transition-all border ${
              activeTab === 'tracker' ? 'bg-[#C7A349] text-white border-[#0B5E3C] border-l-4' : 'bg-white border-gray-150 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Search size={16} /> Track Submissions
          </button>
        </div>

        {/* RIGHT COLUMN: Interactive Workspaces (Col span 9) */}
        <div className="lg:col-span-9 bg-white border border-gov-gold/20 rounded-xl p-6 md:p-8 shadow-lg min-h-[400px]">
          
          {/* SUCCESS MESSAGE / DIGITAL ID VIEWER */}
          {submitSuccess && (
            <div className="space-y-6 animate-slide-up">
              <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 text-green-800 rounded-lg text-sm">
                <CheckCircle size={24} className="text-green-600 shrink-0" />
                <div>
                  <h4 className="font-bold">{submitSuccess.title}</h4>
                  <p className="text-xs text-green-700 mt-0.5">{submitSuccess.message}</p>
                </div>
              </div>

              {/* DYNAMIC DIGITAL ID CARD GENERATOR (IF ARTIST REGISTRATION OR PERMIT) */}
              {submitSuccess.type === 'artist' && (
                <div className="max-w-md mx-auto bg-gov-navy text-white rounded-xl border-2 border-gov-gold overflow-hidden shadow-2xl p-6 relative font-outfit">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Landmark size={150} />
                  </div>
                  
                  <div className="flex justify-between items-start border-b border-white/20 pb-4 mb-4">
                    <div>
                      <h5 className="text-[10px] font-bold text-gov-gold tracking-widest uppercase">Federal Republic of Nigeria</h5>
                      <h4 className="font-playfair text-xs font-bold text-white leading-tight">Ministry of Arts & Culture</h4>
                      <h3 className="text-xs font-bold text-white/50 block">National Artist Registry ID</h3>
                    </div>
                    <span className="text-2xl">🇳🇬</span>
                  </div>

                  <div className="flex gap-4">
                    {/* Mock Avatar */}
                    <div className="h-24 w-24 rounded border border-white/20 bg-gray-600 flex items-center justify-center text-xs text-white/50 shrink-0 select-none">
                      Photo Uploaded
                    </div>
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-[9px] text-white/50 block">ARTIST NAME</span>
                        <span className="font-bold text-sm text-gov-cream">{submitSuccess.item.name}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-white/50 block">CREATIVE MEDIUM</span>
                        <span className="font-semibold">{submitSuccess.item.artistType}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-white/50 block">STATE OF ORIGIN</span>
                        <span className="font-semibold">{submitSuccess.item.stateOfOrigin} State</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/20 flex justify-between items-end text-xs">
                    <div>
                      <span className="text-[9px] text-white/50 block">CERTIFICATE NUMBER</span>
                      <span className="font-mono font-bold text-gov-gold">{submitSuccess.code}</span>
                    </div>
                    <div className="bg-white p-1 rounded">
                      {/* QR code */}
                      <img src={submitSuccess.item.qrCodeUrl} alt="QR Code" className="h-12 w-12" />
                    </div>
                  </div>
                  
                  <div className="text-[9px] text-center text-white/40 mt-4 italic">
                    *This digital ID card is mock-generated. Real ID issuances follow administrative staff approval workflows.
                  </div>
                </div>
              )}

              {/* PERMIT TICKET VIEWER */}
              {submitSuccess.type === 'permit' && (
                <div className="max-w-md mx-auto bg-gov-cream border-2 border-dashed border-gov-gold text-gov-navy rounded p-6 shadow space-y-4">
                  <div className="flex justify-between items-start border-b border-gov-gold/20 pb-3">
                    <div>
                      <h4 className="font-playfair font-bold text-gov-green text-sm">MINISTRY OF ARTS & CULTURE PERMIT</h4>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">{submitSuccess.item.permitType} CLEARANCE CERTIFICATE</span>
                    </div>
                    <span className="text-lg">🇳🇬</span>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-gray-500 block">ISSUED TO</span>
                      <span className="font-bold text-gov-navy">{submitSuccess.item.applicantName}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">EVENT / PURPOSE</span>
                      <span className="font-semibold text-gray-700">{submitSuccess.item.details}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-500 block">LOCATION</span>
                        <span className="font-semibold text-gray-700">{submitSuccess.item.location}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">DATE</span>
                        <span className="font-semibold text-gray-700">{submitSuccess.item.eventDate}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 block">FEE STATUS</span>
                      <span className="text-green-600 font-bold">N{submitSuccess.item.amountPaid.toLocaleString()} (PAID via Simulated Gateway)</span>
                    </div>
                  </div>

                  <div className="border-t border-gov-gold/25 pt-4 flex justify-between items-center text-xs">
                    <div>
                      <span className="text-gray-500 block">PERMIT CODE</span>
                      <span className="font-mono font-bold text-gov-green">{submitSuccess.code}</span>
                    </div>
                    <img src={submitSuccess.item.qrCodeUrl} alt="QR Code" className="h-12 w-12 border p-0.5 bg-white" />
                  </div>

                  <button 
                    onClick={() => window.print()}
                    className="w-full border border-gov-green hover:bg-gov-green hover:text-white text-gov-green font-bold text-xs py-2 rounded.flex items-center justify-center gap-1.5 transition-all mt-4"
                  >
                    <Printer size={12} /> Print Official Permit PDF
                  </button>
                </div>
              )}

              <div className="flex gap-4 justify-center pt-2">
                <button
                  onClick={() => setSubmitSuccess(null)}
                  className="bg-gov-green hover:bg-gov-darkgreen text-white font-bold text-xs px-5 py-2.5 rounded transition-all"
                >
                  Submit Another Request
                </button>
                <button
                  onClick={() => switchTab('tracker')}
                  className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-xs px-5 py-2.5 rounded transition-all"
                >
                  Track Application
                </button>
              </div>
            </div>
          )}

          {/* 1. ARTIST REGISTRATION TAB */}
          {!submitSuccess && activeTab === 'artist' && (
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-3">
                <h2 className="font-playfair text-xl font-bold text-gov-navy">National Artist Directory Registration</h2>
                <p className="text-xs text-gray-500">Apply for government-verified directory status to access funding eligibility.</p>
              </div>
              
              <form onSubmit={handleArtistSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 block">Full Name</label>
                    <input
                      type="text"
                      required
                      value={artistForm.name}
                      onChange={(e) => setArtistForm({...artistForm, name: e.target.value})}
                      placeholder="e.g. Adebayo Kunle"
                      className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 block">Official Email Address</label>
                    <input
                      type="email"
                      required
                      value={artistForm.email}
                      onChange={(e) => setArtistForm({...artistForm, email: e.target.value})}
                      placeholder="e.g. adebayo@gmail.com"
                      className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 block">Creative Medium / Specialty</label>
                    <select
                      value={artistForm.artistType}
                      onChange={(e) => setArtistForm({...artistForm, artistType: e.target.value})}
                      className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green"
                    >
                      <option value="Visual Arts">Visual Arts (Murals, Paintings)</option>
                      <option value="Sculpting & Carving">Sculpting & Wood Carving</option>
                      <option value="Performing Arts">Performing Arts (Dance, Drama)</option>
                      <option value="Music & Folklore">Music & Oral Folklore</option>
                      <option value="Fashion & Textile">Fashion & Indigo Textiles</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 block">State of Origin</label>
                    <input
                      type="text"
                      required
                      value={artistForm.stateOfOrigin}
                      onChange={(e) => setArtistForm({...artistForm, stateOfOrigin: e.target.value})}
                      placeholder="e.g. Akwa Ibom"
                      className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 block">Artist Biography & Achievements</label>
                  <textarea
                    required
                    rows={4}
                    value={artistForm.bio}
                    onChange={(e) => setArtistForm({...artistForm, bio: e.target.value})}
                    placeholder="Provide details about your exhibitions, master training, or career milestones..."
                    className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green"
                  ></textarea>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 block">Formal Training / Apprenticeships</label>
                  <input
                    type="text"
                    value={artistForm.qualifications}
                    onChange={(e) => setArtistForm({...artistForm, qualifications: e.target.value})}
                    placeholder="e.g. B.A. Fine Arts, or apprenticeship under Chief Eze"
                    className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green"
                  />
                </div>

                <div className="space-y-1 bg-gray-50 border border-gray-150 p-3 rounded">
                  <label className="text-xs font-bold text-gray-600 block">Identity / Representative Portfolio PDF File (Mock)</label>
                  <input type="file" disabled className="text-xs mt-1 block w-full text-gray-400" />
                  <span className="text-[10px] text-gray-400 italic block mt-1">*File upload is mock-integrated. Submit will store a placeholder document.</span>
                </div>

                <button
                  type="submit"
                  className="bg-gov-green hover:bg-gov-darkgreen text-white font-bold text-xs px-6 py-3 rounded shadow transition-all flex items-center gap-1"
                >
                  <PlusCircle size={14} /> Submit Application
                </button>
              </form>
            </div>
          )}

          {/* 2. CREATIVE GRANTS TAB */}
          {!submitSuccess && activeTab === 'grant' && (
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-3">
                <h2 className="font-playfair text-xl font-bold text-gov-navy">N5 Billion Creative Expansion Fund Application</h2>
                <p className="text-xs text-gray-500">Registered artists can apply for up to N5,000,000 for developmental creative project execution.</p>
              </div>

              <form onSubmit={handleGrantSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 block">Applicant Artist / Studio Name</label>
                    <input
                      type="text"
                      required
                      value={grantForm.artistName}
                      onChange={(e) => setGrantForm({...grantForm, artistName: e.target.value})}
                      placeholder="e.g. Lekan Balogun Studios"
                      className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 block">Grant Project Title</label>
                    <input
                      type="text"
                      required
                      value={grantForm.title}
                      onChange={(e) => setGrantForm({...grantForm, title: e.target.value})}
                      placeholder="e.g. Murals Digitization Campaign"
                      className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 block">Grant Category</label>
                    <select
                      value={grantForm.category}
                      onChange={(e) => setGrantForm({...grantForm, category: e.target.value})}
                      className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green"
                    >
                      <option value="Digital Preservation">Digital Preservation & Scanning</option>
                      <option value="Capacity Building">Capacity Building & Apprenticeships</option>
                      <option value="Cultural Performance">Cultural Performance Exhibitions</option>
                      <option value="Gastronomy Marketing">Gastronomy Promotion campaigns</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 block">Budget Requested (Naira)</label>
                    <input
                      type="number"
                      required
                      value={grantForm.budgetRequest}
                      onChange={(e) => setGrantForm({...grantForm, budgetRequest: e.target.value})}
                      placeholder="e.g. 2500000"
                      className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 block">Project Proposal Summary</label>
                  <textarea
                    required
                    rows={4}
                    value={grantForm.proposalSummary}
                    onChange={(e) => setGrantForm({...grantForm, proposalSummary: e.target.value})}
                    placeholder="Briefly state the goal, target beneficiaries, timeline, and cultural impacts of your proposal..."
                    className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green"
                  ></textarea>
                </div>

                <div className="space-y-1 bg-gray-50 border border-gray-150 p-3 rounded">
                  <label className="text-xs font-bold text-gray-600 block">Detailed Proposal Document File (PDF) (Mock)</label>
                  <input type="file" disabled className="text-xs mt-1 block w-full text-gray-400" />
                  <span className="text-[10px] text-gray-400 italic block mt-1">*File upload is mock-integrated. Submit will store a placeholder document.</span>
                </div>

                <button
                  type="submit"
                  className="bg-gov-green hover:bg-gov-darkgreen text-white font-bold text-xs px-6 py-3 rounded shadow transition-all flex items-center gap-1"
                >
                  <PlusCircle size={14} /> Submit Grant Proposal
                </button>
              </form>
            </div>
          )}

          {/* 3. VENUE / EVENT PERMITS TAB */}
          {!submitSuccess && activeTab === 'permit' && (
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-3">
                <h2 className="font-playfair text-xl font-bold text-gov-navy">Cultural Event & Museum Venue Clearance</h2>
                <p className="text-xs text-gray-500">Fast approval tracking for cultural hosts mounting exhibitions or researchers filming inside national museums.</p>
              </div>

              <form onSubmit={handlePermitSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 block">Applicant Name / Organization</label>
                    <input
                      type="text"
                      required
                      value={permitForm.name}
                      onChange={(e) => setPermitForm({...permitForm, name: e.target.value})}
                      placeholder="e.g. Lagos Performing Arts Guild"
                      className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 block">Applicant Email</label>
                    <input
                      type="email"
                      required
                      value={permitForm.email}
                      onChange={(e) => setPermitForm({...permitForm, email: e.target.value})}
                      placeholder="e.g. hosting@gmail.com"
                      className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 block">Permit Type</label>
                    <select
                      value={permitForm.permitType}
                      onChange={(e) => setPermitForm({...permitForm, permitType: e.target.value})}
                      className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green"
                    >
                      <option value="EVENT">Cultural Festival Hosting Permit (Fee: N25,000)</option>
                      <option value="MUSEUM">Museum Research / Filming Clearance (Fee: N5,000)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 block">Event / Research Date</label>
                    <input
                      type="date"
                      required
                      value={permitForm.date}
                      onChange={(e) => setPermitForm({...permitForm, date: e.target.value})}
                      className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 block">Event Description / Research Purpose Details</label>
                  <textarea
                    required
                    rows={3}
                    value={permitForm.details}
                    onChange={(e) => setPermitForm({...permitForm, details: e.target.value})}
                    placeholder="Provide details on audience capacity, performance nature, or historical artifacts you plan to study..."
                    className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green"
                  ></textarea>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 block">Target Location / Museum Venue</label>
                  <input
                    type="text"
                    required
                    value={permitForm.location}
                    onChange={(e) => setPermitForm({...permitForm, location: e.target.value})}
                    placeholder="e.g. National Gallery Abuja, or Millennium Park grounds"
                    className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green"
                  />
                </div>

                <div className="p-3 bg-gov-cream border border-gov-gold/20 text-[11px] text-gray-600 rounded">
                  <span className="font-bold text-gov-navy block">Simulated Payment Gateway:</span>
                  Upon hitting submit, the portal will mock a secure REMITA integration transaction and automatically issue your approved permit receipt.
                </div>

                <button
                  type="submit"
                  className="bg-[#C7A349] hover:bg-gov-darkgold text-white font-bold text-xs px-6 py-3 rounded shadow transition-all flex items-center gap-1"
                >
                  Pay Fee & Generate Permit
                </button>
              </form>
            </div>
          )}

          {/* 4. FEEDBACK & COMPLAINTS TAB */}
          {!submitSuccess && activeTab === 'complaint' && (
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-3">
                <h2 className="font-playfair text-xl font-bold text-gov-navy">Complaints & Feedback Center</h2>
                <p className="text-xs text-gray-500">Report delays in ID issuances, request assistance with grants, or file official culture complaints.</p>
              </div>

              <form onSubmit={handleComplaintSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 block">Your Name</label>
                    <input
                      type="text"
                      required
                      value={complaintForm.name}
                      onChange={(e) => setComplaintForm({...complaintForm, name: e.target.value})}
                      placeholder="e.g. Amina Haruna"
                      className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 block">Contact Email</label>
                    <input
                      type="email"
                      required
                      value={complaintForm.email}
                      onChange={(e) => setComplaintForm({...complaintForm, email: e.target.value})}
                      placeholder="e.g. amina@gmail.com"
                      className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 block">Complaint Subject</label>
                  <input
                    type="text"
                    required
                    value={complaintForm.subject}
                    onChange={(e) => setComplaintForm({...complaintForm, subject: e.target.value})}
                    placeholder="e.g. Artist Directory delay details"
                    className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 block">Description of Issue</label>
                  <textarea
                    required
                    rows={4}
                    value={complaintForm.description}
                    onChange={(e) => setComplaintForm({...complaintForm, description: e.target.value})}
                    placeholder="Provide ticket details, transaction dates, or reference numbers to help staff resolve the problem quickly..."
                    className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-gov-green hover:bg-gov-darkgreen text-white font-bold text-xs px-6 py-3 rounded shadow transition-all"
                >
                  Log Ticket Reference
                </button>
              </form>
            </div>
          )}

          {/* 5. FREEDOM OF INFORMATION Request TAB */}
          {!submitSuccess && activeTab === 'foi' && (
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-3">
                <h2 className="font-playfair text-xl font-bold text-gov-navy">Freedom of Information (FOI) Online Submission</h2>
                <p className="text-xs text-gray-500">Submit requests for public records or financial details in compliance with the FOI Act of 2011.</p>
              </div>

              <form onSubmit={handleFoiSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 block">Requester Name</label>
                    <input
                      type="text"
                      required
                      value={foiForm.name}
                      onChange={(e) => setFoiForm({...foiForm, name: e.target.value})}
                      placeholder="e.g. Yusuf Ibrahim"
                      className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 block">Affiliated Organization (if any)</label>
                    <input
                      type="text"
                      value={foiForm.organization}
                      onChange={(e) => setFoiForm({...foiForm, organization: e.target.value})}
                      placeholder="e.g. Civil Society Union"
                      className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 block">Official Reply Email</label>
                  <input
                    type="email"
                    required
                    value={foiForm.email}
                    onChange={(e) => setFoiForm({...foiForm, email: e.target.value})}
                    placeholder="e.g. foi@union.org"
                    className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 block">Specific Public Information/Records Requested</label>
                  <textarea
                    required
                    rows={4}
                    value={foiForm.description}
                    onChange={(e) => setFoiForm({...foiForm, description: e.target.value})}
                    placeholder="State precisely which documents, annual budgets, delegative records, or project timelines you require disclosure on..."
                    className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-gov-green hover:bg-gov-darkgreen text-white font-bold text-xs px-6 py-3 rounded shadow transition-all"
                >
                  Submit Official FOI Request
                </button>
              </form>
            </div>
          )}

          {/* 6. TRACKER TAB */}
          {!submitSuccess && activeTab === 'tracker' && (
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-3">
                <h2 className="font-playfair text-xl font-bold text-gov-navy">National Submission Status Tracker</h2>
                <p className="text-xs text-gray-500">Input your reference ID or Email address to search database registries.</p>
              </div>

              <form onSubmit={handleTrackSearch} className="flex gap-2">
                <input
                  type="text"
                  required
                  value={trackQuery}
                  onChange={(e) => setTrackQuery(e.target.value)}
                  placeholder="Enter Certificate Code or Email (e.g. NGA-ART-893041, or lekan@balogunart.com)..."
                  className="flex-1 bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green"
                />
                <button
                  type="submit"
                  className="bg-gov-green hover:bg-gov-darkgreen text-white text-xs font-bold px-5 py-2 rounded shrink-0 shadow flex items-center gap-1"
                >
                  <Search size={14} /> Search Status
                </button>
              </form>

              {hasTracked && (
                <div className="space-y-4 pt-4 border-t border-gray-100 animate-slide-up">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Search Results ({trackResults.length})</h3>
                  
                  {trackResults.map((item, idx) => (
                    <div key={idx} className="bg-gray-50 border border-gray-150 rounded-lg p-5 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[9px] bg-gov-green/10 text-gov-green font-bold px-2 py-0.5 rounded uppercase tracking-wider">{item.type}</span>
                          <h4 className="font-bold text-sm text-gov-navy mt-1">{item.title}</h4>
                        </div>
                        
                        {/* Status Badge */}
                        <div>
                          {item.status === 'APPROVED' && (
                            <span className="bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1">
                              <CheckCircle size={10} /> Approved
                            </span>
                          )}
                          {item.status === 'PENDING' && (
                            <span className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1">
                              <Clock size={10} /> Pending Review
                            </span>
                          )}
                          {item.status === 'REJECTED' && (
                            <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1">
                              <XCircle size={10} /> Rejected
                            </span>
                          )}
                          {item.status === 'RETURNED' && (
                            <span className="bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1">
                              <RefreshCw size={10} /> Returned for Edits
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-xs space-y-1.5 border-t border-gray-200/50 pt-3">
                        <div className="flex justify-between text-gray-500">
                          <span>Reference Code:</span>
                          <span className="font-mono font-bold text-gov-navy">{item.code}</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                          <span>Logged Date:</span>
                          <span>{new Date(item.date).toLocaleDateString()}</span>
                        </div>
                        
                        {item.comments && (
                          <div className="bg-white border border-gray-150 p-3 rounded mt-2 text-xs">
                            <span className="font-bold block text-gov-navy text-[10px] uppercase text-gov-gold">Officer Response Notes:</span>
                            <p className="text-gray-600 italic mt-0.5">&quot;{item.comments}&quot;</p>
                          </div>
                        )}

                        {item.status === 'APPROVED' && item.type === 'Artist Registration' && (
                          <button
                            onClick={() => {
                              setSubmitSuccess({
                                type: 'artist',
                                title: 'Approved Record Found',
                                code: item.code,
                                message: 'Here is your active digital directory credentials profile card.',
                                item: item.raw
                              });
                            }}
                            className="w-full bg-gov-green hover:bg-gov-darkgreen text-white text-xs font-bold py-2 rounded shadow transition-all mt-3 flex items-center justify-center gap-1.5"
                          >
                            <Download size={12} /> View Digital ID & QR Code
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {trackResults.length === 0 && (
                    <div className="text-center p-8 bg-gray-50 rounded border border-dashed border-gray-200 text-gray-400 italic text-xs">
                      No registry entries match your query code or email. Please check spelling or verify submit triggers.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>

      </div>

      {/* SECTION 3: DIGITAL CREDENTIALS & SECURITY SCANNER */}
      <motion.section 
        className="bg-gov-cream border border-gov-gold/20 rounded-xl p-6 md:p-8 space-y-6 font-outfit"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="h-14 w-14 rounded-full bg-gov-green/10 text-gov-green flex items-center justify-center shrink-0">
            <CheckCircle size={28} />
          </div>
          <div className="space-y-2">
            <h3 className="font-playfair text-lg font-bold text-gov-navy">Securing Cultural Registry with Encrypted QR Codes</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Every digital certificate, artist registration card, and event permit generated on this platform contains an encrypted QR cryptographic signature. Security personnel at local heritage festivals and state galleries can verify credential validity instantly via local scanners.
            </p>
          </div>
        </div>
      </motion.section>

      {/* SECTION 4: CREATIVE ECONOMY STATISTICS DASHBOARD */}
      <motion.section 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-outfit"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white border border-gray-150 p-5 rounded-lg shadow-sm space-y-2">
          <span className="text-[9px] font-bold text-gov-gold uppercase tracking-wider block">Total Seed Grants</span>
          <span className="text-xl font-bold text-gov-navy block font-playfair">₦150,000,000</span>
          <div className="h-1 w-full bg-gray-100 rounded overflow-hidden">
            <div className="h-full bg-gov-green w-[85%] rounded"></div>
          </div>
        </div>

        <div className="bg-white border border-gray-150 p-5 rounded-lg shadow-sm space-y-2">
          <span className="text-[9px] font-bold text-gov-gold uppercase tracking-wider block">Registered Local Artists</span>
          <span className="text-xl font-bold text-gov-navy block font-playfair">384 +</span>
          <div className="h-1 w-full bg-gray-100 rounded overflow-hidden">
            <div className="h-full bg-gov-gold w-[70%] rounded"></div>
          </div>
        </div>

        <div className="bg-white border border-gray-150 p-5 rounded-lg shadow-sm space-y-2">
          <span className="text-[9px] font-bold text-gov-gold uppercase tracking-wider block">Heritage Sites Audited</span>
          <span className="text-xl font-bold text-gov-navy block font-playfair">14 Sites</span>
          <div className="h-1 w-full bg-gray-100 rounded overflow-hidden">
            <div className="h-full bg-teal-600 w-[95%] rounded"></div>
          </div>
        </div>

        <div className="bg-white border border-gray-150 p-5 rounded-lg shadow-sm space-y-2">
          <span className="text-[9px] font-bold text-gov-gold uppercase tracking-wider block">Verified Art Guilds</span>
          <span className="text-xl font-bold text-gov-navy block font-playfair">89 Guilds</span>
          <div className="h-1 w-full bg-gray-100 rounded overflow-hidden">
            <div className="h-full bg-gov-navy w-[60%] rounded"></div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 5: HELPDESK ADVISORY & FAQ */}
      <motion.section 
        className="bg-gov-navy text-white p-6 md:p-8 rounded-xl border border-gov-gold/15 space-y-6 font-outfit"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center space-y-1">
          <h3 className="font-playfair text-lg font-bold text-gov-gold">Frequently Asked Citizen Inquiries</h3>
          <p className="text-[10px] text-white/70">Official legal and procedural answers relating to the creative portal.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs pt-2">
          <div className="space-y-1.5">
            <h4 className="font-bold text-gov-cream">How long does it take for a grant to be audited?</h4>
            <p className="text-white/70 leading-relaxed">
              Standard creative seed applications undergo compliance reviews by the parastatals. Review cycles take up to 14 working days, and feedback will be logged under your tracking reference.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-gov-cream">Can non-citizens register on the state artist directory?</h4>
            <p className="text-white/70 leading-relaxed">
              Only indigenous artists of Akwa Ibom State or long-term state residents who have local cultural contributions are eligible to apply for formal credentials and funding.
            </p>
          </div>
        </div>
      </motion.section>

    </div>
  );
}

export default function CitizenPortal() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-xs text-gray-500 font-outfit">
        Loading Citizen Services Portal...
      </div>
    }>
      <CitizenPortalInner />
    </Suspense>
  );
}
