/* Canonical data -> browser bundle -> comparison pages. No dependencies. */
'use strict';
const fs=require('fs'),path=require('path');const root=path.resolve(__dirname,'..');const d=JSON.parse(fs.readFileSync(path.join(root,'assets/data/multi-ranking-data.json')));const ids=new Set();
for(const x of d.markets.es.rankings.personal){if(!x.id||ids.has(x.id)||!x.verifiedAt||!x.sourceUrls?.length)throw Error('Invalid Spain account: '+x.provider);ids.add(x.id)}
fs.writeFileSync(path.join(root,'assets/js/multi-ranking-data.js'),'// Generated from assets/data/multi-ranking-data.json\nwindow.BANKRANKING_MULTI = '+JSON.stringify(d)+';\n');require('./build-comparisons.cjs');
