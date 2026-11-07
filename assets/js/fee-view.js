(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.BankRankingFees=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const finite=n=>typeof n==='number'&&Number.isFinite(n)&&n>=0;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safe=s=>{try{const u=new URL(s,'https://bankranking.eu');return /^https?:$/.test(u.protocol)?esc(s):'#'}catch{return '#'}};
function language(){return typeof window!=='undefined'&&window.RankingI18n?.lang||'en'}
const words={en:{account:'Account / month',card:'Card / month',annual:'Welcome reward',unknown:'Not verified',conditions:'Fee waivers',extras:'Other charges',scope:'Cost calculation',source:'Official sources',date:'Fees checked',show:'Fees & details ↓',hide:'Hide details ↑',cta:'View account',conditional:'Conditional',no:'No fee waiver needed.',annualNote:'12 standard months of account and the indicated card(s). Excludes issue, delivery, transactions, overdrafts, optional services and taxes. Bonuses are shown separately.',pending:'A current product tariff has not been verified for this entry. Ask the provider for its fee information document; the missing amount is not zero.',other:'Check ATM withdrawals, transfers, foreign exchange, account statements, overdrafts and optional cards.',invest:'Check custody/platform charges, dealing commissions, fund costs, currency conversion and transfer-out fees. Annual cost depends on assets, instruments and trading activity.',saving:'Check account maintenance, paid-account requirements, withdrawals, early termination and loss of interest. Deposit interest is not a deduction from fees.',choice:'Add to compare',product:'Product',bonus:'Promotion',opening:'Issue / delivery',year:'Annual maintenance',tax:'For Italy, stamp duty may be payable separately; see the product documents. It is not included in the maintenance figure.'},pl:{account:'Konto / miesiąc',card:'Karta / miesiąc',annual:'Utrzymanie / rok',unknown:'Brak potwierdzenia',conditions:'Warunki zwolnienia z opłat',extras:'Pozostałe koszty',scope:'Zakres obliczenia',source:'Źródła banku',date:'Sprawdzono opłaty',show:'Opłaty i szczegóły ↓',hide:'Ukryj szczegóły ↑',cta:'Sprawdź ofertę',conditional:'Warunkowo',no:'Bez warunków zwolnienia z opłat.',annualNote:'12 miesięcy prowadzenia konta i jednej wskazanej karty. Bez wydania, wysyłki, operacji, debetu, usług opcjonalnych i podatków. Premie pokazujemy osobno.',pending:'Nie potwierdzono aktualnej taryfy konkretnego produktu dla tego wpisu. Sprawdź dokument dotyczący opłat u dostawcy. Brak kwoty nie oznacza zera.',other:'Sprawdź bankomaty, przelewy, przewalutowanie, wyciągi, debet i dodatkowe karty.',invest:'Sprawdź opłaty za rachunek i przechowywanie aktywów, prowizje transakcyjne, koszty funduszy, przewalutowanie oraz przeniesienie aktywów. Koszt roczny zależy od portfela i liczby operacji.',saving:'Sprawdź prowadzenie rachunku, wymóg płatnego konta, wypłaty, zerwanie lokaty i utratę odsetek. Odsetek nie odejmujemy od opłat.',choice:'Dodaj do porównania',product:'Produkt',bonus:'Promocja',opening:'Wydanie / wysyłka',year:'Roczny koszt utrzymania',tax:''},es:{account:'Cuenta / mes',card:'Tarjeta / mes',annual:'Mantenimiento / año',unknown:'Sin dato verificado',conditions:'Condiciones para evitar comisiones',extras:'Otros costes',scope:'Qué incluye el cálculo',source:'Fuentes oficiales',date:'Comisiones comprobadas',show:'Costes y detalles ↓',hide:'Ocultar detalles ↑',cta:'Ver cuenta',conditional:'Con condiciones',no:'Sin condiciones para evitar comisiones.',annualNote:'12 meses de cuenta y una tarjeta indicada. No incluye emisión, envío, operaciones, descubiertos, servicios opcionales ni impuestos. Incentivos por separado.',pending:'No se ha verificado una tarifa actual de un producto concreto para esta entidad. Consulta el documento informativo de comisiones del proveedor. La ausencia de datos no significa 0 €.',other:'Comprueba cajeros, transferencias, cambio de divisa, extractos, descubiertos y tarjetas adicionales.',invest:'Comprueba custodia, plataforma, compraventa, gastos de fondos, divisas y traspasos. El coste anual depende de la cartera y de las operaciones.',saving:'Comprueba mantenimiento, cuenta vinculada, retiradas, cancelación anticipada y pérdida de intereses. No descontamos los intereses de las comisiones.',choice:'Añadir a comparar',product:'Producto',bonus:'Promoción',opening:'Emisión / envío',year:'Mantenimiento anual',tax:''}};

words.it={account:'Conto / mese',card:'Carta / mese',annual:'Bonus di benvenuto',unknown:'Dato non confermato',conditions:'Esenzioni dal canone',extras:'Altri costi',scope:'Calcolo dei costi',source:'Fonti ufficiali',date:'Costi verificati',show:'Costi e dettagli ↓',hide:'Nascondi i dettagli ↑',cta:'Apri il conto',conditional:'Con condizioni',no:'Nessuna esenzione necessaria.',annualNote:'12 mesi di canone del conto e della carta indicata. Non include emissione, consegna, operazioni, scoperto, servizi facoltativi e imposte. I bonus sono separati.',pending:'La tariffa aggiornata non è stata confermata per questo prodotto. Consulta il foglio informativo della banca. Un importo mancante non significa zero.',other:'Controlla i prelievi ATM, i bonifici, il cambio valuta, gli estratti conto, gli scoperti e le carte opzionali.',invest:'Verifica custodia, piattaforma, commissioni di negoziazione, costi dei fondi, cambio e trasferimenti.',saving:'Verifica il canone, i conti collegati, i prelievi, l’estinzione anticipata e gli interessi persi.',choice:'Aggiungi al confronto',product:'Prodotto',bonus:'Promozione',opening:'Emissione / consegna',year:'Costo di gestione annuo',tax:'In Italia l’imposta di bollo può essere dovuta separatamente e non è inclusa nei costi.',
 savingsCard:'Conto collegato',investCard:'Negoziazione e custodia',upTo:'Fino a ',cash:'in contanti',conditionsApply:'si applicano condizioni',cashReward:'Premio in denaro per la nuova apertura',catalogue:'Consulta il catalogo',methodology:'Metodologia',extraBenefit:'VANTAGGIO EXTRA',eligible:'Idoneità / età',residence:'Residenza',deadline:'Termine di adesione',bonusConditions:'Premio non monetario · condizioni',officialBonus:'Condizioni ufficiali del bonus',officialReward:'Condizioni ufficiali del premio',checked:'Verificato il',months:'mesi',yearWord:'anno',productChecked:'Prodotto verificato'};
Object.assign(words.en,{savingsCard:'Linked account',investCard:'Dealing and custody',upTo:'Up to ',cash:'cash',conditionsApply:'conditions apply',cashReward:'Cash welcome reward',catalogue:'View bank catalogue',methodology:'Methodology',extraBenefit:'EXTRA BENEFIT',eligible:'Eligibility / age',residence:'Residence',deadline:'Enrolment deadline',bonusConditions:'Non-cash reward · conditions',officialBonus:'Official cash-reward conditions',officialReward:'Official reward conditions',checked:'Checked',months:'months',yearWord:'year',productChecked:'Bank listing checked'});
Object.assign(words.pl,{annual:'Premia za otwarcie konta',savingsCard:'Konto powiązane',investCard:'Transakcje i przechowywanie',upTo:'Do ',cash:'gotówką',conditionsApply:'obowiązują warunki',cashReward:'Premia za otwarcie konta',catalogue:'Zobacz ofertę banku',methodology:'Metodologia',extraBenefit:'DODATKOWA KORZYŚĆ',eligible:'Dostępność / wiek',residence:'Rezydencja',deadline:'Termin przystąpienia',bonusConditions:'Nagroda niepieniężna · warunki',officialBonus:'Warunki oficjalnej premii',officialReward:'Warunki oficjalnej nagrody',checked:'Sprawdzono',months:'miesięcy',yearWord:'rok',productChecked:'Sprawdzono ofertę banku'});
Object.assign(words.es,{annual:'Bonificación de bienvenida',savingsCard:'Cuenta vinculada',investCard:'Operaciones y custodia',upTo:'Hasta ',cash:'en efectivo',conditionsApply:'se aplican condiciones',cashReward:'Bonificación en efectivo por apertura',catalogue:'Ver catálogo del banco',methodology:'Metodología',extraBenefit:'VENTAJA EXTRA',eligible:'Requisitos / edad',residence:'Residencia',deadline:'Plazo de contratación',bonusConditions:'Premio no monetario · condiciones',officialBonus:'Condiciones oficiales de la bonificación',officialReward:'Condiciones oficiales de la promoción',checked:'Comprobado',months:'meses',yearWord:'año',productChecked:'Banco verificado'});
const FIELD_LABELS={
 'Account / month':['Konto / miesiąc','Cuenta / mes','Conto / mese'],
 'Card / month':['Karta / miesiąc','Tarjeta / mes','Carta / mese'],
 'Account fees':['Opłaty za konto','Costes de la cuenta','Costi del conto'],
 'Business fees':['Opłaty firmowe','Costes de empresa','Costi aziendali'],
 'Deposit fees':['Opłaty depozytu','Comisiones del depósito','Costi del deposito'],
 'Maintenance':['Prowadzenie','Mantenimiento','Gestione'],
 'Maintenance / admin':['Prowadzenie / obsługa','Mantenimiento / gestión','Gestione / amministrazione'],
 'Opening / maintenance':['Otwarcie / prowadzenie','Apertura / mantenimiento','Apertura / gestione'],
 'Opening / management':['Otwarcie / prowadzenie','Apertura / gestión','Apertura / gestione'],
 'Opening / cancellation fee':['Otwarcie / zamknięcie','Apertura / cancelación','Apertura / chiusura'],
 'Opening':['Otwarcie','Apertura','Apertura'],
 'Minimum deposit':['Minimalny depozyt','Depósito mínimo','Deposito minimo'],
 'Minimum':['Minimum','Mínimo','Minimo'],
 'Minimum / fees':['Minimum / opłaty','Mínimo / costes','Minimo / costi'],
 'Deposit amount':['Kwota depozytu','Importe del depósito','Importo del deposito'],
 'Current campaign':['Bieżąca promocja','Promoción actual','Promozione attuale'],
 'Standard interest':['Standardowe oprocentowanie','Interés estándar','Interesse standard'],
 'Standard rate':['Standardowa stawka','Tipo estándar','Tasso standard'],
 'Term':['Okres','Plazo','Durata'],
 'Promo term':['Okres promocji','Duración de promoción','Durata della promozione'],
 'Age':['Wiek','Edad','Età'],
 'Package':['Pakiet','Paquete','Pacchetto'],
 'Savings product':['Produkt oszczędnościowy','Producto de ahorro','Prodotto di risparmio'],
 'Youth product':['Oferta młodzieżowa','Producto juvenil','Prodotto per giovani'],
 'Monthly service fee':['Opłata miesięczna','Cuota mensual','Canone mensile'],
 'Activation / monthly fee':['Aktywacja / miesięcznie','Activación / mes','Attivazione / mese'],
 'Base interest':['Oprocentowanie podstawowe','Interés básico','Interesse di base'],
 'Savings access':['Dostęp do oszczędności','Acceso al ahorro','Accesso al risparmio'],
 'Activation / closure':['Otwarcie / zamknięcie','Alta / cierre','Attivazione / chiusura'],
 'Monthly basic account':['Konto podstawowe / miesiąc','Cuenta básica / mes','Conto base / mese'],
 'Youth savings':['Oszczędności młodzieżowe','Ahorro juvenil','Risparmio giovani'],
 'Fees':['Opłaty','Comisiones','Costi'],
 'Interest rate':['Oprocentowanie','Tipo de interés','Tasso di interesse'],
 'Promotional interest':['Oprocentowanie promocyjne','Interés promocional','Interesse promozionale'],
 'Interest':['Odsetki','Interés','Interessi'],
 'Card maintenance':['Opłata za kartę','Coste de la tarjeta','Canone carta'],
 'Current yield':['Bieżące oprocentowanie','Rentabilidad actual','Rendimento attuale'],
 'Fixed interest':['Stałe oprocentowanie','Interés fijo','Interesse fisso'],
 'Availability':['Dostępność','Disponibilidad','Disponibilità'],
 'Current interest':['Bieżące oprocentowanie','Interés actual','Interesse attuale'],
 'Savings rate':['Oprocentowanie oszczędności','Interés de ahorro','Tasso di risparmio'],
 'Gross interest':['Oprocentowanie brutto','Interés bruto','Interesse lordo'],
 'Interest settlement':['Naliczanie odsetek','Liquidación de intereses','Liquidazione interessi'],
 'Current headline rate':['Oprocentowanie oferty','Tipo anunciado actual','Tasso pubblicizzato'],
 'Current standard rate':['Standardowe oprocentowanie','Tipo estándar actual','Tasso standard attuale'],
 'Advertised rate':['Oprocentowanie reklamowane','Tipo anunciado','Tasso pubblicizzato'],
 'Standard savings interest':['Standardowe oprocentowanie','Interés estándar del ahorro','Interesse standard risparmio'],
 'Child promotional rate':['Oprocentowanie dla dzieci','Interés promocional infantil','Tasso promozionale minori'],
 'Required product':['Wymagany produkt','Producto necesario','Prodotto necessario'],
 'Supersmart option':['Opcja Supersmart','Opción Supersmart','Opzione Supersmart'],
 'Intro interest':['Oprocentowanie na start','Interés inicial','Interesse iniziale'],
 'Early redemption':['Wcześniejsza wypłata','Retirada anticipada','Rimborso anticipato'],
 '6-month gross rate':['Stopa brutto na 6 miesięcy','Tipo bruto a 6 meses','Tasso lordo a 6 mesi'],
 'Current gross yield':['Bieżące oprocentowanie brutto','Rentabilidad bruta actual','Rendimento lordo attuale'],
 'Savings add-on':['Dodatkowe oszczędności','Ahorro adicional','Risparmio aggiuntivo'],
 'Promotional yield':['Oprocentowanie promocyjne','Rentabilidad promocional','Rendimento promozionale'],
 'Savings interest':['Oprocentowanie oszczędności','Interés del ahorro','Interesse risparmio'],
 'New-client rate':['Oprocentowanie dla nowych','Tipo para nuevos clientes','Tasso nuovi clienti'],
 'Welcome deposit':['Lokata powitalna','Depósito bienvenida','Deposito di benvenuto'],
 'Current deposit rate':['Oprocentowanie depozytu','Tipo actual del depósito','Tasso attuale deposito'],
 'Annual cost':['Koszt roczny','Coste anual','Costo annuo'],
 'Verification':['Weryfikacja','Verificación','Verifica'],
 'Source check':['Kontrola źródła','Consulta de fuentes','Controllo delle fonti'],
 'Known line fees':['Znane opłaty','Costes conocidos','Costi noti'],
 'Annual account fee':['Opłata roczna za konto','Cuota anual de cuenta','Canone annuo conto']
};
function label(s){const L=language();return L==='en'||!FIELD_LABELS[s]?s:FIELD_LABELS[s][{pl:0,es:1,it:2}[L]]||s}
const FIELD_VALUES={
 'Product-specific':['Zależnie od produktu','Según el producto','In base al prodotto'],
 'Business product tariff':['Taryfa produktu firmowego','Tarifa empresarial','Tariffa aziendale'],
 'Joint product tariff':['Taryfa konta wspólnego','Tarifa de cuenta conjunta','Tariffa del conto cointestato'],
 'Local bank tariff':['Taryfa banku','Tarifa del banco','Tariffa della banca'],
 'Not available for this product':['Niedostępne dla tego produktu','No disponible para este producto','Non disponibile per questo prodotto'],
 'Depends on local tariff':['Zależy od taryfy banku','Depende de la tarifa','Dipende dalla tariffa'],
 'Current official terms':['Aktualne warunki banku','Condiciones bancarias actuales','Condizioni bancarie attuali'],
 'Current deposit range':['Aktualna oferta lokat','Oferta actual de depósitos','Gamma attuale di depositi'],
 'Current ING term deposits':['Aktualne lokaty ING','Depósitos a plazo ING actuales','Depositi a termine ING attuali'],
 'Current official tariff':['Aktualna taryfa banku','Tarifa bancaria actual','Tariffa bancaria attuale'],
 '€0 with digital profile':['€0 z profilem cyfrowym','€0 con perfil digital','€0 con profilo digitale'],
 'PLN 0 with conditions':['0 zł po spełnieniu warunków','0 PLN con condiciones','0 PLN a determinate condizioni'],
 '€0 for 24 months':['€0 przez 24 miesiące','€0 durante 24 meses','€0 per 24 mesi'],
 '€0 virtual':['Wirtualna karta €0','Tarjeta virtual €0','Carta virtuale €0'],
 '0 zł with conditions':['0 zł po spełnieniu warunków','0 PLN con condiciones','0 PLN a condizioni'],
 'Product terms · 2026-11-07':['Warunki produktu · 2026-11-07','Condiciones del producto · 2026-11-07','Condizioni del prodotto · 2026-11-07'],
 'Bank account / month':['Konto / miesiąc','Cuenta / mes','Conto / mese'],
 'No maintenance fee or salary requirement.':['Bez opłaty za prowadzenie i wymogu wpływu wynagrodzenia.','Sin comisión de mantenimiento ni requisito de nómina.','Senza canone né obbligo di accredito dello stipendio.'],
 'No recurring account fee; first MyOne debit card included.':['Bez cyklicznej opłaty za konto; pierwsza karta debetowa MyOne w cenie.','Sin cuota recurrente; primera tarjeta de débito MyOne incluida.','Nessun canone ricorrente; prima carta di debito MyOne inclusa.'],
 'See the official catalogue and fee information of the selected product.':['Sprawdź oficjalny katalog i taryfę wybranego produktu.','Consulta el catálogo oficial y las tarifas del producto seleccionado.','Consulta il catalogo ufficiale e i costi del prodotto scelto.'],
 'For precise charges and deposit conditions, consult the official product sheet linked in the sources.':['Szczegółowe opłaty i warunki depozytu sprawdź w oficjalnej karcie produktu.','Consulta la ficha oficial del producto para conocer comisiones y condiciones del depósito.','Per costi e condizioni del deposito, consulta il documento ufficiale del prodotto.'],
 'See the official product page and tariff for transaction-specific charges, tax and early-withdrawal rules.':['Opłaty transakcyjne, podatki i wcześniejszą wypłatę sprawdź w taryfie banku.','Consulta los costes de operación, impuestos y retirada anticipada en la tarifa oficial.','Consulta i costi di transazione, le imposte e il ritiro anticipato nelle condizioni ufficiali.'],
 'Select the actual business product and card before comparing fees.':['Wybierz konkretny produkt firmowy i kartę do porównania opłat.','Elige el producto empresarial y la tarjeta antes de comparar los costes.','Seleziona il prodotto aziendale e la carta prima di confrontare i costi.'],
 'Select the actual joint product and card before comparing fees.':['Wybierz konkretne konto wspólne i kartę do porównania opłat.','Elige la cuenta conjunta y la tarjeta antes de comparar los costes.','Seleziona il conto cointestato e la carta prima di confrontare i costi.'],
 'One standard debit card unless stated otherwise.':['Jedna standardowa karta debetowa, chyba że zaznaczono inaczej.','Una tarjeta de débito estándar salvo que se indique lo contrario.','Una carta di debito standard salvo diversa indicazione.'],
 'The interest rate depends on the particular product and its current terms. No unconfirmed rate is presented as 0%.':['Oprocentowanie zależy od wybranego produktu i aktualnych warunków. Niepotwierdzona stawka nie jest przedstawiana jako 0%.','El interés depende del producto y sus condiciones actuales. Una tasa no confirmada no aparece como 0 %.','Il tasso dipende dal prodotto e dalle condizioni attuali. Un tasso non verificato non viene indicato come 0%.']
};
function value(s){const L=language();return L==='en'||!FIELD_VALUES[s]?s:FIELD_VALUES[s][{pl:0,es:1,it:2}[L]]||s}
function money(n,m,c){return finite(n)?new Intl.NumberFormat(({pl:'pl-PL',es:'es-ES',it:'it-IT',en:'en-IE'})[language()]||'en-IE',{style:'currency',currency:c|| (m==='pl'?'PLN':'EUR'),minimumFractionDigits:Number.isInteger(n)?0:2,maximumFractionDigits:2}).format(n):words[language(m)].unknown}
function range(min,max,m,c){if(!finite(min))return words[language(m)].unknown;return finite(max)&&max!==min?money(min,m,c)+' / '+money(max,m,c):money(min,m,c)+(max===null?'*':'')}
function annual(x){const c=x.costs||{};return [c.accountStandard,c.cardStandard,c.cardAnnual].every(finite)?Math.round((12*(c.accountStandard+c.cardStandard)+c.cardAnnual)*100)/100:null}
function minimum(x){const c=x.costs||{};return [c.accountMin,c.cardMin,(c.cardAnnualMin??c.cardAnnual)].every(finite)?Math.round((12*(c.accountMin+c.cardMin)+(c.cardAnnualMin??c.cardAnnual))*100)/100:null}
function activeBonus(x,today){return finite(x.bonusAmount)&&x.bonusAmount>0&&(x.bonusExpiresAt||x.bonusReviewAfter)>=today&&(!x.bonusStartsAt||x.bonusStartsAt<=today)?x.bonusAmount:0}
function labels(m,g){const w=words[language()]||words.en;if(g==='saving')return {...w,card:w.savingsCard};if(g==='investing')return {...w,card:w.investCard};return w;}
function activeOffer(x,today){const s=x.specialOffer;return s&&s.checkedAt&&s.checkedAt<=today&&(s.expiresAt||s.reviewAfter)>=today&&(!s.startsAt||s.startsAt<=today)?s:null}
function reward(x,m,today){const cash=activeBonus(x,today),w=words[language()]||words.en;return cash?{value:w.upTo+money(cash,m),hint:w.cash+' · '+w.conditionsApply}:{value:m==='pl'?'0 zł':money(0,m),hint:w.cashReward};}
function accountText(x,m){const c=x.costs||{};return c.accountText||range(c.accountMin,c.accountStandard,m,c.currency)}
function cardText(x,m){const c=x.costs||{};return c.cardText||range(c.cardMin,c.cardStandard,m,c.currency)+(finite(c.cardAnnual)&&c.cardAnnual>0?' + '+money(c.cardAnnual,m,c.currency)+' / year':'')}
function yearText(x,m){return x.costs?.annualText||range(minimum(x),annual(x),m,x.costs?.currency)}
function facts(x,m,g,today){const w=labels(m,g),c=x.costs||{},unknown=w.pending;return [[label(c.accountLabel||w.account),value(accountText(x,m))],[label(c.cardLabel||w.card),value(c.cardText)||range(c.cardMin,c.cardStandard,m,c.currency)+(finite(c.cardAnnual)&&c.cardAnnual>0?' + '+money(c.cardAnnual,m,c.currency)+' / '+'year':'')],[w.conditions,value(c.conditions||unknown)],[w.card+' · '+w.product,value(c.cardScope||w.other)],[label(c.yearLabel||w.year),value(yearText(x,m))+(c.conditional?' · '+w.conditional:'')],[w.opening,value(x.cardFeeText)|| (finite(x.openingCardFee)?money(x.openingCardFee,m,c.currency):w.unknown)],[w.extras,value(c.extras||(g==='investing'?w.invest:g==='saving'?w.saving:w.other))],[w.scope,w.annualNote+(c.annualNote?' '+c.annualNote:'')+(m==='it'?' '+w.tax:'')],...(x.eligibilityText?[[w.eligible,value(x.eligibilityText)]]:[]),...(x.residencyText?[[w.residence,value(x.residencyText)]]:[]),...(activeBonus(x,today)?[[w.bonus,x.bonusText+(x.bonusExpiresAt?' '+w.deadline+': '+x.bonusExpiresAt+'.':' '+w.checked+': '+x.bonusCheckedAt+'.')]]:[]),...(activeOffer(x,today)?[[w.bonusConditions,activeOffer(x,today).description+(activeOffer(x,today).expiresAt?' '+w.deadline+': '+activeOffer(x,today).expiresAt+'.':' While stocks last. Last checked: '+activeOffer(x,today).checkedAt+'.')]]:[]),[x.directoryOnly?w.productChecked:w.date,x.directoryOnly?x.verifiedAt:c.checkedAt||w.unknown]];}
function card(x,m,g,today,index,selected){const w=labels(m,g),c=x.costs||{},id='fee-'+index,s=activeOffer(x,today),r=reward(x,m,today);let sources=x.sourceUrls||[{label:w.source,url:x.tariffUrl||x.source||x.providerUrl||'https://'+x.domain}];
if(activeBonus(x,today)&&x.bonusSource&&!sources.some(z=>z.url===x.bonusSource))sources=[...sources,{label:w.officialBonus,url:x.bonusSource}];if(s&&!sources.some(z=>z.url===s.url))sources=[...sources,{label:w.officialReward,url:s.url}];const logo=x.logo||x.logoFallback;const provider='<div class="provider-cell">'+(logo?'<img class="provider-logo'+(x.logoDark?' logo-dark':'')+'" src="'+safe(logo)+'" alt="'+esc(x.provider)+'">':'<span class="provider-logo provider-initials" aria-hidden="true">'+esc(x.provider.split(/\s+/).map(s=>s[0]).join('').slice(0,3))+'</span>')+'<div class="provider-copy"><strong>'+esc(x.provider)+'</strong><small>'+esc(x.product)+'</small>'+'</div></div>';
const metric=(k,v,n)=>'<div class="metric-card"><label>'+esc(k)+'</label><strong>'+esc(v)+'</strong>'+(n?'<small class="fee-hint">'+esc(n)+'</small>':'')+'</div>';
const badge=s?'<a class="reward-plaque" href="'+safe(s.url)+'" target="_blank" rel="noopener noreferrer" aria-label="'+esc(s.title+' — official reward conditions')+'"><span class="reward-plaque-icon" aria-hidden="true">✦</span><span><small>EXTRA BENEFIT</small><strong>'+esc(s.title)+'</strong></span><span aria-hidden="true">↗</span></a>':'';return '<article class="rank-row'+(s?' has-special-offer':'')+(x.directoryOnly?' directory-entry':'')+'" data-account="'+esc(x.id||x.provider)+'">'+badge+provider+(x.categoryNote?'<p class="category-availability">'+esc(x.categoryNote)+'</p>':'')+'<div class="card-metrics">'+metric(label(c.accountLabel||w.account),value(accountText(x,m)))+metric(label(c.cardLabel||w.card),value(cardText(x,m)),value(c.cardHint||c.cardScope||''))+metric(w.annual,r.value,r.hint)+'</div><div class="rank-cta"><a href="'+safe(x.affiliateUrl||(activeBonus(x,today)&&x.bonusSource)||x.providerUrl||'https://'+x.domain)+'" target="_blank" rel="'+(x.affiliateUrl?'sponsored nofollow ':'')+'noopener noreferrer">'+(x.directoryOnly?w.catalogue:w.cta)+' ↗</a><button class="analysis-toggle" data-analysis-toggle type="button" aria-expanded="false" aria-controls="'+id+'">'+w.show+'</button><label class="fee-compare"><input type="checkbox" data-cost-compare="'+index+'" '+(selected?'checked':'')+'> '+w.choice+'</label></div><div class="rank-analysis-panel" id="'+id+'" hidden><div class="analysis-intro"><div><span class="analysis-eyebrow">'+esc(label(c.yearLabel||w.year))+'</span><h3>'+esc(value(yearText(x,m)))+'</h3></div><p>'+esc(value(c.conditions||w.pending))+'</p></div><div class="analysis-grid">'+facts(x,m,g,today).map(([k,v])=>'<section><span class="analysis-label">'+esc(k)+'</span><p>'+esc(v)+'</p></section>').join('')+'</div>'+(x.caveats?.length?'<ul class="fee-caveats">'+x.caveats.map(v=>'<li>'+esc(v)+'</li>').join('')+'</ul>':'')+'<div class="analysis-evidence"><span class="analysis-label">'+w.source+'</span><div class="analysis-links">'+sources.map(s=>'<a target="_blank" rel="noopener noreferrer" href="'+safe(s.url)+'">'+esc(s.label)+' ↗</a>').join('')+'<a href="/methodology/">'+w.methodology+' ↗</a></div></div></div></article>'}
return {esc,safe,money,range,annual,minimum,activeBonus,activeOffer,reward,facts,card,words,language,label,value};});
