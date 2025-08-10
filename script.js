// =========================
// Dados de Bosses (exemplos)
// Campos seguem a estrutura comum do banco Nipperlug (Level, HP, Defense, Penetration, DamageReduction, ResistCritDamage, ResistCritRate, IgnorePenetration, ResistSkillAmp)
// Alguns campos como Evasion/Accuracy podem não aparecer no recorte; deixei como 0 por padrão.
// =========================
const BOSS_DATA = [
  {
    name: "Island Ruler Bariald",
    dungeon: "—",
    level: 260,
    hp: 16239040,
    defense: 4284,
    penetration: 2600,
    damageReduction: 700,
    resistCritDamage: 180,
    resistCritRate: 20,
    ignorePenetration: 180,
    resistSkillAmp: 50,
    evasion: 0,
    accuracy: 0
  },
  {
    name: "Watchman Darthpencio",
    dungeon: "—",
    level: 255,
    hp: 14901824,
    defense: 4040,
    penetration: 2400,
    damageReduction: 660,
    resistCritDamage: 150,
    resistCritRate: 15,
    ignorePenetration: 150,
    resistSkillAmp: 45,
    evasion: 0,
    accuracy: 0
  },
  {
    name: "Ancient being Omerai",
    dungeon: "—",
    level: 250,
    hp: 36734806,
    defense: 5850,
    penetration: 3800,
    damageReduction: 1200,
    resistCritDamage: 324,
    resistCritRate: 40,
    ignorePenetration: 300,
    resistSkillAmp: 81,
    evasion: 0,
    accuracy: 0
  },
  {
    name: "UnderQueen Ripley",
    dungeon: "—",
    level: 250,
    hp: 35000000,
    defense: 5625,
    penetration: 4000,
    damageReduction: 500,
    resistCritDamage: 306,
    resistCritRate: 35,
    ignorePenetration: 265,
    resistSkillAmp: 76,
    evasion: 0,
    accuracy: 0
  },
  {
    name: "Electula",
    dungeon: "—",
    level: 250,
    hp: 34734806,
    defense: 5400,
    penetration: 3800,
    damageReduction: 120,
    resistCritDamage: 200,
    resistCritRate: 30,
    ignorePenetration: 200,
    resistSkillAmp: 40,
    evasion: 0,
    accuracy: 0
  },
  {
    name: "Mine Beelzebub",
    dungeon: "—",
    level: 250,
    hp: 32295910,
    defense: 5175,
    penetration: 3600,
    damageReduction: 110,
    resistCritDamage: 180,
    resistCritRate: 28,
    ignorePenetration: 120,
    resistSkillAmp: 20,
    evasion: 0,
    accuracy: 0
  },
  {
    name: "Bloody Fang",
    dungeon: "—",
    level: 250,
    hp: 29402300,
    defense: 4320,
    penetration: 3500,
    damageReduction: 100,
    resistCritDamage: 150,
    resistCritRate: 24,
    ignorePenetration: 80,
    resistSkillAmp: 10,
    evasion: 0,
    accuracy: 0
  },
  {
    name: "Keeper of Emptiness Perius",
    dungeon: "—",
    level: 250,
    hp: 38604331,
    defense: 5700,
    penetration: 2400,
    damageReduction: 1600,
    resistCritDamage: 360,
    resistCritRate: 35,
    ignorePenetration: 310,
    resistSkillAmp: 90,
    evasion: 0,
    accuracy: 0
  },
  {
    name: "Furious Abyss Vitos",
    dungeon: "—",
    level: 250,
    hp: 34734806,
    defense: 5130,
    penetration: 2400,
    damageReduction: 1050,
    resistCritDamage: 300,
    resistCritRate: 32,
    ignorePenetration: 295,
    resistSkillAmp: 85,
    evasion: 0,
    accuracy: 0
  },
  {
    name: "Aion who has forgotten the truth",
    dungeon: "—",
    level: 250,
    hp: 32295910,
    defense: 4788,
    penetration: 2400,
    damageReduction: 1050,
    resistCritDamage: 280,
    resistCritRate: 30,
    ignorePenetration: 290,
    resistSkillAmp: 80,
    evasion: 0,
    accuracy: 0
  }
];

// =========================
// UI helpers
// =========================
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

function number(n){ return isFinite(+n) ? +n : 0 }
function clamp(x, a, b){ return Math.max(a, Math.min(b, x)) }
function fmt(x){ return Number(x).toLocaleString('pt-BR', { maximumFractionDigits: 2 }) }

// Populate boss select
function populateBossSelect(list=BOSS_DATA){
  const sel = $('#bossSelect');
  sel.innerHTML = '';
  list.forEach((b, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = b.name;
    sel.appendChild(opt);
  });
  if(list.length) { sel.value = 0; updateBossStats(list[0]); }
}

// Update boss stats panel
function updateBossStats(boss){
  $('#bDungeon').textContent = boss.dungeon ?? '—';
  $('#bLevel').textContent = boss.level ?? '—';
  $('#bHP').textContent = boss.hp ? boss.hp.toLocaleString('pt-BR') : '—';
  $('#bDef').textContent = boss.defense ?? '—';
  $('#bPen').textContent = boss.penetration ?? '—';
  $('#bDR').textContent = boss.damageReduction ?? '—';
  $('#bRCD').textContent = boss.resistCritDamage ?? '—';
  $('#bRCR').textContent = boss.resistCritRate ?? '—';
  $('#bIgnorePen').textContent = boss.ignorePenetration ?? '—';
  $('#bRSA').textContent = boss.resistSkillAmp ?? '—';
  $('#bEva').textContent = boss.evasion ?? '0';
  $('#bAcc').textContent = boss.accuracy ?? '0';
}

// Build bosses table (tab "Chefes")
function renderBossTable(){
  const wrap = $('#bossTable');
  const headers = ['Nome','Dungeon','Lvl','HP','Def','Pen','Red.Dano','Res.DC','Res.TaxaC','Ign.Pen','Res.Amp'];
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const trh = document.createElement('tr');
  headers.forEach(h => { const th=document.createElement('th'); th.textContent=h; trh.appendChild(th); });
  thead.appendChild(trh);
  table.appendChild(thead);
  const tbody = document.createElement('tbody');
  BOSS_DATA.forEach(b=>{
    const tr = document.createElement('tr');
    const cells = [
      b.name, b.dungeon, b.level, b.hp, b.defense, b.penetration,
      b.damageReduction, b.resistCritDamage, b.resistCritRate, b.ignorePenetration, b.resistSkillAmp
    ];
    cells.forEach(c=>{ const td=document.createElement('td'); td.textContent=c; tr.appendChild(td); });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  wrap.innerHTML = '';
  wrap.appendChild(table);
}

// Search boss by name
function setupBossSearch(){
  $('#bossSearch').addEventListener('input', e=>{
    const q = e.target.value.trim().toLowerCase();
    const filtered = BOSS_DATA.filter(b => b.name.toLowerCase().includes(q));
    populateBossSelect(filtered.length ? filtered : BOSS_DATA);
  });
  $('#bossSelect').addEventListener('change', e=>{
    const idx = +e.target.value;
    const boss = (BOSS_DATA[idx]) || BOSS_DATA[0];
    updateBossStats(boss);
  });
}

// =========================
// Cálculo de dano
// =========================
function calculate(){
  const bossIdx = +$('#bossSelect').value || 0;
  const boss = BOSS_DATA[bossIdx] || BOSS_DATA[0];

  // Player inputs
  const atk = number($('#atk').value);
  const allAtkPct = number($('#allAtkPct').value);
  const amp = number($('#amp').value);
  const cr = clamp(number($('#cr').value), 0, 100);
  const cd = number($('#cd').value);
  const pen = number($('#pen').value);
  const addDmg = number($('#addDmg').value);
  const normalInc = number($('#normalInc').value);
  const finalInc = number($('#finalInc').value);
  const ignoreResCD = number($('#ignoreResCD').value);
  const ignoreResAmp = number($('#ignoreResAmp').value);

  // Boss stats
  const bDef = number(boss.defense);
  const bDR = number(boss.damageReduction);
  const bRCD = number(boss.resistCritDamage);
  const bRCR = number(boss.resistCritRate);
  const bIgnorePen = number(boss.ignorePenetration);
  const bRSA = number(boss.resistSkillAmp);

  // Effective values
  const effPen = Math.max(0, pen - bIgnorePen); // sua perfuração que não é ignorada pelo boss
  const effDef = Math.max(0, bDef - effPen);    // defesa do boss após perfuração
  const atkEff = atk * (1 + allAtkPct/100) + addDmg;

  // Redução de Dano do boss tratada como valor plano após defesa
  const base = Math.max(1, atkEff - effDef - bDR);

  // Amp efetivo (resistência do boss pode ser parcialmente ignorada)
  const resAmpAfterIgnore = Math.max(0, bRSA - ignoreResAmp);
  const ampEff = Math.max(0, amp - resAmpAfterIgnore);
  const ampMult = 1 + ampEff/100;

  // Crítico: taxa e dano efetivos
  const crEff = clamp(cr - bRCR, 0, 100) / 100; // convertido para 0..1
  const resCDAfterIgnore = Math.max(0, bRCD - ignoreResCD);
  const cdEff = Math.max(0, cd - resCDAfterIgnore);
  const critMult = 1 + cdEff/100;

  // Aumentos de dano
  const normalMult = 1 + normalInc/100;
  const finalMult = 1 + finalInc/100;

  const dmgNormal = base * ampMult * normalMult * finalMult;
  const dmgCrit = dmgNormal * critMult;
  const dmgExpected = dmgNormal*(1 - crEff) + dmgCrit*crEff;

  // Saída
  $('#outNormal').textContent = fmt(dmgNormal);
  $('#outCrit').textContent = fmt(dmgCrit);
  $('#outExpected').textContent = fmt(dmgExpected);

  // Breakdown
  const lines = [
    `Ataque efetivo = ${fmt(atk)} × (1 + ${allAtkPct}% ) + ${fmt(addDmg)} = ${fmt(atkEff)}`,
    `Perfuração efetiva = max(0, ${fmt(pen)} - Ign.Pen(${fmt(bIgnorePen)})) = ${fmt(effPen)}`,
    `Defesa efetiva do boss = max(0, ${fmt(bDef)} - ${fmt(effPen)}) = ${fmt(effDef)}`,
    `Base após defesa e red. dano = max(1, ${fmt(atkEff)} - ${fmt(effDef)} - Red.Dano(${fmt(bDR)})) = ${fmt(base)}`,
    `Res.Amp após ignorar = max(0, ${fmt(bRSA)} - Ign.ResAmp(${fmt(ignoreResAmp)})) = ${fmt(resAmpAfterIgnore)}`,
    `Amp efetivo = max(0, ${fmt(amp)} - ${fmt(resAmpAfterIgnore)}) = ${fmt(ampEff)}  → MultAmp = ${ampMult.toFixed(4)}`,
    `Taxa Crítica efetiva = clamp(${fmt(cr)} - Res.Taxa(${fmt(bRCR)}), 0..100) = ${(crEff*100).toFixed(2)}%`,
    `Res.DC após ignorar = max(0, ${fmt(bRCD)} - Ign.ResDC(${fmt(ignoreResCD)})) = ${fmt(resCDAfterIgnore)}`,
    `DC efetivo = max(0, ${fmt(cd)} - ${fmt(resCDAfterIgnore)}) = ${fmt(cdEff)}  → MultCrítico = ${critMult.toFixed(4)}`,
    `Mult Normal = 1 + ${normalInc}% = ${normalMult.toFixed(4)},  Mult Final = 1 + ${finalInc}% = ${finalMult.toFixed(4)}`,
    `Dano Normal = Base × Amp × Normal × Final = ${fmt(base)} × ${ampMult.toFixed(4)} × ${normalMult.toFixed(4)} × ${finalMult.toFixed(4)} = ${fmt(dmgNormal)}`,
    `Dano Crítico = Dano Normal × Mult Crítico = ${fmt(dmgNormal)} × ${critMult.toFixed(4)} = ${fmt(dmgCrit)}`,
    `Dano Esperado = Normal × (1-CR) + Crítico × CR = ${fmt(dmgExpected)}`
  ];
  $('#breakdown').textContent = lines.join('\n');
}

// =========================
// Equivalências (referência)
// =========================
const EQUIV = {
  // Conversões básicas (não usadas no cálculo principal)
  atkPerAmp: 14.2,
  atkPerDC: 7.4,
  atkPerPen: 2.2,
  dcPerAmp: 1.9,
  penPerDC: 3.2
};

function renderEquiv(){
  const base = $('#eqBase').value;
  const val = number($('#eqValue').value);
  let out = '';
  if(base === 'atk'){
    out = [
      `≈ ${(val / EQUIV.atkPerAmp).toFixed(3)} Amp`,
      `≈ ${(val / EQUIV.atkPerDC).toFixed(3)} DC`,
      `≈ ${(val / EQUIV.atkPerPen).toFixed(3)} Perfuração`
    ].join(' | ');
  } else if(base === 'amp'){
    out = [
      `≈ ${(val * EQUIV.atkPerAmp).toFixed(1)} Atk`,
      `≈ ${(val * EQUIV.dcPerAmp).toFixed(3)} DC`
    ].join(' | ');
  } else if(base === 'dc'){
    out = [
      `≈ ${(val * EQUIV.atkPerDC).toFixed(1)} Atk`,
      `≈ ${(val * EQUIV.penPerDC).toFixed(3)} Perfuração`
    ].join(' | ');
  } else if(base === 'pen'){
    out = [
      `≈ ${(val * EQUIV.atkPerPen).toFixed(1)} Atk`
    ].join(' | ');
  }
  $('#eqOut').textContent = out;
}

// =========================
// Tabs
// =========================
function setupTabs(){
  $$('.tab-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      $$('.tab-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      $$('.tab').forEach(s=>s.classList.remove('active'));
      $('#tab-' + tab).classList.add('active');
    });
  });
}

// =========================
// Init
// =========================
window.addEventListener('DOMContentLoaded', ()=>{
  setupTabs();
  setupBossSearch();
  populateBossSelect();
  renderBossTable();
  $('#calcBtn').addEventListener('click', calculate);
  $('#eqBase').addEventListener('change', renderEquiv);
  $('#eqValue').addEventListener('input', renderEquiv);
  renderEquiv();
});