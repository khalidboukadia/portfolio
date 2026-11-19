import {
  Briefcase,
  Compass,
  Layers,
  Code,
  Boxes,
  HeartPulse,
  Store,
  Film,
  Ticket,
  ChartPie,
  GraduationCap,
  Trophy,
} from "lucide-react"
import {
  FaReact,
  FaNodeJs,
  FaLaravel,
  FaDocker,
  FaGitAlt,
  FaFigma,
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaPhp,
  FaDatabase,
} from "react-icons/fa"
import {
  SiJavascript,
  SiTypescript,
  SiMongodb,
  SiMysql,
  SiExpress,
  SiNextdotjs,
  SiNestjs,
  SiSequelize,
  SiJira,
} from "react-icons/si"

/* ==========================================
   Personal Information
   ========================================== */
export const personalInfo = {
  name: "Mustapha Boukadia",
  title: "مطوّر Full Stack بتقنيات MERN",
  email: "mustapha.boukadia97@gmail.com",
  phone: "+212 615767363",
  location: "أكادير، المغرب",
  linkedin: "https://www.linkedin.com/in/mustapha-boukadia-98289411b",
  github: "https://github.com/boukadia",
  bio: "مطوّر Full Stack متخرّج من YouCode | UM6P، أتقن تطوير التطبيقات الحديثة باستخدام JavaScript وPHP وLaravel وReact. فضولي ومنضبط، أبحث عن مشاريع طموحة ومبتكرة أضع مهاراتي في خدمتها.",
  resumeUrl: "https://drive.google.com/file/d/1q-LlQ4CjxZgjI7H_afRyjIJjoJnHBHUo/view?usp=sharing",
}

/* ==========================================
   Navigation
   ========================================== */
export const navLinks = [
  { name: "الرئيسية", href: "#hero", icon: Compass },
  { name: "نبذة", href: "#about", icon: Layers },
  { name: "المهارات", href: "#skills", icon: Code },
  { name: "المشاريع", href: "#projects", icon: Boxes },
  { name: "الخبرة", href: "#experience", icon: Briefcase },
  { name: "تواصل", href: "#contact", icon: HeartPulse },
]

export const socialLinks = [
  { name: "GitHub", href: personalInfo.github },
  { name: "LinkedIn", href: personalInfo.linkedin },
  { name: "البريد الإلكتروني", href: `mailto:${personalInfo.email}` },
]

/* ==========================================
   Hero
   ========================================== */
export const heroEyebrow = ["خبرة في التطوير الشامل", "تقنيات حديثة", "منتجات مُسلَّمة"]

export const heroStats = [
  { value: 27, suffix: "+", label: "مشاريع مختارة" },
  { value: 1, suffix: "+", label: "سنوات خبرة" },
  { value: 4, suffix: "", label: "لغات" },
]

/* ==========================================
   Featured showcase (two hero products)
   ========================================== */
export const showcase = [
  {
    id: "daba",
    projectId: 1,
    title: "DIGITAL DABA",
    subtitle: "نظام إدارة محتوى للتجارة الإلكترونية ولوحة تحكم",
    description:
      "تصميم لوحة تحكم متكاملة مع لوحة بيانات ديناميكية وإحصائيات آنية. تخصيص الصفحة الرئيسية وإنشاء مساحة عميل آمنة.",
    badge: "مُميَّز",
    category: "PHP",
    techStack: ["Laravel", "PHP", "FilamentPHP", "MySQL", "Blade", "Bootstrap"],
    githubUrl: "https://github.com/boukadia",
    liveUrl: "#",
    icon: Store,
    color: "#FF2D20",
    stats: [
      { value: 6, label: "تقنيات" },
      { value: "PHP", label: "الفئة" },
    ],
  },
  {
    id: "medisync",
    projectId: 2,
    title: "MediSync",
    subtitle: "إدارة طبية",
    description:
      "تطبيق تفاعلي يتيح جدولة الاستشارات الطبية ومتابعة ملفاتها وإدارتها مع نظام مصادقة.",
    badge: "مُميَّز",
    category: "MERN Stack",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "Bootstrap"],
    githubUrl: "https://github.com/boukadia/MediSyncFront",
    liveUrl: "#",
    icon: HeartPulse,
    color: "#059669",
    stats: [
      { value: 6, label: "تقنيات" },
      { value: "MERN Stack", label: "الفئة" },
    ],
  },
]

/* ==========================================
   Core belief — numbered convictions
   ========================================== */
export const beliefs = [
  "فهم الأساسيات قبل أطر العمل",
  "التكيّف مع أي حزمة تقنية — لقد فعلتها من قبل",
  "تسليم ما يهمّ، والتخلّي عمّا لا ينفع",
  "الدقة والتحسين المستمر بدل السرعة وحدها",
]

/* ==========================================
   Engineering approach — four principles
   ========================================== */
export const approach = [
  {
    title: "مستقل عن اللغة البرمجية",
    description:
      "JavaScript أو TypeScript أو PHP: أركّز على المبادئ الأساسية — تدفّق البيانات، وهندسة النظام، والأداء، وقابلية الصيانة.",
  },
  {
    title: "مستقل عن إطار العمل",
    description:
      "تتطوّر أطر العمل بينما تبقى الأسس ثابتة. أتعلّم الأدوات الجديدة بسرعة لأنني أفهم البنية التي تحت الغطاء.",
  },
  {
    title: "البناء بما يناسب",
    description:
      "الأداة المناسبة تعتمد على المشكلة — لا على التفضيل. أختار التقنية وفق قابلية التوسّع والوضوح والديمومة.",
  },
  {
    title: "إزالة العوائق",
    description:
      "أتتبّع العوائق في عملي البرمجي وأكتب الأداة التي تزيلها. أحبّ البساطة التي تُنتج أثراً.",
  },
]

/* ==========================================
   Skills Data
   ========================================== */
export const skillCategories = [
  {
    title: "الواجهة الأمامية",
    skills: [
      { name: "JavaScript (ES6+)", level: 75, icon: SiJavascript, color: "#F7DF1E" },
      { name: "React.js", level: 65, icon: FaReact, color: "#61DAFB" },
      { name: "Next.js", level: 60, icon: SiNextdotjs, color: "#64748b" },
      { name: "HTML5", level: 90, icon: FaHtml5, color: "#E34F26" },
      { name: "CSS3", level: 90, icon: FaCss3Alt, color: "#1572B6" },
      { name: "Bootstrap", level: 80, icon: FaBootstrap, color: "#7952B3" },
    ],
  },
  {
    title: "الواجهة الخلفية",
    skills: [
      { name: "Node.js", level: 80, icon: FaNodeJs, color: "#339933" },
      { name: "Express.js", level: 80, icon: SiExpress, color: "#64748b" },
      { name: "TypeScript", level: 70, icon: SiTypescript, color: "#3178C6" },
      { name: "NestJS", level: 70, icon: SiNestjs, color: "#E0234E" },
      { name: "Laravel", level: 80, icon: FaLaravel, color: "#FF2D20" },
      { name: "PHP", level: 80, icon: FaPhp, color: "#777BB4" },
      { name: "API RESTful", level: 80, icon: FaDatabase, color: "#00D4AA" },
    ],
  },
  {
    title: "قواعد البيانات",
    skills: [
      { name: "MongoDB", level: 70, icon: SiMongodb, color: "#47A248" },
      { name: "MySQL", level: 70, icon: SiMysql, color: "#4479A1" },
      { name: "Mongoose", level: 70, icon: SiMongodb, color: "#880000" },
      { name: "Sequelize", level: 70, icon: SiSequelize, color: "#52B0E7" },
    ],
  },
  {
    title: "الأدوات",
    skills: [
      { name: "Docker", level: 70, icon: FaDocker, color: "#2496ED" },
      { name: "Jest", level: 60, icon: SiJavascript, color: "#C21325" },
      { name: "Git/GitHub", level: 75, icon: FaGitAlt, color: "#F05032" },
      { name: "Figma", level: 75, icon: FaFigma, color: "#F24E1E" },
      { name: "Jira", level: 75, icon: SiJira, color: "#0052CC" },
    ],
  },
]

/* ==========================================
   Capabilities — flat chip groups for the stack grid
   ========================================== */
export const capabilityGroups = [
  { label: "اللغات", items: ["JavaScript", "TypeScript", "PHP", "SQL"] },
  {
    label: "الواجهة الأمامية",
    items: ["React.js", "Next.js", "HTML5", "CSS3", "Bootstrap", "Tailwind"],
  },
  {
    label: "الواجهة الخلفية",
    items: ["Node.js", "Express.js", "NestJS", "Laravel", "REST APIs"],
  },
  { label: "البيانات", items: ["MongoDB", "MySQL", "Mongoose", "Sequelize"] },
  { label: "الأدوات", items: ["Git", "Docker", "Figma", "Jira", "Jest"] },
]

/* ==========================================
   Projects Data
   ========================================== */
export const projects = [
  {
    id: 1,
    title: "DIGITAL DABA – نظام إدارة محتوى للتجارة الإلكترونية",
    kicker: "نظام إدارة محتوى للتجارة الإلكترونية",
    quote: "« لوحة تحكم تحكي نشاط الشركة. »",
    description:
      "تصميم لوحة تحكم متكاملة مع لوحة بيانات ديناميكية وإحصائيات آنية. تخصيص الصفحة الرئيسية وإنشاء مساحة عميل آمنة.",
    techStack: ["Laravel", "PHP", "FilamentPHP", "MySQL", "Blade", "Bootstrap"],
    githubUrl: "https://github.com/boukadia",
    liveUrl: "#",
    featured: true,
    category: "PHP",
    status: "PHP",
    icon: Store,
    metrics: [
      { label: "الحزمة البرمجية", value: "Laravel" },
      { label: "التقنيات", value: "6" },
    ],
  },
  {
    id: 2,
    title: "MediSync – إدارة طبية",
    kicker: "إدارة طبية",
    quote: "« متابعة الاستشارات دون فقدان دقيقة واحدة. »",
    description:
      "تطبيق تفاعلي يتيح جدولة الاستشارات الطبية ومتابعة ملفاتها وإدارتها مع نظام مصادقة.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "Bootstrap"],
    githubUrl: "https://github.com/boukadia/MediSyncFront",
    liveUrl: "#",
    featured: true,
    category: "MERN Stack",
    status: "MERN Stack",
    icon: HeartPulse,
    metrics: [
      { label: "الحزمة البرمجية", value: "MERN" },
      { label: "قاعدة البيانات", value: "MongoDB" },
    ],
  },
  {
    id: 3,
    title: "BudgetWise – إدارة الميزانية",
    kicker: "إدارة الميزانية",
    quote: "« كل درهم مُنفَق، مرئي بنظرة واحدة. »",
    description:
      "تطبيق تفاعلي لإدارة الميزانية. متابعة المصاريف والمداخيل والأهداف المالية عبر لوحات بيانات بصرية.",
    techStack: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "Sequelize", "MySQL"],
    githubUrl: "https://github.com/boukadia/gestionBudgets",
    liveUrl: "#",
    featured: true,
    category: "MERN Stack",
    status: "PHP",
    icon: ChartPie,
    metrics: [
      { label: "الحزمة البرمجية", value: "Node.js" },
      { label: "قاعدة البيانات", value: "MySQL" },
    ],
  },
  {
    id: 4,
    title: "NeoLearn – منصة تعلّم إلكتروني",
    kicker: "منصة تعلّم إلكتروني",
    quote: "« تعليم بلا واجهة تُثبط الهمم. »",
    description:
      "تطوير منصة تعليمية إلكترونية تفاعلية ومخصّصة. إدارة الدورات ومتابعة التقدّم وواجهة تعليمية بديهية للطلاب والمدرّبين.",
    techStack: ["HTML", "CSS", "PHP", "Bootstrap", "MySQL"],
    githubUrl: "https://github.com/boukadia/NeoLearn",
    liveUrl: "#",
    featured: true,
    category: "PHP",
    status: "PHP",
    icon: GraduationCap,
    metrics: [
      { label: "الحزمة البرمجية", value: "PHP" },
      { label: "قاعدة البيانات", value: "MySQL" },
    ],
  },
  {
    id: 5,
    title: "Evento – إدارة الفعاليات",
    kicker: "إدارة الفعاليات",
    quote: "« تنظيم، ترويج، تحصيل. »",
    description:
      "نظام متكامل لإدارة الفعاليات: التنظيم والترويج وبيع التذاكر عبر الإنترنت وحضورياً. واجهة ديناميكية مع تدبير الحجوزات والمشاركين.",
    techStack: ["HTML", "CSS", "JavaScript", "PHP", "Bootstrap", "PostgreSQL"],
    githubUrl: "https://github.com/boukadia/d-Eventbrite",
    liveUrl: "#",
    featured: true,
    category: "PHP",
    status: "PHP",
    icon: Ticket,
    metrics: [
      { label: "الحزمة البرمجية", value: "PHP" },
      { label: "قاعدة البيانات", value: "PostgreSQL" },
    ],
  },
  {
    id: 6,
    title: "UltimateTactics – تطبيق FUT",
    kicker: "تطبيق FUT",
    quote: "« التشكيلة المثالية، محسوبة ومُتحقَّق منها. »",
    description:
      "تطبيق لإدارة فرق FIFA Ultimate Team. تحسين التشكيلات التكتيكية، وإدارة اللاعبين، وإنشاء تشكيلات فريق مخصّصة.",
    techStack: ["HTML", "CSS", "PHP", "MySQL"],
    githubUrl: "https://github.com/boukadia/UltimateTactics",
    liveUrl: "#",
    featured: true,
    category: "PHP",
    status: "PHP",
    icon: Trophy,
    metrics: [
      { label: "الحزمة البرمجية", value: "PHP" },
      { label: "قاعدة البيانات", value: "MySQL" },
    ],
  },
  {
    id: 7,
    title: "AnimeVerse – موقع أنمي",
    kicker: "موقع أنمي",
    quote: "« عالَم، شخصيات، مجتمع. »",
    description:
      "موقع مخصّص لأنمي، يضمّ ملخّص القصة، وبطاقات الشخصيات، وقائمة الحلقات، ومعرض الصور، ومشغّل فيديو/صوتي للموسيقى التصويرية، ومدوّنة أخبار، ومنتدى مجتمعي، ومتجر منتجات مشتقة. تصميم متجاوب ومتعدد اللغات (FR/EN).",
    techStack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Bootstrap"],
    githubUrl: "https://github.com/boukadia/streamAnime",
    liveUrl: "#",
    featured: true,
    category: "PHP",
    status: "PHP",
    icon: Film,
    metrics: [
      { label: "الحزمة البرمجية", value: "PHP" },
      { label: "قاعدة البيانات", value: "MySQL" },
    ],
  },
]

/* ==========================================
   Experience Data
   ========================================== */
export const experiences = [
  {
    id: 1,
    role: "مطوّر ويب – تدريب",
    company: "DIGITAL DABA",
    location: "أكادير",
    period: "مايو 2025 – يوليو 2025",
    description: [
      "تصميم لوحة تحكم متكاملة مع لوحة بيانات ديناميكية وإحصائيات آنية",
      "تخصيص الصفحة الرئيسية وإنشاء مساحة عميل آمنة",
      "التعاون مع الفريق عبر Jira في إطار إدارة مشروع Agile",
      "إنشاء نماذج UI/UX باستخدام Figma",
    ],
    techStack: ["Laravel", "PHP", "FilamentPHP", "MySQL", "Blade", "Bootstrap"],
    current: true,
  },
]

/* ==========================================
   Education Data
   ========================================== */
export const education = [
  {
    id: 1,
    degree: "مطوّر Full Stack",
    school: "YouCode, UM6P",
    location: "يوسوفيا",
    period: "2024 – 2026",
    current: true,
  },
  {
    id: 2,
    degree: "DEUG في العلوم الفيزيائية",
    school: "كلية العلوم التطبيقية",
    location: "أيت ملول",
    period: "2016 – 2018",
    current: false,
  },
  {
    id: 3,
    degree: "بكالوريا في العلوم الفيزيائية",
    school: "ثانوية تاهلية",
    location: "أيت باها",
    period: "2016",
    current: false,
  },
]

/* ==========================================
   Soft Skills
   ========================================== */
export const softSkills = [
  "العمل ضمن فريق",
  "إدارة الوقت",
  "التعلّم المستمر",
  "المرونة في التكيّف",
  "الدقة والإتقان",
  "الإحساس بالمسؤولية",
]

/* ==========================================
   Languages
   ========================================== */
export const languages = [
  { name: "الأمازيغية", level: "اللغة الأم", percentage: 100 },
  { name: "العربية", level: "اللغة الأم", percentage: 100 },
  { name: "الفرنسية", level: "A2", percentage: 40 },
  { name: "الإنجليزية", level: "A1", percentage: 25 },
]

export default {
  personalInfo,
  navLinks,
  socialLinks,
  heroEyebrow,
  heroStats,
  showcase,
  beliefs,
  approach,
  skillCategories,
  capabilityGroups,
  projects,
  experiences,
  education,
  softSkills,
  languages,
}
