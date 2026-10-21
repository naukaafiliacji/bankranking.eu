(function(){
 'use strict';
 const D=window.BANKRANKING_MULTI,b=document.body,isPL=b.dataset.market==='pl';
 const list=document.getElementById('rank-list'),title=document.getElementById('ranking-title');
 const plCat={personal:'Konta osobiste',business:'Konta firmowe',joint:'Konta wspólne',student:'Konta studenckie',youth:'Konta dla młodych',child:'Konta dla dzieci',savings:'Konta oszczędnościowe',deposits:'Lokaty terminowe',business_savings:'Oszczędności firmowe',child_savings:'Oszczędności dla dzieci',investment:'Rachunki inwestycyjne',funds:'Fundusze',managed:'Zarządzane inwestowanie',self_directed:'Samodzielne inwestowanie',retirement:'Inwestowanie emerytalne',business_investing:'Inwestowanie dla firm'};
 function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
 if(!D?.markets?.[b.dataset.market]||!list){
  if(title)title.textContent=isPL?'Nie udało się wczytać zestawienia':'Reference list could not be loaded';
  if(list)list.innerHTML='<div class="no-filter-results"><strong>'+(isPL?'Dane zestawienia są chwilowo niedostępne.':'Reference data is temporarily unavailable.')+'</strong><span>'+(isPL?'Odśwież stronę lub wróć do wyboru rynku.':'Refresh the page or return to the market selection.')+'</span></div>';
  return;
 }
 const m=D.markets[b.dataset.market],g=b.dataset.group,cats=D.categories;
 let allowed;try{allowed=JSON.parse(b.dataset.categories);}catch(e){allowed=['personal'];}
 const params=new URLSearchParams(location.search);
 let cat=allowed.includes(params.get('cat'))?params.get('cat'):allowed[0],mode='bank';
 const bs=[...document.querySelectorAll('.cat-btn')],pbs=[...document.querySelectorAll('.provider-btn')],pw=document.querySelector('.provider-toggle');
 const sub=document.getElementById('ranking-sub'),method=document.getElementById('ranking-method');
 const ageWrap=document.getElementById('age-filter'),search=document.getElementById('bank-search'),sort=document.getElementById('ranking-sort');
 const promoOnly=document.getElementById('promo-only'),freeOnly=document.getElementById('free-only'),reset=document.getElementById('reset-filters'),filterCount=document.getElementById('filter-count');
 const referenceDate='2026-08-13';
 // These legacy records do not contain verified, age-specific tariffs. Do not imply an age adjustment.
 if(ageWrap)ageWrap.hidden=true;
 function favicon(d){return 'https://www.google.com/s2/favicons?domain='+encodeURIComponent(d)+'&sz=256';}
 function providerUrl(x){return x.providerUrl||('https://'+x.domain);}
 function rawRows(){const d=m.rankings[cat];return g==='investing'?((d&&d[mode])||[]):(Array.isArray(d)?d:[]);}
 function parseAmount(raw){
  let s=String(raw).replace(/[\s\u00a0\u202f']/g,'');
  if(s.includes(',')&&s.includes('.')){if(s.lastIndexOf(',')>s.lastIndexOf('.'))s=s.replace(/\./g,'').replace(',','.');else s=s.replace(/,/g,'');}
  else if(s.includes(','))s=/^\d{1,3}(,\d{3})+$/.test(s)?s.replace(/,/g,''):s.replace(',','.');
  else if(/^\d{1,3}(\.\d{3})+$/.test(s))s=s.replace(/\./g,'');
  const n=Number(s);return Number.isFinite(n)&&n>=0?n:null;
 }
 const currency='(?:EUR|PLN|GBP|SEK|CZK|DKK|RON|HUF|CHF|€|£|zł)';
 const amount='(\\d[\\d.,\\s\\u00a0\\u202f]*)';
 function moneyValues(text){
  const re=new RegExp(currency+'\\s*'+amount+'|'+amount+'\\s*'+currency,'gi'),result=[];
  for(const match of String(text||'').matchAll(re)){const n=parseAmount(match[1]??match[2]);if(n!==null)result.push(n);}
  return result;
 }
 function bonusValue(x){
  if(typeof x.bonusAmount==='number'&&Number.isFinite(x.bonusAmount))return x.bonusAmount;
  const values=moneyValues(x.metric2);return values.length?Math.max(...values):-1;
 }
 function feeValue(x){
  if(x.feeWaiverRequired===true)return Infinity;
  if(typeof x.monthlyFee==='number'&&Number.isFinite(x.monthlyFee)&&x.monthlyFee>=0)return x.monthlyFee;
  const text=String(x.metric1||'').trim();
  // Only a standalone monthly currency amount is interpretable here. Conditions, ranges and prose stay unknown.
  if(/[\*]|conditional|warunk|under|waiv|od |from|hasta|up to|do \d/i.test(text))return Infinity;
  const re=new RegExp('^\\s*(?:'+currency+'\\s*'+amount+'|'+amount+'\\s*'+currency+')(?:\\s*(?:\\/\\s*)?(?:month|monthly|mies\\.?|miesięcznie))?\\s*$','i');
  const match=text.match(re);if(!match)return Infinity;
  const n=parseAmount(match[1]??match[2]);return n===null?Infinity:n;
 }
 function byName(a,b){return String(a.provider).localeCompare(String(b.provider),isPL?'pl':'en');}
 function filteredRows(){
  let rows=[...rawRows()];const q=(search?.value||'').trim().toLowerCase();
  if(q)rows=rows.filter(x=>(String(x.provider)+' '+String(x.product)).toLowerCase().includes(q));
  if(promoOnly?.checked)rows=rows.filter(x=>bonusValue(x)>0);
  if(freeOnly?.checked)rows=rows.filter(x=>feeValue(x)===0);
  const order=sort?.value||'recommended';
  return rows.sort((a,b)=>{if(order==='bonus'){const d=bonusValue(b)-bonusValue(a);if(d)return d;}if(order==='fee'){const av=feeValue(a),bv=feeValue(b);if(av!==bv)return av-bv;}return byName(a,b);});
 }
 function recordDate(x){return /^\d{4}-\d{2}-\d{2}$/.test(x.verifiedAt||'')?x.verifiedAt:referenceDate;}
 function dateLabel(s){return new Intl.DateTimeFormat(isPL?'pl-PL':'en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(s+'T12:00:00Z'));}
 function updateURL(){const u=new URL(location.href);u.searchParams.set('cat',cat);u.searchParams.delete('age');history.replaceState(null,'',u);}
 function verifyCopy(){
  if(g==='banking')return isPL?'Sprawdź u dostawcy aktualny produkt, taryfę, zwolnienia z opłat, kartę, bankomaty, wymagania i zasady promocji.':'Check the current product, tariff, fee waivers, card and ATM costs, eligibility and promotion terms with the provider.';
  if(g==='saving')return isPL?'Sprawdź aktualne oprocentowanie, czas jego obowiązywania, limit salda, wypłaty i system ochrony depozytów.':'Check current interest rates, duration, balance caps, withdrawals and deposit protection.';
  return isPL?'Sprawdź aktualne opłaty, instrumenty, dostępność usługi, ryzyko, zasady przechowywania aktywów i wymagania podatkowe.':'Check current fees, instruments, service availability, risks, custody and tax requirements.';
 }
 function sourceLabel(x){try{const a=new URL(x.source),c=new URL(providerUrl(x));return a.hostname.replace(/^www\./,'')===c.hostname.replace(/^www\./,'')?(isPL?'Dokumentacja dostawcy':'Provider documentation'):(isPL?'Źródło referencyjne':'Reference source');}catch(e){return isPL?'Źródło referencyjne':'Reference source';}}
 function render(){
  bs.forEach(x=>x.classList.toggle('active',x.dataset.cat===cat));if(pw)pw.classList.toggle('visible',g==='investing');pbs.forEach(x=>x.classList.toggle('active',x.dataset.mode===mode));
  const rows=filteredRows(),label=isPL?(plCat[cat]||cat):(cats[cat]?.title||cat);
  if(filterCount)filterCount.textContent=rows.length;
  if(title)title.textContent=b.dataset.rankingTitle||(isPL?label+' — zestawienie referencyjne':label+' — reference directory');
  if(sub)sub.textContent=isPL?rows.length+' pasujących wpisów. Dane referencyjne z 13 sierpnia 2026 r.; nie potwierdzają aktualnych opłat, promocji ani dostępności.':rows.length+' matching records. Reference data from 13 August 2026; current fees, promotions and availability have not been revalidated.';
  const order=sort?.value||'recommended';
  if(method)method.textContent=isPL?('Kolejność: '+(order==='bonus'?'najwyższa kwota zapisana w danych':order==='fee'?'najniższa jednoznacznie zapisana opłata miesięczna':'alfabetyczna według dostawcy')+'. Brak danych nie oznacza zera. To lista referencyjna, bez oceny punktowej.'):
   ('Order: '+(order==='bonus'?'highest amount recorded in the dataset':order==='fee'?'lowest unambiguously recorded monthly fee':'provider name, A–Z')+'. Missing data does not mean zero. This is a reference list without quality scores.');
  if(!rows.length){list.innerHTML='<div class="no-filter-results"><strong>'+(isPL?'Brak pasujących wpisów.':'No matching records.')+'</strong><span>'+(isPL?'Wyczyść filtry. Niepełne dane mogą nie spełniać filtra opłaty lub korzyści.':'Reset the filters. Incomplete records may not satisfy a fee or benefit filter.')+'</span></div>';return;}
  list.innerHTML=rows.map((x,i)=>{
   const id='record-'+String(x.provider).toLowerCase().replace(/[^a-z0-9]+/g,'-')+'-'+i;
   return '<div class="rank-row"><div class="provider-cell"><img class="provider-logo" src="'+esc(x.logo||x.logoFallback||favicon(x.domain))+'" alt="'+esc(x.provider)+'"><div class="provider-copy"><strong>'+esc(x.provider)+'</strong><small>'+esc(x.product||label)+'</small></div></div><div class="card-metrics"><div class="metric-card metric-card-best"><label>'+(isPL?'Opis archiwalny':'Historical description')+'</label><strong>'+esc(x.bestFor||'—')+'</strong></div><div class="metric-card"><label>'+(isPL?'Zapis danych':'Recorded detail')+'</label><strong>'+esc(x.metric1||'—')+'</strong></div><div class="metric-card"><label>'+(isPL?'Dodatkowa informacja':'Additional record')+'</label><strong>'+esc(x.metric2||'—')+'</strong></div></div><div class="rank-cta"><a href="'+esc(x.affiliateUrl||providerUrl(x))+'" target="_blank" rel="'+(x.affiliateUrl?'sponsored nofollow noopener':'noopener')+'">'+(isPL?'Sprawdź u dostawcy':'Check provider')+' <span>↗</span></a><button type="button" class="analysis-toggle" data-analysis-toggle aria-expanded="false" aria-controls="'+id+'">'+(isPL?'Szczegóły wpisu ↓':'Record details ↓')+'</button></div><div class="rank-analysis-panel" id="'+id+'"><div class="analysis-intro"><div><span class="analysis-eyebrow">'+(isPL?'ZAPIS REFERENCYJNY':'REFERENCE RECORD')+'</span><h3>'+esc(x.provider)+'</h3></div><p>'+(isPL?'Ten wpis zachowuje wcześniejszą informację o dostawcy. Nie jest bieżącą weryfikacją taryfy ani wyjaśnieniem jakości produktu.':'This record preserves earlier provider information. It is not a current tariff verification or a product-quality assessment.')+'</p></div><div class="analysis-grid"><section><span class="analysis-label">'+(isPL?'Produkt lub zakres wpisu':'Product or record scope')+'</span><p>'+esc(x.product||label)+'</p></section><section><span class="analysis-label">'+(isPL?'Data danych':'Record date')+'</span><p>'+esc(dateLabel(recordDate(x)))+'. '+(isPL?'Źródło może od tego czasu prezentować inne warunki.':'The linked source may have changed since then.')+'</p></section><section><span class="analysis-label">'+(isPL?'Co sprawdzić teraz':'What to check now')+'</span><p>'+verifyCopy()+'</p></section><section><span class="analysis-label">'+(isPL?'Jak używać zestawienia':'How to use this list')+'</span><p>'+(isPL?'Porównuj konkretne produkty dopiero po sprawdzeniu aktualnych dokumentów. Kolejność alfabetyczna i filtry zapisanych danych nie stanowią rekomendacji.':'Compare specific products after checking current documents. Alphabetical ordering and recorded-data filters are not recommendations.')+'</p></section></div><div class="analysis-evidence"><span class="analysis-label">'+(isPL?'Źródła i zasady':'Sources and policy')+'</span><div class="analysis-links"><a href="'+esc(providerUrl(x))+'" target="_blank" rel="noopener">'+(isPL?'Strona dostawcy ↗':'Provider website ↗')+'</a>'+(x.source?'<a href="'+esc(x.source)+'" target="_blank" rel="noopener">'+sourceLabel(x)+' ↗</a>':'')+'<a href="/methodology/">'+(isPL?'Metodologia ↗':'Methodology ↗')+'</a></div></div></div></div>';
  }).join('');
 }
 bs.forEach(x=>x.addEventListener('click',()=>{if(!allowed.includes(x.dataset.cat))return;cat=x.dataset.cat;mode='bank';if(search)search.value='';if(promoOnly)promoOnly.checked=false;if(freeOnly)freeOnly.checked=false;if(sort)sort.value='recommended';updateURL();render();}));
 pbs.forEach(x=>x.addEventListener('click',()=>{mode=x.dataset.mode==='specialist'?'specialist':'bank';render();}));
 [search,sort,promoOnly,freeOnly].filter(Boolean).forEach(x=>x.addEventListener(x===search?'input':'change',render));
 if(reset)reset.addEventListener('click',()=>{if(search)search.value='';if(sort)sort.value='recommended';if(promoOnly)promoOnly.checked=false;if(freeOnly)freeOnly.checked=false;updateURL();render();});
 list.addEventListener('click',e=>{const button=e.target.closest('[data-analysis-toggle]');if(!button)return;const row=button.closest('.rank-row'),open=!row.classList.contains('analysis-open');row.classList.toggle('analysis-open',open);button.setAttribute('aria-expanded',String(open));button.textContent=open?(isPL?'Ukryj szczegóły ↑':'Hide details ↑'):(isPL?'Szczegóły wpisu ↓':'Record details ↓');});
 render();
})();
