export const FALLBACK_CATEGORIES = [
  { _id: 'cat_1', name: 'Electrical Repairs & Wiring', slug: 'electrician', icon: '⚡', basePrice: 299, description: 'Complete electrical troubleshooting, circuit breaker replacement, wiring repairs, and installations.' },
  { _id: 'cat_2', name: 'AC Servicing & Deep Repair', slug: 'ac-repair', icon: '❄️', basePrice: 549, description: 'Jet pump foam wash, gas leak inspection & recharge, PCB troubleshooting, and maintenance.' },
  { _id: 'cat_3', name: 'Plumbing & Pipe Solutions', slug: 'plumber', icon: '🔧', basePrice: 349, description: 'Emergency leak detection, tap & mixer fitting, drain unblocking, water heater setup, and more.' },
  { _id: 'cat_4', name: 'Full Home Deep Cleaning', slug: 'cleaning', icon: '✨', basePrice: 1299, description: 'Intensive hospital-grade sanitization for kitchens, bathrooms, floors, and upholstery.' },
  { _id: 'cat_5', name: 'Carpentry & Woodwork Assembly', slug: 'carpenter', icon: '🪚', basePrice: 449, description: 'Custom cabinetry repairs, door/lock fixing, hinges, modular furniture setup, and precision work.' },
  { _id: 'cat_6', name: 'Interior & Exterior Painting', slug: 'painter', icon: '🎨', basePrice: 1499, description: 'Waterproofing, wall crack treatment, texture painting, and premium emulsion finishes.' },
  { _id: 'cat_7', name: 'Organic Pest Control', slug: 'pest-control', icon: '🛡️', basePrice: 749, description: 'Odorless gel & herbal spray treatment for cockroaches, termites, bedbugs, and rodents.' },
  { _id: 'cat_8', name: 'Smart Home & CCTV Setup', slug: 'smart-home', icon: '📡', basePrice: 899, description: 'Smart switch configuration, IP camera and video doorbell installations, WiFi mesh, and more.' },
];

export const METROPOLITAN_CITIES = [
  'Kolkata',
  'Bengaluru',
  'Delhi NCR',
  'Mumbai',
  'Hyderabad',
  'Chennai',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Chandigarh',
  'Lucknow',
  'Kochi',
];

export const FALLBACK_PROS = [
  {
    "_id": "pro_kol_electrician_1",
    "businessName": "Apex Electricals & Power Systems",
    "ownerName": "Subhashish Das",
    "category": "electrician",
    "tagline": "Verified Electrician Specialist • Lead: Subhashish Das",
    "description": "Providing professional and guaranteed electrical repairs & wiring across Salt Lake Sector V and surrounding neighborhoods in Kolkata. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 5,
    "rating": 4.7,
    "totalReviews": 45,
    "completedJobs": 45,
    "responseRate": 96,
    "trustScore": 88,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Electrician",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Kolkata"
    ],
    "location": {
      "city": "Kolkata",
      "address": "Salt Lake Sector V, Kolkata",
      "coordinates": [
        88.3114,
        22.5201
      ]
    },
    "services": [
      {
        "name": "Electrician Diagnostics & Standard Service",
        "slug": "electrician",
        "price": 299,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for electrical repairs & wiring."
      },
      {
        "name": "Comprehensive Electrician Overhaul & Fitting",
        "slug": "electrician",
        "price": 697,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Subhashish Das",
      "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_kol_electrician_2",
    "businessName": "VoltMaster Quick Response",
    "ownerName": "Debabrata Mukherjee",
    "category": "electrician",
    "tagline": "Verified Electrician Specialist • Lead: Debabrata Mukherjee",
    "description": "Providing professional and guaranteed electrical repairs & wiring across Park Circus and surrounding neighborhoods in Kolkata. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 6,
    "rating": 4.8,
    "totalReviews": 50,
    "completedJobs": 50,
    "responseRate": 97,
    "trustScore": 89,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Electrician",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Kolkata"
    ],
    "location": {
      "city": "Kolkata",
      "address": "Park Circus, Kolkata",
      "coordinates": [
        88.3114,
        22.5551
      ]
    },
    "services": [
      {
        "name": "Electrician Diagnostics & Standard Service",
        "slug": "electrician",
        "price": 299,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for electrical repairs & wiring."
      },
      {
        "name": "Comprehensive Electrician Overhaul & Fitting",
        "slug": "electrician",
        "price": 697,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Debabrata Mukherjee",
      "avatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_kol_ac-repair_1",
    "businessName": "Metro Air Conditioning & Cooling",
    "ownerName": "Amitava Roy",
    "category": "ac-repair",
    "tagline": "Verified AC Repair Specialist • Lead: Amitava Roy",
    "description": "Providing professional and guaranteed ac servicing & deep repair across Park Street and surrounding neighborhoods in Kolkata. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 7,
    "rating": 4.9,
    "totalReviews": 55,
    "completedJobs": 55,
    "responseRate": 98,
    "trustScore": 90,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "AC Repair",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Kolkata"
    ],
    "location": {
      "city": "Kolkata",
      "address": "Park Street, Kolkata",
      "coordinates": [
        88.3114,
        22.5901
      ]
    },
    "services": [
      {
        "name": "AC Repair Diagnostics & Standard Service",
        "slug": "ac-repair",
        "price": 549,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for ac servicing & deep repair."
      },
      {
        "name": "Comprehensive AC Repair Overhaul & Fitting",
        "slug": "ac-repair",
        "price": 1197,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Amitava Roy",
      "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_kol_ac-repair_2",
    "businessName": "CoolBreeze Express AC Care",
    "ownerName": "Pritam Ghosh",
    "category": "ac-repair",
    "tagline": "Verified AC Repair Specialist • Lead: Pritam Ghosh",
    "description": "Providing professional and guaranteed ac servicing & deep repair across New Town Action Area 2 and surrounding neighborhoods in Kolkata. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 8,
    "rating": 4.7,
    "totalReviews": 60,
    "completedJobs": 60,
    "responseRate": 99,
    "trustScore": 91,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "AC Repair",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Kolkata"
    ],
    "location": {
      "city": "Kolkata",
      "address": "New Town Action Area 2, Kolkata",
      "coordinates": [
        88.3114,
        22.6251
      ]
    },
    "services": [
      {
        "name": "AC Repair Diagnostics & Standard Service",
        "slug": "ac-repair",
        "price": 549,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for ac servicing & deep repair."
      },
      {
        "name": "Comprehensive AC Repair Overhaul & Fitting",
        "slug": "ac-repair",
        "price": 1197,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Pritam Ghosh",
      "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_kol_plumber_1",
    "businessName": "Prime Plumbing & Leak Solutions",
    "ownerName": "Sunil Mahato",
    "category": "plumber",
    "tagline": "Verified Plumbing Specialist • Lead: Sunil Mahato",
    "description": "Providing professional and guaranteed plumbing & pipe solutions across Ballygunge and surrounding neighborhoods in Kolkata. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 9,
    "rating": 4.8,
    "totalReviews": 65,
    "completedJobs": 65,
    "responseRate": 96,
    "trustScore": 92,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Plumbing",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Kolkata"
    ],
    "location": {
      "city": "Kolkata",
      "address": "Ballygunge, Kolkata",
      "coordinates": [
        88.3464,
        22.5201
      ]
    },
    "services": [
      {
        "name": "Plumbing Diagnostics & Standard Service",
        "slug": "plumber",
        "price": 349,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for plumbing & pipe solutions."
      },
      {
        "name": "Comprehensive Plumbing Overhaul & Fitting",
        "slug": "plumber",
        "price": 797,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Sunil Mahato",
      "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_kol_plumber_2",
    "businessName": "Kolkata Flow Plumbers",
    "ownerName": "Tapan Karmakar",
    "category": "plumber",
    "tagline": "Verified Plumbing Specialist • Lead: Tapan Karmakar",
    "description": "Providing professional and guaranteed plumbing & pipe solutions across Gariahat Market and surrounding neighborhoods in Kolkata. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 10,
    "rating": 4.9,
    "totalReviews": 70,
    "completedJobs": 70,
    "responseRate": 97,
    "trustScore": 93,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Plumbing",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Kolkata"
    ],
    "location": {
      "city": "Kolkata",
      "address": "Gariahat Market, Kolkata",
      "coordinates": [
        88.3464,
        22.5551
      ]
    },
    "services": [
      {
        "name": "Plumbing Diagnostics & Standard Service",
        "slug": "plumber",
        "price": 349,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for plumbing & pipe solutions."
      },
      {
        "name": "Comprehensive Plumbing Overhaul & Fitting",
        "slug": "plumber",
        "price": 797,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Tapan Karmakar",
      "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_kol_cleaning_1",
    "businessName": "PureSpark Deep Cleaning",
    "ownerName": "Rina Banerjee",
    "category": "cleaning",
    "tagline": "Verified Deep Cleaning Specialist • Lead: Rina Banerjee",
    "description": "Providing professional and guaranteed full home deep cleaning across Salt Lake Sector III and surrounding neighborhoods in Kolkata. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 11,
    "rating": 4.7,
    "totalReviews": 75,
    "completedJobs": 75,
    "responseRate": 98,
    "trustScore": 94,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Deep Cleaning",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Kolkata"
    ],
    "location": {
      "city": "Kolkata",
      "address": "Salt Lake Sector III, Kolkata",
      "coordinates": [
        88.3464,
        22.5901
      ]
    },
    "services": [
      {
        "name": "Deep Cleaning Diagnostics & Standard Service",
        "slug": "cleaning",
        "price": 1299,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for full home deep cleaning."
      },
      {
        "name": "Comprehensive Deep Cleaning Overhaul & Fitting",
        "slug": "cleaning",
        "price": 2697,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Rina Banerjee",
      "avatar": "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_kol_cleaning_2",
    "businessName": "Crystal Clean Homes",
    "ownerName": "Sanjay Pal",
    "category": "cleaning",
    "tagline": "Verified Deep Cleaning Specialist • Lead: Sanjay Pal",
    "description": "Providing professional and guaranteed full home deep cleaning across Alipore and surrounding neighborhoods in Kolkata. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 12,
    "rating": 4.8,
    "totalReviews": 80,
    "completedJobs": 80,
    "responseRate": 99,
    "trustScore": 95,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Deep Cleaning",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Kolkata"
    ],
    "location": {
      "city": "Kolkata",
      "address": "Alipore, Kolkata",
      "coordinates": [
        88.3464,
        22.6251
      ]
    },
    "services": [
      {
        "name": "Deep Cleaning Diagnostics & Standard Service",
        "slug": "cleaning",
        "price": 1299,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for full home deep cleaning."
      },
      {
        "name": "Comprehensive Deep Cleaning Overhaul & Fitting",
        "slug": "cleaning",
        "price": 2697,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Sanjay Pal",
      "avatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_kol_carpenter_1",
    "businessName": "Heritage Woodcraft Carpentry",
    "ownerName": "Bikash Roy",
    "category": "carpenter",
    "tagline": "Verified Carpentry Specialist • Lead: Bikash Roy",
    "description": "Providing professional and guaranteed carpentry & woodwork assembly across Behala Chowrasta and surrounding neighborhoods in Kolkata. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 5,
    "rating": 4.9,
    "totalReviews": 85,
    "completedJobs": 85,
    "responseRate": 96,
    "trustScore": 96,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Carpentry",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Kolkata"
    ],
    "location": {
      "city": "Kolkata",
      "address": "Behala Chowrasta, Kolkata",
      "coordinates": [
        88.3814,
        22.5201
      ]
    },
    "services": [
      {
        "name": "Carpentry Diagnostics & Standard Service",
        "slug": "carpenter",
        "price": 449,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for carpentry & woodwork assembly."
      },
      {
        "name": "Comprehensive Carpentry Overhaul & Fitting",
        "slug": "carpenter",
        "price": 997,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Bikash Roy",
      "avatar": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_kol_carpenter_2",
    "businessName": "Master Furniture Assembly",
    "ownerName": "Sanjoy Das",
    "category": "carpenter",
    "tagline": "Verified Carpentry Specialist • Lead: Sanjoy Das",
    "description": "Providing professional and guaranteed carpentry & woodwork assembly across Howrah Station Area and surrounding neighborhoods in Kolkata. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 6,
    "rating": 4.7,
    "totalReviews": 90,
    "completedJobs": 90,
    "responseRate": 97,
    "trustScore": 97,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Carpentry",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Kolkata"
    ],
    "location": {
      "city": "Kolkata",
      "address": "Howrah Station Area, Kolkata",
      "coordinates": [
        88.3814,
        22.5551
      ]
    },
    "services": [
      {
        "name": "Carpentry Diagnostics & Standard Service",
        "slug": "carpenter",
        "price": 449,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for carpentry & woodwork assembly."
      },
      {
        "name": "Comprehensive Carpentry Overhaul & Fitting",
        "slug": "carpenter",
        "price": 997,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Sanjoy Das",
      "avatar": "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_kol_painter_1",
    "businessName": "ColorCraft Wall Finishes",
    "ownerName": "Anirban Sen",
    "category": "painter",
    "tagline": "Verified Painting Specialist • Lead: Anirban Sen",
    "description": "Providing professional and guaranteed interior & exterior painting across Dum Dum Metro and surrounding neighborhoods in Kolkata. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 7,
    "rating": 4.8,
    "totalReviews": 95,
    "completedJobs": 95,
    "responseRate": 98,
    "trustScore": 98,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Painting",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Kolkata"
    ],
    "location": {
      "city": "Kolkata",
      "address": "Dum Dum Metro, Kolkata",
      "coordinates": [
        88.3814,
        22.5901
      ]
    },
    "services": [
      {
        "name": "Painting Diagnostics & Standard Service",
        "slug": "painter",
        "price": 1499,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for interior & exterior painting."
      },
      {
        "name": "Comprehensive Painting Overhaul & Fitting",
        "slug": "painter",
        "price": 3097,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Anirban Sen",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_kol_painter_2",
    "businessName": "Kolkata WeatherProof Painters",
    "ownerName": "Pranab Mandal",
    "category": "painter",
    "tagline": "Verified Painting Specialist • Lead: Pranab Mandal",
    "description": "Providing professional and guaranteed interior & exterior painting across Lake Gardens and surrounding neighborhoods in Kolkata. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 8,
    "rating": 4.9,
    "totalReviews": 100,
    "completedJobs": 100,
    "responseRate": 99,
    "trustScore": 88,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Painting",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Kolkata"
    ],
    "location": {
      "city": "Kolkata",
      "address": "Lake Gardens, Kolkata",
      "coordinates": [
        88.3814,
        22.6251
      ]
    },
    "services": [
      {
        "name": "Painting Diagnostics & Standard Service",
        "slug": "painter",
        "price": 1499,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for interior & exterior painting."
      },
      {
        "name": "Comprehensive Painting Overhaul & Fitting",
        "slug": "painter",
        "price": 3097,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Pranab Mandal",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_kol_pest-control_1",
    "businessName": "Herbal Shield Pest Solutions",
    "ownerName": "Gouranga Naskar",
    "category": "pest-control",
    "tagline": "Verified Pest Control Specialist • Lead: Gouranga Naskar",
    "description": "Providing professional and guaranteed organic pest control across Tollygunge and surrounding neighborhoods in Kolkata. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 9,
    "rating": 4.7,
    "totalReviews": 105,
    "completedJobs": 105,
    "responseRate": 96,
    "trustScore": 89,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Pest Control",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Kolkata"
    ],
    "location": {
      "city": "Kolkata",
      "address": "Tollygunge, Kolkata",
      "coordinates": [
        88.4164,
        22.5201
      ]
    },
    "services": [
      {
        "name": "Pest Control Diagnostics & Standard Service",
        "slug": "pest-control",
        "price": 749,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for organic pest control."
      },
      {
        "name": "Comprehensive Pest Control Overhaul & Fitting",
        "slug": "pest-control",
        "price": 1597,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Gouranga Naskar",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_kol_pest-control_2",
    "businessName": "EcoGuard Safe Pest Removal",
    "ownerName": "Sudip Saha",
    "category": "pest-control",
    "tagline": "Verified Pest Control Specialist • Lead: Sudip Saha",
    "description": "Providing professional and guaranteed organic pest control across Kankurgachi and surrounding neighborhoods in Kolkata. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 10,
    "rating": 4.8,
    "totalReviews": 110,
    "completedJobs": 110,
    "responseRate": 97,
    "trustScore": 90,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Pest Control",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Kolkata"
    ],
    "location": {
      "city": "Kolkata",
      "address": "Kankurgachi, Kolkata",
      "coordinates": [
        88.4164,
        22.5551
      ]
    },
    "services": [
      {
        "name": "Pest Control Diagnostics & Standard Service",
        "slug": "pest-control",
        "price": 749,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for organic pest control."
      },
      {
        "name": "Comprehensive Pest Control Overhaul & Fitting",
        "slug": "pest-control",
        "price": 1597,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Sudip Saha",
      "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_kol_smart-home_1",
    "businessName": "SmartNest Automation & CCTV",
    "ownerName": "Indranil Bose",
    "category": "smart-home",
    "tagline": "Verified Smart Home Specialist • Lead: Indranil Bose",
    "description": "Providing professional and guaranteed smart home & cctv setup across Salt Lake Sector I and surrounding neighborhoods in Kolkata. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 11,
    "rating": 4.9,
    "totalReviews": 115,
    "completedJobs": 115,
    "responseRate": 98,
    "trustScore": 91,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Smart Home",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Kolkata"
    ],
    "location": {
      "city": "Kolkata",
      "address": "Salt Lake Sector I, Kolkata",
      "coordinates": [
        88.4164,
        22.5901
      ]
    },
    "services": [
      {
        "name": "Smart Home Diagnostics & Standard Service",
        "slug": "smart-home",
        "price": 899,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for smart home & cctv setup."
      },
      {
        "name": "Comprehensive Smart Home Overhaul & Fitting",
        "slug": "smart-home",
        "price": 1897,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Indranil Bose",
      "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_kol_smart-home_2",
    "businessName": "SecureVision Smart Security",
    "ownerName": "Arindam Dey",
    "category": "smart-home",
    "tagline": "Verified Smart Home Specialist • Lead: Arindam Dey",
    "description": "Providing professional and guaranteed smart home & cctv setup across Rajarhat Expressway and surrounding neighborhoods in Kolkata. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 12,
    "rating": 4.7,
    "totalReviews": 120,
    "completedJobs": 120,
    "responseRate": 99,
    "trustScore": 92,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Smart Home",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Kolkata"
    ],
    "location": {
      "city": "Kolkata",
      "address": "Rajarhat Expressway, Kolkata",
      "coordinates": [
        88.4164,
        22.6251
      ]
    },
    "services": [
      {
        "name": "Smart Home Diagnostics & Standard Service",
        "slug": "smart-home",
        "price": 899,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for smart home & cctv setup."
      },
      {
        "name": "Comprehensive Smart Home Overhaul & Fitting",
        "slug": "smart-home",
        "price": 1897,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Arindam Dey",
      "avatar": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_blr_electrician_1",
    "businessName": "Silicon Valley Electricals",
    "ownerName": "Karthik Murthy",
    "category": "electrician",
    "tagline": "Verified Electrician Specialist • Lead: Karthik Murthy",
    "description": "Providing professional and guaranteed electrical repairs & wiring across Koramangala 5th Block and surrounding neighborhoods in Bengaluru. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 5,
    "rating": 4.7,
    "totalReviews": 45,
    "completedJobs": 45,
    "responseRate": 96,
    "trustScore": 88,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Electrician",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Bengaluru"
    ],
    "location": {
      "city": "Bengaluru",
      "address": "Koramangala 5th Block, Bengaluru",
      "coordinates": [
        77.5421,
        12.9191
      ]
    },
    "services": [
      {
        "name": "Electrician Diagnostics & Standard Service",
        "slug": "electrician",
        "price": 299,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for electrical repairs & wiring."
      },
      {
        "name": "Comprehensive Electrician Overhaul & Fitting",
        "slug": "electrician",
        "price": 697,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Karthik Murthy",
      "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_blr_electrician_2",
    "businessName": "TechCity Quick Wire Works",
    "ownerName": "Naveen Hegde",
    "category": "electrician",
    "tagline": "Verified Electrician Specialist • Lead: Naveen Hegde",
    "description": "Providing professional and guaranteed electrical repairs & wiring across Indiranagar 100ft Road and surrounding neighborhoods in Bengaluru. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 6,
    "rating": 4.8,
    "totalReviews": 50,
    "completedJobs": 50,
    "responseRate": 97,
    "trustScore": 89,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Electrician",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Bengaluru"
    ],
    "location": {
      "city": "Bengaluru",
      "address": "Indiranagar 100ft Road, Bengaluru",
      "coordinates": [
        77.5421,
        12.9541
      ]
    },
    "services": [
      {
        "name": "Electrician Diagnostics & Standard Service",
        "slug": "electrician",
        "price": 299,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for electrical repairs & wiring."
      },
      {
        "name": "Comprehensive Electrician Overhaul & Fitting",
        "slug": "electrician",
        "price": 697,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Naveen Hegde",
      "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_blr_ac-repair_1",
    "businessName": "Garden City AC Cooling",
    "ownerName": "Suresh Gowda",
    "category": "ac-repair",
    "tagline": "Verified AC Repair Specialist • Lead: Suresh Gowda",
    "description": "Providing professional and guaranteed ac servicing & deep repair across Whitefield Main Road and surrounding neighborhoods in Bengaluru. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 7,
    "rating": 4.9,
    "totalReviews": 55,
    "completedJobs": 55,
    "responseRate": 98,
    "trustScore": 90,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "AC Repair",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Bengaluru"
    ],
    "location": {
      "city": "Bengaluru",
      "address": "Whitefield Main Road, Bengaluru",
      "coordinates": [
        77.5421,
        12.9891
      ]
    },
    "services": [
      {
        "name": "AC Repair Diagnostics & Standard Service",
        "slug": "ac-repair",
        "price": 549,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for ac servicing & deep repair."
      },
      {
        "name": "Comprehensive AC Repair Overhaul & Fitting",
        "slug": "ac-repair",
        "price": 1197,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Suresh Gowda",
      "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_blr_ac-repair_2",
    "businessName": "Bengaluru CoolAir Systems",
    "ownerName": "Prashant Reddy",
    "category": "ac-repair",
    "tagline": "Verified AC Repair Specialist • Lead: Prashant Reddy",
    "description": "Providing professional and guaranteed ac servicing & deep repair across HSR Layout Sector 2 and surrounding neighborhoods in Bengaluru. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 8,
    "rating": 4.7,
    "totalReviews": 60,
    "completedJobs": 60,
    "responseRate": 99,
    "trustScore": 91,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "AC Repair",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Bengaluru"
    ],
    "location": {
      "city": "Bengaluru",
      "address": "HSR Layout Sector 2, Bengaluru",
      "coordinates": [
        77.5421,
        13.0241
      ]
    },
    "services": [
      {
        "name": "AC Repair Diagnostics & Standard Service",
        "slug": "ac-repair",
        "price": 549,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for ac servicing & deep repair."
      },
      {
        "name": "Comprehensive AC Repair Overhaul & Fitting",
        "slug": "ac-repair",
        "price": 1197,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Prashant Reddy",
      "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_blr_plumber_1",
    "businessName": "Namma Plumbers QuickFix",
    "ownerName": "Ramesh Rao",
    "category": "plumber",
    "tagline": "Verified Plumbing Specialist • Lead: Ramesh Rao",
    "description": "Providing professional and guaranteed plumbing & pipe solutions across BTM Layout 2nd Stage and surrounding neighborhoods in Bengaluru. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 9,
    "rating": 4.8,
    "totalReviews": 65,
    "completedJobs": 65,
    "responseRate": 96,
    "trustScore": 92,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Plumbing",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Bengaluru"
    ],
    "location": {
      "city": "Bengaluru",
      "address": "BTM Layout 2nd Stage, Bengaluru",
      "coordinates": [
        77.5771,
        12.9191
      ]
    },
    "services": [
      {
        "name": "Plumbing Diagnostics & Standard Service",
        "slug": "plumber",
        "price": 349,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for plumbing & pipe solutions."
      },
      {
        "name": "Comprehensive Plumbing Overhaul & Fitting",
        "slug": "plumber",
        "price": 797,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Ramesh Rao",
      "avatar": "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_blr_plumber_2",
    "businessName": "Kaveri Hydro Solutions",
    "ownerName": "Manjunath Swamy",
    "category": "plumber",
    "tagline": "Verified Plumbing Specialist • Lead: Manjunath Swamy",
    "description": "Providing professional and guaranteed plumbing & pipe solutions across Jayanagar 4th Block and surrounding neighborhoods in Bengaluru. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 10,
    "rating": 4.9,
    "totalReviews": 70,
    "completedJobs": 70,
    "responseRate": 97,
    "trustScore": 93,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Plumbing",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Bengaluru"
    ],
    "location": {
      "city": "Bengaluru",
      "address": "Jayanagar 4th Block, Bengaluru",
      "coordinates": [
        77.5771,
        12.9541
      ]
    },
    "services": [
      {
        "name": "Plumbing Diagnostics & Standard Service",
        "slug": "plumber",
        "price": 349,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for plumbing & pipe solutions."
      },
      {
        "name": "Comprehensive Plumbing Overhaul & Fitting",
        "slug": "plumber",
        "price": 797,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Manjunath Swamy",
      "avatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_blr_cleaning_1",
    "businessName": "EcoSpark Bengaluru Cleaners",
    "ownerName": "Divya Hegde",
    "category": "cleaning",
    "tagline": "Verified Deep Cleaning Specialist • Lead: Divya Hegde",
    "description": "Providing professional and guaranteed full home deep cleaning across Bellandur EcoSpace and surrounding neighborhoods in Bengaluru. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 11,
    "rating": 4.7,
    "totalReviews": 75,
    "completedJobs": 75,
    "responseRate": 98,
    "trustScore": 94,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Deep Cleaning",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Bengaluru"
    ],
    "location": {
      "city": "Bengaluru",
      "address": "Bellandur EcoSpace, Bengaluru",
      "coordinates": [
        77.5771,
        12.9891
      ]
    },
    "services": [
      {
        "name": "Deep Cleaning Diagnostics & Standard Service",
        "slug": "cleaning",
        "price": 1299,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for full home deep cleaning."
      },
      {
        "name": "Comprehensive Deep Cleaning Overhaul & Fitting",
        "slug": "cleaning",
        "price": 2697,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Divya Hegde",
      "avatar": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_blr_cleaning_2",
    "businessName": "CleanWave Home Sanitization",
    "ownerName": "Deepa Narayanan",
    "category": "cleaning",
    "tagline": "Verified Deep Cleaning Specialist • Lead: Deepa Narayanan",
    "description": "Providing professional and guaranteed full home deep cleaning across Marathahalli Bridge and surrounding neighborhoods in Bengaluru. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 12,
    "rating": 4.8,
    "totalReviews": 80,
    "completedJobs": 80,
    "responseRate": 99,
    "trustScore": 95,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Deep Cleaning",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Bengaluru"
    ],
    "location": {
      "city": "Bengaluru",
      "address": "Marathahalli Bridge, Bengaluru",
      "coordinates": [
        77.5771,
        13.0241
      ]
    },
    "services": [
      {
        "name": "Deep Cleaning Diagnostics & Standard Service",
        "slug": "cleaning",
        "price": 1299,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for full home deep cleaning."
      },
      {
        "name": "Comprehensive Deep Cleaning Overhaul & Fitting",
        "slug": "cleaning",
        "price": 2697,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Deepa Narayanan",
      "avatar": "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_blr_carpenter_1",
    "businessName": "Deccan Teak Woodcraft",
    "ownerName": "Raghavendra Bhat",
    "category": "carpenter",
    "tagline": "Verified Carpentry Specialist • Lead: Raghavendra Bhat",
    "description": "Providing professional and guaranteed carpentry & woodwork assembly across Electronic City Phase 1 and surrounding neighborhoods in Bengaluru. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 5,
    "rating": 4.9,
    "totalReviews": 85,
    "completedJobs": 85,
    "responseRate": 96,
    "trustScore": 96,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Carpentry",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Bengaluru"
    ],
    "location": {
      "city": "Bengaluru",
      "address": "Electronic City Phase 1, Bengaluru",
      "coordinates": [
        77.6121,
        12.9191
      ]
    },
    "services": [
      {
        "name": "Carpentry Diagnostics & Standard Service",
        "slug": "carpenter",
        "price": 449,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for carpentry & woodwork assembly."
      },
      {
        "name": "Comprehensive Carpentry Overhaul & Fitting",
        "slug": "carpenter",
        "price": 997,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Raghavendra Bhat",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_blr_carpenter_2",
    "businessName": "Modular Living Carpentry",
    "ownerName": "Venkatesh Prasad",
    "category": "carpenter",
    "tagline": "Verified Carpentry Specialist • Lead: Venkatesh Prasad",
    "description": "Providing professional and guaranteed carpentry & woodwork assembly across Sarjapur Road and surrounding neighborhoods in Bengaluru. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 6,
    "rating": 4.7,
    "totalReviews": 90,
    "completedJobs": 90,
    "responseRate": 97,
    "trustScore": 97,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Carpentry",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Bengaluru"
    ],
    "location": {
      "city": "Bengaluru",
      "address": "Sarjapur Road, Bengaluru",
      "coordinates": [
        77.6121,
        12.9541
      ]
    },
    "services": [
      {
        "name": "Carpentry Diagnostics & Standard Service",
        "slug": "carpenter",
        "price": 449,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for carpentry & woodwork assembly."
      },
      {
        "name": "Comprehensive Carpentry Overhaul & Fitting",
        "slug": "carpenter",
        "price": 997,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Venkatesh Prasad",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_blr_painter_1",
    "businessName": "Bangalore Palette House Painters",
    "ownerName": "Anand Kumar",
    "category": "painter",
    "tagline": "Verified Painting Specialist • Lead: Anand Kumar",
    "description": "Providing professional and guaranteed interior & exterior painting across Malleshwaram 8th Cross and surrounding neighborhoods in Bengaluru. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 7,
    "rating": 4.8,
    "totalReviews": 95,
    "completedJobs": 95,
    "responseRate": 98,
    "trustScore": 98,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Painting",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Bengaluru"
    ],
    "location": {
      "city": "Bengaluru",
      "address": "Malleshwaram 8th Cross, Bengaluru",
      "coordinates": [
        77.6121,
        12.9891
      ]
    },
    "services": [
      {
        "name": "Painting Diagnostics & Standard Service",
        "slug": "painter",
        "price": 1499,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for interior & exterior painting."
      },
      {
        "name": "Comprehensive Painting Overhaul & Fitting",
        "slug": "painter",
        "price": 3097,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Anand Kumar",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_blr_painter_2",
    "businessName": "Silicon Wall Coatings",
    "ownerName": "Shiva Shankar",
    "category": "painter",
    "tagline": "Verified Painting Specialist • Lead: Shiva Shankar",
    "description": "Providing professional and guaranteed interior & exterior painting across Hebbal Outer Ring and surrounding neighborhoods in Bengaluru. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 8,
    "rating": 4.9,
    "totalReviews": 100,
    "completedJobs": 100,
    "responseRate": 99,
    "trustScore": 88,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Painting",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Bengaluru"
    ],
    "location": {
      "city": "Bengaluru",
      "address": "Hebbal Outer Ring, Bengaluru",
      "coordinates": [
        77.6121,
        13.0241
      ]
    },
    "services": [
      {
        "name": "Painting Diagnostics & Standard Service",
        "slug": "painter",
        "price": 1499,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for interior & exterior painting."
      },
      {
        "name": "Comprehensive Painting Overhaul & Fitting",
        "slug": "painter",
        "price": 3097,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Shiva Shankar",
      "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_blr_pest-control_1",
    "businessName": "GreenBio Safe Pest Control",
    "ownerName": "Chetan Gowda",
    "category": "pest-control",
    "tagline": "Verified Pest Control Specialist • Lead: Chetan Gowda",
    "description": "Providing professional and guaranteed organic pest control across Kengeri Satellite Town and surrounding neighborhoods in Bengaluru. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 9,
    "rating": 4.7,
    "totalReviews": 105,
    "completedJobs": 105,
    "responseRate": 96,
    "trustScore": 89,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Pest Control",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Bengaluru"
    ],
    "location": {
      "city": "Bengaluru",
      "address": "Kengeri Satellite Town, Bengaluru",
      "coordinates": [
        77.6471,
        12.9191
      ]
    },
    "services": [
      {
        "name": "Pest Control Diagnostics & Standard Service",
        "slug": "pest-control",
        "price": 749,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for organic pest control."
      },
      {
        "name": "Comprehensive Pest Control Overhaul & Fitting",
        "slug": "pest-control",
        "price": 1597,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Chetan Gowda",
      "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_blr_pest-control_2",
    "businessName": "Urban Shield Pest Protectors",
    "ownerName": "Srinivas Murthy",
    "category": "pest-control",
    "tagline": "Verified Pest Control Specialist • Lead: Srinivas Murthy",
    "description": "Providing professional and guaranteed organic pest control across Banashankari 3rd Stage and surrounding neighborhoods in Bengaluru. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 10,
    "rating": 4.8,
    "totalReviews": 110,
    "completedJobs": 110,
    "responseRate": 97,
    "trustScore": 90,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Pest Control",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Bengaluru"
    ],
    "location": {
      "city": "Bengaluru",
      "address": "Banashankari 3rd Stage, Bengaluru",
      "coordinates": [
        77.6471,
        12.9541
      ]
    },
    "services": [
      {
        "name": "Pest Control Diagnostics & Standard Service",
        "slug": "pest-control",
        "price": 749,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for organic pest control."
      },
      {
        "name": "Comprehensive Pest Control Overhaul & Fitting",
        "slug": "pest-control",
        "price": 1597,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Srinivas Murthy",
      "avatar": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_blr_smart-home_1",
    "businessName": "SmartHome IoT Systems",
    "ownerName": "Arun Balasubramanian",
    "category": "smart-home",
    "tagline": "Verified Smart Home Specialist • Lead: Arun Balasubramanian",
    "description": "Providing professional and guaranteed smart home & cctv setup across Indiranagar Defence Colony and surrounding neighborhoods in Bengaluru. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 11,
    "rating": 4.9,
    "totalReviews": 115,
    "completedJobs": 115,
    "responseRate": 98,
    "trustScore": 91,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Smart Home",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Bengaluru"
    ],
    "location": {
      "city": "Bengaluru",
      "address": "Indiranagar Defence Colony, Bengaluru",
      "coordinates": [
        77.6471,
        12.9891
      ]
    },
    "services": [
      {
        "name": "Smart Home Diagnostics & Standard Service",
        "slug": "smart-home",
        "price": 899,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for smart home & cctv setup."
      },
      {
        "name": "Comprehensive Smart Home Overhaul & Fitting",
        "slug": "smart-home",
        "price": 1897,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Arun Balasubramanian",
      "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_blr_smart-home_2",
    "businessName": "CyberSafe Vision & Alarms",
    "ownerName": "Praveen Nair",
    "category": "smart-home",
    "tagline": "Verified Smart Home Specialist • Lead: Praveen Nair",
    "description": "Providing professional and guaranteed smart home & cctv setup across HSR Sector 1 and surrounding neighborhoods in Bengaluru. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 12,
    "rating": 4.7,
    "totalReviews": 120,
    "completedJobs": 120,
    "responseRate": 99,
    "trustScore": 92,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Smart Home",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Bengaluru"
    ],
    "location": {
      "city": "Bengaluru",
      "address": "HSR Sector 1, Bengaluru",
      "coordinates": [
        77.6471,
        13.0241
      ]
    },
    "services": [
      {
        "name": "Smart Home Diagnostics & Standard Service",
        "slug": "smart-home",
        "price": 899,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for smart home & cctv setup."
      },
      {
        "name": "Comprehensive Smart Home Overhaul & Fitting",
        "slug": "smart-home",
        "price": 1897,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Praveen Nair",
      "avatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_del_electrician_1",
    "businessName": "Capital Power & Electricals",
    "ownerName": "Rajesh Sharma",
    "category": "electrician",
    "tagline": "Verified Electrician Specialist • Lead: Rajesh Sharma",
    "description": "Providing professional and guaranteed electrical repairs & wiring across Connaught Place and surrounding neighborhoods in Delhi NCR. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 5,
    "rating": 4.7,
    "totalReviews": 45,
    "completedJobs": 45,
    "responseRate": 96,
    "trustScore": 88,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Electrician",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Delhi NCR"
    ],
    "location": {
      "city": "Delhi NCR",
      "address": "Connaught Place, Delhi NCR",
      "coordinates": [
        77.1565,
        28.5614
      ]
    },
    "services": [
      {
        "name": "Electrician Diagnostics & Standard Service",
        "slug": "electrician",
        "price": 299,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for electrical repairs & wiring."
      },
      {
        "name": "Comprehensive Electrician Overhaul & Fitting",
        "slug": "electrician",
        "price": 697,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Rajesh Sharma",
      "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_del_electrician_2",
    "businessName": "MetroGrid Quick Electrician",
    "ownerName": "Deepak Choudhary",
    "category": "electrician",
    "tagline": "Verified Electrician Specialist • Lead: Deepak Choudhary",
    "description": "Providing professional and guaranteed electrical repairs & wiring across South Extension II and surrounding neighborhoods in Delhi NCR. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 6,
    "rating": 4.8,
    "totalReviews": 50,
    "completedJobs": 50,
    "responseRate": 97,
    "trustScore": 89,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Electrician",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Delhi NCR"
    ],
    "location": {
      "city": "Delhi NCR",
      "address": "South Extension II, Delhi NCR",
      "coordinates": [
        77.1565,
        28.5964
      ]
    },
    "services": [
      {
        "name": "Electrician Diagnostics & Standard Service",
        "slug": "electrician",
        "price": 299,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for electrical repairs & wiring."
      },
      {
        "name": "Comprehensive Electrician Overhaul & Fitting",
        "slug": "electrician",
        "price": 697,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Deepak Choudhary",
      "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_del_ac-repair_1",
    "businessName": "FrostAir Express AC Care",
    "ownerName": "Vikas Verma",
    "category": "ac-repair",
    "tagline": "Verified AC Repair Specialist • Lead: Vikas Verma",
    "description": "Providing professional and guaranteed ac servicing & deep repair across DLF Phase 2, Gurgaon and surrounding neighborhoods in Delhi NCR. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 7,
    "rating": 4.9,
    "totalReviews": 55,
    "completedJobs": 55,
    "responseRate": 98,
    "trustScore": 90,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "AC Repair",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Delhi NCR"
    ],
    "location": {
      "city": "Delhi NCR",
      "address": "DLF Phase 2, Gurgaon, Delhi NCR",
      "coordinates": [
        77.1565,
        28.6314
      ]
    },
    "services": [
      {
        "name": "AC Repair Diagnostics & Standard Service",
        "slug": "ac-repair",
        "price": 549,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for ac servicing & deep repair."
      },
      {
        "name": "Comprehensive AC Repair Overhaul & Fitting",
        "slug": "ac-repair",
        "price": 1197,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Vikas Verma",
      "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_del_ac-repair_2",
    "businessName": "North India Chill Systems",
    "ownerName": "Sunil Bhati",
    "category": "ac-repair",
    "tagline": "Verified AC Repair Specialist • Lead: Sunil Bhati",
    "description": "Providing professional and guaranteed ac servicing & deep repair across Sector 18, Noida and surrounding neighborhoods in Delhi NCR. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 8,
    "rating": 4.7,
    "totalReviews": 60,
    "completedJobs": 60,
    "responseRate": 99,
    "trustScore": 91,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "AC Repair",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Delhi NCR"
    ],
    "location": {
      "city": "Delhi NCR",
      "address": "Sector 18, Noida, Delhi NCR",
      "coordinates": [
        77.1565,
        28.6664
      ]
    },
    "services": [
      {
        "name": "AC Repair Diagnostics & Standard Service",
        "slug": "ac-repair",
        "price": 549,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for ac servicing & deep repair."
      },
      {
        "name": "Comprehensive AC Repair Overhaul & Fitting",
        "slug": "ac-repair",
        "price": 1197,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Sunil Bhati",
      "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_del_plumber_1",
    "businessName": "Royal Plumbers & Pipeline Tech",
    "ownerName": "Amit Tyagi",
    "category": "plumber",
    "tagline": "Verified Plumbing Specialist • Lead: Amit Tyagi",
    "description": "Providing professional and guaranteed plumbing & pipe solutions across Sector 62, Noida and surrounding neighborhoods in Delhi NCR. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 9,
    "rating": 4.8,
    "totalReviews": 65,
    "completedJobs": 65,
    "responseRate": 96,
    "trustScore": 92,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Plumbing",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Delhi NCR"
    ],
    "location": {
      "city": "Delhi NCR",
      "address": "Sector 62, Noida, Delhi NCR",
      "coordinates": [
        77.1915,
        28.5614
      ]
    },
    "services": [
      {
        "name": "Plumbing Diagnostics & Standard Service",
        "slug": "plumber",
        "price": 349,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for plumbing & pipe solutions."
      },
      {
        "name": "Comprehensive Plumbing Overhaul & Fitting",
        "slug": "plumber",
        "price": 797,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Amit Tyagi",
      "avatar": "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_del_plumber_2",
    "businessName": "Yamuna River Pipeline Fix",
    "ownerName": "Rakesh Kumar",
    "category": "plumber",
    "tagline": "Verified Plumbing Specialist • Lead: Rakesh Kumar",
    "description": "Providing professional and guaranteed plumbing & pipe solutions across Lajpat Nagar IV and surrounding neighborhoods in Delhi NCR. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 10,
    "rating": 4.9,
    "totalReviews": 70,
    "completedJobs": 70,
    "responseRate": 97,
    "trustScore": 93,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Plumbing",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Delhi NCR"
    ],
    "location": {
      "city": "Delhi NCR",
      "address": "Lajpat Nagar IV, Delhi NCR",
      "coordinates": [
        77.1915,
        28.5964
      ]
    },
    "services": [
      {
        "name": "Plumbing Diagnostics & Standard Service",
        "slug": "plumber",
        "price": 349,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for plumbing & pipe solutions."
      },
      {
        "name": "Comprehensive Plumbing Overhaul & Fitting",
        "slug": "plumber",
        "price": 797,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Rakesh Kumar",
      "avatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_del_cleaning_1",
    "businessName": "Capital Deep Sanitization",
    "ownerName": "Meenakshi Gupta",
    "category": "cleaning",
    "tagline": "Verified Deep Cleaning Specialist • Lead: Meenakshi Gupta",
    "description": "Providing professional and guaranteed full home deep cleaning across Vasant Kunj and surrounding neighborhoods in Delhi NCR. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 11,
    "rating": 4.7,
    "totalReviews": 75,
    "completedJobs": 75,
    "responseRate": 98,
    "trustScore": 94,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Deep Cleaning",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Delhi NCR"
    ],
    "location": {
      "city": "Delhi NCR",
      "address": "Vasant Kunj, Delhi NCR",
      "coordinates": [
        77.1915,
        28.6314
      ]
    },
    "services": [
      {
        "name": "Deep Cleaning Diagnostics & Standard Service",
        "slug": "cleaning",
        "price": 1299,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for full home deep cleaning."
      },
      {
        "name": "Comprehensive Deep Cleaning Overhaul & Fitting",
        "slug": "cleaning",
        "price": 2697,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Meenakshi Gupta",
      "avatar": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_del_cleaning_2",
    "businessName": "CleanCraft Home Hygiene",
    "ownerName": "Pooja Yadav",
    "category": "cleaning",
    "tagline": "Verified Deep Cleaning Specialist • Lead: Pooja Yadav",
    "description": "Providing professional and guaranteed full home deep cleaning across Gurgaon Cyber City and surrounding neighborhoods in Delhi NCR. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 12,
    "rating": 4.8,
    "totalReviews": 80,
    "completedJobs": 80,
    "responseRate": 99,
    "trustScore": 95,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Deep Cleaning",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Delhi NCR"
    ],
    "location": {
      "city": "Delhi NCR",
      "address": "Gurgaon Cyber City, Delhi NCR",
      "coordinates": [
        77.1915,
        28.6664
      ]
    },
    "services": [
      {
        "name": "Deep Cleaning Diagnostics & Standard Service",
        "slug": "cleaning",
        "price": 1299,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for full home deep cleaning."
      },
      {
        "name": "Comprehensive Deep Cleaning Overhaul & Fitting",
        "slug": "cleaning",
        "price": 2697,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Pooja Yadav",
      "avatar": "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_del_carpenter_1",
    "businessName": "Imperial Woodworks & Interiors",
    "ownerName": "Joginder Singh",
    "category": "carpenter",
    "tagline": "Verified Carpentry Specialist • Lead: Joginder Singh",
    "description": "Providing professional and guaranteed carpentry & woodwork assembly across Rajouri Garden and surrounding neighborhoods in Delhi NCR. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 5,
    "rating": 4.9,
    "totalReviews": 85,
    "completedJobs": 85,
    "responseRate": 96,
    "trustScore": 96,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Carpentry",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Delhi NCR"
    ],
    "location": {
      "city": "Delhi NCR",
      "address": "Rajouri Garden, Delhi NCR",
      "coordinates": [
        77.2265,
        28.5614
      ]
    },
    "services": [
      {
        "name": "Carpentry Diagnostics & Standard Service",
        "slug": "carpenter",
        "price": 449,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for carpentry & woodwork assembly."
      },
      {
        "name": "Comprehensive Carpentry Overhaul & Fitting",
        "slug": "carpenter",
        "price": 997,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Joginder Singh",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_del_carpenter_2",
    "businessName": "Precision Wood Crafting",
    "ownerName": "Baljeet Singh",
    "category": "carpenter",
    "tagline": "Verified Carpentry Specialist • Lead: Baljeet Singh",
    "description": "Providing professional and guaranteed carpentry & woodwork assembly across Dwarka Sector 10 and surrounding neighborhoods in Delhi NCR. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 6,
    "rating": 4.7,
    "totalReviews": 90,
    "completedJobs": 90,
    "responseRate": 97,
    "trustScore": 97,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Carpentry",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Delhi NCR"
    ],
    "location": {
      "city": "Delhi NCR",
      "address": "Dwarka Sector 10, Delhi NCR",
      "coordinates": [
        77.2265,
        28.5964
      ]
    },
    "services": [
      {
        "name": "Carpentry Diagnostics & Standard Service",
        "slug": "carpenter",
        "price": 449,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for carpentry & woodwork assembly."
      },
      {
        "name": "Comprehensive Carpentry Overhaul & Fitting",
        "slug": "carpenter",
        "price": 997,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Baljeet Singh",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_del_painter_1",
    "businessName": "Dilli Wall Art & Painting",
    "ownerName": "Manoj Rawat",
    "category": "painter",
    "tagline": "Verified Painting Specialist • Lead: Manoj Rawat",
    "description": "Providing professional and guaranteed interior & exterior painting across Greater Kailash 1 and surrounding neighborhoods in Delhi NCR. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 7,
    "rating": 4.8,
    "totalReviews": 95,
    "completedJobs": 95,
    "responseRate": 98,
    "trustScore": 98,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Painting",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Delhi NCR"
    ],
    "location": {
      "city": "Delhi NCR",
      "address": "Greater Kailash 1, Delhi NCR",
      "coordinates": [
        77.2265,
        28.6314
      ]
    },
    "services": [
      {
        "name": "Painting Diagnostics & Standard Service",
        "slug": "painter",
        "price": 1499,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for interior & exterior painting."
      },
      {
        "name": "Comprehensive Painting Overhaul & Fitting",
        "slug": "painter",
        "price": 3097,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Manoj Rawat",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_del_painter_2",
    "businessName": "WeatherShield NCR Painters",
    "ownerName": "Sanjay Chauhan",
    "category": "painter",
    "tagline": "Verified Painting Specialist • Lead: Sanjay Chauhan",
    "description": "Providing professional and guaranteed interior & exterior painting across Noida Sector 50 and surrounding neighborhoods in Delhi NCR. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 8,
    "rating": 4.9,
    "totalReviews": 100,
    "completedJobs": 100,
    "responseRate": 99,
    "trustScore": 88,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Painting",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Delhi NCR"
    ],
    "location": {
      "city": "Delhi NCR",
      "address": "Noida Sector 50, Delhi NCR",
      "coordinates": [
        77.2265,
        28.6664
      ]
    },
    "services": [
      {
        "name": "Painting Diagnostics & Standard Service",
        "slug": "painter",
        "price": 1499,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for interior & exterior painting."
      },
      {
        "name": "Comprehensive Painting Overhaul & Fitting",
        "slug": "painter",
        "price": 3097,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Sanjay Chauhan",
      "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_del_pest-control_1",
    "businessName": "BioShield Safe Pest Control",
    "ownerName": "Dinesh Kumar",
    "category": "pest-control",
    "tagline": "Verified Pest Control Specialist • Lead: Dinesh Kumar",
    "description": "Providing professional and guaranteed organic pest control across Rohini Sector 9 and surrounding neighborhoods in Delhi NCR. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 9,
    "rating": 4.7,
    "totalReviews": 105,
    "completedJobs": 105,
    "responseRate": 96,
    "trustScore": 89,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Pest Control",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Delhi NCR"
    ],
    "location": {
      "city": "Delhi NCR",
      "address": "Rohini Sector 9, Delhi NCR",
      "coordinates": [
        77.2615,
        28.5614
      ]
    },
    "services": [
      {
        "name": "Pest Control Diagnostics & Standard Service",
        "slug": "pest-control",
        "price": 749,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for organic pest control."
      },
      {
        "name": "Comprehensive Pest Control Overhaul & Fitting",
        "slug": "pest-control",
        "price": 1597,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Dinesh Kumar",
      "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_del_pest-control_2",
    "businessName": "HerbalGuard NCR Pest Guard",
    "ownerName": "Satish Tanwar",
    "category": "pest-control",
    "tagline": "Verified Pest Control Specialist • Lead: Satish Tanwar",
    "description": "Providing professional and guaranteed organic pest control across Gurgaon Sohna Road and surrounding neighborhoods in Delhi NCR. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 10,
    "rating": 4.8,
    "totalReviews": 110,
    "completedJobs": 110,
    "responseRate": 97,
    "trustScore": 90,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Pest Control",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Delhi NCR"
    ],
    "location": {
      "city": "Delhi NCR",
      "address": "Gurgaon Sohna Road, Delhi NCR",
      "coordinates": [
        77.2615,
        28.5964
      ]
    },
    "services": [
      {
        "name": "Pest Control Diagnostics & Standard Service",
        "slug": "pest-control",
        "price": 749,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for organic pest control."
      },
      {
        "name": "Comprehensive Pest Control Overhaul & Fitting",
        "slug": "pest-control",
        "price": 1597,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Satish Tanwar",
      "avatar": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_del_smart-home_1",
    "businessName": "SmartCapital IoT & Alarms",
    "ownerName": "Vipin Malhotra",
    "category": "smart-home",
    "tagline": "Verified Smart Home Specialist • Lead: Vipin Malhotra",
    "description": "Providing professional and guaranteed smart home & cctv setup across Saket District Centre and surrounding neighborhoods in Delhi NCR. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 11,
    "rating": 4.9,
    "totalReviews": 115,
    "completedJobs": 115,
    "responseRate": 98,
    "trustScore": 91,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Smart Home",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Delhi NCR"
    ],
    "location": {
      "city": "Delhi NCR",
      "address": "Saket District Centre, Delhi NCR",
      "coordinates": [
        77.2615,
        28.6314
      ]
    },
    "services": [
      {
        "name": "Smart Home Diagnostics & Standard Service",
        "slug": "smart-home",
        "price": 899,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for smart home & cctv setup."
      },
      {
        "name": "Comprehensive Smart Home Overhaul & Fitting",
        "slug": "smart-home",
        "price": 1897,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Vipin Malhotra",
      "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_del_smart-home_2",
    "businessName": "SecureDelhi CCTV Tech",
    "ownerName": "Gaurav Mishra",
    "category": "smart-home",
    "tagline": "Verified Smart Home Specialist • Lead: Gaurav Mishra",
    "description": "Providing professional and guaranteed smart home & cctv setup across Mayur Vihar Phase 1 and surrounding neighborhoods in Delhi NCR. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 12,
    "rating": 4.7,
    "totalReviews": 120,
    "completedJobs": 120,
    "responseRate": 99,
    "trustScore": 92,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Smart Home",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Delhi NCR"
    ],
    "location": {
      "city": "Delhi NCR",
      "address": "Mayur Vihar Phase 1, Delhi NCR",
      "coordinates": [
        77.2615,
        28.6664
      ]
    },
    "services": [
      {
        "name": "Smart Home Diagnostics & Standard Service",
        "slug": "smart-home",
        "price": 899,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for smart home & cctv setup."
      },
      {
        "name": "Comprehensive Smart Home Overhaul & Fitting",
        "slug": "smart-home",
        "price": 1897,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Gaurav Mishra",
      "avatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_mum_electrician_1",
    "businessName": "Coastal City Electricals",
    "ownerName": "Siddharth Kadam",
    "category": "electrician",
    "tagline": "Verified Electrician Specialist • Lead: Siddharth Kadam",
    "description": "Providing professional and guaranteed electrical repairs & wiring across Bandra West (Linking Rd) and surrounding neighborhoods in Mumbai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 5,
    "rating": 4.7,
    "totalReviews": 45,
    "completedJobs": 45,
    "responseRate": 96,
    "trustScore": 88,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Electrician",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Mumbai"
    ],
    "location": {
      "city": "Mumbai",
      "address": "Bandra West (Linking Rd), Mumbai",
      "coordinates": [
        72.8252,
        19.0235
      ]
    },
    "services": [
      {
        "name": "Electrician Diagnostics & Standard Service",
        "slug": "electrician",
        "price": 299,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for electrical repairs & wiring."
      },
      {
        "name": "Comprehensive Electrician Overhaul & Fitting",
        "slug": "electrician",
        "price": 697,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Siddharth Kadam",
      "avatar": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_mum_electrician_2",
    "businessName": "Marine Power Solutions",
    "ownerName": "Mahesh Shinde",
    "category": "electrician",
    "tagline": "Verified Electrician Specialist • Lead: Mahesh Shinde",
    "description": "Providing professional and guaranteed electrical repairs & wiring across Dadar West (Shivaji Park) and surrounding neighborhoods in Mumbai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 6,
    "rating": 4.8,
    "totalReviews": 50,
    "completedJobs": 50,
    "responseRate": 97,
    "trustScore": 89,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Electrician",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Mumbai"
    ],
    "location": {
      "city": "Mumbai",
      "address": "Dadar West (Shivaji Park), Mumbai",
      "coordinates": [
        72.8252,
        19.0585
      ]
    },
    "services": [
      {
        "name": "Electrician Diagnostics & Standard Service",
        "slug": "electrician",
        "price": 299,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for electrical repairs & wiring."
      },
      {
        "name": "Comprehensive Electrician Overhaul & Fitting",
        "slug": "electrician",
        "price": 697,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Mahesh Shinde",
      "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_mum_ac-repair_1",
    "businessName": "Bombay Cooling & AC Care",
    "ownerName": "Sachin Deshmukh",
    "category": "ac-repair",
    "tagline": "Verified AC Repair Specialist • Lead: Sachin Deshmukh",
    "description": "Providing professional and guaranteed ac servicing & deep repair across Andheri East (Chakala) and surrounding neighborhoods in Mumbai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 7,
    "rating": 4.9,
    "totalReviews": 55,
    "completedJobs": 55,
    "responseRate": 98,
    "trustScore": 90,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "AC Repair",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Mumbai"
    ],
    "location": {
      "city": "Mumbai",
      "address": "Andheri East (Chakala), Mumbai",
      "coordinates": [
        72.8252,
        19.0935
      ]
    },
    "services": [
      {
        "name": "AC Repair Diagnostics & Standard Service",
        "slug": "ac-repair",
        "price": 549,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for ac servicing & deep repair."
      },
      {
        "name": "Comprehensive AC Repair Overhaul & Fitting",
        "slug": "ac-repair",
        "price": 1197,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Sachin Deshmukh",
      "avatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_mum_ac-repair_2",
    "businessName": "SeaBreeze Inverter AC Tech",
    "ownerName": "Tushar More",
    "category": "ac-repair",
    "tagline": "Verified AC Repair Specialist • Lead: Tushar More",
    "description": "Providing professional and guaranteed ac servicing & deep repair across Powai Hiranandani and surrounding neighborhoods in Mumbai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 8,
    "rating": 4.7,
    "totalReviews": 60,
    "completedJobs": 60,
    "responseRate": 99,
    "trustScore": 91,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "AC Repair",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Mumbai"
    ],
    "location": {
      "city": "Mumbai",
      "address": "Powai Hiranandani, Mumbai",
      "coordinates": [
        72.8252,
        19.1285
      ]
    },
    "services": [
      {
        "name": "AC Repair Diagnostics & Standard Service",
        "slug": "ac-repair",
        "price": 549,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for ac servicing & deep repair."
      },
      {
        "name": "Comprehensive AC Repair Overhaul & Fitting",
        "slug": "ac-repair",
        "price": 1197,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Tushar More",
      "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_mum_plumber_1",
    "businessName": "Marine Lines Rapid Plumbing",
    "ownerName": "Rohan Patil",
    "category": "plumber",
    "tagline": "Verified Plumbing Specialist • Lead: Rohan Patil",
    "description": "Providing professional and guaranteed plumbing & pipe solutions across Lower Parel (High Street) and surrounding neighborhoods in Mumbai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 9,
    "rating": 4.8,
    "totalReviews": 65,
    "completedJobs": 65,
    "responseRate": 96,
    "trustScore": 92,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Plumbing",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Mumbai"
    ],
    "location": {
      "city": "Mumbai",
      "address": "Lower Parel (High Street), Mumbai",
      "coordinates": [
        72.8602,
        19.0235
      ]
    },
    "services": [
      {
        "name": "Plumbing Diagnostics & Standard Service",
        "slug": "plumber",
        "price": 349,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for plumbing & pipe solutions."
      },
      {
        "name": "Comprehensive Plumbing Overhaul & Fitting",
        "slug": "plumber",
        "price": 797,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Rohan Patil",
      "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_mum_plumber_2",
    "businessName": "Mumbai Flow HydroFix",
    "ownerName": "Swapnil Sawant",
    "category": "plumber",
    "tagline": "Verified Plumbing Specialist • Lead: Swapnil Sawant",
    "description": "Providing professional and guaranteed plumbing & pipe solutions across Juhu Tara Road and surrounding neighborhoods in Mumbai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 10,
    "rating": 4.9,
    "totalReviews": 70,
    "completedJobs": 70,
    "responseRate": 97,
    "trustScore": 93,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Plumbing",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Mumbai"
    ],
    "location": {
      "city": "Mumbai",
      "address": "Juhu Tara Road, Mumbai",
      "coordinates": [
        72.8602,
        19.0585
      ]
    },
    "services": [
      {
        "name": "Plumbing Diagnostics & Standard Service",
        "slug": "plumber",
        "price": 349,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for plumbing & pipe solutions."
      },
      {
        "name": "Comprehensive Plumbing Overhaul & Fitting",
        "slug": "plumber",
        "price": 797,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Swapnil Sawant",
      "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_mum_cleaning_1",
    "businessName": "CityLights Deep Cleaning",
    "ownerName": "Sneha More",
    "category": "cleaning",
    "tagline": "Verified Deep Cleaning Specialist • Lead: Sneha More",
    "description": "Providing professional and guaranteed full home deep cleaning across Goregaon West and surrounding neighborhoods in Mumbai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 11,
    "rating": 4.7,
    "totalReviews": 75,
    "completedJobs": 75,
    "responseRate": 98,
    "trustScore": 94,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Deep Cleaning",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Mumbai"
    ],
    "location": {
      "city": "Mumbai",
      "address": "Goregaon West, Mumbai",
      "coordinates": [
        72.8602,
        19.0935
      ]
    },
    "services": [
      {
        "name": "Deep Cleaning Diagnostics & Standard Service",
        "slug": "cleaning",
        "price": 1299,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for full home deep cleaning."
      },
      {
        "name": "Comprehensive Deep Cleaning Overhaul & Fitting",
        "slug": "cleaning",
        "price": 2697,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Sneha More",
      "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_mum_cleaning_2",
    "businessName": "SparkleBay Sanitization",
    "ownerName": "Vaishali Kadam",
    "category": "cleaning",
    "tagline": "Verified Deep Cleaning Specialist • Lead: Vaishali Kadam",
    "description": "Providing professional and guaranteed full home deep cleaning across Bandra Kurla Complex and surrounding neighborhoods in Mumbai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 12,
    "rating": 4.8,
    "totalReviews": 80,
    "completedJobs": 80,
    "responseRate": 99,
    "trustScore": 95,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Deep Cleaning",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Mumbai"
    ],
    "location": {
      "city": "Mumbai",
      "address": "Bandra Kurla Complex, Mumbai",
      "coordinates": [
        72.8602,
        19.1285
      ]
    },
    "services": [
      {
        "name": "Deep Cleaning Diagnostics & Standard Service",
        "slug": "cleaning",
        "price": 1299,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for full home deep cleaning."
      },
      {
        "name": "Comprehensive Deep Cleaning Overhaul & Fitting",
        "slug": "cleaning",
        "price": 2697,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Vaishali Kadam",
      "avatar": "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_mum_carpenter_1",
    "businessName": "Salsette Custom Woodworks",
    "ownerName": "Eknath Gawde",
    "category": "carpenter",
    "tagline": "Verified Carpentry Specialist • Lead: Eknath Gawde",
    "description": "Providing professional and guaranteed carpentry & woodwork assembly across Borivali West and surrounding neighborhoods in Mumbai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 5,
    "rating": 4.9,
    "totalReviews": 85,
    "completedJobs": 85,
    "responseRate": 96,
    "trustScore": 96,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Carpentry",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Mumbai"
    ],
    "location": {
      "city": "Mumbai",
      "address": "Borivali West, Mumbai",
      "coordinates": [
        72.8952,
        19.0235
      ]
    },
    "services": [
      {
        "name": "Carpentry Diagnostics & Standard Service",
        "slug": "carpenter",
        "price": 449,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for carpentry & woodwork assembly."
      },
      {
        "name": "Comprehensive Carpentry Overhaul & Fitting",
        "slug": "carpenter",
        "price": 997,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Eknath Gawde",
      "avatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_mum_carpenter_2",
    "businessName": "Konkan Timber Craftsmen",
    "ownerName": "Santosh Jadhav",
    "category": "carpenter",
    "tagline": "Verified Carpentry Specialist • Lead: Santosh Jadhav",
    "description": "Providing professional and guaranteed carpentry & woodwork assembly across Thane West (Ghodbunder) and surrounding neighborhoods in Mumbai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 6,
    "rating": 4.7,
    "totalReviews": 90,
    "completedJobs": 90,
    "responseRate": 97,
    "trustScore": 97,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Carpentry",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Mumbai"
    ],
    "location": {
      "city": "Mumbai",
      "address": "Thane West (Ghodbunder), Mumbai",
      "coordinates": [
        72.8952,
        19.0585
      ]
    },
    "services": [
      {
        "name": "Carpentry Diagnostics & Standard Service",
        "slug": "carpenter",
        "price": 449,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for carpentry & woodwork assembly."
      },
      {
        "name": "Comprehensive Carpentry Overhaul & Fitting",
        "slug": "carpenter",
        "price": 997,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Santosh Jadhav",
      "avatar": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_mum_painter_1",
    "businessName": "MonsoonShield Wall Paint",
    "ownerName": "Nilesh Tawde",
    "category": "painter",
    "tagline": "Verified Painting Specialist • Lead: Nilesh Tawde",
    "description": "Providing professional and guaranteed interior & exterior painting across Worli Sea Face and surrounding neighborhoods in Mumbai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 7,
    "rating": 4.8,
    "totalReviews": 95,
    "completedJobs": 95,
    "responseRate": 98,
    "trustScore": 98,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Painting",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Mumbai"
    ],
    "location": {
      "city": "Mumbai",
      "address": "Worli Sea Face, Mumbai",
      "coordinates": [
        72.8952,
        19.0935
      ]
    },
    "services": [
      {
        "name": "Painting Diagnostics & Standard Service",
        "slug": "painter",
        "price": 1499,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for interior & exterior painting."
      },
      {
        "name": "Comprehensive Painting Overhaul & Fitting",
        "slug": "painter",
        "price": 3097,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Nilesh Tawde",
      "avatar": "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_mum_painter_2",
    "businessName": "Mumbai Coastal Painters",
    "ownerName": "Prashant Salvi",
    "category": "painter",
    "tagline": "Verified Painting Specialist • Lead: Prashant Salvi",
    "description": "Providing professional and guaranteed interior & exterior painting across Malad Link Road and surrounding neighborhoods in Mumbai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 8,
    "rating": 4.9,
    "totalReviews": 100,
    "completedJobs": 100,
    "responseRate": 99,
    "trustScore": 88,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Painting",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Mumbai"
    ],
    "location": {
      "city": "Mumbai",
      "address": "Malad Link Road, Mumbai",
      "coordinates": [
        72.8952,
        19.1285
      ]
    },
    "services": [
      {
        "name": "Painting Diagnostics & Standard Service",
        "slug": "painter",
        "price": 1499,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for interior & exterior painting."
      },
      {
        "name": "Comprehensive Painting Overhaul & Fitting",
        "slug": "painter",
        "price": 3097,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Prashant Salvi",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_mum_pest-control_1",
    "businessName": "ZeroBug Organic Pest Control",
    "ownerName": "Ganesh Tambe",
    "category": "pest-control",
    "tagline": "Verified Pest Control Specialist • Lead: Ganesh Tambe",
    "description": "Providing professional and guaranteed organic pest control across Chembur Diamond Garden and surrounding neighborhoods in Mumbai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 9,
    "rating": 4.7,
    "totalReviews": 105,
    "completedJobs": 105,
    "responseRate": 96,
    "trustScore": 89,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Pest Control",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Mumbai"
    ],
    "location": {
      "city": "Mumbai",
      "address": "Chembur Diamond Garden, Mumbai",
      "coordinates": [
        72.9302,
        19.0235
      ]
    },
    "services": [
      {
        "name": "Pest Control Diagnostics & Standard Service",
        "slug": "pest-control",
        "price": 749,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for organic pest control."
      },
      {
        "name": "Comprehensive Pest Control Overhaul & Fitting",
        "slug": "pest-control",
        "price": 1597,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Ganesh Tambe",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_mum_pest-control_2",
    "businessName": "SafeHome Herbal Pest Sol",
    "ownerName": "Ravindra Kamble",
    "category": "pest-control",
    "tagline": "Verified Pest Control Specialist • Lead: Ravindra Kamble",
    "description": "Providing professional and guaranteed organic pest control across Khar West (SV Road) and surrounding neighborhoods in Mumbai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 10,
    "rating": 4.8,
    "totalReviews": 110,
    "completedJobs": 110,
    "responseRate": 97,
    "trustScore": 90,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Pest Control",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Mumbai"
    ],
    "location": {
      "city": "Mumbai",
      "address": "Khar West (SV Road), Mumbai",
      "coordinates": [
        72.9302,
        19.0585
      ]
    },
    "services": [
      {
        "name": "Pest Control Diagnostics & Standard Service",
        "slug": "pest-control",
        "price": 749,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for organic pest control."
      },
      {
        "name": "Comprehensive Pest Control Overhaul & Fitting",
        "slug": "pest-control",
        "price": 1597,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Ravindra Kamble",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_mum_smart-home_1",
    "businessName": "SmartAvenue Home Tech",
    "ownerName": "Amol Chitnis",
    "category": "smart-home",
    "tagline": "Verified Smart Home Specialist • Lead: Amol Chitnis",
    "description": "Providing professional and guaranteed smart home & cctv setup across Santacruz West and surrounding neighborhoods in Mumbai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 11,
    "rating": 4.9,
    "totalReviews": 115,
    "completedJobs": 115,
    "responseRate": 98,
    "trustScore": 91,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Smart Home",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Mumbai"
    ],
    "location": {
      "city": "Mumbai",
      "address": "Santacruz West, Mumbai",
      "coordinates": [
        72.9302,
        19.0935
      ]
    },
    "services": [
      {
        "name": "Smart Home Diagnostics & Standard Service",
        "slug": "smart-home",
        "price": 899,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for smart home & cctv setup."
      },
      {
        "name": "Comprehensive Smart Home Overhaul & Fitting",
        "slug": "smart-home",
        "price": 1897,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Amol Chitnis",
      "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_mum_smart-home_2",
    "businessName": "Island City Security & CCTV",
    "ownerName": "Dhananjay Naik",
    "category": "smart-home",
    "tagline": "Verified Smart Home Specialist • Lead: Dhananjay Naik",
    "description": "Providing professional and guaranteed smart home & cctv setup across Prabhadevi and surrounding neighborhoods in Mumbai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 12,
    "rating": 4.7,
    "totalReviews": 120,
    "completedJobs": 120,
    "responseRate": 99,
    "trustScore": 92,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Smart Home",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Mumbai"
    ],
    "location": {
      "city": "Mumbai",
      "address": "Prabhadevi, Mumbai",
      "coordinates": [
        72.9302,
        19.1285
      ]
    },
    "services": [
      {
        "name": "Smart Home Diagnostics & Standard Service",
        "slug": "smart-home",
        "price": 899,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for smart home & cctv setup."
      },
      {
        "name": "Comprehensive Smart Home Overhaul & Fitting",
        "slug": "smart-home",
        "price": 1897,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Dhananjay Naik",
      "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_hyd_electrician_1",
    "businessName": "CyberCity Electricals & IoT",
    "ownerName": "Venkat Reddy",
    "category": "electrician",
    "tagline": "Verified Electrician Specialist • Lead: Venkat Reddy",
    "description": "Providing professional and guaranteed electrical repairs & wiring across Hitec City, Madhapur and surrounding neighborhoods in Hyderabad. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 5,
    "rating": 4.7,
    "totalReviews": 45,
    "completedJobs": 45,
    "responseRate": 96,
    "trustScore": 88,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Electrician",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Hyderabad"
    ],
    "location": {
      "city": "Hyderabad",
      "address": "Hitec City, Madhapur, Hyderabad",
      "coordinates": [
        78.4342,
        17.3325
      ]
    },
    "services": [
      {
        "name": "Electrician Diagnostics & Standard Service",
        "slug": "electrician",
        "price": 299,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for electrical repairs & wiring."
      },
      {
        "name": "Comprehensive Electrician Overhaul & Fitting",
        "slug": "electrician",
        "price": 697,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Venkat Reddy",
      "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_hyd_electrician_2",
    "businessName": "Charminar Rapid Wire Works",
    "ownerName": "K. Srinivas",
    "category": "electrician",
    "tagline": "Verified Electrician Specialist • Lead: K. Srinivas",
    "description": "Providing professional and guaranteed electrical repairs & wiring across Banjara Hills Road 12 and surrounding neighborhoods in Hyderabad. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 6,
    "rating": 4.8,
    "totalReviews": 50,
    "completedJobs": 50,
    "responseRate": 97,
    "trustScore": 89,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Electrician",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Hyderabad"
    ],
    "location": {
      "city": "Hyderabad",
      "address": "Banjara Hills Road 12, Hyderabad",
      "coordinates": [
        78.4342,
        17.3675
      ]
    },
    "services": [
      {
        "name": "Electrician Diagnostics & Standard Service",
        "slug": "electrician",
        "price": 299,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for electrical repairs & wiring."
      },
      {
        "name": "Comprehensive Electrician Overhaul & Fitting",
        "slug": "electrician",
        "price": 697,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "K. Srinivas",
      "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_hyd_ac-repair_1",
    "businessName": "Deccan Chillers AC Systems",
    "ownerName": "Srinivas Rao",
    "category": "ac-repair",
    "tagline": "Verified AC Repair Specialist • Lead: Srinivas Rao",
    "description": "Providing professional and guaranteed ac servicing & deep repair across Kondapur Main Road and surrounding neighborhoods in Hyderabad. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 7,
    "rating": 4.9,
    "totalReviews": 55,
    "completedJobs": 55,
    "responseRate": 98,
    "trustScore": 90,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "AC Repair",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Hyderabad"
    ],
    "location": {
      "city": "Hyderabad",
      "address": "Kondapur Main Road, Hyderabad",
      "coordinates": [
        78.4342,
        17.4025
      ]
    },
    "services": [
      {
        "name": "AC Repair Diagnostics & Standard Service",
        "slug": "ac-repair",
        "price": 549,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for ac servicing & deep repair."
      },
      {
        "name": "Comprehensive AC Repair Overhaul & Fitting",
        "slug": "ac-repair",
        "price": 1197,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Srinivas Rao",
      "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_hyd_ac-repair_2",
    "businessName": "Telangana Cool Breeze",
    "ownerName": "M. Anjaneyulu",
    "category": "ac-repair",
    "tagline": "Verified AC Repair Specialist • Lead: M. Anjaneyulu",
    "description": "Providing professional and guaranteed ac servicing & deep repair across Gachibowli Financial Dist and surrounding neighborhoods in Hyderabad. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 8,
    "rating": 4.7,
    "totalReviews": 60,
    "completedJobs": 60,
    "responseRate": 99,
    "trustScore": 91,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "AC Repair",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Hyderabad"
    ],
    "location": {
      "city": "Hyderabad",
      "address": "Gachibowli Financial Dist, Hyderabad",
      "coordinates": [
        78.4342,
        17.4375
      ]
    },
    "services": [
      {
        "name": "AC Repair Diagnostics & Standard Service",
        "slug": "ac-repair",
        "price": 549,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for ac servicing & deep repair."
      },
      {
        "name": "Comprehensive AC Repair Overhaul & Fitting",
        "slug": "ac-repair",
        "price": 1197,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "M. Anjaneyulu",
      "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_hyd_plumber_1",
    "businessName": "Nizam Hydro & Sanitary",
    "ownerName": "Praveen Kumar",
    "category": "plumber",
    "tagline": "Verified Plumbing Specialist • Lead: Praveen Kumar",
    "description": "Providing professional and guaranteed plumbing & pipe solutions across Jubilee Hills Road 36 and surrounding neighborhoods in Hyderabad. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 9,
    "rating": 4.8,
    "totalReviews": 65,
    "completedJobs": 65,
    "responseRate": 96,
    "trustScore": 92,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Plumbing",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Hyderabad"
    ],
    "location": {
      "city": "Hyderabad",
      "address": "Jubilee Hills Road 36, Hyderabad",
      "coordinates": [
        78.4692,
        17.3325
      ]
    },
    "services": [
      {
        "name": "Plumbing Diagnostics & Standard Service",
        "slug": "plumber",
        "price": 349,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for plumbing & pipe solutions."
      },
      {
        "name": "Comprehensive Plumbing Overhaul & Fitting",
        "slug": "plumber",
        "price": 797,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Praveen Kumar",
      "avatar": "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_hyd_plumber_2",
    "businessName": "CyberPlumb Emergency Fix",
    "ownerName": "V. Ravinder",
    "category": "plumber",
    "tagline": "Verified Plumbing Specialist • Lead: V. Ravinder",
    "description": "Providing professional and guaranteed plumbing & pipe solutions across Madhapur Near Cyber Towers and surrounding neighborhoods in Hyderabad. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 10,
    "rating": 4.9,
    "totalReviews": 70,
    "completedJobs": 70,
    "responseRate": 97,
    "trustScore": 93,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Plumbing",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Hyderabad"
    ],
    "location": {
      "city": "Hyderabad",
      "address": "Madhapur Near Cyber Towers, Hyderabad",
      "coordinates": [
        78.4692,
        17.3675
      ]
    },
    "services": [
      {
        "name": "Plumbing Diagnostics & Standard Service",
        "slug": "plumber",
        "price": 349,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for plumbing & pipe solutions."
      },
      {
        "name": "Comprehensive Plumbing Overhaul & Fitting",
        "slug": "plumber",
        "price": 797,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "V. Ravinder",
      "avatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_hyd_cleaning_1",
    "businessName": "CleanSphere Hyderabad",
    "ownerName": "Swathi Reddy",
    "category": "cleaning",
    "tagline": "Verified Deep Cleaning Specialist • Lead: Swathi Reddy",
    "description": "Providing professional and guaranteed full home deep cleaning across Kukatpally Housing Board and surrounding neighborhoods in Hyderabad. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 11,
    "rating": 4.7,
    "totalReviews": 75,
    "completedJobs": 75,
    "responseRate": 98,
    "trustScore": 94,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Deep Cleaning",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Hyderabad"
    ],
    "location": {
      "city": "Hyderabad",
      "address": "Kukatpally Housing Board, Hyderabad",
      "coordinates": [
        78.4692,
        17.4025
      ]
    },
    "services": [
      {
        "name": "Deep Cleaning Diagnostics & Standard Service",
        "slug": "cleaning",
        "price": 1299,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for full home deep cleaning."
      },
      {
        "name": "Comprehensive Deep Cleaning Overhaul & Fitting",
        "slug": "cleaning",
        "price": 2697,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Swathi Reddy",
      "avatar": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_hyd_cleaning_2",
    "businessName": "Deccan Shine Deep Cleaning",
    "ownerName": "Lalitha Devi",
    "category": "cleaning",
    "tagline": "Verified Deep Cleaning Specialist • Lead: Lalitha Devi",
    "description": "Providing professional and guaranteed full home deep cleaning across Begumpet Airport Rd and surrounding neighborhoods in Hyderabad. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 12,
    "rating": 4.8,
    "totalReviews": 80,
    "completedJobs": 80,
    "responseRate": 99,
    "trustScore": 95,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Deep Cleaning",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Hyderabad"
    ],
    "location": {
      "city": "Hyderabad",
      "address": "Begumpet Airport Rd, Hyderabad",
      "coordinates": [
        78.4692,
        17.4375
      ]
    },
    "services": [
      {
        "name": "Deep Cleaning Diagnostics & Standard Service",
        "slug": "cleaning",
        "price": 1299,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for full home deep cleaning."
      },
      {
        "name": "Comprehensive Deep Cleaning Overhaul & Fitting",
        "slug": "cleaning",
        "price": 2697,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Lalitha Devi",
      "avatar": "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_hyd_carpenter_1",
    "businessName": "Royal Wood Art Carpentry",
    "ownerName": "Mohan Chary",
    "category": "carpenter",
    "tagline": "Verified Carpentry Specialist • Lead: Mohan Chary",
    "description": "Providing professional and guaranteed carpentry & woodwork assembly across Ameerpet Metro and surrounding neighborhoods in Hyderabad. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 5,
    "rating": 4.9,
    "totalReviews": 85,
    "completedJobs": 85,
    "responseRate": 96,
    "trustScore": 96,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Carpentry",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Hyderabad"
    ],
    "location": {
      "city": "Hyderabad",
      "address": "Ameerpet Metro, Hyderabad",
      "coordinates": [
        78.5042,
        17.3325
      ]
    },
    "services": [
      {
        "name": "Carpentry Diagnostics & Standard Service",
        "slug": "carpenter",
        "price": 449,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for carpentry & woodwork assembly."
      },
      {
        "name": "Comprehensive Carpentry Overhaul & Fitting",
        "slug": "carpenter",
        "price": 997,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Mohan Chary",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_hyd_carpenter_2",
    "businessName": "Heritage Telugu Timberworks",
    "ownerName": "B. Ramachander",
    "category": "carpenter",
    "tagline": "Verified Carpentry Specialist • Lead: B. Ramachander",
    "description": "Providing professional and guaranteed carpentry & woodwork assembly across Secunderabad Marredpally and surrounding neighborhoods in Hyderabad. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 6,
    "rating": 4.7,
    "totalReviews": 90,
    "completedJobs": 90,
    "responseRate": 97,
    "trustScore": 97,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Carpentry",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Hyderabad"
    ],
    "location": {
      "city": "Hyderabad",
      "address": "Secunderabad Marredpally, Hyderabad",
      "coordinates": [
        78.5042,
        17.3675
      ]
    },
    "services": [
      {
        "name": "Carpentry Diagnostics & Standard Service",
        "slug": "carpenter",
        "price": 449,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for carpentry & woodwork assembly."
      },
      {
        "name": "Comprehensive Carpentry Overhaul & Fitting",
        "slug": "carpenter",
        "price": 997,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "B. Ramachander",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_hyd_painter_1",
    "businessName": "Golconda Color House Painters",
    "ownerName": "K. Suresh",
    "category": "painter",
    "tagline": "Verified Painting Specialist • Lead: K. Suresh",
    "description": "Providing professional and guaranteed interior & exterior painting across Manikonda Outer Ring and surrounding neighborhoods in Hyderabad. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 7,
    "rating": 4.8,
    "totalReviews": 95,
    "completedJobs": 95,
    "responseRate": 98,
    "trustScore": 98,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Painting",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Hyderabad"
    ],
    "location": {
      "city": "Hyderabad",
      "address": "Manikonda Outer Ring, Hyderabad",
      "coordinates": [
        78.5042,
        17.4025
      ]
    },
    "services": [
      {
        "name": "Painting Diagnostics & Standard Service",
        "slug": "painter",
        "price": 1499,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for interior & exterior painting."
      },
      {
        "name": "Comprehensive Painting Overhaul & Fitting",
        "slug": "painter",
        "price": 3097,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "K. Suresh",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_hyd_painter_2",
    "businessName": "CyberShield Wall Coating",
    "ownerName": "Ch. Venkatesh",
    "category": "painter",
    "tagline": "Verified Painting Specialist • Lead: Ch. Venkatesh",
    "description": "Providing professional and guaranteed interior & exterior painting across Miyapur Main Road and surrounding neighborhoods in Hyderabad. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 8,
    "rating": 4.9,
    "totalReviews": 100,
    "completedJobs": 100,
    "responseRate": 99,
    "trustScore": 88,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Painting",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Hyderabad"
    ],
    "location": {
      "city": "Hyderabad",
      "address": "Miyapur Main Road, Hyderabad",
      "coordinates": [
        78.5042,
        17.4375
      ]
    },
    "services": [
      {
        "name": "Painting Diagnostics & Standard Service",
        "slug": "painter",
        "price": 1499,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for interior & exterior painting."
      },
      {
        "name": "Comprehensive Painting Overhaul & Fitting",
        "slug": "painter",
        "price": 3097,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Ch. Venkatesh",
      "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_hyd_pest-control_1",
    "businessName": "EcoKill Safe Pest Defense",
    "ownerName": "Y. Prasad",
    "category": "pest-control",
    "tagline": "Verified Pest Control Specialist • Lead: Y. Prasad",
    "description": "Providing professional and guaranteed organic pest control across Dilsukhnagar and surrounding neighborhoods in Hyderabad. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 9,
    "rating": 4.7,
    "totalReviews": 105,
    "completedJobs": 105,
    "responseRate": 96,
    "trustScore": 89,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Pest Control",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Hyderabad"
    ],
    "location": {
      "city": "Hyderabad",
      "address": "Dilsukhnagar, Hyderabad",
      "coordinates": [
        78.5392,
        17.3325
      ]
    },
    "services": [
      {
        "name": "Pest Control Diagnostics & Standard Service",
        "slug": "pest-control",
        "price": 749,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for organic pest control."
      },
      {
        "name": "Comprehensive Pest Control Overhaul & Fitting",
        "slug": "pest-control",
        "price": 1597,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Y. Prasad",
      "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_hyd_pest-control_2",
    "businessName": "BioGuard Hyderabad Solutions",
    "ownerName": "N. Chandrasekhar",
    "category": "pest-control",
    "tagline": "Verified Pest Control Specialist • Lead: N. Chandrasekhar",
    "description": "Providing professional and guaranteed organic pest control across Attapur Ring Road and surrounding neighborhoods in Hyderabad. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 10,
    "rating": 4.8,
    "totalReviews": 110,
    "completedJobs": 110,
    "responseRate": 97,
    "trustScore": 90,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Pest Control",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Hyderabad"
    ],
    "location": {
      "city": "Hyderabad",
      "address": "Attapur Ring Road, Hyderabad",
      "coordinates": [
        78.5392,
        17.3675
      ]
    },
    "services": [
      {
        "name": "Pest Control Diagnostics & Standard Service",
        "slug": "pest-control",
        "price": 749,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for organic pest control."
      },
      {
        "name": "Comprehensive Pest Control Overhaul & Fitting",
        "slug": "pest-control",
        "price": 1597,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "N. Chandrasekhar",
      "avatar": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_hyd_smart-home_1",
    "businessName": "NextGen SmartHome Automation",
    "ownerName": "Sai Teja",
    "category": "smart-home",
    "tagline": "Verified Smart Home Specialist • Lead: Sai Teja",
    "description": "Providing professional and guaranteed smart home & cctv setup across Gachibowli Telecom Nagar and surrounding neighborhoods in Hyderabad. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 11,
    "rating": 4.9,
    "totalReviews": 115,
    "completedJobs": 115,
    "responseRate": 98,
    "trustScore": 91,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Smart Home",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Hyderabad"
    ],
    "location": {
      "city": "Hyderabad",
      "address": "Gachibowli Telecom Nagar, Hyderabad",
      "coordinates": [
        78.5392,
        17.4025
      ]
    },
    "services": [
      {
        "name": "Smart Home Diagnostics & Standard Service",
        "slug": "smart-home",
        "price": 899,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for smart home & cctv setup."
      },
      {
        "name": "Comprehensive Smart Home Overhaul & Fitting",
        "slug": "smart-home",
        "price": 1897,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Sai Teja",
      "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_hyd_smart-home_2",
    "businessName": "Deccan Security Surveillance",
    "ownerName": "R. Srikanth",
    "category": "smart-home",
    "tagline": "Verified Smart Home Specialist • Lead: R. Srikanth",
    "description": "Providing professional and guaranteed smart home & cctv setup across Banjara Hills Road 2 and surrounding neighborhoods in Hyderabad. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 12,
    "rating": 4.7,
    "totalReviews": 120,
    "completedJobs": 120,
    "responseRate": 99,
    "trustScore": 92,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Smart Home",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Hyderabad"
    ],
    "location": {
      "city": "Hyderabad",
      "address": "Banjara Hills Road 2, Hyderabad",
      "coordinates": [
        78.5392,
        17.4375
      ]
    },
    "services": [
      {
        "name": "Smart Home Diagnostics & Standard Service",
        "slug": "smart-home",
        "price": 899,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for smart home & cctv setup."
      },
      {
        "name": "Comprehensive Smart Home Overhaul & Fitting",
        "slug": "smart-home",
        "price": 1897,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "R. Srikanth",
      "avatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_chn_electrician_1",
    "businessName": "Coromandel Electricals",
    "ownerName": "R. Balaji",
    "category": "electrician",
    "tagline": "Verified Electrician Specialist • Lead: R. Balaji",
    "description": "Providing professional and guaranteed electrical repairs & wiring across T. Nagar (Pondy Bazaar) and surrounding neighborhoods in Chennai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 5,
    "rating": 4.7,
    "totalReviews": 45,
    "completedJobs": 45,
    "responseRate": 96,
    "trustScore": 88,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Electrician",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Chennai"
    ],
    "location": {
      "city": "Chennai",
      "address": "T. Nagar (Pondy Bazaar), Chennai",
      "coordinates": [
        80.2182,
        13.0302
      ]
    },
    "services": [
      {
        "name": "Electrician Diagnostics & Standard Service",
        "slug": "electrician",
        "price": 299,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for electrical repairs & wiring."
      },
      {
        "name": "Comprehensive Electrician Overhaul & Fitting",
        "slug": "electrician",
        "price": 697,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "R. Balaji",
      "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_chn_electrician_2",
    "businessName": "Chennai Spark Systems",
    "ownerName": "S. Murugan",
    "category": "electrician",
    "tagline": "Verified Electrician Specialist • Lead: S. Murugan",
    "description": "Providing professional and guaranteed electrical repairs & wiring across Anna Nagar 2nd Avenue and surrounding neighborhoods in Chennai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 6,
    "rating": 4.8,
    "totalReviews": 50,
    "completedJobs": 50,
    "responseRate": 97,
    "trustScore": 89,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Electrician",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Chennai"
    ],
    "location": {
      "city": "Chennai",
      "address": "Anna Nagar 2nd Avenue, Chennai",
      "coordinates": [
        80.2182,
        13.0652
      ]
    },
    "services": [
      {
        "name": "Electrician Diagnostics & Standard Service",
        "slug": "electrician",
        "price": 299,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for electrical repairs & wiring."
      },
      {
        "name": "Comprehensive Electrician Overhaul & Fitting",
        "slug": "electrician",
        "price": 697,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "S. Murugan",
      "avatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_chn_ac-repair_1",
    "businessName": "Marina Cool Air Conditioners",
    "ownerName": "Sundaramurthy",
    "category": "ac-repair",
    "tagline": "Verified AC Repair Specialist • Lead: Sundaramurthy",
    "description": "Providing professional and guaranteed ac servicing & deep repair across Adyar Lattice Bridge Rd and surrounding neighborhoods in Chennai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 7,
    "rating": 4.9,
    "totalReviews": 55,
    "completedJobs": 55,
    "responseRate": 98,
    "trustScore": 90,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "AC Repair",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Chennai"
    ],
    "location": {
      "city": "Chennai",
      "address": "Adyar Lattice Bridge Rd, Chennai",
      "coordinates": [
        80.2182,
        13.1002
      ]
    },
    "services": [
      {
        "name": "AC Repair Diagnostics & Standard Service",
        "slug": "ac-repair",
        "price": 549,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for ac servicing & deep repair."
      },
      {
        "name": "Comprehensive AC Repair Overhaul & Fitting",
        "slug": "ac-repair",
        "price": 1197,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Sundaramurthy",
      "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_chn_ac-repair_2",
    "businessName": "Bay Chillers AC Express",
    "ownerName": "P. Saravanan",
    "category": "ac-repair",
    "tagline": "Verified AC Repair Specialist • Lead: P. Saravanan",
    "description": "Providing professional and guaranteed ac servicing & deep repair across Velachery Main Road and surrounding neighborhoods in Chennai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 8,
    "rating": 4.7,
    "totalReviews": 60,
    "completedJobs": 60,
    "responseRate": 99,
    "trustScore": 91,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "AC Repair",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Chennai"
    ],
    "location": {
      "city": "Chennai",
      "address": "Velachery Main Road, Chennai",
      "coordinates": [
        80.2182,
        13.1352
      ]
    },
    "services": [
      {
        "name": "AC Repair Diagnostics & Standard Service",
        "slug": "ac-repair",
        "price": 549,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for ac servicing & deep repair."
      },
      {
        "name": "Comprehensive AC Repair Overhaul & Fitting",
        "slug": "ac-repair",
        "price": 1197,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "P. Saravanan",
      "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_chn_plumber_1",
    "businessName": "Kavery River Plumbers",
    "ownerName": "Vignesh Natarajan",
    "category": "plumber",
    "tagline": "Verified Plumbing Specialist • Lead: Vignesh Natarajan",
    "description": "Providing professional and guaranteed plumbing & pipe solutions across Mylapore Tank Area and surrounding neighborhoods in Chennai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 9,
    "rating": 4.8,
    "totalReviews": 65,
    "completedJobs": 65,
    "responseRate": 96,
    "trustScore": 92,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Plumbing",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Chennai"
    ],
    "location": {
      "city": "Chennai",
      "address": "Mylapore Tank Area, Chennai",
      "coordinates": [
        80.2532,
        13.0302
      ]
    },
    "services": [
      {
        "name": "Plumbing Diagnostics & Standard Service",
        "slug": "plumber",
        "price": 349,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for plumbing & pipe solutions."
      },
      {
        "name": "Comprehensive Plumbing Overhaul & Fitting",
        "slug": "plumber",
        "price": 797,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Vignesh Natarajan",
      "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_chn_plumber_2",
    "businessName": "Madras Flow Plumbing",
    "ownerName": "G. Karthikeyan",
    "category": "plumber",
    "tagline": "Verified Plumbing Specialist • Lead: G. Karthikeyan",
    "description": "Providing professional and guaranteed plumbing & pipe solutions across OMR Thoraipakkam and surrounding neighborhoods in Chennai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 10,
    "rating": 4.9,
    "totalReviews": 70,
    "completedJobs": 70,
    "responseRate": 97,
    "trustScore": 93,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Plumbing",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Chennai"
    ],
    "location": {
      "city": "Chennai",
      "address": "OMR Thoraipakkam, Chennai",
      "coordinates": [
        80.2532,
        13.0652
      ]
    },
    "services": [
      {
        "name": "Plumbing Diagnostics & Standard Service",
        "slug": "plumber",
        "price": 349,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for plumbing & pipe solutions."
      },
      {
        "name": "Comprehensive Plumbing Overhaul & Fitting",
        "slug": "plumber",
        "price": 797,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "G. Karthikeyan",
      "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_chn_cleaning_1",
    "businessName": "PureMarina Home Cleaners",
    "ownerName": "K. Meenakshi",
    "category": "cleaning",
    "tagline": "Verified Deep Cleaning Specialist • Lead: K. Meenakshi",
    "description": "Providing professional and guaranteed full home deep cleaning across Besant Nagar Beach Rd and surrounding neighborhoods in Chennai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 11,
    "rating": 4.7,
    "totalReviews": 75,
    "completedJobs": 75,
    "responseRate": 98,
    "trustScore": 94,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Deep Cleaning",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Chennai"
    ],
    "location": {
      "city": "Chennai",
      "address": "Besant Nagar Beach Rd, Chennai",
      "coordinates": [
        80.2532,
        13.1002
      ]
    },
    "services": [
      {
        "name": "Deep Cleaning Diagnostics & Standard Service",
        "slug": "cleaning",
        "price": 1299,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for full home deep cleaning."
      },
      {
        "name": "Comprehensive Deep Cleaning Overhaul & Fitting",
        "slug": "cleaning",
        "price": 2697,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "K. Meenakshi",
      "avatar": "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_chn_cleaning_2",
    "businessName": "South Indian Deep Sanitization",
    "ownerName": "S. Lakshmi",
    "category": "cleaning",
    "tagline": "Verified Deep Cleaning Specialist • Lead: S. Lakshmi",
    "description": "Providing professional and guaranteed full home deep cleaning across Nungambakkam High Rd and surrounding neighborhoods in Chennai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 12,
    "rating": 4.8,
    "totalReviews": 80,
    "completedJobs": 80,
    "responseRate": 99,
    "trustScore": 95,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Deep Cleaning",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Chennai"
    ],
    "location": {
      "city": "Chennai",
      "address": "Nungambakkam High Rd, Chennai",
      "coordinates": [
        80.2532,
        13.1352
      ]
    },
    "services": [
      {
        "name": "Deep Cleaning Diagnostics & Standard Service",
        "slug": "cleaning",
        "price": 1299,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for full home deep cleaning."
      },
      {
        "name": "Comprehensive Deep Cleaning Overhaul & Fitting",
        "slug": "cleaning",
        "price": 2697,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "S. Lakshmi",
      "avatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_chn_carpenter_1",
    "businessName": "Chola Woodcraft Carpentry",
    "ownerName": "A. Selvam",
    "category": "carpenter",
    "tagline": "Verified Carpentry Specialist • Lead: A. Selvam",
    "description": "Providing professional and guaranteed carpentry & woodwork assembly across Porur Junction and surrounding neighborhoods in Chennai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 5,
    "rating": 4.9,
    "totalReviews": 85,
    "completedJobs": 85,
    "responseRate": 96,
    "trustScore": 96,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Carpentry",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Chennai"
    ],
    "location": {
      "city": "Chennai",
      "address": "Porur Junction, Chennai",
      "coordinates": [
        80.2882,
        13.0302
      ]
    },
    "services": [
      {
        "name": "Carpentry Diagnostics & Standard Service",
        "slug": "carpenter",
        "price": 449,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for carpentry & woodwork assembly."
      },
      {
        "name": "Comprehensive Carpentry Overhaul & Fitting",
        "slug": "carpenter",
        "price": 997,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "A. Selvam",
      "avatar": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_chn_carpenter_2",
    "businessName": "Tamil Nadu Furniture Works",
    "ownerName": "M. Senthil",
    "category": "carpenter",
    "tagline": "Verified Carpentry Specialist • Lead: M. Senthil",
    "description": "Providing professional and guaranteed carpentry & woodwork assembly across Guindy Industrial Estate and surrounding neighborhoods in Chennai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 6,
    "rating": 4.7,
    "totalReviews": 90,
    "completedJobs": 90,
    "responseRate": 97,
    "trustScore": 97,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Carpentry",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Chennai"
    ],
    "location": {
      "city": "Chennai",
      "address": "Guindy Industrial Estate, Chennai",
      "coordinates": [
        80.2882,
        13.0652
      ]
    },
    "services": [
      {
        "name": "Carpentry Diagnostics & Standard Service",
        "slug": "carpenter",
        "price": 449,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for carpentry & woodwork assembly."
      },
      {
        "name": "Comprehensive Carpentry Overhaul & Fitting",
        "slug": "carpenter",
        "price": 997,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "M. Senthil",
      "avatar": "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_chn_painter_1",
    "businessName": "Coromandel Colors House Paint",
    "ownerName": "D. Rajendran",
    "category": "painter",
    "tagline": "Verified Painting Specialist • Lead: D. Rajendran",
    "description": "Providing professional and guaranteed interior & exterior painting across Kilpauk Garden and surrounding neighborhoods in Chennai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 7,
    "rating": 4.8,
    "totalReviews": 95,
    "completedJobs": 95,
    "responseRate": 98,
    "trustScore": 98,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Painting",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Chennai"
    ],
    "location": {
      "city": "Chennai",
      "address": "Kilpauk Garden, Chennai",
      "coordinates": [
        80.2882,
        13.1002
      ]
    },
    "services": [
      {
        "name": "Painting Diagnostics & Standard Service",
        "slug": "painter",
        "price": 1499,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for interior & exterior painting."
      },
      {
        "name": "Comprehensive Painting Overhaul & Fitting",
        "slug": "painter",
        "price": 3097,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "D. Rajendran",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_chn_painter_2",
    "businessName": "Coastal Shield Waterproofing",
    "ownerName": "V. Anand",
    "category": "painter",
    "tagline": "Verified Painting Specialist • Lead: V. Anand",
    "description": "Providing professional and guaranteed interior & exterior painting across Tambaram Sanatorium and surrounding neighborhoods in Chennai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 8,
    "rating": 4.9,
    "totalReviews": 100,
    "completedJobs": 100,
    "responseRate": 99,
    "trustScore": 88,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Painting",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Chennai"
    ],
    "location": {
      "city": "Chennai",
      "address": "Tambaram Sanatorium, Chennai",
      "coordinates": [
        80.2882,
        13.1352
      ]
    },
    "services": [
      {
        "name": "Painting Diagnostics & Standard Service",
        "slug": "painter",
        "price": 1499,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for interior & exterior painting."
      },
      {
        "name": "Comprehensive Painting Overhaul & Fitting",
        "slug": "painter",
        "price": 3097,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "V. Anand",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_chn_pest-control_1",
    "businessName": "HerbalSafe Pest Control",
    "ownerName": "T. Sridhar",
    "category": "pest-control",
    "tagline": "Verified Pest Control Specialist • Lead: T. Sridhar",
    "description": "Providing professional and guaranteed organic pest control across Kodambakkam and surrounding neighborhoods in Chennai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 9,
    "rating": 4.7,
    "totalReviews": 105,
    "completedJobs": 105,
    "responseRate": 96,
    "trustScore": 89,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Pest Control",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Chennai"
    ],
    "location": {
      "city": "Chennai",
      "address": "Kodambakkam, Chennai",
      "coordinates": [
        80.3232,
        13.0302
      ]
    },
    "services": [
      {
        "name": "Pest Control Diagnostics & Standard Service",
        "slug": "pest-control",
        "price": 749,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for organic pest control."
      },
      {
        "name": "Comprehensive Pest Control Overhaul & Fitting",
        "slug": "pest-control",
        "price": 1597,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "T. Sridhar",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_chn_pest-control_2",
    "businessName": "EcoTermite Chennai Defense",
    "ownerName": "K. Jayakumar",
    "category": "pest-control",
    "tagline": "Verified Pest Control Specialist • Lead: K. Jayakumar",
    "description": "Providing professional and guaranteed organic pest control across Alwarpet TTK Road and surrounding neighborhoods in Chennai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 10,
    "rating": 4.8,
    "totalReviews": 110,
    "completedJobs": 110,
    "responseRate": 97,
    "trustScore": 90,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Pest Control",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Chennai"
    ],
    "location": {
      "city": "Chennai",
      "address": "Alwarpet TTK Road, Chennai",
      "coordinates": [
        80.3232,
        13.0652
      ]
    },
    "services": [
      {
        "name": "Pest Control Diagnostics & Standard Service",
        "slug": "pest-control",
        "price": 749,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for organic pest control."
      },
      {
        "name": "Comprehensive Pest Control Overhaul & Fitting",
        "slug": "pest-control",
        "price": 1597,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "K. Jayakumar",
      "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_chn_smart-home_1",
    "businessName": "SmartMarina CCTV & IoT",
    "ownerName": "Karthik Sundar",
    "category": "smart-home",
    "tagline": "Verified Smart Home Specialist • Lead: Karthik Sundar",
    "description": "Providing professional and guaranteed smart home & cctv setup across OMR Sholinganallur and surrounding neighborhoods in Chennai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 11,
    "rating": 4.9,
    "totalReviews": 115,
    "completedJobs": 115,
    "responseRate": 98,
    "trustScore": 91,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Smart Home",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Chennai"
    ],
    "location": {
      "city": "Chennai",
      "address": "OMR Sholinganallur, Chennai",
      "coordinates": [
        80.3232,
        13.1002
      ]
    },
    "services": [
      {
        "name": "Smart Home Diagnostics & Standard Service",
        "slug": "smart-home",
        "price": 899,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for smart home & cctv setup."
      },
      {
        "name": "Comprehensive Smart Home Overhaul & Fitting",
        "slug": "smart-home",
        "price": 1897,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Karthik Sundar",
      "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_chn_smart-home_2",
    "businessName": "Tamil Security Surveillance",
    "ownerName": "N. Vijay",
    "category": "smart-home",
    "tagline": "Verified Smart Home Specialist • Lead: N. Vijay",
    "description": "Providing professional and guaranteed smart home & cctv setup across Ashok Nagar 11th Ave and surrounding neighborhoods in Chennai. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 12,
    "rating": 4.7,
    "totalReviews": 120,
    "completedJobs": 120,
    "responseRate": 99,
    "trustScore": 92,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Smart Home",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Chennai"
    ],
    "location": {
      "city": "Chennai",
      "address": "Ashok Nagar 11th Ave, Chennai",
      "coordinates": [
        80.3232,
        13.1352
      ]
    },
    "services": [
      {
        "name": "Smart Home Diagnostics & Standard Service",
        "slug": "smart-home",
        "price": 899,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for smart home & cctv setup."
      },
      {
        "name": "Comprehensive Smart Home Overhaul & Fitting",
        "slug": "smart-home",
        "price": 1897,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "N. Vijay",
      "avatar": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_pun_electrician_1",
    "businessName": "Deccan Heritage Electricals",
    "ownerName": "Ganesh Joshi",
    "category": "electrician",
    "tagline": "Verified Electrician Specialist • Lead: Ganesh Joshi",
    "description": "Providing professional and guaranteed electrical repairs & wiring across Kothrud (Paud Road) and surrounding neighborhoods in Pune. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 5,
    "rating": 4.7,
    "totalReviews": 45,
    "completedJobs": 45,
    "responseRate": 96,
    "trustScore": 88,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Electrician",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Pune"
    ],
    "location": {
      "city": "Pune",
      "address": "Kothrud (Paud Road), Pune",
      "coordinates": [
        73.8042,
        18.4679
      ]
    },
    "services": [
      {
        "name": "Electrician Diagnostics & Standard Service",
        "slug": "electrician",
        "price": 299,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for electrical repairs & wiring."
      },
      {
        "name": "Comprehensive Electrician Overhaul & Fitting",
        "slug": "electrician",
        "price": 697,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Ganesh Joshi",
      "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_pun_electrician_2",
    "businessName": "Sahyadri Quick Power Wire",
    "ownerName": "Omkar Deshpande",
    "category": "electrician",
    "tagline": "Verified Electrician Specialist • Lead: Omkar Deshpande",
    "description": "Providing professional and guaranteed electrical repairs & wiring across Baner Road and surrounding neighborhoods in Pune. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 6,
    "rating": 4.8,
    "totalReviews": 50,
    "completedJobs": 50,
    "responseRate": 97,
    "trustScore": 89,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Electrician",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Pune"
    ],
    "location": {
      "city": "Pune",
      "address": "Baner Road, Pune",
      "coordinates": [
        73.8042,
        18.5029
      ]
    },
    "services": [
      {
        "name": "Electrician Diagnostics & Standard Service",
        "slug": "electrician",
        "price": 299,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for electrical repairs & wiring."
      },
      {
        "name": "Comprehensive Electrician Overhaul & Fitting",
        "slug": "electrician",
        "price": 697,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Omkar Deshpande",
      "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_pun_ac-repair_1",
    "businessName": "Sinhagad Cool Air Systems",
    "ownerName": "Sagar Gaikwad",
    "category": "ac-repair",
    "tagline": "Verified AC Repair Specialist • Lead: Sagar Gaikwad",
    "description": "Providing professional and guaranteed ac servicing & deep repair across Hinjewadi Phase 1 and surrounding neighborhoods in Pune. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 7,
    "rating": 4.9,
    "totalReviews": 55,
    "completedJobs": 55,
    "responseRate": 98,
    "trustScore": 90,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "AC Repair",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Pune"
    ],
    "location": {
      "city": "Pune",
      "address": "Hinjewadi Phase 1, Pune",
      "coordinates": [
        73.8042,
        18.5379
      ]
    },
    "services": [
      {
        "name": "AC Repair Diagnostics & Standard Service",
        "slug": "ac-repair",
        "price": 549,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for ac servicing & deep repair."
      },
      {
        "name": "Comprehensive AC Repair Overhaul & Fitting",
        "slug": "ac-repair",
        "price": 1197,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Sagar Gaikwad",
      "avatar": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_pun_ac-repair_2",
    "businessName": "Western AC Care & Jet Wash",
    "ownerName": "Swapnil Patil",
    "category": "ac-repair",
    "tagline": "Verified AC Repair Specialist • Lead: Swapnil Patil",
    "description": "Providing professional and guaranteed ac servicing & deep repair across Viman Nagar Near Airport and surrounding neighborhoods in Pune. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 8,
    "rating": 4.7,
    "totalReviews": 60,
    "completedJobs": 60,
    "responseRate": 99,
    "trustScore": 91,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "AC Repair",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Pune"
    ],
    "location": {
      "city": "Pune",
      "address": "Viman Nagar Near Airport, Pune",
      "coordinates": [
        73.8042,
        18.5729
      ]
    },
    "services": [
      {
        "name": "AC Repair Diagnostics & Standard Service",
        "slug": "ac-repair",
        "price": 549,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for ac servicing & deep repair."
      },
      {
        "name": "Comprehensive AC Repair Overhaul & Fitting",
        "slug": "ac-repair",
        "price": 1197,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Swapnil Patil",
      "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_pun_plumber_1",
    "businessName": "Western Ghats Plumbing Tech",
    "ownerName": "Pratik Kulkarni",
    "category": "plumber",
    "tagline": "Verified Plumbing Specialist • Lead: Pratik Kulkarni",
    "description": "Providing professional and guaranteed plumbing & pipe solutions across Aundh DP Road and surrounding neighborhoods in Pune. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 9,
    "rating": 4.8,
    "totalReviews": 65,
    "completedJobs": 65,
    "responseRate": 96,
    "trustScore": 92,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Plumbing",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Pune"
    ],
    "location": {
      "city": "Pune",
      "address": "Aundh DP Road, Pune",
      "coordinates": [
        73.8392,
        18.4679
      ]
    },
    "services": [
      {
        "name": "Plumbing Diagnostics & Standard Service",
        "slug": "plumber",
        "price": 349,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for plumbing & pipe solutions."
      },
      {
        "name": "Comprehensive Plumbing Overhaul & Fitting",
        "slug": "plumber",
        "price": 797,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Pratik Kulkarni",
      "avatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_pun_plumber_2",
    "businessName": "Mutha River Hydro Drainage",
    "ownerName": "Ajit Shinde",
    "category": "plumber",
    "tagline": "Verified Plumbing Specialist • Lead: Ajit Shinde",
    "description": "Providing professional and guaranteed plumbing & pipe solutions across Wakad Datta Mandir Rd and surrounding neighborhoods in Pune. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 10,
    "rating": 4.9,
    "totalReviews": 70,
    "completedJobs": 70,
    "responseRate": 97,
    "trustScore": 93,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Plumbing",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Pune"
    ],
    "location": {
      "city": "Pune",
      "address": "Wakad Datta Mandir Rd, Pune",
      "coordinates": [
        73.8392,
        18.5029
      ]
    },
    "services": [
      {
        "name": "Plumbing Diagnostics & Standard Service",
        "slug": "plumber",
        "price": 349,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for plumbing & pipe solutions."
      },
      {
        "name": "Comprehensive Plumbing Overhaul & Fitting",
        "slug": "plumber",
        "price": 797,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Ajit Shinde",
      "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_pun_cleaning_1",
    "businessName": "Peshwa Sparkle Home Cleaners",
    "ownerName": "Anuradha Joshi",
    "category": "cleaning",
    "tagline": "Verified Deep Cleaning Specialist • Lead: Anuradha Joshi",
    "description": "Providing professional and guaranteed full home deep cleaning across Kalyani Nagar and surrounding neighborhoods in Pune. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 11,
    "rating": 4.7,
    "totalReviews": 75,
    "completedJobs": 75,
    "responseRate": 98,
    "trustScore": 94,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Deep Cleaning",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Pune"
    ],
    "location": {
      "city": "Pune",
      "address": "Kalyani Nagar, Pune",
      "coordinates": [
        73.8392,
        18.5379
      ]
    },
    "services": [
      {
        "name": "Deep Cleaning Diagnostics & Standard Service",
        "slug": "cleaning",
        "price": 1299,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for full home deep cleaning."
      },
      {
        "name": "Comprehensive Deep Cleaning Overhaul & Fitting",
        "slug": "cleaning",
        "price": 2697,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Anuradha Joshi",
      "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_pun_cleaning_2",
    "businessName": "Pune City Deep Sanitization",
    "ownerName": "Snehal Jagtap",
    "category": "cleaning",
    "tagline": "Verified Deep Cleaning Specialist • Lead: Snehal Jagtap",
    "description": "Providing professional and guaranteed full home deep cleaning across Hadapsar Magarpatta and surrounding neighborhoods in Pune. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 12,
    "rating": 4.8,
    "totalReviews": 80,
    "completedJobs": 80,
    "responseRate": 99,
    "trustScore": 95,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Deep Cleaning",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Pune"
    ],
    "location": {
      "city": "Pune",
      "address": "Hadapsar Magarpatta, Pune",
      "coordinates": [
        73.8392,
        18.5729
      ]
    },
    "services": [
      {
        "name": "Deep Cleaning Diagnostics & Standard Service",
        "slug": "cleaning",
        "price": 1299,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for full home deep cleaning."
      },
      {
        "name": "Comprehensive Deep Cleaning Overhaul & Fitting",
        "slug": "cleaning",
        "price": 2697,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Snehal Jagtap",
      "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_pun_carpenter_1",
    "businessName": "Maharashtra Teak Woodcraft",
    "ownerName": "Dattatray Sutar",
    "category": "carpenter",
    "tagline": "Verified Carpentry Specialist • Lead: Dattatray Sutar",
    "description": "Providing professional and guaranteed carpentry & woodwork assembly across Pimple Saudagar and surrounding neighborhoods in Pune. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 5,
    "rating": 4.9,
    "totalReviews": 85,
    "completedJobs": 85,
    "responseRate": 96,
    "trustScore": 96,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Carpentry",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Pune"
    ],
    "location": {
      "city": "Pune",
      "address": "Pimple Saudagar, Pune",
      "coordinates": [
        73.8742,
        18.4679
      ]
    },
    "services": [
      {
        "name": "Carpentry Diagnostics & Standard Service",
        "slug": "carpenter",
        "price": 449,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for carpentry & woodwork assembly."
      },
      {
        "name": "Comprehensive Carpentry Overhaul & Fitting",
        "slug": "carpenter",
        "price": 997,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Dattatray Sutar",
      "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_pun_carpenter_2",
    "businessName": "Modern Flat Furniture Assembly",
    "ownerName": "Mahendra Pawar",
    "category": "carpenter",
    "tagline": "Verified Carpentry Specialist • Lead: Mahendra Pawar",
    "description": "Providing professional and guaranteed carpentry & woodwork assembly across Bavdhan and surrounding neighborhoods in Pune. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 6,
    "rating": 4.7,
    "totalReviews": 90,
    "completedJobs": 90,
    "responseRate": 97,
    "trustScore": 97,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Carpentry",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Pune"
    ],
    "location": {
      "city": "Pune",
      "address": "Bavdhan, Pune",
      "coordinates": [
        73.8742,
        18.5029
      ]
    },
    "services": [
      {
        "name": "Carpentry Diagnostics & Standard Service",
        "slug": "carpenter",
        "price": 449,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for carpentry & woodwork assembly."
      },
      {
        "name": "Comprehensive Carpentry Overhaul & Fitting",
        "slug": "carpenter",
        "price": 997,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Mahendra Pawar",
      "avatar": "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_pun_painter_1",
    "businessName": "Deccan Colors House Painters",
    "ownerName": "Nitin More",
    "category": "painter",
    "tagline": "Verified Painting Specialist • Lead: Nitin More",
    "description": "Providing professional and guaranteed interior & exterior painting across Koregaon Park North Main and surrounding neighborhoods in Pune. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 7,
    "rating": 4.8,
    "totalReviews": 95,
    "completedJobs": 95,
    "responseRate": 98,
    "trustScore": 98,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Painting",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Pune"
    ],
    "location": {
      "city": "Pune",
      "address": "Koregaon Park North Main, Pune",
      "coordinates": [
        73.8742,
        18.5379
      ]
    },
    "services": [
      {
        "name": "Painting Diagnostics & Standard Service",
        "slug": "painter",
        "price": 1499,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for interior & exterior painting."
      },
      {
        "name": "Comprehensive Painting Overhaul & Fitting",
        "slug": "painter",
        "price": 3097,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Nitin More",
      "avatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_pun_painter_2",
    "businessName": "MonsoonProof Wall Coatings",
    "ownerName": "Sachin Bhosale",
    "category": "painter",
    "tagline": "Verified Painting Specialist • Lead: Sachin Bhosale",
    "description": "Providing professional and guaranteed interior & exterior painting across Kharadi IT Park and surrounding neighborhoods in Pune. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 8,
    "rating": 4.9,
    "totalReviews": 100,
    "completedJobs": 100,
    "responseRate": 99,
    "trustScore": 88,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Painting",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Pune"
    ],
    "location": {
      "city": "Pune",
      "address": "Kharadi IT Park, Pune",
      "coordinates": [
        73.8742,
        18.5729
      ]
    },
    "services": [
      {
        "name": "Painting Diagnostics & Standard Service",
        "slug": "painter",
        "price": 1499,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for interior & exterior painting."
      },
      {
        "name": "Comprehensive Painting Overhaul & Fitting",
        "slug": "painter",
        "price": 3097,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Sachin Bhosale",
      "avatar": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_pun_pest-control_1",
    "businessName": "EcoHerb Pune Pest Shield",
    "ownerName": "Sambhaji Kadam",
    "category": "pest-control",
    "tagline": "Verified Pest Control Specialist • Lead: Sambhaji Kadam",
    "description": "Providing professional and guaranteed organic pest control across Sinhagad Road and surrounding neighborhoods in Pune. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 9,
    "rating": 4.7,
    "totalReviews": 105,
    "completedJobs": 105,
    "responseRate": 96,
    "trustScore": 89,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Pest Control",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Pune"
    ],
    "location": {
      "city": "Pune",
      "address": "Sinhagad Road, Pune",
      "coordinates": [
        73.9092,
        18.4679
      ]
    },
    "services": [
      {
        "name": "Pest Control Diagnostics & Standard Service",
        "slug": "pest-control",
        "price": 749,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for organic pest control."
      },
      {
        "name": "Comprehensive Pest Control Overhaul & Fitting",
        "slug": "pest-control",
        "price": 1597,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Sambhaji Kadam",
      "avatar": "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_pun_pest-control_2",
    "businessName": "SafeHome Biological Pest Kill",
    "ownerName": "Vijay Chavan",
    "category": "pest-control",
    "tagline": "Verified Pest Control Specialist • Lead: Vijay Chavan",
    "description": "Providing professional and guaranteed organic pest control across Pashan Sus Road and surrounding neighborhoods in Pune. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 10,
    "rating": 4.8,
    "totalReviews": 110,
    "completedJobs": 110,
    "responseRate": 97,
    "trustScore": 90,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Pest Control",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Pune"
    ],
    "location": {
      "city": "Pune",
      "address": "Pashan Sus Road, Pune",
      "coordinates": [
        73.9092,
        18.5029
      ]
    },
    "services": [
      {
        "name": "Pest Control Diagnostics & Standard Service",
        "slug": "pest-control",
        "price": 749,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for organic pest control."
      },
      {
        "name": "Comprehensive Pest Control Overhaul & Fitting",
        "slug": "pest-control",
        "price": 1597,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Vijay Chavan",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_pun_smart-home_1",
    "businessName": "SmartPune Home Automation",
    "ownerName": "Tanmay Kulkarni",
    "category": "smart-home",
    "tagline": "Verified Smart Home Specialist • Lead: Tanmay Kulkarni",
    "description": "Providing professional and guaranteed smart home & cctv setup across Baner Balewadi High St and surrounding neighborhoods in Pune. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 11,
    "rating": 4.9,
    "totalReviews": 115,
    "completedJobs": 115,
    "responseRate": 98,
    "trustScore": 91,
    "trustTier": "Elite Pro",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Smart Home",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Pune"
    ],
    "location": {
      "city": "Pune",
      "address": "Baner Balewadi High St, Pune",
      "coordinates": [
        73.9092,
        18.5379
      ]
    },
    "services": [
      {
        "name": "Smart Home Diagnostics & Standard Service",
        "slug": "smart-home",
        "price": 899,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for smart home & cctv setup."
      },
      {
        "name": "Comprehensive Smart Home Overhaul & Fitting",
        "slug": "smart-home",
        "price": 1897,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Tanmay Kulkarni",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80"
    }
  },
  {
    "_id": "pro_pun_smart-home_2",
    "businessName": "Sahyadri Vision CCTV Security",
    "ownerName": "Abhishek Thorat",
    "category": "smart-home",
    "tagline": "Verified Smart Home Specialist • Lead: Abhishek Thorat",
    "description": "Providing professional and guaranteed smart home & cctv setup across Hinjewadi Phase 2 and surrounding neighborhoods in Pune. Equipped with modern tools and certified safety compliance.",
    "experienceYears": 12,
    "rating": 4.7,
    "totalReviews": 120,
    "completedJobs": 120,
    "responseRate": 99,
    "trustScore": 92,
    "trustTier": "Verified Master",
    "verificationStatus": "VERIFIED",
    "availabilityType": "available_now",
    "skills": [
      "Smart Home",
      "Emergency Repair",
      "Diagnostics",
      "Home Visit",
      "Pune"
    ],
    "location": {
      "city": "Pune",
      "address": "Hinjewadi Phase 2, Pune",
      "coordinates": [
        73.9092,
        18.5729
      ]
    },
    "services": [
      {
        "name": "Smart Home Diagnostics & Standard Service",
        "slug": "smart-home",
        "price": 899,
        "priceType": "starts_at",
        "description": "Standard inspection, troubleshooting, and labor for smart home & cctv setup."
      },
      {
        "name": "Comprehensive Smart Home Overhaul & Fitting",
        "slug": "smart-home",
        "price": 1897,
        "priceType": "fixed",
        "description": "Complete repair, precision mounting, and premium guarantee."
      }
    ],
    "userId": {
      "name": "Abhishek Thorat",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80"
    }
  }
];
