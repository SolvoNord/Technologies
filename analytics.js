(() => {
  'use strict';
  // Retire the previous opt-in integration. Cloudflare alone measures visits.
  // This migration makes no requests and never reads request or receipt data.
  window['ga-disable-G-8HCFSX3ZVC'] = true;
  try { localStorage.removeItem('solvonord-analytics-choice-v1'); } catch {}
  try {
    for (const part of document.cookie.split(';')) {
      const name = part.trim().split('=')[0];
      if (name === 'sn_ga' || name.startsWith('sn_ga_')) {
        document.cookie = `${name}=; Max-Age=0; Path=/Technologies/; SameSite=Lax; Secure`;
      }
    }
  } catch {}
})();