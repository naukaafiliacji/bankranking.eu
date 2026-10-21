(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.BankRankingComparison = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const finite = value => typeof value === 'number' && Number.isFinite(value) && value >= 0;
  function todayMadrid(date) {
    const parts = new Intl.DateTimeFormat('en-CA', {timeZone:'Europe/Madrid',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(date || new Date());
    const get = type => parts.find(p => p.type === type).value;
    return get('year') + '-' + get('month') + '-' + get('day');
  }
  function activeBonus(account, today) {
    if (!finite(account.bonusAmount) || !account.bonusAmount) return 0;
    if (account.bonusStartsAt && account.bonusStartsAt > today) return 0;
    if (account.bonusExpiresAt && account.bonusExpiresAt < today) return 0;
    return account.bonusAmount;
  }
  function annualMaintenance(account) {
    if (account.feeWaiverRequired !== false) return null;
    if (![account.monthlyFee, account.monthlyCardFee, account.annualCardFee].every(finite)) return null;
    return Math.round((12 * (account.monthlyFee + account.monthlyCardFee) + account.annualCardFee) * 100) / 100;
  }
  function unconditionalFree(account) {
    return account.feeWaiverRequired === false && annualMaintenance(account) === 0;
  }
  function filterAccounts(accounts, state, today) {
    const query = String(state.query || '').trim().toLocaleLowerCase('es');
    let rows = accounts.filter(a => {
      if (query && !(a.provider+' '+a.product).toLocaleLowerCase('es').includes(query)) return false;
      if (state.freeOnly && !unconditionalFree(a)) return false;
      if (state.payroll === 'no' && a.payrollRequired !== false) return false;
      if (state.payroll === 'yes' && a.payrollRequired !== true) return false;
      if (state.promoOnly && !activeBonus(a, today)) return false;
      if (state.age && (!finite(a.minAge) || state.age < a.minAge || (finite(a.maxAge) && state.age > a.maxAge))) return false;
      return true;
    });
    rows.sort((a,b) => {
      if (state.sort === 'cost') {
        const av=annualMaintenance(a),bv=annualMaintenance(b);
        if (av !== bv) return (av === null ? Infinity : av) - (bv === null ? Infinity : bv);
      }
      if (state.sort === 'bonus') {
        const diff=activeBonus(b,today)-activeBonus(a,today);
        if (diff) return diff;
      }
      return a.provider.localeCompare(b.provider,'es');
    });
    return rows;
  }
  return {finite,todayMadrid,activeBonus,annualMaintenance,unconditionalFree,filterAccounts};
});
