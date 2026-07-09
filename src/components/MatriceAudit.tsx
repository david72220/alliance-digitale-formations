import { useState, useMemo } from "react";
import "./MatriceAudit.css?inline";

/* ─────────────────────────────────────────────────────────────
   Matrice d'audit gestion commerciale TPE — Alliance Digitale
   Composant React drop-in pour Vite / Vercel / Astro client:load
   
   Usage :
     import MatriceAudit from "./MatriceAudit";
     <MatriceAudit
       apiEndpoint="https://api.alliance-digitale.fr/audit"
       calendarUrl="https://cal.eu/alliance-digitale/entretien"
     />
   ───────────────────────────────────────────────────────────── */

type Props = {
  /** Endpoint POST qui reçoit { answers, reco, contact } et déclenche le PDF + mail */
  apiEndpoint?: string;
  /** URL du calendrier pour la CTA "Réserver un entretien" */
  calendarUrl?: string;
};

type OptionDef = { value: string; label: string; sub?: string };
type QuestionDef = {
  id: string;
  title: string;
  hint: string;
  options: OptionDef[];
};

type Answers = Record<string, string>;

type StackKey = "A" | "B" | "C" | "BTP";

type Reco = {
  stack: StackKey;
  title: string;
  tagline: string;
  badge: string;
  tools: { role: string; name: string; price: string }[];
  reasons: string[];
  monthlyBudget: string;
  palier: string;
  presta: string;
  training: string;
  alert?: string;
};

/* ─── Configuration : les 8 questions ─────────────────────── */

const QUESTIONS: QuestionDef[] = [
  {
    id: "metier",
    title: "Quel est votre métier principal ?",
    hint: "Détermine 60% de la reco — un artisan BTP et un consultant n'ont pas les mêmes outils.",
    options: [
      { value: "services", label: "Services / Conseil / Freelance", sub: "Coaching, consulting, formation, professions libérales" },
      { value: "btp", label: "BTP / Artisan chantier", sub: "Plombier, électricien, maçon, menuisier, carreleur…" },
      { value: "commerce", label: "Commerce avec stock", sub: "Boutique physique, revente, distribution" },
      { value: "ecommerce", label: "E-commerce", sub: "Vente en ligne, marketplace, dropshipping" },
      { value: "resto", label: "Restauration / Métier de bouche", sub: "Restaurant, traiteur, boulangerie, food-truck" },
    ],
  },
  {
    id: "volume",
    title: "Combien de factures émettez-vous par mois en moyenne ?",
    hint: "Sur les 12 derniers mois. Si vous démarrez, estimez la cible dans 6 mois.",
    options: [
      { value: "xs", label: "Moins de 15", sub: "Freelance, activité en lancement" },
      { value: "s", label: "15 à 30", sub: "Activité régulière solo" },
      { value: "m", label: "30 à 80", sub: "TPE établie" },
      { value: "l", label: "80 à 150", sub: "Structure en croissance" },
      { value: "xl", label: "Plus de 150", sub: "Volume conséquent — ERP requis" },
    ],
  },
  {
    id: "team",
    title: "Combien de personnes émettent des devis / factures ou gèrent le commercial ?",
    hint: "Uniquement les personnes qui manipuleront l'outil.",
    options: [
      { value: "solo", label: "1 (moi uniquement)", sub: "Dirigeant solo" },
      { value: "duo", label: "2 à 3 personnes", sub: "Dirigeant + assistant(e) ou associé(e)" },
      { value: "team", label: "4 à 8 personnes", sub: "Équipe structurée" },
      { value: "big", label: "Plus de 8 personnes", sub: "PME — hors périmètre TPE classique" },
    ],
  },
  {
    id: "ec",
    title: "Votre expert-comptable utilise-t-il un logiciel imposé ?",
    hint: "Question critique : imposer un outil incompatible avec votre EC = double saisie et brouille assurée.",
    options: [
      { value: "aucun", label: "Je n'ai pas d'expert-comptable", sub: "Je gère seul(e) ma compta" },
      { value: "pennylane", label: "Oui, il travaille sur Pennylane", sub: "De plus en plus fréquent" },
      { value: "cegid", label: "Oui, sur Cegid / Sage / EBP", sub: "Cabinets traditionnels" },
      { value: "neutre", label: "Oui mais il accepte tout format", sub: "Récupère juste le FEC en fin d'année" },
      { value: "autre", label: "Oui, autre outil / je ne sais pas", sub: "À qualifier lors de l'audit approfondi" },
    ],
  },
  {
    id: "crm",
    title: "Quel est votre besoin en suivi commercial (CRM) ?",
    hint: "Pipeline de vente, historique client, relances commerciales, opportunités…",
    options: [
      { value: "aucun", label: "Aucun besoin", sub: "Mes clients me reviennent naturellement" },
      { value: "leger", label: "Léger", sub: "Garder trace des devis envoyés, un peu de prospection" },
      { value: "fort", label: "Fort", sub: "Pipeline commercial actif, plusieurs canaux d'acquisition" },
      { value: "tresfort", label: "Très fort", sub: "Équipe commerciale, marketing automation, multi-canal" },
    ],
  },
  {
    id: "situation",
    title: "Comment gérez-vous votre facturation aujourd'hui ?",
    hint: "État des lieux — la migration est différente selon votre point de départ.",
    options: [
      { value: "rien", label: "Word / Excel / rien de structuré", sub: "Migration à partir de zéro" },
      { value: "facturation", label: "Un outil de facturation en ligne", sub: "Sellsy, Henrri, Facture.net, autre…" },
      { value: "compta", label: "Un logiciel de compta sans facturation", sub: "Ciel, EBP, Sage classiques" },
      { value: "eparse", label: "Plusieurs outils déconnectés", sub: "Excel + banque + Word + Drive…" },
    ],
  },
  {
    id: "budget",
    title: "Quel budget mensuel logiciels envisagez-vous ?",
    hint: "Hors prestation d'installation et formation. Pour tous les outils réunis.",
    options: [
      { value: "min", label: "Moins de 30 € / mois", sub: "Le minimum viable" },
      { value: "mid", label: "30 à 80 € / mois", sub: "Fourchette la plus fréquente TPE" },
      { value: "high", label: "80 à 200 € / mois", sub: "TPE structurée avec équipe" },
      { value: "premium", label: "Plus de 200 € / mois", sub: "Prêt à investir pour un outil complet" },
    ],
  },
  {
    id: "urgence",
    title: "Où en êtes-vous vis-à-vis de la facturation électronique obligatoire au 1er septembre 2026 ?",
    hint: "Réception obligatoire via Plateforme Agréée pour toutes les entreprises à cette date.",
    options: [
      { value: "connait_pas", label: "Je ne connaissais pas cette obligation", sub: "Priorité absolue à la mise en conformité" },
      { value: "urgent", label: "Je sais mais je ne suis pas prêt", sub: "Deadline proche, action rapide" },
      { value: "cours", label: "Je m'en occupe, j'avance", sub: "En cours de sélection" },
      { value: "pret", label: "Je pense être prêt avec mon outil actuel", sub: "À vérifier — beaucoup pensent l'être à tort" },
    ],
  },
];

/* ─── Moteur de recommandation ────────────────────────────── */

function computeReco(a: Answers): Reco {
  // Override BTP : le métier écrase tout
  if (a.metier === "btp") {
    const volumeIsLow = a.volume === "xs" || a.volume === "s";
    return {
      stack: "BTP",
      title: "Stack BTP — Artisan chantier",
      tagline: "Facturation de situation, acomptes, mètres chantier",
      badge: "Recommandation métier",
      tools: [
        { role: "Banque pro", name: "Qonto Business", price: "9-29 € / mois" },
        { role: "Devis & factures BTP", name: volumeIsLow ? "Obat" : "Trustup Pro", price: "39-59 € / mois" },
        { role: "Comptabilité", name: "Expert-comptable en réception FEC", price: "Selon EC" },
        { role: "CRM", name: "Intégré au logiciel BTP", price: "Inclus" },
      ],
      reasons: [
        "Les outils généralistes (Pennylane, Axonaut) gèrent mal les factures de situation et les acomptes chantier — le passage aux outils BTP dédiés est incontournable.",
        "Bibliothèque d'ouvrages intégrée, signature électronique, suivi de rentabilité chantier : natifs sur les outils métier BTP.",
        "Conformité 09/2026 : les outils BTP recommandés sont compatibles avec les Plateformes Agréées via réseau PEPPOL ou partenariats immatriculés.",
      ],
      monthlyBudget: "65-90 € / mois",
      palier: "Palier 3 BTP — Installation clé en main",
      presta: "1 990 € HT",
      training: "1 journée (7h, éligible Qualiopi)",
    };
  }

  // Système de scoring
  let A = 0, B = 0, C = 0;

  const volume: Record<string, [number, number, number]> = {
    xs: [3, 0, 0], s: [2, 1, 0], m: [0, 3, 1], l: [0, 2, 3], xl: [0, 0, 3],
  };
  const team: Record<string, [number, number, number]> = {
    solo: [3, 0, 0], duo: [1, 3, 1], team: [0, 1, 3], big: [0, 0, 3],
  };
  const ec: Record<string, [number, number, number]> = {
    aucun: [2, 1, 1], pennylane: [0, 4, 0], cegid: [0, 2, 1], neutre: [1, 2, 2], autre: [1, 1, 1],
  };
  const crm: Record<string, [number, number, number]> = {
    aucun: [3, 1, 0], leger: [1, 3, 1], fort: [0, 1, 3], tresfort: [0, 0, 4],
  };
  const budget: Record<string, [number, number, number]> = {
    min: [3, 0, 0], mid: [1, 3, 1], high: [0, 2, 3], premium: [0, 1, 3],
  };

  const apply = (m: Record<string, [number, number, number]>, key: string) => {
    const arr = m[key] ?? [0, 0, 0];
    A += arr[0]; B += arr[1]; C += arr[2];
  };
  apply(volume, a.volume);
  apply(team, a.team);
  apply(ec, a.ec);
  apply(crm, a.crm);
  apply(budget, a.budget);

  // Détermination du stack gagnant (règle : en cas d'égalité, B > A > C)
  let stack: StackKey = "B";
  const max = Math.max(A, B, C);
  if (max === B) stack = "B";
  else if (max === A) stack = "A";
  else stack = "C";

  const stacks: Record<Exclude<StackKey, "BTP">, Reco> = {
    A: {
      stack: "A",
      title: "Stack A — Essentiel Solo",
      tagline: "Le minimum viable, conforme, quasi gratuit",
      badge: "Solo & Micro-entreprise",
      tools: [
        { role: "Banque + facturation", name: "Qonto Business", price: "9-29 € / mois" },
        { role: "Comptabilité", name: "Indy", price: "0 € / mois" },
        { role: "CRM léger", name: "Template Notion", price: "0 € / mois" },
      ],
      reasons: [
        "Volume et taille d'équipe justifient un stack minimaliste — inutile de payer un ERP dont vous n'utiliserez pas 90% des fonctions.",
        "Qonto est Plateforme Agréée : votre facturation électronique 2026 est couverte nativement, sans surcoût.",
        "Indy gère la comptabilité et la déclaration TVA à zéro euro. Idéal si vous n'avez pas d'expert-comptable.",
        "Passage possible au Stack B en 6-12 mois quand le volume monte, sans perte de données.",
      ],
      monthlyBudget: "9-29 € / mois",
      palier: "Palier 2 — Mise en conformité 09/2026",
      presta: "490 € HT",
      training: "1h en visio (comprise dans le forfait)",
    },
    B: {
      stack: "B",
      title: "Stack B — Confort TPE",
      tagline: "Le stack le plus rentable pour 90% des TPE françaises",
      badge: "Recommandé",
      tools: [
        { role: "Banque pro", name: "Qonto Business", price: "25 € / mois" },
        { role: "Facturation & pré-compta", name: "Pennylane", price: "14-49 € / mois" },
        { role: "CRM léger", name: "Notion", price: "0-10 € / mois" },
      ],
      reasons: [
        "Pennylane est Plateforme Agréée par la DGFiP depuis décembre 2025 : conformité 09/2026 native, sans démarche supplémentaire.",
        "Connexion bancaire Qonto ↔ Pennylane fluide : lettrage automatique, notes de frais, trésorerie en temps réel.",
        a.ec === "pennylane"
          ? "Votre expert-comptable travaille déjà sur Pennylane : zéro ressaisie, il voit vos écritures en temps réel, la relation en sort renforcée."
          : "Compatible avec la plupart des experts-comptables via export FEC standard, et interopérable si votre EC bascule un jour sur Pennylane.",
        "Coût maîtrisé (39-84 €/mois) avec upgrade progressif possible sans migration.",
      ],
      monthlyBudget: "39-84 € / mois",
      palier: "Palier 3 — Installation clé en main",
      presta: "1 990 € HT",
      training: "1 journée (7h, éligible Qualiopi)",
    },
    C: {
      stack: "C",
      title: "Stack C — TPE Commerciale intégrée",
      tagline: "CRM, facturation et gestion unifiés dans un seul outil",
      badge: "Structure avec équipe",
      tools: [
        { role: "Banque pro", name: "Qonto Business", price: "25 € / mois" },
        { role: "ERP tout-en-un", name: "Axonaut", price: "42-70 € / utilisateur" },
        { role: "Comptabilité", name: "Export FEC vers votre EC", price: "Selon EC" },
      ],
      reasons: [
        "Besoin CRM fort ou équipe commerciale : Axonaut réunit CRM, devis, factures, relances et trésorerie dans un seul outil. Un seul apprentissage, une seule connexion.",
        "Axonaut est Plateforme Agréée par la DGFiP depuis janvier 2026 : conformité 09/2026 native.",
        "Dashboards commerciaux par vendeur et par produit disponibles nativement — utile dès 3 ou 4 personnes qui vendent.",
        "Coût par utilisateur à surveiller si l'équipe grossit — au-delà de 8 personnes, réévaluer vers Pennylane Pro ou Sellsy.",
      ],
      monthlyBudget: "67-95 € / mois",
      palier: "Palier 3 (installation) ou Palier 4 (avec orchestration N8N)",
      presta: "2 490 € HT (Palier 3) — 4 990 € HT (Palier 4)",
      training: "1 à 2 journées (7-14h, éligible Qualiopi)",
    },
  };

  const result = { ...stacks[stack as Exclude<StackKey, "BTP">] };

  // Alerte urgence 09/2026
  if (a.urgence === "connait_pas" || a.urgence === "urgent") {
    result.alert =
      "Urgent : votre entreprise doit pouvoir recevoir des factures électroniques via une Plateforme Agréée dès le 1er septembre 2026 (amendes 500 € puis 1 000 € tous les 3 mois). Nous recommandons de démarrer par le Palier 2 (Mise en conformité, 490 € HT) avant l'installation complète.";
  }

  return result;
}

/* ─── Sous-composants ─────────────────────────────────────── */

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="ad-progress-wrap">
      <div className="ad-progress-label">
        <span>
          Question {current + 1} sur {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="ad-progress-bar">
        <div className="ad-progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function QuestionStep({
  q,
  selected,
  onSelect,
  onNext,
  onPrev,
  isFirst,
  isLast,
}: {
  q: QuestionDef;
  selected: string | undefined;
  onSelect: (v: string) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <>
      <h2 className="ad-question">{q.title}</h2>
      <p className="ad-hint">{q.hint}</p>

      <div className="ad-options">
        {q.options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`ad-option ${selected === opt.value ? "ad-option--selected" : ""}`}
            onClick={() => onSelect(opt.value)}
          >
            <span className="ad-option-check" aria-hidden />
            <span className="ad-option-content">
              <span className="ad-option-label">{opt.label}</span>
              {opt.sub && <span className="ad-option-sub">{opt.sub}</span>}
            </span>
          </button>
        ))}
      </div>

      <div className="ad-nav">
        <button
          type="button"
          className="ad-btn ad-btn--ghost"
          onClick={onPrev}
          style={{ visibility: isFirst ? "hidden" : "visible" }}
        >
          ← Précédent
        </button>
        <button
          type="button"
          className="ad-btn ad-btn--primary"
          disabled={!selected}
          onClick={onNext}
        >
          {isLast ? "Voir ma recommandation" : "Suivant →"}
        </button>
      </div>
    </>
  );
}

function ResultView({
  reco,
  onRequestReport,
  onRestart,
  calendarUrl,
  reportSent,
}: {
  reco: Reco;
  onRequestReport: () => void;
  onRestart: () => void;
  calendarUrl?: string;
  reportSent: boolean;
}) {
  return (
    <>
      <span className="ad-result-badge">{reco.badge}</span>
      <h2 className="ad-result-title">{reco.title}</h2>
      <p className="ad-result-tagline">{reco.tagline}</p>

      {reco.alert && (
        <div className="ad-alert">
          <strong className="ad-alert-title">Attention conformité</strong>
          <span>{reco.alert}</span>
        </div>
      )}

      <div className="ad-section-label">Stack recommandé</div>
      <div className="ad-stack-grid">
        {reco.tools.map((t, i) => (
          <div key={i} className="ad-stack-item">
            <div className="ad-stack-role">{t.role}</div>
            <div className="ad-stack-name">{t.name}</div>
            <div className="ad-stack-price">{t.price}</div>
          </div>
        ))}
      </div>

      <div className="ad-reasoning">
        <div className="ad-reasoning-title">Pourquoi ce stack pour vous</div>
        <ul>
          {reco.reasons.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>

      <div className="ad-summary">
        <div className="ad-summary-item">
          <div className="ad-summary-label">Budget mensuel logiciels</div>
          <div className="ad-summary-value">{reco.monthlyBudget}</div>
          <div className="ad-summary-sub">Hors prestation d'installation</div>
        </div>
        <div className="ad-summary-item">
          <div className="ad-summary-label">Formation incluse</div>
          <div className="ad-summary-value ad-summary-value--sm">{reco.training}</div>
          <div className="ad-summary-sub">Financement OPCO / FAF possible</div>
        </div>
      </div>

      <div className="ad-cta-box">
        <div className="ad-cta-title">{reco.palier}</div>
        <div className="ad-cta-text">
          Prestation d'installation clé en main : <strong>{reco.presta}</strong>. Devis
          détaillé sous 48h après entretien de qualification.
        </div>
        <div className="ad-cta-actions">
          <button
            type="button"
            className="ad-btn ad-btn--primary"
            onClick={onRequestReport}
            disabled={reportSent}
          >
            {reportSent ? "✓ Rapport envoyé" : "Recevoir le rapport PDF détaillé"}
          </button>
          {calendarUrl && (
            <a href={calendarUrl} target="_blank" rel="noopener noreferrer" className="ad-btn ad-btn--outline">
              Réserver un entretien →
            </a>
          )}
        </div>
      </div>

      <div className="ad-restart">
        <button type="button" onClick={onRestart}>
          ↻ Refaire l'audit
        </button>
      </div>
    </>
  );
}

function EmailCaptureModal({
  onSubmit,
  onClose,
  submitting,
  error,
}: {
  onSubmit: (data: { nom: string; email: string; entreprise: string; telephone: string }) => void;
  onClose: () => void;
  submitting: boolean;
  error?: string;
}) {
  const [form, setForm] = useState({ nom: "", email: "", entreprise: "", telephone: "" });

  const canSubmit = form.nom.trim() !== "" && form.email.includes("@") && !submitting;

  return (
    <div className="ad-modal-backdrop" role="dialog" aria-modal="true">
      <div className="ad-modal">
        <button type="button" className="ad-modal-close" onClick={onClose} aria-label="Fermer">
          ×
        </button>
        <h3 className="ad-modal-title">Recevoir votre rapport détaillé</h3>
        <p className="ad-modal-sub">
          Nous vous envoyons un PDF personnalisé de 4 pages avec la reco complète, le
          détail de chaque outil, les tarifs et les prochaines étapes.
        </p>

        <div className="ad-field">
          <label htmlFor="ad-nom">Nom complet *</label>
          <input
            id="ad-nom"
            type="text"
            value={form.nom}
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
            autoComplete="name"
          />
        </div>
        <div className="ad-field">
          <label htmlFor="ad-email">Email professionnel *</label>
          <input
            id="ad-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            autoComplete="email"
          />
        </div>
        <div className="ad-field">
          <label htmlFor="ad-ent">Entreprise</label>
          <input
            id="ad-ent"
            type="text"
            value={form.entreprise}
            onChange={(e) => setForm({ ...form, entreprise: e.target.value })}
            autoComplete="organization"
          />
        </div>
        <div className="ad-field">
          <label htmlFor="ad-tel">Téléphone (optionnel)</label>
          <input
            id="ad-tel"
            type="tel"
            value={form.telephone}
            onChange={(e) => setForm({ ...form, telephone: e.target.value })}
            autoComplete="tel"
          />
        </div>

        {error && <div className="ad-form-error">{error}</div>}

        <button
          type="button"
          className="ad-btn ad-btn--primary ad-btn--full"
          disabled={!canSubmit}
          onClick={() => onSubmit(form)}
        >
          {submitting ? "Envoi en cours…" : "Envoyer mon rapport"}
        </button>

        <p className="ad-legal">
          Vos données restent chez Alliance Digitale. Aucun envoi à des tiers. Vous
          pouvez vous désinscrire à tout moment.
        </p>
      </div>
    </div>
  );
}

/* ─── Composant principal ────────────────────────────────── */

export default function MatriceAudit({ apiEndpoint, calendarUrl }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>();
  const [reportSent, setReportSent] = useState(false);

  const total = QUESTIONS.length;
  const currentQ = QUESTIONS[step];
  const isResult = step >= total;

  const reco = useMemo(() => (isResult ? computeReco(answers) : null), [isResult, answers]);

  const handleSelect = (v: string) => {
    setAnswers((a) => ({ ...a, [currentQ.id]: v }));
  };

  const handleNext = () => setStep((s) => s + 1);
  const handlePrev = () => setStep((s) => Math.max(0, s - 1));

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setReportSent(false);
    setSubmitError(undefined);
  };

  const handleSubmitContact = async (contact: {
    nom: string; email: string; entreprise: string; telephone: string;
  }) => {
    if (!apiEndpoint || !reco) {
      setSubmitError("Endpoint non configuré. Veuillez contacter contact@alliance-digitale.fr");
      return;
    }
    setSubmitting(true);
    setSubmitError(undefined);
    try {
      const apiKey = import.meta.env.VITE_AUDIT_API_KEY || "";
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { "X-API-Key": apiKey } : {}),
        },
        body: JSON.stringify({ answers, reco, contact, source: "matrice-audit-web", timestamp: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setReportSent(true);
      setShowEmailModal(false);
    } catch (e) {
      setSubmitError("Envoi impossible. Réessayez ou contactez-nous directement.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ad-audit">
      <div className="ad-card">
        {!isResult && (
          <>
            <ProgressBar current={step} total={total} />
            <QuestionStep
              q={currentQ}
              selected={answers[currentQ.id]}
              onSelect={handleSelect}
              onNext={handleNext}
              onPrev={handlePrev}
              isFirst={step === 0}
              isLast={step === total - 1}
            />
          </>
        )}

        {isResult && reco && (
          <ResultView
            reco={reco}
            onRequestReport={() => setShowEmailModal(true)}
            onRestart={handleRestart}
            calendarUrl={calendarUrl}
            reportSent={reportSent}
          />
        )}
      </div>

      {showEmailModal && (
        <EmailCaptureModal
          onSubmit={handleSubmitContact}
          onClose={() => setShowEmailModal(false)}
          submitting={submitting}
          error={submitError}
        />
      )}
    </div>
  );
}
