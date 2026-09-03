const fs = require('fs');
const path = require('path');

const categories = [
  { slug: 'electrician', name: 'Electrical Repairs & Wiring', basePrice: 299, skill: 'Electrician' },
  { slug: 'ac-repair', name: 'AC Servicing & Deep Repair', basePrice: 549, skill: 'AC Repair' },
  { slug: 'plumber', name: 'Plumbing & Pipe Solutions', basePrice: 349, skill: 'Plumbing' },
  { slug: 'cleaning', name: 'Full Home Deep Cleaning', basePrice: 1299, skill: 'Deep Cleaning' },
  { slug: 'carpenter', name: 'Carpentry & Woodwork Assembly', basePrice: 449, skill: 'Carpentry' },
  { slug: 'painter', name: 'Interior & Exterior Painting', basePrice: 1499, skill: 'Painting' },
  { slug: 'pest-control', name: 'Organic Pest Control', basePrice: 749, skill: 'Pest Control' },
  { slug: 'smart-home', name: 'Smart Home & CCTV Setup', basePrice: 899, skill: 'Smart Home' }
];

const avatarPool = [
  'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=250&q=80'
];

const cityData = [
  {
    city: 'Kolkata',
    code: 'kol',
    coords: [88.3639, 22.5726],
    names: [
      ['Subhashish Das', 'Apex Electricals & Power Systems', 'Salt Lake Sector V'],
      ['Debabrata Mukherjee', 'VoltMaster Quick Response', 'Park Circus'],
      ['Amitava Roy', 'Metro Air Conditioning & Cooling', 'Park Street'],
      ['Pritam Ghosh', 'CoolBreeze Express AC Care', 'New Town Action Area 2'],
      ['Sunil Mahato', 'Prime Plumbing & Leak Solutions', 'Ballygunge'],
      ['Tapan Karmakar', 'Kolkata Flow Plumbers', 'Gariahat Market'],
      ['Rina Banerjee', 'PureSpark Deep Cleaning', 'Salt Lake Sector III'],
      ['Sanjay Pal', 'Crystal Clean Homes', 'Alipore'],
      ['Bikash Roy', 'Heritage Woodcraft Carpentry', 'Behala Chowrasta'],
      ['Sanjoy Das', 'Master Furniture Assembly', 'Howrah Station Area'],
      ['Anirban Sen', 'ColorCraft Wall Finishes', 'Dum Dum Metro'],
      ['Pranab Mandal', 'Kolkata WeatherProof Painters', 'Lake Gardens'],
      ['Gouranga Naskar', 'Herbal Shield Pest Solutions', 'Tollygunge'],
      ['Sudip Saha', 'EcoGuard Safe Pest Removal', 'Kankurgachi'],
      ['Indranil Bose', 'SmartNest Automation & CCTV', 'Salt Lake Sector I'],
      ['Arindam Dey', 'SecureVision Smart Security', 'Rajarhat Expressway']
    ]
  },
  {
    city: 'Bengaluru',
    code: 'blr',
    coords: [77.5946, 12.9716],
    names: [
      ['Karthik Murthy', 'Silicon Valley Electricals', 'Koramangala 5th Block'],
      ['Naveen Hegde', 'TechCity Quick Wire Works', 'Indiranagar 100ft Road'],
      ['Suresh Gowda', 'Garden City AC Cooling', 'Whitefield Main Road'],
      ['Prashant Reddy', 'Bengaluru CoolAir Systems', 'HSR Layout Sector 2'],
      ['Ramesh Rao', 'Namma Plumbers QuickFix', 'BTM Layout 2nd Stage'],
      ['Manjunath Swamy', 'Kaveri Hydro Solutions', 'Jayanagar 4th Block'],
      ['Divya Hegde', 'EcoSpark Bengaluru Cleaners', 'Bellandur EcoSpace'],
      ['Deepa Narayanan', 'CleanWave Home Sanitization', 'Marathahalli Bridge'],
      ['Raghavendra Bhat', 'Deccan Teak Woodcraft', 'Electronic City Phase 1'],
      ['Venkatesh Prasad', 'Modular Living Carpentry', 'Sarjapur Road'],
      ['Anand Kumar', 'Bangalore Palette House Painters', 'Malleshwaram 8th Cross'],
      ['Shiva Shankar', 'Silicon Wall Coatings', 'Hebbal Outer Ring'],
      ['Chetan Gowda', 'GreenBio Safe Pest Control', 'Kengeri Satellite Town'],
      ['Srinivas Murthy', 'Urban Shield Pest Protectors', 'Banashankari 3rd Stage'],
      ['Arun Balasubramanian', 'SmartHome IoT Systems', 'Indiranagar Defence Colony'],
      ['Praveen Nair', 'CyberSafe Vision & Alarms', 'HSR Sector 1']
    ]
  },
  {
    city: 'Delhi NCR',
    code: 'del',
    coords: [77.2090, 28.6139],
    names: [
      ['Rajesh Sharma', 'Capital Power & Electricals', 'Connaught Place'],
      ['Deepak Choudhary', 'MetroGrid Quick Electrician', 'South Extension II'],
      ['Vikas Verma', 'FrostAir Express AC Care', 'DLF Phase 2, Gurgaon'],
      ['Sunil Bhati', 'North India Chill Systems', 'Sector 18, Noida'],
      ['Amit Tyagi', 'Royal Plumbers & Pipeline Tech', 'Sector 62, Noida'],
      ['Rakesh Kumar', 'Yamuna River Pipeline Fix', 'Lajpat Nagar IV'],
      ['Meenakshi Gupta', 'Capital Deep Sanitization', 'Vasant Kunj'],
      ['Pooja Yadav', 'CleanCraft Home Hygiene', 'Gurgaon Cyber City'],
      ['Joginder Singh', 'Imperial Woodworks & Interiors', 'Rajouri Garden'],
      ['Baljeet Singh', 'Precision Wood Crafting', 'Dwarka Sector 10'],
      ['Manoj Rawat', 'Dilli Wall Art & Painting', 'Greater Kailash 1'],
      ['Sanjay Chauhan', 'WeatherShield NCR Painters', 'Noida Sector 50'],
      ['Dinesh Kumar', 'BioShield Safe Pest Control', 'Rohini Sector 9'],
      ['Satish Tanwar', 'HerbalGuard NCR Pest Guard', 'Gurgaon Sohna Road'],
      ['Vipin Malhotra', 'SmartCapital IoT & Alarms', 'Saket District Centre'],
      ['Gaurav Mishra', 'SecureDelhi CCTV Tech', 'Mayur Vihar Phase 1']
    ]
  },
  {
    city: 'Mumbai',
    code: 'mum',
    coords: [72.8777, 19.0760],
    names: [
      ['Siddharth Kadam', 'Coastal City Electricals', 'Bandra West (Linking Rd)'],
      ['Mahesh Shinde', 'Marine Power Solutions', 'Dadar West (Shivaji Park)'],
      ['Sachin Deshmukh', 'Bombay Cooling & AC Care', 'Andheri East (Chakala)'],
      ['Tushar More', 'SeaBreeze Inverter AC Tech', 'Powai Hiranandani'],
      ['Rohan Patil', 'Marine Lines Rapid Plumbing', 'Lower Parel (High Street)'],
      ['Swapnil Sawant', 'Mumbai Flow HydroFix', 'Juhu Tara Road'],
      ['Sneha More', 'CityLights Deep Cleaning', 'Goregaon West'],
      ['Vaishali Kadam', 'SparkleBay Sanitization', 'Bandra Kurla Complex'],
      ['Eknath Gawde', 'Salsette Custom Woodworks', 'Borivali West'],
      ['Santosh Jadhav', 'Konkan Timber Craftsmen', 'Thane West (Ghodbunder)'],
      ['Nilesh Tawde', 'MonsoonShield Wall Paint', 'Worli Sea Face'],
      ['Prashant Salvi', 'Mumbai Coastal Painters', 'Malad Link Road'],
      ['Ganesh Tambe', 'ZeroBug Organic Pest Control', 'Chembur Diamond Garden'],
      ['Ravindra Kamble', 'SafeHome Herbal Pest Sol', 'Khar West (SV Road)'],
      ['Amol Chitnis', 'SmartAvenue Home Tech', 'Santacruz West'],
      ['Dhananjay Naik', 'Island City Security & CCTV', 'Prabhadevi']
    ]
  },
  {
    city: 'Hyderabad',
    code: 'hyd',
    coords: [78.4867, 17.3850],
    names: [
      ['Venkat Reddy', 'CyberCity Electricals & IoT', 'Hitec City, Madhapur'],
      ['K. Srinivas', 'Charminar Rapid Wire Works', 'Banjara Hills Road 12'],
      ['Srinivas Rao', 'Deccan Chillers AC Systems', 'Kondapur Main Road'],
      ['M. Anjaneyulu', 'Telangana Cool Breeze', 'Gachibowli Financial Dist'],
      ['Praveen Kumar', 'Nizam Hydro & Sanitary', 'Jubilee Hills Road 36'],
      ['V. Ravinder', 'CyberPlumb Emergency Fix', 'Madhapur Near Cyber Towers'],
      ['Swathi Reddy', 'CleanSphere Hyderabad', 'Kukatpally Housing Board'],
      ['Lalitha Devi', 'Deccan Shine Deep Cleaning', 'Begumpet Airport Rd'],
      ['Mohan Chary', 'Royal Wood Art Carpentry', 'Ameerpet Metro'],
      ['B. Ramachander', 'Heritage Telugu Timberworks', 'Secunderabad Marredpally'],
      ['K. Suresh', 'Golconda Color House Painters', 'Manikonda Outer Ring'],
      ['Ch. Venkatesh', 'CyberShield Wall Coating', 'Miyapur Main Road'],
      ['Y. Prasad', 'EcoKill Safe Pest Defense', 'Dilsukhnagar'],
      ['N. Chandrasekhar', 'BioGuard Hyderabad Solutions', 'Attapur Ring Road'],
      ['Sai Teja', 'NextGen SmartHome Automation', 'Gachibowli Telecom Nagar'],
      ['R. Srikanth', 'Deccan Security Surveillance', 'Banjara Hills Road 2']
    ]
  },
  {
    city: 'Chennai',
    code: 'chn',
    coords: [80.2707, 13.0827],
    names: [
      ['R. Balaji', 'Coromandel Electricals', 'T. Nagar (Pondy Bazaar)'],
      ['S. Murugan', 'Chennai Spark Systems', 'Anna Nagar 2nd Avenue'],
      ['Sundaramurthy', 'Marina Cool Air Conditioners', 'Adyar Lattice Bridge Rd'],
      ['P. Saravanan', 'Bay Chillers AC Express', 'Velachery Main Road'],
      ['Vignesh Natarajan', 'Kavery River Plumbers', 'Mylapore Tank Area'],
      ['G. Karthikeyan', 'Madras Flow Plumbing', 'OMR Thoraipakkam'],
      ['K. Meenakshi', 'PureMarina Home Cleaners', 'Besant Nagar Beach Rd'],
      ['S. Lakshmi', 'South Indian Deep Sanitization', 'Nungambakkam High Rd'],
      ['A. Selvam', 'Chola Woodcraft Carpentry', 'Porur Junction'],
      ['M. Senthil', 'Tamil Nadu Furniture Works', 'Guindy Industrial Estate'],
      ['D. Rajendran', 'Coromandel Colors House Paint', 'Kilpauk Garden'],
      ['V. Anand', 'Coastal Shield Waterproofing', 'Tambaram Sanatorium'],
      ['T. Sridhar', 'HerbalSafe Pest Control', 'Kodambakkam'],
      ['K. Jayakumar', 'EcoTermite Chennai Defense', 'Alwarpet TTK Road'],
      ['Karthik Sundar', 'SmartMarina CCTV & IoT', 'OMR Sholinganallur'],
      ['N. Vijay', 'Tamil Security Surveillance', 'Ashok Nagar 11th Ave']
    ]
  },
  {
    city: 'Pune',
    code: 'pun',
    coords: [73.8567, 18.5204],
    names: [
      ['Ganesh Joshi', 'Deccan Heritage Electricals', 'Kothrud (Paud Road)'],
      ['Omkar Deshpande', 'Sahyadri Quick Power Wire', 'Baner Road'],
      ['Sagar Gaikwad', 'Sinhagad Cool Air Systems', 'Hinjewadi Phase 1'],
      ['Swapnil Patil', 'Western AC Care & Jet Wash', 'Viman Nagar Near Airport'],
      ['Pratik Kulkarni', 'Western Ghats Plumbing Tech', 'Aundh DP Road'],
      ['Ajit Shinde', 'Mutha River Hydro Drainage', 'Wakad Datta Mandir Rd'],
      ['Anuradha Joshi', 'Peshwa Sparkle Home Cleaners', 'Kalyani Nagar'],
      ['Snehal Jagtap', 'Pune City Deep Sanitization', 'Hadapsar Magarpatta'],
      ['Dattatray Sutar', 'Maharashtra Teak Woodcraft', 'Pimple Saudagar'],
      ['Mahendra Pawar', 'Modern Flat Furniture Assembly', 'Bavdhan'],
      ['Nitin More', 'Deccan Colors House Painters', 'Koregaon Park North Main'],
      ['Sachin Bhosale', 'MonsoonProof Wall Coatings', 'Kharadi IT Park'],
      ['Sambhaji Kadam', 'EcoHerb Pune Pest Shield', 'Sinhagad Road'],
      ['Vijay Chavan', 'SafeHome Biological Pest Kill', 'Pashan Sus Road'],
      ['Tanmay Kulkarni', 'SmartPune Home Automation', 'Baner Balewadi High St'],
      ['Abhishek Thorat', 'Sahyadri Vision CCTV Security', 'Hinjewadi Phase 2']
    ]
  }
];

let allPros = [];

cityData.forEach(cd => {
  cd.names.forEach((item, idx) => {
    const [ownerName, businessName, address] = item;
    const catIndex = Math.floor(idx / 2);
    const cat = categories[catIndex];
    const avatar = avatarPool[(idx + cd.city.length) % avatarPool.length];
    
    // Spread coordinates slightly around city center
    const latOffset = (idx % 4 - 1.5) * 0.035;
    const lngOffset = (Math.floor(idx / 4) - 1.5) * 0.035;
    const coords = [
      Number((cd.coords[0] + lngOffset).toFixed(4)),
      Number((cd.coords[1] + latOffset).toFixed(4))
    ];

    allPros.push({
      _id: `pro_${cd.code}_${cat.slug}_${(idx % 2) + 1}`,
      businessName,
      ownerName,
      category: cat.slug,
      tagline: `Verified ${cat.skill} Specialist • Lead: ${ownerName}`,
      description: `Providing professional and guaranteed ${cat.name.toLowerCase()} across ${address} and surrounding neighborhoods in ${cd.city}. Equipped with modern tools and certified safety compliance.`,
      experienceYears: 5 + (idx % 8),
      rating: Number((4.7 + (idx % 3) * 0.1).toFixed(1)),
      totalReviews: 45 + (idx * 5) % 80,
      completedJobs: 45 + (idx * 5) % 80,
      responseRate: 96 + (idx % 4),
      trustScore: 88 + (idx % 11),
      trustTier: (idx % 2 === 0) ? 'Elite Pro' : 'Verified Master',
      verificationStatus: 'VERIFIED',
      availabilityType: 'available_now',
      skills: [cat.skill, 'Emergency Repair', 'Diagnostics', 'Home Visit', cd.city],
      location: {
        city: cd.city,
        address: `${address}, ${cd.city}`,
        coordinates: coords
      },
      services: [
        {
          name: `${cat.skill} Diagnostics & Standard Service`,
          slug: cat.slug,
          price: cat.basePrice,
          priceType: 'starts_at',
          description: `Standard inspection, troubleshooting, and labor for ${cat.name.toLowerCase()}.`
        },
        {
          name: `Comprehensive ${cat.skill} Overhaul & Fitting`,
          slug: cat.slug,
          price: cat.basePrice * 2 + 99,
          priceType: 'fixed',
          description: `Complete repair, precision mounting, and premium guarantee.`
        }
      ],
      userId: {
        name: ownerName,
        avatar
      }
    });
  });
});

console.log('Total Generated Professionals:', allPros.length);

const fileContent = `export const FALLBACK_CATEGORIES = [
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

export const FALLBACK_PROS = ${JSON.stringify(allPros, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'client', 'src', 'utils', 'mockData.js'), fileContent, 'utf8');
console.log('Successfully written mockData.js with exactly 2 professionals per option in every city!');
