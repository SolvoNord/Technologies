(() => {
  'use strict';
  const measurementId = 'G-8HCFSX3ZVC'; // Public measurement ID, never an API secret.
  const preferenceKey = 'solvonord-analytics-choice-v2';
  const preferenceLifetime = 180 * 24 * 60 * 60 * 1000;
  const githubHost = location.origin === 'https://solvonord.github.io' && location.pathname.startsWith('/Technologies/');
  const domainHost = ['https://solvonord.com','https://www.solvonord.com'].includes(location.origin);
  const live = githubHost || domainHost;
  const sitePath = githubHost ? '/Technologies/' : '/';
  const publicPage = domainHost ? 'https://solvonord.com/' : 'https://solvonord.github.io/Technologies/';
  const banner = document.getElementById('analytics-choice');
  if (!banner) return;
  const copy = {
    fr: {
      title: 'Les cookies',
      text: 'Avec votre accord, nous utilisons des cookies et des technologies similaires pour recueillir des informations sur votre appareil et votre navigation sur ce site, afin de :',
      purposeTraffic: 'Mesurer la fréquentation du site',
      purposeExperience: 'Améliorer votre expérience de navigation',
      essential: 'Vous pouvez accepter ou refuser ces technologies facultatives. Les fonctions nécessaires au site restent disponibles.',
      more: 'Consulter notre politique de confidentialité',
      accept: 'Accepter', decline: 'Refuser', settings: 'Préférences des cookies',
      policyTitle: 'Cookies et technologies de mesure',
      definition: 'Un cookie est un petit fichier enregistré par votre navigateur sur votre appareil. Certains cookies permettent de comprendre comment un site est utilisé.',
      detail: 'Avec votre accord, notre outil de mesure d’audience, Google Analytics, recueille des informations sur les visites, le type d’appareil, la localisation approximative et des actions comme les clics de contact ou l’envoi d’une demande. Ces statistiques nous aident à améliorer le site. Vos réponses, coordonnées, fichiers et références de demande ne sont pas transmis à cet outil. Les fonctions publicitaires et les offres personnalisées sont désactivées.',
      preference: 'Ces cookies facultatifs ne sont activés qu’après votre accord. Vous pouvez les refuser et continuer à utiliser le site et le formulaire. Votre choix est enregistré dans votre navigateur pendant 180 jours; les cookies de mesure sont configurés pour durer au maximum 30 jours. Vous pouvez changer votre choix à tout moment avec « Préférences des cookies », en bas de page.',
      storage: 'Le stockage nécessaire au fonctionnement sert à mémoriser votre choix et, pendant la session, les détails de confirmation d’une demande. Il ne contient ni le texte de votre demande, ni vos coordonnées, ni vos fichiers.',
      learn: 'Comment Google utilise les données',
      allowed: 'Cookies de mesure : acceptés.', denied: 'Cookies de mesure : refusés.', unknown: 'Cookies de mesure : en attente de votre choix.'
    },
    en: {
      title: 'Cookies',
      text: 'With your consent, we use cookies and similar technologies to collect information about your device and your browsing on this site, to:',
      purposeTraffic: 'Measure website traffic',
      purposeExperience: 'Improve your browsing experience',
      essential: 'You can accept or decline these optional technologies. Essential website functions remain available.',
      more: 'Read our privacy policy',
      accept: 'Accept', decline: 'Decline', settings: 'Cookie preferences',
      policyTitle: 'Cookies and measurement technologies',
      definition: 'A cookie is a small file saved on your device by your browser. Some cookies help us understand how a website is used.',
      detail: 'With your consent, our audience measurement tool, Google Analytics, collects information about visits, device type, approximate location and actions such as contact clicks or submitting a request. These statistics help us improve the site. Your answers, contact details, files and request references are not sent to this tool. Advertising features and personalized offers are disabled.',
      preference: 'These optional cookies are activated only after you agree. You can decline them and still use the website and request form. Your choice is saved in your browser for 180 days; measurement cookies are configured to last up to 30 days. You can change your choice at any time using “Cookie preferences” at the bottom of the page.',
      storage: 'Storage needed for the site to work remembers your choice and, during the session, request confirmation details. It does not contain your request text, contact details or files.',
      learn: 'How Google uses data',
      allowed: 'Measurement cookies: accepted.', denied: 'Measurement cookies: declined.', unknown: 'Measurement cookies: awaiting your choice.'
    }
  };
  let choice = null, started = false, requestStarted = false, returnFocus = null;
  function savedChoice() {
    try {
      const value = JSON.parse(localStorage.getItem(preferenceKey));
      const age = Date.now() - value?.at;
      return value && ['granted','denied'].includes(value.choice) && age >= 0 && age < preferenceLifetime ? value.choice : null;
    } catch { return null; }
  }
  function translate() {
    const c = copy[document.documentElement.lang === 'en' ? 'en' : 'fr'];
    document.querySelectorAll('[data-analytics-copy]').forEach(node => { node.textContent = c[node.dataset.analyticsCopy] || ''; });
    document.getElementById('analytics-preference-status').textContent = c[choice === 'granted' ? 'allowed' : choice === 'denied' ? 'denied' : 'unknown'];
  }
  function clearAnalyticsCookies() {
    // Only this integration's host-only, portfolio-scoped cookies.
    try {
    for (const part of document.cookie.split(';')) {
      const name = part.trim().split('=')[0];
      if (name === 'sn_ga' || name.startsWith('sn_ga_')) document.cookie = `${name}=; Max-Age=0; Path=${sitePath}; SameSite=Lax; Secure`;
    }
    } catch { /* Cookie restrictions must not prevent use of the form. */ }
  }
  function startAnalytics() {
    if (!live || choice !== 'granted') return;
    window[`ga-disable-${measurementId}`] = false;
    if (started) { window.gtag('consent','update',{analytics_storage:'granted'}); return; }
    started = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    window.gtag('consent','update',{analytics_storage:'granted'});
    window.gtag('js',new Date());
    let referrer = '';
    try { const url = new URL(document.referrer); if (['https:','http:'].includes(url.protocol)) referrer = url.origin; } catch {}
    // The receipt token, query, fragment and form contents never enter event payloads.
    window.gtag('config',measurementId,{
      send_page_view:false,
      page_location:publicPage,
      page_referrer:referrer,
      page_title:'SolvoNord Technologies',
      allow_google_signals:false,
      allow_ad_personalization_signals:false,
      cookie_domain:'none',cookie_path:sitePath,cookie_prefix:'sn',
      cookie_expires:30*24*60*60,cookie_update:false,cookie_flags:'SameSite=Lax;Secure'
    });
    window.gtag('event','page_view');
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.id = 'solvonord-google-tag';
    document.head.append(script);
  }
  function stopAnalytics() {
    window[`ga-disable-${measurementId}`] = true;
    if (started) window.gtag('consent','update',{analytics_storage:'denied'});
    clearAnalyticsCookies();
  }
  function choose(value) {
    choice = value;
    try { localStorage.setItem(preferenceKey,JSON.stringify({choice,at:Date.now()})); } catch {}
    if (choice === 'granted') startAnalytics(); else stopAnalytics();
    banner.hidden = true;
    translate();
    if (returnFocus?.isConnected) returnFocus.focus({preventScroll:true});
    returnFocus = null;
  }
  function track(name, parameters = {}) {
    if (live && choice === 'granted' && started) window.gtag('event',name,parameters);
  }
  document.querySelectorAll('[data-analytics-settings]').forEach(button => button.addEventListener('click',() => {
    const privacy = document.getElementById('privacy-dialog');
    if (privacy?.open) { privacy.close(); returnFocus = document.getElementById('privacy-button'); }
    else returnFocus = button;
    banner.hidden = false;
    document.getElementById('analytics-choice-title').focus({preventScroll:true});
  }));
  document.getElementById('analytics-accept').addEventListener('click',() => choose('granted'));
  document.getElementById('analytics-decline').addEventListener('click',() => choose('denied'));
  document.querySelectorAll('[data-analytics-details]').forEach(button => button.addEventListener('click',() => {
    document.getElementById('privacy-dialog').showModal();
  }));
  document.addEventListener('solvonord:language',translate);
  document.addEventListener('click',event => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    const method = href.startsWith('mailto:') ? 'email' : href.startsWith('tel:') ? 'phone' : href.startsWith('https://linkedin.com/') ? 'linkedin' : null;
    if (method) track('contact_click',{contact_method:method});
  });
  document.addEventListener('solvonord:request-started',() => {
    if (!requestStarted) { requestStarted = true; track('request_start'); }
  });
  document.addEventListener('solvonord:request-sent',() => track('generate_lead'));
  window.addEventListener('storage',event => {
    if (event.key !== preferenceKey) return;
    choice = savedChoice();
    if (choice === 'granted') startAnalytics(); else stopAnalytics();
    banner.hidden = choice !== null; translate();
  });
  choice = savedChoice();
  banner.hidden = choice !== null;
  translate();
  if (choice === 'granted') startAnalytics(); else stopAnalytics();
})();
