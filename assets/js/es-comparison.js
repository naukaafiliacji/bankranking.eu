(() => {
  'use strict';
  const core=window.BankRankingComparison,view=window.BankRankingESRender,data=window.BANKRANKING_MULTI;
  const list=document.getElementById('account-list');
  if(!core||!view||!data||!list)return;
  const group=document.body.dataset.group||'banking';
  const categories={personal:'Cuentas personales',business:'Cuentas de empresa',joint:'Cuentas conjuntas',student:'Cuentas para estudiantes',youth:'Cuentas para jóvenes',child:'Cuentas para menores',savings:'Cuentas de ahorro',deposits:'Depósitos a plazo',business_savings:'Ahorro empresarial',child_savings:'Ahorro para menores',investment:'Cuentas de inversión',funds:'Fondos',managed:'Gestión de inversiones',self_directed:'Inversión por cuenta propia',retirement:'Jubilación',business_investing:'Inversión empresarial'};
  const allowed={banking:['personal','business','joint','student','youth','child'],saving:['savings','deposits','business_savings','child_savings'],investing:['investment','funds','managed','self_directed','retirement','business_investing']}[group];
  const params=new URLSearchParams(location.search);
  const category=allowed.includes(params.get('cat'))?params.get('cat'):allowed[0];
  const personal=group==='banking'&&category==='personal';
  const accounts=data.markets.es.rankings.personal||[];
  const selected=new Set();
  const byId=new Map(accounts.map(a=>[a.id,a]));
  const input=id=>document.getElementById(id);
  const status=input('comparison-status'),tray=input('compare-tray'),section=input('comparison-section'),table=input('comparison-table');
  const filterPanel=input('filter-panel');
  const resultCount=input('result-count');
  document.querySelectorAll('.js-only').forEach(el=>el.hidden=false);
  document.querySelectorAll('[data-category]').forEach(a=>{const active=a.dataset.category===category;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  function getState(){return {query:input('bank-search')?.value||'',sort:input('ranking-sort')?.value||'name',freeOnly:!!input('free-only')?.checked,promoOnly:!!input('promo-only')?.checked,payroll:input('payroll-filter')?.value||'all',age:Number(input('customer-age')?.value)||null};}
  function selectedAccounts(){return [...selected].map(id=>byId.get(id)).filter(Boolean);}
  function updateSelection(){
    const a=selectedAccounts();
    if(tray)tray.hidden=!a.length;
    if(input('selected-count'))input('selected-count').textContent=a.length+' de 3 cuentas seleccionadas'+(a.length<2?' · elige al menos dos':'');
    if(input('show-comparison'))input('show-comparison').disabled=a.length<2;
    if(section&&!section.hidden){if(a.length<2)section.hidden=true;else table.innerHTML=view.comparison(a,core.todayMadrid());}
  }
  function render(){
    if(!personal)return;
    const rows=core.filterAccounts(accounts,getState(),core.todayMadrid());
    resultCount.textContent=rows.length+' '+(rows.length===1?'cuenta':'cuentas');
    list.innerHTML=rows.length?rows.map(a=>view.card(a,core.todayMadrid(),selected,true)).join(''):'<div class="no-results"><h3>No hay cuentas que coincidan con estos filtros.</h3><p>Prueba a cambiar la búsqueda o restablecer los filtros.</p><button type="button" class="secondary-button" data-reset>Restablecer filtros</button></div>';
    updateSelection();
  }
  function reset(){if(input('comparison-filters'))input('comparison-filters').reset();render();if(status)status.textContent='Filtros restablecidos.';}
  if(personal){
    filterPanel.hidden=false;
    input('comparison-filters')?.addEventListener('submit',e=>e.preventDefault());
    for(const id of ['bank-search','ranking-sort','free-only','promo-only','payroll-filter','customer-age'])input(id)?.addEventListener(id==='bank-search'||id==='customer-age'?'input':'change',render);
    input('reset-filters')?.addEventListener('click',reset);
    list.addEventListener('change',e=>{
      const checkbox=e.target.closest('[data-compare]');if(!checkbox)return;
      if(checkbox.checked&&selected.size>=3){checkbox.checked=false;if(status)status.textContent='Puedes comparar un máximo de tres cuentas. Quita una para añadir otra.';return;}
      checkbox.checked?selected.add(checkbox.dataset.compare):selected.delete(checkbox.dataset.compare);
      if(status)status.textContent=selected.size+' cuentas seleccionadas.';
      updateSelection();
    });
    list.addEventListener('click',e=>{if(e.target.closest('[data-reset]'))reset();});
    input('show-comparison')?.addEventListener('click',()=>{if(selected.size<2)return;table.innerHTML=view.comparison(selectedAccounts(),core.todayMadrid());section.hidden=false;section.focus({preventScroll:true});section.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});});
    input('clear-comparison')?.addEventListener('click',()=>{selected.clear();section.hidden=true;render();if(status)status.textContent='Selección borrada.';});
    table?.addEventListener('click',e=>{const button=e.target.closest('[data-remove]');if(!button)return;selected.delete(button.dataset.remove);render();if(section&&!section.hidden)section.focus({preventScroll:true});else input('show-comparison')?.focus();});
    input('close-comparison')?.addEventListener('click',()=>{section.hidden=true;input('show-comparison')?.focus();});
    render();
    let lastDay=core.todayMadrid();
    setInterval(()=>{const day=core.todayMadrid();if(day!==lastDay){lastDay=day;render();}},60000);
  }else{
    if(filterPanel)filterPanel.hidden=true;
    if(tray)tray.hidden=true;
    const dataCategory=data.markets.es.rankings[category];
    const rows=Array.isArray(dataCategory)?dataCategory:[...(dataCategory?.bank||[]),...(dataCategory?.specialist||[])];
    const unique=[...new Map(rows.map(row=>[row.provider,row])).values()];
    const title=input('results-title');if(title)title.textContent=categories[category]+' · directorio de referencia';
    const heroTitle=document.querySelector('h1');if(heroTitle)heroTitle.textContent=categories[category]+' en España: directorio de referencia.';
    resultCount.textContent=unique.length+' entidades · referencia histórica, no comparación de tarifas vigentes';
    list.className='directory-grid';
    list.innerHTML=unique.map(x=>'<article class="directory-card"><h3>'+view.esc(x.provider)+'</h3><p>Entidad incluida en el directorio de '+view.esc(categories[category].toLowerCase())+'. Comprueba en su web el producto disponible, los requisitos y las tarifas actuales.</p><a href="'+view.safeUrl(x.providerUrl||'https://'+x.domain)+'" target="_blank" rel="noopener noreferrer">Consultar proveedor ↗</a></article>').join('');
    const existingNote=document.querySelector('.directory-note');const note=existingNote||document.createElement('div');note.className='directory-note';note.innerHTML='<strong>Alcance de este directorio.</strong> Referencia recopilada el 13 de agosto de 2026. No se ha revalidado como una comparación de productos y precios actuales. La inclusión no garantiza disponibilidad ni supone una recomendación. <a href="/es/banking/">Consulta la comparación de cuentas personales con fuentes y fechas por producto.</a>';if(!existingNote)list.before(note);
  }
})();
