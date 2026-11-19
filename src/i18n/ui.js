/**
 * Textes d'interface — hors données de contenu (celles-ci vivent dans
 * src/data/portfolioData*.js). Chaque clé existe dans les deux langues.
 */
export const UI = {
  fr: {
    langSwitchLabel: "Passer en arabe",
    langSwitchAria: "Changer de langue",
    themeSwitchLabel: "Basculer entre thème sombre et clair",

    /* Hero */
    heroLede:
      "Conception et développement d'applications web rapides, scalables et performantes — de l'idée au déploiement, sans jamais sacrifier la qualité.",
    heroTitleLine1: "D'idée",
    heroTitleLine2: "à produit live.",
    heroActivityTitle: "Activité & livraisons",
    heroActivity: "Commits publics et rythme de livraison.",
    heroCityYear: "Agadir · 2026",
    heroCta: "Me contacter",
    heroCtaGhost: "CV",
    heroConsole: [
      ["$ npm run dev", "✓ Vite prêt sur localhost:3000", "rechargement à chaud actif"],
      ["$ npm run build", "✓ build terminé", "dist/ prêt pour le déploiement"],
      ["$ php artisan migrate", "✓ migrations appliquées", "schéma à jour"],
      ["$ git push origin main", "✓ workflow GitHub Pages lancé", "khalidboukadia.github.io/port"],
    ],

    /* 3D */
    spinHint: "Cliquez pour pivoter",
    consoleLabel: "terminal",

    /* Beliefs */
    beliefsKicker: "Principes",
    beliefsTitle: "Convictions",
    beliefsLede:
      "Les règles simples qui guident chaque projet, du premier croquis d'architecture jusqu'à la mise en production.",

    /* Approach */
    approachKicker: "Méthode de travail",
    approachTitle: "L'approche",
    approachLede:
      "Une méthode en quatre temps : comprendre, choisir, construire, livrer — sans jargon inutile.",
    approachSteps: ["Comprendre", "Choisir", "Construire", "Livrer"],

    /* Skills */
    skillsSerif: "Duonan",
    skillsTitleLine1: "De la curiosité",
    skillsTitleLine2: "au métier.",
    skillsText:
      "Mon parcours n'est pas une ligne droite. Il a été porté par l'envie de relever des défis : construire des applications visuellement soignées avec React, puis creuser des architectures serveur solides avec Node.js et PHP.",
    skillsCardKicker: "Échelle & systèmes",
    skillsCardText:
      "Unir la qualité du front-end à la performance du back-end pour livrer des produits complets, de bout en bout.",
    skillsCapsTitle: "Capacités & technologies",
    skillsCapsText:
      "Une stack structurée de langages, frameworks et outils, utilisée pour livrer des systèmes fiables.",
    skillsSignature: "Je construis avec",
    skillsSignatureEnd: "—",

    /* Projects */
    projectsKicker: "Projets clients & personnels",
    projectsTitle: "Projets réalisés.",
    projectsLede:
      "Deux projets qui portent l'identité, puis le reste des systèmes livrés — du back-office e-commerce à la gestion médicale.",
    projectRepo: "Voir le dépôt",
    projectsMoreNote:
      "Une sélection de projets — le reste, expérimentations comprises, vit sur GitHub.",
    projectsGithubCta: "Tout voir sur GitHub",
    projectDemo: "Démo en ligne",
    projectSystem: "Système",
    projectAll: "Tous",
    indexKicker: "Index · Tous les projets",
    indexTitle: "Vue d'ensemble.",
    indexLede: "Les mêmes projets, listés — filtrables par technologie.",
    indexCount: "projets",

    /* Journey */
    journeyKicker: "Parcours · Expérience & formation",
    journeyTitle: "Le chemin parcouru.",
    journeyLede:
      "Un stage en production, une formation continue et beaucoup de projets livrés — c'est ce qui forge un développeur.",
    journeyExperience: "Expérience professionnelle",
    journeyEducation: "Formation académique",
    journeyInProgress: "En cours",
    journeySoftSkills: "Soft skills",
    journeyLanguages: "Langues",

    /* Motion */
    motionKicker: "Art & mouvement",
    motionTitleLine1: "L'interface fait partie",
    motionTitleLine2: "du produit.",
    motionText:
      "Chaque écran est traité comme une pièce d'atelier : hiérarchie claire, mouvement mesuré, aucune animation gratuite. Le soin visuel n'est pas une couche à la fin — c'est une exigence de conception.",
    motionTags: ["Hiérarchie", "Typographie", "Mouvement", "Performance", "Accessibilité"],

    /* Contact */
    contactCtaText:
      "Une idée qui mérite d'exister ? Discutons du périmètre, du budget et des échéances.",
    contactCta: "Me contacter",
    contactSerif: "Parlons-en",
    contactTitle: "Un projet en tête ?",
    contactText:
      "Je réponds généralement sous 24 heures. Une idée claire suffit pour démarrer — on affine le reste ensemble.",
    contactEmail: "Email",
    contactPhone: "Téléphone",
    contactLocation: "Localisation",
    contactAvailable: "Disponible pour de nouvelles opportunités",
    formName: "Nom complet",
    formNamePlaceholder: "Votre nom",
    formEmail: "Email",
    formEmailPlaceholder: "vous@email.com",
    formSubject: "Sujet",
    formSubjectPlaceholder: "Sujet du message",
    formMessage: "Message",
    formMessagePlaceholder: "Votre message...",
    formSend: "Envoyer le message",
    formSending: "Envoi...",
    formSuccess: "Message envoyé — je vous réponds très vite.",
    formErrorEmpty: "Veuillez remplir tous les champs",
    formErrorSend: "Erreur d'envoi",
    formPrivacy: "Vos informations restent confidentielles.",
    contactPressKicker: "Questions, idées ou presse ?",
    contactPressTitle: "Écrivez directement.",
    contactPressLede: "Un vrai personne lit chaque message.",
    contactCopy: "Copier",
    contactCopied: "Copié",
    contactPressFoot: "ou écrivez sur les réseaux — réponse sous 24 h.",

    /* Footer */
    footerWatermark: "créer.",
    footerTagline: "Pas de templates. Du code propre.",
    footerDesc:
      "Développeur full stack passionné par des applications web modernes, lisibles et performantes.",
    footerIndex: "Index",
    footerPhone: "الهاتف",
    footerContact: "Contact",
    footerStack: "React · Tailwind · Framer Motion",
    footerTop: "Haut de page",
    footerCredit: "Conçu & développé à",

    /* Rail */
    ariaBackTop: "Retour en haut",
    ariaOpenMenu: "Ouvrir le menu",
    menuLabel: "Menu",
    ariaCloseMenu: "Fermer le menu",
    ariaNav: "Navigation",
    ariaIndex: "Index du site",
  },

  ar: {
    langSwitchLabel: "التحويل إلى الفرنسية",
    langSwitchAria: "تغيير اللغة",
    themeSwitchLabel: "التبديل بين المظهر الداكن والفاتح",

    /* Hero */
    heroLede:
      "تصميم وتطوير تطبيقات ويب سريعة وقابلة للتوسّع وعالية الأداء — من الفكرة إلى النشر، دون أن نتنازل عن الجودة أبداً.",
    heroTitleLine1: "من فكرة",
    heroTitleLine2: "إلى منتج حيّ.",
    heroActivityTitle: "النشاط والتسليمات",
    heroActivity: "إيداعات عامةٌ وإيقاع التسليم.",
    heroCityYear: "أكادير · ٢٠٢٦",
    heroCta: "تواصل معي",
    heroCtaGhost: "السيرة الذاتية",
    heroConsole: [
      ["$ npm run dev", "✓ Vite جاهز على localhost:3000", "إعادة التحميل الفوري مفعّلة"],
      ["$ npm run build", "✓ تمّ بناء المشروع", "dist/ جاهز للنشر"],
      ["$ php artisan migrate", "✓ تمّ تطبيق الترحيلات", "قاعدة البيانات محدّثة"],
      ["$ git push origin main", "✓ تمّ تشغيل مسار GitHub Pages", "khalidboukadia.github.io/port"],
    ],

    /* 3D */
    spinHint: "اضغط للتدوير",
    consoleLabel: "طرفية",

    /* Beliefs */
    beliefsKicker: "المبادئ",
    beliefsTitle: "القناعات",
    beliefsLede:
      "قواعد بسيطة تقود كل مشروع، من أول مخطط معماري حتى النشر في الإنتاج.",

    /* Approach */
    approachKicker: "طريقة العمل",
    approachTitle: "المنهجية",
    approachLede:
      "منهجية من أربع مراحل: أفهم، أختار، أبني، أسلّم — دون مصطلحات زائدة.",
    approachSteps: ["أفهم", "أختار", "أبني", "أسلّم"],

    /* Skills */
    skillsSerif: "المسار",
    skillsTitleLine1: "من الفضول",
    skillsTitleLine2: "إلى المهنة.",
    skillsText:
      "مساري لم يكن خطاً مستقيماً. حمله اشتياق رفع المستويات: بناء تطبيقات مصقولة بصرياً بـ React، ثم التعمّق في معماريات خادم متينة بـ Node.js و PHP.",
    skillsCardKicker: "التوسّع والأُسس",
    skillsCardText:
      "الجمع بين جودة الواجهة وأداء الخادم لتسليم منتجات متكاملة من البداية إلى النهاية.",
    skillsCapsTitle: "القدرات والتقنيات",
    skillsCapsText:
      "منظومة منظّمة من اللغات والأطر والأدوات، تُستعمل لتسليم أنظمة موثوقة.",
    skillsSignature: "أبني مع",
    skillsSignatureEnd: "—",

    /* Projects */
    projectsKicker: "مشاريع الزبائن والشخصية",
    projectsTitle: "مشاريع منجزة.",
    projectsLede:
      "مشروعان يحملان الهوية، ثم بقية الأنظمة المسلّمة — من لوحة إدارة المتجر الإلكتروني إلى تدبير الاستشارات الطبية.",
    projectRepo: "عرض المستودع",
    projectsMoreNote:
      "هذه مشاريع مختارة — بقية المشاريع والتجارب موجودة على GitHub.",
    projectsGithubCta: "عرض الكل على GitHub",
    projectDemo: "نسخة حية",
    projectSystem: "نظام",
    projectAll: "الكل",
    indexKicker: "الفهرس · كل المشاريع",
    indexTitle: "نظرة عامة.",
    indexLede: "المشاريع نفسها، معروضة كقائمة — قابلة للتصفية حسب التقنية.",
    indexCount: "مشاريع",

    /* Journey */
    journeyKicker: "المسار · الخبرة والتكوين",
    journeyTitle: "الطريق المُقطع.",
    journeyLede:
      "تدريب في بيئة الإنتاج، تكوين مستمر، وكثير من المشاريع المسلّمة — هي ما يصنع المطوّر.",
    journeyExperience: "الخبرة المهنية",
    journeyEducation: "التكوين الأكاديمي",
    journeyInProgress: "قيد التكوين",
    journeySoftSkills: "المهارات الشخصية",
    journeyLanguages: "اللغات",

    /* Motion */
    motionKicker: "فنّ وحركة",
    motionTitleLine1: "الواجهة جزء",
    motionTitleLine2: "من المنتج.",
    motionText:
      "كل شاشة تُعامَل كقطعة ورشة: تسلسل بصري واضح، حركة موزونة، ولا حركة مجانية. العناية البصرية ليست طبقة تُضاف في النهاية — بل شرط في التصميم.",
    motionTags: ["التسلسل البصري", "الطباعة", "الحركة", "الأداء", "إتاحة الوصول"],

    /* Contact */
    contactCtaText:
      "فكرة تستحق الوجود؟ لنتحدّث عن النطاق والميزانية والآجال.",
    contactCta: "تواصل معي",
    contactSerif: "لنتحدّث",
    contactTitle: "مشروع في ذهنك؟",
    contactText:
      "أردّ عادةً خلال ٢٤ ساعة. فكرة واضحة تكفي للبدء — والباقي نضبطه معاً.",
    contactEmail: "البريد الإلكتروني",
    contactPhone: "الهاتف",
    contactLocation: "الموقع",
    contactAvailable: "متاح لفرص جديدة",
    formName: "الاسم الكامل",
    formNamePlaceholder: "اسمك",
    formEmail: "البريد الإلكتروني",
    formEmailPlaceholder: "you@email.com",
    formSubject: "الموضوع",
    formSubjectPlaceholder: "موضوع الرسالة",
    formMessage: "الرسالة",
    formMessagePlaceholder: "رسالتك...",
    formSend: "إرسال الرسالة",
    formSending: "جارٍ الإرسال...",
    formSuccess: "تمّ إرسال الرسالة — سأجيبك بسرعة.",
    formErrorEmpty: "يرجى ملء جميع الحقول",
    formErrorSend: "خطأ في الإرسال",
    formPrivacy: "معلوماتك تبقى سرّية.",
    contactPressKicker: "أسئلة، أفكار أو صحافة؟",
    contactPressTitle: "راسل مباشرة.",
    contactPressLede: "شخص حقيقي يقرأ كل رسالة.",
    contactCopy: "نسخ",
    contactCopied: "تمّ النسخ",
    contactPressFoot: "أو راسلني على الشبكات — الردّ في أقل من ٢٤ ساعة.",

    /* Footer */
    footerWatermark: "أنشئ.",
    footerTagline: "لا قوالب جاهزة. كود نظيف.",
    footerDesc:
      "مطوّر full stack شغوف بتطبيقات ويب حديثة وواضحة وسريعة.",
    footerIndex: "الفهرس",
    footerPhone: "الهاتف",
    footerContact: "التواصل",
    footerStack: "React · Tailwind · Framer Motion",
    footerTop: "أعلى الصفحة",
    footerCredit: "صُمّم وطُوِّر في",

    /* Rail */
    ariaBackTop: "العودة إلى الأعلى",
    ariaOpenMenu: "فتح القائمة",
    menuLabel: "القائمة",
    ariaCloseMenu: "إغلاق القائمة",
    ariaNav: "التنقّل",
    ariaIndex: "فهرس الموقع",
  },
}

export default UI
