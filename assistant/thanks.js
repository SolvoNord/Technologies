(() => {
  "use strict";
  const key="solvonord-upload-receipt",token=new URLSearchParams(location.search).get("receipt");
  let record;try{record=JSON.parse(sessionStorage.getItem(key));}catch{}
  const valid=!!record&&token===record.token&&/^[a-f0-9-]{36}$/i.test(token||"")&&/^SN-[0-9]{8}-[A-Z0-9]{7}$/.test(record.reference||"")&&Number.isInteger(record.count)&&record.count>=1&&record.count<=3&&Date.now()-record.createdAt>=0&&Date.now()-record.createdAt<30*60*1000;
  // Older submissions may still return here; preserve their receipt on the main page.
  if(valid){const next=new URL('../',location.href);next.searchParams.set('lang',record.lang==='en'?'en':'fr');next.searchParams.set('receipt',token);next.hash='demande';location.replace(next.href);return;}
  let lang=valid&&record.lang==="en"?"en":"fr";
  const copy={
    fr:{title:"Demande envoyée avec succès!",lead:"Merci. La vérification est terminée et votre demande a été transmise à SolvoNord Technologies.",reference:"Votre référence",photos:"photo(s) transmise(s) au service d’envoi avec votre demande.",next:"Vous n’avez pas besoin de renvoyer cette demande. Nous vous recontacterons avec les coordonnées fournies. Aucun rendez-vous n’est confirmé à cette étape.",back:"Retour au portfolio",unknown:"Confirmation indisponible",unknownLead:"Cette page ne permet pas de confirmer une nouvelle demande sans retour du formulaire d’envoi.",unknownNext:"Si vous avez déjà envoyé votre demande, évitez de la renvoyer immédiatement. Contactez-nous par courriel en cas de doute."},
    en:{title:"Request submitted successfully!",lead:"Thank you. Verification is complete and your request has been submitted to SolvoNord Technologies.",reference:"Your reference",photos:"photo(s) submitted to the delivery service with your request.",next:"You do not need to send this request again. We’ll follow up using the contact details you provided. This does not confirm an appointment.",back:"Return to the portfolio",unknown:"Confirmation unavailable",unknownLead:"This page cannot confirm a new request without a return from the submission form.",unknownNext:"If you have already submitted your request, avoid sending it again immediately. Email us if you are unsure."}
  };
  function render(){
    const c=copy[lang];document.documentElement.lang=lang;document.title=`SolvoNord Technologies — ${valid?c.title:c.unknown}`;
    document.getElementById("receipt-title").textContent=valid?c.title:c.unknown;
    document.getElementById("receipt-lead").textContent=valid?c.lead:c.unknownLead;
    document.getElementById("receipt-next").textContent=valid?c.next:c.unknownNext;
    document.getElementById("receipt-mark").textContent=valid?"✓":"?";
    document.getElementById("reference-box").hidden=!valid;
    document.getElementById("reference-label").textContent=c.reference;
    document.getElementById("reference").textContent=valid?record.reference:"";
    document.getElementById("receipt-photos").textContent=valid?`${record.count} ${c.photos}`:"";
    const link=document.getElementById("return-link");link.textContent=c.back;link.href=`../?lang=${lang}#demande`;
    document.querySelectorAll("[data-receipt-lang]").forEach(button=>button.setAttribute("aria-pressed",String(button.dataset.receiptLang===lang)));
  }
  document.querySelectorAll("[data-receipt-lang]").forEach(button=>button.addEventListener("click",()=>{lang=button.dataset.receiptLang;render();}));
  render();document.getElementById("receipt-title").focus();
})();
