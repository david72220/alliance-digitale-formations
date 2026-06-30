import { useState, useMemo } from "react";

// Charte graphique Alliance Digitale
const T = {
  bg: "#070d18",
  bg2: "#0B1120",
  bgCard: "rgba(255,255,255,0.04)",
  bgCardHover: "rgba(255,255,255,0.07)",
  // Rouge Alliance (accent principal du logo)
  red: "#9E2114",
  redLight: "rgba(158,33,20,0.12)",
  redDark: "#7a190f",
  // Bleu Alliance
  blue: "#3b97d3",
  blueLight: "rgba(59,151,211,0.12)",
  blueDark: "#1a6fa3",
  // Vert (gains de temps)
  green: "#22C55E",
  greenLight: "rgba(34,197,94,0.1)",
  // Violet (admin)
  purple: "#A855F7",
  purpleLight: "rgba(168,85,247,0.1)",
  // Texte
  text: "#E8ECF4",
  textMuted: "rgba(255,255,255,0.70)",
  textDim: "rgba(255,255,255,0.45)",
  border: "rgba(255,255,255,0.06)",
  borderHover: "rgba(158,33,20,0.3)",
  white: "#FFFFFF",
};

const typeMap = {
  commercial: { label: "Commercial", color: T.blue, bg: T.blueLight },
  admin: { label: "Administratif", color: T.purple, bg: T.purpleLight },
  relation: { label: "Relation client", color: T.green, bg: T.greenLight },
};

const sectors = [
  { id:"btp", label:"Artisans du bâtiment", emoji:"🔧", trades:"Plombier · Électricien · Couvreur · Maçon · Menuisier · Métallier", items:[
    {name:"Relance automatique des devis sans réponse",desc:"Devis envoyé sans réponse à J+5 → email personnalisé avec rappel du montant et lien pour accepter. Fini les relances oubliées.",hours:4,type:"commercial"},
    {name:"Notification instantanée des demandes",desc:"Formulaire rempli sur le site → SMS + email en temps réel, même quand vous êtes les mains dans le plâtre.",hours:2,type:"commercial"},
    {name:"Rappels RDV automatiques (SMS + email)",desc:"La veille de l'intervention, rappel automatique au client : heure, adresse, numéro. Moins de lapins, moins d'appels.",hours:3,type:"relation"},
    {name:"Facturation post-intervention",desc:"Fin de chantier → formulaire rapide sur téléphone → facture générée et envoyée avec le bon de paiement.",hours:4,type:"admin"},
    {name:"Demande d'avis Google automatique",desc:"3 jours après l'intervention, SMS au client avec lien Google. Vos avis montent sans effort.",hours:2,type:"commercial"},
    {name:"Suivi de trésorerie simplifié",desc:"Factures et paiements synchronisés dans un tableau de bord. Impayés visibles en un coup d'œil.",hours:3,type:"admin"},
  ]},
  { id:"paysagiste", label:"Paysagistes", emoji:"🌿", trades:"Paysagiste · Jardinier · Élagueur", items:[
    {name:"Galerie avant/après automatisée",desc:"Vous prenez les photos, elles se publient automatiquement sur votre site avec le slider avant/après. Votre vitrine travaille seule.",hours:3,type:"commercial"},
    {name:"Devis saisonniers pré-remplis",desc:"Les devis récurrents (taille de haie, entretien annuel) se génèrent automatiquement à la bonne saison.",hours:3,type:"admin"},
    {name:"Planification des tournées d'entretien",desc:"Clients réguliers assignés aux bonnes semaines, rappels automatiques, itinéraire optimisé.",hours:4,type:"admin"},
    {name:"Relance clients dormants en intersaison",desc:"Un client n'a pas commandé depuis 8 mois → email avec les services de la saison à venir.",hours:2,type:"commercial"},
    {name:"Suivi phytosanitaire et interventions",desc:"Historique des traitements par client, alertes réglementaires, carnet d'entretien digital.",hours:3,type:"admin"},
  ]},
  { id:"sante", label:"Santé & pharmacie", emoji:"🩺", trades:"Kiné · Ostéopathe · Pharmacie · Infirmier", items:[
    {name:"Confirmation et rappels de RDV",desc:"Confirmation SMS immédiate + rappel la veille + rappel 2h avant. Réduction des no-shows de 40 %.",hours:6,type:"relation"},
    {name:"Liste d'attente intelligente",desc:"Créneau libéré → SMS au premier en liste. Pas de réponse en 2h → le suivant est notifié.",hours:3,type:"admin"},
    {name:"Collecte d'informations patient",desc:"Avant le 1er RDV, le patient remplit un formulaire en ligne (antécédents, motif). 10 min gagnées par consultation.",hours:5,type:"admin"},
    {name:"Alerte stock officine (pharmacie)",desc:"Produit sous le seuil → alerte + bon de commande grossiste pré-rempli. Plus de rupture.",hours:4,type:"admin"},
    {name:"Relance patients inactifs",desc:"Patient pas revenu depuis 6 mois → email bienveillant de rappel pour son suivi.",hours:3,type:"commercial"},
  ]},
  { id:"commerce", label:"Commerces & artisanat", emoji:"🛍️", trades:"Boulangerie · Charcuterie · Coiffure · Imprimerie", items:[
    {name:"Prise de RDV en ligne (coiffure)",desc:"Le client réserve son créneau + choix du service + rappel SMS. Fini les appels pendant les coupes.",hours:5,type:"relation"},
    {name:"Commandes fournisseurs automatisées",desc:"Boulangerie/charcuterie : en fonction des ventes, les commandes de matières premières se pré-remplissent.",hours:4,type:"admin"},
    {name:"Programme fidélité automatisé",desc:"Après X achats, email avec réduction personnalisée. Vos clients reviennent sans que vous y pensiez.",hours:3,type:"commercial"},
    {name:"Suivi de production (imprimerie)",desc:"Commande reçue → fiche de fabrication générée → suivi d'avancement → notification client à l'expédition.",hours:5,type:"admin"},
    {name:"Publication réseaux sociaux",desc:"Nouvelle création, promo, menu du jour → publication automatique sur Instagram, Facebook, Google.",hours:3,type:"commercial"},
    {name:"Comptabilité des ventes",desc:"Chaque vente s'enregistre dans votre outil comptable. Plus de saisie manuelle en fin de mois.",hours:4,type:"admin"},
  ]},
  { id:"resto", label:"Restauration & hôtellerie", emoji:"🍽️", trades:"Restaurant · Traiteur · Hôtel · Chambre d'hôtes", items:[
    {name:"Gestion des réservations",desc:"Réservation en ligne → confirmation SMS → rappel → mise à jour du plan de salle. Zéro appel.",hours:6,type:"relation"},
    {name:"Commandes fournisseurs",desc:"En fonction des ventes de la semaine, les commandes se pré-remplissent. Vous validez, c'est parti.",hours:4,type:"admin"},
    {name:"Réponse aux avis en ligne",desc:"Nouvel avis Google/TripAdvisor → réponse suggérée par l'IA. Vous relisez, 1 clic, c'est publié.",hours:3,type:"commercial"},
    {name:"Planning équipe",desc:"Disponibilités collectées automatiquement, planning généré en tenant compte des contraintes.",hours:4,type:"admin"},
    {name:"Menu du jour multi-canal",desc:"Vous tapez le menu → publication automatique sur site, Instagram, Facebook et Google.",hours:2,type:"commercial"},
  ]},
  { id:"garage", label:"Garage automobile", emoji:"🚗", trades:"Garage auto · Carrosserie · Contrôle technique", items:[
    {name:"Rappel entretien / contrôle technique",desc:"Le véhicule approche de l'échéance → SMS au client avec lien de prise de RDV. Récurrence automatique.",hours:5,type:"commercial"},
    {name:"Devis pièces + main-d'œuvre",desc:"Sélection des pièces dans le catalogue → devis auto avec tarif horaire, marge, TVA. Envoi en 2 clics.",hours:4,type:"admin"},
    {name:"Suivi des véhicules en atelier",desc:"Chaque véhicule a une fiche : statut (reçu / en cours / prêt), notifications au client à chaque étape.",hours:3,type:"relation"},
    {name:"Facturation automatique",desc:"Intervention terminée → facture générée depuis le devis validé, envoyée par email avec le paiement en ligne.",hours:3,type:"admin"},
    {name:"Gestion de flotte / historique client",desc:"Historique complet par véhicule et par client, accessible en 1 clic. Plus de fouille dans les classeurs.",hours:3,type:"admin"},
  ]},
  { id:"immo", label:"Immobilier", emoji:"🏠", trades:"Agent immobilier · Gestionnaire de biens · Syndic", items:[
    {name:"Matching annonces / acheteurs",desc:"Nouveau bien → email automatique aux acheteurs dont les critères correspondent.",hours:6,type:"commercial"},
    {name:"Relance acquéreurs",desc:"Prospect a visité sans donner suite → relance J+7 avec biens similaires disponibles.",hours:4,type:"commercial"},
    {name:"Publication multi-portails",desc:"Annonce créée une fois → publiée sur SeLoger, LeBonCoin, Bien'ici et votre site simultanément.",hours:5,type:"admin"},
    {name:"Génération de documents",desc:"Mandat, compromis, état des lieux : pré-remplis automatiquement depuis votre base de données.",hours:4,type:"admin"},
    {name:"Rapport propriétaire mensuel",desc:"Rapport automatique chaque mois : loyers perçus, charges, incidents, solde.",hours:5,type:"admin"},
  ]},
  { id:"liberal", label:"Professions libérales & conseil", emoji:"⚖️", trades:"Comptable · Avocat · Notaire · Consultant", items:[
    {name:"Collecte des pièces comptables",desc:"Vos clients déposent factures et justificatifs via un lien. Tout arrive classé dans le bon dossier.",hours:8,type:"admin"},
    {name:"Relance documents manquants",desc:"Client n'a pas envoyé ses pièces à J+10 → relance automatique avec la liste précise de ce qui manque.",hours:4,type:"relation"},
    {name:"Veille réglementaire IA",desc:"Changements légaux pertinents détectés et résumés automatiquement. Vous restez à jour sans effort.",hours:3,type:"admin"},
    {name:"Rapports clients automatiques",desc:"Tableaux de bord mensuels (CA, trésorerie, KPI) générés et envoyés aux clients à date fixe.",hours:5,type:"admin"},
    {name:"Facturation récurrente",desc:"Honoraires mensuels : les factures se génèrent et s'envoient toutes seules le 1er du mois.",hours:3,type:"admin"},
  ]},
  { id:"transport", label:"Transport & logistique", emoji:"🚛", trades:"Transporteur · Livreur · Coursier · Déménageur", items:[
    {name:"Optimisation des tournées",desc:"Livraisons du jour organisées automatiquement dans l'ordre le plus efficace. Moins de km.",hours:5,type:"admin"},
    {name:"Notifications clients temps réel",desc:"SMS au client quand le livreur part, quand il approche, quand c'est livré. Moins d'appels.",hours:4,type:"relation"},
    {name:"Suivi temps et kilométrage",desc:"Heures et km de chaque chauffeur remplis automatiquement via GPS. Fini les feuilles papier.",hours:4,type:"admin"},
    {name:"Facturation au trajet",desc:"Livraison terminée → facture générée avec le bon tarif (poids, distance, urgence).",hours:4,type:"admin"},
  ]},
  { id:"pme", label:"PME & services", emoji:"🏢", trades:"PME générale · ESN · Bureau d'études · Agence", items:[
    {name:"CRM et suivi pipeline commercial",desc:"Chaque contact, échange, relance tracé automatiquement. Pipeline visible en un coup d'œil.",hours:4,type:"commercial"},
    {name:"Onboarding nouveau client",desc:"Nouveau client signé → workflow : kit bienvenue, collecte accès, création dossier, planification kick-off.",hours:4,type:"relation"},
    {name:"Reporting automatique",desc:"Les KPI du mois se compilent, un rapport PDF personnalisé part au client. Vous ne touchez à rien.",hours:5,type:"admin"},
    {name:"Timetracking → facturation",desc:"Les heures pointées deviennent des lignes de facture au bon taux horaire, automatiquement.",hours:3,type:"admin"},
    {name:"Veille concurrentielle IA",desc:"Actualités de vos concurrents et de votre secteur collectées et résumées chaque semaine.",hours:3,type:"admin"},
  ]},
];

function Badge({hours}){return(<div style={{display:"flex",alignItems:"center",gap:5,background:T.greenLight,borderRadius:16,padding:"3px 10px",whiteSpace:"nowrap"}}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.green} strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg><span style={{fontSize:12,fontWeight:700,color:T.green}}>{hours}h/mois</span></div>)}
function Type({type}){const t=typeMap[type];return(<span style={{fontSize:10,fontWeight:600,color:t.color,background:t.bg,borderRadius:4,padding:"2px 7px",textTransform:"uppercase",letterSpacing:"0.4px"}}>{t.label}</span>)}

export default function App(){
  const[active,setActive]=useState("all");
  const[typeFilter,setTypeFilter]=useState("all");
  const filtered=useMemo(()=>{
    const s=active==="all"?sectors:sectors.filter(x=>x.id===active);
    return s.map(sec=>({...sec,items:typeFilter==="all"?sec.items:sec.items.filter(i=>i.type===typeFilter)})).filter(sec=>sec.items.length>0);
  },[active,typeFilter]);
  const totalH=filtered.reduce((s,sec)=>s+sec.items.reduce((a,i)=>a+i.hours,0),0);
  const totalN=filtered.reduce((s,sec)=>s+sec.items.length,0);

  return(
    <div style={{fontFamily:"'Inter','Space Grotesk',-apple-system,system-ui,sans-serif",color:T.text,background:"transparent"}}>
      <style>{`
        @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .fi{animation:fadeIn .4s ease-out both}
        .pill{padding:7px 14px;border-radius:20px;font-size:12px;font-weight:500;cursor:pointer;border:1px solid ${T.border};background:transparent;color:${T.textMuted};transition:all .15s;white-space:nowrap;display:flex;align-items:center;gap:5px;font-family:inherit}
        .pill:hover{border-color:${T.red};color:${T.red}}
        .pill.on{background:${T.redLight};color:${T.red};border-color:${T.borderHover}}
        .tp{padding:5px 10px;border-radius:6px;font-size:11px;font-weight:500;cursor:pointer;border:none;background:transparent;color:${T.textDim};transition:all .15s;font-family:inherit}
        .tp:hover{color:${T.textMuted}}
        .tp.on{background:${T.bgCardHover};color:${T.text}}
        .card{background:${T.bgCard};border-radius:10px;padding:16px 20px;border:1px solid ${T.border};transition:all .2s}
        .card:hover{background:${T.bgCardHover};border-color:${T.borderHover}}
        .grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
        @media(max-width:768px){.grid{grid-template-columns:1fr}.stats{flex-direction:column!important;gap:10px!important}.scroll{overflow-x:auto;-webkit-overflow-scrolling:touch}}
      `}</style>

      {/* Hero */}
      <section style={{background:`linear-gradient(160deg,${T.bg} 0%,${T.bg2} 50%,${T.bg} 100%)`,padding:"60px 20px 44px",borderBottom:`1px solid ${T.border}`}}>
        <div style={{maxWidth:900,margin:"0 auto",textAlign:"center"}}>
          <p style={{fontSize:12,fontWeight:600,color:T.red,letterSpacing:"2px",textTransform:"uppercase",marginBottom:12}}>Alliance Digitale — Automatisation</p>
          <h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(28px,4.5vw,46px)",fontWeight:700,color:T.white,lineHeight:1.12,letterSpacing:"-0.5px",marginBottom:14}}>
            Ce que l'automatisation<br/>peut faire pour votre entreprise
          </h1>
          <p style={{fontSize:16,color:T.textMuted,maxWidth:540,margin:"0 auto 28px",lineHeight:1.6}}>
            Des dizaines de tâches que vous faites à la main chaque mois — et qui pourraient tourner toutes seules.
          </p>
          <div className="stats" style={{display:"flex",justifyContent:"center",gap:24,flexWrap:"wrap"}}>
            {[{v:totalH+"h",l:"gagnées / mois",c:T.red},{v:totalN,l:"automatisations",c:T.white},{v:sectors.length,l:"secteurs",c:T.white}].map((s,i)=>(
              <div key={i} style={{background:T.bgCard,border:`1px solid ${T.border}`,borderRadius:10,padding:"16px 28px",textAlign:"center",minWidth:130,backdropFilter:"blur(8px)"}}>
                <div style={{fontFamily:"'Space Grotesk'",fontSize:36,fontWeight:700,color:s.c,lineHeight:1}}>{s.v}</div>
                <div style={{fontSize:11,color:T.textDim,marginTop:3,fontWeight:500}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section style={{borderBottom:`1px solid ${T.border}`,padding:"12px 20px",position:"sticky",top:0,zIndex:100,background:"rgba(7,13,24,0.95)",backdropFilter:"blur(12px)"}}>
        <div style={{maxWidth:900,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
          <div className="scroll" style={{display:"flex",gap:5,flexWrap:"nowrap"}}>
            <button className={`pill ${active==="all"?"on":""}`} onClick={()=>setActive("all")}>Tous</button>
            {sectors.map(s=><button key={s.id} className={`pill ${active===s.id?"on":""}`} onClick={()=>setActive(s.id)}><span>{s.emoji}</span>{s.label}</button>)}
          </div>
          <div style={{display:"flex",gap:2,background:T.bgCard,borderRadius:8,padding:3}}>
            {[{id:"all",l:"Tout"},{id:"commercial",l:"Commercial"},{id:"admin",l:"Admin"},{id:"relation",l:"Relation"}].map(t=>(
              <button key={t.id} className={`tp ${typeFilter===t.id?"on":""}`} onClick={()=>setTypeFilter(t.id)}>{t.l}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{maxWidth:900,margin:"0 auto",padding:"32px 20px 60px"}}>
        {filtered.map(sec=>{
          const sh=sec.items.reduce((a,i)=>a+i.hours,0);
          return(
            <div key={sec.id} style={{marginBottom:40}} className="fi">
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,flexWrap:"wrap",gap:8}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:24}}>{sec.emoji}</span>
                  <div>
                    <h2 style={{fontFamily:"'Space Grotesk'",fontSize:20,fontWeight:700,color:T.white,lineHeight:1.2}}>{sec.label}</h2>
                    <p style={{fontSize:11,color:T.textDim}}>{sec.trades}</p>
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:6,background:T.redLight,borderRadius:16,padding:"4px 12px"}}>
                  <span style={{fontSize:11,color:T.textMuted}}>Gain :</span>
                  <span style={{fontFamily:"'Space Grotesk'",fontSize:16,fontWeight:700,color:T.red}}>{sh}h/mois</span>
                </div>
              </div>
              <div className="grid">
                {sec.items.map((it,j)=>(
                  <div key={j} className="card">
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10,marginBottom:6}}>
                      <h3 style={{fontSize:14,fontWeight:600,color:T.text,lineHeight:1.3,flex:1}}>{it.name}</h3>
                      <Badge hours={it.hours}/>
                    </div>
                    <p style={{fontSize:12,color:T.textMuted,lineHeight:1.6,marginBottom:8}}>{it.desc}</p>
                    <Type type={it.type}/>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        {filtered.length===0&&<div style={{textAlign:"center",padding:"48px 20px",color:T.textDim}}><p>Aucune automatisation ne correspond à ces filtres.</p></div>}
      </section>

      {/* CTA */}
      <section style={{borderTop:`1px solid ${T.border}`,padding:"48px 20px",background:`linear-gradient(160deg,${T.bg2},${T.bg})`}}>
        <div style={{maxWidth:560,margin:"0 auto",textAlign:"center"}}>
          <h2 style={{fontFamily:"'Space Grotesk'",fontSize:"clamp(22px,3vw,30px)",fontWeight:700,color:T.white,marginBottom:10}}>Combien de temps perdez-vous chaque mois ?</h2>
          <p style={{fontSize:14,color:T.textMuted,marginBottom:24,lineHeight:1.6}}>Un appel de 30 minutes suffit pour identifier ce qui peut être automatisé chez vous. C'est gratuit et sans engagement.</p>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
            <a href="/contact/" style={{background:`linear-gradient(135deg,${T.red} 0%,${T.redDark} 100%)`,color:"#fff",border:"none",padding:"12px 24px",borderRadius:8,fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"'Space Grotesk'",textDecoration:"none",display:"inline-flex",alignItems:"center",gap:8}}>Réserver mon audit gratuit →</a>
            <a href="tel:0686943489" style={{background:T.bgCard,color:T.text,border:`1px solid ${T.border}`,padding:"12px 20px",borderRadius:8,fontSize:14,fontWeight:600,textDecoration:"none",fontFamily:"inherit",display:"inline-flex",alignItems:"center"}}>06 86 94 34 89</a>
          </div>
          <p style={{fontSize:10,color:T.textDim,marginTop:16}}>Alliance Digitale — Automatisation, IA et digitalisation pour PME · Sarthe & Pays de la Loire</p>
        </div>
      </section>
    </div>
  );
}