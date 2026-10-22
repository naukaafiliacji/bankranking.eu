'use strict';const fs=require('fs'),path=require('path'),root=path.resolve(__dirname,'..'),translations=require('./home-translations.json');
let base=fs.readFileSync(root+'/index.html','utf8');base=base.replace(/<a\b[^>]*href="\/child-account\/"[^>]*>[\s\S]*?<\/a>/g,'').replace('/es/banking/#cuenta-n26-standard','/es/banking/?bank=N26');
const variants=[['en','/'],['pl','/polski/'],['it','/italiano/'],['es','/espanol/']];
const alternates=variants.map(([l,u])=>'<link rel="alternate" hreflang="'+l+'" href="https://bankranking.eu'+u+'">').join('');
const desc={pl:'Porównaj konta bankowe, opłaty i oferty banków w Polsce, Hiszpanii i Włoszech. Aktualności, oszczędzanie i informacje o warunkach kont.',it:'Confronta conti bancari, commissioni e offerte in Polonia, Spagna e Italia. Notizie, risparmio e condizioni dei conti.',es:'Compara cuentas bancarias, comisiones y ofertas en Polonia, España e Italia. Actualidad, ahorro y condiciones de las cuentas.'};
for(const[l,url]of variants){
 let h=base.replace(/<link\b(?=[^>]*\bhreflang=)[^>]*>/gi,'');const ix={pl:0,it:1,es:2}[l];
 if(l!=='en'){
  const translate=text=>{const trim=text.trim();return translations[trim]?text.replace(trim,translations[trim][ix]):text;};
  // Translate text nodes and accessible labels while preserving styles, form contracts and scripts.
  h=h.split(/(<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>)/gi).map(part=>/^<(?:script|style)\b/i.test(part)?part:part.replace(/>([^<>]+)</g,(all,text)=>'>'+translate(text)+'<').replace(/\b(placeholder|aria-label|title)="([^"]*)"/g,(all,key,text)=>key+'="'+translate(text)+'"')).join('');
  h=h.replace(/<html lang="[^"]+"/,'<html lang="'+l+'"');
  h=h.replace('<a class="brand" href="/">','<a class="brand" href="'+url+'">').replace('<a class="footer-brand" href="/">','<a class="footer-brand" href="'+url+'">');
  h=h.split('Compare Bank Accounts in Poland, Spain &amp; Italy | BankRanking').join(translations['Compare Bank Accounts in Poland, Spain &amp; Italy | BankRanking'][ix]);
  h=h.replace(/(<details class="lang-menu"><summary>)[\s\S]*?(<\/summary>)/,'$1<span class="flag-wrap"><img alt="'+{pl:'Polski',it:'Italiano',es:'Español'}[l]+'" class="site-flag site-flag-sm" height="14" width="18" src="/assets/flags-v3/'+l+'.png"><span>'+{pl:'Polski',it:'Italiano',es:'Español'}[l]+'</span></span><span class="lang-chevron">▾</span>$2');
  h=h.replace(/(<meta\b[^>]*\bcontent=")[^"]*("[^>]*(?:name="(?:description|twitter:description)"|property="og:description")[^>]*>)/g,'$1'+desc[l]+'$2');
  h=h.replace(/content="en_GB" property="og:locale"/,'content="'+{pl:'pl_PL',it:'it_IT',es:'es_ES'}[l]+'" property="og:locale"');
  h=h.replace(/(<input[^>]*name="locale"[^>]*value=")en"/,'$1'+l+'"');
  h=h.replace(/"sub":"(Poland|Italy|Spain)([^"\\]*)"/g,(all,name,rest)=>'"sub":"'+(translations[name]?.[ix]||name)+rest+'"');
  h=h.replace(/"type":"market","label":"(Poland|Italy|Spain)"/g,(all,name)=>'"type":"market","label":"'+translations[name][ix]+'"');
  h=h.replace(/Bank account ranking/g,{pl:'Ranking kont bankowych',it:'Confronto conti bancari',es:'Comparativa de cuentas'}[l]);
  const formTexts={pl:{'Email address':'Adres e-mail','Your email address':'Twój adres e-mail','Enter your email address':'Wpisz adres e-mail','No results found.':'Brak wyników.'},it:{'Email address':'Indirizzo email','Your email address':'La tua email','Enter your email address':'Inserisci la tua email','No results found.':'Nessun risultato.'},es:{'Email address':'Correo electrónico','Your email address':'Tu correo electrónico','Enter your email address':'Introduce tu correo electrónico','No results found.':'No hay resultados.'}}[l];
  for(const[a,b]of Object.entries(formTexts))h=h.split(a).join(b);
  h=h.replace('No matching bank or account',{pl:'Brak pasującego banku lub konta',it:'Nessuna banca o conto corrispondente',es:'No hay bancos o cuentas coincidentes'}[l]);
 }
 const absolute='https://bankranking.eu'+url;
 h=h.replace(/(<link\b[^>]*href=")[^"]+("[^>]*rel="canonical"[^>]*>)/g,'$1'+absolute+'$2').replace(/(<meta\b[^>]*content=")[^"]+("[^>]*property="og:url"[^>]*>)/g,'$1'+absolute+'$2');
 h=h.replace(/<script([^>]*type="application\/ld\+json"[^>]*)>([\s\S]*?)<\/script>/g,(all,attrs,raw)=>{const json=JSON.parse(raw);for(const item of json['@graph']||[]){if(item['@type']==='WebPage'){item.url=absolute;item['@id']=absolute+'#webpage';item.inLanguage=l;if(l!=='en'){item.description=desc[l];item.name=translations['Compare Bank Accounts in Poland, Spain &amp; Italy | BankRanking'][ix]}}}return '<script'+attrs+'>'+JSON.stringify(json)+'</script>'});
 for(const [route,label]of [['/','English'],['/polski/','Polski'],['/italiano/','Italiano'],['/espanol/','Español']])h=h.replace('<a href="'+route+'"><img alt="'+label+'"','<a href="'+route+'" aria-label="'+label+'"><img alt=""');
 h=h.replace('</head>',alternates+'</head>');fs.writeFileSync(root+url+'index.html',h);
}
console.log('Built current home design in English, Polish, Italian and Spanish.');
