# Portfolio — Mustapha Boukadia

Portfolio personnel de **Mustapha Boukadia**, développeur Full Stack (MERN & Laravel),
construit avec React 19, Vite, Tailwind CSS et Framer Motion.

> Le design s'inspire de l'esthétique éditoriale de
> [ullaskunder.com](https://www.ullaskunder.com/) : fond papier chaud, typographie
> display XXL, accents cramoisi, rail de navigation vertical et mise en page
> « magazine ».

---

## Stack

| Outil | Usage |
| --- | --- |
| React 19 | UI |
| Vite 6 | Build / dev server |
| Tailwind CSS 3.4 | Design system (tokens dans `tailwind.config.js`) |
| Framer Motion | Animations d'entrée, reveals au scroll |
| react-icons | Icônes |
| EmailJS | Formulaire de contact |
| lucide-react | Icônes au trait (style du site de référence) |

## Design system

| Token | Valeur | Rôle |
| --- | --- | --- |
| `paper` | `#F8F8F6` | Fond principal, blanc chaud |
| `ink` | `#111111` | Texte principal |
| `ink-mute` | `#6B7280` | Texte secondaire |
| `ink-faint` | `#9CA3AF` | Labels, méta |
| `crimson` | `#B00020` | Accent éditorial (labels, chiffres, puces) |
| `hair` | `rgba(0,0,0,.08)` | Filets 1px |
| `amber` | `#FCD34D` | Bandeau de soutien |

Typographie : **Plus Jakarta Sans** (display), **Playfair Display** (serif italique
d accents), **Azeret Mono** (labels mono en capitales espacées).

## Structure

```
src/
├─ App.jsx                    # Assemblage des sections
├─ index.css                  # Base + classes réutilisables (.shell, .btn-dark, .chip…)
├─ components/
│  ├─ common/                 # Rail, Button, Footer, Reveal, SectionHead
│  └─ sections/               # Hero, Showcase, Beliefs, Approach, Skills,
│                             # Projects, Journey, Contact
├─ data/portfolioData.js      # Tout le contenu (FR)
├─ lib/motion.js              # Vocabulaire d’animations (springs)
└─ utils/helpers.js           # Scroll fluide, validation
```

## Sections

1. **Bandeau d'activité** — projets / stacks / langues
2. **Hero** — display XXL, CTA, cartes flottantes
3. **Showcase** — les deux projets vedettes (fiche produit centrée)
4. **Convictions** — liste numéromérate en chiffres romains
5. **Approche d'ingénierie** — 4 principes
6. **Parcours & Stack** — récit + grille de capacités
7. **Systèmes construits** — fiches numérotées des 7 projets + index filtrable
8. **Le chemin parcouru** — expérience, formation, soft skills, langues
9. **Contact** — formulaire EmailJS + coordonnées
10. **Footer** — bandeau de soutien, index, watermark « créer. »

## Commandes

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # build de production dans dist/
npm run preview   # prévisualisation du build
```

## Contact — variables d'environnement

Créez un fichier `.env` à la racine (voir `src/config/emailjs.example.js`) :

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

Ces variables sont déjà câblées dans le workflow GitHub Pages
(`.github/workflows/pages.yml`) via les secrets du dépôt.

## Déploiement

Le site est publié automatiquement sur **GitHub Pages** à chaque push sur `main`.
L'URL suit la forme `https://khalidboukadia.github.io/port/`.
