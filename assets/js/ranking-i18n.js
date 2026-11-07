(function(){
'use strict';
var LANGUAGES={en:'English',pl:'Polski',es:'Español',it:'Italiano'};
var FLAGS={en:'en',pl:'pl',es:'es',it:'it'};
var MARKET={
 en:{pl:'Poland',it:'Italy',es:'Spain'},
 pl:{pl:'Polska',it:'Włochy',es:'Hiszpania'},
 es:{pl:'Polonia',it:'Italia',es:'España'},
 it:{pl:'Polonia',it:'Italia',es:'Spagna'}
};
var T={
 en:{
  lang:'Language',banking:'Bank accounts',saving:'Savings',investing:'Investing',
  heroBank:'Best bank accounts in {market}',heroSave:'Best savings accounts in {market}',heroInvest:'Investment accounts in {market}',
  descBank:'Compare personal, business, joint, student and youth accounts from major providers in {market}.',
  descSave:'Compare savings accounts, fixed-term deposits and dedicated savings products available in {market}.',
  descInvest:'Compare investment services from banks and specialist providers available in {market}.',
  updated:'Fees & welcome rewards',updatedDesc:'Dates and sources for each product',
  filterBank:'Filter accounts',filterSave:'Filter savings',filterInvest:'Filter investments',reset:'Reset',
  accountType:'Account type',savingsType:'Savings type',investmentType:'Investment type',
  age:'Age',bank:'Bank',sort:'Sort by',showOnly:'Show only',searchBank:'Search bank',
  providerType:'Provider type',bankGroups:'Banks & bank groups',specialists:'Specialist providers',
  sortName:'Provider name A–Z',sortBonus:'Highest verified active bonus',sortFee:'Lowest annual maintenance before waivers',sortBank:'Bank name A–Z',
  offerOnly:'Welcome / special offer',freeOnly:'Account + card: zero unconditional maintenance',results:'results',
  ageOptional:'Age (optional)',any:'Any',salary:'Salary requirement',salaryAny:'Any requirement',salaryNo:'No salary required',salaryYes:'Salary required',
  ageHelp:'Age filters stated product eligibility. Salary refers to opening requirements, not optional rewards.',
  rankingTitleBank:'Compare accounts',rankingTitleSave:'Compare savings',rankingTitleInvest:'Compare investment accounts',
  rankingSub:'{total} products and providers · {checked} with dated fee information. Details and sources on every product.',
  rankingMethod:'Cash rewards are separate from account fees, conditions and savings interest. Check the details of each product.',
  noResults:'No matching results. Change the filters.',compareTitle:'Cost comparison',clearCompare:'Clear selection',oneMore:'Select one more product.',scrollTable:'Scroll the table to see all columns.',
  maxThree:'Select up to three products.',selected:'Selected: ',
  bonusStrong:'Welcome bonuses: new customers only.',bonusRest:'Cash rewards for opening a bank account are available to eligible new customers. Each bank defines who qualifies and may require additional steps.',
  seoTitle:'Account costs and welcome rewards',
  seoText:'Compare fees and interest carefully. A price of 0 means a confirmed zero fee; missing or conditional values are explained in each product’s details.',seoExtra:'Welcome rewards may require a salary transfer, transactions or a promotional code. Offers can end or change; check current conditions and official sources. Gifts and savings interest are not cash opening bonuses.',
  footerText:'BankRanking provides information and comparisons. We are not a bank, financial institution or investment adviser.',
  research:'Research',about:'About',methodology:'Methodology',services:'Services',contact:'Contact',terms:'Terms',disclaimer:'Disclaimer',privacy:'Privacy',cookies:'Cookies',
  featured:'Featured',monthTag:'Best offers · September 2026',monthSmall:'5 selected offers',monthHero:'Best bank accounts in Poland — September 2026',monthDesc:'Five selected offers for September 2026.',
  monthlySub:'5 selected offers · September 2026.',monthlyMethod:'This shortlist contains only the featured bank offers.',
  monthlyNotice:'The selected bank offers may change; always check the official current conditions.',
  personal:'Personal',business:'Business',joint:'Joint',student:'Student',youth:'Youth',child:'Children',
  savings:'Savings',deposits:'Fixed-term',business_savings:'Business savings',child_savings:'Child savings',
  investment:'Investment account',funds:'Funds',managed:'Managed',self_directed:'Self-directed',retirement:'Retirement',business_investing:'Business investing'
 },
 pl:{
  lang:'Język',banking:'Konta bankowe',saving:'Oszczędności',investing:'Inwestowanie',
  heroBank:'Najlepsze konta bankowe w {market}',heroSave:'Najlepsze konta oszczędnościowe w {market}',heroInvest:'Rachunki inwestycyjne w {market}',
  descBank:'Porównaj konta osobiste, firmowe, wspólne, studenckie i młodzieżowe oferowane przez banki w {market}.',
  descSave:'Porównaj konta oszczędnościowe, lokaty terminowe i inne produkty oszczędnościowe w {market}.',
  descInvest:'Porównaj rachunki inwestycyjne banków i wyspecjalizowanych dostawców w {market}.',
  updated:'Opłaty i premie',updatedDesc:'Daty i źródła przy każdej ofercie',
  filterBank:'Filtruj konta',filterSave:'Filtruj oszczędności',filterInvest:'Filtruj inwestycje',reset:'Wyczyść',
  accountType:'Rodzaj konta',savingsType:'Rodzaj oszczędności',investmentType:'Rodzaj inwestycji',
  age:'Wiek',bank:'Bank',sort:'Sortuj według',showOnly:'Pokaż tylko',searchBank:'Szukaj banku',
  providerType:'Rodzaj dostawcy',bankGroups:'Banki i grupy bankowe',specialists:'Dostawcy specjalistyczni',
  sortName:'Nazwa dostawcy A–Z',sortBonus:'Najwyższa potwierdzona premia',sortFee:'Najniższa opłata roczna',sortBank:'Nazwa banku A–Z',
  offerOnly:'Premia na start / oferta specjalna',freeOnly:'Konto i karta bez opłat bezwarunkowych',results:'wyników',
  ageOptional:'Wiek (opcjonalnie)',any:'Dowolny',salary:'Wymóg wpływu wynagrodzenia',salaryAny:'Dowolny warunek',salaryNo:'Bez wymaganych wpływów',salaryYes:'Wymagane wpływy',
  ageHelp:'Wiek określa możliwość skorzystania z produktu. Wymóg wynagrodzenia dotyczy otwarcia konta, nie premii.',
  rankingTitleBank:'Porównaj konta',rankingTitleSave:'Porównaj oszczędności',rankingTitleInvest:'Porównaj inwestycje',
  rankingSub:'{total} ofert i dostawców · {checked} z informacją o dacie sprawdzenia opłat. Szczegóły i źródła przy każdej ofercie.',
  rankingMethod:'Premie pieniężne są niezależne od opłat i oprocentowania. Szczegółowe warunki znajdują się przy ofertach.',
  noResults:'Brak pasujących ofert. Zmień filtry.',compareTitle:'Porównanie kosztów',clearCompare:'Wyczyść wybór',oneMore:'Wybierz jeszcze jedną ofertę.',scrollTable:'Przewiń tabelę, aby zobaczyć wszystkie kolumny.',
  maxThree:'Możesz porównać maksymalnie trzy produkty.',selected:'Wybrano: ',
  bonusStrong:'Premie za otwarcie konta: tylko dla nowych klientów.',bonusRest:'Każdy bank określa, kto jest nowym klientem i jakie dodatkowe warunki należy spełnić.',
  seoTitle:'Opłaty bankowe i premie powitalne',seoText:'Porównuj opłaty i oprocentowanie. Kwota 0 oznacza potwierdzoną zerową opłatę; brakujące lub warunkowe opłaty wyjaśniamy w szczegółach.',seoExtra:'Premie powitalne mogą wymagać wpływu wynagrodzenia, transakcji lub kodu promocyjnego. Oferty mogą wygasnąć lub się zmienić — sprawdzaj aktualne warunki i oficjalne źródła. Prezenty i odsetki nie są premią pieniężną za otwarcie konta.',
  footerText:'BankRanking publikuje informacje i porównania. Nie jesteśmy bankiem, instytucją finansową ani doradcą inwestycyjnym.',
  research:'Badania',about:'O nas',methodology:'Metodologia',services:'Usługi',contact:'Kontakt',terms:'Regulamin',disclaimer:'Zastrzeżenia',privacy:'Prywatność',cookies:'Cookies',
  featured:'Wyróżnione',monthTag:'Najlepsze · wrzesień 2026',monthSmall:'5 wybranych ofert',monthHero:'Najlepsze konta bankowe w Polsce — wrzesień 2026',monthDesc:'Pięć wybranych ofert kont we wrześniu 2026.',
  monthlySub:'5 wybranych ofert · wrzesień 2026.',monthlyMethod:'Zestawienie obejmuje tylko wskazane oferty banków.',
  monthlyNotice:'Warunki wybranych ofert mogą się zmieniać. Sprawdź szczegóły na stronie banku.',
  personal:'Osobiste',business:'Firmowe',joint:'Wspólne',student:'Studenckie',youth:'Dla młodych',child:'Dla dzieci',
  savings:'Oszczędnościowe',deposits:'Lokaty',business_savings:'Oszczędności firmowe',child_savings:'Oszczędności dla dzieci',
  investment:'Rachunek inwestycyjny',funds:'Fundusze',managed:'Zarządzane',self_directed:'Samodzielne inwestowanie',retirement:'Emerytalne',business_investing:'Inwestycje firmowe'
 },
 es:{
  lang:'Idioma',banking:'Cuentas bancarias',saving:'Ahorro',investing:'Inversión',
  heroBank:'Mejores cuentas bancarias en {market}',heroSave:'Mejores cuentas de ahorro en {market}',heroInvest:'Cuentas de inversión en {market}',
  descBank:'Compara cuentas personales, de empresa, conjuntas, para estudiantes y jóvenes de los principales bancos de {market}.',
  descSave:'Compara cuentas de ahorro, depósitos a plazo y otros productos de ahorro disponibles en {market}.',
  descInvest:'Compara servicios de inversión bancarios y proveedores especializados disponibles en {market}.',
  updated:'Comisiones y bonificaciones',updatedDesc:'Fechas y fuentes en cada producto',
  filterBank:'Filtrar cuentas',filterSave:'Filtrar ahorros',filterInvest:'Filtrar inversiones',reset:'Restablecer',
  accountType:'Tipo de cuenta',savingsType:'Tipo de ahorro',investmentType:'Tipo de inversión',
  age:'Edad',bank:'Banco',sort:'Ordenar por',showOnly:'Mostrar solo',searchBank:'Buscar banco',
  providerType:'Tipo de proveedor',bankGroups:'Bancos y grupos bancarios',specialists:'Proveedores especializados',
  sortName:'Nombre del proveedor A–Z',sortBonus:'Mayor bonificación vigente verificada',sortFee:'Menor coste anual de mantenimiento',sortBank:'Nombre del banco A–Z',
  offerOnly:'Bono de bienvenida / promoción',freeOnly:'Cuenta y tarjeta sin cuotas incondicionales',results:'resultados',
  ageOptional:'Edad (opcional)',any:'Cualquiera',salary:'Requisito de nómina',salaryAny:'Cualquier requisito',salaryNo:'Sin domiciliar nómina',salaryYes:'Nómina obligatoria',
  ageHelp:'La edad determina la elegibilidad. La nómina se refiere a la apertura, no a las recompensas opcionales.',
  rankingTitleBank:'Comparar cuentas',rankingTitleSave:'Comparar ahorros',rankingTitleInvest:'Comparar inversiones',
  rankingSub:'{total} productos y entidades · {checked} con información de comisiones fechada. Detalles y fuentes en cada ficha.',
  rankingMethod:'Las recompensas en efectivo se muestran por separado de las comisiones y los intereses. Consulta las condiciones de cada producto.',
  noResults:'No hay resultados. Cambia los filtros.',compareTitle:'Comparación de costes',clearCompare:'Borrar selección',oneMore:'Selecciona otro producto.',scrollTable:'Desplaza la tabla para ver todas las columnas.',
  maxThree:'Puedes comparar hasta tres productos.',selected:'Seleccionados: ',
  bonusStrong:'Bonificaciones: solo para clientes nuevos.',bonusRest:'Las recompensas por abrir una cuenta están sujetas a los requisitos de cada banco. Pueden aplicarse condiciones adicionales.',
  seoTitle:'Comisiones y bonificaciones de bienvenida',seoText:'Compara las comisiones y los intereses. Un importe de 0 indica una comisión cero confirmada; los importes desconocidos o condicionados se explican en los detalles.',seoExtra:'Las bonificaciones pueden exigir domiciliar la nómina, realizar pagos o introducir un código. Las ofertas pueden terminar o cambiar: consulta las condiciones y fuentes oficiales. Los regalos y los intereses no son premios en efectivo por abrir la cuenta.',
  footerText:'BankRanking publica información y comparaciones. No somos un banco, una entidad financiera ni un asesor de inversiones.',
  research:'Investigación',about:'Sobre nosotros',methodology:'Metodología',services:'Servicios',contact:'Contacto',terms:'Condiciones',disclaimer:'Aviso legal',privacy:'Privacidad',cookies:'Cookies',
  featured:'Destacados',monthTag:'Mejores ofertas · septiembre de 2026',monthSmall:'5 ofertas seleccionadas',monthHero:'Mejores cuentas bancarias en Polonia — septiembre de 2026',monthDesc:'Cinco ofertas de cuentas seleccionadas para septiembre de 2026.',
  monthlySub:'5 ofertas seleccionadas · septiembre de 2026.',monthlyMethod:'Esta selección incluye únicamente los bancos destacados.',
  monthlyNotice:'Las condiciones de las ofertas pueden cambiar. Comprueba los requisitos actuales en el banco.',
  personal:'Personal',business:'Empresas',joint:'Conjunta',student:'Estudiantes',youth:'Jóvenes',child:'Menores',
  savings:'Ahorro',deposits:'Depósitos a plazo',business_savings:'Ahorro empresarial',child_savings:'Ahorro infantil',
  investment:'Cuenta de inversión',funds:'Fondos',managed:'Gestión delegada',self_directed:'Autogestionada',retirement:'Jubilación',business_investing:'Inversión empresarial'
 },
 it:{
  lang:'Lingua',banking:'Conti bancari',saving:'Risparmio',investing:'Investimenti',
  heroBank:'Migliori conti bancari in {market}',heroSave:'Migliori conti di risparmio in {market}',heroInvest:'Conti di investimento in {market}',
  descBank:'Confronta conti personali, aziendali, cointestati, per studenti e giovani delle principali banche in {market}.',
  descSave:'Confronta conti di risparmio, depositi vincolati e altri prodotti di risparmio disponibili in {market}.',
  descInvest:'Confronta servizi d’investimento bancari e fornitori specializzati disponibili in {market}.',
  updated:'Costi e bonus di benvenuto',updatedDesc:'Date e fonti per ogni prodotto',
  filterBank:'Filtra i conti',filterSave:'Filtra i risparmi',filterInvest:'Filtra gli investimenti',reset:'Reimposta',
  accountType:'Tipo di conto',savingsType:'Tipo di risparmio',investmentType:'Tipo di investimento',
  age:'Età',bank:'Banca',sort:'Ordina per',showOnly:'Mostra solo',searchBank:'Cerca banca',
  providerType:'Tipo di fornitore',bankGroups:'Banche e gruppi bancari',specialists:'Fornitori specializzati',
  sortName:'Nome del fornitore A–Z',sortBonus:'Bonus attivo verificato più alto',sortFee:'Costo annuo di gestione più basso',sortBank:'Nome della banca A–Z',
  offerOnly:'Bonus di benvenuto / offerta',freeOnly:'Conto e carta senza canone incondizionato',results:'risultati',
  ageOptional:'Età (facoltativa)',any:'Qualsiasi',salary:'Requisito di stipendio',salaryAny:'Qualsiasi requisito',salaryNo:'Nessun accredito richiesto',salaryYes:'Stipendio richiesto',
  ageHelp:'L’età determina l’idoneità. Il requisito di stipendio riguarda l’apertura, non i bonus facoltativi.',
  rankingTitleBank:'Confronta i conti',rankingTitleSave:'Confronta i risparmi',rankingTitleInvest:'Confronta gli investimenti',
  rankingSub:'{total} prodotti e istituti · {checked} con informazioni sui costi datate. Dettagli e fonti per ogni prodotto.',
  rankingMethod:'I bonus in denaro sono separati dai costi dei conti e dagli interessi. Consulta le condizioni di ogni prodotto.',
  noResults:'Nessun risultato. Modifica i filtri.',compareTitle:'Confronto dei costi',clearCompare:'Cancella selezione',oneMore:'Seleziona un altro prodotto.',scrollTable:'Scorri la tabella per vedere tutte le colonne.',
  maxThree:'Puoi confrontare fino a tre prodotti.',selected:'Selezionati: ',
  bonusStrong:'Bonus di benvenuto: solo per nuovi clienti.',bonusRest:'I premi per l’apertura di un conto spettano ai nuovi clienti idonei. Ogni banca definisce i requisiti e le eventuali condizioni aggiuntive.',
  seoTitle:'Costi dei conti e bonus di benvenuto',seoText:'Confronta costi e interessi. Un importo pari a 0 indica un costo zero confermato; valori assenti o condizionati sono spiegati nei dettagli.',seoExtra:'I bonus possono richiedere lo stipendio, transazioni o un codice promozionale. Le offerte possono terminare o cambiare: controlla condizioni e fonti ufficiali. Regali e interessi non sono premi in denaro per l’apertura del conto.',
  footerText:'BankRanking fornisce informazioni e confronti. Non siamo una banca, un istituto finanziario o un consulente d’investimento.',
  research:'Ricerca',about:'Chi siamo',methodology:'Metodologia',services:'Servizi',contact:'Contatti',terms:'Termini',disclaimer:'Avvertenze',privacy:'Privacy',cookies:'Cookie',
  featured:'In evidenza',monthTag:'Migliori offerte · settembre 2026',monthSmall:'5 offerte selezionate',monthHero:'Migliori conti bancari in Polonia — settembre 2026',monthDesc:'Cinque offerte di conti selezionate per settembre 2026.',
  monthlySub:'5 offerte selezionate · settembre 2026.',monthlyMethod:'Questa selezione include solo le offerte bancarie indicate.',
  monthlyNotice:'Le condizioni delle offerte possono cambiare. Controlla i requisiti aggiornati sul sito della banca.',
  personal:'Personale',business:'Aziendale',joint:'Cointestato',student:'Studenti',youth:'Giovani',child:'Minori',
  savings:'Risparmio',deposits:'Depositi vincolati',business_savings:'Risparmio aziendale',child_savings:'Risparmio per minori',
  investment:'Conto d’investimento',funds:'Fondi',managed:'Gestito',self_directed:'Autonomo',retirement:'Pensione',business_investing:'Investimento aziendale'
 }
};
var params=new URLSearchParams(location.search);
var defaultLanguage=document.body?.dataset.defaultLanguage||'en';
var queryLang=params.get('lang');
var lang=Object.prototype.hasOwnProperty.call(LANGUAGES,queryLang)?queryLang:defaultLanguage;
var baseUrl=location.origin==='null'?'https://bankranking.eu/':location.href;
var market=document.body?.dataset.market||'pl',group=document.body?.dataset.group||'banking',monthly=document.body?.dataset.monthlyRanking==='true';
function t(key,vars){var s=(T[lang]||T.en)[key]??T.en[key]??key;return String(s).replace(/\{(\w+)\}/g,(_,k)=>vars?.[k]??'');}
function marketName(code){return (MARKET[lang]||MARKET.en)[code]||code;}
function text(selector,value){var el=typeof selector==='string'?document.querySelector(selector):selector;if(el&&value!==undefined)el.textContent=value;return el;}
function setChildrenPreserveLinks(){
 var crumb=document.querySelector('.vertical-breadcrumb');
 if(crumb){var a=crumb.querySelector('a');if(a)a.textContent=marketName(market);var label=monthly?t('banking')+' / '+t('monthTag'):t(group);crumb.replaceChildren();if(a)crumb.append(a);crumb.append(document.createTextNode(' / '+label));}
}
function changeLinks(){
 document.querySelectorAll('[data-rank-language]').forEach(function(a){var u=new URL(location.href);u.searchParams.set('lang',a.dataset.rankLanguage);a.href=u.pathname+u.search+u.hash;});
 document.querySelectorAll('.monthly-tab[href]').forEach(function(a){var u=new URL(a.getAttribute('href'),baseUrl);u.searchParams.set('lang',lang);a.href=u.pathname+u.search;});
 // Keep market unchanged when navigating account categories from the special monthly page.
 if(monthly)document.querySelectorAll('.cat-btn[href]').forEach(function(a){var u=new URL(a.getAttribute('href'),baseUrl);u.searchParams.set('lang',lang);a.href=u.pathname+u.search;});
}
function staticUI(){
 document.documentElement.lang=lang;
 setChildrenPreserveLinks();
 var heroMarket=lang==='pl'?({pl:'Polsce',it:'Włoszech',es:'Hiszpanii'}[market]||marketName(market)):marketName(market);var title=monthly?t('monthHero'):t(group==='banking'?'heroBank':group==='saving'?'heroSave':'heroInvest',{market:heroMarket});
 text('.vertical-hero-top h1',title);
 text('.vertical-hero-top p',monthly?t('monthDesc'):t(group==='banking'?'descBank':group==='saving'?'descSave':'descInvest',{market:heroMarket}));
 text('.updated strong',t('updated'));var updated=document.querySelector('.updated');if(updated){var strong=updated.querySelector('strong');if(strong){while(strong.nextSibling)strong.nextSibling.remove();updated.append(document.createTextNode(t('updatedDesc')));}}
 text('.filter-head strong',t(group==='banking'?'filterBank':group==='saving'?'filterSave':'filterInvest'));text('#reset-filters',t('reset'));
 document.querySelectorAll('.filter-label').forEach(function(el){var raw=el.textContent.trim().toLowerCase();var map={
 'account type':group==='banking'?'accountType':'investmentType','typ konta':'accountType',
 'savings type':'savingsType','investment type':'investmentType','rodzaj konta':'accountType',
 'bank':'bank','sort by':'sort','sortowanie':'sort','show only':'showOnly','pokaż tylko':'showOnly',
 'age':'age','wiek':'age','provider type':'providerType','wyróżnione':'featured'
 };if(map[raw])el.textContent=t(map[raw]);});
 document.querySelectorAll('.cat-btn[data-cat]').forEach(function(el){el.textContent=t(el.dataset.cat);});
 document.querySelectorAll('.monthly-tab').forEach(function(el){
   if(!el.querySelector('small'))return;
   var small=el.querySelector('small');el.firstChild.textContent='\n'+t('monthTag')+'\n';small.textContent=t('monthSmall');
 });
 var toggle=document.querySelector('.provider-toggle');if(toggle){text(toggle.querySelector('span'),t('providerType'));toggle.querySelectorAll('.provider-btn').forEach(function(el){el.textContent=t(el.dataset.mode==='specialist'?'specialists':'bankGroups');});}
 var input=document.querySelector('#bank-search');if(input)input.placeholder=t('searchBank');
 var sort=document.querySelector('#ranking-sort');if(sort)sort.querySelectorAll('option').forEach(function(opt){var k={recommended:'sortName',bonus:'sortBonus',fee:'sortFee',name:'sortBank'}[opt.value];if(k)opt.textContent=t(k);});
 document.querySelectorAll('.filter-check').forEach(function(el){var id=el.querySelector('input')?.id;if(id)text(el.querySelector('span'),t(id==='promo-only'?'offerOnly':'freeOnly'));});
 var foot=document.querySelector('.filter-foot');if(foot){var count=foot.querySelector('#filter-count');if(count){foot.replaceChildren(count,document.createTextNode(' '+t('results')));}}
 text('.welcome-bonus-notice__copy strong',t('bonusStrong'));var copy=document.querySelector('.welcome-bonus-notice__copy');if(copy){var st=copy.querySelector('strong');if(st){copy.replaceChildren(st,document.createTextNode(' '+t('bonusRest')));}}
 var seo=document.querySelector('.country-seo-copy');if(seo){text(seo.querySelector('h2'),t('seoTitle'));var ps=seo.querySelectorAll('p');if(ps[0])ps[0].textContent=t('seoText');if(ps[1])ps[1].textContent=t('seoExtra');}
 if(monthly)text('.ranking-main .note',t('monthlyNotice'));
 var pickerHeading=document.querySelector('.ranking-lang-label');if(pickerHeading)pickerHeading.textContent=t('lang');
 var footerP=document.querySelector('.footer-row p');if(footerP){var op=footerP.querySelector('.footer-operator');footerP.replaceChildren(document.createTextNode(t('footerText')));if(op)footerP.append(document.createElement('br'),op);}
 var legal={ '/research/':'research','/about/':'about','/methodology/':'methodology','/services/':'services','/contact/':'contact','/terms/':'terms','/disclaimer/':'disclaimer','/privacy/':'privacy','/cookies/':'cookies'};
 document.querySelectorAll('.br-footer-legal a').forEach(function(a){var k=legal[new URL(a.getAttribute('href'),baseUrl).pathname];if(k)a.textContent=t(k);});
 // Remove the old country-specific page title only when a language is explicitly selected.
 if(queryLang&&LANGUAGES[queryLang]){document.title=title+' | BankRanking Europe';var descr=document.querySelector('meta[name="description"]');if(descr)descr.content=monthly?t('monthDesc'):t(group==='banking'?'descBank':group==='saving'?'descSave':'descInvest',{market:heroMarket});}
 text('.lang-menu .flag-wrap > span',LANGUAGES[lang]);
 var headerBrand=document.querySelector('.header .brand');if(headerBrand)headerBrand.href=({en:'/',pl:'/polski/',es:'/espanol/',it:'/italiano/'})[lang];
 var pickerSummary=document.querySelector('.lang-menu summary');if(pickerSummary)pickerSummary.setAttribute('aria-label',t('lang'));
 var img=document.querySelector('.lang-menu .flag-wrap img.site-flag');if(img){img.src='/assets/flags-v3/'+FLAGS[lang]+'.png';img.alt='';}
 document.querySelectorAll('[data-rank-language]').forEach(function(a){a.classList.toggle('current',a.dataset.rankLanguage===lang);if(a.dataset.rankLanguage===lang)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});
 var picker=document.querySelector('.lang-menu');if(picker){picker.addEventListener('toggle',function(){if(picker.open)changeLinks()});picker.addEventListener('click',function(e){var a=e.target.closest('[data-rank-language]');if(a){e.preventDefault();var u=new URL(location.href);u.searchParams.set('lang',a.dataset.rankLanguage);location.assign(u.pathname+u.search+u.hash);}})}
 changeLinks();
}
var API={lang,t,marketName,staticUI,changeLinks,languages:LANGUAGES,monthly};
window.RankingI18n=API;
staticUI();
})();