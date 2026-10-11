/* Optional drop-in launcher. Its iframe isolates the assistant from portfolio styles. */
(() => {
  "use strict";
  if (document.getElementById("solvonord-widget")) return;
  const source = document.currentScript;
  const base = new URL(".", source.src);
  const lang = source.dataset.lang === "en" || (!source.dataset.lang && document.documentElement.lang.startsWith("en")) ? "en" : "fr";
  const en = lang === "en";
  const host = document.createElement("div"); host.id = "solvonord-widget";
  const root = host.attachShadow({mode:"open"});
  const style = document.createElement("link"); style.rel="stylesheet";style.href=new URL("widget.css",base).href;
  const welcome = document.createElement("div"); welcome.className="welcome";
  const message=document.createElement("p");message.textContent=en?"Hello! Need IT help or a quote?":"Bonjour! Un besoin TI ou un devis?";
  const direct=document.createElement("a");direct.href="mailto:solvonord@gmail.com";direct.textContent=en?"Email us directly":"Nous écrire directement";
  const dismiss=document.createElement("button");dismiss.className="dismiss";dismiss.type="button";dismiss.textContent="×";dismiss.setAttribute("aria-label",en?"Dismiss welcome message":"Masquer le message d’accueil");dismiss.onclick=()=>welcome.hidden=true;
  welcome.append(message,direct,dismiss);
  const launch=document.createElement("button");launch.className="launcher";launch.type="button";launch.textContent=en?"Let’s talk about your needs ↗":"Parlons de votre besoin ↗";launch.setAttribute("aria-haspopup","dialog");launch.setAttribute("aria-expanded","false");
  const dialog=document.createElement("dialog");dialog.setAttribute("aria-label",en?"SolvoNord guided assistant":"Assistant guidé SolvoNord");
  const toolbar=document.createElement("div");toolbar.className="toolbar";
  const heading=document.createElement("span");heading.textContent="SolvoNord Technologies";
  const close=document.createElement("button");close.type="button";close.textContent=en?"Close ×":"Fermer ×";
  const frame=document.createElement("iframe");frame.title=en?"Bilingual service request assistant":"Assistant bilingue de demande de service";frame.referrerPolicy="no-referrer";
  const url=new URL("index.html",base);url.searchParams.set("embed","1");url.searchParams.set("lang",lang);
  const closeDialog=()=>{dialog.close();launch.setAttribute("aria-expanded","false");launch.focus();};
  close.onclick=closeDialog;
  dialog.addEventListener("cancel",()=>{launch.setAttribute("aria-expanded","false");});
  toolbar.append(heading,close);dialog.append(toolbar,frame);
  launch.onclick=()=>{welcome.hidden=true;if(!frame.getAttribute("src"))frame.src=url.href;dialog.showModal();launch.setAttribute("aria-expanded","true");close.focus();};
  window.addEventListener("message",event=>{
    if(event.origin!==base.origin||event.source!==frame.contentWindow)return;
    if(event.data?.type==="solvonord-close")closeDialog();
    if(event.data?.type==="solvonord-language"&&["fr","en"].includes(event.data.lang)){
      const english=event.data.lang==="en";
      close.textContent=english?"Close ×":"Fermer ×";
      launch.textContent=english?"Let’s talk about your needs ↗":"Parlons de votre besoin ↗";
      dialog.setAttribute("aria-label",english?"SolvoNord guided assistant":"Assistant guidé SolvoNord");
      frame.title=english?"Bilingual service request assistant":"Assistant bilingue de demande de service";
    }
  });
  root.append(style,welcome,launch,dialog);document.body.append(host);
})();
