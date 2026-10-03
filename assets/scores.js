(function (root) {
  'use strict';

  function clamp(n, min, max) {
    n = Number(n);
    if (!Number.isFinite(n)) return min;
    return Math.min(max, Math.max(min, n));
  }

  function sum(arr) {
    return (arr || []).reduce((a, b) => a + Number(b || 0), 0);
  }

  function pasiAreaScore(percent) {
    const p = clamp(percent, 0, 100);
    if (p === 0) return 0;
    if (p < 10) return 1;
    if (p < 30) return 2;
    if (p < 50) return 3;
    if (p < 70) return 4;
    if (p < 90) return 5;
    return 6;
  }

  function pasi(regions) {
    const weights = { head: 0.1, arms: 0.2, trunk: 0.3, legs: 0.4 };
    let total = 0;
    Object.keys(weights).forEach((key) => {
      const r = regions[key] || {};
      const severity = clamp(r.erythema, 0, 4) + clamp(r.induration, 0, 4) + clamp(r.scaling, 0, 4);
      total += severity * pasiAreaScore(r.area) * weights[key];
    });
    return Math.round(total * 10) / 10;
  }

  function pasiSeverity(score) {
    if (score < 7) return { label: 'Hafif', tone: 'low', note: 'Schmitt & Wozel (2005)' };
    if (score <= 12) return { label: 'Orta', tone: 'moderate', note: 'Schmitt & Wozel (2005)' };
    return { label: 'Şiddetli', tone: 'high', note: 'Schmitt & Wozel (2005)' };
  }

  function salt(values) {
    const top = clamp(values.top, 0, 100) * 0.40;
    const back = clamp(values.back, 0, 100) * 0.24;
    const left = clamp(values.left, 0, 100) * 0.18;
    const right = clamp(values.right, 0, 100) * 0.18;
    return Math.round((top + back + left + right) * 10) / 10;
  }

  function saltSeverity(score) {
    if (score === 0) return { label: 'S0 · Saç kaybı yok', tone: 'clear' };
    if (score < 25) return { label: 'S1 · <%25', tone: 'low' };
    if (score < 50) return { label: 'S2 · %25–49', tone: 'moderate' };
    if (score < 75) return { label: 'S3 · %50–74', tone: 'high' };
    if (score < 100) return { label: 'S4 · %75–99', tone: 'very-high' };
    return { label: 'S5 · %100', tone: 'critical' };
  }

  function pdai(data) {
    const skin = sum(data.skinActivity);
    const scalp = Number(data.scalpActivity || 0);
    const mucosa = sum(data.mucosaActivity);
    const skinDamage = sum(data.skinDamage);
    const scalpDamage = Number(data.scalpDamage || 0);
    return {
      skin,
      scalp,
      mucosa,
      activity: skin + scalp + mucosa,
      damage: skinDamage + scalpDamage
    };
  }

  function pdaiSeverity(score) {
    if (score <= 8) return { label: 'Hafif', tone: 'low', note: 'Shimizu ve ark. (2014)' };
    if (score <= 24) return { label: 'Orta', tone: 'moderate', note: 'Shimizu ve ark. (2014)' };
    return { label: 'Şiddetli', tone: 'high', note: 'Shimizu ve ark. (2014)' };
  }

  function bpdai(data) {
    const blister = sum(data.blister);
    const urticaria = sum(data.urticaria);
    const mucosa = sum(data.mucosa);
    const damage = sum(data.damage);
    return { blister, urticaria, mucosa, activity: blister + urticaria + mucosa, damage };
  }

  function bpdaiSeverity(score) {
    if (score <= 19) return { label: 'Hafif', tone: 'low' };
    if (score <= 56) return { label: 'Orta', tone: 'moderate' };
    return { label: 'Şiddetli', tone: 'high' };
  }

  function easiAreaScore(percent) {
    const p = clamp(percent, 0, 100);
    if (p === 0) return 0;
    if (p < 10) return 1;
    if (p < 30) return 2;
    if (p < 50) return 3;
    if (p < 70) return 4;
    if (p < 90) return 5;
    return 6;
  }

  function easi(regions, pediatric) {
    const weights = pediatric
      ? { head: 0.2, arms: 0.2, trunk: 0.3, legs: 0.3 }
      : { head: 0.1, arms: 0.2, trunk: 0.3, legs: 0.4 };
    let total = 0;
    Object.keys(weights).forEach((key) => {
      const r = regions[key] || {};
      const intensity = clamp(r.erythema, 0, 3) + clamp(r.edema, 0, 3) + clamp(r.excoriation, 0, 3) + clamp(r.lichenification, 0, 3);
      total += intensity * easiAreaScore(r.area) * weights[key];
    });
    return Math.round(total * 10) / 10;
  }

  function easiSeverity(score) {
    if (score === 0) return { label: 'Temiz', tone: 'clear' };
    if (score <= 1) return { label: 'Neredeyse temiz', tone: 'clear' };
    if (score <= 7) return { label: 'Hafif', tone: 'low' };
    if (score <= 21) return { label: 'Orta', tone: 'moderate' };
    if (score <= 50) return { label: 'Şiddetli', tone: 'high' };
    return { label: 'Çok şiddetli', tone: 'critical' };
  }

  function scorad(values) {
    const A = clamp(values.extent, 0, 100);
    const B = ['erythema','edema','oozing','excoriation','lichenification','dryness']
      .reduce((s, k) => s + clamp(values[k], 0, 3), 0);
    const C = clamp(values.pruritus, 0, 10) + clamp(values.sleep, 0, 10);
    const score = A / 5 + 7 * B / 2 + C;
    return { A, B, C, score: Math.round(score * 10) / 10 };
  }

  function scoradSeverity(score) {
    if (score < 25) return { label: 'Hafif', tone: 'low' };
    if (score < 50) return { label: 'Orta', tone: 'moderate' };
    return { label: 'Şiddetli', tone: 'high' };
  }

  function scorten(values) {
    let score = 0;
    const factors = [];
    function add(condition, name) { if (condition) { score += 1; factors.push(name); } }
    add(Number(values.age) > 40, 'Yaş >40');
    add(Boolean(values.malignancy), 'Malignite');
    add(Number(values.heartRate) > 120, 'Kalp hızı >120/dk');
    add(Number(values.detachment) > 10, 'Epidermal ayrışma >%10');
    let ureaMmol = Number(values.urea);
    if (values.ureaUnit === 'bunmgdl') ureaMmol = Number(values.urea) / 2.801;
    else if (values.ureaUnit === 'ureamgdl') ureaMmol = Number(values.urea) / 6.006;
    const glucoseMmol = values.glucoseUnit === 'mgdl' ? Number(values.glucose) / 18 : Number(values.glucose);
    add(ureaMmol > 10, 'Üre >10 mmol/L');
    add(glucoseMmol > 14, 'Glukoz >14 mmol/L');
    add(Number(values.bicarbonate) < 20, 'Bikarbonat <20 mmol/L');
    let mortality = 3.2;
    if (score === 2) mortality = 12.1;
    else if (score === 3) mortality = 35.3;
    else if (score === 4) mortality = 58.3;
    else if (score >= 5) mortality = 90;
    return { score, mortality, factors };
  }

  function uas7(days) {
    const total = (days || []).reduce((sum, d) => sum + clamp(d.wheals,0,3) + clamp(d.itch,0,3), 0);
    return Math.round(total);
  }

  function uas7Severity(score) {
    if (score === 0) return { label: 'Semptomsuz', tone: 'clear' };
    if (score <= 6) return { label: 'İyi kontrollü', tone: 'low' };
    if (score <= 15) return { label: 'Hafif aktivite', tone: 'low' };
    if (score <= 27) return { label: 'Orta aktivite', tone: 'moderate' };
    return { label: 'Şiddetli aktivite', tone: 'high' };
  }

  function ihs4(values) {
    return Math.round(clamp(values.nodules, 0, 999) + 2 * clamp(values.abscesses, 0, 999) + 4 * clamp(values.tunnels, 0, 999));
  }

  function ihs4Severity(score) {
    if (score <= 3) return { label: 'Hafif', tone: 'low' };
    if (score <= 10) return { label: 'Orta', tone: 'moderate' };
    return { label: 'Şiddetli', tone: 'high' };
  }

  function napsi(nails) {
    return (nails || []).reduce((total, nail) => total + clamp(nail.matrix, 0, 4) + clamp(nail.bed, 0, 4), 0);
  }

  function vasi(regions) {
    const total = (regions || []).reduce((acc, r) => {
      const hu = clamp(r.handUnits, 0, 1000);
      const dep = clamp(r.depigmentation, 0, 100) / 100;
      return acc + hu * dep;
    }, 0);
    return Math.round(total * 100) / 100;
  }

  function clasi(data) {
    const activityRegions = sum((data.regions || []).map((r) => clamp(r.erythema, 0, 3) + clamp(r.scale, 0, 2)));
    const activity = activityRegions + clamp(data.mucosa, 0, 2) + clamp(data.acuteHairLoss, 0, 1) + clamp(data.nonscarringAlopecia, 0, 3);
    let damageDyspig = sum((data.regions || []).map((r) => clamp(r.dyspigmentation, 0, 1)));
    if (data.dyspigmentGte12m) damageDyspig *= 2;
    const damageScarring = sum((data.regions || []).map((r) => clamp(r.scarring, 0, 2)));
    const damage = damageDyspig + damageScarring + clamp(data.scarringAlopecia, 0, 6);
    return { activity, damage };
  }

  function absis(values) {
    const area = clamp(values.bsa, 0, 100);
    const weight = clamp(values.weight, 0, 1.5);
    const skin = Math.round(area * weight * 10) / 10;
    const oralExtent = clamp(values.oralExtent, 0, 11);
    const oralDiscomfort = clamp(values.drinkDiscomfort, 0, 10) + clamp(values.foodDiscomfort, 0, 10);
    return { skin, oralExtent, oralDiscomfort, total: Math.round((skin + oralExtent + oralDiscomfort) * 10) / 10 };
  }

  function uct(items) {
    return (items || []).reduce((acc, n) => acc + clamp(n, 0, 4), 0);
  }

  function uctSeverity(score) {
    if (score >= 12) return { label: 'İyi kontrollü', tone: 'low' };
    return { label: 'Yetersiz kontrollü', tone: 'high' };
  }

  function poem(items) {
    return (items || []).reduce((acc, n) => acc + clamp(n, 0, 4), 0);
  }

  function poemSeverity(score) {
    if (score <= 2) return { label: 'Temiz / neredeyse temiz', tone: 'clear' };
    if (score <= 7) return { label: 'Hafif', tone: 'low' };
    if (score <= 16) return { label: 'Orta', tone: 'moderate' };
    if (score <= 24) return { label: 'Şiddetli', tone: 'high' };
    return { label: 'Çok şiddetli', tone: 'critical' };
  }

  function mmasi(values) {
    const score =
      0.3 * clamp(values.foreheadArea, 0, 6) * clamp(values.foreheadDarkness, 0, 4) +
      0.3 * clamp(values.rightMalarArea, 0, 6) * clamp(values.rightMalarDarkness, 0, 4) +
      0.3 * clamp(values.leftMalarArea, 0, 6) * clamp(values.leftMalarDarkness, 0, 4) +
      0.1 * clamp(values.chinArea, 0, 6) * clamp(values.chinDarkness, 0, 4);
    return Math.round(score * 10) / 10;
  }

  function gags(values) {
    const factors = { forehead: 2, rightCheek: 2, leftCheek: 2, nose: 1, chin: 1, chestBack: 3 };
    let total = 0;
    Object.keys(factors).forEach((key) => {
      total += clamp(values[key], 0, 4) * factors[key];
    });
    return Math.round(total);
  }

  function gagsSeverity(score) {
    if (score === 0) return { label: 'Lezyon yok', tone: 'clear' };
    if (score <= 18) return { label: 'Hafif', tone: 'low' };
    if (score <= 30) return { label: 'Orta', tone: 'moderate' };
    if (score <= 38) return { label: 'Şiddetli', tone: 'high' };
    return { label: 'Çok şiddetli', tone: 'critical' };
  }

  function rasi(regions) {
    const weights = { forehead: 0.2, rightCheek: 0.3, leftCheek: 0.3, noseChin: 0.2 };
    let total = 0;
    Object.keys(weights).forEach((key) => {
      const r = regions[key] || {};
      const intensity = clamp(r.erythema, 0, 3) + clamp(r.papules, 0, 3) + clamp(r.telangiectasia, 0, 3);
      total += weights[key] * clamp(r.area, 0, 6) * intensity;
    });
    return Math.round(total * 10) / 10;
  }

  const api = {
    clamp, sum,
    pasiAreaScore, pasi, pasiSeverity,
    salt, saltSeverity,
    pdai, pdaiSeverity,
    bpdai, bpdaiSeverity,
    easiAreaScore, easi, easiSeverity,
    scorad, scoradSeverity,
    scorten,
    uas7, uas7Severity,
    ihs4, ihs4Severity,
    napsi,
    vasi,
    clasi,
    absis,
    uct, uctSeverity,
    poem, poemSeverity,
    mmasi,
    gags, gagsSeverity,
    rasi
  };

  root.SakuraScores = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
