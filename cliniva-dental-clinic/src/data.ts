import { Service, Feature, Review, FAQ, GalleryItem } from './types';

export const SERVICES_DATA: Service[] = [
  {
    id: 'root-canal',
    title: 'Root Canal Treatment',
    description: 'Microscope-enhanced, entirely pain-free single-visit procedures to rescue your natural teeth.',
    bullets: ['Microscopic precision', 'Single-visit comfortable therapy', 'Premium aesthetic zirconium crowns'],
    iconName: 'Activity',
    imageUrl: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=800&h=600'
  },
  {
    id: 'dental-implants',
    title: 'Dental Implants',
    description: 'Lifetime lasting titanium tooth restoration with premium crowns for natural look and function.',
    bullets: ['Computer-guided surgery', 'Lifetime warranty implants', 'Natural bite & full chewing power'],
    iconName: 'Shield',
    imageUrl: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=800&h=600'
  },
  {
    id: 'clear-aligners',
    title: 'Clear Aligners',
    description: 'Virtually invisible orthodontic correction using premium, comfortable custom-made aligner trays.',
    bullets: ['3D digital scan preview', 'Nearly invisible & removable', 'Comfortable and fast alignment'],
    iconName: 'Sparkles',
    imageUrl: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800&h=600'
  },
  {
    id: 'smile-makeover',
    title: 'Smile Makeover',
    description: 'Comprehensive aesthetic upgrade using ultra-thin ceramic veneers, laminates, and professional teeth whitening.',
    bullets: ['Custom porcelain veneers', 'Immediate 8-shade laser whitening', 'Digital smile design preview'],
    iconName: 'Heart',
    imageUrl: 'https://images.unsplash.com/photo-1512223792601-592a9809eed4?auto=format&fit=crop&q=80&w=800&h=600'
  },
  {
    id: 'wisdom-tooth',
    title: 'Wisdom Tooth Removal',
    description: 'Gentle, minimally invasive surgical extraction of impacted third molars by senior oral surgeons.',
    bullets: ['Atraumatic micro-extraction', 'Minimal post-op swelling', 'Comfort-first surgical suite'],
    iconName: 'Scissors',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800&h=600'
  },
  {
    id: 'kids-dentistry',
    title: 'Kids Dentistry',
    description: 'Delightful, friendly pediatric dental care to nurture lifelong healthy dental habits in a fear-free layout.',
    bullets: ['Playful, comforting environment', 'Cavity-preventive fluorides', 'Pain-free milk tooth therapy'],
    iconName: 'Smile',
    imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800&h=600'
  }
];

export const FEATURES_DATA: Feature[] = [
  {
    id: 'modern-equip',
    title: 'Modern Equipment',
    description: 'Utilizing leading global technologies including digital dental scanners, microscopes, and laser devices.',
    iconName: 'Cpu'
  },
  {
    id: 'exp-dentist',
    title: 'Experienced Dentist',
    description: 'Led by certified post-graduate specialist dentists with over 12 years of clinical excellence.',
    iconName: 'Award'
  },
  {
    id: 'digital-xray',
    title: 'Digital X-rays',
    description: 'Instant, ultra-low radiation high-resolution digital radiographs for immediate and precise diagnosis.',
    iconName: 'Tv'
  },
  {
    id: 'sterile-inst',
    title: 'Sterilized Instruments',
    description: 'Strict 100% sterile protocols with Class-B autoclave vacuums and hermetically sealed storage.',
    iconName: 'HeartHandshake'
  },
  {
    id: 'transparent-pricing',
    title: 'Transparent Pricing',
    description: 'No hidden charges. Clear treatment breakdowns, standard pricing schedules, and flexible EMI plans.',
    iconName: 'IndianRupee'
  },
  {
    id: 'emergency-appt',
    title: 'Emergency Care',
    description: 'Dedicated priority slots allocated daily for trauma cases, severe toothaches, and emergency procedures.',
    iconName: 'Clock'
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    author: 'Rahul Mehta',
    rating: 5,
    text: 'Dr. Rohit Sharma is exceptional! I was very anxious about my root canal treatment, but he was incredibly calm and the procedure was completely pain-free. The clinic in DLF Phase 2 is spotless, sterilized, and fitted with state-of-the-art tech. Highly recommend!',
    date: '1 week ago',
    treatment: 'Root Canal Treatment',
    avatarUrl: undefined
  },
  {
    id: 'rev-2',
    author: 'Priya Sen',
    rating: 5,
    text: 'Absolutely thrilled with my clear aligners from Cliniva. The 3D scan took just 10 minutes and they showed me the final outcome before starting. I am halfway through and the progress is amazing. The staff is highly supportive and the appointment booking is always seamless.',
    date: '3 weeks ago',
    treatment: 'Clear Aligners',
    avatarUrl: undefined
  },
  {
    id: 'rev-3',
    author: 'Col. V.P. Singh (Retd.)',
    rating: 5,
    text: 'Got three implants done. I was initially hesitant due to my age, but Dr. Sharma explained the digital guided process comprehensively. The surgeries were completely comfortable, and the new ceramic teeth feel extremely sturdy and look completely natural.',
    date: '1 month ago',
    treatment: 'Dental Implants',
    avatarUrl: undefined
  },
  {
    id: 'rev-4',
    author: 'Meenakshi Iyer',
    rating: 5,
    text: 'The best pediatric dental clinic in Gurugram! My 6-year-old daughter is usually terrified of doctors, but the team made her so comfortable. She actually enjoyed her tooth cleaning appointment! Generous spacing and extremely polite clinic staff.',
    date: '2 months ago',
    treatment: 'Kids Dentistry',
    avatarUrl: undefined
  },
  {
    id: 'rev-5',
    author: 'Abhinav Goel',
    rating: 5,
    text: 'Severe wisdom toothache woke me up at midnight. I called Cliniva in the morning and they accommodated me in an emergency slot. Dr. Sharma was brilliant, the atraumatic surgical extraction was done within 20 minutes. Exceptional pain control!',
    date: '2 months ago',
    treatment: 'Emergency Wisdom Tooth Extraction',
    avatarUrl: undefined
  }
];

export const FAQS_DATA: FAQ[] = [
  {
    id: 'faq-1',
    question: 'Is dental treatment at Cliniva really pain-free?',
    answer: 'Yes! Patient comfort is our utmost priority. We employ advanced pain management protocols including computerized local anesthetics, ultra-fine microscopic needles, and non-invasive laser techniques to ensure all procedures—from root canals to extractions—are entirely stress-free and pain-free.'
  },
  {
    id: 'faq-2',
    question: 'What are the clinic working hours and days?',
    answer: 'Cliniva Dental Clinic is open Monday to Saturday from 10:00 AM to 8:30 PM, and on Sundays for pre-booked appointments from 10:00 AM to 2:00 PM. We strongly recommend scheduling an appointment in advance to avoid waiting times.'
  },
  {
    id: 'faq-3',
    question: 'Do you offer EMIs or installment plans for premium dental work?',
    answer: 'Absolutely. We offer 0% Interest EMI options on all credit cards and premium healthcare financing services like Bajaj Finserv and Pine Labs for treatments like Clear Aligners, Dental Implants, and Smile Makeovers. This ensures luxury dental care is affordable for everyone.'
  },
  {
    id: 'faq-4',
    question: 'How often should I get my teeth cleaned and checked up?',
    answer: 'We recommend a clinical preventive checkup and professional scaling/cleaning every 6 months. This allows us to intercept oral health issues early, remove deep plaque and calculus that regular brushing misses, and maintain brilliant gum health.'
  },
  {
    id: 'faq-5',
    question: 'What is the advantage of Clear Aligners over traditional metal braces?',
    answer: 'Clear Aligners are virtually invisible, meaning you can straighten your teeth without any metallic smile. They are completely removable, allowing you to enjoy your favorite foods and maintain excellent oral hygiene with normal brushing and flossing. Additionally, they are much more comfortable than metal brackets.'
  },
  {
    id: 'faq-6',
    question: 'How does Cliniva ensure absolute clinical sterilization and hygiene?',
    answer: 'Your safety is absolute. We practice a meticulous 6-tier WHO-compliant sterilization protocol. Every non-disposable instrument is pre-scrubbed, cleaned ultrasonically, packed in medical-grade pouches, sterilized in our modern Class-B Autoclave, and sealed in sterile conditions until the exact moment of your treatment.'
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Premium Lounge & Reception',
    category: 'Lobby',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800&h=600'
  },
  {
    id: 'gal-2',
    title: 'Advanced Treatment Suite',
    category: 'Operatory',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800&h=600'
  },
  {
    id: 'gal-3',
    title: 'Digital Diagnostics Lab',
    category: 'Diagnostics',
    imageUrl: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=800&h=600'
  },
  {
    id: 'gal-4',
    title: 'Clinical Consultation Area',
    category: 'Consultation',
    imageUrl: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=800&h=600'
  },
  {
    id: 'gal-5',
    title: 'High-Tech Sterilization Unit',
    category: 'Sterilization',
    imageUrl: 'https://images.unsplash.com/photo-1512223792601-592a9809eed4?auto=format&fit=crop&q=80&w=800&h=600'
  },
  {
    id: 'gal-6',
    title: 'Pediatric Dental Lounge',
    category: 'Pediatric',
    imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800&h=600'
  }
];
