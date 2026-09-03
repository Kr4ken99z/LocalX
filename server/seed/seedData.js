const mongoose = require('mongoose');
const User = require('../models/User');
const Professional = require('../models/Professional');
const Service = require('../models/Service');
const Booking = require('../models/Booking');
const Review = require('../models/Review');
const Dispute = require('../models/Dispute');
const AdminAuditLog = require('../models/AdminAuditLog');
const { calculateTrustScore } = require('../utils/trustScore');

const seedServices = [
  {
    name: 'Electrical Repairs & Wiring',
    slug: 'electrician',
    description: 'Complete electrical troubleshooting, circuit breaker replacement, wiring repairs, and installations.',
    icon: '⚡',
    basePrice: 299,
    popular: true,
  },
  {
    name: 'AC Servicing & Deep Repair',
    slug: 'ac-repair',
    description: 'Jet pump foam wash, gas leak inspection & recharge, PCB troubleshooting, and maintenance.',
    icon: '❄️',
    basePrice: 599,
    popular: true,
  },
  {
    name: 'Plumbing & Pipe Solutions',
    slug: 'plumber',
    description: 'Emergency leak detection, tap & mixer fitting, drain unblocking, water heater setup, and more.',
    icon: '🔧',
    basePrice: 349,
    popular: true,
  },
  {
    name: 'Full Home Deep Cleaning',
    slug: 'cleaning',
    description: 'Intensive hospital-grade sanitization for kitchens, bathrooms, floors, upholstery, and more.',
    icon: '✨',
    basePrice: 1299,
    popular: true,
  },
  {
    name: 'Carpentry & Furniture Assembly',
    slug: 'carpenter',
    description: 'Custom cabinetry repairs, door/lock fixing, hinges, modular furniture setup, and precision work.',
    icon: '🪚',
    basePrice: 449,
    popular: true,
  },
  {
    name: 'Interior & Exterior Painting',
    slug: 'painter',
    description: 'Waterproofing, wall crack treatment, texture painting, and premium doorless emulsion work.',
    icon: '🎨',
    basePrice: 1999,
    popular: true,
  },
  {
    name: 'Organic Pest Control',
    slug: 'pest-control',
    description: 'Odorless gel & herbal spray treatment for cockroaches, termites, bedbugs, and rodents.',
    icon: '🛡️',
    basePrice: 799,
    popular: true,
  },
  {
    name: 'Smart Home & CCTV Setup',
    slug: 'smart-home',
    description: 'Smart switch configuration, IP camera and video doorbell installations, WiFi mesh, and more.',
    icon: '📡',
    basePrice: 899,
    popular: false,
  },
];

const seedDatabaseIfEmpty = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('📦 Database already populated with records. Skipping seed.');
      return;
    }

    console.log('🌱 Empty database detected. Seeding LocalX initial dataset...');

    // 1. Seed Services
    const createdServices = await Service.insertMany(seedServices);
    const serviceMap = {};
    createdServices.forEach((s) => {
      serviceMap[s.slug] = s;
    });

    // 2. Seed Admin
    const adminUser = await User.create({
      name: 'LocalX Admin',
      email: 'admin@localx.app',
      password: 'password123',
      phone: '+91 98765 00001',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      location: {
        city: 'Bengaluru',
        area: 'Central Operations Hub',
        coordinates: [77.5946, 12.9716],
      },
    });

    // 3. Seed Demo Customer
    const customerUser = await User.create({
      name: 'Priya Sharma',
      email: 'customer@localx.app',
      password: 'password123',
      phone: '+91 98200 12345',
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      location: {
        city: 'Bengaluru',
        area: 'Indiranagar 100ft Road',
        coordinates: [77.6412, 12.9784],
      },
      savedAddresses: [
        {
          label: 'Home Apartment',
          addressLine: '#402, Sunshine Heights, 12th Main, Indiranagar',
          city: 'Bengaluru',
          landmark: 'Near Toit Pub',
          coordinates: [77.6412, 12.9784],
        },
        {
          label: 'Office Workspace',
          addressLine: 'WeWork Galaxy, Residency Road',
          city: 'Bengaluru',
          landmark: 'Opposite Ritz Carlton',
          coordinates: [77.6082, 12.9698],
        },
      ],
    });

    // Another customer for review variety
    const customer2 = await User.create({
      name: 'Rohan Mehta',
      email: 'rohan@example.com',
      password: 'password123',
      phone: '+91 98450 67890',
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      location: {
        city: 'Bengaluru',
        area: 'Koramangala 4th Block',
        coordinates: [77.6271, 12.9352],
      },
    });

    // 4. Seed Professionals
    const proUsersData = [
      {
        name: 'Rajesh Kumar',
        email: 'pro@localx.app',
        phone: '+91 98440 11223',
        businessName: 'SparkVolt Electrical Solutions',
        tagline: 'Licensed Master Electrician • 8+ Years Experience',
        description: 'Certified electrical engineer specializing in domestic and commercial rewiring, inverter installations, smart metering, and 24x7 emergency short-circuit fault troubleshooting.',
        serviceCategory: 'electrician',
        area: 'Indiranagar, Bengaluru',
        coords: [77.6412, 12.9784], // Indiranagar
        experienceYears: 8,
        skills: ['Electrician', 'Circuit Breakers', 'Inverter Setup', 'Appliance Wiring', 'LED Lighting'],
        services: [
          { name: 'Electrical Fault Diagnostics & Short Circuit Repair', slug: 'electrician', price: 299, priceType: 'starts_at', description: 'Comprehensive inspection with digital multimeter & fault isolation.' },
          { name: 'MCB & Distribution Box Replacement', slug: 'electrician', price: 499, priceType: 'fixed', description: 'Upgrading faulty circuit breakers and main phase safety.' },
          { name: 'Complete Room Rewiring & Switchboard Fitting', slug: 'electrician', price: 899, priceType: 'starts_at', description: 'Modular switches, conduits, and earthing installation.' },
        ],
        verificationStatus: 'VERIFIED',
        rating: 4.9,
        completedJobs: 84,
        responseRate: 98,
        cancellationRate: 1,
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      },
      {
        name: 'Karan Verma',
        email: 'karan@arcticfrost.in',
        phone: '+91 98711 44556',
        businessName: 'ArcticFrost Climate Systems',
        tagline: 'HVAC Certified • Deep Jet Foam Wash Specialists',
        description: 'Master AC technicians providing high-pressure jet cleaning, R32/R410A refrigerant leak testing and recharge, PCB repairs, and energy-saving inverter air conditioning maintenance.',
        serviceCategory: 'ac-repair',
        area: 'Koramangala 5th Block, Bengaluru',
        coords: [77.6271, 12.9352], // Koramangala
        experienceYears: 6,
        skills: ['AC Repair', 'HVAC Maintenance', 'Gas Charging', 'PCB Diagnostics', 'Split AC Installation'],
        services: [
          { name: 'Split AC Jet Pump Deep Chemical Foam Wash', slug: 'ac-repair', price: 599, priceType: 'fixed', description: 'Cleans cooling coils, blower, and tray with antifungal wash.' },
          { name: 'Eco Gas Leak Detection & Full Gas Top-Up', slug: 'ac-repair', price: 1899, priceType: 'fixed', description: 'Vacuum pump leak test and optimal pressure gas refill.' },
          { name: 'Uninstallation & Re-Installation Package', slug: 'ac-repair', price: 1299, priceType: 'fixed', description: 'Safe dismount and copper pipe refitting.' },
        ],
        verificationStatus: 'VERIFIED',
        rating: 4.8,
        completedJobs: 62,
        responseRate: 95,
        cancellationRate: 2,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      },
      {
        name: 'Amit Patil',
        email: 'amit@hydroflow.in',
        phone: '+91 99160 88771',
        businessName: 'HydroFlow Plumbing & Piping',
        tagline: '24/7 Leak Detection & High-Pressure Jet Clearing',
        description: 'Over 10 years resolving complex water leakages, pipeline clogs, sanitary ware fitting, water tank automatic float valves, and bathroom renovations.',
        serviceCategory: 'plumber',
        area: 'Whitefield, Bengaluru',
        coords: [77.7499, 12.9698], // Whitefield
        experienceYears: 10,
        skills: ['Plumbing', 'Pipe Clogging', 'Water Heaters', 'Sanitary Fitting', 'Leak Detection'],
        services: [
          { name: 'Emergency Pipe Leakage & Tap Mixer Replacement', slug: 'plumber', price: 349, priceType: 'starts_at', description: 'Instant repair for leaking concealed pipes and fittings.' },
          { name: 'Motorized Drain Clog Clearing & Unblocking', slug: 'plumber', price: 699, priceType: 'fixed', description: 'Heavy-duty snake drill to clear stubborn drain obstructions.' },
          { name: 'Water Heater / Geyser Installation', slug: 'plumber', price: 449, priceType: 'fixed', description: 'Secure wall mounting and high-pressure inlet/outlet connecting.' },
        ],
        verificationStatus: 'VERIFIED',
        rating: 4.9,
        completedJobs: 95,
        responseRate: 99,
        cancellationRate: 1,
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      },
      {
        name: 'Priya Cleaners Team',
        email: 'priya@sparklepro.in',
        phone: '+91 98455 33211',
        businessName: 'SparklePro Deep Cleaning',
        tagline: 'Hospital Grade Sanitization • German Equipment',
        description: 'Comprehensive deep cleaning for 1BHK, 2BHK, 3BHK and villas. We use non-toxic eco cleaners, single-disc scrubbing machines, and microfiber sanitizing methods.',
        serviceCategory: 'cleaning',
        area: 'HSR Layout Sector 2, Bengaluru',
        coords: [77.6389, 12.9121], // HSR Layout
        experienceYears: 5,
        skills: ['Cleaning', 'Deep Sanitization', 'Sofa Shampooing', 'Kitchen Degreasing', 'Bathroom Descaling'],
        services: [
          { name: 'Full Home Intensive Deep Cleaning (2 BHK)', slug: 'cleaning', price: 2499, priceType: 'fixed', description: 'Floor scrubbing, glass buffing, kitchen degreasing, bathroom descaling.' },
          { name: 'Intense Bathroom Deep Acid-Free Descaling', slug: 'cleaning', price: 699, priceType: 'fixed', description: 'Removes hard-water stains and restores chrome fittings.' },
          { name: 'Sofa & Fabric Upholstery Foam Extraction', slug: 'cleaning', price: 899, priceType: 'starts_at', description: 'Vacuum injection and steam extraction drying.' },
        ],
        verificationStatus: 'VERIFIED',
        rating: 4.7,
        completedJobs: 54,
        responseRate: 94,
        cancellationRate: 3,
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      },
      {
        name: 'Suresh Mistry',
        email: 'suresh@timbercraft.in',
        phone: '+91 98233 77665',
        businessName: 'TimberCraft Carpentry & Woodworks',
        tagline: 'Precision Woodwork & Custom Furniture Setup',
        description: 'Experienced carpenter skilled in modular kitchen fittings, door hinges, lock installations, wardrobe sliding tracks, and custom wooden repairs.',
        serviceCategory: 'carpenter',
        area: 'Jayanagar 4th Block, Bengaluru',
        coords: [77.5833, 12.9298], // Jayanagar
        experienceYears: 12,
        skills: ['Carpentry', 'Furniture Assembly', 'Door Locks', 'Cabinet Repair', 'Modular Kitchens'],
        services: [
          { name: 'Door Lock / Handle Repair & Installation', slug: 'carpenter', price: 399, priceType: 'starts_at', description: 'High security mortise or cylindrical lock fixing.' },
          { name: 'Modular Furniture & Bed Assembly', slug: 'carpenter', price: 649, priceType: 'starts_at', description: 'Assembly of IKEA, Urban Ladder, or engineered wood sets.' },
          { name: 'Wardrobe Channel & Hinge Replacement', slug: 'carpenter', price: 499, priceType: 'fixed', description: 'Soft-close hinge adjustments and sliding track aligning.' },
        ],
        verificationStatus: 'VERIFIED',
        rating: 4.8,
        completedJobs: 71,
        responseRate: 96,
        cancellationRate: 2,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      },
      {
        name: 'Arjun Das',
        email: 'arjun@colorhue.in',
        phone: '+91 98866 12389',
        businessName: 'ColorHue Painting & Waterproofing',
        tagline: 'Asian Paints Certified • Dust-Free Mechanized Sanding',
        description: 'Premium interior & exterior wall painting, waterproof damping treatment, crack sealing, and decorative texture walls with laser tape finishes.',
        serviceCategory: 'painter',
        city: 'Bengaluru',
        area: 'BTM Layout 2nd Stage, Bengaluru',
        coords: [77.6101, 12.9166],
        experienceYears: 7,
        skills: ['Painting', 'Waterproofing', 'Texture Wall', 'Wall Putty', 'Exterior Emulsion'],
        services: [
          { name: 'Single Wall Accent & Texture Painting', slug: 'painter', price: 1499, priceType: 'fixed', description: 'Includes wall preparation, primer coat, and designer textures.' },
          { name: 'Complete Damp Proof & Anti-Fungal Treatment', slug: 'painter', price: 2199, priceType: 'starts_at', description: 'Crack filling and elastomeric waterproof barrier membrane.' },
        ],
        verificationStatus: 'PENDING',
        rating: 4.6,
        completedJobs: 18,
        responseRate: 90,
        cancellationRate: 4,
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
      },
      // Kolkata Demo Specialists (All in English)
      {
        name: 'David Roy',
        email: 'david@apexvolt.in',
        phone: '+91 98301 22334',
        businessName: 'Apex Electricals & Power Systems',
        tagline: 'Licensed Master Electrician • 9+ Years Experience',
        description: 'Specializing in residential wiring, short-circuit troubleshooting, circuit breaker upgrades, inverter setup, and emergency power restoration across Salt Lake and New Town.',
        serviceCategory: 'electrician',
        city: 'Kolkata',
        area: 'Salt Lake Sector V, Kolkata',
        coords: [88.4312, 22.5769],
        experienceYears: 9,
        skills: ['Electrician', 'Inverter Setup', 'Short Circuit', 'Earthing', 'Home Automation'],
        services: [
          { name: 'Electrical Diagnostics & Wiring Fault Rectification', slug: 'electrician', price: 299, priceType: 'starts_at', description: 'Complete circuit inspection with safety testing.' },
          { name: 'Inverter & Battery Wiring Installation', slug: 'electrician', price: 699, priceType: 'fixed', description: 'Full inverter bypass switch installation and heavy gauge connection.' },
          { name: 'Sub-meter & MCB Distribution Box Replacement', slug: 'electrician', price: 499, priceType: 'fixed', description: 'Safe replacement of burned circuit breakers.' },
        ],
        verificationStatus: 'VERIFIED',
        rating: 4.9,
        completedJobs: 92,
        responseRate: 99,
        cancellationRate: 1,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      },
      {
        name: 'Alex Martin',
        email: 'alex@metrohvac.in',
        phone: '+91 98310 99887',
        businessName: 'Metro Air Conditioning & Cooling',
        tagline: 'High-Pressure Jet Pump Foam Servicing & Gas Charging',
        description: 'Over 8 years servicing split and window ACs across Kolkata, Park Street, and Ballygunge. 100% genuine copper coils and refrigerant gas guarantee.',
        serviceCategory: 'ac-repair',
        city: 'Kolkata',
        area: 'Park Street, Kolkata',
        coords: [88.3512, 22.5513],
        experienceYears: 8,
        skills: ['AC Repair', 'Jet Foam Cleaning', 'Gas Leak Fix', 'Split AC Installation', 'Capacitor Replacement'],
        services: [
          { name: 'Jet Pump Deep Foam AC Cleaning', slug: 'ac-repair', price: 549, priceType: 'fixed', description: 'Anti-bacterial jet wash for blower, cooling fins, and drain pipe.' },
          { name: 'R32 / R410A Pure Refrigerant Gas Top-Up', slug: 'ac-repair', price: 1799, priceType: 'fixed', description: 'Nitrogen pressure leak test and optimal cooling top up.' },
          { name: 'Complete AC Dismount & Refitting Package', slug: 'ac-repair', price: 1199, priceType: 'fixed', description: 'Safe uninstallation and copper tubing reinstallation.' },
        ],
        verificationStatus: 'VERIFIED',
        rating: 4.8,
        completedJobs: 78,
        responseRate: 97,
        cancellationRate: 2,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      },
      {
        name: 'Victor Vance',
        email: 'victor@primeplumbing.in',
        phone: '+91 98366 55441',
        businessName: 'Prime Plumbing & Leak Solutions',
        tagline: 'Master Plumber • Drain Clog & Water Heater Specialist',
        description: 'Reliable plumbing services across South and Central Kolkata: Ballygunge, Gariahat, and Jadavpur. Sanitary fittings, overhead tank floats, and motorized drain unblocking.',
        serviceCategory: 'plumber',
        city: 'Kolkata',
        area: 'Ballygunge, Kolkata',
        coords: [88.3653, 22.5280],
        experienceYears: 11,
        skills: ['Plumbing', 'Drain Cleaning', 'Tap Mixer', 'Water Tank Float', 'Geyser Fitting'],
        services: [
          { name: 'Concealed Pipe Leakage Detection & Repair', slug: 'plumber', price: 349, priceType: 'starts_at', description: 'Instant detection and repair with quality PVC/CPVC.' },
          { name: 'Motorized High-Torque Drain Unblocking', slug: 'plumber', price: 599, priceType: 'fixed', description: 'Heavy duty steel snake clearing bathroom and kitchen lines.' },
        ],
        verificationStatus: 'VERIFIED',
        rating: 4.9,
        completedJobs: 110,
        responseRate: 98,
        cancellationRate: 1,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      },
      {
        name: 'Elena Gilbert',
        email: 'elena@purespark.in',
        phone: '+91 98322 11009',
        businessName: 'PureSpark Deep Cleaning & Sanitization',
        tagline: 'Eco-Friendly Hospital Grade Home Sanitization',
        description: 'Intensive deep cleaning solutions for apartments, villas, and commercial offices in New Town and Salt Lake. Single-disc floor buffing and non-toxic sanitizers.',
        serviceCategory: 'cleaning',
        city: 'Kolkata',
        area: 'New Town Action Area 1, Kolkata',
        coords: [88.4682, 22.5855],
        experienceYears: 6,
        skills: ['Deep Cleaning', 'Sanitization', 'Kitchen Degreasing', 'Bathroom Descaling', 'Sofa Shampooing'],
        services: [
          { name: 'Complete 2BHK Intensive Deep Sanitization', slug: 'cleaning', price: 2199, priceType: 'fixed', description: 'Full house scrubbing, window buffing, and chemical-free floor wash.' },
          { name: 'Intense Bathroom Acid-Free Descaling', slug: 'cleaning', price: 599, priceType: 'fixed', description: 'Tile grout restoration, mirror shine, and fixture polishing.' },
        ],
        verificationStatus: 'VERIFIED',
        rating: 4.9,
        completedJobs: 65,
        responseRate: 96,
        cancellationRate: 1,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      },
      {
        name: 'Marcus Stone',
        email: 'marcus@urbancarpentry.in',
        phone: '+91 98344 88772',
        businessName: 'Urban Woodcraft & Carpentry Studio',
        tagline: 'Precision Woodworking & Modular Furniture Setup',
        description: 'Expert carpentry for IKEA and modular furniture assembly, wardrobe sliding channels, custom cabinet repair, and hydraulic hinge fitting.',
        serviceCategory: 'carpenter',
        city: 'Kolkata',
        area: 'Alipore, Kolkata',
        coords: [88.3312, 22.5312],
        experienceYears: 10,
        skills: ['Carpentry', 'Modular Furniture', 'Hinges', 'Door Locks', 'Cabinet Repair'],
        services: [
          { name: 'Door Lock / Deadbolt Installation', slug: 'carpenter', price: 349, priceType: 'starts_at', description: 'Mortise lock, latch, and safety handle fitting.' },
          { name: 'Modular Furniture & Bed Frame Assembly', slug: 'carpenter', price: 599, priceType: 'starts_at', description: 'Precision alignment for engineered wood sets.' },
        ],
        verificationStatus: 'VERIFIED',
        rating: 4.8,
        completedJobs: 82,
        responseRate: 95,
        cancellationRate: 2,
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      },
      {
        name: 'Nathan Drake',
        email: 'nathan@shieldpest.in',
        phone: '+91 98399 44332',
        businessName: 'ShieldGuard Organic Pest Control',
        tagline: 'Odorless Herbal Spray & German Gel Technology',
        description: 'Child-safe and pet-safe pest eradication for termites, cockroaches, bedbugs, and rodents with a 90-day re-service warranty.',
        serviceCategory: 'pest-control',
        city: 'Kolkata',
        area: 'Salt Lake City, Kolkata',
        coords: [88.4112, 22.5812],
        experienceYears: 7,
        skills: ['Pest Control', 'Termite Eradication', 'Cockroach Gel', 'Bedbug Heat Treatment'],
        services: [
          { name: 'Odorless Cockroach Herbal Gel Treatment (2 BHK)', slug: 'pest-control', price: 749, priceType: 'fixed', description: 'Long-lasting Bayer gel application behind hinges and drains.' },
          { name: 'Complete Anti-Termite Drill & Injection Warranty', slug: 'pest-control', price: 1899, priceType: 'starts_at', description: 'Wall and woodwork chemical barrier installation.' },
        ],
        verificationStatus: 'VERIFIED',
        rating: 4.9,
        completedJobs: 58,
        responseRate: 98,
        cancellationRate: 1,
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      },
      {
        name: 'Julian Hayes',
        email: 'julian@smarthomekolkata.in',
        phone: '+91 98377 66551',
        businessName: 'Apex Smart Home & CCTV Automation',
        tagline: 'IP Security Cameras • Smart Switches • WiFi Mesh',
        description: 'Complete home automation, smart touch panel installation, video doorbells, and high-definition NVR surveillance setups.',
        serviceCategory: 'smart-home',
        city: 'Kolkata',
        area: 'Rajarhat, Kolkata',
        coords: [88.4712, 22.6212],
        experienceYears: 5,
        skills: ['Smart Home', 'CCTV Setup', 'Video Doorbell', 'WiFi Mesh', 'Alexa & Google Home Integration'],
        services: [
          { name: 'Smart Switchboard & App Automation (per room)', slug: 'smart-home', price: 899, priceType: 'starts_at', description: 'Integration of smart modules with existing switchboards.' },
          { name: '4-Camera HD Night-Vision CCTV Setup & Cabling', slug: 'smart-home', price: 2499, priceType: 'fixed', description: 'Camera mounting, DVR configuration, and mobile app streaming.' },
        ],
        verificationStatus: 'VERIFIED',
        rating: 4.8,
        completedJobs: 44,
        responseRate: 94,
        cancellationRate: 2,
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
      },
    ];

    const createdPros = [];

    for (const p of proUsersData) {
      const proUser = await User.create({
        name: p.name,
        email: p.email,
        password: 'password123',
        phone: p.phone,
        role: 'professional',
        avatar: p.avatar,
        location: {
          city: p.city || 'Bengaluru',
          area: p.area,
          coordinates: p.coords,
        },
      });

      const trust = calculateTrustScore({
        verificationStatus: p.verificationStatus,
        rating: p.rating,
        completedJobs: p.completedJobs,
        responseRate: p.responseRate,
        cancellationRate: p.cancellationRate,
      });

      const proDoc = await Professional.create({
        userId: proUser._id,
        businessName: p.businessName,
        tagline: p.tagline,
        description: p.description,
        experienceYears: p.experienceYears,
        skills: p.skills,
        services: p.services.map((s) => ({
          serviceId: serviceMap[s.slug]?._id,
          name: s.name,
          slug: s.slug,
          price: s.price,
          priceType: s.priceType,
          description: s.description,
        })),
        location: {
          type: 'Point',
          coordinates: p.coords,
          city: p.city || 'Bengaluru',
          address: p.area,
        },
        serviceRadius: 20,
        verificationStatus: p.verificationStatus,
        verificationRemarks: p.verificationStatus === 'VERIFIED' ? 'Government ID and trade license verified by Admin.' : 'Awaiting administrative identity review.',
        documents: [
          {
            docType: 'gov_id',
            title: 'Aadhaar / National ID Card',
            fileUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80',
            uploadedAt: new Date(),
          },
          {
            docType: 'trade_cert',
            title: 'Technical Certification Certificate',
            fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
            uploadedAt: new Date(),
          },
        ],
        rating: p.rating,
        totalReviews: p.verificationStatus === 'VERIFIED' ? 12 : 2,
        completedJobs: p.completedJobs,
        responseRate: p.responseRate,
        cancellationRate: p.cancellationRate,
        trustScore: trust.score,
        trustTier: trust.tier,
        availability: {
          isAvailable: true,
          workingHours: '08:00 AM - 08:30 PM',
          days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        },
        portfolio: [
          {
            title: 'Precision Commercial Panel Wiring',
            imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=500&q=80',
          },
          {
            title: 'High Flow Piping & Water Metering',
            imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80',
          },
        ],
      });

      createdPros.push(proDoc);
    }

    const demoPro = createdPros[0]; // Rajesh Kumar (Electrician)
    const acPro = createdPros[1]; // Karan Verma

    // 5. Seed Sample Bookings
    // Completed Booking 1 (with review)
    const booking1 = await Booking.create({
      bookingNumber: 'LX-892144',
      customerId: customerUser._id,
      professionalId: demoPro._id,
      serviceId: createdServices[0]._id,
      serviceName: 'Electrical Fault Diagnostics & Short Circuit Repair',
      scheduledDate: '2026-08-28',
      scheduledTime: '11:00 AM - 01:00 PM',
      address: {
        addressLine: '#402, Sunshine Heights, 12th Main, Indiranagar',
        city: 'Bengaluru',
        landmark: 'Near Toit Pub',
        pincode: '560038',
      },
      price: 299,
      status: 'COMPLETED',
      notes: 'Main trip switch constantly tripping when microwave is turned on.',
      statusHistory: [
        { status: 'PENDING', comment: 'Booking placed', timestamp: new Date(Date.now() - 604800000) },
        { status: 'ACCEPTED', comment: 'Pro accepted booking', timestamp: new Date(Date.now() - 518400000) },
        { status: 'ON_THE_WAY', comment: 'Pro en route', timestamp: new Date(Date.now() - 432000000) },
        { status: 'IN_PROGRESS', comment: 'Diagnostic ongoing', timestamp: new Date(Date.now() - 428400000) },
        { status: 'COMPLETED', comment: 'Neutral wire short rectified', timestamp: new Date(Date.now() - 424800000) },
      ],
      hasReview: true,
    });

    // Active Booking (IN_PROGRESS) for real-time testing
    const booking2 = await Booking.create({
      bookingNumber: 'LX-493821',
      customerId: customerUser._id,
      professionalId: demoPro._id,
      serviceId: createdServices[0]._id,
      serviceName: 'MCB & Distribution Box Replacement',
      scheduledDate: '2026-09-04',
      scheduledTime: '02:00 PM - 04:00 PM',
      address: {
        addressLine: '#402, Sunshine Heights, 12th Main, Indiranagar',
        city: 'Bengaluru',
        landmark: 'Near Toit Pub',
        pincode: '560038',
      },
      price: 499,
      status: 'IN_PROGRESS',
      notes: 'Need 32A double pole MCB replaced and surge protector added.',
      statusHistory: [
        { status: 'PENDING', comment: 'Booking created', timestamp: new Date(Date.now() - 86400000) },
        { status: 'ACCEPTED', comment: 'Pro confirmed time slot', timestamp: new Date(Date.now() - 72000000) },
        { status: 'ON_THE_WAY', comment: 'Pro arrived on site', timestamp: new Date(Date.now() - 3600000) },
        { status: 'IN_PROGRESS', comment: 'Work started on main panel', timestamp: new Date(Date.now() - 1800000) },
      ],
    });

    // Pending Booking (for Pro to accept or reject)
    await Booking.create({
      bookingNumber: 'LX-110943',
      customerId: customer2._id,
      professionalId: demoPro._id,
      serviceId: createdServices[0]._id,
      serviceName: 'Complete Room Rewiring & Switchboard Fitting',
      scheduledDate: '2026-09-06',
      scheduledTime: '10:00 AM - 12:00 PM',
      address: {
        addressLine: 'Villa 14, Palm Meadows',
        city: 'Bengaluru',
        landmark: 'Airport Road',
        pincode: '560066',
      },
      price: 899,
      status: 'PENDING',
      notes: 'Modular plate fitting for 4 smart touch switches.',
      statusHistory: [
        { status: 'PENDING', comment: 'Booking request sent', timestamp: new Date() },
      ],
    });

    // 6. Seed Reviews
    await Review.create({
      customerId: customerUser._id,
      professionalId: demoPro._id,
      bookingId: booking1._id,
      rating: 5,
      comment: 'Exceptional service! Rajesh identified the burnt neutral wire in minutes, explained everything clearly, and fixed the circuit breaker. Very professional and polite.',
      serviceName: 'Electrical Fault Diagnostics & Short Circuit Repair',
    });

    // 7. Seed Sample Dispute for Admin resolution demo
    await Dispute.create({
      disputeNumber: 'DSP-8821',
      bookingId: booking1._id,
      customerId: customer2._id,
      professionalId: acPro._id,
      reason: 'Poor Work Quality',
      description: 'The technician did not clean the outdoor unit fan during servicing, and water started dripping inside the living room after 2 days.',
      status: 'OPEN',
      evidence: [
        {
          title: 'Photo of indoor unit dripping',
          url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80',
        },
      ],
    });

    // 8. Seed Initial Audit Logs
    await AdminAuditLog.create({
      adminId: adminUser._id,
      adminEmail: adminUser.email,
      action: 'APPROVE_PROFESSIONAL',
      targetType: 'Professional',
      targetId: demoPro._id.toString(),
      metadata: {
        businessName: demoPro.businessName,
        remarks: 'Trade certificate verified against national register.',
      },
    });

    await AdminAuditLog.create({
      adminId: adminUser._id,
      adminEmail: adminUser.email,
      action: 'CREATE_CATEGORY',
      targetType: 'Service',
      targetId: createdServices[0]._id.toString(),
      metadata: {
        name: 'Electrical Repairs & Wiring',
        slug: 'electrician',
      },
    });

    console.log('✅ LocalX Seed complete! Pre-populated 8 categories, 6 pros, 3 bookings, reviews, disputes, and audit logs.');
    console.log('🔑 Credentials:');
    console.log('   - Customer: customer@localx.app / password123');
    console.log('   - Pro:      pro@localx.app / password123');
    console.log('   - Admin:    admin@localx.app / password123');
  } catch (error) {
    console.error('❌ Error during seedDatabaseIfEmpty:', error);
  }
};

module.exports = { seedDatabaseIfEmpty };
