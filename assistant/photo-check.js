(() => {
  const canvas=document.createElement('canvas');canvas.width=600;canvas.height=260;const ctx=canvas.getContext('2d');ctx.fillStyle='#173f37';ctx.fillRect(0,0,600,260);ctx.fillStyle='#ffffff';ctx.font='30px sans-serif';ctx.fillText('SOLVONORD PHOTO TEST',30,90);ctx.font='18px sans-serif';ctx.fillText('Generated sample - no customer data',30,150);
  const form=document.getElementById('test-form');const button=form.querySelector('button');button.disabled=true;
  canvas.toBlob(blob=>{const transfer=new DataTransfer();transfer.items.add(new File([blob],'solvonord-native-photo-test.png',{type:'image/png'}));document.getElementById('test-image').files=transfer.files;button.disabled=false;},'image/png');
  form.addEventListener('submit',()=>{
    const token=crypto.randomUUID(),reference=`SN-${new Date().toISOString().slice(0,10).replaceAll('-','')}-${crypto.getRandomValues(new Uint32Array(1))[0].toString(36).toUpperCase().padStart(7,'0')}`;
    sessionStorage.setItem('solvonord-upload-receipt',JSON.stringify({token,reference,lang:'en',count:1,createdAt:Date.now(),status:'pending'}));
    const next=new URL('./thanks.html',location.href);next.searchParams.set('receipt',token);
    for(const [name,value] of Object.entries({_subject:`SolvoNord - NATIVE PHOTO TEST - ${reference}`,request_reference:reference,message:'TEST ONLY — native upload. Expected one green PNG attachment. No service requested.',_next:next.href,_honey:''})){
      const input=document.createElement('input');input.type='hidden';input.name=name;input.value=value;form.append(input);
    }
    document.getElementById('test-reference').textContent=reference;button.disabled=true;
  });
})();
