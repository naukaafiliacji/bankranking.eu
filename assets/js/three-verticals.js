(function(){
'use strict';
const D=window.BANKRANKING_MULTI,F=window.BankRankingFees,b=document.body,m=b.dataset.market,g=b.dataset.group,list=document.getElementById('rank-list');if(!D?.markets?.[m]||!F||!list)return;
const I=window.RankingI18n,w=F.words[F.language(m)],categories=D.categories,ranking=D.markets[m].rankings;const tr=(key,vars)=>I?.t(key,vars)||key;
const allowed=JSON.parse(b.dataset.categories),params=new URLSearchParams(location.search);let cat=allowed.includes(params.get('cat'))?params.get('cat'):(params.get('cat')==='child'&&allowed.includes('youth')?'youth':allowed[0]),mode='bank',visible=[],selected=new Map();
const get=id=>document.getElementById(id),search=get('bank-search'),sort=get('ranking-sort'),free=get('free-only'),promo=get('promo-only');
if(get('age-filter'))get('age-filter').hidden=true;
let age=null,payroll=null;
if(g==='banking'){
 const block=document.createElement('div');block.className='filter-section';block.innerHTML='<label class="filter-label" for="fee-age">'+tr('ageOptional')+'</label><input id="fee-age" type="number" min="0" max="110" placeholder="'+tr('any')+'"><label class="filter-label" for="fee-payroll">'+tr('salary')+'</label><select id="fee-payroll"><option value="all">'+tr('salaryAny')+'</option><option value="no">'+tr('salaryNo')+'</option><option value="yes">'+tr('salaryYes')+'</option></select><small>'+tr('ageHelp')+'</small>';
 get('ranking-sort').closest('.filter-section').after(block);age=get('fee-age');payroll=get('fee-payroll');
}
if(search&&params.get('bank'))search.value=params.get('bank');
const today=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Madrid',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
function raw(){const rows=ranking[cat];return Array.isArray(rows)?rows:rows?.[mode]||[]}
function key(x){return x.id||x.provider+'|'+x.product}
function render(){
 if(get('fee-status'))get('fee-status').textContent='';
 document.querySelectorAll('.cat-btn').forEach(x=>{x.classList.toggle('active',x.dataset.cat===cat);x.setAttribute('aria-pressed',String(x.dataset.cat===cat))});document.querySelector('.provider-toggle')?.classList.toggle('visible',g==='investing');document.querySelectorAll('.provider-btn').forEach(x=>x.classList.toggle('active',x.dataset.mode===mode));
 const query=(search?.value||'').trim().toLocaleLowerCase();visible=raw().filter(x=>(!query||(x.provider+' '+x.product).toLocaleLowerCase().includes(query))&&(!free?.checked||(F.annual(x)===0&&x.costs?.conditional===false))&&(!promo?.checked||F.activeBonus(x,today())>0||F.activeOffer(x,today()))&&(!age?.value||x.directoryOnly||(Number.isFinite(x.minAge)&&Number(age.value)>=x.minAge&&(!Number.isFinite(x.maxAge)||Number(age.value)<=x.maxAge)))&&(!payroll||payroll.value==='all'||x.directoryOnly||(payroll.value==='no'?x.payrollRequired===false:x.payrollRequired===true)));
 visible.sort((a,c)=>{if(sort?.value==='fee'){const av=F.annual(a),cv=F.annual(c);if(av!==cv)return (av??Infinity)-(cv??Infinity)}if(sort?.value==='bonus'){const diff=F.activeBonus(c,today())-F.activeBonus(a,today());if(diff)return diff}return a.provider.localeCompare(c.provider,m)});
 if(get('filter-count'))get('filter-count').textContent=visible.length;if(get('ranking-title'))get('ranking-title').textContent=I?.monthly?tr('monthTag'):tr(g==='banking'?'rankingTitleBank':g==='saving'?'rankingTitleSave':'rankingTitleInvest');
 const checked=visible.filter(x=>x.costs?.checkedAt).length;get('ranking-sub').textContent=I?.monthly?tr('monthlySub'):tr('rankingSub',{total:visible.length,checked});
 get('ranking-method').textContent=I?.monthly?tr('monthlyMethod'):tr('rankingMethod');
 list.innerHTML=visible.length?visible.map((x,i)=>F.card(x,m,g,today(),i,selected.has(key(x)))).join(''):'<p class="no-filter-results">'+tr('noResults')+'</p>';
 renderCompare();
}
const comparison=document.createElement('section');comparison.className='fee-comparison';comparison.id='cost-comparison';list.after(comparison);
function renderCompare(){const rows=[...selected.values()];comparison.hidden=!rows.length;if(!rows.length){comparison.innerHTML='';return}const title=tr('compareTitle');comparison.innerHTML='<h2>'+title+' ('+rows.length+'/3)</h2><button type="button" data-clear-compare>'+tr('clearCompare')+'</button>'+(rows.length<2?'<p>'+tr('oneMore')+'</p>':'<p>'+tr('scrollTable')+'</p><div class="fee-table-wrap" tabindex="0" role="region" aria-label="'+title+'"><table><caption>'+title+'</caption><thead><tr><th>'+w.product+'</th>'+rows.map(x=>'<th scope="col">'+F.esc(x.provider)+'<br>'+F.esc(x.product)+'</th>').join('')+'</tr></thead><tbody>'+F.facts(rows[0],m,g,today()).slice(0,8).map(([label],i)=>'<tr><th scope="row">'+F.esc(label)+'</th>'+rows.map(x=>'<td>'+F.esc(F.facts(x,m,g,today())[i]?.[1]||w.unknown)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>')}
list.addEventListener('click',e=>{const btn=e.target.closest('[data-analysis-toggle]');if(!btn)return;const row=btn.closest('.rank-row'),panel=row.querySelector('.rank-analysis-panel'),open=btn.getAttribute('aria-expanded')!=='true';row.classList.toggle('analysis-open',open);panel.hidden=!open;btn.setAttribute('aria-expanded',String(open));btn.textContent=open?w.hide:w.show});
list.addEventListener('change',e=>{if(!e.target.matches('[data-cost-compare]'))return;const x=visible[Number(e.target.dataset.costCompare)],k=key(x);if(e.target.checked&&selected.size>=3){e.target.checked=false;get('fee-status').textContent=tr('maxThree');return}e.target.checked?selected.set(k,x):selected.delete(k);get('fee-status').textContent=tr('selected')+selected.size;renderCompare()});
comparison.addEventListener('click',e=>{if(e.target.closest('[data-clear-compare]')){selected.clear();render()}});
document.querySelectorAll('button.cat-btn[data-cat]').forEach(x=>x.addEventListener('click',()=>{cat=x.dataset.cat;mode='bank';selected.clear();if(search)search.value='';if(free)free.checked=false;if(promo)promo.checked=false;if(age)age.value='';if(payroll)payroll.value='all';const u=new URL(location.href);u.searchParams.set('cat',cat);u.searchParams.delete('age');history.replaceState(null,'',u);I?.changeLinks();render()}));
document.querySelectorAll('.provider-btn').forEach(x=>x.addEventListener('click',()=>{mode=x.dataset.mode;selected.clear();render()}));
[search,sort,free,promo,age,payroll].filter(Boolean).forEach(x=>x.addEventListener(x===search?'input':'change',render));get('reset-filters')?.addEventListener('click',()=>{search.value='';sort.value='recommended';free.checked=false;promo.checked=false;if(age)age.value='';if(payroll)payroll.value='all';render()});
const status=document.createElement('p');status.id='fee-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');list.before(status);render();let day=today();setInterval(()=>{if(day!==today()){day=today();render()}},60000);
})();
