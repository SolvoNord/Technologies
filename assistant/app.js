(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const params = new URLSearchParams(location.search);
  let lang = ["fr", "en"].includes(params.get("lang")) ? params.get("lang") : (navigator.language.toLowerCase().startsWith("en") ? "en" : "fr");
  const config = window.SOLVONORD_CONFIG || {};
  // Deliberately accept only a public Formspree ID, never an arbitrary URL.
  const formId = /^[a-z0-9]{6,32}$/.test(config.formspreeId || "") ? config.formspreeId : "";
  const recipient = "solvonord@gmail.com";
  const state = {step:0, answers:{}, photos:[], summary:"", summaryDirty:false, consent:false, started:Date.now(), lastSend:0, busy:false};
  let statusKey = "";
  let photoEpoch = 0;
  const t = () => window.SN_CONTENT[lang];
  const el = (tag, attrs = {}, text = "") => {
    const node = document.createElement(tag);
    for (const [key,value] of Object.entries(attrs)) {
      if (key === "class") node.className = value;
      else node.setAttribute(key, value);
    }
    if (text) node.textContent = text;
    return node;
  };
  const icons = {
    it:'<rect x="3" y="3" width="18" height="13" rx="2"/><path d="M8 21h8M12 16v5"/>',
    wifi:'<path d="M3 8a15 15 0 0 1 18 0M6 12a10 10 0 0 1 12 0M9 16a5 5 0 0 1 6 0"/><circle cx="12" cy="20" r=".8"/>',
    cabling:'<rect x="7" y="3" width="10" height="11" rx="1"/><path d="M9 3V1m3 2V1m3 2V1M10 8h4M12 14v4a3 3 0 0 0 6 0v-1"/>',
    printer:'<path d="M7 8V3h10v5M7 17H4V8h16v9h-3"/><path d="M7 13h10v8H7zM17 11h.1"/>',
    security:'<path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6zM8 12l3 3 5-6"/>',
    quote:'<path d="M6 2h9l4 4v16H6zM14 2v5h5M9 11h7M9 15h7M9 19h4"/>',
    other:'<path d="M21 11a9 9 0 0 1-9 9H3l2-4a9 9 0 1 1 16-5Z"/><path d="M8 11h.1M12 11h.1M16 11h.1"/>'
  };
  if (params.get("embed") === "1") document.body.classList.add("embedded");
  function field(key, label, placeholder = "", options = {}) {
    const wrap = el("div", {class:"field"});
    const id = `answer-${key}`;
    wrap.append(el("label", {for:id}, label));
    let input;
    if (Array.isArray(placeholder)) {
      input = el("select", {id, name:key, "data-answer":key});
      input.append(el("option", {value:""}, lang === "fr" ? "Choisir…" : "Choose…"));
      placeholder.forEach((label,index) => input.append(el("option", {value:String(index)}, label)));
    } else {
      input = el(options.multiline ? "textarea" : "input", {id,name:key,"data-answer":key,placeholder,maxlength:String(options.max || 180)});
      if (!options.multiline) input.type = options.type || "text";
      if (options.min) input.minLength = options.min;
      if (options.autocomplete) input.autocomplete = options.autocomplete;
      if (options.type === "tel") input.inputMode = "tel";
    }
    if (!options.optional) input.required = true;
    input.value = state.answers[key] ?? "";
    if (options.hint) {
      input.setAttribute("aria-describedby",`${id}-hint`);
      wrap.append(input,el("small", {id:`${id}-hint`},options.hint));
    } else wrap.append(input);
    return wrap;
  }
  const details = () => t().details[state.answers.service];
  const opt = (options,value) => options[Number(value)] || t().notSpecified;
  function summary() {
    const c=t(), a=state.answers, l=c.summaryLabels;
    const lines=[c.summaryTitle, "", `${l.service}: ${c.services[a.service]?.[0] || ""}`,`${l.description}: ${a.description || ""}`, ""];
    for (const [key,label,values] of details()?.fields || []) {
      const value = Array.isArray(values) ? opt(values,a[key]) : a[key] || c.notSpecified;
      lines.push(`${label}: ${value}`);
    }
    lines.push("", `${l.customer}: ${opt(c.customerOptions,a.customer)}`, `${l.location}: ${a.location || ""}`,`${l.site}: ${opt(c.siteOptions,a.site)}`,`${l.urgency}: ${opt(c.urgencyOptions,a.urgency)}`,`${l.availability}: ${a.availability || c.notSpecified}`,`${l.photos}: ${state.photos.length ? state.photos.map((_,i)=>`photo-${i+1}`).join(", ") : c.none}`, "",`${l.name}: ${a.name || ""}`,`${l.method}: ${opt(c.methods,a.method)}`);
    if (a.email) lines.push(`${l.email}: ${a.email}`);
    if (a.phone) lines.push(`${l.phone}: ${a.phone}`);
    lines.push(`${l.language}: ${lang === "fr" ? "Français" : "English"}`);
    return lines.join("\n");
  }
  function renderHistory() {
    $("history").replaceChildren();
    if (!state.step) return;
    const box=el("details",{class:"history-details"});
    box.append(el("summary",{},t().history));
    const a=state.answers;
    const prior=[t().services[a.service]?.[0], a.description,
      (details()?.fields || []).map(([k,,v])=>Array.isArray(v)?opt(v,a[k]):a[k]).filter(Boolean).join(" · "),
      [a.location,opt(t().customerOptions,a.customer),opt(t().siteOptions,a.site)].join(" · "),
      [opt(t().urgencyOptions,a.urgency),a.availability].filter(Boolean).join(" · "),
      `${state.photos.length} ${t().photoCount}`, [a.name,a.email,a.phone].filter(Boolean).join(" · ")];
    prior.slice(0,state.step).forEach((value,index)=>{const p=el("div",{class:"history-entry"});p.append(el("strong",{},t().steps[index]),document.createTextNode(value||t().notSpecified));box.append(p);});
    $("history").append(box);
  }
  function render(focus = false) {
    const c=t();
    document.documentElement.lang=lang;
    document.title = document.body.classList.contains("portfolio-page") ? (lang === "fr" ? "SolvoNord Technologies | TI, réseaux et cybersécurité" : "SolvoNord Technologies | IT, Networks & Cybersecurity") : (lang === "fr" ? "SolvoNord Technologies — Votre demande" : "SolvoNord Technologies — Your request");
    document.querySelectorAll("[data-t]").forEach(node=>node.textContent=c[node.dataset.t]);
    document.querySelectorAll("[data-lang]").forEach(node=>{node.setAttribute("aria-pressed",String(node.dataset.lang===lang));node.disabled=state.busy;});
    $("step-label").textContent=c.steps[state.step];
    $("step-count").textContent=`${String(state.step+1).padStart(2,"0")} / 08`;
    $("progress").value=state.step+1;
    $("progress").setAttribute("aria-label",c.steps[state.step]);
    $("question").textContent=c.questions[state.step];
    $("hint").textContent=c.hints[state.step];
    $("back").hidden=state.step===0;
    $("next").hidden=state.step===7;
    $("error").hidden=true;
    $("status").hidden=!statusKey;
    $("status").textContent=statusKey?c[statusKey]:"";
    $("fields").replaceChildren();
    renderHistory();
    const f=$("fields");
    if (state.step===0) {
      const list=el("div",{class:"services","role":"group","aria-labelledby":"question"});
      Object.entries(c.services).forEach(([key,[label,sub]])=>{
        const button=el("button",{class:"service",type:"button","aria-pressed":String(state.answers.service===key),"data-service":key});
        const icon=el("span",{"aria-hidden":"true"});
        // Icons are static application constants, never visitor content.
        icon.innerHTML=`<svg viewBox="0 0 24 24">${icons[key]}</svg>`;
        const words=el("span");words.append(el("strong",{},label),el("small",{},sub));
        button.append(icon,words,el("span",{class:"arrow","aria-hidden":"true"},"↗"));
        button.addEventListener("click",()=>{
          if(state.answers.service!==key){
            const oldFields=details()?.fields || [];
            oldFields.forEach(([k])=>delete state.answers[k]);
          }
          state.answers.service=key;state.summary="";state.summaryDirty=false;state.consent=false;
          list.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",String(b===button)));
          $("error").hidden=true;
        });
        list.append(button);
      });
      f.append(list);
    }
    if (state.step===1) f.append(field("description",c.description,c.descriptionPlaceholder,{multiline:true,min:10,max:700,hint:c.descriptionHint}));
    if (state.step===2) {
      if(details().notice) f.append(el("p",{class:"note"},details().notice));
      details().fields.forEach(([key,label,values])=>f.append(field(key,label,values,{optional:["attempts","budget"].includes(key),max:180,min:2})));
    }
    if (state.step===3) f.append(field("customer",c.customer,c.customerOptions),field("location",c.location,c.locationPlaceholder,{min:2,max:100}),field("site",c.site,c.siteOptions));
    if (state.step===4) {
      f.append(field("urgency",c.urgency,c.urgencyOptions),el("p",{class:"note",id:"urgent-note"},c.urgentNote),field("availability",c.availability,c.availabilityPlaceholder,{optional:true,max:180,hint:c.availabilityHint}));
    }
    if (state.step===5) {
      const wrap=el("div",{class:"field"});wrap.append(el("label",{for:"photos"},c.photoLabel));
      const input=el("input",{type:"file",id:"photos",accept:"image/jpeg,image/png,image/webp",multiple:"","aria-describedby":"photos-hint"});
      input.addEventListener("change",()=>addPhotos(input));
      wrap.append(input,el("small",{id:"photos-hint"},c.photoHint));
      f.append(wrap);
      const grid=el("div",{class:"photos"});
      state.photos.forEach((p,i)=>{
        const fig=el("figure",{class:"photo"});fig.append(el("img",{src:p.url,alt:`Photo ${i+1}`}),el("figcaption",{},`Photo ${i+1}`));
        const remove=el("button",{type:"button","aria-label":`${c.remove} photo ${i+1}`},c.remove);
        remove.onclick=()=>{URL.revokeObjectURL(p.url);state.photos.splice(i,1);state.summaryDirty=false;state.summary="";state.consent=false;render(true);};
        fig.append(remove);grid.append(fig);
      });
      f.append(grid,el("p",{class:"note"},c.photoNotice));
    }
    if (state.step===6) {
      f.append(field("name",c.name,c.namePlaceholder,{min:2,max:80,autocomplete:"name"}),field("method",c.method,c.methods));
      const emailRequired=state.answers.method!=="1";
      f.append(field("email",`${c.email} (${emailRequired?c.required:c.optional})`,"vous@exemple.com",{type:"email",optional:!emailRequired,max:254,autocomplete:"email"}),field("phone",`${c.phone} (${!emailRequired?c.required:c.optional})`,"+1 514 555 0100",{type:"tel",optional:emailRequired,max:25,autocomplete:"tel"}));
    }
    if(state.step===7) renderReview(f);
    $("reset").disabled=state.busy;
    if (state.busy) $("intake").querySelectorAll("input,textarea,select,button").forEach(node=>node.disabled=true);
    document.dispatchEvent(new CustomEvent("solvonord:language",{detail:{lang}}));
    if(params.get("embed")==="1")window.parent.postMessage({type:"solvonord-language",lang},location.origin==="null"?"*":location.origin);
    if(focus) $("question").focus({preventScroll:false});
  }
  function renderReview(f) {
    const c=t();
    if (!state.summaryDirty) state.summary=summary();
    const wrap=el("div",{class:"field"});wrap.append(el("label",{for:"summary"},c.summary));
    const text=el("textarea",{id:"summary",class:"review-text",maxlength:"5000","aria-describedby":"review-hint"});text.value=state.summary;
    wrap.append(text,el("small",{id:"review-hint"},c.reviewHint));f.append(wrap);
    const label=el("label",{class:"check",for:"consent"});const check=el("input",{type:"checkbox",id:"consent"});check.checked=state.consent;
    label.append(check,el("span",{},c.consent));f.append(label);
    const actions=el("div",{class:"review-actions"});
    const email=el("button",{type:"button",class:"secondary",id:"send-email","aria-describedby":"email-help"},c.emailSend);email.onclick=sendEmail;
    const auto=el("button",{type:"button",class:"primary delivery-primary",id:"send-direct","aria-describedby":"delivery-note"},formId?c.autoSend:c.autoDisabled);auto.disabled=!formId;auto.onclick=sendDirect;
    const small=el("div",{class:"small-actions"});
    const copy=el("button",{type:"button",class:"secondary",id:"copy-summary"},c.copy);
    copy.onclick=async()=>{if(!checkSummary())return;try{await navigator.clipboard.writeText(state.summary);showStatus("copied");}catch{showStatus("copyError");}};
    const download=el("button",{type:"button",class:"secondary",id:"download-summary"},c.download);download.onclick=()=>{if(!checkSummary())return;const url=URL.createObjectURL(new Blob([state.summary],{type:"text/plain;charset=utf-8"}));const link=el("a",{href:url,download:"demande-solvonord.txt"});document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);showStatus("downloaded");};
    const emailHelp=el("p",{class:"delivery-help",id:"email-help"},c.emailHelp);
    small.append(copy,download);actions.append(auto,el("p",{class:"note delivery-note",id:"delivery-note"},formId?c.autoReady:c.autoNote),email,emailHelp,small);f.append(actions);
    if(state.photos.length) f.append(el("p",{class:"note"},c.photoNotice));
  }
  // An extra guard for obvious secrets; this is not a complete DLP system.
  function containsSensitive(value) {
    return /(?:password|mot\s+de\s+passe|(?:code\s*)?(?:mfa|otp|2fa)|api[_ -]?key|clé\s+(?:api|privée))\s*(?:est|is|:|=)\s*\S+/iu.test(value)
      || /-----BEGIN [A-Z ]*PRIVATE KEY-----/.test(value)
      || /\b(?:sk-[a-zA-Z0-9_-]{20,}|gh[pousr]_[a-zA-Z0-9]{20,})\b/.test(value)
      || /\b\d{3}[- ]\d{2}[- ]\d{4}\b/.test(value)
      || /\b\d{3}[- ]\d{3}[- ]\d{3}\b/.test(value)
      || /\b(?:\d[ -]?){13,19}\b/.test(value);
  }
  function error(message, input) {
    $("error").textContent=message;$("error").hidden=false;
    if(input){input.setAttribute("aria-invalid","true");input.setAttribute("aria-errormessage","error");input.focus();}
    else {$("error").tabIndex=-1;$("error").focus();}
    return false;
  }
  function validate() {
    if (state.step===0 && !state.answers.service) return error(t().selectService);
    for(const input of $("fields").querySelectorAll("[data-answer]")) {
      const value=input.value.trim();
      const min=input.minLength>0?input.minLength:1;
      const phoneBad=input.name==="phone" && value && (!/^[+\d().\s-]+$/.test(value)||value.replace(/\D/g,"").length<7||value.replace(/\D/g,"").length>15);
      if((input.required && value.length<min)||!input.checkValidity()||phoneBad) return error(t().validation,input);
      if(input.type!=="tel" && containsSensitive(value)) return error(t().sensitiveError,input);
      state.answers[input.dataset.answer]=value;
    }
    return true;
  }
  function checkSummary() {
    state.summary=$("summary").value.trim();
    if(state.summary.length<20||state.summary.length>5000) return error(t().summaryInvalid,$("summary"));
    if(containsSensitive(state.summary)) return error(t().sensitiveError,$("summary"));
    return true;
  }
  function readyToSend() {
    if(!checkSummary())return false;
    if(!$("consent").checked)return error(t().consentError,$("consent"));
    if($("website").value || Date.now()-state.started<2500)return error(t().spamError);
    $("error").hidden=true;return true;
  }
  function showStatus(key){statusKey=key;$("status").textContent=t()[key];$("status").hidden=false;}
  function sendEmail() {
    if(!readyToSend())return;
    const subject=`SolvoNord — ${t().services[state.answers.service][0]}`;
    const body=`${state.summary}\n\n${t().consentRecorded}`;
    const href=`mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if(href.length>6000) {
      showStatus("mailLong");
      const link=el("a",{href:`mailto:${recipient}?subject=${encodeURIComponent(subject)}`},recipient);
      $("status").append(document.createTextNode(" "),link);return;
    }
    const link=el("a",{href});document.body.append(link);link.click();link.remove();showStatus("mailOpened");
  }
  async function sendDirect() {
    if(!formId || state.busy || !readyToSend())return;
    if(state.lastSend && Date.now()-state.lastSend<60000)return error(t().rateError);
    state.busy=true;state.lastSend=Date.now();statusKey="sending";render();
    const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),15000);
    try {
      // The edited summary is authoritative: do not silently resend old contact fields.
      const payload={message:state.summary,language:lang,consent:t().consentRecorded,consent_version:"2026-10-11",consent_at:new Date().toISOString(),_subject:`SolvoNord — ${t().services[state.answers.service][0]}`,_gotcha:$("website").value};
      const response=await fetch(`https://formspree.io/f/${formId}`,{method:"POST",headers:{"Accept":"application/json","Content-Type":"application/json"},body:JSON.stringify(payload),signal:controller.signal,credentials:"omit",referrerPolicy:"no-referrer"});
      const data=await response.json();
      if(!response.ok || data.ok!==true)throw new Error("Unconfirmed submission");
      statusKey="sent";
    } catch {statusKey="sendError";}
    finally {clearTimeout(timeout);state.busy=false;render();}
  }
  async function addPhotos(input) {
    const files=Array.from(input.files||[]),accepted=[],epoch=++photoEpoch;
    if(state.photos.length+files.length>3)return error(t().photoError,input);
    // Validate actual image decoding as well as file type and size.
    try {
      for(const file of files){
        if(!["image/jpeg","image/png","image/webp"].includes(file.type)||file.size>5*1024*1024||!file.size)throw new Error("image");
        const url=URL.createObjectURL(file);accepted.push({url});
        const image=new Image();image.src=url;await image.decode();
      }
      if(epoch!==photoEpoch){accepted.forEach(p=>URL.revokeObjectURL(p.url));return;}
      state.photos.push(...accepted);state.summary="";state.summaryDirty=false;state.consent=false;render(true);
    }catch{accepted.forEach(p=>URL.revokeObjectURL(p.url));input.value="";error(t().photoError,input);}
  }
  document.addEventListener("solvonord:service",event=>{
    const service=event.detail?.service;
    if(state.busy||state.step!==0||!Object.hasOwn(t().services,service))return;
    if(state.answers.service!==service)(details()?.fields||[]).forEach(([key])=>delete state.answers[key]);
    state.answers.service=service;state.summary="";state.summaryDirty=false;state.consent=false;state.step=1;statusKey="";render(true);
  });
  $("intake").addEventListener("input",event=>{
    const input=event.target;
    input.removeAttribute("aria-invalid");
    if(input.id==="consent"){state.consent=input.checked;return;}
    if(input.id==="summary"){state.summary=input.value;state.summaryDirty=true;state.consent=false;$("consent").checked=false;}
    if(input.dataset.answer){state.answers[input.dataset.answer]=input.value;state.summaryDirty=false;state.summary="";state.consent=false;}
    statusKey="";$("status").hidden=true;
  });
  $("intake").addEventListener("change",event=>{
    if(event.target.name==="method"){
      state.answers.method=event.target.value;
      // Re-render labels and required flags, keeping all entered values.
      render();$("answer-method").focus();
    }
  });
  $("intake").addEventListener("submit",event=>{event.preventDefault();if(state.busy||state.step===7||!validate())return;state.step++;statusKey="";render(true);});
  $("back").onclick=()=>{if(state.busy)return;state.step=Math.max(0,state.step-1);statusKey="";render(true);};
  document.querySelectorAll("[data-lang]").forEach(button=>button.onclick=()=>{
    if(state.busy)return;lang=button.dataset.lang;state.consent=false;
    const url=new URL(location.href);url.searchParams.set("lang",lang);
    try{history.replaceState(null,"",url);}catch{/* file preview may restrict history */}
    render();button.focus();
  });
  $("privacy-button").onclick=()=>$("privacy-dialog").showModal();
  $("reset").onclick=()=>$("reset-dialog").showModal();
  $("cancel-reset").onclick=()=>$("reset-dialog").close();
  $("confirm-reset").onclick=()=>{
    photoEpoch++;
    state.photos.forEach(p=>URL.revokeObjectURL(p.url));
    Object.assign(state,{step:0,answers:{},photos:[],summary:"",summaryDirty:false,consent:false,started:Date.now()});
    $("website").value="";statusKey="";$("reset-dialog").close();render(true);
  };
  document.addEventListener("keydown",event=>{if(event.key==="Escape"&&params.get("embed")==="1"&&!$("privacy-dialog").open&&!$("reset-dialog").open)window.parent.postMessage({type:"solvonord-close"},location.origin==="null"?"*":location.origin);});
  render();
})();
