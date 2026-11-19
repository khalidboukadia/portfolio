/**
 * Scénarios de la fenêtre de conversation.
 *
 * Aucun modèle, aucune API : c'est un arbre de questions предcrito, écrit
 * une fois pour le français et une fois pour l'arabe. Le visiteur répond,
 * le script enchaîne, et un résumé est produit à la fin.
 */

export const CHAT = {
  fr: {
    title: "Assistant de Mustapha",
    subtitle: "Réponses immédiates",
    open: "Ouvrir le chat",
    close: "Fermer",
    placeholder: "Écrivez votre message…",
    quick: {
      stack: "🧰 Stack",
      experience: "💼 Expérience",
      location: "📍 Localisation",
      project: "✍️ Demander un projet",
    },
    send: "Envoyer",
    bot: {
      hello:
        "Bonjour 👋 Je suis l'assistant de Mustapha. Je peux vous renseigner sur son parcours, ses compétences, ou préparer une demande de projet avec vous.",
      askName: "Avant tout — comment vous appelez-vous ?",
      nameOk: (name) => `Enchanté, ${name} 👋`,
      askIntent: "Parfait. Quel est l'objet de votre message ?",
      intents: {
        project: "Un projet à lancer",
        job: "Un poste / CDI",
        freelance: "Une mission freelance",
        collab: "Une collaboration",
        other: "Autre chose",
      },
      askBudget: "Quelle est l'enveloppe budgétaire envisagée ?",
      budgets: {
        small: "Moins de 5 000 €",
        medium: "5 000 – 15 000 €",
        large: "Plus de 15 000 €",
        unknown: "Pas encore défini",
      },
      askTimeline: "Et quel est le délai souhaité ?",
      timelines: {
        urgent: "Dès que possible",
        month: "Dans le mois",
        quarter: "Dans le trimestre",
        later: "Plus tard",
      },
      askContact: "Dernière chose : par quel canal puis-je vous répondre ?",
      contactOk: "C'est noté.",
      summary: (data) =>
        `Merci ${data.name} ! Voici ce que j'ai noté :\n• Objet : ${data.intent}\n• Budget : ${data.budget}\n• Délai : ${data.timeline}\n• Contact : ${data.contact}`,
      sendMail: "Envoyer la demande",
      sent: "Votre messagerie s'ouvre avec la demande pré-remplie.",
      startOver: "Recommencer",
      /** Réponses directes aux questions fréquentes. */
      topics: {
        stack:
          "Mustapha travaille en full stack : React, Next.js, TypeScript, Tailwind côté front, et Node.js, Express, Laravel, PHP côté back, avec MongoDB et MySQL pour les données.",
        experience:
          "Plus d'un an de développement en production, en stage chez DIGITAL DABA, plus une formation en cours à YouCode (UM6P) en développement full stack.",
        location:
          "Il est basé à Agadir, au Maroc, et travaille à distance avec des clients en France et à l'étranger.",
        availability:
          "Il est disponible pour de nouvelles opportunités : projets, missions freelance ou poste.",
        contact:
          "Écrivez directement à mustapha.boukadia97@gmail.com — chaque message est lu et traité.",
        approach:
          "Sa méthode tient en quatre temps : comprendre le problème, choisir la bonne abstraction, construire proprement, livrer.",
      },
    },
    fallback:
      "Je n'ai pas cette information précise, mais je peux vous renseigner sur son parcours, ses compétences ou préparer une demande de projet.",
    errorEmpty: "Écrivez votre message pour continuer.",
  },

  ar: {
    title: "مساعد مصطفى",
    subtitle: "ردّ فوري",
    open: "افتح المحادثة",
    close: "إغلاق",
    placeholder: "اكتب رسالتك…",
    quick: {
      stack: "🧰 التقنيات",
      experience: "💼 الخبرة",
      location: "📍 الموقع",
      project: "✍️ طلب مشروع",
    },
    send: "إرسال",
    bot: {
      hello:
        "مرحباً 👋 أنا مساعد مصطفى. يمكنني إخبارك عن مساره ومهاراته، أو تسجيل طلب مشروع معك خطوة بخطوة.",
      askName: "قبل كل شيء — ما اسمك؟",
      nameOk: (name) => `تشرّفنا، ${name} 👋`,
      askIntent: "ممتاز. ما موضوع رسالتك؟",
      intents: {
        project: "مشروع جديد",
        job: "وظيفة / دوام كامل",
        freelance: "مهمة حرّة",
        collab: "شراكة",
        other: "شيء آخر",
      },
      askBudget: "ما الميزانية التي تفكّر فيها؟",
      budgets: {
        small: "أقل من ٥٠٠٠ درهم",
        medium: "٥٠٠٠ – ١٥٠٠٠ درهم",
        large: "أكثر من ١٥٠٠٠ درهم",
        unknown: "لم تُحدَّد بعد",
      },
      askTimeline: "وما الآجال التي تريدها؟",
      timelines: {
        urgent: "في أقرب وقت",
        month: "خلال الشهر",
        quarter: "خلال الثلاث أشهر",
        later: "لاحقاً",
      },
      askContact: "آخر شيء: بأي وسيلة أردّ عليك؟",
      contactOk: "سجّلتها.",
      summary: (data) =>
        `شكراً ${data.name}! 이것 ما سجّلته:\n• الموضوع: ${data.intent}\n• الميزانية: ${data.budget}\n• الآجال: ${data.timeline}\n• للتواصل: ${data.contact}`,
      sendMail: "إرسال الطلب",
      sent: "فُتح برنامج البريد عندك والطلب جاهز.",
      startOver: "البدء من جديد",
      topics: {
        stack:
          "مصطفى يشتغل full stack: React و Next.js و TypeScript و Tailwind في الواجهة، و Node.js و Express و Laravel و PHP في الخادم، مع MongoDB و MySQL للبيانات.",
        experience:
          "أكثر من سنة من التطوير في بيئة الإنتاج، تدريب في DIGITAL DABA، وتكوين مستمر في YouCode (UM6P) كتطوير full stack.",
        location:
          "هو مقرّه في أكادير بالمغرب، ويشتغل عن بُعد مع زبائن في فرنسا وخارجها.",
        availability:
          "هو متاح لفرص جديدة: مشاريع، مهام حرّة، أو توظيف.",
        contact:
          "راسل مباشرة على mustapha.boukadia97@gmail.com — كل رسالة تُقرأ وتُعالَج.",
        approach:
          "منهجيته في أربع مراحل: أفهم المشكل، أختار التجريد المناسب، أبني باحتراف، وأسلّم.",
      },
    },
    fallback:
      "لا تتوفّر لديّ هذه المعلومة بالضبط، لكن يمكنني إخبارك بالمسار أو المهارات أو تسجيل طلب مشروع معك.",
    errorEmpty: "اكتب رسالتك باش نكمل.",
  },
}

export default CHAT
