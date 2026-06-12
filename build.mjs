import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const siteRoot = path.resolve("/Users/thomasdesorgeris/Desktop/site(new)");
const documentsRoot = path.join(siteRoot, "documents");

const mainNav = [
  { href: "index.html", label: "Accueil" },
  { href: "lycee.html", label: "Lycée" },
  { href: "mes-mathematiques.html", label: "Mes mathématiques" },
  { href: "prepa.html", label: "Classes préparatoires" },
  { href: "agregation.html", label: "Agrégation" },
  { href: "divers.html", label: "Divers" },
];

const quickLinks = {
  lycee: [
    { href: "seconde.html", label: "Seconde" },
    { href: "premiere-specialite.html", label: "Première spécialité" },
    { href: "terminale-specialite.html", label: "Terminale spécialité" },
    { href: "mathematiques-expertes.html", label: "Mathématiques expertes" },
  ],
  mesMathematiques: [
    { href: "vers-le-sup.html", label: "Vers le Sup'" },
    { href: "varia-mathematica.html", label: "Varia Mathematica" },
  ],
  prepa: [
    { href: "generateur-kholle.html", label: "Générateur de khôlle" },
    { href: "connais-tu-ton-cours.html", label: "Connais-tu ton cours ?" },
  ],
  agregation: [
    { href: "developpements.html", label: "Développements" },
    { href: "lecons.html", label: "Leçons" },
    { href: "preparation-ecrits.html", label: "Préparation aux écrits" },
  ],
};

const navChildren = {
  "lycee.html": quickLinks.lycee,
  "mes-mathematiques.html": quickLinks.mesMathematiques,
  "prepa.html": quickLinks.prepa,
  "agregation.html": quickLinks.agregation,
  "divers.html": [{ href: "liens-utiles.html", label: "Liens utiles" }],
};

const sidebarProfiles = [
  {
    image: "images/gromov.jpg",
    alt: "Portrait de Mikhaïl GROMOV",
    name: "Mikhaïl GROMOV",
    bio: "Mathématicien franco-russe de la fin du XXe siècle et du début du XXIe siècle, connu pour ses travaux en géométrie; ses espaces hyperboliques mesurent la courbure à grande échelle.",
  },
  {
    image: "images/alkhwarizmi.png",
    alt: "Portrait d'Al KHWARIZMI",
    name: "Al KHWARIZMI",
    bio: "Mathématicien persan du IXe siècle, connu pour ses travaux en algèbre; son traité systématise la résolution des équations.",
  },
  {
    image: "images/burnside.jpeg",
    alt: "Portrait de William BURNSIDE",
    name: "William BURNSIDE",
    bio: "Mathématicien britannique de la fin du XIXe siècle et du début du XXe siècle, connu pour ses travaux en théorie des groupes finis et leurs symétries.",
  },
  {
    image: "images/cayley.jpg",
    alt: "Portrait d'Arthur CAYLEY",
    name: "Arthur CAYLEY",
    bio: "Mathématicien britannique du XIXe siècle, connu pour ses travaux en algèbre; Cayley-Hamilton relie matrices et polynômes.",
  },
  {
    image: "images/erdos.webp",
    alt: "Portrait de Paul ERDŐS",
    name: "Paul ERDŐS",
    bio: "Mathématicien hongrois du XXe siècle, connu pour ses travaux en combinatoire; la méthode probabiliste prouve l'existence sans construire.",
  },
  {
    image: "images/fermat.jpg",
    alt: "Portrait de Pierre de Fermat",
    name: "Pierre de Fermat",
    bio: "Mathématicien français du XVIIe siècle, connu pour ses travaux en arithmétique; son dernier théorème interdit certaines puissances entières.",
  },
  {
    image: "images/frobenius.jpg",
    alt: "Portrait de Ferdinand Georg FROBENIUS",
    name: "Ferdinand Georg FROBENIUS",
    bio: "Mathématicien allemand de la fin du XIXe siècle et du début du XXe siècle, connu pour ses travaux en algèbre; les représentations linéarisent les symétries.",
  },
  {
    image: "images/galois.jpg",
    alt: "Portrait d'Évariste GALOIS",
    name: "Évariste GALOIS",
    bio: "Mathématicien français du XIXe siècle, connu pour ses travaux en algèbre; sa théorie relie équations polynomiales et symétries.",
  },
  {
    image: "images/germain.jpg",
    alt: "Portrait de Sophie GERMAIN",
    name: "Sophie GERMAIN",
    bio: "Mathématicienne française de la fin du XVIIIe siècle et du début du XIXe siècle, connue pour ses travaux en arithmétique et sur le dernier théorème de Fermat.",
  },
  {
    image: "images/godel.avif",
    alt: "Portrait de Kurt GÖDEL",
    name: "Kurt GÖDEL",
    bio: "Mathématicien austro-américain du XXe siècle, connu pour ses travaux en logique; l'incomplétude révèle les limites des systèmes formels.",
  },
  {
    image: "images/grothendieck.jpg",
    alt: "Portrait d'Alexandre GROTHENDIECK",
    name: "Alexandre GROTHENDIECK",
    bio: "Mathématicien français du XXe siècle, connu pour ses travaux en géométrie algébrique; les schémas unifient équations et espaces.",
  },
  {
    image: "images/kiyoshi.jpg",
    alt: "Portrait d'Itō KIYOSHI",
    name: "Itō KIYOSHI",
    bio: "Mathématicien japonais du XXe siècle, connu pour ses travaux en probabilités; le lemme d'Itō fonde le calcul aléatoire continu.",
  },
  {
    image: "images/lie.jpg",
    alt: "Portrait de Marius Sophus LIE",
    name: "Marius Sophus LIE",
    bio: "Mathématicien norvégien du XIXe siècle, connu pour ses travaux en géométrie; les groupes de Lie décrivent des symétries continues.",
  },
  {
    image: "images/noether.webp",
    alt: "Portrait d'Emmy NOETHER",
    name: "Emmy NOETHER",
    bio: "Mathématicienne allemande du XXe siècle, connue pour ses travaux en algèbre; son théorème relie symétries et lois de conservation.",
  },
  {
    image: "images/serre.jpg",
    alt: "Portrait de Jean-Pierre SERRE",
    name: "Jean-Pierre SERRE",
    bio: "Mathématicien français de la fin du XXe siècle et du début du XXIe siècle, connu pour ses travaux en topologie, géométrie algébrique et arithmétique.",
  },
  {
    image: "images/shimura.webp",
    alt: "Portrait de Gorō SHIMURA",
    name: "Gorō SHIMURA",
    bio: "Mathématicien japonais de la fin du XXe siècle et du début du XXIe siècle, connu pour ses travaux en formes modulaires et les liens entre courbes elliptiques et arithmétique.",
  },
  {
    image: "images/yutaka.jpeg",
    alt: "Portrait de Yutaka TANIYAMA",
    name: "Yutaka TANIYAMA",
    bio: "Mathématicien japonais du XXe siècle, connu pour ses travaux en théorie des nombres; sa conjecture relie courbes elliptiques et formes modulaires.",
  },
];

const pageThemes = {
  "seconde.html": "royal",
  "seconde-cours.html": "royal",
  "seconde-evaluations.html": "royal",
  "seconde-snt.html": "royal",
  "mes-mathematiques.html": "anthracite",
  "vers-le-sup.html": "orange",
  "varia-mathematica.html": "anthracite",
  "premiere-specialite.html": "violet",
  "terminale-specialite.html": "green",
  "mathematiques-expertes.html": "orange",
};

const chapterTitleMaps = {
  seconde: {
    chapitre1: "Calcul numérique et littéral",
    chapitre2: "Les ensembles",
    chapitre3: "Équations et inéquations",
    chapitre4: "Géométrie de base",
    chapitre5: "Généralités sur les fonctions",
    chapitre6: "Point de vue géométrique des vecteurs",
    chapitre7: "Informations chiffrées",
    chapitre8: "Probabilités",
    chapitre9: "Point de vue algébrique des vecteurs",
    chapitre10: "Fonctions de référence",
    chapitre11: "Statistiques",
    chapitre12: "Droites et systèmes",
    chapitre13: "Arithmétique",
    chapitre14: "Valeur absolue",
    chapitre15: "Géométrie plane",
    chapitre16: "Échantillonnage",
  },
  "seconde/snt": {
    chapitre1: "Initiation à l'algorithmique",
    chapitre2: "Les fonctions en Python",
    chapitre3: "Boucles",
    chapitre4: "Les structures conditionnelles",
  },
  premierespe: {
    chapitre1: "Polynôme du second degré",
    chapitre2: "Généralités sur les suites",
    chapitre3: "Équations du second degré",
    chapitre4: "Du nombre dérivé à la fonction dérivée",
    chapitre5: "Probabilités conditionnelles",
    chapitre6: "Suites arithmétiques et géométriques",
    chapitre7: "Applications de la fonction dérivée",
    chapitre8: "Trigonométrie",
    chapitre9: "Variables aléatoires",
    chapitre10: "Fonction exponentielle",
    chapitre11: "Géométrie repérée",
  },
  mathsexp: {
    chapitre1: "Point de vue algébrique des nombres complexes",
    chapitre2: "Arithmétique modulaire",
    chapitre3: "Point de vue géométrique des nombres complexes",
    chapitre4: "Calcul matriciel",
    chapitre5: "PGCD - PPCM et leurs applications",
    chapitre6: "Ensemble des matrices carrées",
    chapitre7: "Nombres premiers",
    chapitre8: "Nombres complexes 3...",
    chapitre9: "Applications des matrices",
    chapitre10: "Graphes",
  },
};

const usefulLinks = [
  {
    title: "Sites d'autres collègues",
    items: [
      {
        href: "https://ysamut.fr",
        label: "M. Youri SAMUT",
        text: "Site riche pour le lycée, la prépa et l'entraînement oral.",
      },
    ],
  },
  {
    title: "Exercices et entraînement",
    items: [
      {
        href: "https://www.mathraining.be",
        label: "Mathraining",
        text: "Résolution de problèmes et progression guidée.",
      },
      {
        href: "http://exo7.emath.fr",
        label: "Exo7",
        text: "Cours, exercices et compléments de licence.",
      },
      {
        href: "https://www.bibmath.net/index.php",
        label: "Bibm@th",
        text: "Fiches, exercices et ressources de l'enseignement supérieur.",
      },
      {
        href: "https://agreg-maths.fr",
        label: "Agreg-maths",
        text: "Référence utile pour les plans, développements et tirages.",
      },
    ],
  },
  {
    title: "Outils de calcul et de visualisation",
    items: [
      {
        href: "https://www.numworks.com/fr/emulateur/",
        label: "Émulateur NumWorks",
        text: "Émulateur de calculatrice en ligne.",
      },
      {
        href: "https://www.geogebra.org/classic?lang=fr",
        label: "GeoGebra",
        text: "Géométrie dynamique, visualisation et calcul formel.",
      },
      {
        href: "https://www.wolframalpha.com",
        label: "Wolfram Alpha",
        text: "Vérifications rapides et exploration d'exemples.",
      },
      {
        href: "https://basthon.fr",
        label: "Basthon",
        text: "Python, SQL et OCaml directement dans le navigateur.",
      },
    ],
  },
  {
    title: "Ressources institutionnelles",
    items: [
      {
        href: "https://eduscol.education.gouv.fr/4509/mathematiques",
        label: "Eduscol",
        text: "Programmes officiels et ressources d'accompagnement.",
      },
      {
        href: "https://sembat-seguin.ent.auvergnerhonealpes.fr",
        label: "Site du lycée",
        text: "Informations générales de l'établissement.",
      },
    ],
  },
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function toHref(...parts) {
  return parts.map((part) => encodeURIComponent(part)).join("/");
}

function slugify(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function titleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function chapterNumberFromName(value) {
  const match = String(value).toLowerCase().match(/^chapitre\s*(\d+)/i);
  return match ? Number(match[1]) : null;
}

function canonicalChapterKey(value) {
  const chapterNumber = chapterNumberFromName(value);
  if (chapterNumber !== null) {
    return `chapitre${chapterNumber}`;
  }
  return slugify(value);
}

function normalizeMapKey(value) {
  return String(value).split(path.sep).join("/");
}

function humanizeWords(value) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function prettifySegment(segment) {
  const clean = segment.replace(/\.[^.]+$/, "");
  if (clean === ".DS_Store") return "";
  if (/^chapitre\s*(\d+)$/i.test(clean)) {
    return `Chapitre ${clean.match(/^chapitre\s*(\d+)$/i)[1]}`;
  }
  if (/^chapitre(\d+)$/i.test(clean)) {
    return `Chapitre ${clean.match(/^chapitre(\d+)$/i)[1]}`;
  }
  if (/^eval[_-]?(\d+)$/i.test(clean)) {
    return `Évaluation ${clean.match(/^eval[_-]?(\d+)$/i)[1]}`;
  }
  if (/^ds[_-]?(\d+)$/i.test(clean)) {
    return `DS ${clean.match(/^ds[_-]?(\d+)$/i)[1]}`;
  }
  if (/^e\.cours(\d+)?$/i.test(clean)) {
    const match = clean.match(/^e\.cours(\d+)?$/i);
    return match[1] ? `Version élève ${match[1]}` : "Version élève";
  }
  if (/^p\.cours(\d+)?$/i.test(clean)) {
    const match = clean.match(/^p\.cours(\d+)?$/i);
    return match[1] ? `Version complète ${match[1]}` : "Version complète";
  }
  if (/^corrige/i.test(clean)) return clean.replace(/[-_]/g, " ");
  if (clean === "agenda") return "Agenda";
  if (clean === "automatismes") return "Automatismes";
  if (clean === "bonus") return "Bonus";
  if (clean === "evaluations") return "Évaluations";
  if (clean === "snt") return "SNT";
  if (clean === "verslesup") return "Vers le Sup'";
  if (clean === "dev:fact") return "Développement et factorisation";
  if (clean === "cahiervacances") return "Cahier de vacances";
  if (clean === "eval_auto") return "Évaluation automatismes";
  return titleCase(humanizeWords(clean));
}

function categoryLabelForFile(filename) {
  const clean = filename.replace(/\.[^.]+$/, "");
  if (/^e\.cours/i.test(clean)) return "Cours";
  if (/^p\.cours/i.test(clean)) return "Cours";
  if (/^eval/i.test(clean) || /^ds/i.test(clean)) return "Évaluation";
  if (/corrig/i.test(clean)) return "Corrigé";
  if (/agenda/i.test(clean)) return "Agenda";
  return "Document";
}

function linkTarget(relativePath) {
  return relativePath.split(path.sep).map((segment) => encodeURIComponent(segment)).join("/");
}

function sortEntries(entries) {
  const rank = (entry) => {
    const name = entry.name.toLowerCase();
    if (name === "agenda" || name === "agenda.pdf") return 0;
    if (name === "automatismes") return 1;
    if (name === "bonus") return 2;
    if (name === "evaluations") return 3;
    if (name === "snt") return 4;
    if (name === "verslesup") return 5;
    if (name.startsWith("chapitre")) return 6;
    return 7;
  };

  return [...entries].sort((a, b) => {
    const rankDiff = rank(a) - rank(b);
    if (rankDiff !== 0) return rankDiff;
    const aChapter = chapterNumberFromName(a.name);
    const bChapter = chapterNumberFromName(b.name);
    if (aChapter !== null && bChapter !== null && aChapter !== bChapter) {
      return aChapter - bChapter;
    }
    return a.name.localeCompare(b.name, "fr", { numeric: true, sensitivity: "base" });
  });
}

function readDirectory(relativeDir) {
  const absoluteDir = path.join(documentsRoot, relativeDir);
  if (!existsSync(absoluteDir)) return null;

  const entries = sortEntries(
    readdirSync(absoluteDir)
      .filter((name) => name !== ".DS_Store")
      .map((name) => {
        const absolutePath = path.join(absoluteDir, name);
        const isDirectory = statSync(absolutePath).isDirectory();
        return {
          name,
          isDirectory,
          relativePath: path.join(relativeDir, name),
        };
      }),
  );

  const files = entries.filter((entry) => !entry.isDirectory);
  const directories = entries.filter((entry) => entry.isDirectory);

  return { files, directories };
}

function renderFileList(files) {
  if (!files.length) return "";

  return `
    <div class="resource-list">
      ${files
        .map((file) => {
          const label = escapeHtml(prettifySegment(file.name));
          const category = escapeHtml(categoryLabelForFile(file.name));
          const href = linkTarget(path.join("documents", file.relativePath));
          return `
            <a class="resource-link" href="${href}">
              <span class="resource-link-label">${label}</span>
              <span class="resource-link-meta">${category}</span>
            </a>
          `;
        })
        .join("")}
    </div>
  `;
}

function isChapterDir(name) {
  return /^chapitre/i.test(name);
}

function chapterMeta(mapKey, dirName) {
  const chapterNumber = chapterNumberFromName(dirName);
  const defaultTitle = prettifySegment(dirName);
  const titles = chapterTitleMaps[normalizeMapKey(mapKey)] || {};
  const title = titles[canonicalChapterKey(dirName)] || defaultTitle;
  return {
    label: chapterNumber !== null ? `Chapitre ${chapterNumber}` : defaultTitle,
    title,
    hasDistinctTitle: title !== defaultTitle,
  };
}

function bucketLabel(key) {
  if (key === "course") return "Cours";
  return "Autres";
}

function anchorIdFromParts(...parts) {
  return parts
    .map((part) => slugify(part))
    .filter(Boolean)
    .join("-");
}

function splitResourceBuckets(files) {
  const buckets = {
    course: [],
    other: [],
  };

  for (const file of files) {
    const name = file.name.toLowerCase();
    if (/^(e|p)\.cours/i.test(name) || /diapo|slide|presentation|présentation/i.test(name)) {
      buckets.course.push(file);
    } else {
      buckets.other.push(file);
    }
  }

  return buckets;
}

function renderCompactLinks(files, options = {}) {
  const { anchorPrefix = "" } = options;
  if (!files.length) {
    return `<p class="empty-note">Aucun document dans cette rubrique.</p>`;
  }

  return `
    <div class="resource-list compact">
      ${files
        .map((file, index) => {
          const label = escapeHtml(prettifySegment(file.name));
          const category = escapeHtml(categoryLabelForFile(file.name));
          const href = linkTarget(path.join("documents", file.relativePath));
          const anchorId = anchorPrefix ? `${anchorPrefix}-${anchorIdFromParts(file.name || String(index + 1))}` : "";
          const link = `
            <a class="resource-link" href="${href}">
              <span class="resource-link-label">${label}</span>
              <span class="resource-link-meta">${category}</span>
            </a>
          `;
          return anchorId ? `<div class="resource-link-row" id="${escapeHtml(anchorId)}">${link}</div>` : link;
        })
        .join("")}
    </div>
  `;
}

function renderDisclosure(title, files, options = {}) {
  return `
    <details class="resource-disclosure">
      <summary class="resource-summary">
        <span>${escapeHtml(title)}</span>
        <span class="resource-summary-glyph">⌄</span>
      </summary>
      <div class="resource-disclosure-body">
        ${renderCompactLinks(files, options)}
      </div>
    </details>
  `;
}

function versLeSupDocumentLabel(filename) {
  const clean = filename.replace(/\.[^.]+$/, "").toLowerCase();
  if (/^e\.cours/.test(clean)) return "Élève";
  if (/^p\.cours/.test(clean)) return "Prof";
  if (/beamer|diapo|slide|presentation|présentation/.test(clean)) return "Beamer";
  return prettifySegment(filename);
}

function versLeSupDocumentType(filename) {
  const clean = filename.replace(/\.[^.]+$/, "").toLowerCase();
  if (/^e\.cours/.test(clean)) return "Cours élève";
  if (/^p\.cours/.test(clean)) return "Cours prof";
  if (/beamer|diapo|slide|presentation|présentation/.test(clean)) return "Beamer";
  return "Autre document";
}

function renderVersLeSupChapterCards(relativeDir) {
  const directory = readDirectory(relativeDir);
  if (!directory) return `<p class="muted">Aucun document n'est encore disponible dans cette section.</p>`;

  const dirs = directory.directories;
  if (!dirs.length) return `<p class="muted">Aucun document n'est encore disponible dans cette section.</p>`;

  return `
    <div class="chapter-card-grid">
      ${dirs
        .map((dir) => {
          const nested = readDirectory(dir.relativePath);
          if (!nested || !nested.files.length) return "";
          const title = escapeHtml(prettifySegment(dir.name));
          const links = nested.files
            .map((file) => {
              const href = linkTarget(path.join("documents", file.relativePath));
              return `
                <a class="chapter-doc-link" href="${href}">
                  <span class="chapter-doc-link-label">${escapeHtml(versLeSupDocumentLabel(file.name))}</span>
                  <span class="chapter-doc-link-type">${escapeHtml(versLeSupDocumentType(file.name))}</span>
                </a>
              `;
            })
            .join("");

          return `
            <article class="chapter-resource-card">
              <div class="chapter-resource-card-header">
                <p class="chapter-card-kicker">Chapitre</p>
                <h2>${title}</h2>
              </div>
              <p>Documents disponibles pour ce chapitre.</p>
              <div class="chapter-doc-actions">
                ${links}
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderFileBackedChapterBlock({ dirName, files, mapKey, anchorId = "" }) {
  const buckets = splitResourceBuckets(files);
  const meta = chapterMeta(mapKey, dirName);

  return `
    <article class="chapter-block" ${anchorId ? `id="${escapeHtml(anchorId)}"` : ""}>
      ${meta.hasDistinctTitle ? `<p class="chapter-kicker">${escapeHtml(meta.label)}</p>` : ""}
      <h2 class="chapter-title">${escapeHtml(meta.title)}</h2>
      <div class="chapter-sections">
        ${renderDisclosure(bucketLabel("course"), buckets.course)}
        ${renderDisclosure(bucketLabel("other"), buckets.other)}
      </div>
    </article>
  `;
}

function renderChapterBlock(dir, mapKey, options = {}) {
  const nested = readDirectory(dir.relativePath);
  if (!nested) return "";
  return renderFileBackedChapterBlock({
    dirName: dir.name,
    files: nested.files,
    mapKey,
    anchorId: options.anchorId || "",
  });
}

function renderSectionTree(title, items) {
  if (!items.length) {
    return `
      <section class="page-rail-group">
        <a class="page-rail-group-link" href="#${escapeHtml(title.id)}">${escapeHtml(title.label)}</a>
      </section>
    `;
  }

  return `
    <section class="page-rail-group">
      <details class="page-rail-disclosure">
        <summary class="page-rail-summary">
          <span>${escapeHtml(title.label)}</span>
          <span class="page-rail-summary-glyph">⌄</span>
        </summary>
        <div class="page-rail-children">
          <a class="page-rail-child-link is-section-link" href="#${escapeHtml(title.id)}">Voir la section</a>
          ${items.map((item) => `<a class="page-rail-child-link" href="#${escapeHtml(item.id)}">${escapeHtml(item.label)}</a>`).join("")}
        </div>
      </details>
    </section>
  `;
}

function renderStickyRail(title, groups) {
  return `
    <aside class="page-rail" aria-label="Navigation dans la page">
      <div class="page-rail-inner">
        <p class="page-rail-kicker">${escapeHtml(title)}</p>
        ${groups.map((group) => renderSectionTree(group.title, group.items || [])).join("")}
      </div>
    </aside>
  `;
}

function renderNamedCollection(dir) {
  const nested = readDirectory(dir.relativePath);
  if (!nested) return "";
  const mapKey = normalizeMapKey(dir.relativePath);

  const nestedChapters = nested.directories.filter((entry) => isChapterDir(entry.name));
  const nestedOthers = nested.directories.filter((entry) => !isChapterDir(entry.name));
  const directFiles = nested.files;

  return `
    <section class="page-block collection-block">
      <div class="section-head">
        <p class="eyebrow">${escapeHtml(prettifySegment(dir.name))}</p>
        <h2>${escapeHtml(prettifySegment(dir.name))}</h2>
      </div>
      ${directFiles.length ? renderDisclosure("Documents", directFiles) : ""}
      ${nestedChapters.length ? `<div class="chapter-list">${nestedChapters.map((chapter) => renderChapterBlock(chapter, mapKey)).join("")}</div>` : ""}
      ${
        nestedOthers.length
          ? `<div class="resource-grid">${nestedOthers
              .map((child) => {
                const childDir = readDirectory(child.relativePath);
                return `
                  <article class="resource-card">
                    <div class="resource-card-head">
                      <p class="eyebrow">Dossier</p>
                      <h3>${escapeHtml(prettifySegment(child.name))}</h3>
                    </div>
                    ${childDir ? renderCompactLinks(childDir.files) : `<p class="empty-note">Aucun document.</p>`}
                  </article>
                `;
              })
              .join("")}</div>`
          : ""
      }
    </section>
  `;
}

function renderDirectoryCards(relativeDir, depth = 0) {
  const directory = readDirectory(relativeDir);
  if (!directory) return "";

  const introFiles = depth === 0 ? renderFileList(directory.files) : "";
  const cards = directory.directories
    .map((subdir) => {
      const title = escapeHtml(prettifySegment(subdir.name));
      const nested = readDirectory(subdir.relativePath);
      const nestedFiles = nested ? renderFileList(nested.files) : "";
      const nestedDirs = nested ? renderDirectoryCards(subdir.relativePath, depth + 1).trim() : "";

      return `
        <article class="resource-card">
          <div class="resource-card-head">
            <p class="eyebrow">Dossier</p>
            <h3>${title}</h3>
          </div>
          ${nestedFiles || `<p class="muted">Aucun document direct dans ce dossier.</p>`}
          ${nestedDirs ? `<div class="resource-nested">${nestedDirs}</div>` : ""}
        </article>
      `;
    })
    .join("");

  return `
    ${introFiles}
    ${cards ? `<div class="resource-grid">${cards}</div>` : ""}
  `.trim();
}

function sectionIntro(label, count) {
  return `<p class="section-intro">${escapeHtml(label)}${count ? ` · ${count} dossier${count > 1 ? "s" : ""}` : ""}</p>`;
}

function renderSectionHeader(kicker, title, id) {
  return `
    <div class="section-head" ${id ? `id="${escapeHtml(id)}"` : ""}>
      <p class="eyebrow">${escapeHtml(kicker)}</p>
      <h2>${escapeHtml(title)}</h2>
    </div>
  `;
}

function renderSingleLabelSection(label, id) {
  return `
    <div class="section-head section-head-compact" ${id ? `id="${escapeHtml(id)}"` : ""}>
      <p class="eyebrow">${escapeHtml(label)}</p>
    </div>
  `;
}

function renderDisclosureSection(label, id, content, open = false) {
  return `
    <section class="page-block">
      <details class="section-disclosure" ${open ? "open" : ""} ${id ? `id="${escapeHtml(id)}"` : ""}>
        <summary class="section-disclosure-summary">
          <span class="eyebrow">${escapeHtml(label)}</span>
          <span class="section-disclosure-glyph">⌄</span>
        </summary>
        <div class="section-disclosure-body">
          ${content}
        </div>
      </details>
    </section>
  `;
}

function groupFilesByTrailingNumber(files, mapKey) {
  const grouped = new Map();

  for (const file of files) {
    const base = file.name.replace(/\.[^.]+$/, "");
    const match = base.match(/(\d+)$/);
    const key = match ? Number(match[1]) : 0;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(file);
  }

  return [...grouped.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([number, groupFiles]) => ({
      number,
      anchorId: anchorIdFromParts(mapKey, `chapitre-${number}`),
      files: groupFiles,
      html: renderFileBackedChapterBlock({
        dirName: `chapitre${number}`,
        files: groupFiles,
        mapKey,
        anchorId: anchorIdFromParts(mapKey, `chapitre-${number}`),
      }),
    }));
}

function renderDocumentContent({
  documentDir,
  includeRootFiles = true,
  includeChapters = true,
  includeDirs = null,
  excludeDirs = [],
  rootDisclosureTitle = "Documents directs",
}) {
  const directory = readDirectory(documentDir);
  const mapKey = normalizeMapKey(documentDir);
  if (!directory) {
    return `<section class="page-block"><p class="muted">Aucun document n'est encore disponible dans cette section.</p></section>`;
  }

  const includeSet = includeDirs ? new Set(includeDirs.map((name) => slugify(name))) : null;
  const excludeSet = new Set(excludeDirs.map((name) => slugify(name)));
  const filteredDirs = directory.directories.filter((entry) => {
    const key = slugify(entry.name);
    const isChapter = isChapterDir(entry.name);
    if (excludeSet.has(key)) return false;
    if (isChapter) return includeChapters;
    if (includeSet && !includeSet.has(key)) return false;
    return true;
  });

  const chapterDirs = includeChapters ? filteredDirs.filter((entry) => isChapterDir(entry.name)) : [];
  const otherDirs = filteredDirs.filter((entry) => !isChapterDir(entry.name));

  return `
    ${includeRootFiles && directory.files.length ? `<section class="page-block">${renderDisclosure(rootDisclosureTitle, directory.files)}</section>` : ""}
    ${chapterDirs.length ? `<section class="page-block"><div class="chapter-list">${chapterDirs.map((chapter) => renderChapterBlock(chapter, mapKey)).join("")}</div></section>` : ""}
    ${otherDirs.length ? otherDirs.map(renderNamedCollection).join("") : ""}
  `;
}

function renderDocumentPage({
  filename,
  title,
  description,
  intro,
  documentDir,
  activeNav,
  localLinks = [],
}) {
  const body = renderDocumentContent({ documentDir });

  writePage(
    filename,
    renderLayout({
      title,
      description,
      activeNav,
      currentPage: filename,
      localLinks,
      hero: `
        <p class="eyebrow">Ressources</p>
        <h1>${escapeHtml(title)}</h1>
        <p class="hero-text">${escapeHtml(description)}</p>
        <p class="hero-note">${escapeHtml(intro)}</p>
      `,
      main: body,
    }),
  );
}

function renderLevelPage({
  filename,
  title,
  description,
  heroText,
  heroNoteHtml = "",
  documentDir,
  activeNav = "lycee.html",
  currentPage = filename,
  localLinks = quickLinks.lycee,
  sections = [],
}) {
  const buttons = sections
    .filter((section) => section.enabled !== false)
    .map((section) => `<a href="#${escapeHtml(section.id)}" class="section-jump-link">${escapeHtml(section.label)}</a>`)
    .join("");

  const body = sections
    .filter((section) => section.enabled !== false)
    .map((section) =>
      section.collapsible
        ? renderDisclosureSection(section.label, section.id, section.content, section.open)
        : `
      <section class="page-block">
        ${renderSingleLabelSection(section.label, section.id)}
        ${section.content}
      </section>
    `,
    )
    .join("");

  writePage(
    filename,
    renderLayout({
      title,
      description,
      activeNav,
      currentPage,
      localLinks,
      hero: `
        <p class="eyebrow">Ressources</p>
        <h1>${escapeHtml(title)}</h1>
        <p class="hero-text">${escapeHtml(heroText || description)}</p>
        ${heroNoteHtml}
      `,
      main: `
        <section class="page-block">
          <nav class="section-jump-nav" aria-label="Accès rapides dans la page">
            ${buttons}
          </nav>
        </section>
        ${body}
      `,
    }),
  );
}

function renderSubpageNav(links, currentPage) {
  return `
    <nav class="subpage-nav" aria-label="Navigation secondaire">
      ${links
        .map((link) => `<a href="${link.href}" class="subpage-link ${link.href === currentPage ? "is-active" : ""}">${escapeHtml(link.label)}</a>`)
        .join("")}
    </nav>
  `;
}

function renderSidebar(activeNav, currentPage, localLinks = []) {
  const initialProfile = sidebarProfiles[0];
  const primary = mainNav
    .map(
      (item) => {
        const children = navChildren[item.href] || [];
        const isOpen = activeNav === item.href || currentPage === item.href || children.some((child) => child.href === currentPage);
        const sublinks = children.length
          ? `
            <div class="sidebar-accordion-links">
              ${children
                .map((link) => {
                  const isActive = currentPage === link.href;
                  return `<a href="${link.href}" class="sidebar-sublink ${isActive ? "is-active" : ""}">${escapeHtml(link.label)}</a>`;
                })
                .join("")}
            </div>
          `
          : "";
        const toggle = children.length
          ? `<button type="button" class="sidebar-toggle" aria-expanded="${isOpen ? "true" : "false"}" aria-label="Afficher les sous-pages de ${escapeHtml(item.label)}"><span class="sidebar-toggle-glyph">›</span></button>`
          : "";

        return `
          <div class="sidebar-group ${isOpen ? "is-open" : ""}">
            <div class="sidebar-head">
              ${
                children.length
                  ? `<button type="button" class="sidebar-link sidebar-parent ${activeNav === item.href || currentPage === item.href ? "is-active" : ""}" aria-expanded="${isOpen ? "true" : "false"}">${escapeHtml(item.label)}</button>`
                  : `<a href="${item.href}" class="sidebar-link ${activeNav === item.href || currentPage === item.href ? "is-active" : ""}">${escapeHtml(item.label)}</a>`
              }
              ${toggle}
            </div>
            ${sublinks}
          </div>
        `;
      },
    )
    .join("");

	  return `
	    <aside class="site-sidebar">
	      <div class="site-sidebar-inner">
	        <button type="button" class="mobile-menu-toggle" aria-expanded="false" aria-controls="site-sidebar-nav" data-mobile-menu-toggle>
	          <span>Menu</span>
	          <span class="mobile-menu-glyph">⌄</span>
	        </button>
	        <nav class="sidebar-nav" id="site-sidebar-nav" aria-label="Navigation principale">
	          ${primary}
	        </nav>
        <div class="sidebar-profile" data-sidebar-profile>
          <button type="button" class="sidebar-photo-button" data-sidebar-photo-open aria-label="Agrandir le portrait affiché">
            <div class="sidebar-photo-frame">
              <img src="${escapeHtml(initialProfile.image)}" alt="${escapeHtml(initialProfile.alt)}" data-sidebar-profile-image />
            </div>
          </button>
          <div class="sidebar-profile-copy">
            <p class="sidebar-profile-name" data-sidebar-profile-name>${escapeHtml(initialProfile.name)}</p>
            <p class="sidebar-profile-bio" data-sidebar-profile-bio>${escapeHtml(initialProfile.bio)}</p>
          </div>
        </div>
      </div>
    </aside>
  `;
}

function renderLayout({ title, description, activeNav, currentPage, localLinks = [], hero, main, extraHead = "", scripts = "" }) {
  const theme = pageThemes[currentPage] || "anthracite";
  const profilesJson = JSON.stringify(sidebarProfiles).replaceAll("</script", "<\\/script");
  return `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)} | Thomas DESORGERIS</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="assets/css/style.css" />
    ${extraHead}
  </head>
  <body>
    <div class="site-shell" data-theme="${theme}">
      ${renderSidebar(activeNav, currentPage, localLinks)}
      <main class="site-content">
        <div class="site-content-inner">
          <section class="hero">
            <div class="hero-copy">
              ${hero}
            </div>
          </section>
          <div class="contact-banner">
            Pour me joindre, vous pouvez utiliser l'adresse électronique
            <a class="contact-link" href="mailto:desorgeris.maths@gmail.com">desorgeris.maths@gmail.com</a>.
          </div>
          ${main}
        </div>
      </main>
    </div>
    <div class="image-lightbox" data-image-lightbox hidden>
      <button type="button" class="image-lightbox-backdrop" data-image-lightbox-close aria-label="Fermer l'image agrandie"></button>
      <div class="image-lightbox-dialog" role="dialog" aria-modal="true" aria-label="Portrait agrandi">
        <button type="button" class="image-lightbox-close" data-image-lightbox-close aria-label="Fermer">×</button>
        <img src="" alt="" class="image-lightbox-image" data-image-lightbox-image />
      </div>
    </div>
    <script>
	      window.__SIDEBAR_PROFILES__ = ${profilesJson};
	      (() => {
	        const sidebar = document.querySelector('.site-sidebar');
	        const toggle = document.querySelector('[data-mobile-menu-toggle]');
	        if (!sidebar || !toggle) return;
	        toggle.addEventListener('click', () => {
	          const isOpen = sidebar.classList.toggle('is-mobile-menu-open');
	          toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
	        });
	      })();
	      document.querySelectorAll('.sidebar-toggle').forEach((button) => {
        button.addEventListener('click', () => {
          const group = button.closest('.sidebar-group');
          if (!group) return;
          const isOpen = group.classList.toggle('is-open');
          button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
      });
      document.querySelectorAll('.sidebar-parent').forEach((button) => {
        button.addEventListener('click', () => {
          const group = button.closest('.sidebar-group');
          if (!group) return;
          const isOpen = group.classList.toggle('is-open');
          button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
          const toggle = group.querySelector('.sidebar-toggle');
          if (toggle) {
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
          }
        });
      });
      (() => {
        const profiles = Array.isArray(window.__SIDEBAR_PROFILES__) ? window.__SIDEBAR_PROFILES__ : [];
        if (!profiles.length) return;
        const image = document.querySelector('[data-sidebar-profile-image]');
        const name = document.querySelector('[data-sidebar-profile-name]');
        const bio = document.querySelector('[data-sidebar-profile-bio]');
        if (!image || !name || !bio) return;
        const storageKey = 'siteNew.sidebarProfileIndex';
        let nextIndex = 0;
        try {
          const previousIndex = Number.parseInt(window.sessionStorage.getItem(storageKey) || '-1', 10);
          nextIndex = Number.isNaN(previousIndex) ? 0 : (previousIndex + 1) % profiles.length;
          window.sessionStorage.setItem(storageKey, String(nextIndex));
        } catch (error) {
          nextIndex = 0;
        }
        const profile = profiles[nextIndex];
        if (!profile) return;
        image.src = profile.image;
        image.alt = profile.alt;
        name.textContent = profile.name;
        bio.textContent = profile.bio;
      })();
      (() => {
        const openButton = document.querySelector('[data-sidebar-photo-open]');
        const sidebarImage = document.querySelector('[data-sidebar-profile-image]');
        const lightbox = document.querySelector('[data-image-lightbox]');
        const lightboxImage = document.querySelector('[data-image-lightbox-image]');
        const closeButtons = document.querySelectorAll('[data-image-lightbox-close]');
        if (!openButton || !sidebarImage || !lightbox || !lightboxImage) return;

        const closeLightbox = () => {
          lightbox.hidden = true;
          document.body.classList.remove('has-lightbox-open');
        };

        openButton.addEventListener('click', () => {
          lightboxImage.src = sidebarImage.currentSrc || sidebarImage.src;
          lightboxImage.alt = sidebarImage.alt;
          lightbox.hidden = false;
          document.body.classList.add('has-lightbox-open');
        });

        closeButtons.forEach((button) => {
          button.addEventListener('click', closeLightbox);
        });

        document.addEventListener('keydown', (event) => {
          if (event.key === 'Escape' && !lightbox.hidden) {
            closeLightbox();
          }
        });
      })();
    </script>
    ${scripts}
  </body>
</html>`;
}

function writePage(filename, contents) {
  writeFileSync(path.join(siteRoot, filename), contents, "utf8");
}

function renderOverviewCards(cards) {
  return `
    <div class="feature-grid">
      ${cards
        .map(
          (card) => `
            <article class="feature-card">
              <p class="eyebrow">${escapeHtml(card.kicker)}</p>
              <h3><a href="${card.href}">${escapeHtml(card.title)}</a></h3>
              <p>${escapeHtml(card.text)}</p>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderLinkSections() {
  return usefulLinks
    .map(
      (group) => `
        <section class="page-block">
          <div class="section-head">
            <p class="eyebrow">Sélection</p>
            <h2>${escapeHtml(group.title)}</h2>
          </div>
          <div class="varia-grid">
            ${group.items
              .map(
                (item) => `
                  <a class="varia-card" href="${item.href}" target="_blank" rel="noopener noreferrer">
                    <div class="varia-card-header">
                      <h3>${escapeHtml(item.label)}</h3>
                    </div>
                    <p>${escapeHtml(item.text)}</p>
                    <div class="varia-card-footer">
                      <span class="varia-tag">${escapeHtml(group.title)}</span>
                      <span class="varia-level">Lien externe</span>
                    </div>
                  </a>
                `,
              )
              .join("")}
          </div>
        </section>
      `,
    )
    .join("");
}

function renderSimpleSectionBlocks(sections) {
  return sections
    .map(
      (section) => `
        <section class="page-block">
          <div class="section-head">
            <p class="eyebrow">${escapeHtml(section.kicker || "Section")}</p>
            <h2>${escapeHtml(section.title)}</h2>
          </div>
          <p class="section-intro">${escapeHtml(section.text)}</p>
          ${
            section.links?.length
              ? `<div class="resource-list">
                  ${section.links
                    .map(
                      (link) => `
                        <a class="resource-link" href="${link.href}">
                          <span class="resource-link-label">${escapeHtml(link.label)}</span>
                          <span class="resource-link-meta">${escapeHtml(link.meta || "Page")}</span>
                        </a>
                      `,
                    )
                    .join("")}
                </div>`
              : `<p class="muted">Les documents seront ajoutés ici au fur et à mesure.</p>`
          }
        </section>
      `,
    )
    .join("");
}

function renderPresentationBlock(paragraphs) {
  return `
    <section class="page-block">
      ${paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
    </section>
  `;
}

function renderToolPage({ filename, title, description, heroText, activeNav, currentPage = filename, localLinks, content, scripts = "", extraHead = "" }) {
  writePage(
    filename,
    renderLayout({
      title,
      description,
      activeNav,
      currentPage,
      localLinks,
      hero: `
        <p class="eyebrow">Outil</p>
        <h1>${escapeHtml(title)}</h1>
        <p class="hero-text">${escapeHtml(heroText)}</p>
      `,
      main: `<section class="page-block tool-block">${content}</section>`,
      scripts,
      extraHead,
    }),
  );
}

function renderConstructionPage({ filename, title, activeNav, localLinks, currentPage = filename }) {
  writePage(
    filename,
    renderLayout({
      title,
      description: `${title} sera bientôt disponible.`,
      activeNav,
      currentPage,
      localLinks,
      hero: `
        <p class="eyebrow">Information</p>
        <h1>${escapeHtml(title)}</h1>
        <p class="hero-text">Page en construction.</p>
        <p class="hero-note">Le contenu est encore en préparation et sera mis en ligne quand il sera prêt.</p>
      `,
      main: `
        <section class="page-block">
          <p class="muted">Cette section n'est pas encore publiée sur le site.</p>
        </section>
      `,
    }),
  );
}

function ensureDirectories() {
  mkdirSync(path.join(siteRoot, "assets"), { recursive: true });
  mkdirSync(path.join(siteRoot, "assets", "css"), { recursive: true });
}

ensureDirectories();

writePage(
  "index.html",
  renderLayout({
    title: "Accueil",
    description: "Page personnelle de Thomas DESORGERIS, professeur de mathématiques.",
    activeNav: "index.html",
    currentPage: "index.html",
    localLinks: [
      { href: "lycee.html", label: "Ressources lycée" },
      { href: "mes-mathematiques.html", label: "Mes mathématiques" },
      { href: "prepa.html", label: "Ressources prépa" },
      { href: "agregation.html", label: "Ressources agrégation" },
    ],
    hero: `
      <p class="eyebrow">Page personnelle</p>
      <h1>Thomas DESORGERIS</h1>
      <p class="hero-text">J'enseigne les mathématiques au lycée Marcel Sembat à Vénissieux. J'interviens aussi en classes préparatoires au lycée du Parc à Lyon et j'accompagne des candidats préparant l'agrégation externe de mathématiques au CNED.</p>
      <p class="hero-note">Cette page sert à rassembler les différentes ressources mises à disposition sur le site.</p>
    `,
    main: renderPresentationBlock([
      "Le site est organisé en quatre ensembles : lycée, mes mathématiques, classes préparatoires et agrégation.",
      "Les documents déjà présents ont été conservés et réorganisés dans des sous-pages plus simples à parcourir.",
    ]),
  }),
);

writePage(
  "lycee.html",
  renderLayout({
    title: "Lycée",
    description: "Ressources de lycée : classes, documents et outils.",
    activeNav: "lycee.html",
    currentPage: "lycee.html",
    localLinks: quickLinks.lycee,
    hero: `
      <p class="eyebrow">Lycée</p>
      <h1>Lycée</h1>
      <p class="hero-text">Cette page regroupe les accès vers les différentes classes de lycée.</p>
    `,
    main: `
      <section class="page-block intro-split">
        <div class="text-card">
          <p>Tu retrouveras ici les accès vers la Seconde, la Première spécialité, la Terminale spécialité et les Mathématiques expertes.</p>
        </div>
        <div class="portrait-card school-card">
          <img src="images/imageMarcel.jpg" alt="Lycée Marcel Sembat" />
        </div>
      </section>
      <section class="page-block">
        <div class="section-head">
          <p class="eyebrow">Pages</p>
          <h2>Accès par niveau</h2>
        </div>
        ${renderOverviewCards([
          { kicker: "Classe", href: "seconde.html", title: "Seconde", text: "Cours, évaluations, bonus et SNT." },
          { kicker: "Classe", href: "premiere-specialite.html", title: "Première spécialité", text: "Chapitres, évaluations, automatismes et bonus." },
          { kicker: "Classe", href: "terminale-specialite.html", title: "Terminale spécialité", text: "Base légère prête à accueillir les prochains documents." },
          { kicker: "Classe", href: "mathematiques-expertes.html", title: "Mathématiques expertes", text: "Chapitres, évaluations et prolongements vers le supérieur." },
        ])}
      </section>
    `,
  }),
);

writePage(
  "mes-mathematiques.html",
  renderLayout({
    title: "Mes mathématiques",
    description: "Ressources personnelles et prolongements mathématiques.",
    activeNav: "mes-mathematiques.html",
    currentPage: "mes-mathematiques.html",
    localLinks: quickLinks.mesMathematiques,
    hero: `
      <p class="eyebrow">Mes mathématiques</p>
      <h1>Mes mathématiques</h1>
      <p class="hero-text">Un espace pour rassembler des ressources personnelles, des prolongements et des chemins de travail hors des rubriques de classe.</p>
    `,
    main: `
      <section class="page-block">
        <div class="section-head">
          <p class="eyebrow">Sous-pages</p>
          <h2>Chemins de travail</h2>
        </div>
        ${renderOverviewCards([
          { kicker: "Transition", href: "vers-le-sup.html", title: "Vers le Sup'", text: "Cours et compléments pour préparer le passage vers le supérieur." },
          { kicker: "Varia", href: "varia-mathematica.html", title: "Varia Mathematica", text: "Notes, curiosités et ressources mathématiques diverses." },
        ])}
      </section>
    `,
  }),
);

writePage(
  "varia-mathematica.html",
  renderLayout({
    title: "Varia Mathematica",
    description: "Notes, curiosités et ressources mathématiques diverses.",
    activeNav: "mes-mathematiques.html",
    currentPage: "varia-mathematica.html",
    localLinks: quickLinks.mesMathematiques,
    hero: `
      <p class="eyebrow">Mes mathématiques</p>
      <h1>Varia Mathematica</h1>
      <p class="hero-text">Un espace pour rassembler des notes, curiosités et ressources mathématiques diverses.</p>
    `,
    main: `
      <section class="page-block">
        <div class="section-head">
          <p class="eyebrow">Ressources</p>
          <h2>Documents</h2>
        </div>
        <div class="varia-grid">
          <a class="varia-card" href="document-bientot-disponible.html">
            <div class="varia-card-header">
              <h3>Titre du document</h3>
            </div>
            <p>Description courte du document, à compléter si nécessaire.</p>
            <div class="varia-card-footer">
              <span class="varia-tag">Mathématiques</span>
              <span class="varia-level">Niveau requis : à préciser</span>
            </div>
          </a>

          <a class="varia-card" href="document-bientot-disponible.html">
            <div class="varia-card-header">
              <h3>Autre document</h3>
            </div>
            <p>Petite description du contenu accessible.</p>
            <div class="varia-card-footer">
              <span class="varia-tag">Varia</span>
              <span class="varia-level">Niveau requis : lycée</span>
            </div>
          </a>
        </div>
      </section>
    `,
  }),
);

const secondeSubpages = [
  { href: "seconde.html", label: "Vue d'ensemble" },
  { href: "seconde-cours.html", label: "Cours" },
  { href: "seconde-evaluations.html", label: "Évaluations" },
  { href: "seconde-snt.html", label: "SNT" },
];

const secondeDirectory = readDirectory("seconde");
const secondeChapters = secondeDirectory ? secondeDirectory.directories.filter((entry) => isChapterDir(entry.name)) : [];
const secondeEvaluations = readDirectory("seconde/evaluations");
const secondeBonus = readDirectory("seconde/bonus");
const secondeSnt = readDirectory("seconde/snt");
const secondeSntChapters = secondeSnt ? groupFilesByTrailingNumber(secondeSnt.files, "seconde/snt") : [];

function renderChaptersSection(documentDir) {
  const directory = readDirectory(documentDir);
  if (!directory) {
    return `
      <div class="chapter-card-grid">
        <article class="chapter-resource-card">
          <div class="chapter-resource-card-header">
            <p class="chapter-card-kicker">Cours</p>
            <h2>Chapitres à venir</h2>
          </div>
          <p>Les documents de cours pourront être ajoutés ici.</p>
          <div class="chapter-doc-actions">
            <p class="empty-note">Aucun document pour le moment.</p>
          </div>
        </article>
      </div>
    `;
  }
  const chapters = directory.directories.filter((entry) => isChapterDir(entry.name));
  if (!chapters.length) {
    return `
      <div class="chapter-card-grid">
        <article class="chapter-resource-card">
          <div class="chapter-resource-card-header">
            <p class="chapter-card-kicker">Cours</p>
            <h2>Chapitres à venir</h2>
          </div>
          <p>Les documents de cours pourront être ajoutés ici.</p>
          <div class="chapter-doc-actions">
            <p class="empty-note">Aucun document pour le moment.</p>
          </div>
        </article>
      </div>
    `;
  }
  return `
    <div class="chapter-card-grid">
      ${chapters
        .map((chapter) => {
          const nested = readDirectory(chapter.relativePath);
          const meta = chapterMeta(documentDir, chapter.name);
          const files = nested ? nested.files : [];
          const links = files.length
            ? files
                .map((file) => {
                  const href = linkTarget(path.join("documents", file.relativePath));
                  return `
                    <a class="chapter-doc-link" href="${href}">
                      <span class="chapter-doc-link-label">${escapeHtml(versLeSupDocumentLabel(file.name))}</span>
                      <span class="chapter-doc-link-type">${escapeHtml(versLeSupDocumentType(file.name))}</span>
                    </a>
                  `;
                })
                .join("")
            : `<p class="empty-note">Aucun document pour le moment.</p>`;

          return `
            <article class="chapter-resource-card" id="${escapeHtml(anchorIdFromParts(documentDir, chapter.name))}">
              <div class="chapter-resource-card-header">
                <p class="chapter-card-kicker">${escapeHtml(meta.label)}</p>
                <h2>${escapeHtml(meta.title)}</h2>
              </div>
              <p>Documents disponibles pour ce chapitre.</p>
              <div class="chapter-doc-actions">
                ${links}
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function evaluationBaseKey(filename) {
  return filename
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[-_. ]?(corrige|corrigé|correction|corr)$/i, "");
}

function isCorrectionFile(filename) {
  return /(^|[-_. ])(corrige|corrigé|correction|corr)([-_. ]|$)/i.test(filename.replace(/\.[^.]+$/, ""));
}

function evaluationTitleFromKey(key) {
  if (/^ds(\d+)$/i.test(key)) return `DS ${key.match(/^ds(\d+)$/i)[1]}`;
  if (/^eval[_-]?(\d+)$/i.test(key)) return `Évaluation ${key.match(/^eval[_-]?(\d+)$/i)[1]}`;
  if (key === "eval_auto") return "Évaluation automatismes";
  return prettifySegment(key);
}

function renderEvaluationCards(relativeDir) {
  const directory = readDirectory(relativeDir);
  if (!directory || !directory.files.length) return `<p class="muted">Aucun sujet d'évaluation n'est encore disponible dans cette section.</p>`;

  const groups = new Map();
  for (const file of directory.files) {
    const key = evaluationBaseKey(file.name);
    if (!groups.has(key)) groups.set(key, { key, subjects: [], corrections: [] });
    groups.get(key)[isCorrectionFile(file.name) ? "corrections" : "subjects"].push(file);
  }

  return `
    <div class="chapter-card-grid">
      ${[...groups.values()]
        .map((group) => {
          const title = escapeHtml(evaluationTitleFromKey(group.key));
          const subjectLinks = group.subjects
            .map((file) => {
              const href = linkTarget(path.join("documents", file.relativePath));
              return `
                <a class="chapter-doc-link" href="${href}">
                  <span class="chapter-doc-link-label">Sujet</span>
                  <span class="chapter-doc-link-type">PDF</span>
                </a>
              `;
            })
            .join("");
          const correctionLinks = group.corrections
            .map((file) => {
              const href = linkTarget(path.join("documents", file.relativePath));
              return `
                <a class="chapter-doc-link" href="${href}">
                  <span class="chapter-doc-link-label">Correction</span>
                  <span class="chapter-doc-link-type">PDF</span>
                </a>
              `;
            })
            .join("");

          return `
            <article class="chapter-resource-card" id="${escapeHtml(anchorIdFromParts(relativeDir, group.key))}">
              <div class="chapter-resource-card-header">
                <p class="chapter-card-kicker">Évaluation</p>
                <h2>${title}</h2>
              </div>
              <p>Sujet et correction disponibles pour cette évaluation.</p>
              <div class="chapter-doc-actions">
                ${subjectLinks || `<p class="empty-note">Sujet à venir.</p>`}
                ${correctionLinks || ""}
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderOtherDocumentCards(relativeDir, label = "Document") {
  const directory = readDirectory(relativeDir);
  if (!directory || !directory.files.length) return `<p class="muted">Aucun document n'est encore disponible dans cette section.</p>`;

  return `
    <div class="chapter-card-grid">
      ${directory.files
        .map((file) => {
          const href = linkTarget(path.join("documents", file.relativePath));
          return `
            <article class="chapter-resource-card" id="${escapeHtml(anchorIdFromParts(relativeDir, file.name))}">
              <div class="chapter-resource-card-header">
                <p class="chapter-card-kicker">${escapeHtml(label)}</p>
                <h2>${escapeHtml(prettifySegment(file.name))}</h2>
              </div>
              <p>Document disponible dans cette rubrique.</p>
              <div class="chapter-doc-actions">
                <a class="chapter-doc-link" href="${href}">
                  <span class="chapter-doc-link-label">Ouvrir</span>
                  <span class="chapter-doc-link-type">PDF</span>
                </a>
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderNamedDirsCardSection(relativeDir, includeDirNames = null) {
  const directory = readDirectory(relativeDir);
  if (!directory) return `<p class="muted">Aucun document n'est encore disponible dans cette section.</p>`;
  const includeSet = includeDirNames ? new Set(includeDirNames.map((name) => slugify(name))) : null;
  const dirs = directory.directories.filter((entry) => !isChapterDir(entry.name) && (!includeSet || includeSet.has(slugify(entry.name))));
  if (!dirs.length) return `<p class="muted">Aucun document n'est encore disponible dans cette section.</p>`;
  return dirs.map((dir) => renderOtherDocumentCards(dir.relativePath, prettifySegment(dir.name))).join("");
}

function renderSntCourseCards() {
  const directory = readDirectory("seconde/snt");
  if (!directory || !directory.files.length) return `<p class="muted">Aucun document SNT n'est encore disponible.</p>`;
  const groups = groupFilesByTrailingNumber(directory.files, "seconde/snt");

  return `
    <div class="chapter-card-grid">
      ${groups
        .map((group) => {
          const title = escapeHtml(chapterTitleMaps["seconde/snt"][`chapitre${group.number}`] || `Chapitre ${group.number}`);
          const files = group.files || [];
          const links = files
            .map((file) => {
              const href = linkTarget(path.join("documents", file.relativePath));
              return `
                <a class="chapter-doc-link" href="${href}">
                  <span class="chapter-doc-link-label">${escapeHtml(versLeSupDocumentLabel(file.name))}</span>
                  <span class="chapter-doc-link-type">${escapeHtml(versLeSupDocumentType(file.name))}</span>
                </a>
              `;
            })
            .join("");

          return `
            <article class="chapter-resource-card" id="${escapeHtml(group.anchorId)}">
              <div class="chapter-resource-card-header">
                <p class="chapter-card-kicker">Chapitre ${escapeHtml(group.number)}</p>
                <h2>${title}</h2>
              </div>
              <p>Documents disponibles pour ce chapitre.</p>
              <div class="chapter-doc-actions">
                ${links || `<p class="empty-note">Aucun document pour le moment.</p>`}
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderFilesSection(relativeDir, anchorPrefix) {
  const directory = readDirectory(relativeDir);
  if (!directory || !directory.files.length) return `<p class="muted">Aucun document n'est encore disponible dans cette section.</p>`;
  return renderCompactLinks(directory.files, { anchorPrefix });
}

function renderFilesDisclosureSection(relativeDir, title, anchorPrefix) {
  const directory = readDirectory(relativeDir);
  if (!directory || !directory.files.length) return `<p class="muted">Aucun document n'est encore disponible dans cette section.</p>`;
  return renderDisclosure(title, directory.files, { anchorPrefix });
}

function renderNamedDirsSection(relativeDir, includeDirNames = null) {
  const directory = readDirectory(relativeDir);
  if (!directory) return `<p class="muted">Aucun document n'est encore disponible dans cette section.</p>`;
  const includeSet = includeDirNames ? new Set(includeDirNames.map((name) => slugify(name))) : null;
  const dirs = directory.directories.filter((entry) => !isChapterDir(entry.name) && (!includeSet || includeSet.has(slugify(entry.name))));
  if (!dirs.length) return `<p class="muted">Aucun document n'est encore disponible dans cette section.</p>`;
  return dirs.map(renderNamedCollection).join("");
}

function renderNamedDirsDisclosureSection(relativeDir, includeDirNames = null) {
  const directory = readDirectory(relativeDir);
  if (!directory) return `<p class="muted">Aucun document n'est encore disponible dans cette section.</p>`;
  const includeSet = includeDirNames ? new Set(includeDirNames.map((name) => slugify(name))) : null;
  const dirs = directory.directories.filter((entry) => !isChapterDir(entry.name) && (!includeSet || includeSet.has(slugify(entry.name))));
  if (!dirs.length) return `<p class="muted">Aucun document n'est encore disponible dans cette section.</p>`;

  return dirs
    .map((dir) => {
      const nested = readDirectory(dir.relativePath);
      if (!nested) return "";
      if (nested.files.length) {
        return renderDisclosure(prettifySegment(dir.name), nested.files, { anchorPrefix: anchorIdFromParts(relativeDir, dir.name) });
      }
      if (nested.directories.length) {
        return nested.directories
          .map((child) => {
            const childDir = readDirectory(child.relativePath);
            return childDir
              ? renderDisclosure(prettifySegment(child.name), childDir.files, { anchorPrefix: anchorIdFromParts(relativeDir, dir.name, child.name) })
              : "";
          })
          .join("");
      }
      return "";
    })
    .join("");
}

function renderGroupedFilesSection(relativeDir, mapKey) {
  const directory = readDirectory(relativeDir);
  if (!directory || !directory.files.length) return `<p class="muted">Aucun document n'est encore disponible dans cette section.</p>`;
  const grouped = groupFilesByTrailingNumber(directory.files, mapKey);
  return `<div class="chapter-list">${grouped.map((chapter) => chapter.html).join("")}</div>`;
}

function renderAgendaNotice(href) {
  return `<p class="hero-note">Voici l'<a href="${href}">agenda</a> de la classe.</p>`;
}

function writeAgendaPage({ filename, title, classPage }) {
  writePage(
    filename,
    renderLayout({
      title,
      description: `Agenda de ${title.toLowerCase()}.`,
      activeNav: "lycee.html",
      currentPage: classPage,
      localLinks: quickLinks.lycee,
      hero: `
        <p class="eyebrow">Agenda</p>
        <h1>${escapeHtml(title)}</h1>
        <p class="hero-text">Cette page est prête pour accueillir l'agenda de la classe.</p>
      `,
      main: `
        <section class="page-block">
          <p class="muted">Aucun contenu d'agenda n'est encore disponible ici.</p>
        </section>
      `,
    }),
  );
}

writePage(
  "seconde.html",
  renderLayout({
    title: "Seconde",
    description: "Cours, évaluations et SNT en classe de seconde.",
    activeNav: "lycee.html",
    currentPage: "seconde.html",
    localLinks: quickLinks.lycee,
    hero: `
      <p class="eyebrow">Ressources</p>
      <h1>Seconde</h1>
      ${renderAgendaNotice("agenda-seconde.html")}
    `,
    main: `
      <section class="page-block">
        <nav class="section-jump-nav" aria-label="Accès rapides dans la page">
          <a href="#seconde-section-chapitres" class="section-jump-link">Cours</a>
          ${secondeBonus && secondeBonus.files.length ? `<a href="#seconde-section-bonus" class="section-jump-link">Autres</a>` : ""}
          ${secondeEvaluations ? `<a href="#seconde-section-evaluations" class="section-jump-link">Évaluations</a>` : ""}
          ${secondeSntChapters.length ? `<a href="#seconde-section-snt" class="section-jump-link">SNT</a>` : ""}
        </nav>
      </section>
      ${renderDisclosureSection("Cours", "seconde-section-chapitres", renderChaptersSection("seconde"), true)}
      ${
        secondeBonus && secondeBonus.files.length
          ? renderDisclosureSection("Autres", "seconde-section-bonus", renderOtherDocumentCards("seconde/bonus", "Autres"))
          : ""
      }
      ${
        secondeEvaluations
          ? renderDisclosureSection("Évaluations", "seconde-section-evaluations", renderEvaluationCards("seconde/evaluations"))
          : ""
      }
      ${
        secondeSntChapters.length
          ? renderDisclosureSection(
              "SNT",
              "seconde-section-snt",
              renderSntCourseCards(),
            )
          : ""
      }
    `,
  }),
);

writePage(
  "seconde-cours.html",
  renderLayout({
    title: "Seconde · Cours",
    description: "Chapitres et bonus de la classe de seconde.",
    activeNav: "lycee.html",
    currentPage: "seconde.html",
    localLinks: quickLinks.lycee,
    hero: `
      <p class="eyebrow">Seconde</p>
      <h1>Cours</h1>
      <p class="hero-text">Les chapitres sont regroupés dans un format plus simple, avec des rubriques discrètes pour chaque type de document.</p>
    `,
    main: `
      <section class="page-block">
        ${renderSubpageNav(secondeSubpages, "seconde-cours.html")}
      </section>
      ${renderDisclosureSection("Cours", "seconde-cours-section", renderChaptersSection("seconde"), true)}
      ${renderDisclosureSection("Autres", "seconde-cours-autres", renderOtherDocumentCards("seconde/bonus", "Autres"))}
    `,
  }),
);

writePage(
  "seconde-evaluations.html",
  renderLayout({
    title: "Seconde · Évaluations",
    description: "DS et évaluations de la classe de seconde.",
    activeNav: "lycee.html",
    currentPage: "seconde.html",
    localLinks: quickLinks.lycee,
    hero: `
      <p class="eyebrow">Seconde</p>
      <h1>Évaluations</h1>
      <p class="hero-text">Tous les sujets d'évaluation de seconde sont rassemblés ici dans une page courte et facile à parcourir.</p>
    `,
    main: `
      <section class="page-block">
        ${renderSubpageNav(secondeSubpages, "seconde-evaluations.html")}
      </section>
      ${renderDisclosureSection("Évaluations", "seconde-evaluations-section", renderEvaluationCards("seconde/evaluations"), true)}
    `,
  }),
);

writePage(
  "seconde-snt.html",
  renderLayout({
    title: "Seconde · SNT",
    description: "Ressources de SNT pour la classe de seconde.",
    activeNav: "lycee.html",
    currentPage: "seconde.html",
    localLinks: quickLinks.lycee,
    hero: `
      <p class="eyebrow">Seconde</p>
      <h1>SNT</h1>
      <p class="hero-text">La partie SNT dispose maintenant de sa propre page pour isoler les cours et évaluations du reste de la classe.</p>
    `,
    main: `
      <section class="page-block">
        ${renderSubpageNav(secondeSubpages, "seconde-snt.html")}
      </section>
      ${renderDisclosureSection("SNT", "seconde-snt-section", renderSntCourseCards(), true)}
    `,
  }),
);

renderLevelPage({
  filename: "premiere-specialite.html",
  title: "Première spécialité",
  description: "Ressources de première spécialité en mathématiques.",
  heroText: "",
  heroNoteHtml: renderAgendaNotice("agenda-premiere-specialite.html"),
  documentDir: "premierespe",
  sections: [
    { id: "premiere-section-cours", label: "Cours", content: renderChaptersSection("premierespe"), collapsible: true, open: true },
    { id: "premiere-section-autres", label: "Autres", content: renderNamedDirsCardSection("premierespe", ["automatismes", "bonus"]), collapsible: true },
    { id: "premiere-section-evaluations", label: "Évaluations", content: renderEvaluationCards("premierespe/evaluations"), collapsible: true },
  ],
});

renderLevelPage({
  filename: "terminale-specialite.html",
  title: "Terminale spécialité",
  description: "Base de travail pour la terminale spécialité.",
  heroText: "",
  heroNoteHtml: renderAgendaNotice("agenda-terminale-specialite.html"),
  currentPage: "terminale-specialite.html",
  sections: [
    { id: "terminale-section-cours", label: "Cours", content: renderChaptersSection("terminalespe"), collapsible: true, open: true },
    { id: "terminale-section-autres", label: "Autres", content: renderOtherDocumentCards("terminalespe/bonus", "Autres"), collapsible: true },
    { id: "terminale-section-evaluations", label: "Évaluations", content: renderEvaluationCards("terminalespe/evaluations"), collapsible: true },
  ],
});

renderLevelPage({
  filename: "mathematiques-expertes.html",
  title: "Mathématiques expertes",
  description: "Cours, évaluations et prolongements de mathématiques expertes.",
  heroText: "",
  heroNoteHtml: renderAgendaNotice("agenda-mathematiques-expertes.html"),
  documentDir: "mathsexp",
  sections: [
    { id: "mathsexp-section-cours", label: "Cours", content: renderChaptersSection("mathsexp"), collapsible: true, open: true },
    { id: "mathsexp-section-autres", label: "Autres", content: renderOtherDocumentCards("mathsexp/bonus", "Autres"), collapsible: true },
    { id: "mathsexp-section-evaluations", label: "Évaluations", content: renderEvaluationCards("mathsexp/evaluations"), collapsible: true },
  ],
});

renderLevelPage({
  filename: "vers-le-sup.html",
  title: "Vers le Sup'",
  description: "Ressources pour préparer le passage vers le supérieur.",
  heroText: "Cours et compléments pour préparer le passage vers le supérieur.",
  documentDir: "mathsexp/verslesup",
  activeNav: "mes-mathematiques.html",
  currentPage: "vers-le-sup.html",
  localLinks: quickLinks.mesMathematiques,
  sections: [
    { id: "vers-le-sup-section-cours", label: "Cours", content: renderVersLeSupChapterCards("mathsexp/verslesup"), collapsible: true, open: true },
    { id: "vers-le-sup-section-autres", label: "Autres", content: renderFilesDisclosureSection("mathsexp/verslesup", "Documents", "vers-le-sup-autres"), collapsible: true },
  ],
});

writeAgendaPage({
  filename: "agenda-seconde.html",
  title: "Agenda de Seconde",
  classPage: "seconde.html",
});

writeAgendaPage({
  filename: "agenda-premiere-specialite.html",
  title: "Agenda de Première spécialité",
  classPage: "premiere-specialite.html",
});

writeAgendaPage({
  filename: "agenda-terminale-specialite.html",
  title: "Agenda de Terminale spécialité",
  classPage: "terminale-specialite.html",
});

writeAgendaPage({
  filename: "agenda-mathematiques-expertes.html",
  title: "Agenda de Mathématiques expertes",
  classPage: "mathematiques-expertes.html",
});

writePage(
  "prepa.html",
  renderLayout({
    title: "Classes préparatoires",
    description: "Outils et ressources pour les classes préparatoires.",
    activeNav: "prepa.html",
    currentPage: "prepa.html",
    localLinks: quickLinks.prepa,
    hero: `
      <p class="eyebrow">Classes préparatoires</p>
      <h1>Classes préparatoires</h1>
      <p class="hero-text">Cette section regroupe actuellement deux outils de travail : un générateur de khôlle et une page de révision du cours.</p>
    `,
    main: `
      <section class="page-block">
        <div class="section-head">
          <p class="eyebrow">Outils</p>
          <h2>Travail oral et révision</h2>
        </div>
        ${renderOverviewCards([
          {
            kicker: "Khôlle",
            href: "generateur-kholle.html",
            title: "Générateur de khôlle",
            text: "Choix des thèmes, niveau et export en LaTeX.",
          },
          {
            kicker: "Cours",
            href: "connais-tu-ton-cours.html",
            title: "Connais-tu ton cours ?",
            text: "Cartes de révision et auto-évaluation.",
          },
        ])}
      </section>
    `,
  }),
);

writePage(
  "agregation.html",
  renderLayout({
    title: "Agrégation",
    description: "Ressources de préparation à l'agrégation externe de mathématiques.",
    activeNav: "agregation.html",
    currentPage: "agregation.html",
    localLinks: quickLinks.agregation,
    hero: `
      <p class="eyebrow">Agrégation</p>
      <h1>Agrégation</h1>
      <p class="hero-text">Cette page sert d'entrée vers les différentes parties de la préparation à l'agrégation.</p>
    `,
    main: `
      <section class="page-block">
        <div class="section-head">
          <p class="eyebrow">Sous-pages</p>
          <h2>Trois entrées principales</h2>
        </div>
        ${renderOverviewCards([
          { kicker: "Oral", href: "developpements.html", title: "Développements", text: "Organisation par thèmes et pistes de travail." },
          { kicker: "Oral", href: "lecons.html", title: "Leçons", text: "Plans, références et repères de préparation." },
          { kicker: "Écrits", href: "preparation-ecrits.html", title: "Préparation aux écrits", text: "Méthode, sujets et fiches de travail." },
        ])}
      </section>
    `,
  }),
);

writePage(
  "developpements.html",
  renderLayout({
    title: "Développements",
    description: "Organisation des développements pour l'agrégation.",
    activeNav: "agregation.html",
    currentPage: "developpements.html",
    localLinks: quickLinks.agregation,
    hero: `
      <p class="eyebrow">Agrégation</p>
      <h1>Développements</h1>
      <p class="hero-text">Une page simple pour classer et faire grandir les développements sans alourdir la lecture.</p>
    `,
    main: renderSimpleSectionBlocks([
      { kicker: "Thème", title: "Algèbre", text: "Espace prévu pour les développements d'algèbre, variantes et remarques d'oral." },
      { kicker: "Thème", title: "Analyse", text: "Espace prévu pour les développements d'analyse, idées de présentation et références." },
      { kicker: "Thème", title: "Autres", text: "Espace prévu pour les développements qui ne relèvent pas directement de l'algèbre ou de l'analyse." },
    ]),
  }),
);

writePage(
  "lecons.html",
  renderLayout({
    title: "Leçons",
    description: "Organisation des leçons pour l'agrégation.",
    activeNav: "agregation.html",
    currentPage: "lecons.html",
    localLinks: quickLinks.agregation,
    hero: `
      <p class="eyebrow">Agrégation</p>
      <h1>Leçons</h1>
      <p class="hero-text">Une base plus propre pour classer les plans, références et compléments de leçons.</p>
    `,
    main: [
      renderDisclosureSection(
        "Algèbre",
        "lecons-algebre",
        `
          <p class="section-intro">Zone réservée aux plans, développements associés et bibliographie.</p>
          <p class="muted">Les documents seront ajoutés ici au fur et à mesure.</p>
        `,
      ),
      renderDisclosureSection(
        "Analyse",
        "lecons-analyse",
        `
          <p class="section-intro">Zone réservée aux leçons d'analyse et à leurs compléments.</p>
          <p class="muted">Les documents seront ajoutés ici au fur et à mesure.</p>
        `,
      ),
      renderDisclosureSection(
        "Autres",
        "lecons-autres",
        `
          <p class="section-intro">Zone réservée aux leçons qui ne relèvent pas directement de l'algèbre ou de l'analyse.</p>
          <p class="muted">Les documents seront ajoutés ici au fur et à mesure.</p>
        `,
      ),
    ].join(""),
  }),
);

writePage(
  "preparation-ecrits.html",
  renderLayout({
    title: "Préparation aux écrits",
    description: "Organisation de la préparation aux écrits de l'agrégation.",
    activeNav: "agregation.html",
    currentPage: "preparation-ecrits.html",
    localLinks: quickLinks.agregation,
    hero: `
      <p class="eyebrow">Agrégation</p>
      <h1>Préparation aux écrits</h1>
      <p class="hero-text">Une page plus calme pour regrouper méthodologie, sujets et fiches de révision.</p>
    `,
    main: [
      renderDisclosureSection(
        "Algèbre",
        "ecrits-algebre",
        `
          <p class="section-intro">Emplacement pour classer les sujets, méthodes et fiches d'algèbre.</p>
          <p class="muted">Les documents seront ajoutés ici au fur et à mesure.</p>
        `,
      ),
      renderDisclosureSection(
        "Analyse",
        "ecrits-analyse",
        `
          <p class="section-intro">Emplacement pour classer les sujets, méthodes et fiches d'analyse.</p>
          <p class="muted">Les documents seront ajoutés ici au fur et à mesure.</p>
        `,
      ),
      renderDisclosureSection(
        "Autres",
        "ecrits-autres",
        `
          <p class="section-intro">Espace pour les ressources qui ne relèvent pas directement de l'algèbre ou de l'analyse.</p>
          <p class="muted">Les documents seront ajoutés ici au fur et à mesure.</p>
        `,
      ),
    ].join(""),
  }),
);

writePage(
  "liens-utiles.html",
  renderLayout({
    title: "Liens utiles",
    description: "Sélection de liens utiles autour des mathématiques et de l'enseignement.",
    activeNav: "divers.html",
    currentPage: "liens-utiles.html",
    hero: `
      <p class="eyebrow">Ressources externes</p>
      <h1>Liens utiles</h1>
      <p class="hero-text">Quelques liens vers des ressources extérieures utiles pour l'enseignement, l'entraînement et la culture mathématique.</p>
    `,
    main: renderLinkSections(),
  }),
);

writePage(
  "document-bientot-disponible.html",
  renderLayout({
    title: "Document bientôt disponible",
    description: "Page d'attente pour un document non encore publié.",
    activeNav: "",
    currentPage: "document-bientot-disponible.html",
    hero: `
      <p class="eyebrow">Information</p>
      <h1>Document bientôt disponible</h1>
      <p class="hero-text">Ce contenu n'est pas encore publié sur le site.</p>
      <p class="hero-note">La structure est prête ; le document pourra être ajouté ici dès qu'il sera finalisé.</p>
    `,
    main: `
      <section class="page-block">
        <a class="ghost-link" href="index.html">Revenir à l'accueil</a>
      </section>
    `,
  }),
);

renderToolPage({
  filename: "generateur-kholle-brouillon.html",
  title: "Générateur de khôlle",
  description: "Génération de khôlles pour les classes préparatoires.",
  heroText: "Choisir un niveau, une difficulté et jusqu'à trois thèmes, puis générer une khôlle exportable en LaTeX.",
  activeNav: "prepa.html",
  currentPage: "generateur-kholle.html",
  localLinks: quickLinks.prepa,
  extraHead: `
    <script>
      window.MathJax = {
        tex: {
          inlineMath: [['\\\\(', '\\\\)'], ['$', '$']],
          displayMath: [['\\\\[', '\\\\]'], ['$$', '$$']],
          macros: {
            R: "\\\\mathbb{R}",
            C: "\\\\mathbb{C}",
            Q: "\\\\mathbb{Q}",
            Z: "\\\\mathbb{Z}",
            N: "\\\\mathbb{N}",
            K: "\\\\mathbb{K}",
            eps: "\\\\varepsilon",
            vect: ["\\\\overrightarrow{#1}", 1],
            abs: ["\\\\left|#1\\\\right|", 1],
            norme: ["\\\\left\\\\lVert#1\\\\right\\\\rVert", 1],
            croch: ["\\\\left[#1\\\\right]", 1],
            paren: ["\\\\left(#1\\\\right)", 1]
          }
        },
        svg: { fontCache: "global" }
      };
    </script>
  `,
  scripts: `
    <script defer src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
    ${readFileSync(path.join("/Users/thomasdesorgeris/Documents/Playground/site-redesign-lab/generateur-kholle.html"), "utf8")
      .match(/<script src="assets\/data\/kholles[\s\S]*?<script src="assets\/js\/generateur-kholle\.js"><\/script>/)?.[0]
      ?.replace('<script src="assets/js/generateur-kholle.js"></script>', '<script src="assets/js/generateur-kholle.js"></script>') || ""}
  `,
  content: `
    <div class="tool-card">
      <h2>Choisir les thèmes</h2>
      <p class="generator-intro">Sélectionne un, deux ou trois thèmes, puis lance la génération.</p>
      <form id="kholle-generator-form">
        <div class="generator-track">
          <h3>Niveau</h3>
          <div class="generator-track-options">
            <label class="generator-track-option">
              <input type="radio" name="track" value="sup" checked />
              <span>Sup'</span>
            </label>
            <label class="generator-track-option">
              <input type="radio" name="track" value="spe" />
              <span>Spé'</span>
            </label>
          </div>
        </div>
        <div class="generator-difficulty">
          <h3>Difficulté souhaitée</h3>
          <div class="generator-difficulty-options">
            <label class="generator-difficulty-option">
              <input type="radio" name="difficulty" value="1" checked />
              <span>★</span>
            </label>
            <label class="generator-difficulty-option">
              <input type="radio" name="difficulty" value="2" />
              <span>★★</span>
            </label>
            <label class="generator-difficulty-option">
              <input type="radio" name="difficulty" value="3" />
              <span>★★★</span>
            </label>
          </div>
        </div>
        <div id="themes-list" class="generator-themes" aria-live="polite"></div>
        <p id="generator-message" class="generator-message" role="status"></p>
        <div class="button-row">
          <button type="submit" class="button button-primary generator-submit-button">Générer une khôlle</button>
          <button type="button" id="clear-kholle" class="button button-secondary generator-clear-button">Effacer</button>
        </div>
      </form>
    </div>
    <div class="tool-card">
      <h2>Khôlle générée</h2>
      <div id="kholle-output" class="kholle-output">
        <p class="generator-placeholder">Aucune khôlle générée pour le moment.</p>
      </div>
      <div class="button-row">
        <button type="button" id="download-tex" class="button button-secondary" disabled>Télécharger en <code>.tex</code></button>
      </div>
    </div>
  `,
});

renderToolPage({
  filename: "connais-tu-ton-cours-brouillon.html",
  title: "Connais-tu ton cours ?",
  description: "Cartes de révision pour les classes préparatoires.",
  heroText: "Choisir un niveau et un thème, puis travailler le cours sous forme de cartes de révision.",
  activeNav: "prepa.html",
  currentPage: "connais-tu-ton-cours.html",
  localLinks: quickLinks.prepa,
  extraHead: `
    <script>
      window.MathJax = {
        tex: {
          inlineMath: [['\\\\(', '\\\\)'], ['$', '$']],
          displayMath: [['\\\\[', '\\\\]'], ['$$', '$$']],
          macros: {
            R: "\\\\mathbb{R}",
            C: "\\\\mathbb{C}",
            Q: "\\\\mathbb{Q}",
            Z: "\\\\mathbb{Z}",
            N: "\\\\mathbb{N}",
            K: "\\\\mathbb{K}",
            eps: "\\\\varepsilon",
            vect: ["\\\\overrightarrow{#1}", 1],
            abs: ["\\\\left|#1\\\\right|", 1],
            norme: ["\\\\left\\\\lVert#1\\\\right\\\\rVert", 1],
            croch: ["\\\\left[#1\\\\right]", 1],
            paren: ["\\\\left(#1\\\\right)", 1]
          }
        },
        svg: { fontCache: "global" }
      };
    </script>
  `,
  scripts: `
    <script defer src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
    <script src="assets/data/course-cards/index.js"></script>
    <script src="assets/data/course-cards/sup/algebre-lineaire/cartes.js"></script>
    <script src="assets/data/course-cards/sup/analyse/cartes.js"></script>
    <script src="assets/data/course-cards/spe/espaces-vectoriels-normes/cartes.js"></script>
    <script src="assets/data/course-cards/spe/series-entieres/cartes.js"></script>
    <script src="assets/js/connais-tu-ton-cours.js"></script>
  `,
  content: `
    <div class="tool-card course-setup-card">
      <form id="course-quiz-form" class="course-setup-form">
        <div class="course-setup-block">
          <p class="course-section-label">Niveau</p>
          <div class="generator-track-options">
            <label class="generator-track-option">
              <input type="radio" name="quiz-track" value="sup" checked />
              <span>Sup'</span>
            </label>
            <label class="generator-track-option">
              <input type="radio" name="quiz-track" value="spe" />
              <span>Spé'</span>
            </label>
          </div>
        </div>
        <div class="course-setup-block">
          <p class="course-section-label">Thème</p>
          <div id="quiz-theme-options" class="generator-difficulty-options course-theme-options" aria-live="polite"></div>
        </div>
        <div class="course-setup-actions">
          <p id="quiz-message" class="generator-message" role="status"></p>
          <div class="button-row course-setup-buttons">
            <button type="submit" class="button button-primary generator-submit-button">Lancer le quiz</button>
            <button type="button" id="quiz-reset" class="button button-secondary generator-clear-button">Effacer</button>
          </div>
        </div>
      </form>
    </div>
    <div class="tool-card course-stage-card">
      <div class="course-work-header">
        <div class="course-work-header-main">
          <p class="course-section-label">Carte</p>
          <div id="quiz-progress" class="course-progress-pill">Carte 0 / 0</div>
        </div>
      </div>
      <div id="quiz-output" class="quiz-output course-quiz-stage">
        <p class="generator-placeholder">Aucune carte affichée pour le moment.</p>
      </div>
      <div class="course-work-grid">
        <div class="course-panel course-notes-panel">
          <div class="course-panel-head">
            <p class="course-section-label">Ma réponse</p>
            <p>Écris ta réponse en LaTeX, tes idées ou tes formules.</p>
          </div>
          <textarea id="quiz-notes" rows="8" placeholder="Écris ici ta réponse, tes idées ou tes formules en TeX..."></textarea>
        </div>
        <div class="course-panel course-preview-panel">
          <div class="course-panel-head">
            <p class="course-section-label">Aperçu en temps réel</p>
            <p>Ce que tu écris s’affiche ici en direct.</p>
          </div>
          <div class="quiz-notes-preview-wrap course-preview-wrap">
            <div id="quiz-notes-preview" class="quiz-notes-preview">
              <p class="generator-placeholder">Ton aperçu apparaîtra ici.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="button-row course-validation-row">
        <button type="button" id="quiz-validate" class="button button-primary" disabled>Valider ma réponse</button>
      </div>
      <div id="quiz-compare-box" class="quiz-compare-box course-review-grid">
        <div class="course-panel quiz-expected-answer">
          <div class="course-panel-head">
            <p class="course-section-label">Réponse attendue</p>
            <p>Compare avec la correction.</p>
          </div>
          <div id="quiz-answer-output" class="quiz-answer-output">
            <p class="generator-placeholder">Clique sur "Voir la réponse" pour afficher la réponse attendue.</p>
          </div>
          <div class="button-row course-reveal-row">
            <button type="button" id="quiz-reveal" class="button button-secondary" disabled>Voir la réponse</button>
          </div>
        </div>
        <div class="course-panel course-judge-panel">
          <div class="course-panel-head">
            <p class="course-section-label">Juge ta réponse</p>
            <p>Sois honnête avec toi-même pour progresser.</p>
          </div>
          <div class="button-row quiz-inline-actions course-mark-actions">
            <button type="button" id="quiz-mark-correct" class="button button-primary quiz-mark-correct" disabled>Bonne réponse</button>
            <button type="button" id="quiz-mark-wrong" class="button button-secondary quiz-mark-wrong" disabled>Mauvaise réponse</button>
          </div>
        </div>
      </div>
      <div class="course-footer-bar">
        <button type="button" id="quiz-prev" class="button button-secondary" disabled>Carte précédente</button>
        <div class="quiz-scoreboard course-scoreboard">
          <p class="quiz-score-item">Bonnes réponses : <strong id="quiz-score-correct">0</strong></p>
          <p class="quiz-score-item">Mauvaises réponses : <strong id="quiz-score-wrong">0</strong></p>
          <p class="quiz-score-item">Cartes réalisées : <strong id="quiz-score-progress">0 / 0</strong></p>
        </div>
        <button type="button" id="quiz-next" class="button button-secondary" disabled>Carte suivante</button>
      </div>
    </div>
  `,
});

renderConstructionPage({
  filename: "generateur-kholle.html",
  title: "Générateur de khôlle",
  activeNav: "prepa.html",
  localLinks: quickLinks.prepa,
});

renderConstructionPage({
  filename: "connais-tu-ton-cours.html",
  title: "Connais-tu ton cours ?",
  activeNav: "prepa.html",
  localLinks: quickLinks.prepa,
});
