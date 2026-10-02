/**
 * ============================================================
 * ROOTS ACADEMY OF SCIENCES & COMPUTER COLLEGE — DASKA
 * Central site content file (edit here to update the website)
 * ============================================================
 * All contact details, campuses, programs and courses below come
 * from the academy's own public materials (official posters,
 * YouTube channel, Google Maps listing).
 *
 * To add course fees later: set `fee: null` to a string such as
 * `fee: "Rs. 3,000 / month"` — the UI updates automatically.
 */

export const CONTACT = {
  name: "Roots Academy of Sciences & Computer College",
  shortName: "Roots Academy",
  city: "Daska",
  tagline: "Keys of Success",
  phones: ["0343-1298216", "0333-0406057", "0302-6040444"],
  primaryPhone: "0343-1298216",
  whatsapp: "923431298216", // international format for wa.me (0343-1298216)
  mapQuery: "Roots+Academy+of+Sciences+Model+Town+Daska",
  googleMapsUrl:
    "https://www.google.com/maps/place/Roots+Academy+of+Sciences/@32.329838,74.3492103,17z",
  socials: {
    youtube: "https://www.youtube.com/@RootsacademyOfsicence",
    tiktok: "https://www.tiktok.com/@roots.academy.of",
  },
};

/** Builds a tel: link in international format from a local PK number. */
export function telHref(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, "");
  return `tel:+92${digits.slice(1)}`;
}

/** Builds a prefilled WhatsApp inquiry link. */
export function waHref(text?: string): string {
  const message =
    text ??
    "Assalam-o-Alaikum! I would like to inquire about admission at Roots Academy of Sciences, Daska.";
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export interface Campus {
  name: string;
  badge: string;
  lines: string[];
  mapsUrl?: string; // only added when a verified listing exists
}

export const CAMPUSES: Campus[] = [
  {
    name: "Main Campus",
    badge: "Model Town, Daska",
    lines: ["Near Main Branch, National Bank", "Model Town, Daska, Punjab 51010"],
    mapsUrl: CONTACT.googleMapsUrl,
  },
  {
    name: "Jamke Cheema Campus",
    badge: "Second Campus",
    lines: ["Near Shakir Marriage Hall", "Jamke Cheema"],
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Founder", href: "/founder" },
  { label: "Faculty", href: "/#faculty" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Admissions", href: "/#admissions" },
  { label: "Contact", href: "/#contact" },
];

export const HERO = {
  headlineA: "Strong Roots.",
  headlineB: "Better Results.",
  sub: "Quality education, regular assessment and dedicated academic guidance for students in Daska.",
  chips: ["Weekly Tests", "Monthly Short Tests", "Girls Separate Classes", "PhD-Led Faculty"],
  images: {
    main: "/images/lab-hero.jpg", // real computer lab — Google Maps listing
    secondary: "/images/interior.jpg", // real academy interior
    tertiary: "/images/practical-class.jpg", // real practical class
  },
};

export interface Strength {
  title: string;
  description: string;
  icon: string; // lucide icon name handled in component
}

export const STRENGTHS: Strength[] = [
  {
    title: "Weekly Tests",
    description:
      "Every week, every subject. Regular class tests keep students in continuous practice instead of last-minute cramming.",
    icon: "CalendarCheck",
  },
  {
    title: "Monthly Short Tests",
    description:
      "Structured monthly assessments that simulate exam conditions and measure progress across the full syllabus.",
    icon: "FileCheck",
  },
  {
    title: "Academic Monitoring",
    description:
      "Test records are tracked for every student, so teachers and parents know exactly where each child stands.",
    icon: "ClipboardList",
  },
  {
    title: "Experienced Faculty",
    description:
      "Classes supervised by Dr. Mohsin Ali (PhD Physics) with subject specialists leading every course.",
    icon: "GraduationCap",
  },
  {
    title: "Science Education",
    description:
      "Dedicated science academy streams covering Physics, Chemistry, Biology and Mathematics with practical work.",
    icon: "FlaskConical",
  },
  {
    title: "Computer Education",
    description:
      "A working computer lab with courses from Office Management and Web Development to AI and Freelancing.",
    icon: "MonitorSmartphone",
  },
  {
    title: "Exam Preparation",
    description:
      "Board-focused preparation with paper practice, repeated testing and revision built into the academic calendar.",
    icon: "Target",
  },
  {
    title: "Student Guidance",
    description:
      "Personal academic guidance for every enrolled student — choosing subjects, improving weak areas, planning careers.",
    icon: "Compass",
  },
];

export const SYSTEM_STEPS = [
  {
    step: "01",
    title: "Learn",
    description:
      "Concepts are taught clearly with examples, board-pattern explanations and practical demonstrations.",
  },
  {
    step: "02",
    title: "Practice",
    description:
      "Students solve exercises, past-paper questions and classwork under teacher supervision.",
  },
  {
    step: "03",
    title: "Test",
    description:
      "Weekly tests and monthly short tests put every student to the exam-style check — again and again.",
  },
  {
    step: "04",
    title: "Review",
    description:
      "Each test is checked and reviewed. Weak areas are identified subject by subject, student by student.",
  },
  {
    step: "05",
    title: "Improve",
    description:
      "Targeted follow-up on weak areas, extra attention where needed, and measurable improvement before the board exam.",
  },
];

/** Factual assessment cards — replaces the old results/placeholder section. */
export const ASSESSMENT_CARDS = [
  {
    title: "Weekly Tests",
    description:
      "Class tests are held every week so students stay in continuous practice with every subject.",
    icon: "CalendarCheck",
  },
  {
    title: "Monthly Tests",
    description:
      "Monthly short tests cover a larger portion of the syllabus under exam-style conditions.",
    icon: "FileCheck",
  },
  {
    title: "Board Exam Preparation",
    description:
      "Preparation follows the board pattern with paper practice and revision built into the academic calendar.",
    icon: "Target",
  },
  {
    title: "Performance Monitoring",
    description:
      "Test records are maintained for each student, making strengths and weak areas easy to track.",
    icon: "ClipboardList",
  },
  {
    title: "Regular Assessments",
    description:
      "Continuous assessment keeps parents informed and students aware of exactly where they stand.",
    icon: "TrendingUp",
  },
];

/** "Why Students Choose Roots" — generic, editable value cards. */
export const WHY_CHOOSE = [
  {
    title: "Regular Testing",
    description:
      "Weekly and monthly assessments help students stay consistent with their studies.",
    icon: "CalendarCheck",
  },
  {
    title: "Focused Preparation",
    description:
      "Structured learning and academic practice support students preparing for important examinations.",
    icon: "Target",
  },
  {
    title: "Academic Monitoring",
    description:
      "Regular evaluation helps students identify areas that need improvement.",
    icon: "ClipboardList",
  },
  {
    title: "Multiple Learning Paths",
    description:
      "Academic, language, computer and professional learning programs are available under one academy.",
    icon: "Route",
  },
];

/* ============================================================
 * COURSES — central catalog
 * Categories: "Academic Programs" | "Computer & Technology" | "Language & Communication"
 * fee: null  →  UI shows "Fee information available on inquiry"
 * fee: "Rs. X,XXX / month"  →  UI shows the fee (no redesign needed)
 * ============================================================ */

export const COURSE_CATEGORIES = [
  "Academic Programs",
  "Computer & Technology",
  "Language & Communication",
] as const;

export type CourseCategory = (typeof COURSE_CATEGORIES)[number];

export interface Course {
  slug: string;
  name: string;
  category: CourseCategory;
  icon: string; // lucide icon name handled in components
  description: string; // short card description
  overview: string; // longer description for the course page
  learn: string[]; // "What students may learn"
  audience: string[]; // who the course suits
  fee: string | null;
  schedule?: string;
  featured?: boolean; // shown on the homepage preview
}

export const COURSES: Course[] = [
  /* ---------- Academic Programs ---------- */
  {
    slug: "matric",
    name: "Matric",
    category: "Academic Programs",
    icon: "BookOpen",
    description:
      "Complete academy coaching for Matric students across science and humanities subjects with regular testing.",
    overview:
      "The Matric program at Roots Academy supports students of 9th and 10th class with structured coaching across major subjects. Teaching follows the board pattern, and weekly tests together with monthly short tests keep students in continuous practice throughout the session.",
    learn: [
      "Concept clarity in science and humanities subjects",
      "Board-pattern question practice",
      "Weekly and monthly class tests",
      "Revision strategies before examinations",
    ],
    audience: [
      "Students of 9th and 10th class",
      "Students preparing for board examinations",
      "Parents looking for regular testing and monitoring",
    ],
    fee: null,
    featured: true,
  },
  {
    slug: "intermediate",
    name: "Intermediate",
    category: "Academic Programs",
    icon: "GraduationCap",
    description:
      "Academy coaching for Intermediate students with subject specialists, regular tests and board preparation.",
    overview:
      "The Intermediate program covers FSc, ICS and I.Com level coaching with subject specialists leading each class. Students are prepared for board examinations through concept-based teaching, continuous testing and personal academic guidance.",
    learn: [
      "Subject-specific coaching by specialist teachers",
      "Board-pattern preparation and paper practice",
      "Regular assessment of progress",
      "Guidance for subject and career choices",
    ],
    audience: [
      "FSc, ICS and I.Com students",
      "Students aiming to strengthen board exam performance",
      "Students who want continuous academic monitoring",
    ],
    fee: null,
    featured: true,
  },

  /* ---------- Computer & Technology ---------- */
  {
    slug: "office-management",
    name: "Office Management",
    category: "Computer & Technology",
    icon: "Briefcase",
    description:
      "Learn essential computer and productivity skills for modern office environments.",
    overview:
      "The Office Management course builds the everyday computer skills used in modern offices and workplaces. It is a practical course focused on productivity tools, document handling and organized digital workflows.",
    learn: [
      "Computer fundamentals for office work",
      "Productivity tools and document handling",
      "Organizing and managing digital files",
      "Practical workplace computer skills",
    ],
    audience: [
      "Students seeking office and administrative skills",
      "Job seekers who want practical computer skills",
      "Professionals who want to improve productivity",
    ],
    fee: null,
  },
  {
    slug: "graphics-design",
    name: "Graphics Design",
    category: "Computer & Technology",
    icon: "Palette",
    description:
      "Build practical visual design skills and learn the fundamentals of creating digital graphics.",
    overview:
      "The Graphics Design course introduces the fundamentals of visual design and the creation of digital graphics. Students work on practical design exercises that build both creative confidence and technical skill.",
    learn: [
      "Fundamentals of visual design",
      "Creating digital graphics for print and screens",
      "Working with design tools hands-on",
      "Developing a practical design sense",
    ],
    audience: [
      "Creative students who enjoy visual work",
      "Beginners who want to start designing",
      "Anyone interested in digital media skills",
    ],
    fee: null,
    featured: true,
  },
  {
    slug: "web-development",
    name: "Web Development",
    category: "Computer & Technology",
    icon: "Globe",
    description:
      "Learn the foundations of building modern websites and understanding web technologies.",
    overview:
      "The Web Development course teaches the foundations of how modern websites are built. Students learn core web technologies step by step and practice building real pages and simple projects in the academy's computer lab.",
    learn: [
      "How modern websites work",
      "Core web technologies and building blocks",
      "Building and structuring web pages",
      "Foundations for advanced web learning",
    ],
    audience: [
      "Students interested in technology and coding",
      "Beginners who want to build websites",
      "Anyone planning a future in software or freelancing",
    ],
    fee: null,
    featured: true,
  },
  {
    slug: "amazon",
    name: "Amazon",
    category: "Computer & Technology",
    icon: "ShoppingCart",
    description:
      "Learn the fundamentals of working with Amazon and understanding online marketplace workflows.",
    overview:
      "The Amazon course introduces students to online marketplaces and how Amazon workflows operate. The focus is on understanding the platform, its tools and the skills used in marketplace work.",
    learn: [
      "Fundamentals of online marketplaces",
      "Amazon platform workflows and tools",
      "Product listings and marketplace operations",
      "Skills used in e-commerce work",
    ],
    audience: [
      "Students interested in e-commerce",
      "Beginners exploring online marketplaces",
      "Anyone curious about digital marketplace work",
    ],
    fee: null,
    featured: true,
  },
  {
    slug: "artificial-intelligence",
    name: "Artificial Intelligence",
    category: "Computer & Technology",
    icon: "BrainCircuit",
    description:
      "Explore fundamental AI concepts, modern tools and practical applications of artificial intelligence.",
    overview:
      "The Artificial Intelligence course introduces the fundamental concepts behind AI and the modern tools that make it practical. Students explore real applications and build an understanding of how AI is shaping work and learning.",
    learn: [
      "Fundamental AI concepts",
      "Modern AI tools and how to use them",
      "Practical applications of artificial intelligence",
      "How AI is used in everyday digital work",
    ],
    audience: [
      "Students curious about AI and modern technology",
      "Beginners who want a practical introduction",
      "Anyone who wants to understand today's AI tools",
    ],
    fee: null,
    featured: true,
  },
  {
    slug: "freelancing",
    name: "Freelancing",
    category: "Computer & Technology",
    icon: "Laptop",
    description:
      "Learn the fundamentals of online freelancing, professional communication and digital work practices.",
    overview:
      "The Freelancing course covers the fundamentals of working online — from professional communication to the practices of digital work. It helps students understand how freelancing platforms and clients work before they begin.",
    learn: [
      "Fundamentals of online freelancing",
      "Professional communication with clients",
      "Digital work practices and discipline",
      "Understanding freelancing platforms",
    ],
    audience: [
      "Students who want to work online",
      "Beginners exploring digital work",
      "Anyone building independent work skills",
    ],
    fee: null,
  },
  {
    slug: "autocad",
    name: "AutoCAD",
    category: "Computer & Technology",
    icon: "DraftingCompass",
    description:
      "Learn foundational computer-aided design concepts and practical AutoCAD skills.",
    overview:
      "The AutoCAD course teaches foundational computer-aided design concepts with hands-on practice in the academy's computer lab. Students learn the core tools and drawing workflow used in technical design fields.",
    learn: [
      "Computer-aided design fundamentals",
      "Core AutoCAD tools and workflow",
      "Technical drawing practice",
      "Skills useful in engineering and design fields",
    ],
    audience: [
      "Students of technical and engineering fields",
      "Beginners interested in CAD",
      "Anyone who needs drawing skills for their studies or work",
    ],
    fee: null,
  },
  {
    slug: "c-cpp",
    name: "C / C++",
    category: "Computer & Technology",
    icon: "Terminal",
    description:
      "Learn core programming concepts, problem-solving and programming fundamentals using C and C++.",
    overview:
      "The C / C++ course builds strong programming fundamentals using two of the most important languages in computer science. Students practice logic building and problem-solving from the ground up.",
    learn: [
      "Core programming concepts",
      "Problem-solving and logic building",
      "Programming fundamentals using C and C++",
      "A strong base for advanced programming",
    ],
    audience: [
      "Computer science students",
      "Beginners who want strong fundamentals",
      "Anyone preparing for advanced programming study",
    ],
    fee: null,
  },
  {
    slug: "javascript",
    name: "JavaScript",
    category: "Computer & Technology",
    icon: "Braces",
    description:
      "Learn JavaScript fundamentals and understand how interactive web applications work.",
    overview:
      "The JavaScript course introduces the language that powers interactive websites. Students learn the fundamentals and practice how interactive web applications behave behind the scenes.",
    learn: [
      "JavaScript language fundamentals",
      "How interactive web applications work",
      "Practical scripting exercises",
      "A foundation for modern web development",
    ],
    audience: [
      "Students interested in web development",
      "Beginners in programming",
      "Anyone building modern web skills",
    ],
    fee: null,
  },
  {
    slug: "java",
    name: "Java",
    category: "Computer & Technology",
    icon: "Coffee",
    description:
      "Learn foundational object-oriented programming concepts using Java.",
    overview:
      "The Java course teaches foundational object-oriented programming using one of the world's most widely used languages. Students build a clear understanding of classes, objects and structured program design.",
    learn: [
      "Object-oriented programming concepts",
      "Programming fundamentals using Java",
      "Structured problem-solving practice",
      "Skills relevant to academic and professional paths",
    ],
    audience: [
      "Computer science students",
      "Beginners in programming",
      "Students preparing for university-level CS study",
    ],
    fee: null,
  },
  {
    slug: "python",
    name: "Python",
    category: "Computer & Technology",
    icon: "FileCode2",
    description:
      "Learn programming fundamentals using Python with a focus on logic, problem-solving and practical coding.",
    overview:
      "The Python course teaches programming fundamentals with a focus on logic, problem-solving and practical coding. Python's clear style makes it an excellent first language for new programmers.",
    learn: [
      "Programming fundamentals using Python",
      "Logic building and problem-solving",
      "Practical coding exercises",
      "A base for AI, automation and data skills",
    ],
    audience: [
      "First-time programmers",
      "Students interested in AI and data fields",
      "Anyone who wants a practical start in coding",
    ],
    fee: null,
    featured: true,
  },
  {
    slug: "dit",
    name: "DIT — Diploma in Information Technology",
    category: "Computer & Technology",
    icon: "Monitor",
    description:
      "A structured diploma in information technology covering essential IT skills, with regular and weekend class options.",
    overview:
      "The Diploma in Information Technology (DIT) is a structured program covering essential IT skills from computer basics to hardware and software installation. Regular and weekend class options make it accessible for students and professionals alike.",
    learn: [
      "Introduction to computers and Windows",
      "MS Word, Excel and PowerPoint",
      "Inpage Urdu, internet and email",
      "Typing and hardware/software installation",
    ],
    audience: [
      "Students seeking a structured IT diploma",
      "Job seekers building office IT skills",
      "Professionals who prefer weekend classes",
    ],
    fee: null,
    schedule: "Regular & Weekend classes",
  },
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    category: "Computer & Technology",
    icon: "Megaphone",
    description:
      "Learn digital and social media marketing skills — content, email, ads and audience growth.",
    overview:
      "The Social Media Marketing course covers digital marketing skills including content, email, platform optimization and audience engagement. It is aimed at students, freelancers and business owners who want to grow online.",
    learn: [
      "Content and email marketing basics",
      "Platform optimization and app marketing",
      "Influencer and audience engagement strategies",
      "Growing a brand or business online",
    ],
    audience: [
      "Students interested in digital marketing",
      "Business owners growing an online presence",
      "Freelancers adding marketing skills",
    ],
    fee: null,
  },

  /* ---------- Language & Communication ---------- */
  {
    slug: "ielts",
    name: "IELTS",
    category: "Language & Communication",
    icon: "Languages",
    description:
      "IELTS coaching classes led by Prof. Adleem Ashfaq (M.Phil. Literature) with structured exam preparation.",
    overview:
      "The IELTS program offers structured coaching for students preparing for the IELTS examination. Classes are led by Prof. Adleem Ashfaq (M.Phil. Literature) with focused practice on the skills tested in the exam.",
    learn: [
      "Structured IELTS exam preparation",
      "Practice across the tested language skills",
      "Spoken IELTS training",
      "Guidance from an M.Phil. Literature specialist",
    ],
    audience: [
      "Students planning to study abroad",
      "Candidates preparing for the IELTS exam",
      "Anyone who wants structured English preparation",
    ],
    fee: null,
  },
  {
    slug: "spoken-english",
    name: "Spoken English",
    category: "Language & Communication",
    icon: "Mic",
    description:
      "Spoken English training from basic to advanced levels — build confidence in everyday communication.",
    overview:
      "The Spoken English program develops fluency and confidence in everyday and professional communication. Classes run from basic English to advanced levels under the guidance of Prof. Adleem Ashfaq (M.Phil. Literature).",
    learn: [
      "Everyday spoken communication",
      "English from basic to advanced levels",
      "Confidence in conversation",
      "Professional language practices",
    ],
    audience: [
      "Students who want to speak confidently",
      "Professionals improving workplace English",
      "Beginners starting from basic English",
    ],
    fee: null,
  },
];

export const FEATURED_COURSES = COURSES.filter((c) => c.featured);

export function getCourse(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}

/* ============================================================
 * FOUNDER — Dr. Mohsin Ali
 * Professional general marketing copy. Edit freely.
 * (No specific achievements, dates, awards or experience counts.)
 * ============================================================ */

export const FOUNDER = {
  name: "Dr. Mohsin Ali",
  role: "Founder / Director",
  qualification: "PhD Physics",
  photo: "/images/founder_dr_mohsin_ali.jpg",
  supportingLine:
    "Dedicated to building strong academic foundations and helping students grow through focused learning and continuous guidance.",
  intro: [
    "Dr. Mohsin Ali leads Roots Academy with a commitment to creating a focused and supportive learning environment for students.",
    "With an academic background in Physics and a strong interest in education, his vision for Roots Academy is centered on building strong foundations, encouraging curiosity and helping students develop the confidence needed to move forward in their academic journey.",
  ],
  vision: {
    title: "A Vision for Better Learning",
    paragraphs: [
      "Education becomes more effective when students receive clear guidance, consistent practice and an environment that encourages improvement.",
      "Roots Academy aims to bring these elements together by combining academic preparation with modern learning opportunities in technology, languages and professional skills.",
    ],
  },
  message: {
    heading: "A Message from the Founder",
    paragraphs: [
      "At Roots Academy, our focus is not limited to completing a syllabus. We want students to understand what they learn, strengthen their fundamentals and continue improving with confidence.",
      "Every student has different strengths and challenges. Our responsibility as educators is to provide the guidance, discipline and learning environment that helps them move forward.",
    ],
    attribution: "Dr. Mohsin Ali — Founder / Director, Roots Academy",
  },
  philosophy: [
    {
      title: "Strong Foundations",
      description:
        "Helping students understand core concepts before moving toward more advanced learning.",
      icon: "Layers",
    },
    {
      title: "Consistent Practice",
      description:
        "Encouraging regular assessments and practice to improve academic confidence.",
      icon: "Repeat",
    },
    {
      title: "Modern Skills",
      description:
        "Providing opportunities to learn technology and professional skills alongside traditional academics.",
      icon: "MonitorSmartphone",
    },
    {
      title: "Student Growth",
      description:
        "Creating an environment where students can identify weaknesses and continue improving.",
      icon: "Sprout",
    },
  ],
};

export interface GalleryItem {
  src: string;
  category: "Campus Life" | "Computer Lab" | "Classes" | "Programs & Posters";
  caption: string;
  tall?: boolean;
}

export const GALLERY: GalleryItem[] = [
  { src: "/images/lab-hero.jpg", category: "Computer Lab", caption: "Computer lab — Model Town campus", tall: true },
  { src: "/images/practical-class.jpg", category: "Classes", caption: "Practical class demonstration", tall: true },
  { src: "/images/interior.jpg", category: "Campus Life", caption: "Academy reception & waiting area" },
  { src: "/images/campus-exterior.jpg", category: "Campus Life", caption: "Jamke Cheema campus exterior" },
  { src: "/images/lab-students.jpg", category: "Computer Lab", caption: "Students working in the lab" },
  { src: "/images/poster-computer-courses.jpg", category: "Programs & Posters", caption: "Official computer courses flyer" },
  { src: "/images/poster-ielts.jpg", category: "Programs & Posters", caption: "Official IELTS classes poster", tall: true },
  { src: "/images/banner-branches.jpg", category: "Campus Life", caption: "Branches — Daska & Jamke Cheema" },
  { src: "/images/poster-dit.jpg", category: "Programs & Posters", caption: "DIT diploma announcement", tall: true },
  { src: "/images/poster-social-marketing.jpg", category: "Programs & Posters", caption: "Social media marketing course" },
  { src: "/images/poster-admissions-open.jpg", category: "Programs & Posters", caption: "Admissions open — Daska campus", tall: true },
];

export const GALLERY_CATEGORIES = [
  "All",
  "Campus Life",
  "Computer Lab",
  "Classes",
  "Programs & Posters",
] as const;

export const FACULTY = [
  {
    name: "Dr. Mohsin Ali",
    qualification: "PhD Physics",
    subject: "Physics & Sciences",
    role: "Founder / Director",
    photo: "/images/founder_dr_mohsin_ali.jpg", // real photo from official Roots Academy poster
    profileHref: "/founder",
  },
  {
    name: "Prof. Adleem Ashfaq",
    qualification: "M.Phil. Literature",
    subject: "English & IELTS",
    role: "IELTS & Spoken English",
    photo: "/images/faculty_adleem_ashfaq.jpg", // real photo from official IELTS poster
  },
];
