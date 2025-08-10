'use strict';

/* =========================
   Dados de Bosses (exemplos)
   ========================= */
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

// Atribui um ID estável a cada boss (evita bug de índice ao filtrar/pesquisar)
BOSS_DATA.forEach((b, i) => { if (typeof b._id !== 'number') b._id = i; });

/* =========================
   Helpers
   ========================= */
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

function number(n){ return isFinite(+n) ? +n : 0; }
function clamp(x, a, b){ return Math.max(a, Math.min(b, x)); }
function fmt(x){ const n = Number(x); return isFinite(n) ? n.toLocaleString('pt-BR', { maximumFractionDigits: 2 }) : '—'; }

function getBossById(id){
  const idx = number(id);
  return BOSS_DATA[idx] ?? BOSS_DATA[0];
}

/* =========================
   UI: Boss select e painel
   ========================= */
function populateBossSelect(list = BOSS_DATA){
  const sel = $('#bossSelect');
  if(!sel) return;

  sel.innerHTML = '';
  list.forEach(b => {
    const opt = document.createElement('option');
    opt.value = b._id;                 // usa ID estável do array principal
    opt.textContent = b.name;
    sel.appendChild(opt);
  });

  // Seleciona o primeiro da lista atual e atualiza painel
  if(list.length){
    sel.value = list[0]._id;
    updateBossStats(list[0]);
  }
}

function updateBossStats(boss){
  if(!boss) return;
  const set = (id, val) => { const el = $(id); if(el) el.textContent = val; };

  set('#bDungeon', boss.dungeon ?? '—');
  set('#bLevel', boss.level ?? '—');
  set('#bHP', boss.hp ? boss.hp.toLocaleString('pt-BR') : '—');
  set('#bDef', boss.defense ?? '—');
  set('#bPen', boss.penetration ?? '—');
  set('#bDR', boss.damageReduction ?? '—');
  set('#bRCD', boss.resistCritDamage ?? '—');
  set('#bRCR', boss.resistCritRate ?? '—');
  set('#bIgnorePen', boss.ignorePenetration ?? '—');
  set('#bRSA', boss.resistSkillAmp ?? '—');
  set('#bEva', boss.evasion ?? '0');
  set('#bAcc', boss.accuracy ?? '0');
}

function renderBossTable(){
  const wrap = $('#bossTable');
  if(!wrap) return;

  const