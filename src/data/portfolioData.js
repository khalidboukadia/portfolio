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
  title: "Développeur Full Stack MERN",
  email: "mustapha.boukadia97@gmail.com",
  phone: "+212 615767363",
  location: "Agadir, Maroc",
  linkedin: "https://www.linkedin.com/in/mustapha-boukadia-98289411b",
  github: "https://github.com/boukadia",
  bio: "Développeur full-stack formé à YouCode | UM6P, je maîtrise le développement d'applications modernes avec JavaScript, PHP, Laravel et React. Curieux et rigoureux, je cherche à mettre mes compétences au service de projets ambitieux et innovants.",
  resumeUrl: "https://drive.google.com/file/d/1q-LlQ4CjxZgjI7H_afRyjIJjoJnHBHUo/view?usp=sharing",
}

/* ==========================================
   Navigation
   ========================================== */
export const navLinks = [
  { name: "Accueil", href: "#hero", icon: Compass },
  { name: "À propos", href: "#about", icon: Layers },
  { name: "Compétences", href: "#skills", icon: Code },
  { name: "Projets", href: "#projects", icon: Boxes },
  { name: "Expérience", href: "#experience", icon: Briefcase },
  { name: "Contact", href: "#contact", icon: HeartPulse },
]

export const socialLinks = [
  { name: "GitHub", href: personalInfo.github },
  { name: "LinkedIn", href: personalInfo.linkedin },
  { name: "Email", href: `mailto:${personalInfo.email}` },
]

/* ==========================================
   Hero
   ========================================== */
export const heroEyebrow = ["Full-Stack Craft", "Stacks Modernes", "Produits Livrés"]

export const heroStats = [
  { value: 27, suffix: "+", label: "Projets" },
  { value: 1, suffix: "+", label: "Ans d'exp." },
  { value: 4, suffix: "", label: "Langues" },
]

/* ==========================================
   Featured showcase (two hero products)
   ========================================== */
export const showcase = [
  {
    id: "daba",
    title: "DIGITAL DABA",
    subtitle: "CMS e-commerce & back-office",
    description:
      "Conception d'un back-office complet avec dashboard dynamique et statistiques en temps réel. Personnalisation de la page d'accueil et création d'un espace client sécurisé.",
    badge: "En vedette",
    category: "PHP",
    techStack: ["Laravel", "PHP", "FilamentPHP", "MySQL", "Blade", "Bootstrap"],
    githubUrl: "https://github.com/boukadia",
    liveUrl: "#",
    icon: Store,
    color: "#FF2D20",
    stats: [
      { value: 6, label: "Technologies" },
      { value: "PHP", label: "Catégorie" },
    ],
  },
  {
    id: "medisync",
    title: "MediSync",
    subtitle: "Gestion médicale",
    description:
      "Application interactive permettant de planifier, suivre et gérer les consultations médicales et dossiers patients avec système d'authentification.",
    badge: "En vedette",
    category: "MERN Stack",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "Bootstrap"],
    githubUrl: "https://github.com/boukadia/MediSyncFront",
    liveUrl: "#",
    icon: HeartPulse,
    color: "#059669",
    stats: [
      { value: 6, label: "Technologies" },
      { value: "MERN Stack", label: "Catégorie" },
    ],
  },
]

/* ==========================================
   Core belief — numbered convictions
   ========================================== */
export const beliefs = [
  "Comprendre les fondamentaux avant les frameworks",
  "S'adapter à n'importe quel stack — je l'ai déjà fait",
  "Livrer ce qui compte, retirer ce qui ne sert à rien",
  "La précision et l'amélioration continue plutôt que la vitesse seule",
]

/* ==========================================
   Engineering approach — four principles
   ========================================== */
export const approach = [
  {
    title: "Indépendant du langage",
    description:
      "JavaScript, TypeScript ou PHP : je me concentre sur les principes fondamentaux — flux de données, architecture système, performance et maintenabilité.",
  },
  {
    title: "Indépendant du framework",
    description:
      "Les frameworks évoluent, les fondamentaux restent. J'apprends vite de nouveaux outils parce que je comprends l'architecture sous l'abstraction.",
  },
  {
    title: "Construire avec ce qui convient",
    description:
      "Le bon outil dépend du problème — pas de la préférence. Je choisis la technologie selon la scalabilité, la clarté et la durabilité.",
  },
  {
    title: "Éliminer la friction",
    description:
      "Je traque la friction dans mon propre développement et j'écris l'outil qui la supprime. J'aime la simplicité qui produit de l'impact.",
  },
]

/* ==========================================
   Skills Data
   ========================================== */
export const skillCategories = [
  {
    title: "Front-End",
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
    title: "Back-End",
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
    title: "Bases de données",
    skills: [
      { name: "MongoDB", level: 70, icon: SiMongodb, color: "#47A248" },
      { name: "MySQL", level: 70, icon: SiMysql, color: "#4479A1" },
      { name: "Mongoose", level: 70, icon: SiMongodb, color: "#880000" },
      { name: "Sequelize", level: 70, icon: SiSequelize, color: "#52B0E7" },
    ],
  },
  {
    title: "Outils",
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
  { label: "Langages", items: ["JavaScript", "TypeScript", "PHP", "SQL"] },
  { label: "Front-End", items: ["React.js", "Next.js", "HTML5", "CSS3", "Bootstrap", "Tailwind"] },
  { label: "Back-End", items: ["Node.js", "Express.js", "NestJS", "Laravel", "REST APIs"] },
  { label: "Données", items: ["MongoDB", "MySQL", "Mongoose", "Sequelize"] },
  { label: "Outils", items: ["Git", "Docker", "Figma", "Jira", "Jest"] },
]

/* ==========================================
   Projects Data
   ========================================== */
export const projects = [
  {
    id: 1,
    title: "DIGITAL DABA – CMS E-commerce",
    kicker: "CMS E-commerce",
    quote: "« Un tableau de bord qui raconte l'activité de l'entreprise. »",
    description:
      "Conception d'un back-office complet avec dashboard dynamique et statistiques en temps réel. Personnalisation de la page d'accueil et création d'un espace client sécurisé.",
    techStack: ["Laravel", "PHP", "FilamentPHP", "MySQL", "Blade", "Bootstrap"],
    githubUrl: "https://github.com/boukadia",
    liveUrl: "#",
    featured: true,
    category: "PHP",
    status: "PHP",
    icon: Store,
    metrics: [
      { label: "Stack", value: "Laravel" },
      { label: "Technos", value: "6" },
    ],
  },
  {
    id: 2,
    title: "MediSync – Gestion Médicale",
    kicker: "Gestion Médicale",
    quote: "« Suivre les consultations sans perdre une minute. »",
    description:
      "Application interactive permettant de planifier, suivre et gérer les consultations médicales et dossiers patients avec système d'authentification.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "Bootstrap"],
    githubUrl: "https://github.com/boukadia/MediSyncFront",
    liveUrl: "#",
    featured: true,
    category: "MERN Stack",
    status: "MERN Stack",
    icon: HeartPulse,
    metrics: [
      { label: "Stack", value: "MERN" },
      { label: "Base", value: "MongoDB" },
    ],
  },
  {
    id: 3,
    title: "BudgetWise – Gestion Budgétaire",
    kicker: "Gestion Budgétaire",
    quote: "« Chaque dirham engagé, visible en un coup d'œil. »",
    description:
      "Application interactive de gestion budgétaire. Suivi des dépenses, revenus et objectifs financiers avec tableaux de bord visuels.",
    techStack: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "Sequelize", "MySQL"],
    githubUrl: "https://github.com/boukadia/gestionBudgets",
    liveUrl: "#",
    featured: true,
    category: "MERN Stack",
    status: "PHP",
    icon: ChartPie,
    metrics: [
      { label: "Stack", value: "Node.js" },
      { label: "Base", value: "MySQL" },
    ],
  },
  {
    id: 4,
    title: "NeoLearn – Plateforme E-learning",
    kicker: "Plateforme E-learning",
    quote: "« Enseigner sans interface qui fait fuir. »",
    description:
      "Développement d'une plateforme d'apprentissage en ligne interactive et personnalisée. Gestion des cours, suivi de progression et interface pédagogique intuitive pour étudiants et formateurs.",
    techStack: ["HTML", "CSS", "PHP", "Bootstrap", "MySQL"],
    githubUrl: "https://github.com/boukadia/NeoLearn",
    liveUrl: "#",
    featured: true,
    category: "PHP",
    status: "PHP",
    icon: GraduationCap,
    metrics: [
      { label: "Stack", value: "PHP" },
      { label: "Base", value: "MySQL" },
    ],
  },
  {
    id: 5,
    title: "Evento – Gestion d'Événements",
    kicker: "Gestion d'Événements",
    quote: "« Organiser, promouvoir, encaisser. »",
    description:
      "Système complet de gestion d'événements : organisation, promotion et billetterie en ligne et présentiel. Interface dynamique avec gestion des réservations et des participants.",
    techStack: ["HTML", "CSS", "JavaScript", "PHP", "Bootstrap", "PostgreSQL"],
    githubUrl: "https://github.com/boukadia/d-Eventbrite",
    liveUrl: "#",
    featured: true,
    category: "PHP",
    status: "PHP",
    icon: Ticket,
    metrics: [
      { label: "Stack", value: "PHP" },
      { label: "Base", value: "PostgreSQL" },
    ],
  },
  {
    id: 6,
    title: "UltimateTactics – Application FUT",
    kicker: "Application FUT",
    quote: "« La composition parfaite, calculée et validée. »",
    description:
      "Application de gestion d'équipe FIFA Ultimate Team. Optimisation des formations tactiques, gestion des joueurs et création de compositions d'équipe personnalisées.",
    techStack: ["HTML", "CSS", "PHP", "MySQL"],
    githubUrl: "https://github.com/boukadia/UltimateTactics",
    liveUrl: "#",
    featured: true,
    category: "PHP",
    status: "PHP",
    icon: Trophy,
    metrics: [
      { label: "Stack", value: "PHP" },
      { label: "Base", value: "MySQL" },
    ],
  },
  {
    id: 7,
    title: "AnimeVerse – Site Web Anime",
    kicker: "Site Web Anime",
    quote: "« Un univers, des personnages, une communauté. »",
    description:
      "Site web dédié à un anime avec synopsis, fiches personnages, liste des épisodes, galerie d'images, lecteur vidéo/audio OST, blog d'actualités, forum communautaire et boutique de produits dérivés. Design responsive et multilingue (FR/EN).",
    techStack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Bootstrap"],
    githubUrl: "https://github.com/boukadia/streamAnime",
    liveUrl: "#",
    featured: true,
    category: "PHP",
    status: "PHP",
    icon: Film,
    metrics: [
      { label: "Stack", value: "PHP" },
      { label: "Base", value: "MySQL" },
    ],
  },
]

/* ==========================================
   Experience Data
   ========================================== */
export const experiences = [
  {
    id: 1,
    role: "Développeur Web – Stage",
    company: "DIGITAL DABA",
    location: "Agadir",
    period: "Mai 2025 – Juillet 2025",
    description: [
      "Conception d'un back-office complet avec dashboard dynamique et statistiques en temps réel",
      "Personnalisation de la page d'accueil et création d'un espace client sécurisé",
      "Collaboration avec l'équipe via Jira pour la gestion de projet Agile",
      "Création de maquettes UI/UX avec Figma",
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
    degree: "Développeur Full Stack",
    school: "YouCode, UM6P",
    location: "Youssoufia",
    period: "2024 – 2026",
    current: true,
  },
  {
    id: 2,
    degree: "DEUG en Sciences Physiques",
    school: "Faculté des Sciences Appliquées",
    location: "Aït Melloul",
    period: "2016 – 2018",
    current: false,
  },
  {
    id: 3,
    degree: "Baccalauréat Sciences Physiques",
    school: "Lycée Qualifiant",
    location: "Aït Baha",
    period: "2016",
    current: false,
  },
]

/* ==========================================
   Soft Skills
   ========================================== */
export const softSkills = [
  "Travail en équipe",
  "Gestion du temps",
  "Apprentissage continu",
  "Adaptabilité",
  "Rigueur",
  "Sens de responsabilité",
]

/* ==========================================
   Languages
   ========================================== */
export const languages = [
  { name: "Tamazight", level: "Maternelle", percentage: 100 },
  { name: "Arabe", level: "Maternelle", percentage: 100 },
  { name: "Français", level: "A2", percentage: 40 },
  { name: "Anglais", level: "A1", percentage: 25 },
]
