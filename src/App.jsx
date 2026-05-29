import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from './supabase';

// ─── TRANSLATIONS ────────────────────────────────────────────────────────────
const T = {
  en: {
    flag: '🇺🇸', langLabel: 'English',
    nav: {
      register: 'Register', login: 'Login', howItWorks: 'How It Works',
      about: 'About', earningsTiers: 'Earnings Tiers', legals: 'Legals',
      riskDisclaimer: 'Risk Disclaimer', contactUs: 'Contact Us',
    },
    hero: {
      line1: 'Trade with Purpose.',
      line2: 'Grow with Community.',
      sub: 'PPG Trading Club connects everyday people with vetted professional traders. Your money stays in your own broker account at all times. Our managers trade on your behalf using view-only access — they can never withdraw your funds.',
      cta: 'Join the Club — $4.99/Mo',
      secondary: 'How It Works',
    },
    about: {
      eyebrow: 'About Us',
      heading: 'Penny Partners Group',
      p1: 'Penny Partners Group (PPG Solutions) is a registered financial services company that connects individual traders with professional trading managers operating on MT5.',
      p2: 'Our managers are thoroughly vetted and must enter the platform through a referral from an existing insider — just like traders. Your capital always remains in your own broker account, fully under your control.',
      card1Title: 'Your Money Stays With You',
      card1Desc: 'Your funds are held in your own personal broker account. PPG managers are granted view-only MT5 access to execute trades — they have no ability to withdraw or transfer your money.',
      card2Title: 'Full Transparency',
      card2Desc: 'You can monitor your account at any time through your own broker login. Every trade your manager places is visible to you in real time.',
    },
    how: {
      eyebrow: 'Getting Started',
      heading: 'How to Join PPG Trading Club',
    },
    risk: {
      eyebrow: 'Choose Your Target',
      heading: 'Potential Daily Earnings Tiers',
      subtitle: 'Each tier represents a potential daily earnings target — not a guarantee. Higher targets require larger, more aggressive trades. The higher your target, the greater the risk to your entire capital. Hitting your target every single day is not realistic and should not be expected.',
      warning: 'Important: These percentages are daily earnings targets, not guaranteed returns. To pursue higher targets, your manager must take larger positions — which means your full account balance is at risk of significant loss. Past trading results do not guarantee future performance. Only trade with money you can afford to lose.',
    },
    legal: {
      eyebrow: 'Legal & Compliance',
      heading: 'Regulatory Standing & Disclosures',
      card1Title: 'Corporate Registration',
      card1Desc: 'Penny Partners Group is a formally registered business entity, fully compliant with and registered under the Corporate Affairs Commission of Nigeria.',
      card2Title: 'Terms of Service',
      card2Desc: 'By joining PPG Trading Club, you confirm that you understand the risks involved in forex trading, that your funds remain in your own broker account, and that PPG managers operate strictly on a view-only, trade-execution basis with no withdrawal access.',
      card3Title: 'Risk Disclaimer',
      card3Desc: 'Forex trading carries a high level of risk and may not be suitable for all investors. You can lose some or all of your invested capital. Daily earnings targets are not guaranteed — markets are unpredictable. Only participate with money you can afford to lose entirely.',
      card4Title: 'Identity & Compliance',
      card4Desc: 'All members — both traders and managers — must complete identity verification through our Digital Passport (DP) system. This vetting process protects the community and ensures every participant is accountable. We cooperate with regulatory authorities as required.',
    },
    modal: {
      heading: 'Membership Application',
      sub: 'Please provide accurate details so we can verify and set up your account.',
      success: 'Application received successfully. Our team will review your details and contact you directly on WhatsApp within 24 hours to complete your setup.',
      name: 'Full Legal Name', email: 'Email Address', phone: 'Phone / WhatsApp Number',
      phonePlaceholder: '+234...', country: 'Country of Residence',
      referral: 'Referral ID', referralPlaceholder: 'Required to join',
      earningsTarget: 'Daily Earnings Target', broker: 'Broker Preference',
      brokerOptions: ['No Preference', 'Exness (Recommended)', 'HFM', 'FXTM'],
      submit: 'Submit Application', submitting: 'Submitting...',
      disclaimer: 'Risk Warning: Forex trading involves significant risk of loss. Daily earnings targets are not guaranteed. By submitting this application, you confirm that any funds you deposit with your broker are money you can afford to lose, and that no fixed returns have been promised to you.',
    },
    footer: {
      desc: 'A private, referral-gated network connecting traders with vetted professional managers for managed MT5 forex trading.',
      col1: 'Platform', col2: 'Account', col3: 'Legal',
      col1Links: ['About PPG', 'How It Works', 'Earnings Tiers'],
      col2Links: ['Identity Verification', 'Digital Passport', 'Referral System'],
      col3Links: ['Terms of Service', 'Risk Disclaimer', 'Privacy Policy'],
      address: '10 Arab Road, Calabar, Nigeria',
      copy: '© 2026 PPG Solutions Global Trading Co. All rights reserved.',
      riskNote: 'Risk Warning: Forex trading involves substantial risk of loss and is not suitable for all investors. Daily earnings targets shown are not guaranteed. Past trading performance does not indicate future results.',
    },
    tiers: [
      { pct: '0.1%', label: 'Micro', risk: 'Minimal Risk', desc: 'Ultra-conservative approach. Your manager targets very small daily gains to preserve your capital above all else.', daily: '$0.10', color: '#4ade80' },
      { pct: '0.5%', label: 'Cautious', risk: 'Very Low Risk', desc: 'Conservative growth focus. Capital protection remains the top priority under active market conditions.', daily: '$0.50', color: '#86efac' },
      { pct: '1%', label: 'Conservative', risk: 'Low Risk', desc: 'Balanced target with realistic compounding potential. A popular starting point for new traders entering the club.', daily: '$1.00', color: '#fbbf24', badge: 'Popular' },
      { pct: '5%', label: 'Moderate', risk: 'Medium Risk', desc: 'Higher targets require larger trade sizes. Suitable for traders who understand and accept regular account fluctuations.', daily: '$5.00', color: '#f97316' },
      { pct: '10%', label: 'Balanced', risk: 'Med-High Risk', desc: 'Significant daily swings are common at this level. Markets do not move predictably and drawdowns occur frequently.', daily: '$10.00', color: '#fb923c' },
      { pct: '15%', label: 'Aggressive', risk: 'High Risk', desc: 'Large capital swings are expected. This tier is only suitable for experienced traders who can emotionally and financially absorb heavy losses.', daily: '$15.00', color: '#f43f5e' },
      { pct: '20%', label: 'Maximum', risk: 'Very High Risk', desc: 'Maximum exposure on every trade. Your entire capital is at significant risk at this level. Only choose this if you can afford to lose everything.', daily: '$20.00', color: '#dc2626' },
    ],
    steps: [
      { n: '01', title: 'Get a Member Referral', desc: 'PPG Trading Club is invitation-only. You must receive a referral code from an existing verified member before you can register. This keeps our community trusted and accountable.' },
      { n: '02', title: 'Pay the Monthly Subscription', desc: 'Activate your account with the $4.99 monthly platform fee. Accepted payment methods include Opay, Zenith Bank, Bitcoin, Ethereum, or USDT TRC20.' },
      { n: '03', title: 'Verify Your Identity', desc: 'Upload a valid government-issued ID to complete your Digital Passport (DP) verification. This is required for all members and cannot be transferred.' },
      { n: '04', title: 'Refer at Least One Member', desc: 'To activate full account access, you must refer at least one new participant into the club. This ensures every member has a stake in the quality of the community.' },
      { n: '05', title: 'Open Your Broker Account', desc: 'Create your own private trading account directly with one of our recommended brokers. Your funds stay in your name at all times — PPG never holds or touches your money.' },
      { n: '06', title: 'Choose Your Earnings Target', desc: 'Select a daily earnings target tier based on how much risk you are willing to take. Your assigned manager will trade on MT5 using view-only access to your account — they cannot withdraw your funds.' },
    ],
  },
  fr: {
    flag: '🇫🇷', langLabel: 'Français',
    nav: {
      register: 'S\'inscrire', login: 'Connexion', howItWorks: 'Comment ça marche',
      about: 'À propos', earningsTiers: 'Niveaux de gains', legals: 'Légal',
      riskDisclaimer: 'Avertissement de risque', contactUs: 'Nous contacter',
    },
    hero: {
      line1: 'Tradez avec intention.',
      line2: 'Grandissez en communauté.',
      sub: 'PPG Trading Club met en relation des particuliers avec des traders professionnels vérifiés. Votre argent reste dans votre propre compte de courtage à tout moment. Nos gestionnaires tradent en votre nom avec un accès lecture seule — ils ne peuvent jamais retirer vos fonds.',
      cta: 'Rejoindre le Club — 4,99$/mois',
      secondary: 'Comment ça marche',
    },
    about: {
      eyebrow: 'À propos',
      heading: 'Penny Partners Group',
      p1: 'Penny Partners Group (PPG Solutions) est une société de services financiers enregistrée qui met en relation des traders individuels avec des gestionnaires de trading professionnels opérant sur MT5.',
      p2: 'Nos gestionnaires sont soigneusement vérifiés et doivent rejoindre la plateforme via une recommandation d\'un membre existant — tout comme les traders. Votre capital reste toujours dans votre propre compte de courtage, sous votre contrôle total.',
      card1Title: 'Votre argent reste chez vous',
      card1Desc: 'Vos fonds sont détenus dans votre compte de courtage personnel. Les gestionnaires PPG bénéficient d\'un accès lecture seule MT5 pour exécuter les trades — ils ne peuvent pas retirer ni transférer votre argent.',
      card2Title: 'Transparence totale',
      card2Desc: 'Vous pouvez surveiller votre compte à tout moment via votre propre connexion courtier. Chaque trade effectué par votre gestionnaire est visible en temps réel.',
    },
    how: {
      eyebrow: 'Démarrer',
      heading: 'Comment rejoindre PPG Trading Club',
    },
    risk: {
      eyebrow: 'Choisissez votre objectif',
      heading: 'Niveaux de gains quotidiens potentiels',
      subtitle: 'Chaque niveau représente un objectif de gains quotidiens potentiels — pas une garantie. Des objectifs plus élevés nécessitent des transactions plus importantes et agressives. Plus votre objectif est élevé, plus le risque pour votre capital est grand.',
      warning: 'Important : Ces pourcentages sont des objectifs de gains quotidiens, pas des rendements garantis. Atteindre votre objectif chaque jour n\'est pas réaliste et ne devrait pas être attendu.',
    },
    legal: {
      eyebrow: 'Légal & Conformité',
      heading: 'Statut réglementaire & divulgations',
      card1Title: 'Enregistrement d\'entreprise',
      card1Desc: 'Penny Partners Group est une entité commerciale formellement enregistrée, pleinement conforme et enregistrée auprès de la Commission des affaires d\'entreprise du Nigeria.',
      card2Title: 'Conditions d\'utilisation',
      card2Desc: 'En rejoignant PPG Trading Club, vous confirmez que vous comprenez les risques liés au trading forex, que vos fonds restent dans votre propre compte de courtage, et que les gestionnaires PPG opèrent uniquement en lecture seule.',
      card3Title: 'Avertissement de risque',
      card3Desc: 'Le trading forex comporte un niveau élevé de risque. Vous pouvez perdre tout ou partie de votre capital investi. Les objectifs de gains quotidiens ne sont pas garantis. Ne participez qu\'avec de l\'argent que vous pouvez vous permettre de perdre.',
      card4Title: 'Identité & Conformité',
      card4Desc: 'Tous les membres doivent compléter la vérification d\'identité via notre système Digital Passport (DP). Ce processus protège la communauté et garantit que chaque participant est responsable.',
    },
    modal: {
      heading: 'Demande d\'adhésion',
      sub: 'Veuillez fournir des informations exactes pour que nous puissions vérifier et configurer votre compte.',
      success: 'Demande reçue avec succès. Notre équipe examinera vos détails et vous contactera sur WhatsApp dans les 24 heures.',
      name: 'Nom légal complet', email: 'Adresse e-mail', phone: 'Téléphone / WhatsApp',
      phonePlaceholder: '+234...', country: 'Pays de résidence',
      referral: 'ID de parrainage', referralPlaceholder: 'Requis pour rejoindre',
      earningsTarget: 'Objectif de gains quotidien', broker: 'Préférence de courtier',
      brokerOptions: ['Aucune préférence', 'Exness (Le Recommandé)', 'HFM', 'FXTM'],
      submit: 'Soumettre la demande', submitting: 'Envoi en cours...',
      disclaimer: 'Avertissement de risque : Le trading forex implique un risque significatif de perte. En soumettant cette demande, vous confirmez que les fonds que vous déposez sont des fonds que vous pouvez vous permettre de perdre.',
    },
    footer: {
      desc: 'Un réseau privé sur recommandation reliant les traders à des gestionnaires professionnels vérifiés pour le trading forex géré sur MT5.',
      col1: 'Plateforme', col2: 'Compte', col3: 'Légal',
      col1Links: ['À propos de PPG', 'Comment ça marche', 'Niveaux de gains'],
      col2Links: ['Vérification d\'identité', 'Passeport numérique', 'Système de parrainage'],
      col3Links: ['Conditions d\'utilisation', 'Avertissement de risque', 'Politique de confidentialité'],
      address: '10 Arab Road, Calabar, Nigéria',
      copy: '© 2026 PPG Solutions Global Trading Co. Tous droits réservés.',
      riskNote: 'Avertissement : Le trading forex comporte des risques substantiels. Les objectifs de gains affichés ne sont pas garantis.',
    },
    tiers: [
      { pct: '0.1%', label: 'Micro', risk: 'Risque minimal', desc: 'Approche ultra-conservatrice. Votre gestionnaire vise de très petits gains quotidiens pour préserver votre capital avant tout.', daily: '0,10$', color: '#4ade80' },
      { pct: '0.5%', label: 'Prudent', risk: 'Risque très faible', desc: 'Focus sur la croissance conservative. La protection du capital reste la priorité absolue dans des conditions de marché actives.', daily: '0,50$', color: '#86efac' },
      { pct: '1%', label: 'Conservateur', risk: 'Faible risque', desc: 'Objectif équilibré avec un potentiel de capitalisation réaliste. Un point de départ populaire pour les nouveaux traders.', daily: '1,00$', color: '#fbbf24', badge: 'Populaire' },
      { pct: '5%', label: 'Modéré', risk: 'Risque moyen', desc: 'Des objectifs plus élevés nécessitent des positions plus importantes. Adapté aux traders qui comprennent et acceptent les fluctuations régulières.', daily: '5,00$', color: '#f97316' },
      { pct: '10%', label: 'Équilibré', risk: 'Risque moyen-élevé', desc: 'Des fluctuations quotidiennes importantes sont courantes à ce niveau. Les marchés ne se déplacent pas de manière prévisible.', daily: '10,00$', color: '#fb923c' },
      { pct: '15%', label: 'Agressif', risk: 'Risque élevé', desc: 'De grandes variations de capital sont attendues. Ce niveau convient uniquement aux traders expérimentés pouvant absorber des pertes importantes.', daily: '15,00$', color: '#f43f5e' },
      { pct: '20%', label: 'Maximum', risk: 'Risque très élevé', desc: 'Exposition maximale sur chaque transaction. L\'intégralité de votre capital est à risque significatif. Choisissez cela uniquement si vous pouvez tout perdre.', daily: '20,00$', color: '#dc2626' },
    ],
    steps: [
      { n: '01', title: 'Obtenez une recommandation', desc: 'PPG Trading Club est sur invitation uniquement. Vous devez recevoir un code de parrainage d\'un membre vérifié existant avant de pouvoir vous inscrire.' },
      { n: '02', title: 'Payez l\'abonnement mensuel', desc: 'Activez votre compte avec les frais mensuels de 4,99$. Modes de paiement acceptés : Opay, Zenith Bank, Bitcoin, Ethereum ou USDT TRC20.' },
      { n: '03', title: 'Vérifiez votre identité', desc: 'Téléchargez une pièce d\'identité officielle pour compléter votre vérification Digital Passport (DP). Obligatoire pour tous les membres.' },
      { n: '04', title: 'Parrainez au moins un membre', desc: 'Pour activer l\'accès complet au compte, vous devez parrainer au moins un nouveau participant dans le club.' },
      { n: '05', title: 'Ouvrez votre compte courtier', desc: 'Créez votre propre compte de trading privé directement avec l\'un de nos courtiers recommandés. Vos fonds restent en votre nom à tout moment.' },
      { n: '06', title: 'Choisissez votre objectif de gains', desc: 'Sélectionnez un niveau d\'objectif de gains quotidien selon votre tolérance au risque. Votre gestionnaire tradent sur MT5 avec un accès lecture seule.' },
    ],
  },
  es: {
    flag: '🇪🇸', langLabel: 'Español',
    nav: {
      register: 'Registrarse', login: 'Iniciar sesión', howItWorks: 'Cómo funciona',
      about: 'Acerca de', earningsTiers: 'Nivel de ganancias', legals: 'Legal',
      riskDisclaimer: 'Aviso de riesgo', contactUs: 'Contáctenos',
    },
    hero: {
      line1: 'Opera con propósito.',
      line2: 'Crece en comunidad.',
      sub: 'PPG Trading Club conecta a personas comunes con traders profesionales verificados. Tu dinero permanece en tu propia cuenta de broker en todo momento. Nuestros gestores operan en tu nombre con acceso de solo lectura — nunca pueden retirar tus fondos.',
      cta: 'Únete al Club — $4.99/mes',
      secondary: 'Cómo funciona',
    },
    about: {
      eyebrow: 'Sobre nosotros',
      heading: 'Penny Partners Group',
      p1: 'Penny Partners Group (PPG Solutions) es una empresa de servicios financieros registrada que conecta a traders individuales con gestores de trading profesionales que operan en MT5.',
      p2: 'Nuestros gestores son minuciosamente verificados y deben unirse a la plataforma a través de una referencia de un miembro existente. Tu capital siempre permanece en tu propia cuenta de broker, totalmente bajo tu control.',
      card1Title: 'Tu dinero se queda contigo',
      card1Desc: 'Tus fondos se mantienen en tu cuenta de broker personal. Los gestores de PPG tienen acceso de solo lectura en MT5 para ejecutar operaciones — no pueden retirar ni transferir tu dinero.',
      card2Title: 'Transparencia total',
      card2Desc: 'Puedes monitorear tu cuenta en cualquier momento a través de tu propio inicio de sesión del broker. Cada operación que realiza tu gestor es visible para ti en tiempo real.',
    },
    how: {
      eyebrow: 'Comenzar',
      heading: 'Cómo unirse a PPG Trading Club',
    },
    risk: {
      eyebrow: 'Elige tu objetivo',
      heading: 'Niveles de ganancias diarias potenciales',
      subtitle: 'Cada nivel representa un objetivo de ganancias diarias potenciales — no una garantía. Los objetivos más altos requieren operaciones más grandes y agresivas. Cuanto mayor sea tu objetivo, mayor será el riesgo para todo tu capital.',
      warning: 'Importante: Estos porcentajes son objetivos de ganancias diarias, no rendimientos garantizados. Alcanzar tu objetivo todos los días no es realista y no debe esperarse.',
    },
    legal: {
      eyebrow: 'Legal y cumplimiento',
      heading: 'Situación regulatoria y divulgaciones',
      card1Title: 'Registro corporativo',
      card1Desc: 'Penny Partners Group es una entidad comercial formalmente registrada, totalmente conforme y registrada bajo la Comisión de Asuntos Corporativos de Nigeria.',
      card2Title: 'Términos de servicio',
      card2Desc: 'Al unirte a PPG Trading Club, confirmas que entiendes los riesgos del trading de forex, que tus fondos permanecen en tu propia cuenta de broker, y que los gestores de PPG operan estrictamente en modo de solo lectura.',
      card3Title: 'Aviso de riesgo',
      card3Desc: 'El trading de forex conlleva un alto nivel de riesgo. Puedes perder parte o todo tu capital invertido. Los objetivos de ganancias diarias no están garantizados. Solo participa con dinero que puedas permitirte perder.',
      card4Title: 'Identidad y cumplimiento',
      card4Desc: 'Todos los miembros deben completar la verificación de identidad a través de nuestro sistema Digital Passport (DP). Este proceso protege a la comunidad y garantiza que cada participante sea responsable.',
    },
    modal: {
      heading: 'Solicitud de membresía',
      sub: 'Por favor, proporciona detalles precisos para que podamos verificar y configurar tu cuenta.',
      success: 'Solicitud recibida con éxito. Nuestro equipo revisará tus detalles y te contactará por WhatsApp dentro de 24 horas.',
      name: 'Nombre legal completo', email: 'Correo electrónico', phone: 'Teléfono / WhatsApp',
      phonePlaceholder: '+234...', country: 'País de residencia',
      referral: 'ID de referido', referralPlaceholder: 'Requerido para unirse',
      earningsTarget: 'Objetivo de ganancias diarias', broker: 'Preferencia de broker',
      brokerOptions: ['Sin preferencia', 'Exness (Recomendado)', 'HFM', 'FXTM'],
      submit: 'Enviar solicitud', submitting: 'Enviando...',
      disclaimer: 'Aviso de riesgo: El trading de forex implica un riesgo significativo de pérdida. Al enviar esta solicitud, confirmas que los fondos que deposites son dinero que puedes permitirte perder.',
    },
    footer: {
      desc: 'Una red privada por referidos que conecta traders con gestores profesionales verificados para trading de forex gestionado en MT5.',
      col1: 'Plataforma', col2: 'Cuenta', col3: 'Legal',
      col1Links: ['Sobre PPG', 'Cómo funciona', 'Niveles de ganancias'],
      col2Links: ['Verificación de identidad', 'Pasaporte digital', 'Sistema de referidos'],
      col3Links: ['Términos de servicio', 'Aviso de riesgo', 'Política de privacidad'],
      address: '10 Arab Road, Calabar, Nigeria',
      copy: '© 2026 PPG Solutions Global Trading Co. Todos los derechos reservados.',
      riskNote: 'Aviso de riesgo: El trading de forex implica un riesgo sustancial de pérdida. Los objetivos de ganancias mostrados no están garantizados.',
    },
    tiers: [
      { pct: '0.1%', label: 'Micro', risk: 'Riesgo mínimo', desc: 'Enfoque ultra-conservador. Tu gestor apunta a ganancias diarias muy pequeñas para preservar tu capital ante todo.', daily: '$0.10', color: '#4ade80' },
      { pct: '0.5%', label: 'Cauteloso', risk: 'Riesgo muy bajo', desc: 'Enfoque de crecimiento conservador. La protección del capital sigue siendo la máxima prioridad bajo condiciones de mercado activas.', daily: '$0.50', color: '#86efac' },
      { pct: '1%', label: 'Conservador', risk: 'Riesgo bajo', desc: 'Objetivo equilibrado con potencial de capitalización realista. Un punto de partida popular para nuevos traders.', daily: '$1.00', color: '#fbbf24', badge: 'Popular' },
      { pct: '5%', label: 'Moderado', risk: 'Riesgo medio', desc: 'Los objetivos más altos requieren posiciones más grandes. Adecuado para traders que entienden y aceptan fluctuaciones regulares.', daily: '$5.00', color: '#f97316' },
      { pct: '10%', label: 'Equilibrado', risk: 'Riesgo medio-alto', desc: 'Las oscilaciones diarias significativas son comunes a este nivel. Los mercados no se mueven de forma predecible.', daily: '$10.00', color: '#fb923c' },
      { pct: '15%', label: 'Agresivo', risk: 'Riesgo alto', desc: 'Se esperan grandes variaciones de capital. Este nivel solo es adecuado para traders experimentados que pueden absorber pérdidas importantes.', daily: '$15.00', color: '#f43f5e' },
      { pct: '20%', label: 'Máximo', risk: 'Riesgo muy alto', desc: 'Exposición máxima en cada operación. Todo tu capital está en riesgo significativo. Solo elige esto si puedes permitirte perderlo todo.', daily: '$20.00', color: '#dc2626' },
    ],
    steps: [
      { n: '01', title: 'Obtén una referencia', desc: 'PPG Trading Club es solo por invitación. Debes recibir un código de referido de un miembro verificado existente antes de poder registrarte.' },
      { n: '02', title: 'Paga la suscripción mensual', desc: 'Activa tu cuenta con la tarifa mensual de $4.99. Métodos de pago aceptados: Opay, Zenith Bank, Bitcoin, Ethereum o USDT TRC20.' },
      { n: '03', title: 'Verifica tu identidad', desc: 'Sube un documento de identidad oficial para completar tu verificación Digital Passport (DP). Es obligatorio para todos los miembros.' },
      { n: '04', title: 'Refiere al menos un miembro', desc: 'Para activar el acceso completo a la cuenta, debes referir al menos a un nuevo participante al club.' },
      { n: '05', title: 'Abre tu cuenta de broker', desc: 'Crea tu propia cuenta de trading privada directamente con uno de nuestros brokers recomendados. Tus fondos siempre permanecen a tu nombre.' },
      { n: '06', title: 'Elige tu objetivo de ganancias', desc: 'Selecciona un nivel de objetivo de ganancias diarias según cuánto riesgo estás dispuesto a asumir. Tu gestor operará en MT5 con acceso de solo lectura.' },
    ],
  },
};

const WORLD_COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua & Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Côte d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
  "Oman",
  "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Russia", "Rwanda",
  "Saint Kitts & Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome & Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen",
  "Zambia", "Zimbabwe"
];

// ─── ANIMATION HOOK ───────────────────────────────────────────────────────────
function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.12, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, direction = 'up', style = {} }) {
  const [ref, visible] = useScrollReveal();
  const transforms = { up: 'translateY(32px)', down: 'translateY(-32px)', left: 'translateX(-32px)', right: 'translateX(32px)' };
  return (
    <div ref={ref} style={{
      transform: visible ? 'none' : (transforms[direction] || transforms.up),
      opacity: visible ? 1 : 0,
      transition: `transform 0.65s cubic-bezier(.22,1,.36,1) ${delay}ms, opacity 0.65s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function AgeRestrictionBadge() {
  const g = {
    background: 'linear-gradient(90deg,#8a6520,#f5e098,#c4a050,#f5e098,#8a6520)',
    backgroundSize: '200% auto', WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent', backgroundClip: 'text',
    animation: 'shimmer 4s linear infinite',
  };
  return (
    <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', background:'#03050d', border:'1px solid rgba(196,160,80,0.4)', height:'16px', padding:'0 5px', borderRadius:'4px', marginLeft:'6px', verticalAlign:'middle', boxShadow:'0 2px 6px rgba(196,160,80,0.15)' }}>
      <span style={{ ...g, fontSize:'9px', fontWeight:900, letterSpacing:'0.05em' }}>18+</span>
    </span>
  );
}

function Logo() {
  const g = {
    background: 'linear-gradient(90deg,#8a6520,#f5e098,#c4a050,#f5e098,#8a6520)',
    backgroundSize: '200% auto', WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent', backgroundClip: 'text',
    animation: 'shimmer 4s linear infinite',
  };
  return (
    <div style={{ lineHeight:1, display:'inline-block' }}>
      <div style={{ fontFamily:'Georgia,serif', fontSize:'24px', fontWeight:900, fontStyle:'italic', letterSpacing:'1px', ...g }}>Trading Club</div>
      <div style={{ display:'flex', alignItems:'center', gap:'4px', marginTop:'3px' }}>
        <div style={{ flex:1, height:'1px', background:'rgba(196,160,80,0.3)' }} />
        <div style={{ fontFamily:'sans-serif', fontSize:'7.5px', letterSpacing:'3.5px', fontWeight:800, ...g }}>PENNY PARTNERS GROUP</div>
        <div style={{ flex:1, height:'1px', background:'rgba(196,160,80,0.3)' }} />
      </div>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ onOpenRegister, lang, setLang, t }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const langRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = (e) => { 
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setMenuOpen(false); 
      if (langRef.current && !langRef.current.contains(e.target)) setLangDropdownOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const LANGS = [
    { code: 'en', flag: '🇺🇸', label: 'English' },
    { code: 'fr', flag: '🇫🇷', label: 'Français' },
    { code: 'es', flag: '🇪🇸', label: 'Español' },
  ];

  const currentLangObj = LANGS.find(l => l.code === lang) || LANGS[0];

  return (
    <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, background:(scrolled||menuOpen)?'rgba(5,8,20,0.98)':'transparent', backdropFilter:'blur(16px)', borderBottom:'1px solid rgba(196,160,80,0.12)', transition:'all 0.3s' }}>
      <div style={{ maxWidth:'1280px', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', height:'76px', padding:'0 24px' }}>
        <a href="#" style={{ textDecoration:'none' }}><Logo /></a>
        <div style={{ display:'flex', alignItems:'center', gap:'20px' }}>

          {/* Unified Global Dropdown Selector */}
          <div ref={langRef} style={{ position:'relative', borderRight:'1px solid rgba(196,160,80,0.2)', paddingRight:'20px', display:'flex', alignItems:'center' }}>
            <button onClick={() => setLangDropdownOpen(!langDropdownOpen)} style={{
              background: 'rgba(196,160,80,0.1)',
              border: '1px solid rgba(196,160,80,0.3)',
              borderRadius: '6px', padding: '6px 12px', cursor: 'pointer',
              color: '#c4a050', fontFamily: 'sans-serif', fontSize: '13px', fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s'
            }}>
              <span style={{ fontSize: '16px' }}>{currentLangObj.flag}</span>
              <span>{currentLangObj.label}</span>
              <span style={{ fontSize: '10px' }}>▼</span>
            </button>
            
            {langDropdownOpen && (
              <div style={{ position:'absolute', top:'130%', left:0, width:'140px', background:'#0a0d1e', border:'1px solid rgba(196,160,80,0.3)', borderRadius:'8px', boxShadow:'0 8px 32px rgba(0,0,0,0.8)', overflow:'hidden', display:'flex', flexDirection:'column', zIndex:110 }}>
                {LANGS.map(l => (
                  <button key={l.code} onClick={() => { setLang(l.code); setLangDropdownOpen(false); }} style={{
                    background: lang === l.code ? 'rgba(196,160,80,0.15)' : 'transparent',
                    border: 'none', padding: '10px 14px', cursor: 'pointer',
                    color: lang === l.code ? '#c4a050' : '#b0b0d0',
                    fontFamily: 'sans-serif', fontSize: '13px', textAlign: 'left',
                    display: 'flex', alignItems: 'center', gap: '8px', width: '100%', transition: 'background 0.15s'
                  }} onMouseEnter={e => e.currentTarget.style.background='rgba(196,160,80,0.05)'} onMouseLeave={e => e.currentTarget.style.background=lang===l.code?'rgba(196,160,80,0.15)':'transparent'}>
                    <span>{l.flag}</span> {l.label}
                  </button>
                ))}
              </div>
            )}
            <AgeRestrictionBadge />
          </div>

          <div ref={dropdownRef} style={{ position:'relative' }}>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background:'linear-gradient(135deg,#c4a050,#f0d080)', color:'#050814', border:'none', padding:'10px 18px', borderRadius:'6px', fontFamily:'sans-serif', fontSize:'14px', fontWeight:800, cursor:'pointer', display:'flex', alignItems:'center', gap:'8px', transition:'transform 0.15s, box-shadow 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.transform='scale(1.04)'; e.currentTarget.style.boxShadow='0 4px 20px rgba(196,160,80,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='none'; }}>
              {t.nav.register.split(' ')[0]} {menuOpen ? '✕' : '☰'}
            </button>
            {menuOpen && (
              <div style={{ position:'absolute', top:'130%', right:0, width:'220px', background:'#0a0d1e', border:'1px solid rgba(196,160,80,0.3)', borderRadius:'8px', boxShadow:'0 12px 40px rgba(0,0,0,0.8)', overflow:'hidden', display:'flex', flexDirection:'column', animation:'fadeDown 0.2s ease' }}>
                {[
                  { label: t.nav.register, href: '#', click: (e) => { e.preventDefault(); setMenuOpen(false); onOpenRegister(); }, gold: true },
                  { label: t.nav.login, href: '#', click: (e) => { e.preventDefault(); setMenuOpen(false); onOpenRegister(); } },
                  { label: t.nav.howItWorks, href: '#how' },
                  { label: t.nav.about, href: '#about' },
                  { label: t.nav.earningsTiers, href: '#risk' },
                  { label: t.nav.legals, href: '#legal' },
                  { label: t.nav.riskDisclaimer, href: '#disclaimer' },
                  { label: t.nav.contactUs, href: '#contact' },
                ].map((item, i, arr) => (
                  <a key={i} href={item.href} onClick={item.click || (() => setMenuOpen(false))}
                    style={{ padding:'14px 20px', color: item.gold ? '#c4a050' : '#f0e8d0', textDecoration:'none', fontFamily:'sans-serif', fontSize: item.gold ? '14px' : '13px', fontWeight: item.gold ? 700 : 400, borderBottom: i < arr.length-1 ? '1px solid rgba(196,160,80,0.1)' : 'none', transition:'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background='rgba(196,160,80,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        body { background:#050814; scroll-behavior:smooth; }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes fadeDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(8px)}  to{opacity:1;transform:translateY(0)} }
      `}</style>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ onOpenRegister, t }) {
  return (
    <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden', background:'#050814', padding:'120px 24px 60px' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(196,160,80,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(196,160,80,0.02) 1px,transparent 1px)', backgroundSize:'44px 44px' }} />
      <div style={{ textAlign:'center', maxWidth:'880px', position:'relative', zIndex:2 }}>
        <Reveal delay={0}>
          <h1 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(2.2rem,6vw,4.2rem)', fontWeight:900, color:'#f0e8d0', lineHeight:1.15, marginBottom:'24px' }}>
            {t.hero.line1}<br />
            <span style={{ background:'linear-gradient(90deg,#8a6520,#f5e098,#c4a050,#f5e098,#8a6520)', backgroundSize:'200% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', animation:'shimmer 4s linear infinite' }}>{t.hero.line2}</span>
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p style={{ fontFamily:'sans-serif', fontSize:'clamp(0.95rem,2vw,1.1rem)', color:'#8080a0', lineHeight:1.7, maxWidth:'600px', margin:'0 auto 40px', fontWeight:300 }}>{t.hero.sub}</p>
        </Reveal>
        <Reveal delay={240}>
          <div style={{ display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap' }}>
            <button onClick={onOpenRegister} style={{ background:'linear-gradient(135deg,#c4a050,#f0d080)', color:'#050814', fontFamily:'sans-serif', fontWeight:700, fontSize:'14px', padding:'15px 32px', borderRadius:'8px', border:'none', cursor:'pointer', boxShadow:'0 4px 20px rgba(196,160,80,0.25)', transition:'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 30px rgba(196,160,80,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 20px rgba(196,160,80,0.25)'; }}>
              {t.hero.cta}
            </button>
            <a href="#how" style={{ border:'1px solid rgba(196,160,80,0.25)', color:'#c4a050', fontFamily:'sans-serif', fontWeight:600, fontSize:'14px', padding:'15px 32px', borderRadius:'8px', textDecoration:'none', transition:'background 0.2s, border-color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(196,160,80,0.06)'; e.currentTarget.style.borderColor='rgba(196,160,80,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='rgba(196,160,80,0.25)'; }}>
              {t.hero.secondary}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About({ t }) {
  return (
    <section id="about" style={{ padding:'100px 24px', background:'#070a1a', borderTop:'1px solid rgba(196,160,80,0.05)' }}>
      <div style={{ maxWidth:'1140px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:'56px', alignItems:'start' }}>
        <div>
          <Reveal direction="left">
            <div style={{ fontFamily:'sans-serif', fontSize:'10px', color:'#c4a050', letterSpacing:'0.15em', textTransform:'uppercase', fontWeight:700, marginBottom:'12px' }}>{t.about.eyebrow}</div>
            <h2 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(1.8rem,4vw,2.5rem)', fontWeight:900, color:'#f0e8d0', lineHeight:1.25, marginBottom:'20px' }}>{t.about.heading}</h2>
            <p style={{ fontFamily:'sans-serif', color:'#7878a0', lineHeight:1.75, fontSize:'14.5px', marginBottom:'16px' }}>{t.about.p1}</p>
            <p style={{ fontFamily:'sans-serif', color:'#7878a0', lineHeight:1.75, fontSize:'14.5px' }}>{t.about.p2}</p>
          </Reveal>
        </div>
        <div style={{ display:'grid', gap:'16px' }}>
          {[
            { title: t.about.card1Title, desc: t.about.card1Desc },
            { title: t.about.card2Title, desc: t.about.card2Desc },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 120} direction="right">
              <div style={{ background:'#050814', border:'1px solid rgba(196,160,80,0.1)', borderRadius:'12px', padding:'24px', transition:'transform 0.25s, border-color 0.25s, box-shadow 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.borderColor='rgba(196,160,80,0.25)'; e.currentTarget.style.boxShadow='0 12px 32px rgba(0,0,0,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.borderColor='rgba(196,160,80,0.1)'; e.currentTarget.style.boxShadow='none'; }}>
                <h3 style={{ fontFamily:'Georgia,serif', fontSize:'1.1rem', color:'#f0e8d0', marginBottom:'8px' }}>{item.title}</h3>
                <p style={{ fontFamily:'sans-serif', fontSize:'13.5px', color:'#686888', lineHeight:1.6 }}>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
function HowItWorks({ t }) {
  return (
    <section id="how" style={{ padding:'100px 24px', background:'#050814' }}>
      <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
        <Reveal>
          <div style={{ textAlign:'center', marginBottom:'60px' }}>
            <div style={{ fontFamily:'sans-serif', fontSize:'10px', color:'#c4a050', letterSpacing:'0.15em', textTransform:'uppercase', fontWeight:700, marginBottom:'10px' }}>{t.how.eyebrow}</div>
            <h2 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(1.8rem,4vw,2.5rem)', fontWeight:900, color:'#f0e8d0' }}>{t.how.heading}</h2>
          </div>
        </Reveal>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'20px' }}>
          {t.steps.map((step, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ background:'#070a1a', border:'1px solid rgba(196,160,80,0.08)', borderRadius:'12px', padding:'28px', transition:'transform 0.25s, border-color 0.25s, box-shadow 0.25s', height:'100%' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.borderColor='rgba(196,160,80,0.2)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(0,0,0,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.borderColor='rgba(196,160,80,0.08)'; e.currentTarget.style.boxShadow='none'; }}>
                <div style={{ fontFamily:'sans-serif', fontSize:'12px', fontWeight:700, color:'#c4a050', marginBottom:'16px', opacity:0.5 }}>{step.n}</div>
                <h3 style={{ fontFamily:'Georgia,serif', fontSize:'1.1rem', fontWeight:700, color:'#f0e8d0', marginBottom:'10px' }}>{step.title}</h3>
                <p style={{ fontFamily:'sans-serif', fontSize:'13.5px', color:'#686888', lineHeight:1.6 }}>{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EARNINGS TIERS ───────────────────────────────────────────────────────────
function RiskTiers({ t }) {
  return (
    <section id="risk" style={{ padding:'100px 24px', background:'#070a1a' }}>
      <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
        <Reveal>
          <div style={{ textAlign:'center', marginBottom:'60px' }}>
            <div style={{ fontFamily:'sans-serif', fontSize:'10px', color:'#c4a050', letterSpacing:'0.15em', textTransform:'uppercase', fontWeight:700, marginBottom:'10px' }}>{t.risk.eyebrow}</div>
            <h2 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(1.8rem,4vw,2.5rem)', fontWeight:900, color:'#f0e8d0' }}>{t.risk.heading}</h2>
            <p style={{ fontFamily:'sans-serif', fontSize:'14px', color:'#7878a0', marginTop:'14px', maxWidth:'640px', margin:'14px auto 0', lineHeight:1.6 }}>{t.risk.subtitle}</p>
          </div>
        </Reveal>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:'16px' }}>
          {t.tiers.map((tier, i) => (
            <Reveal key={i} delay={i * 70}>
              <div style={{ background:'#050814', border:'1px solid rgba(196,160,80,0.08)', borderRadius:'12px', padding:'24px', position:'relative', transition:'transform 0.25s, border-color 0.25s, box-shadow 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.borderColor=`${tier.color}44`; e.currentTarget.style.boxShadow=`0 12px 32px rgba(0,0,0,0.5)`; }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.borderColor='rgba(196,160,80,0.08)'; e.currentTarget.style.boxShadow='none'; }}>
                {tier.badge && <div style={{ position:'absolute', top:12, right:12, background:tier.color, color:'#050814', fontFamily:'sans-serif', fontSize:'9px', fontWeight:800, padding:'2px 8px', borderRadius:'4px' }}>{tier.badge}</div>}
                <div style={{ fontFamily:'Georgia,serif', fontSize:'2rem', fontWeight:900, color:tier.color }}>{tier.pct}</div>
                <div style={{ fontFamily:'sans-serif', fontWeight:700, color:'#f0e8d0', fontSize:'14px', margin:'6px 0 2px' }}>{tier.label}</div>
                <div style={{ fontFamily:'sans-serif', fontSize:'10px', color:tier.color, textTransform:'uppercase', marginBottom:'12px', fontWeight:700, letterSpacing:'0.05em' }}>{tier.risk}</div>
                <p style={{ fontFamily:'sans-serif', fontSize:'12.5px', color:'#686888', lineHeight:1.5 }}>{tier.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div style={{ background:'rgba(255,200,50,0.02)', border:'1px solid rgba(255,200,50,0.1)', borderRadius:'8px', padding:'16px 20px', display:'flex', gap:'12px', marginTop:'32px', alignItems:'center' }}>
            <span style={{ fontSize:'18px' }}>⚠️</span>
            <p style={{ fontFamily:'sans-serif', fontSize:'12.5px', color:'#9090b0', lineHeight:1.6, flex:1 }}>
              {t.risk.warning} <AgeRestrictionBadge />
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── LEGAL ────────────────────────────────────────────────────────────────────
function LegalSection({ t }) {
  const cards = [
    { icon: null, isCAC: true, title: t.legal.card1Title, desc: t.legal.card1Desc },
    { icon: '⚖️', title: t.legal.card2Title, desc: t.legal.card2Desc },
    { icon: '⚠️', title: t.legal.card3Title, desc: t.legal.card3Desc, id: 'disclaimer', hasAge: true },
    { icon: '🛡️', title: t.legal.card4Title, desc: t.legal.card4Desc },
  ];
  return (
    <section id="legal" style={{ padding:'100px 24px', background:'#050814', borderTop:'1px solid rgba(196,160,80,0.1)' }}>
      <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
        <Reveal>
          <div style={{ textAlign:'center', marginBottom:'60px' }}>
            <div style={{ fontFamily:'sans-serif', fontSize:'10px', color:'#c4a050', letterSpacing:'0.15em', textTransform:'uppercase', fontWeight:700, marginBottom:'10px' }}>{t.legal.eyebrow}</div>
            <h2 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(1.8rem,4vw,2.5rem)', fontWeight:900, color:'#f0e8d0' }}>{t.legal.heading}</h2>
          </div>
        </Reveal>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'24px' }}>
          {cards.map((card, i) => (
            <Reveal key={i} delay={i * 100}>
              <div id={card.id || undefined} style={{ background:'#070a1a', border:'1px solid rgba(196,160,80,0.12)', borderRadius:'12px', padding:'32px', textAlign:'center', transition:'transform 0.25s, border-color 0.25s, box-shadow 0.25s', height:'100%' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.borderColor='rgba(196,160,80,0.28)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(0,0,0,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.borderColor='rgba(196,160,80,0.12)'; e.currentTarget.style.boxShadow='none'; }}>
                {card.isCAC ? (
                  <div style={{ width:'84px', height:'84px', margin:'0 auto 20px', borderRadius:'50%', overflow:'hidden', border:'2px solid #c4a050', boxShadow:'0 0 20px rgba(196,160,80,0.2)' }}>
                    <img src="/cac-logo.png" alt="CAC Nigeria" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  </div>
                ) : (
                  <div style={{ width:'84px', height:'84px', margin:'0 auto 20px', background:'rgba(196,160,80,0.05)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid rgba(196,160,80,0.2)' }}>
                    <span style={{ fontSize:'28px' }}>{card.icon}</span>
                  </div>
                )}
                <h3 style={{ fontFamily:'sans-serif', fontSize:'15px', fontWeight:700, color:'#f0e8d0', marginBottom:'10px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {card.title}{card.hasAge && <AgeRestrictionBadge />}
                </h3>
                <p style={{ fontFamily:'sans-serif', fontSize:'13.5px', color:'#686888', lineHeight:1.6 }}>{card.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── REGISTER MODAL ───────────────────────────────────────────────────────────
function RegisterModal({ isOpen, onClose, t, lang }) {
  const [form, setForm] = useState({ fullName:'', email:'', password:'', phone:'', country: WORLD_COUNTRIES[0], referralId:'', riskTier:'1%', broker:'0' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      // 1. Sign up user via Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (authError) throw authError;

      if (authData?.user) {
        // 2. Insert complementary profile data mapping into public profiles
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              full_name: form.fullName,
              email: form.email,
              referral_code: form.referralId,
              status: 'pending',
              role: 'trader',
              kyc_status: 'pending'
            }
          ]);

        if (profileError) throw profileError;
      }

      setSuccess(true);
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred during submission.');
    } finally {
      setLoading(false);
    }
  };

  const inp = { width:'100%', background:'#050814', border:'1px solid rgba(196,160,80,0.25)', borderRadius:'8px', padding:'12px 14px', color:'#f0e8d0', fontFamily:'sans-serif', fontSize:'14px', outline:'none', boxSizing:'border-box', transition:'border-color 0.2s' };
  const lbl = { display:'block', fontFamily:'sans-serif', fontSize:'10.5px', fontWeight:700, color:'#c4a050', marginBottom:'6px', textTransform:'uppercase', letterSpacing:'0.08em' };

  return (
    <div style={{ position:'fixed', inset:0, zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}>
      <div onClick={onClose} style={{ position:'absolute', inset:0, background:'rgba(3,5,13,0.96)', backdropFilter:'blur(16px)' }} />
      <div style={{ position:'relative', zIndex:210, width:'100%', maxWidth:'480px', background:'#0a0d1e', border:'1px solid rgba(196,160,80,0.3)', borderRadius:'16px', padding:'40px 32px', maxHeight:'90vh', overflowY:'auto', boxShadow:'0 24px 64px rgba(0,0,0,0.7)', animation:'fadeUp 0.3s ease' }}>
        <button onClick={onClose} style={{ position:'absolute', top:20, right:20, background:'transparent', border:'none', color:'#b0a080', fontSize:'20px', cursor:'pointer', transition:'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color='#f0e8d0'} onMouseLeave={e => e.currentTarget.style.color='#b0a080'}>✕</button>
        <div style={{ textAlign:'center', marginBottom:'32px' }}>
          <h2 style={{ fontFamily:'Georgia,serif', fontSize:'1.9rem', fontWeight:900, color:'#f0e8d0', marginBottom:'6px' }}>{t.modal.heading}</h2>
          <p style={{ fontFamily:'sans-serif', color:'#8080a0', fontSize:'13px' }}>{t.modal.sub}</p>
        </div>
        {success ? (
          <div style={{ background:'rgba(74,222,128,0.05)', border:'1px solid #4ade80', color:'#4ade80', borderRadius:'10px', padding:'20px', textAlign:'center', fontFamily:'sans-serif', fontSize:'14px', lineHeight:1.6 }}>{t.modal.success}</div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'22px' }}>
            {errorMessage && (
              <div style={{ background:'rgba(220,38,38,0.1)', border:'1px solid #dc2626', color:'#f43f5e', padding:'12px', borderRadius:'8px', fontSize:'13px', fontFamily:'sans-serif' }}>
                {errorMessage}
              </div>
            )}
            {[
              { label: t.modal.name, name: 'fullName', type: 'text', required: true },
              { label: t.modal.email, name: 'email', type: 'email', required: true },
              { label: 'Account Password', name: 'password', type: 'password', required: true },
              { label: t.modal.phone, name: 'phone', type: 'tel', placeholder: t.modal.phonePlaceholder, required: true },
            ].map(f => (
              <div key={f.name}>
                <label style={lbl}>{f.label} {f.required && '*'}</label>
                <input type={f.type} name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder} required={f.required} style={inp}
                  onFocus={e => e.target.style.borderColor='rgba(196,160,80,0.6)'} onBlur={e => e.target.style.borderColor='rgba(196,160,80,0.25)'} />
              </div>
            ))}
            <div>
              <label style={lbl}>{t.modal.country}</label>
              <select name="country" value={form.country} onChange={handleChange} style={inp}>
                {WORLD_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>{t.modal.referral} *</label>
              <input type="text" name="referralId" value={form.referralId} onChange={handleChange} placeholder={t.modal.referralPlaceholder} required style={inp}
                onFocus={e => e.target.style.borderColor='rgba(196,160,80,0.6)'} onBlur={e => e.target.style.borderColor='rgba(196,160,80,0.25)'} />
            </div>
            <div>
              <label style={lbl}>{t.modal.earningsTarget}</label>
              <select name="riskTier" value={form.riskTier} onChange={handleChange} style={inp}>
                {t.tiers.map(tier => <option key={tier.pct} value={tier.pct}>{tier.pct} — {tier.label} ({tier.risk})</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>{t.modal.broker}</label>
              <select name="broker" value={form.broker} onChange={handleChange} style={inp}>
                {t.modal.brokerOptions.map((b, i) => <option key={i} value={i}>{b}</option>)}
              </select>
            </div>
            <div style={{ marginTop:'6px' }}>
              <button type="submit" disabled={loading} style={{ width:'100%', background:'linear-gradient(135deg,#c4a050,#f0d080)', color:'#050814', border:'none', borderRadius:'8px', padding:'16px', fontFamily:'sans-serif', fontWeight:800, fontSize:'14.5px', cursor:loading?'not-allowed':'pointer', boxShadow:'0 4px 16px rgba(196,160,80,0.25)', transition:'transform 0.15s, box-shadow 0.15s', opacity: loading ? 0.7 : 1 }}
                onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(196,160,80,0.4)'; }}}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 16px rgba(196,160,80,0.25)'; }}>
                {loading ? t.modal.submitting : t.modal.submit}
              </button>
            </div>
            <div style={{ borderTop:'1px solid rgba(196,160,80,0.1)', paddingTop:'16px', color:'#606080', fontFamily:'sans-serif', fontSize:'11px', lineHeight:'1.5', textAlign:'justify' }}>
              <strong>{t.modal.disclaimer}</strong> <AgeRestrictionBadge />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ t }) {
  return (
    <footer id="contact" style={{ background:'#03050d', borderTop:'1px solid rgba(196,160,80,0.08)' }}>
      <div style={{ padding:'60px 24px 30px', maxWidth:'1140px', margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'40px', marginBottom:'40px' }}>
          <Reveal direction="up">
            <div>
              <div style={{ fontFamily:'Georgia,serif', fontWeight:900, fontSize:'18px', color:'#f0d080', marginBottom:'10px' }}>PPG Trading Club</div>
              <p style={{ fontFamily:'sans-serif', fontSize:'12.5px', color:'#484868', lineHeight:1.6, marginBottom:'16px' }}>{t.footer.desc}</p>
              <div style={{ display:'flex', flexDirection:'column', gap:'4px', fontFamily:'sans-serif', fontSize:'12px', color:'#585878' }}>
                <div>contact.ppgsolutions@gmail.com</div>
                <div>+234 813 050 0659</div>
              </div>
            </div>
          </Reveal>
          {[
            { title: t.footer.col1, links: t.footer.col1Links },
            { title: t.footer.col2, links: t.footer.col2Links },
            { title: t.footer.col3, links: t.footer.col3Links },
          ].map((col, i) => (
            <Reveal key={i} delay={(i+1)*80} direction="up">
              <div>
                <div style={{ fontFamily:'sans-serif', fontSize:'9px', color:'#c4a050', letterSpacing:'0.12em', textTransform:'uppercase', fontWeight:700, marginBottom:'16px' }}>{col.title}</div>
                <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                  {col.links.map(l => (
                    <a key={l} href="#" style={{ fontFamily:'sans-serif', fontSize:'12.5px', color:'#585878', textDecoration:'none', transition:'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color='#c4a050'} onMouseLeave={e => e.currentTarget.style.color='#585878'}>{l}</a>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div style={{ borderTop:'1px solid rgba(196,160,80,0.06)', paddingTop:'24px', display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:'20px' }}>
          <div>
            <div style={{ fontFamily:'sans-serif', fontSize:'12px', color:'#585878', marginBottom:'6px', fontWeight:500 }}>📍 {t.footer.address}</div>
            <div style={{ fontFamily:'sans-serif', fontSize:'11.5px', color:'#383858' }}>{t.footer.copy}</div>
          </div>
          <div style={{ fontFamily:'sans-serif', fontSize:'11.5px', color:'#383858', maxWidth:'460px', textAlign:'justify' }}>
            {t.footer.riskNote} <AgeRestrictionBadge />
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [modalActive, setModalActive] = useState(false);
  const [lang, setLang] = useState('en');
  const t = T[lang];

  return (
    <div style={{ minHeight:'100vh', background:'#050814', color:'#f0e8d0', overflowX:'hidden' }}>
      <Navbar onOpenRegister={() => setModalActive(true)} lang={lang} setLang={setLang} t={t} />
      <Hero onOpenRegister={() => setModalActive(true)} t={t} />
      <About t={t} />
      <HowItWorks t={t} />
      <RiskTiers t={t} />
      <LegalSection t={t} />
      <Footer t={t} />
      <RegisterModal isOpen={modalActive} onClose={() => setModalActive(false)} t={t} lang={lang} />

      <a href="https://wa.me/2348130500659" target="_blank" rel="noreferrer"
        style={{ position:'fixed', bottom:'24px', right:'24px', width:'56px', height:'56px', background:'#25D366', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 6px 24px rgba(37,211,102,0.35)', textDecoration:'none', zIndex:150, transition:'transform 0.2s, box-shadow 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.transform='scale(1.1)'; e.currentTarget.style.boxShadow='0 10px 32px rgba(37,211,102,0.5)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='0 6px 24px rgba(37,211,102,0.35)'; }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.344a9.94 9.94 0 0 0 4.881 1.281h.004c5.505 0 9.989-4.478 9.99-9.985.001-2.667-1.034-5.176-2.917-7.061A9.927 9.927 0 0 0 12.012 2Zm7.067 14.126c-.29.407-1.427 1.393-1.954 1.492-.486.092-.962.152-3.32-.782-3.013-1.194-4.92-4.248-5.07-4.45-.152-.201-1.226-1.63-1.226-3.111 0-1.48.775-2.208 1.05-2.51.226-.248.601-.365.96-.365.116 0 .221.006.313.01.272.013.407.032.584.453.22.527.75 1.83.816 1.964.065.134.108.29.02.467-.09.177-.134.29-.265.444-.132.153-.277.34-.395.457-.133.13-.273.272-.116.541.157.27.7 1.147 1.498 1.854.1.09.2.174.3.253 1.03.818 1.884 1.077 2.19 1.224.282.135.446.113.612-.08.22-.257.946-1.101 1.2-1.479.2-.298.416-.248.702-.142.29.105 1.836.865 2.146 1.018.31.153.517.226.592.355.075.13.075.753-.215 1.16Z" />
        </svg>
      </a>
    </div>
  );
}
