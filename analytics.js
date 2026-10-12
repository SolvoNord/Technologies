(() => {
  'use strict';
  const measurementId = 'G-8HCFSX3ZVC'; // Public measurement ID, never an API secret.
  const preferenceKey = 'solvonord-analytics-choice-v1';
  const preferenceLifetime = 180 * 24 * 60 * 60 * 1000;
  const live = location.origin === 'https://solvonord.github.io' && location.pathname.startsWith('/Technologies/');
  const banner = document.getElementById('analytics-choice');
  if (!banner) return;
  const copy = {
    fr: {
      title: 'Votre choix pour les statistiques',
      text: 'Autorisez-vous Google Analytics à utiliser des cookies pour mesurer les visites, les villes approximatives et les clics? Le formulaire fonctionne avec ou sans ces cookies.',
      accept: 'Accepter', decline: 'Refuser', settings: 'Préférences des cookies',
      detail: 'Avec votre accord, Google Analytics utilise des cookies pour mesurer les visites, les villes approximatives et des actions comme les clics de contact ou l’envoi d’une demande. Vos réponses, coordonnées, fichiers et références de demande ne sont pas envoyés à Google Analytics. Les fonctions publicitaires sont désactivées. Votre choix est conservé pendant six mois et peut être modifié à tout moment.',
      learn: 'Comment Google utilise les données',
      allowed: 'Google Analytics : autorisé.', denied: 'Google Analytics : refusé.', unknown: 'Google Analytics : en attente de votre choix.'
    },
    en: {
      title: 'Your analytics choice',
      text: 'May Google Analytics use cookies to measure visits, approximate cities and clicks? The request form works with or without these cookies.',
      accept: 'Accept', decline: 'Decline', settings: 'Cookie preferences',
      detail: 'With your permission, Google Analytics uses cookies to measure visits, approximate cities and actions such as contact clicks or submitting a request. Your answers, contact details, files and request references are not sent to Google Analytics. Advertising features are disabled. Your choice is saved for six months and can be changed at any time.',
      learn: 'How Google uses data',
      allowed: 'Google Analytics: allowed.', denied: 'Google Analytics: declined.', unknown: 'Google Analytics: awaiting your choice.'
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
    for (const part of document.cookie.split(';')) {
      const name = part.trim().split('=')[0];
      if (name === 'sn_ga' || name.startsWith('sn_ga_')) document.cookie = `${name}=; Max-Age=0; Path=/Technologies/; SameSite=Lax; Secure`;
    }
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
      page_location:'https://solvonord.github.io/Technologies/',
      page_referrer:referrer,
      page_title:'SolvoNord Technologies',
      allow_google_signals:false,
      allow_ad_personalization_signals:false,
      cookie_domain:'none',cookie_path:'/Technologies/',cookie_prefix:'sn',
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
