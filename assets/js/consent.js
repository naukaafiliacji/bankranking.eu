(function () {
  'use strict';
  if (window.BankRankingConsent) return;
  const KEY='bankranking_consent_v2',TTL=180*24*60*60*1000,GA='G-HXH7RMBD8J';
  const localPreview=/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)||location.protocol==='file:';
  let analyticsLoaded=false,memory=null,previousFocus=null,banner,dialog,reopen;
  const translations={
    en:{title:'Your privacy choices',description:'Essential storage remembers your choices. With your permission, Google Analytics helps us understand website use. Analytics stays off until you accept it.',accept:'Accept analytics',reject:'Reject analytics',settings:'Settings',save:'Save choices',close:'Close',essential:'Essential preferences',required:'Always on: remembers your choices for 180 days.',analytics:'Optional analytics',analyticsText:'Google Analytics measures visits and interactions. This choice is off by default.',policy:'Cookie policy',privacy:'Privacy policy',saved:'Your privacy choices have been saved.',settingsTitle:'Privacy settings',stored:'Your choice is stored in this browser for 180 days. You can change it at any time.'},
    es:{title:'Tus preferencias de privacidad',description:'El almacenamiento necesario recuerda tu elección. Con tu permiso, Google Analytics nos ayuda a entender el uso del sitio. La analítica permanece desactivada hasta que la aceptes.',accept:'Aceptar analítica',reject:'Rechazar analítica',settings:'Configurar',save:'Guardar preferencias',close:'Cerrar',essential:'Preferencias necesarias',required:'Siempre activas: recuerdan tu elección durante 180 días.',analytics:'Analítica opcional',analyticsText:'Google Analytics mide visitas e interacciones. Esta opción está desactivada por defecto.',policy:'Política de cookies',privacy:'Privacidad',saved:'Se han guardado tus preferencias.',settingsTitle:'Preferencias de privacidad',stored:'La elección se guarda en este navegador durante 180 días. Puedes cambiarla en cualquier momento.'},
    pl:{title:'Twoje ustawienia prywatności',description:'Niezbędna pamięć zapamiętuje Twój wybór. Za Twoją zgodą Google Analytics pomaga nam zrozumieć korzystanie ze strony. Analityka pozostaje wyłączona do czasu jej zaakceptowania.',accept:'Akceptuję analitykę',reject:'Odrzucam analitykę',settings:'Ustawienia',save:'Zapisz wybór',close:'Zamknij',essential:'Niezbędne preferencje',required:'Zawsze aktywne: zapamiętują Twój wybór przez 180 dni.',analytics:'Opcjonalna analityka',analyticsText:'Google Analytics mierzy wizyty i interakcje. Ta opcja jest domyślnie wyłączona.',policy:'Polityka cookies',privacy:'Prywatność',saved:'Zapisano ustawienia prywatności.',settingsTitle:'Ustawienia prywatności',stored:'Wybór jest zapisywany w tej przeglądarce przez 180 dni. Możesz go zmienić w każdej chwili.'},
    it:{title:'Le tue preferenze di privacy',description:'La memoria necessaria ricorda la tua scelta. Con il tuo consenso, Google Analytics ci aiuta a comprendere l’uso del sito. L’analisi resta disattivata finché non la accetti.',accept:'Accetta analisi',reject:'Rifiuta analisi',settings:'Impostazioni',save:'Salva preferenze',close:'Chiudi',essential:'Preferenze necessarie',required:'Sempre attive: ricordano la tua scelta per 180 giorni.',analytics:'Analisi facoltativa',analyticsText:'Google Analytics misura visite e interazioni. Questa opzione è disattivata per impostazione predefinita.',policy:'Informativa sui cookie',privacy:'Privacy',saved:'Le preferenze sono state salvate.',settingsTitle:'Preferenze di privacy',stored:'La scelta viene salvata in questo browser per 180 giorni. Puoi modificarla in qualsiasi momento.'}
  };
  const path=location.pathname;
  const language=document.documentElement.lang.split('-')[0]||'en';
  const t=translations[language]||translations.en,policyUrl=language==='es'?'/espanol/cookies/':'/cookies/',privacyUrl=language==='es'?'/espanol/privacidad/':'/privacy/';
  function valid(v){return v&&v.version===2&&v.essential===true&&typeof v.analytics==='boolean'&&Number.isFinite(v.savedAt)&&Number.isFinite(v.expiresAt)&&v.savedAt<=Date.now()+60000&&v.expiresAt>Date.now()&&v.expiresAt-v.savedAt===TTL;}
  function read(){if(valid(memory))return memory;try{const v=JSON.parse(localStorage.getItem(KEY)||'null');if(valid(v))return v;}catch(_){}return null;}
  function state(){const v=read();return{essential:true,analytics:!!(v&&v.analytics),decided:!!v,savedAt:v?v.savedAt:null,expiresAt:v?v.expiresAt:null,localPreview:localPreview};}
  function gtag(){window.dataLayer.push(arguments);}
  function clearAnalyticsCookies(){
    const names=document.cookie.split(';').map(s=>s.trim().split('=')[0]).filter(n=>/^(_ga|_gid|_gat)/.test(n));
    const pieces=location.hostname.split('.'),domains=[null,location.hostname,'.'+location.hostname],paths=['/'];
    while(pieces.length>2){pieces.shift();domains.push(pieces.join('.'),'.'+pieces.join('.'));}
    const segments=location.pathname.split('/').filter(Boolean);
    for(let i=1;i<=segments.length;i++)paths.push('/'+segments.slice(0,i).join('/'),'/'+segments.slice(0,i).join('/')+'/');
    names.forEach(n=>domains.forEach(d=>paths.forEach(p=>{document.cookie=n+'=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path='+p+(d?'; domain='+d:'')+'; SameSite=Lax';})));
  }
  function startAnalytics(){
    if(analyticsLoaded||localPreview||!state().analytics)return;
    window['ga-disable-'+GA]=false;window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||gtag;
    window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    window.gtag('consent','update',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    window.gtag('js',new Date());window.gtag('config',GA,{allow_google_signals:false,allow_ad_personalization_signals:false,cookie_expires:15552000,cookie_update:false});
    const s=document.createElement('script');s.async=true;s.id='bankranking-analytics';s.src='https://www.googletagmanager.com/gtag/js?id='+GA;document.head.appendChild(s);analyticsLoaded=true;
  }
  function close(){if(dialog&&dialog.open)dialog.close();if(previousFocus&&typeof previousFocus.focus==='function')previousFocus.focus();}
  function save(analytics){
    const reload=analyticsLoaded&&!analytics,now=Date.now(),v={version:2,essential:true,analytics:analytics===true,savedAt:now,expiresAt:now+TTL};memory=v;
    try{localStorage.setItem(KEY,JSON.stringify(v));localStorage.removeItem('bankranking_cookie_preferences_v1');}catch(_){}
    if(banner)banner.hidden=true;if(reopen)reopen.hidden=false;close();
    if(!analytics){window['ga-disable-'+GA]=true;if(typeof window.gtag==='function')window.gtag('consent','update',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});clearAnalyticsCookies();}else startAnalytics();
    const status=document.getElementById('br-consent-status');if(status)status.textContent=t.saved;
    window.dispatchEvent(new CustomEvent('bankranking:consentchange',{detail:state()}));if(reload)window.location.reload();
  }
  function open(){if(!dialog)return;previousFocus=document.activeElement;dialog.querySelector('#br-consent-analytics').checked=state().analytics;if(!dialog.open)dialog.showModal();dialog.querySelector('#br-consent-analytics').focus();}
  function init(){
    document.querySelectorAll('#cookie-modal').forEach(n=>n.remove());
    banner=document.createElement('section');banner.className='br-consent-banner';banner.id='br-consent-banner';banner.setAttribute('aria-labelledby','br-consent-title');
    banner.innerHTML='<div class="br-consent-copy"><strong id="br-consent-title">'+t.title+'</strong><p>'+t.description+'</p><a href="'+policyUrl+'">'+t.policy+'</a> · <a href="'+privacyUrl+'">'+t.privacy+'</a></div><div class="br-consent-actions"><button type="button" data-br-choice="accept">'+t.accept+'</button><button type="button" data-br-choice="reject">'+t.reject+'</button><button type="button" data-br-choice="settings">'+t.settings+'</button></div>';
    document.body.appendChild(banner);banner.hidden=state().decided;
    dialog=document.createElement('dialog');dialog.className='br-consent-dialog';dialog.id='br-consent-dialog';dialog.setAttribute('aria-labelledby','br-consent-dialog-title');
    dialog.innerHTML='<div class="br-consent-dialog-head"><h2 id="br-consent-dialog-title">'+t.settingsTitle+'</h2><button type="button" class="br-consent-close" data-br-choice="close" aria-label="'+t.close+'">×</button></div><p>'+t.stored+'</p><div class="br-consent-option"><strong>'+t.essential+'</strong><p>'+t.required+'</p></div><label class="br-consent-option br-consent-switch"><input type="checkbox" id="br-consent-analytics"><span><strong>'+t.analytics+'</strong><span>'+t.analyticsText+'</span></span></label><p><a href="'+policyUrl+'">'+t.policy+'</a> · <a href="'+privacyUrl+'">'+t.privacy+'</a></p><div class="br-consent-actions"><button type="button" data-br-choice="save">'+t.save+'</button><button type="button" data-br-choice="reject">'+t.reject+'</button></div>';
    document.body.appendChild(dialog);
    reopen=document.createElement('button');reopen.type='button';reopen.className='br-privacy-tab';reopen.id='br-privacy-tab';reopen.setAttribute('data-cookie-settings','');reopen.setAttribute('aria-label',t.settingsTitle);reopen.setAttribute('title',t.settingsTitle);reopen.setAttribute('aria-haspopup','dialog');reopen.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 3 4.5 6v5.2c0 4.5 3 7.9 7.5 9.8 4.5-1.9 7.5-5.3 7.5-9.8V6L12 3Z"/><path d="m8.5 11.8 2.3 2.3 4.7-4.7"/></svg>';reopen.hidden=!state().decided;document.body.appendChild(reopen);
    const status=document.createElement('span');status.id='br-consent-status';status.className='br-consent-visually-hidden';status.setAttribute('role','status');status.setAttribute('aria-live','polite');document.body.appendChild(status);
    dialog.addEventListener('cancel',e=>{e.preventDefault();close();});dialog.addEventListener('click',e=>{if(e.target===dialog)close();});
    document.addEventListener('click',e=>{
      if(e.target.closest('[data-cookie-settings],a[href="#cookie-settings"]')){e.preventDefault();open();return;}
      const b=e.target.closest('[data-br-choice]');if(!b)return;const choice=b.getAttribute('data-br-choice');
      if(choice==='accept')save(true);if(choice==='reject')save(false);if(choice==='settings')open();if(choice==='save')save(dialog.querySelector('#br-consent-analytics').checked);if(choice==='close')close();
    });
    if(!state().analytics){window['ga-disable-'+GA]=true;clearAnalyticsCookies();}else startAnalytics();
  }
  window.BankRankingConsent={open:open,getState:state,storageKey:KEY,preferenceDays:180};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
