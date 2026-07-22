'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { dbBridge } from '@/lib/db';
import { useApp } from '@/components/AppContext';
import { 
  ShieldAlert, Landmark, Award, Calendar, FileText, CheckCircle, 
  XCircle, Clock, RefreshCw, Send, PlusCircle, Settings, ShieldCheck, ListFilter
} from 'lucide-react';

export default function AdminDashboard() {
  const { currentRole } = useApp();
  
  // Dashboard statistics
  const [stats, setStats] = useState<any>({
    artistsCount: 128,
    pendingArtists: 1,
    grantsCount: 42,
    pendingGrants: 1,
    permitsCount: 89,
    revenue: 124500,
    bidsCount: 11,
    pendingRequests: 2,
    activities: [],
    logsCount: 1
  });

  // Database lists
  const [pendingArtistsList, setPendingArtistsList] = useState<any[]>([]);
  const [pendingGrantsList, setPendingGrantsList] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  
  // Active sub-sections
  const [activeSubTab, setActiveSubTab] = useState('workflow'); // workflow, cms, audit
  
  // Form creators
  const [newsForm, setNewsForm] = useState({ title: '', category: 'Projects', content: '', author: 'Media Office', imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800' });
  const [eventForm, setEventForm] = useState({ title: '', date: '', location: '', description: '', imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800', price: '0', capacity: '1000' });
  const [cmsSuccess, setCmsSuccess] = useState<string | null>(null);

  // Workflow processing state
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [officerFeedback, setOfficerFeedback] = useState('');
  const [processingState, setProcessingState] = useState<string | null>(null);

  // Fetch data
  const loadDashboardData = async () => {
    const dbStats = await dbBridge.getDashboardStats();
    const artists = await dbBridge.getArtists('PENDING');
    const grants = await dbBridge.getGrants('PENDING');
    const logs = await dbBridge.getAuditLogs();

    if (dbStats) setStats(dbStats);
    setPendingArtistsList(artists || []);
    setPendingGrantsList(grants || []);
    setAuditLogs(logs || []);
  };

  useEffect(() => {
    if (currentRole !== 'CITIZEN') {
      loadDashboardData();
    }
  }, [currentRole]);

  // Handle Approve/Reject/Return
  const handleWorkflowAction = async (actionStatus: 'APPROVED' | 'REJECTED' | 'RETURNED') => {
    if (!selectedItem) return;
    
    setProcessingState(actionStatus);
    const role = currentRole === 'ADMIN' ? 'ADMIN' : 'STAFF';

    if (selectedItem.type === 'artist') {
      await dbBridge.updateArtistStatus(selectedItem.id, actionStatus, officerFeedback, role);
    } else if (selectedItem.type === 'grant') {
      await dbBridge.updateGrantStatus(selectedItem.id, actionStatus, officerFeedback, role);
    }

    setOfficerFeedback('');
    setSelectedItem(null);
    setProcessingState(null);
    
    // Reload dashboard stats
    await loadDashboardData();
  };

  // CMS Creations
  const handleCreateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title || !newsForm.content) return;
    await dbBridge.createTender({
      title: newsForm.title,
      description: newsForm.content,
      category: newsForm.category,
      openDate: new Date().toISOString().split('T')[0],
      closeDate: new Date(Date.now() + 30*24*3600*1000).toISOString().split('T')[0],
      budget: 10000000.00
    });
    
    setCmsSuccess('News story published successfully!');
    setNewsForm({ title: '', category: 'Projects', content: '', author: 'Media Office', imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800' });
    setTimeout(() => setCmsSuccess(null), 4000);
  };

  // Guard Clause for Access Control
  if (currentRole === 'CITIZEN') {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <ShieldAlert size={64} className="mx-auto text-gov-gold animate-bounce" />
        <h1 className="font-playfair text-2xl font-bold text-gov-navy">Access Authorization Required</h1>
        <p className="text-sm text-gray-500 leading-relaxed font-outfit">
          This portal is reserved for State Ministry staff and administrators. 
        </p>
        <div className="p-4 bg-gov-cream border border-gov-gold/30 rounded text-xs text-gray-600 leading-relaxed">
          <span className="font-bold text-gov-green block mb-1">Testing Tip:</span>
          Please switch your role badge in the upper-right corner of the top banner to <span className="font-bold font-mono text-gov-gold">Govt Staff</span> or <span className="font-bold font-mono text-gov-gold">System Admin</span> to unlock the operational management dashboard controls.
        </div>
      </div>
    );
  }

  // Count requests
  const pendingRequestsCount = pendingArtistsList.length + pendingGrantsList.length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 pb-6">
        <div>
          <span className="text-[10px] bg-gov-gold/25 text-gov-gold font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
            {currentRole} Access
          </span>
          <h1 className="font-playfair text-3xl font-bold text-gov-navy mt-1">
            Ministry Administration Workspace
          </h1>
        </div>
        
        {/* Sub-tabs menu */}
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveSubTab('workflow')}
            className={`text-xs font-bold px-4 py-2 rounded transition-all ${
              activeSubTab === 'workflow' ? 'bg-gov-green text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Approval Workflows ({pendingRequestsCount})
          </button>
          <button 
            onClick={() => setActiveSubTab('cms')}
            className={`text-xs font-bold px-4 py-2 rounded transition-all ${
              activeSubTab === 'cms' ? 'bg-gov-green text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            CMS Portal Manager
          </button>
          <button 
            onClick={() => setActiveSubTab('audit')}
            className={`text-xs font-bold px-4 py-2 rounded transition-all ${
              activeSubTab === 'audit' ? 'bg-gov-green text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Security Audit Logs ({auditLogs.length})
          </button>
        </div>
      </div>

      {/* DASHBOARD METRICS SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-150 p-5 rounded-lg shadow-sm space-y-3">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Registered Artists</span>
            <Award size={20} className="text-[#C7A349]" />
          </div>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-extrabold text-gov-navy">{stats.artistsCount}</span>
            <span className="text-[10px] text-green-500 font-bold bg-green-500/10 px-2 py-0.5 rounded">Active Catalog</span>
          </div>
        </div>

        <div className="bg-white border border-gray-150 p-5 rounded-lg shadow-sm space-y-3">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Permit Revenue</span>
            <Landmark size={20} className="text-gov-green" />
          </div>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-extrabold text-gov-navy">₦{(stats.revenue).toLocaleString()}</span>
            <span className="text-[10px] text-green-500 font-bold bg-green-500/10 px-2 py-0.5 rounded">Audit Ready</span>
          </div>
        </div>

        <div className="bg-white border border-gray-150 p-5 rounded-lg shadow-sm space-y-3">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Grants Active</span>
            <Landmark size={20} className="text-gov-gold" />
          </div>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-extrabold text-gov-navy">{stats.grantsCount} Approved</span>
            <span className="text-[10px] text-orange-500 font-bold bg-orange-500/10 px-2 py-0.5 rounded">{stats.pendingGrants} Pending</span>
          </div>
        </div>

        <div className="bg-white border border-gray-150 p-5 rounded-lg shadow-sm space-y-3">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Bids Lodged</span>
            <FileText size={20} className="text-blue-500" />
          </div>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-extrabold text-gov-navy">{stats.bidsCount} Offers</span>
            <span className="text-[10px] text-blue-500 font-bold bg-blue-500/10 px-2 py-0.5 rounded">Procure Tracker</span>
          </div>
        </div>
      </div>

      {/* DASHBOARD CHARTS & ANALYTICS VISUALIZER (CUSTOM HAND-DRAWN SVGS TO AVOID COMPILING ERRORS) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Applications Chart */}
        <div className="bg-white border border-gov-gold/20 p-6 rounded-xl shadow-md space-y-4">
          <h3 className="font-playfair text-sm font-bold text-gov-navy border-b border-gray-100 pb-2">Monthly Registrations Registry</h3>
          
          {/* Custom SVG Bar Chart */}
          <div className="h-56 w-full flex items-end justify-between px-4 pt-8 pb-4 relative">
            {/* Grid Y Axis labels */}
            <div className="absolute left-0 top-0 bottom-4 w-8 flex flex-col justify-between text-[9px] text-gray-400 border-r border-gray-100 pr-1 select-none">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>
            
            {/* Bars */}
            <div className="flex-1 flex justify-around pl-10 items-end h-full">
              {[
                { month: 'Jan', val: 55, h: 'h-[55%]' },
                { month: 'Feb', val: 78, h: 'h-[78%]' },
                { month: 'Mar', val: 62, h: 'h-[62%]' },
                { month: 'Apr', val: 95, h: 'h-[95%]' },
                { month: 'May', val: 120, h: 'h-[100%]' },
                { month: 'Jun', val: 89, h: 'h-[89%]' }
              ].map((b, i) => (
                <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer w-8">
                  <div className="text-[9px] font-bold text-gov-green opacity-0 group-hover:opacity-100 transition-opacity mb-1">{b.val}</div>
                  <div className={`w-full bg-[#0B5E3C] hover:bg-[#C7A349] rounded-t transition-all ${b.h}`}></div>
                  <span className="text-[10px] font-semibold text-gray-500">{b.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Budget Allocation Pie Chart */}
        <div className="bg-white border border-gov-gold/20 p-6 rounded-xl shadow-md space-y-4">
          <h3 className="font-playfair text-sm font-bold text-gov-navy border-b border-gray-100 pb-2">Creative Grant Allocations</h3>
          
          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 h-56">
            {/* Donut graphic (pure CSS/SVG vector) */}
            <div className="relative h-32 w-32 shrink-0">
              <svg viewBox="0 0 36 36" className="h-full w-full transform -rotate-90">
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#e2e8f0" strokeWidth="3" />
                
                {/* Visual Art segment (40%) */}
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#0B5E3C" strokeWidth="4" 
                  strokeDasharray="40 100" strokeDashoffset="0" />
                
                {/* Performance segment (35%) */}
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#C7A349" strokeWidth="4" 
                  strokeDasharray="35 100" strokeDashoffset="-40" />

                {/* Digital scan segment (25%) */}
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#111A2E" strokeWidth="4" 
                  strokeDasharray="25 100" strokeDashoffset="-75" />
              </svg>
              <div className="absolute inset-0 flex flex-col justify-center items-center select-none">
                <span className="text-base font-extrabold text-gov-navy">N{stats.grantsCount}M</span>
                <span className="text-[9px] text-gray-400">Total Funds</span>
              </div>
            </div>
            
            {/* Legend */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 bg-[#0B5E3C] rounded-full inline-block"></span>
                <span className="font-semibold text-gray-700">Digital Art Scans (40%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 bg-[#C7A349] rounded-full inline-block"></span>
                <span className="font-semibold text-gray-700">Museum Apprenticeships (35%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 bg-[#111A2E] rounded-full inline-block"></span>
                <span className="font-semibold text-gray-700">Gastronomy Promotion (25%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SUB TAB 1: WORKFLOW APPROVALS QUEUE */}
      {activeSubTab === 'workflow' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* List of pending requests (Col span 7) */}
          <div className="lg:col-span-7 bg-white border border-gray-150 rounded-xl p-6 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
              <h3 className="font-playfair text-lg font-bold text-gov-navy">Pending Verification Queue</h3>
              <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{pendingRequestsCount} Action Items</span>
            </div>

            <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2">
              {/* Artists */}
              {pendingArtistsList.map((a) => (
                <div 
                  key={a.id} 
                  onClick={() => setSelectedItem({ ...a, type: 'artist' })}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedItem?.id === a.id ? 'border-gov-gold bg-gov-cream' : 'border-gray-150 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] bg-gov-green/10 text-gov-green font-bold px-2 py-0.5 rounded uppercase">Artist Registry</span>
                      <h4 className="font-bold text-sm text-gov-navy mt-1.5">{a.name}</h4>
                      <p className="text-[10px] text-gray-400">Ref Code: {a.certificateCode} | State: {a.stateOfOrigin}</p>
                    </div>
                    <Clock size={16} className="text-orange-500" />
                  </div>
                </div>
              ))}

              {/* Grants */}
              {pendingGrantsList.map((g) => (
                <div 
                  key={g.id} 
                  onClick={() => setSelectedItem({ ...g, type: 'grant' })}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedItem?.id === g.id ? 'border-gov-gold bg-gov-cream' : 'border-gray-150 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] bg-gov-gold/15 text-gov-gold font-bold px-2 py-0.5 rounded uppercase">Grant Project</span>
                      <h4 className="font-bold text-sm text-gov-navy mt-1.5">{g.title}</h4>
                      <p className="text-[10px] text-gray-400">Applicant: {g.artistName} | Request: N{g.budgetRequest.toLocaleString()}</p>
                    </div>
                    <Clock size={16} className="text-orange-500" />
                  </div>
                </div>
              ))}

              {pendingRequestsCount === 0 && (
                <div className="text-center p-12 bg-gray-50 border border-dashed border-gray-200 text-gray-400 italic text-xs rounded-lg">
                  Verification queue is completely clear. Outstanding registrations have been completed!
                </div>
              )}
            </div>
          </div>

          {/* Review Details Pane (Col span 5) */}
          <div className="lg:col-span-5 bg-white border-2 border-gov-gold/30 rounded-xl p-6 shadow-xl space-y-6">
            <h3 className="font-playfair text-base font-bold text-gov-green border-b border-gray-100 pb-3 flex items-center gap-1.5">
              <ShieldCheck size={18} /> Administrative Audit Desk
            </h3>

            {selectedItem ? (
              <div className="space-y-4 text-xs animate-slide-up">
                
                {/* Details list */}
                <div className="space-y-2 p-4 bg-gray-50 rounded border border-gray-150">
                  <div className="flex justify-between font-semibold border-b border-gray-200/50 pb-1.5">
                    <span className="text-gray-500 uppercase text-[9px] tracking-wide">Review Category:</span>
                    <span className="text-gov-green uppercase text-[10px] font-bold">{selectedItem.type}</span>
                  </div>
                  
                  {selectedItem.type === 'artist' ? (
                    <>
                      <div>
                        <span className="text-gray-400 block text-[9px]">NAME:</span>
                        <span className="font-bold text-gov-navy">{selectedItem.name}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[9px]">EMAIL:</span>
                        <span>{selectedItem.email}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[9px]">CREATIVE MEDIUM:</span>
                        <span className="font-semibold">{selectedItem.artistType}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[9px]">QUALIFICATIONS:</span>
                        <span>{selectedItem.qualifications}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[9px]">BIOGRAPHY:</span>
                        <p className="text-gray-600 mt-0.5 italic">"{selectedItem.bio}"</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <span className="text-gray-400 block text-[9px]">PROJECT TITLE:</span>
                        <span className="font-bold text-gov-navy">{selectedItem.title}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[9px]">APPLICANT:</span>
                        <span>{selectedItem.artistName}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[9px]">BUDGET REQUEST:</span>
                        <span className="font-bold text-gov-green">N{selectedItem.budgetRequest.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[9px]">PROPOSAL SUMMARY:</span>
                        <p className="text-gray-600 mt-0.5 italic">"{selectedItem.proposalSummary}"</p>
                      </div>
                    </>
                  )}
                  
                  <div>
                    <span className="text-gray-400 block text-[9px]">ATTACHMENT PORTFOLIO:</span>
                    <a href="#" className="text-gov-gold font-bold hover:underline">Download file.pdf</a>
                  </div>
                </div>

                {/* Officer Feedback */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 block">Officer Notes & Response</label>
                  <textarea
                    rows={3}
                    value={officerFeedback}
                    onChange={(e) => setOfficerFeedback(e.target.value)}
                    placeholder="Input verification feedback notes, required amendments details, or disbursement directives..."
                    className="w-full bg-gray-50 text-xs border border-gray-250 rounded p-2 focus:outline-none focus:border-gov-green text-gray-700"
                  ></textarea>
                </div>

                {/* Approval Actions Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    disabled={!!processingState}
                    onClick={() => handleWorkflowAction('APPROVED')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded shadow text-xs flex items-center justify-center gap-1 transition-all disabled:opacity-50"
                  >
                    <CheckCircle size={14} /> Approve record
                  </button>
                  <button
                    disabled={!!processingState}
                    onClick={() => handleWorkflowAction('RETURNED')}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded shadow text-xs flex items-center justify-center gap-1 transition-all disabled:opacity-50"
                  >
                    <RefreshCw size={14} /> Return edits
                  </button>
                  <button
                    disabled={!!processingState}
                    onClick={() => handleWorkflowAction('REJECTED')}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded shadow text-xs flex items-center justify-center gap-1 transition-all disabled:opacity-50"
                  >
                    <XCircle size={14} /> Reject
                  </button>
                </div>

              </div>
            ) : (
              <div className="text-center p-8 text-gray-450 italic text-xs leading-relaxed">
                Select an artist registration or grant application proposal from the queue list to audit their records.
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB TAB 2: CMS CONTENT MANAGER */}
      {activeSubTab === 'cms' && (
        <div className="bg-white border border-gray-150 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="font-playfair text-lg font-bold text-gov-navy">Publish Press Announcements</h3>
            <p className="text-xs text-gray-500">CMS editor to update news cards and release Minister schedules instantly.</p>
          </div>

          {cmsSuccess && (
            <div className="p-3 bg-green-500/10 border border-green-500/30 text-green-700 text-xs rounded text-center">
              {cmsSuccess}
            </div>
          )}

          <form onSubmit={handleCreateNews} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600 block">Notice Header Title</label>
                <input
                  type="text"
                  required
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
                  placeholder="e.g. Ministry hosts National Art Dialogue Expo"
                  className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green text-gray-700"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600 block">Publish Category</label>
                <select
                  value={newsForm.category}
                  onChange={(e) => setNewsForm({...newsForm, category: e.target.value})}
                  className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green text-gray-700"
                >
                  <option value="Projects">Projects updates</option>
                  <option value="Announcements">Announcements updates</option>
                  <option value="Minister Speech">Minister Speeches</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600 block">News Body Content</label>
              <textarea
                required
                rows={6}
                value={newsForm.content}
                onChange={(e) => setNewsForm({...newsForm, content: e.target.value})}
                placeholder="Compose the full detailed publication announcement contents..."
                className="w-full bg-gray-50 text-xs border border-gray-250 rounded px-3 py-2 focus:outline-none focus:border-gov-green text-gray-700"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-gov-green hover:bg-gov-darkgreen text-white font-bold text-xs px-6 py-3 rounded shadow transition-all flex items-center gap-1"
            >
              <PlusCircle size={14} /> Publish Announcement
            </button>
          </form>
        </div>
      )}

      {/* SUB TAB 3: AUDIT LOGS */}
      {activeSubTab === 'audit' && (
        <div className="bg-white border border-gray-150 rounded-xl p-6 shadow-sm space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="font-playfair text-lg font-bold text-gov-navy">System Audit Trail</h3>
            <p className="text-xs text-gray-500">Security history tracking user roles, login session triggers, and verification updates.</p>
          </div>

          <div className="h-80 overflow-y-auto border border-gray-100 rounded">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-400 font-bold uppercase tracking-wider text-[9px]">
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">User Role</th>
                  <th className="p-3">Operational Action</th>
                  <th className="p-3">Audit Details</th>
                  <th className="p-3">Client IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50/50">
                    <td className="p-3 font-mono text-[10px]">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="p-3 font-bold">
                      <span className={`px-2 py-0.5 rounded text-[9px] ${
                        log.userRole === 'ADMIN' ? 'bg-red-100 text-red-700' : log.userRole === 'STAFF' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {log.userRole}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-bold text-gov-green">{log.action}</td>
                    <td className="p-3 text-gray-700 font-medium">{log.details}</td>
                    <td className="p-3 font-mono text-gray-400">{log.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 5: ADMINISTRATIVE SECURITY PROTOCOLS */}
      <motion.section 
        className="bg-gov-navy text-white p-6 md:p-8 rounded-xl border border-gov-gold/15 space-y-6 font-outfit"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 bg-red-500/20 text-red-400 rounded flex items-center justify-center shrink-0">
            <ShieldCheck size={22} />
          </div>
          <div className="space-y-2">
            <h3 className="font-playfair text-lg font-bold text-gov-gold">Administrative Security & Data Compliance Regulations</h3>
            <p className="text-xs text-white/80 leading-relaxed">
              All staff and administrators operating this dashboard must comply with state security directives. Unauthorized disclosure of artist bank coordinates or verification data logs is strictly prohibited.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs pt-2">
          <div className="p-4 bg-white/5 border border-white/10 rounded-lg space-y-1.5">
            <h4 className="font-bold text-gov-cream font-playfair">1. CAC Verification Checks</h4>
            <p className="text-white/70 leading-relaxed text-[11px]">
              Tender vendor accounts must undergo manual Corporate Affairs Commission registry cross-checks before being selected for active bids.
            </p>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-lg space-y-1.5">
            <h4 className="font-bold text-gov-cream font-playfair">2. Grant Disbursement Audit</h4>
            <p className="text-white/70 leading-relaxed text-[11px]">
              Every seed grant disbursement above N2,500,000 must be approved by the Finance Directorate and bear a dual cryptographic signature.
            </p>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-lg space-y-1.5">
            <h4 className="font-bold text-gov-cream font-playfair">3. Session IP Monitoring</h4>
            <p className="text-white/70 leading-relaxed text-[11px]">
              Audit logs capture IP details on all role state changes. Suspicious logins from external states are instantly quarantined by the security board.
            </p>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
