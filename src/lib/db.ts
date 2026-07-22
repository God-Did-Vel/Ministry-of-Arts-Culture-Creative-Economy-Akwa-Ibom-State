// Hybrid Mock/Remote Database Bridge for Nigeria Ministry of Arts & Culture
const API_BASE = 'http://localhost:5000/api';

// Culturally rich static datasets
export interface CultureStateData {
  name: string;
  capital: string;
  region: string;
  attire: string;
  cuisine: string;
  languages: string[];
  unescoSites: string[];
  museums: string[];
  folklore: string;
  attireDesc: string;
  cuisineDesc: string;
}

export const CULTURAL_STATES: Record<string, CultureStateData> = {
  "Uyo": {
    name: "Uyo",
    capital: "Uyo (State Capital)",
    region: "Akwa Ibom North-East (Uyo Senatorial District)",
    attire: "Premium Ibibio Lace Wrapper, Onyonyo Gown & Gold-Trimmed Usobo",
    cuisine: "Afang Soup, Edikang Ikong, Ekpang Nkukwo",
    languages: ["Ibibio", "English"],
    unescoSites: ["Ibom Cultural Heritage Monument & Unity Park Sanctuary"],
    museums: ["Akwa Ibom State Museum Uyo", "Ibom Cultural Center & Archives"],
    folklore: "The heart of Ibibio culture, featuring majestic Ekpe secret society ceremonies, native masquerade dances, and the traditional Uta flute troupes.",
    attireDesc: "Victorian-inspired Onyonyo gowns for women decorated with intricate coral beads, and Usobo wrappers paired with long-tail gold-embroidered lace shirts for men.",
    cuisineDesc: "Rich Afang soup prepared with wild forest Afang leaves, waterleaves, periwinkles, stockfish, and beef, served with pounded yam or fufu."
  },
  "Ikot Ekpene": {
    name: "Ikot Ekpene",
    capital: "Ikot Ekpene (Raffia City)",
    region: "Akwa Ibom North-West (Ikot Ekpene Senatorial District)",
    attire: "Traditional Annang Woven Raffia Vest & Annang Ceremonial Wrappers",
    cuisine: "Otong Soup (Native Okra), Annang Fisherman Chow",
    languages: ["Annang", "Ibibio", "English"],
    unescoSites: ["Ikot Ekpene Raffia Craft Market (National Heritage Asset)"],
    museums: ["Raffia City Incubation Gallery", "Ikot Ekpene Traditional Carving Sanctuary"],
    folklore: "Celebrated globally as the 'Raffia City' for exquisite wood carvings representing ancestral guardians and high-skill raffia weaving.",
    attireDesc: "Hand-woven raffia vests, headgears, and body wraps representing status and skill, complemented by hand-carved walking sticks.",
    cuisineDesc: "Aromatic Otong soup cooked with fresh okra, red palm oil, local fish, and wild herbs, served with smooth yellow garri."
  },
  "Oron": {
    name: "Oron",
    capital: "Oron Town",
    region: "Akwa Ibom South (Eket Senatorial District)",
    attire: "Oron Native Beaded Wrapper & Traditional Chieftaincy Robes",
    cuisine: "Oron Fisherman Soup, Seafood Ekpang Nkukwo",
    languages: ["Oron", "English"],
    unescoSites: ["Oron Ancestral Ekpu Carving Sanctuary (Tentative World Reserve)"],
    museums: ["Oron Maritime & Bronze Museum", "Oron Beach Historical Complex"],
    folklore: "Famous for the ancient Ekpu wooden carvings honoring ancestors, and high-energy traditional canoe regattas on the cross-river estuary.",
    attireDesc: "Double wrappers of matching lace, heavy polished coral beads around the neck, and traditional feather-adorned hats.",
    cuisineDesc: "Oron Fisherman Soup loaded with fresh ocean fish, giant crabs, shrimp, oysters, and periwinkles, simmered in a spiced broth."
  },
  "Eket": {
    name: "Eket",
    capital: "Eket Town",
    region: "Akwa Ibom South (Eket Senatorial District)",
    attire: "Eket Ceremonial Gold Lace & Beaded Staffs",
    cuisine: "Edikang Ikong, Native Seafood Stew",
    languages: ["Eket", "Ibibio", "English"],
    unescoSites: ["Coastal Oil-History Heritage Site, Ibeno Beach Sanctuary"],
    museums: ["Eket Cultural Arts Center"],
    folklore: "The coastal heritage of Eket, home of the Eket cultural festival, sacred shrines, and the historic Ibeno beach dunes.",
    attireDesc: "Luxury silk wrappers for women, and men in tailored long shirts, bowler hats, and ceremonial silver staffs.",
    cuisineDesc: "Nutritious Edikang Ikong soup packed with shredded pumpkin leaves (Ugu), waterleaves, snails, periwinkles, and mixed meats."
  },
  "Ikot Abasi": {
    name: "Ikot Abasi",
    capital: "Ikot Abasi Town",
    region: "Akwa Ibom South (Eket Senatorial District)",
    attire: "Traditional Opobo-Ibibio Usobo Wrapper & Velvet Cap",
    cuisine: "Ikot Abasi Fisherman Soup, Cocoyam Ekpang",
    languages: ["Ibibio", "English"],
    unescoSites: ["The Bridge of No Return, Amalgamation House (1914), 1929 Women's War Monument"],
    museums: ["Ikot Abasi Colonial History Museum"],
    folklore: "Highly historical district featuring colonial monuments, the site where the 1914 amalgamation of Nigeria was signed, and the 1929 Women's War uprising.",
    attireDesc: "Regal velvet Usobo wrappers tied at the waist, matching long lace tunics, and gold-brocaded staff canes.",
    cuisineDesc: "Cocoyam grated and wrapped in tender green cocoyam leaves, steamed with palm oil, smoked fish, and periwinkles (Ekpang Nkukwo)."
  },
  "Itu": {
    name: "Itu",
    capital: "Itu Town",
    region: "Akwa Ibom North-East (Uyo Senatorial District)",
    attire: "Itu Traditional Cotton Wrappers & Coral Bead Crowns",
    cuisine: "Mmong Mmong Ikpa Soup, Steamed Plantain Cakes",
    languages: ["Ibibio", "Itu", "English"],
    unescoSites: ["Mary Slessor Historical Cottage (Okoyong), Presbyterian Mission Site"],
    museums: ["Mary Slessor Heritage Center"],
    folklore: "Famed as the location where Mary Slessor stopped the killing of twins, and home of early missionary education and the Itu river port.",
    attireDesc: "Colorful cotton wrappers with matching blouses for women, and white long-tail shirts with native caps for men.",
    cuisineDesc: "Mmong Mmong Ikpa, a delicious traditional green vegetable soup cooked with native seasoning and smoked river fish."
  },
  "Ibiono Ibom": {
    name: "Ibiono Ibom",
    capital: "Oko Ita",
    region: "Akwa Ibom North-East (Uyo Senatorial District)",
    attire: "Traditional Sacred Ekpe Society Regalia & Leopard Scarves",
    cuisine: "Native Melon (Egusi) Soup with Yam Swallow",
    languages: ["Ibibio", "English"],
    unescoSites: ["Ibiono Sacred Forests, Historic Caves of Oko Ita"],
    museums: ["Ibiono Cultural Gallery"],
    folklore: "Renowned for its preservation of high-level Ekpe society shrines and palm wine tapping history in the lush green hills.",
    attireDesc: "Embroidered black and red wraps displaying Nsibidi script symbols, topped with leopard-skin sashes and head bands.",
    cuisineDesc: "Thick Egusi soup cooked with local oil bean seeds, crayfish, stockfish, and fresh pumpkin leaves, paired with pounded yam."
  }
};

// Generate dynamic details for remaining LGAs so clicking is never empty
export function getStateCulturalData(stateName: string): CultureStateData {
  if (CULTURAL_STATES[stateName]) {
    return CULTURAL_STATES[stateName];
  }

  // Fallback matching senatorial districts
  return {
    name: stateName,
    capital: `${stateName} Headquarters`,
    region: "Akwa Ibom Senatorial District",
    attire: "Akwa Ibom Lace Wrapper & Usobo",
    cuisine: "Afang Soup & Ekpang Nkukwo",
    languages: ["Ibibio", "English"],
    unescoSites: ["Local Community Heritage Sites"],
    museums: ["State Cultural Parastatal Hub"],
    folklore: "Lively local festivals, palm wine celebrations, and family lineage farming traditions.",
    attireDesc: "Traditional lace wrappers with matching head wraps, representing Akwa Ibom's warm hospitality.",
    cuisineDesc: "Traditional leaf soup cooked with rich crayfish and mixed meats, celebrating local farming harvests."
  };
}

// -------------------------------------------------------------
// LOCAL STORAGE DATABASE MOCK FOR CLIENT-SIDE WORKFLOWS
// -------------------------------------------------------------
interface LocalDB {
  artists: any[];
  grants: any[];
  permits: any[];
  complaints: any[];
  foi: any[];
  tenders: any[];
  news: any[];
  events: any[];
  auditLogs: any[];
}

function getLocalDB(): LocalDB {
  if (typeof window === 'undefined') {
    return { artists: [], grants: [], permits: [], complaints: [], foi: [], tenders: [], news: [], events: [], auditLogs: [] };
  }

  const stored = localStorage.getItem('ministry_culture_db');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // corrupt database
    }
  }

  // Set default seed
  const defaultDB: LocalDB = {
    artists: [
      {
        id: "art-1",
        name: "Anietie Udoh",
        email: "anietie@raffiacrafts.com",
        artistType: "Wood Sculptor & Raffia Weaver",
        stateOfOrigin: "Akwa Ibom",
        bio: "Specializing in traditional Annang wood carvings and raffia-woven masquerade regalia at Ikot Ekpene.",
        qualifications: "Master Carver Certificate, Ikot Ekpene Crafts Council",
        documentUrl: "#",
        certificateCode: "AKS-ART-893041",
        qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=AKS-ART-893041",
        status: "APPROVED",
        comments: "Superb portfolio. Certified Master Carver.",
        createdAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString()
      },
      {
        id: "art-2",
        name: "Edidiong Bassey",
        email: "edidiong@ibomwood.com",
        artistType: "Digital Media Builder",
        stateOfOrigin: "Akwa Ibom",
        bio: "Directing local folklore documentaries and capturing high-definition drone visuals of historical monuments in Itu and Oron.",
        qualifications: "B.A. Theatre Arts, University of Uyo",
        documentUrl: "#",
        certificateCode: "AKS-ART-443901",
        qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=AKS-ART-443901",
        status: "PENDING",
        createdAt: new Date().toISOString()
      }
    ],
    grants: [
      {
        id: "grt-1",
        artistId: "art-1",
        artistName: "Anietie Udoh",
        title: "The Raffia City Young Apprentice Program",
        category: "Capacity Building & Training",
        budgetRequest: 2500000.00,
        proposalSummary: "An intensive 6-month wood carving and raffia weaving masterclass for 15 unemployed youths in Ikot Ekpene to preserve traditional crafts.",
        status: "APPROVED",
        feedback: "First tranche disbursed. Monthly progress report expected.",
        createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString()
      },
      {
        id: "grt-2",
        artistId: "art-2",
        artistName: "Edidiong Bassey",
        title: "Virtual Mapping of Oron Ekpu Ancestral Carvings",
        category: "Digital Preservation",
        budgetRequest: 4000000.00,
        proposalSummary: "Scanning and building a high-fidelity 3D online database of returned wooden carvings housed in the Oron Maritime Museum.",
        status: "PENDING",
        createdAt: new Date().toISOString()
      }
    ],
    permits: [
      {
        id: "pmt-1",
        applicantName: "Ibom Performing Arts Coalition",
        applicantEmail: "info@ibomperformingarts.org",
        permitType: "EVENT",
        details: "Annual Ibibio Traditional Dance Festival and Masquerade display.",
        location: "Unity Park, Uyo",
        eventDate: "2026-08-20",
        amountPaid: 25000.0,
        status: "APPROVED",
        permitCode: "AKS-PMT-321890",
        qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=AKS-PMT-321890",
        createdAt: new Date().toISOString()
      }
    ],
    complaints: [
      {
        id: "cmp-1",
        name: "Ekemini Akpan",
        email: "ekemini@gmail.com",
        subject: "ID Card Print Quality",
        description: "My artist registry approval completed last week, but the printed digital ID card QR code resolution is slightly blurry on mobile screen scanning.",
        status: "PENDING",
        trackingCode: "COMP-493012",
        createdAt: new Date().toISOString()
      }
    ],
    foi: [
      {
        id: "foi-1",
        name: "Ibom Transparency Forum",
        organization: "Civil Society Network",
        email: "foi@ibomtransparency.org",
        description: "Requested expenditure breakdown for the 2025 Oron Museum Roof Restoration project funded under parastatal grants.",
        status: "PENDING",
        trackingCode: "FOI-774012",
        createdAt: new Date().toISOString()
      }
    ],
    tenders: [
      {
        id: "ten-1",
        title: "Oron Maritime Museum Roof & Structural Restoration",
        description: "Bids are invited from experienced historical preservation contractors to restore the roofing, install modern humidity controls, and repair wall paneling at the Oron Museum.",
        category: "Structural Preservation",
        openDate: "2026-07-16",
        closeDate: "2026-08-30",
        budget: 18500000.00,
        bidsCount: 4,
        status: "ACTIVE"
      },
      {
        id: "ten-2",
        title: "Ikom Monoliths Local Preservation & Fencing Project",
        description: "Bids are invited for fencing and environmental landscaping at the border heritage zones to protect local antiquities from weathering.",
        category: "Civil Works",
        openDate: "2026-07-10",
        closeDate: "2026-08-15",
        budget: 8200000.00,
        bidsCount: 3,
        status: "ACTIVE"
      }
    ],
    news: [
      {
        id: "news-1",
        title: "Ministry Launches N5B Creative Economy Expansion Fund",
        content: "The Federal Ministry of Arts, Culture, and the Creative Economy has officially unveiled a N5 Billion developmental fund targeting registered artisans, creative builders, fashion leaders, and tech performers to scale digital culture exports. The Minister stated that this will stimulate over 50,000 direct jobs in the next 18 months.",
        category: "Projects",
        imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800",
        author: "Hon. Minister",
        views: 2420,
        createdAt: "2026-07-19T10:00:00.000Z"
      },
      {
        id: "news-2",
        title: "UNESCO Applauds Reconstruction of Ancient Kano City Walls",
        content: "A delegation from UNESCO arrived in Kano state to review restoration works on the Ancient Kano City Walls. The historical monument is undergoing state-of-the-art structural preservation utilizing local earth-binding techniques fused with modern chemical hardening technologies.",
        category: "Announcements",
        imageUrl: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=800",
        author: "Director of Heritage",
        views: 1845,
        createdAt: "2026-07-17T10:00:00.000Z"
      },
      {
        id: "news-3",
        title: "Full Speech: National Day of Arts & Creative Dialogue",
        content: "Below is the full speech delivered by the Honourable Minister outlining the three-pillar strategy for National Heritage Preservation, Creative Capacity Empowerment, and Global Digitization of Museum Collections. The mandate is to align Nigerian art collections with modern museum metadata protocols.",
        category: "Minister Speech",
        imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
        author: "Media Office",
        views: 940,
        createdAt: "2026-07-15T10:00:00.000Z"
      }
    ],
    events: [
      {
        id: "evt-1",
        title: "The Annang Ekong Warrior Festival",
        date: "2026-09-12T10:00:00.000Z",
        location: "Raffia City Square, Ikot Ekpene",
        description: "Witness the magnificent warrior dance parades, traditional wood carving demonstrations, and cultural music performances celebrating Annang heritage. Safe and open to all.",
        imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800",
        price: 0,
        registeredCount: 384,
        capacity: 5000
      },
      {
        id: "evt-2",
        title: "Akwa Ibom State Cultural Fiesta & Ekpe Display",
        date: "2026-10-05T14:30:00.000Z",
        location: "Ibom Hall Ground, Uyo",
        description: "An immersive street performance and masquerade festival celebrating Ibibio, Annang, and Oron folklore, featuring sacred Ekpe Society displays. Register for free tickets.",
        imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800",
        price: 0,
        registeredCount: 1420,
        capacity: 10000
      },
      {
        id: "evt-3",
        title: "Oron Maritime Museum VR Portal Unveiling",
        date: "2026-07-28T09:00:00.000Z",
        location: "Ibom Cultural Center Hall, Uyo",
        description: "Official launch event of the online virtual museum and 3D digital replicas of the Ekpu wooden carvings. Attendees will test virtual reality gear.",
        imageUrl: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&q=80&w=800",
        price: 0,
        registeredCount: 84,
        capacity: 250
      }
    ],
    auditLogs: [
      {
        id: "log-1",
        userRole: "ADMIN",
        action: "PORTAL_INIT",
        details: "Akwa Ibom State E-Government Cultural Infrastructure Platform initialized.",
        ipAddress: "127.0.0.1",
        timestamp: new Date().toISOString()
      }
    ]
  };

  localStorage.setItem('ministry_culture_db', JSON.stringify(defaultDB));
  return defaultDB;
}

function saveLocalDB(db: LocalDB) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('ministry_culture_db', JSON.stringify(db));
  }
}

// -------------------------------------------------------------
// HYBRID HTTP-LOCAL FETCH BRIDGE
// -------------------------------------------------------------
async function safeFetch(url: string, options?: RequestInit, fallbackAction?: () => any) {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {})
      }
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    // Backend offline, execute mock fallback action
  }
  return fallbackAction ? fallbackAction() : null;
}

export const dbBridge = {
  // Statistics
  async getDashboardStats() {
    return safeFetch(`${API_BASE}/dashboard/stats`, {}, () => {
      const db = getLocalDB();
      const approvedArtists = db.artists.filter(a => a.status === 'APPROVED').length;
      const pendingArtists = db.artists.filter(a => a.status === 'PENDING').length;
      const approvedGrants = db.grants.filter(g => g.status === 'APPROVED').length;
      const pendingGrants = db.grants.filter(g => g.status === 'PENDING').length;
      const permitsCount = db.permits.length;
      const totalRevenue = db.permits.reduce((acc, p) => acc + p.amountPaid, 0);
      const totalBids = db.tenders.reduce((acc, t) => acc + t.bidsCount, 0);

      const recentActivities = [
        ...db.artists.map(a => ({ id: a.id, type: 'Artist Registration', detail: `${a.name} registered (${a.status})`, date: a.createdAt })),
        ...db.grants.map(g => ({ id: g.id, type: 'Grant Application', detail: `"${g.title}" by ${g.artistName} (${g.status})`, date: g.createdAt })),
        ...db.permits.map(p => ({ id: p.id, type: 'Permit Application', detail: `${p.permitType} Permit for ${p.applicantName}`, date: p.createdAt }))
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

      return {
        artistsCount: approvedArtists + 128,
        pendingArtists,
        grantsCount: approvedGrants + 42,
        pendingGrants,
        permitsCount: permitsCount + 89,
        revenue: totalRevenue + 124500,
        bidsCount: totalBids,
        pendingRequests: pendingArtists + pendingGrants,
        activities: recentActivities,
        logsCount: db.auditLogs.length
      };
    });
  },

  // Artists
  async getArtists(status?: string, search?: string) {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (search) params.append('search', search);

    return safeFetch(`${API_BASE}/artists?${params.toString()}`, {}, () => {
      const db = getLocalDB();
      let list = db.artists;
      if (status) {
        list = list.filter(a => a.status === status);
      }
      if (search) {
        const s = search.toLowerCase();
        list = list.filter(a => 
          a.name.toLowerCase().includes(s) || 
          a.email.toLowerCase().includes(s) || 
          a.artistType.toLowerCase().includes(s) ||
          a.certificateCode.toLowerCase().includes(s)
        );
      }
      return list;
    });
  },

  async registerArtist(data: { name: string; email: string; artistType: string; stateOfOrigin: string; bio: string; qualifications: string; documentUrl?: string }) {
    return safeFetch(`${API_BASE}/artists`, {
      method: 'POST',
      body: JSON.stringify(data)
    }, () => {
      const db = getLocalDB();
      const certCode = 'NGA-ART-' + Math.floor(100000 + Math.random() * 900000);
      const newArtist = {
        id: 'art-' + (db.artists.length + 1),
        ...data,
        documentUrl: data.documentUrl || '#',
        certificateCode: certCode,
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${certCode}`,
        status: 'PENDING',
        createdAt: new Date().toISOString()
      };
      db.artists.unshift(newArtist);

      // Audit Log
      db.auditLogs.unshift({
        id: 'log-' + (db.auditLogs.length + 1),
        userRole: 'CITIZEN',
        action: 'ARTIST_REGISTER',
        details: `Artist ${data.name} applied. Ref: ${certCode}`,
        ipAddress: '127.0.0.1',
        timestamp: new Date().toISOString()
      });

      saveLocalDB(db);
      return newArtist;
    });
  },

  async updateArtistStatus(id: string, status: string, comments: string, adminRole: string = 'ADMIN') {
    return safeFetch(`${API_BASE}/artists/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status, comments, adminRole })
    }, () => {
      const db = getLocalDB();
      const idx = db.artists.findIndex(a => a.id === id);
      if (idx !== -1) {
        db.artists[idx].status = status;
        db.artists[idx].comments = comments;

        // Log audit
        db.auditLogs.unshift({
          id: 'log-' + (db.auditLogs.length + 1),
          userRole: adminRole,
          action: `ARTIST_${status}`,
          details: `Artist ${db.artists[idx].name} updated to ${status}. Details: ${comments || 'None'}`,
          ipAddress: '127.0.0.1',
          timestamp: new Date().toISOString()
        });
        saveLocalDB(db);
        return db.artists[idx];
      }
      return null;
    });
  },

  // Grants
  async getGrants(status?: string, search?: string) {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (search) params.append('search', search);

    return safeFetch(`${API_BASE}/grants?${params.toString()}`, {}, () => {
      const db = getLocalDB();
      let list = db.grants;
      if (status) {
        list = list.filter(g => g.status === status);
      }
      if (search) {
        const s = search.toLowerCase();
        list = list.filter(g => 
          g.artistName.toLowerCase().includes(s) || 
          g.title.toLowerCase().includes(s) || 
          g.category.toLowerCase().includes(s)
        );
      }
      return list;
    });
  },

  async applyGrant(data: { artistId?: string; artistName: string; title: string; category: string; budgetRequest: number; proposalSummary: string; proposalDocUrl?: string }) {
    return safeFetch(`${API_BASE}/grants`, {
      method: 'POST',
      body: JSON.stringify(data)
    }, () => {
      const db = getLocalDB();
      const newGrant = {
        id: 'grt-' + (db.grants.length + 1),
        artistId: data.artistId || 'unregistered',
        artistName: data.artistName,
        title: data.title,
        category: data.category,
        budgetRequest: data.budgetRequest,
        proposalSummary: data.proposalSummary,
        proposalDocUrl: data.proposalDocUrl || '#',
        status: 'PENDING',
        createdAt: new Date().toISOString()
      };
      db.grants.unshift(newGrant);

      // Audit Log
      db.auditLogs.unshift({
        id: 'log-' + (db.auditLogs.length + 1),
        userRole: 'CITIZEN',
        action: 'GRANT_APPLY',
        details: `Grant application "${data.title}" by ${data.artistName} submitted.`,
        ipAddress: '127.0.0.1',
        timestamp: new Date().toISOString()
      });

      saveLocalDB(db);
      return newGrant;
    });
  },

  async updateGrantStatus(id: string, status: string, feedback: string, adminRole: string = 'ADMIN') {
    return safeFetch(`${API_BASE}/grants/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status, feedback, adminRole })
    }, () => {
      const db = getLocalDB();
      const idx = db.grants.findIndex(g => g.id === id);
      if (idx !== -1) {
        db.grants[idx].status = status;
        db.grants[idx].feedback = feedback;

        // Log audit
        db.auditLogs.unshift({
          id: 'log-' + (db.auditLogs.length + 1),
          userRole: adminRole,
          action: `GRANT_${status}`,
          details: `Grant "${db.grants[idx].title}" by ${db.grants[idx].artistName} updated to ${status}.`,
          ipAddress: '127.0.0.1',
          timestamp: new Date().toISOString()
        });
        saveLocalDB(db);
        return db.grants[idx];
      }
      return null;
    });
  },

  // Permits
  async getPermits() {
    return safeFetch(`${API_BASE}/permits`, {}, () => {
      return getLocalDB().permits;
    });
  },

  async applyPermit(data: { applicantName: string; applicantEmail: string; permitType: string; details: string; location: string; eventDate: string }) {
    return safeFetch(`${API_BASE}/permits`, {
      method: 'POST',
      body: JSON.stringify(data)
    }, () => {
      const db = getLocalDB();
      const pCode = 'NGA-PMT-' + Math.floor(100000 + Math.random() * 900000);
      const newPermit = {
        id: 'pmt-' + (db.permits.length + 1),
        ...data,
        amountPaid: data.permitType === 'EVENT' ? 25000.0 : 5000.0,
        permitCode: pCode,
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${pCode}`,
        status: 'APPROVED',
        createdAt: new Date().toISOString()
      };
      db.permits.unshift(newPermit);

      // Audit Log
      db.auditLogs.unshift({
        id: 'log-' + (db.auditLogs.length + 1),
        userRole: 'CITIZEN',
        action: 'PERMIT_APPLY',
        details: `Permit ${pCode} issued to ${data.applicantName} (${data.permitType})`,
        ipAddress: '127.0.0.1',
        timestamp: new Date().toISOString()
      });

      saveLocalDB(db);
      return newPermit;
    });
  },

  // Complaints
  async getComplaints() {
    return safeFetch(`${API_BASE}/complaints`, {}, () => {
      return getLocalDB().complaints;
    });
  },

  async submitComplaint(data: { name: string; email: string; subject: string; description: string }) {
    return safeFetch(`${API_BASE}/complaints`, {
      method: 'POST',
      body: JSON.stringify(data)
    }, () => {
      const db = getLocalDB();
      const trackingCode = 'COMP-' + Math.floor(100000 + Math.random() * 900000);
      const newComplaint = {
        id: 'cmp-' + (db.complaints.length + 1),
        ...data,
        trackingCode,
        status: 'PENDING',
        createdAt: new Date().toISOString()
      };
      db.complaints.unshift(newComplaint);

      db.auditLogs.unshift({
        id: 'log-' + (db.auditLogs.length + 1),
        userRole: 'CITIZEN',
        action: 'COMPLAINT_SUBMIT',
        details: `Complaint ${trackingCode} submitted by ${data.name}`,
        ipAddress: '127.0.0.1',
        timestamp: new Date().toISOString()
      });

      saveLocalDB(db);
      return newComplaint;
    });
  },

  async resolveComplaint(id: string, response: string) {
    return safeFetch(`${API_BASE}/complaints/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'RESOLVED', response })
    }, () => {
      const db = getLocalDB();
      const idx = db.complaints.findIndex(c => c.id === id);
      if (idx !== -1) {
        db.complaints[idx].status = 'RESOLVED';
        db.complaints[idx].response = response;

        db.auditLogs.unshift({
          id: 'log-' + (db.auditLogs.length + 1),
          userRole: 'STAFF',
          action: 'COMPLAINT_RESOLVE',
          details: `Complaint ${db.complaints[idx].trackingCode} resolved.`,
          ipAddress: '127.0.0.1',
          timestamp: new Date().toISOString()
        });

        saveLocalDB(db);
        return db.complaints[idx];
      }
      return null;
    });
  },

  // FOI Requests
  async getFoiRequests() {
    return safeFetch(`${API_BASE}/foi`, {}, () => {
      return getLocalDB().foi;
    });
  },

  async submitFoiRequest(data: { name: string; organization: string; email: string; description: string }) {
    return safeFetch(`${API_BASE}/foi`, {
      method: 'POST',
      body: JSON.stringify(data)
    }, () => {
      const db = getLocalDB();
      const trackingCode = 'FOI-' + Math.floor(100000 + Math.random() * 900000);
      const newFoi = {
        id: 'foi-' + (db.foi.length + 1),
        ...data,
        trackingCode,
        status: 'PENDING',
        createdAt: new Date().toISOString()
      };
      db.foi.unshift(newFoi);

      db.auditLogs.unshift({
        id: 'log-' + (db.auditLogs.length + 1),
        userRole: 'CITIZEN',
        action: 'FOI_SUBMIT',
        details: `FOI ${trackingCode} submitted by ${data.name}`,
        ipAddress: '127.0.0.1',
        timestamp: new Date().toISOString()
      });

      saveLocalDB(db);
      return newFoi;
    });
  },

  // Tenders
  async getTenders() {
    return safeFetch(`${API_BASE}/tenders`, {}, () => {
      return getLocalDB().tenders;
    });
  },

  async createTender(data: { title: string; description: string; category: string; openDate: string; closeDate: string; budget: number }) {
    return safeFetch(`${API_BASE}/tenders`, {
      method: 'POST',
      body: JSON.stringify(data)
    }, () => {
      const db = getLocalDB();
      const newTender = {
        id: 'ten-' + (db.tenders.length + 1),
        ...data,
        bidsCount: 0,
        status: 'ACTIVE',
        createdAt: new Date().toISOString()
      };
      db.tenders.unshift(newTender);
      saveLocalDB(db);
      return newTender;
    });
  },

  async submitBid(id: string) {
    return safeFetch(`${API_BASE}/tenders/${id}/bid`, {
      method: 'POST'
    }, () => {
      const db = getLocalDB();
      const idx = db.tenders.findIndex(t => t.id === id);
      if (idx !== -1) {
        db.tenders[idx].bidsCount += 1;
        saveLocalDB(db);
        return db.tenders[idx];
      }
      return null;
    });
  },

  // News and Events
  async getNews(category?: string) {
    return safeFetch(`${API_BASE}/news${category ? `?category=${category}` : ''}`, {}, () => {
      const db = getLocalDB();
      if (category) {
        return db.news.filter(n => n.category === category);
      }
      return db.news;
    });
  },

  async getEvents() {
    return safeFetch(`${API_BASE}/events`, {}, () => {
      return getLocalDB().events;
    });
  },

  async registerEventAttendance(id: string) {
    return safeFetch(`${API_BASE}/events/${id}/register`, {
      method: 'POST'
    }, () => {
      const db = getLocalDB();
      const idx = db.events.findIndex(e => e.id === id);
      if (idx !== -1) {
        db.events[idx].registeredCount += 1;
        db.auditLogs.unshift({
          id: 'log-' + (db.auditLogs.length + 1),
          userRole: 'CITIZEN',
          action: 'EVENT_REGISTER',
          details: `Registered attendance for event: ${db.events[idx].title}`,
          ipAddress: '127.0.0.1',
          timestamp: new Date().toISOString()
        });
        saveLocalDB(db);
        return db.events[idx];
      }
      return null;
    });
  },

  // Audit Logs
  async getAuditLogs() {
    return safeFetch(`${API_BASE}/audit-logs`, {}, () => {
      return getLocalDB().auditLogs;
    });
  }
};
