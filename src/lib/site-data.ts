/**
 * ============================================================
 * ROOTS ACADEMY OF SCIENCES & COMPUTER COLLEGE — DASKA
 * Central site content file (edit here to update the website)
 * ============================================================
 * All information below is verified from the academy's own
 * public materials (official posters, YouTube channel, Google
 * Maps listing). Do not add unverified claims.
 */

export const CONTACT = {
  name: "Roots Academy of Sciences & Computer College",
  shortName: "Roots Academy",
  city: "Daska",
  tagline: "Keys of Success",
  address: "Near Main Branch, National Bank, Model Town, Daska, Punjab 51010",
  subCampus: "Near Shakir Marriage Hall, Jamkey Cheema (Sub Campus)",
  phones: ["0343-1298216", "0333-0406057", "0302-6040444"],
  primaryPhone: "0343-1298216",
  whatsapp: "923431298216", // international format for wa.me
  mapQuery: "Roots+Academy+of+Sciences+Model+Town+Daska",
  googleMapsUrl:
    "https://www.google.com/maps/place/Roots+Academy+of+Sciences/@32.329838,74.3492103,17z",
  rating: 4.2,
  socials: {
    youtube: "https://www.youtube.com/@RootsacademyOfsicence",
    tiktok: "https://www.tiktok.com/@roots.academy.of",
    // Facebook / Instagram: no verified official handle found yet — add when confirmed.
  },
};

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Faculty", href: "#faculty" },
  { label: "Results", href: "#results" },
  { label: "Gallery", href: "#gallery" },
  { label: "Admissions", href: "#admissions" },
  { label: "Contact", href: "#contact" },
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

export interface Program {
  name: string;
  category: "Science Academy" | "Computer College" | "Language & Skills";
  subjects: string[];
  description: string;
  schedule?: string;
}

/**
 * VERIFIED PROGRAMS — taken from the academy's own admission posters.
 * To add a new program later: copy an object, fill the fields, save.
 */
export const PROGRAMS: Program[] = [
  {
    name: "Science Academy (Matric & Inter)",
    category: "Science Academy",
    subjects: [
      "Physics",
      "Chemistry",
      "Biology",
      "Mathematics",
      "Computer Science",
      "English",
      "Urdu",
      "Islamiat",
      "Pak Studies",
      "Statistics",
      "Economics",
      "Accounting",
    ],
    description:
      "Complete academy coaching for Matric and Intermediate students across science and commerce subjects — with weekly tests, monthly short tests and board-pattern exam preparation.",
  },
  {
    name: "Computer Courses",
    category: "Computer College",
    subjects: [
      "Office Management",
      "Graphics Design",
      "Web Development",
      "Amazon",
      "AI (Artificial Intelligence)",
      "Freelancing",
      "AutoCAD",
      "C / C++",
      "JavaScript",
      "Java",
      "Python",
    ],
    description:
      "Practical, career-focused computer courses taught in the academy's own computer lab — from foundations to modern freelancing and AI skills.",
  },
  {
    name: "DIT — Diploma in Information Technology",
    category: "Computer College",
    subjects: [
      "Introduction to Computers",
      "Windows",
      "MS Word / Excel / PowerPoint",
      "Inpage Urdu",
      "Internet & Email",
      "Typing Master",
      "Hardware & Software Installation",
    ],
    description:
      "A structured diploma in information technology covering essential IT skills, taught in regular and weekend class options with certificate on completion.",
    schedule: "Regular & Weekend classes",
  },
  {
    name: "IELTS & Spoken English",
    category: "Language & Skills",
    subjects: [
      "IELTS Coaching",
      "Spoken IELTS",
      "English Basic",
      "English Advanced",
      "Spoken Language",
    ],
    description:
      "IELTS coaching classes and spoken English training led by Prof. Adleem Ashfaq (M.Phil. Literature) — from basic English to advanced fluency.",
  },
  {
    name: "Social Media Marketing",
    category: "Language & Skills",
    subjects: [
      "Content Marketing",
      "Email Marketing",
      "Influencer Marketing",
      "Platform Optimization",
      "App Marketing",
      "Audience Engagement",
    ],
    description:
      "Learn digital and social media marketing skills — content, email, ads and audience growth — for jobs, freelancing and growing your own business.",
  },
];

export const FACULTY = [
  {
    name: "Dr. Mohsin Ali",
    qualification: "PhD Physics",
    subject: "Physics & Sciences",
    role: "Academic Supervision",
    photo: "/images/faculty_dr_mohsin_ali.jpg", // real photo from official Roots Academy poster
  },
  {
    name: "Prof. Adleem Ashfaq",
    qualification: "M.Phil. Literature",
    subject: "English & IELTS",
    role: "IELTS & Spoken English",
    photo: "/images/faculty_adleem_ashfaq.jpg", // real photo from official IELTS poster
  },
];

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
  { src: "/images/campus-exterior.jpg", category: "Campus Life", caption: "Jamkey Cheema campus exterior" },
  { src: "/images/lab-students.jpg", category: "Computer Lab", caption: "Students working in the lab" },
  { src: "/images/poster-admission-2025.jpg", category: "Programs & Posters", caption: "Official admission open 2025 poster", tall: true },
  { src: "/images/poster-computer-courses.jpg", category: "Programs & Posters", caption: "Official computer courses flyer" },
  { src: "/images/poster-ielts.jpg", category: "Programs & Posters", caption: "Official IELTS classes poster", tall: true },
  { src: "/images/banner-branches.jpg", category: "Campus Life", caption: "Branches — Daska & Jamkey Cheema" },
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

/** Placeholder result cards — clearly marked, replace with verified results. */
export const RESULT_PLACEHOLDERS = [
  { initials: "AR", class: "Intermediate", marks: "—%", achievement: "Awaiting verified result" },
  { initials: "MS", class: "Matric", marks: "—%", achievement: "Awaiting verified result" },
  { initials: "AK", class: "Intermediate", marks: "—%", achievement: "Awaiting verified result" },
];
