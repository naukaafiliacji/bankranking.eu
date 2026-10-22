'use strict';
const fs=require('fs'),path=require('path'),root=path.resolve(__dirname,'..'),F=require('../assets/js/fee-view.js'),d=JSON.parse(fs.readFileSync(root+'/assets/data/multi-ranking-data.json'));
const cats={banking:['personal','business','joint','student','youth'],saving:['savings','deposits','business_savings','child_savings'],investing:['investment','funds','managed','self_directed','retirement','business_investing']};
const names={pl:'Poland',it:'Italy',es:'Spain'},adjectives={pl:'Polish',it:'Italian',es:'Spanish'};
for(const m of Object.keys(names))for(const g of Object.keys(cats)){
 let h=fs.readFileSync(__dirname+'/templates/'+g+'.tpl','utf8');
 h=h.replace(/\/it\//g,'/'+m+'/').replace(/data-market="it"/,'data-market="'+m+'"').replace(/\bItaly\b/g,names[m]).replace(/\bItalian\b/g,adjectives[m]).replace(/flags-v3\/it\.png/g,'flags-v3/'+m+'.png').replace(/<html lang="[^"]+"/,'<html lang="en"');
 h=h.replace(/<div class="country-picker-grid">[\s\S]*?<\/div>/,'<div class="country-picker-grid">'+Object.entries(names).map(([k,n])=>'<a '+(k===m?'class="current" ':'')+'href="/'+k+'/'+g+'/">'+n+'</a>').join('')+'</div>');
 h=h.replace(/<link[^>]+href="[^\"]*(?:reference-pro|accounts-pro|fees-classic)\.css[^\"]*"[^>]*>/g,'').replace(/<script[^>]+src="[^\"]*(?:fee-view|three-verticals|comparison-core|es-render|es-comparison)\.js[^\"]*"[^>]*><\/script>/g,'');
 h=h.replace(/student, youth and children’s accounts/g,'student and youth accounts');
 h=h.replace(/data-categories='[^']*'/,"data-categories='"+JSON.stringify(cats[g])+"'").replace(/<button\b[^>]*data-cat="child"[^>]*>[\s\S]*?<\/button>/g,'');
 h=h.replace('</head>','<link rel="stylesheet" href="/assets/css/fees-classic.css?v=20261022r2"></head>').replace('</body>','<script src="/assets/js/fee-view.js?v=20261022r2"></script><script src="/assets/js/three-verticals.js?v=20261022r2"></script></body>');
 h=h.replace(/multi-ranking-data\.js\?v=[^"']+/g,'multi-ranking-data.js?v=20261022r2').replace(/three-verticals\.css\?v=[^"']+/g,'three-verticals.css?v=20261022en');
 const raw=d.markets[m].rankings[cats[g][0]],rows=Array.isArray(raw)?raw:raw.bank;
 const cards=[...rows].sort((a,b)=>a.provider.localeCompare(b.provider,'en')).map((x,i)=>F.card(x,m,g,d.updatedAt,i,false)).join('');
 h=h.replace(/<div class="rank-list" id="rank-list">[\s\S]*?<\/div>\s*(?=<div class="note">)/,'<div class="rank-list" id="rank-list">'+cards+'<noscript><p>Filters require JavaScript. Product details and official sources remain available below.</p><style>.rank-analysis-panel[hidden]{display:block!important}.analysis-toggle,.fee-compare{display:none!important}</style></noscript></div>');
 h=h.replace(/<div class="updated">[\s\S]*?<\/div>/,'<div class="updated"><strong>Fees & welcome rewards</strong>Dates and sources on each product</div>');
 h=h.replace(/(<[^>]+id="filter-count"[^>]*>)[^<]+/,'$1'+rows.length);
 h=h.replace(/(<[^>]+id="ranking-title"[^>]*>)[\s\S]*?(<\/[^>]+>)/,'$1Compare accounts, fees & rewards$2');
 h=h.replace(/(<[^>]+id="ranking-sub"[^>]*>)[\s\S]*?(<\/[^>]+>)/,'$1'+rows.length+' products and providers · dated sources in each entry.$2');
 h=h.replace(/(<[^>]+id="ranking-method"[^>]*>)[\s\S]*?(<\/[^>]+>)/,'$1Compare account and card charges; see annual costs, eligibility and reward conditions in the details.$2');
 const footer={Ricerca:'Research','Chi siamo':'About',Metodologia:'Methodology',Servizi:'Services',Contatti:'Contact',Condizioni:'Terms',Avvertenze:'Disclaimer',Cookie:'Cookies'};
 for(const[a,b]of Object.entries(footer))h=h.split('>'+a+'</a>').join('>'+b+'</a>');
 h=h.replace(/(<section class="country-seo-copy"[^>]*><div class="container">)[\s\S]*?(<\/div><\/section>)/,'$1<h2>Account costs and welcome rewards</h2><p>Compare monthly account and card charges first. “0 / X” shows the fee with and without the stated waiver. Expanded details show annual maintenance, eligibility, other charges and official sources. Introductory fee discounts are explained separately; transactions, taxes and optional services can cost extra.</p><p>Welcome rewards belong to the customer and may require salary credit, spending, an application code or a commitment period. Cash, vouchers and physical gifts are labelled separately. They are not deducted from annual fees. Availability may end before the advertised deadline if limits or stock are reached. A zero welcome figure means no cash welcome reward is listed for this specific product in the offer reviewed. Gifts, vouchers, deposit interest and publisher commissions are excluded. Every personal-list bank also appears in the other account-type tabs; catalogue entries are identified separately and are not priced as personal accounts.</p>$2');
 fs.writeFileSync(root+'/'+m+'/'+g+'/index.html',h);
}
console.log('Built nine English comparisons from the retained classic layout.');
