(function(root,factory){
  'use strict';
  if(typeof module==='object'&&module.exports)module.exports=factory(require('./comparison-core.js'));
  else root.BankRankingESRender=factory(root.BankRankingComparison);
})(typeof globalThis!=='undefined'?globalThis:this,function(core){
  'use strict';
  const esc = value => String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money = value => core.finite(value)?new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',minimumFractionDigits:0,maximumFractionDigits:2}).format(value):'Sin dato verificado';
  const date = value => /^\d{4}-\d{2}-\d{2}$/.test(value||'')?new Intl.DateTimeFormat('es-ES',{timeZone:'UTC',day:'numeric',month:'long',year:'numeric'}).format(new Date(value+'T12:00:00Z')):'Fecha no disponible';
  function safeUrl(value){try{const u=new URL(value,'https://bankranking.eu');return ['https:','http:'].includes(u.protocol)?esc(value):'#';}catch{return '#';}}
  function feeText(x){return core.finite(x.monthlyFee)?money(x.monthlyFee)+(x.feeWaiverRequired?' con condiciones':' al mes'):'Consultar tarifa';}
  function bonusText(x,today){
    const active=core.activeBonus(x,today);
    if(active)return 'Hasta '+money(active)+(x.bonusGross?' brutos':'')+' · beneficio condicionado';
    if(x.bonusExpiresAt&&x.bonusExpiresAt<today)return 'La promoción registrada finalizó el '+date(x.bonusExpiresAt)+'. Consulta las ofertas actuales del banco.';
    return 'Sin incentivo de bienvenida cuantificado en esta comparación.';
  }
  function facts(x,today){return [
    ['Mantenimiento de la cuenta',feeText(x)],
    ['Condiciones para evitar comisiones',x.feeWaiverText||'Consultar al proveedor.'],
    ['Tarjeta incluida y opciones',x.cardFeeText||x.cardScope||'Consultar las condiciones de la tarjeta.'],
    ['Emisión o envío documentados',core.finite(x.openingCardFee)?(x.openingCardFee===0?'Emisión de la tarjeta incluida: 0 €. Comprueba las condiciones de envíos y servicios adicionales.':money(x.openingCardFee)+(x.openingCardFeeRequired===false?' · tarjeta física opcional; no incluida en el coste de mantenimiento':' · consultar alcance y condiciones')):'Importe no verificado; consulta la tarifa.'],
    ['Nómina',x.payrollRequired===false?'No obligatoria para el mantenimiento descrito. Puede ser necesaria para una promoción.':x.payrollRequired===true?'Obligatoria'+(core.finite(x.payrollMinimum)?' desde '+money(x.payrollMinimum)+' al mes':'')+'.': 'Requisitos no verificados.'],
    ['Edad y contratación',x.eligibilityText||'Consulta los requisitos del proveedor.'],
    ['Residencia y documentación',x.residencyText||'Consulta los requisitos de residencia y documentación.'],
    ['Cajeros',x.atmText||'No se ha verificado una tarifa detallada de cajeros.'],
    ['Transferencias',x.transfersText||'Consulta la tarifa por tipo de transferencia.'],
    ['Divisas',x.fxText||'Consulta los tipos y posibles comisiones de cambio.'],
    ['Incentivo / promoción',core.activeBonus(x,today)?(x.bonusText||bonusText(x,today)):bonusText(x,today)],
    ['Vigencia de la promoción',core.activeBonus(x,today)?(x.bonusExpiresAt?'Hasta el '+date(x.bonusExpiresAt)+', según las bases enlazadas.':'Consultar la vigencia en las bases del proveedor.'):'No se presenta una promoción cuantificada activa.']
  ];}
  function sources(x){return (x.sourceUrls||[]).map(s=>'<a href="'+safeUrl(s.url)+'" target="_blank" rel="noopener noreferrer">'+esc(s.label)+' ↗</a>').join('');}
  function card(x,today,selected,interactive){
    const annual=core.annualMaintenance(x),bonus=core.activeBonus(x,today);
    const href=x.affiliateUrl||x.providerUrl;
    const logo=x.logo?'<img src="'+safeUrl(x.logo)+'" width="128" height="42" alt="Logo de '+esc(x.provider)+'" loading="lazy">':'<span class="provider-monogram" aria-hidden="true">'+esc(x.provider.split(/\s+/).map(s=>s[0]).join('').slice(0,2))+'</span>';
    const cardAnnual=core.finite(x.monthlyCardFee)&&core.finite(x.annualCardFee)?12*x.monthlyCardFee+x.annualCardFee:null;
    const cardNote=x.display?.cardSummary||x.cardScope||'Consulta la tarjeta incluida.';
    const expired=!!(x.bonusExpiresAt&&x.bonusExpiresAt<today);
    const status=x.feeWaiverRequired===false&&x.payrollRequired===false?'Mantenimiento sin nómina':x.payrollRequired===true?'Nómina obligatoria':'Consulta los requisitos';
    const arrow='<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4 10h11M10 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    return `<article class="account-card" id="cuenta-${esc(x.id)}" data-account="${esc(x.id)}">
      <header class="account-card-head"><div class="provider"><div class="provider-logo-wrap">${logo}</div><div class="provider-copy"><h3>${esc(x.provider)}</h3><p class="product-name">${esc(x.product)}</p></div></div><span class="account-status">${esc(status)}</span></header>
      <div class="account-overview"><div class="account-metrics">
        <div class="account-metric"><span class="metric-label">Cuenta / mes</span><strong class="price">${core.finite(x.monthlyFee)?esc(money(x.monthlyFee)):'Consultar'}</strong><p class="metric-note">${x.feeWaiverRequired?'Sujeto a condiciones.':'Mantenimiento de la cuenta.'}</p></div>
        <div class="account-metric"><span class="metric-label">Tarjeta incluida / año</span><strong class="price">${cardAnnual===null?'Consultar':esc(money(cardAnnual))}</strong><p class="metric-note">${esc(cardNote)}</p></div>
        <div class="account-metric"><span class="metric-label">Retiradas de efectivo</span><strong class="price price-atm">${esc(x.display?.atmHeadline||'Consultar')}</strong><p class="metric-note">${esc(x.display?.atmSummary||'Consulta las redes, límites y comisiones.')}</p></div>
        <div class="account-metric account-metric-bonus"><span class="metric-label">Incentivo de bienvenida</span><strong class="price ${bonus?'price-bonus':'price-empty'}">${bonus?'Hasta '+esc(money(bonus)):expired?'Finalizado':'—'}</strong><p class="metric-note">${bonus?(x.bonusGross?'Importe bruto. ':'')+'Sujeto a requisitos y plazo.':expired?'La promoción registrada ha terminado.':'Sin incentivo general cuantificado.'}</p></div>
      </div><div class="card-actions"><a class="primary-button" href="${safeUrl(href)}" target="_blank" rel="${x.affiliateUrl?'sponsored nofollow noopener noreferrer':'noopener noreferrer'}"><span>Ver cuenta</span>${arrow}</a>${interactive?'<label class="compare-choice"><input type="checkbox" data-compare="'+esc(x.id)+'" '+(selected&&selected.has(x.id)?'checked':'')+' aria-label="Comparar '+esc(x.provider)+' '+esc(x.product)+'">Añadir a comparar</label>':''}</div></div>
      <div class="account-benefits"><span class="account-use">${esc(x.bestFor||'Cuenta personal')}</span><span class="annual-cost">Mantenimiento a 12 meses: <strong>${annual===null?'consultar':esc(money(annual))}</strong></span></div>
      <details class="account-details" id="detalles-${esc(x.id)}"><summary>Costes, requisitos y fuentes de ${esc(x.provider)}</summary><div class="detail-content"><dl class="fact-grid">${facts(x,today).map(([k,v])=>'<div><dt>'+esc(k)+'</dt><dd>'+esc(v)+'</dd></div>').join('')}</dl>${x.caveats?.length?'<ul class="caveats">'+x.caveats.map(v=>'<li>'+esc(v)+'</li>').join('')+'</ul>':''}<div class="source-links">${sources(x)}</div></div></details>
      <div class="account-foot"><span>Datos comprobados: <time datetime="${esc(x.verifiedAt)}">${esc(date(x.verifiedAt))}</time></span><span>Cuenta y tarjeta incluida; emisión, envío y operaciones aparte.</span></div>
    </article>`;
  }
  function comparison(accounts,today){
    const fields=[['Mantenimiento de cuenta / mes',a=>feeText(a)],['Mantenimiento / año',a=>{const n=core.annualMaintenance(a);return n===null?'No calculado: faltan datos o depende de condiciones.':money(n)+' · sin emisión, envío ni operaciones';}],['Tarjeta',a=>a.cardFeeText||a.cardScope],['Condiciones de bonificación',a=>a.feeWaiverText],['Nómina',a=>a.payrollRequired===false?'No obligatoria para el mantenimiento':a.payrollRequired===true?'Obligatoria'+(core.finite(a.payrollMinimum)?' desde '+money(a.payrollMinimum):''):'Consultar'],['Cajeros',a=>a.atmText],['Transferencias',a=>a.transfersText],['Residencia y documentación',a=>a.residencyText],['Incentivo',a=>bonusText(a,today)],['Condiciones del incentivo',a=>core.activeBonus(a,today)?a.bonusText:'Consulta las ofertas actuales del proveedor.'],['Datos verificados',a=>date(a.verifiedAt)]];
    return `<p class="scroll-hint">Desliza la tabla horizontalmente para ver todas las cuentas.</p><div class="table-wrap" tabindex="0" role="region" aria-label="Tabla comparativa de cuentas"><table><caption>Comparación de ${accounts.length} cuentas. La emisión y el envío de tarjetas y las operaciones adicionales se muestran por separado.</caption><thead><tr><th scope="col">Qué comparar</th>${accounts.map(a=>'<th scope="col"><span class="table-provider">'+esc(a.provider)+'</span>'+esc(a.product)+'<br><button class="text-button" data-remove="'+esc(a.id)+'" aria-label="Quitar '+esc(a.provider)+' de la comparación">Quitar</button></th>').join('')}</tr></thead><tbody>${fields.map(([label,get])=>'<tr><th scope="row">'+esc(label)+'</th>'+accounts.map(a=>'<td>'+esc(get(a)||'Sin dato verificado')+'</td>').join('')+'</tr>').join('')}<tr><th scope="row">Fuente y contratación</th>${accounts.map(a=>'<td><a href="'+safeUrl(a.affiliateUrl||a.providerUrl)+'" target="_blank" rel="'+(a.affiliateUrl?'sponsored nofollow ':'')+'noopener noreferrer">Ver cuenta ↗</a><br><a href="'+safeUrl(a.tariffUrl||a.providerUrl)+'" target="_blank" rel="noopener noreferrer">Condiciones oficiales ↗</a></td>').join('')}</tr></tbody></table></div>`;
  }
  return {esc,money,date,safeUrl,card,comparison,bonusText};
});
