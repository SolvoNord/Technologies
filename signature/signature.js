'use strict';
const signature = document.getElementById('signature');
const status = document.getElementById('status');
function selectSignature(){const range=document.createRange();range.selectNodeContents(signature);const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);status.textContent='Signature sélectionnée. Copiez-la avec Ctrl+C (ou ⌘C sur Mac).';}
document.getElementById('select').addEventListener('click',selectSignature);
document.getElementById('copy').addEventListener('click',async()=>{try{if(!navigator.clipboard?.write||!window.ClipboardItem){selectSignature();return;}await navigator.clipboard.write([new ClipboardItem({'text/html':new Blob([signature.innerHTML],{type:'text/html'}),'text/plain':new Blob([signature.innerText],{type:'text/plain'})})]);status.textContent='Signature copiée. Collez-la dans votre messagerie avec Ctrl+V (ou ⌘V sur Mac).';}catch{selectSignature();}});
