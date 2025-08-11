'use strict';

/* =========================================
   Dados dos bosses (exemplos editáveis)
   ========================================= */
const BOSS_DATA = [
  // Forbidden Island (Exemplo)
  {
    id: 'fi-bariald',
    name: "Island Ruler Bariald",
    dungeon: "Forbidden Island",
    level: 260, hp: 16239040, defense: 4284,
    penetration: 2600, damageReduction: 700,
    resistCritDamage: 180, resistCritRate: 20,
    ignorePenetration: 180, resistSkillAmp: 50
  },
  {
    id: 'fi-darthpencio',
    name: "Watchman Darthpencio",
    dungeon: "Forbidden Island",
    level: 255, hp: 14901824, defense: 4040,
    penetration: 2400, damageReduction: 660,
    resistCritDamage: 150, resistCritRate: 15,
    ignorePenetration: 150, resistSkillAmp: 45
  },
  // Temple/Underworld (Exemplos)
  {
    id: 'ft-omerai',
    name: "Ancient being Omerai",
    dungeon: "Forgotten Temple B2F",
    level: 250, hp: 36734806, defense: 5850,
    penetration: 3800, damageReduction: 1200,
    resistCritDamage: 324, resistCritRate: 40,
    ignorePenetration: 300, resistSkillAmp: 81
  },
  {
    id: 'ic-ripley',
    name: "UnderQueen Ripley",
    dungeon: "Illusion Castle",
    level: 250, hp: 35000000, defense: 5625,
    penetration: 4000, damageReduction: 500,
    resistCritDamage: 306, resistCritRate: 35,
    ignorePenetration: 265, resistSkillAmp: 76
  },
  {
    id: 'misc-electula',
    name: "Electula",
    dungeon: "Misc",
    level: 250, hp: 34734806, defense: 5400,
    penetration: 3800, damageReduction: 120,
    resistCritDamage: 200, resistCritRate: 30,
    ignorePenetration: 200, resistSkillAmp: 40
  },
  {
    id: 'misc-beelz',
    name: "Mine Beelzebub",
    dungeon: "Misc",
    level: 250, hp: 32295910, defense: 5175,
    penetration: 3600, damageReduction: 110,
    resistCritDamage: 180, resistCritRate: 28,
    ignorePenetration: 120, resistSkillAmp: 20
  },
  {
    id: 'misc-bloodyfang',
    name: "Bloody Fang",
    dungeon: "Misc",
    level: 250, hp: 29402300, defense: 4320,
    penetration: 3500, damageReduction: 100,
    resistCritDamage: 150, resistCritRate: 24,
    ignorePenetration: 80, resistSkillAmp: 10
  },
  {
    id: 'emptiness-perius',
    name: "Keeper of Emptiness Perius",
    dungeon: "Emptiness",
    level: 250, hp: 38604331, defense: 5700,
    penetration: 2400, damageReduction: 1600,
    resistCritDamage: 360, resistCritRate: 35,
    ignorePenetration: 310, resistSkillAmp: 90
  },
  {
    id: 'abyss-vitos',
    name: "Furious Abyss Vitos",
    dungeon: "Abyss",
    level: 250, hp: 34734806, defense: 5130,
    penetration: 2400, damageReduction: 1050,
    resistCritDamage: 300, resistCritRate: 32,
    ignorePenetration: 295, resistSkillAmp: 85
  },
  {
    id: 'truth-aion',
    name: "Aion who has forgotten the truth",
    dungeon: "Abyss",
    level: 250, hp: 32295910, defense: 4788,
    penetration: 2400, damageReduction: 1050,
    resistCritDamage: 280, resistCritRate: 30,
    ignorePenetration: 290, resistSkillAmp: 80
  }
];

/* =========================================
   Helpers
   ========================================= */
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

function number(n){ return isFinite(+n) ? +n : 0; }
function clamp(x, a, b){ return Math.max(a, Math.min(b, x)); }
function fmt(x){ const n = Number(x); return isFinite(n) ? n.toLocaleString('pt-BR', { maximumFractionDigits: 2 }) : '—'; }

const unique = arr => [...new Set(arr)];

/* =========================================
   UI: Dungeon/Boss
   ========================================= */
function populateDungeons(){
  const dSel = $('#dungeonSelect');
  if(!dSel) return;
  const dungeons = unique(BOSS_DATA.map(b => b.dungeon)).sort();
  dSel.innerHTML = '';
  dungeons.forEach(d => {
    const opt = document.createElement('option');
    opt.value = d; opt.textContent = d;
    dSel.appendChild(opt);
  });
  if(dungeons.length){ dSel.value = dungeons[0]; }
}

function populateBossSelect(){
  const dSel = $('#dungeonSelect');
  const bSel = $('#bossSelect');
  if(!dSel || !bSel) return;

  const dungeon = dSel.value;
  const list = BOSS_DATA.filter(b => b.dungeon === dungeon);

  bSel.innerHTML = '';
  list.forEach(b => {
    const opt = document.createElement('option');
    opt.value = b.id; opt.textContent = b.name;
    bSel.appendChild(opt);
  });
  if(list.length){
    bSel.value = list[0].id;
    updateBossStats(list[0]);
  }
}

function getBoss(){
  const id = $('#bossSelect')?.value;
  return BOSS_DATA.find(b => b.id === id) || BOSS_DATA[0];
}

function updateBossStats(boss){
  if(!boss) return;
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
}

function renderBossTable(){
  const wrap = $('#bossTable');
  if(!wrap) return;

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

/* =========================================
   Cálculo de dano (ordem cuidadosa)
   ========================================= */
// Config do delta para equivalências
const DELTAS = {
  amp: 1,           // 1%
  cd: 1,            // 1%
  cr: 1,            // 1%
  finalInc: 1,      // 1%
  normalInc: 1,     // 1%
  atk: 100,         // 100
  pen: 100,         // 100
  addDmg: 100       // 100
};

function readInputs(){
  return {
    atk: number($('#atk')?.value),
    allAtkPct: number($('#allAtkPct')?.value),
    amp: number($('#amp')?.value),
    cr: clamp(number($('#cr')?.value), 0, 100),
    cd: number($('#cd')?.value),
    pen: number($('#pen')?.value),
    addDmg: number($('#addDmg')?.value),
    normalInc: number($('#normalInc')?.value),
    finalInc: number($('#finalInc')?.value),
    cancelIgnorePen: number($('#cancelIgnorePen')?.value),
    ignoreResCD: number($('#ignoreResCD')?.value),
    ignoreResAmp: number($('#ignoreResAmp')?.value)
  };
}

function computeDamage(mode='expected', custom){
  const boss = getBoss();
  const p = custom ?? readInputs();

  // Boss stats
  const bDef = number(boss.defense);
  const bDR = number(boss.damageReduction);
  const bRCD = number(boss.resistCritDamage);
  const bRCR = number(boss.resistCritRate);
  const bIgnorePen = number(boss.ignorePenetration);
  const bRSA = number(boss.resistSkillAmp);

  // Cancelar Ignorar Perfuração (seu) reduz o "Ignorar Perfuração" do boss
  const bossIgnPenEff = Math.max(0, bIgnorePen - p.cancelIgnorePen);
  const effPen = Math.max(0, p.pen - bossIgnPenEff);
  const effDef = Math.max(0, bDef - effPen);

  // All Atk aplicado no seu ataque base
  const atkBase = p.atk * (1 + p.allAtkPct/100);

  // Ordem adotada:
  // 1) Subtrai defesa
  // 2) Soma Dano Adicional (após defesa)
  // 3) Subtrai Redução de Dano plana
  // 4) Aplica multiplicadores (Amp, Normal, Final)
  const afterDef = Math.max(1, atkBase - effDef);
  const afterAdd = Math.max(1, afterDef + p.addDmg);
  const base = Math.max(1, afterAdd - bDR);

  // Amp efetivo (resistência do boss pode ser parcialmente ignorada)
  const resAmpAfterIgnore = Math.max(0, bRSA - p.ignoreResAmp);
  const ampEff = Math.max(0, p.amp - resAmpAfterIgnore);
  const ampMult = 1 + ampEff/100;

  // Multiplicadores adicionais
  const normalMult = 1 + p.normalInc/100;
  const finalMult = 1 + p.finalInc/100;

  const dmgNormal = base * ampMult * normalMult * finalMult;

  // Crítico: taxa e dano efetivos
  const crEff = clamp(p.cr - bRCR, 0, 100) / 100;
  const resCDAfterIgnore = Math.max(0, bRCD - p.ignoreResCD);
  const cdEff = Math.max(0, p.cd - resCDAfterIgnore);
  const critMult = 1 + cdEff/100;

  const dmgCrit = dmgNormal * critMult;
  const dmgExpected = dmgNormal*(1 - crEff) + dmgCrit*crEff;

  if(mode === 'normal') return { value: dmgNormal, components: { dmgNormal, dmgCrit, dmgExpected, crEff, critMult, ampMult, normalMult, finalMult, base, atkBase, effDef } };
  if(mode === 'crit')   return { value: dmgCrit,   components: { dmgNormal, dmgCrit, dmgExpected, crEff, critMult, ampMult, normalMult, finalMult, base, atkBase, effDef } };
  return { value: dmgExpected, components: { dmgNormal, dmgCrit, dmgExpected, crEff, critMult, ampMult, normalMult, finalMult, base, atkBase, effDef } };
}

function calculate(){
  const res = computeDamage('expected');
  const { components } = res;

  $('#outNormal').textContent = fmt(components.dmgNormal);
  $('#outCrit').textContent = fmt(components.dmgCrit);
  $('#outExpected').textContent = fmt(components.dmgExpected);

  const boss = getBoss();
  const p = readInputs();

  const bDef = number(boss.defense);
  const bDR = number(boss.damageReduction);
  const bRCD = number(boss.resistCritDamage);
  const bRCR = number(boss.resistCritRate);
  const bIgnorePen = number(boss.ignorePenetration);
  const bRSA = number(boss.resistSkillAmp);

  const bossIgnPenEff = Math.max(0, bIgnorePen - p.cancelIgnorePen);
  const effPen = Math.max(0, p.pen - bossIgnPenEff);
  const effDef = Math.max(0, bDef - effPen);

  const atkBase = p.atk * (1 + p.allAtkPct/100);
  const afterDef = Math.max(1, atkBase - effDef);
  const afterAdd = Math.max(1, afterDef + p.addDmg);
  const base = Math.max(1, afterAdd - bDR);

  const resAmpAfterIgnore = Math.max(0, bRSA - p.ignoreResAmp);
  const ampEff = Math.max(0, p.amp - resAmpAfterIgnore);
  const ampMult = 1 + ampEff/100;

  const crEffPct = clamp(p.cr - bRCR, 0, 100);
  const resCDAfterIgnore = Math.max(0, bRCD - p.ignoreResCD);
  const cdEff = Math.max(0, p.cd - resCDAfterIgnore);
  const critMult = 1 + cdEff/100;

  const normalMult = 1 + p.normalInc/100;
  const finalMult = 1 + p.finalInc/100;

  const lines = [
    `Ataque base = ${fmt(p.atk)} × (1 + ${fmt(p.allAtkPct)}%) = ${fmt(atkBase)}`,
    `Ign.Pen (boss) efetivo = max(0, ${fmt(bIgnorePen)} - Cancel(${fmt(p.cancelIgnorePen)})) = ${fmt(bossIgnPenEff)}`,
    `Perfuração efetiva = max(0, ${fmt(p