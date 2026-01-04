// ============================================
// SAINT SEIYA TEAM BUILDER - PRO V2.4 (BOSS FIX)
// ============================================

// Global State
let knightsData = [];
let usedKnights = new Set(); 
let generatedKnightsGlobal = new Set(); 
let currentTeamCount = 1;
let currentModal = null;

// Element and Function Emojis
const ELEMENT_EMOJI = {
    fogo: '🔥',
    agua: '💧',
    terra: '⛰️',
    vento: '🌪️',
    luz: '✨',
    trevas: '💜'
};

const FUNCTION_EMOJI = {
    tanque: '🛡️',
    guerreiro: '⚔️',
    mago: '🔮',
    assassino: '🗡️',
    suporte: '💊'
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    loadKnightsData();
    initializeEventListeners();
});

async function loadKnightsData() {
    try {
        const response = await fetch('knights_complete.json');
        knightsData = await response.json();
        
        // 1. APLICAR CONFIGURAÇÃO MÁXIMA CORRETA
        // Elementais: Max Nível 30 (Hab 4)
        // Luz/Trevas: Max Nível 40 (Hab 4 + Stats)
        knightsData.forEach(k => {
            const isMeta = ['luz', 'trevas'].includes(k.elemento);
            k.disponivel = true;
            k.armadura = isMeta ? 40 : 30; // Níveis reais do jogo
            k.constelacao = '9p';
        });

        loadConfigurations();
        
        initializeConfigTab();
        initializePvpAtaqueTab(1);
        initializePveTab(1);
        initializeAnaliseTab(1);
        
        console.log(`✅ Loaded ${knightsData.length} knights with Real Armor Levels`);
    } catch (error) {
        console.error('Error loading knights data:', error);
        alert('Erro ao carregar dados. Verifique o console.');
    }
}

function loadConfigurations() {
    const saved = localStorage.getItem('knightsConfig');
    if (saved) {
        try {
            const configs = JSON.parse(saved);
            knightsData.forEach(knight => {
                const config = configs[knight.id];
                if (config) {
                    knight.disponivel = config.disponivel;
                    
                    // Validação de segurança para o limite de elementais
                    const isMeta = ['luz', 'trevas'].includes(knight.elemento);
                    let loadedArmor = config.armadura;
                    
                    // Se tentar carregar 40 em um elemental, força 30
                    if (!isMeta && loadedArmor > 30) loadedArmor = 30;
                    
                    knight.armadura = loadedArmor;
                    knight.constelacao = config.constelacao;
                }
            });
        } catch (error) {
            console.error('Error loading configurations:', error);
        }
    }
}

function saveConfigurations() {
    const configs = {};
    knightsData.forEach(knight => {
        configs[knight.id] = {
            disponivel: knight.disponivel,
            armadura: knight.armadura,
            constelacao: knight.constelacao
        };
    });
    localStorage.setItem('knightsConfig', JSON.stringify(configs));
}

// ============================================
// EVENT LISTENERS
// ============================================

function initializeEventListeners() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
    
    document.querySelectorAll('.team-count-selector').forEach(selector => {
        selector.querySelectorAll('.count-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const parent = this.closest('.team-count-selector');
                parent.querySelectorAll('.count-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const count = parseInt(this.dataset.count);
                const tabId = this.closest('.tab-content').id;
                
                if (tabId === 'pvp-ataque') initializePvpAtaqueTab(count);
                else if (tabId === 'pve') initializePveTab(count);
                else if (tabId === 'analise') initializeAnaliseTab(count);
                else if (tabId === 'pvp-defesa') currentTeamCount = count;
            });
        });
    });
    
    // Boss Selectors
    document.querySelectorAll('.boss-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.boss-type-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateBossSequence(parseInt(this.dataset.type));
        });
    });
    
    // Vacuo Logic
    document.querySelectorAll('.vacuo-boss-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.vacuo-boss-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    document.querySelectorAll('.elem-check, .func-check').forEach(checkbox => {
        checkbox.addEventListener('change', validateVacuoLimiters);
    });
    
    // Buttons
    document.getElementById('btn-generate-pvp-ataque')?.addEventListener('click', generatePvpAtaqueTeams);
    document.getElementById('btn-generate-pvp-defesa')?.addEventListener('click', generatePvpDefesaTeams);
    document.getElementById('btn-generate-pve')?.addEventListener('click', generatePveTeams);
    document.getElementById('btn-generate-boss-mundial')?.addEventListener('click', generateBossMundialTeam);
    document.getElementById('btn-generate-boss-reliquias')?.addEventListener('click', generateBossReliquiasTeam);
    document.getElementById('btn-generate-boss-vacuo')?.addEventListener('click', generateBossVacuoTeam);
    document.getElementById('btn-generate-analise')?.addEventListener('click', generateAnalise);
    
    // Config
    document.getElementById('btn-enable-all')?.addEventListener('click', () => toggleAllKnights(true));
    document.getElementById('btn-disable-all')?.addEventListener('click', () => toggleAllKnights(false));
    document.getElementById('btn-max-all')?.addEventListener('click', maximizeAllKnights);
    
    // Search & Modal
    document.getElementById('knight-search')?.addEventListener('input', filterKnightsConfig);
    document.getElementById('modal-search')?.addEventListener('input', filterModalKnights);
    document.querySelector('.modal-close')?.addEventListener('click', closeModal);
    document.getElementById('knight-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'knight-modal') closeModal();
    });
}

function switchTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === tabId);
    });
}

// ============================================
// UI HELPERS
// ============================================

function renderKnightCard(knight) {
    const isMeta = ['luz', 'trevas'].includes(knight.elemento);
    const borderColor = isMeta ? 'var(--elem-luz)' : 'var(--bg-tertiary)';
    
    return `
        <div class="result-knight-card" style="border-color: ${borderColor}">
            <img src="${knight.imagem}" alt="${knight.nome}" class="knight-image" onerror="this.src='assets/placeholder.webp'">
            <div class="knight-name">${knight.nome}</div>
            <div class="knight-info">
                <span class="knight-badge">${ELEMENT_EMOJI[knight.elemento]}</span>
                <span class="knight-badge">${FUNCTION_EMOJI[knight.funcao]}</span>
            </div>
            <div class="knight-stats-mini" style="font-size: 0.7rem; color: #888; margin-top: 4px;">
                Armadura Nv ${knight.armadura} | ${knight.constelacao}
            </div>
        </div>
    `;
}

// Helper para calcular bônus baseado no nível da armadura
function getArmorBonus(level) {
    // 0 = 0 pts
    // 1 = 1 pt
    // 10 = 5 pts
    // 20 = 10 pts
    // 30 = 15 pts (Max Hab)
    // 40 = 20 pts (Max Stats L/T)
    return level / 2;
}

// ============================================
// PVP ATAQUE
// ============================================

function initializePvpAtaqueTab(teamCount) {
    currentTeamCount = teamCount;
    usedKnights.clear(); 
    
    const container = document.getElementById('pvp-ataque-teams');
    container.innerHTML = '';
    
    for (let i = 0; i < teamCount; i++) {
        container.appendChild(createTeamBuilder(`Time Inimigo ${i + 1}`, `pvp-ataque-team-${i}`));
    }
    document.getElementById('pvp-ataque-results').innerHTML = '';
}

function generatePvpAtaqueTeams() {
    const results = document.getElementById('pvp-ataque-results');
    results.innerHTML = '<h3>Gerando contra-times letais...</h3>';
    
    generatedKnightsGlobal.clear();
    
    const enemyTeams = [];
    for (let i = 0; i < currentTeamCount; i++) {
        const team = getTeamKnights(`pvp-ataque-team-${i}`);
        if (team.length === 0) {
            results.innerHTML = `<p style="color: var(--accent-red);">⚠️ Time Inimigo ${i + 1} está vazio!</p>`;
            return;
        }
        enemyTeams.push(team);
    }
    
    const counterTeams = enemyTeams.map((enemyTeam, i) => {
        const bestTeam = generateOptimalCounterTeam(enemyTeam, true);
        bestTeam.forEach(k => generatedKnightsGlobal.add(k.id));
        
        return {
            index: i + 1,
            enemyTeam,
            counterTeam: bestTeam
        };
    });
    
    results.innerHTML = counterTeams.map(({ index, enemyTeam, counterTeam }) => `
        <div class="result-team">
            <h3>Contra-Time ${index} (Foco: Burst & Speed)</h3>
            <div class="result-knights">
                ${counterTeam.map(k => renderKnightCard(k)).join('')}
            </div>
            <div class="strategy-box">
                <h4>⚔️ Estratégia de Ataque</h4>
                <p>${generateStrategy(counterTeam, enemyTeam)}</p>
            </div>
        </div>
    `).join('');
}

function generateOptimalCounterTeam(enemyTeam, isAttackMode = true) {
    const available = knightsData.filter(k => 
        k.disponivel && 
        !usedKnights.has(k.id) && 
        !generatedKnightsGlobal.has(k.id)
    );
    
    const scored = available.map(knight => ({
        knight,
        score: calculateCounterScore(knight, enemyTeam, isAttackMode)
    }));
    
    scored.sort((a, b) => b.score - a.score);
    
    const team = [];
    const roles = { tanque: 0, suporte: 0, guerreiro: 0, mago: 0, assassino: 0 };
    
    for (const { knight } of scored) {
        if (team.length >= 5) break;
        
        const maxTanks = isAttackMode ? 1 : 2;
        
        if (roles[knight.funcao] < 3) { 
             if (isAttackMode && knight.funcao === 'tanque' && roles.tanque >= maxTanks) continue;
             
             team.push(knight);
             roles[knight.funcao]++;
        }
    }
    
    return team;
}

function calculateCounterScore(knight, enemyTeam, isAttackMode) {
    let score = 50; 
    
    // Supremacia Luz/Trevas
    if (knight.elemento === 'luz' || knight.elemento === 'trevas') score += 25;

    enemyTeam.forEach(enemy => {
        if (hasElementalAdvantage(knight.elemento, enemy.elemento)) score += 15;
    });
    
    if (isAttackMode) {
        if (knight.tags.includes('velocidade') || knight.tags.includes('velocidade_extrema')) score += 30;
        if (knight.tags.includes('execute')) score += 25;
        if (knight.tags.includes('burst') || knight.tags.includes('high_dps')) score += 20;
        if (knight.tags.includes('anti_cura')) score += 25;
        if (knight.tags.includes('anti_revive')) score += 30;
        if (knight.funcao === 'assassino') score += 15;
    } else {
        if (knight.tags.includes('controle') || knight.tags.includes('cc')) score += 20;
    }
    
    const hasTanks = enemyTeam.some(e => e.funcao === 'tanque');
    const hasHealers = enemyTeam.some(e => e.funcao === 'suporte');
    const hasShields = enemyTeam.some(e => e.tags.includes('escudo'));
    
    if (hasTanks && (knight.tags.includes('dano_hp') || knight.tags.includes('dano_real'))) score += 25;
    if (hasHealers && knight.tags.includes('anti_cura')) score += 30;
    if (hasShields && knight.tags.includes('anti_escudo')) score += 30;
    
    score += getArmorBonus(knight.armadura);
    if (knight.constelacao === '9p') score += 10;
    
    return score;
}

// ============================================
// PVP DEFESA
// ============================================

function generatePvpDefesaTeams() {
    const results = document.getElementById('pvp-defesa-results');
    results.innerHTML = '<h3>Construindo muralhas defensivas...</h3>';
    
    generatedKnightsGlobal.clear();
    usedKnights.clear(); 
    
    const teams = [];
    for (let i = 0; i < currentTeamCount; i++) {
        const team = generateDefensiveTeam();
        team.forEach(k => generatedKnightsGlobal.add(k.id));
        teams.push(team);
    }
    
    results.innerHTML = teams.map((team, i) => `
        <div class="result-team">
            <h3>Time Defensivo ${i + 1} (Foco: Stall & Survive)</h3>
            <div class="result-knights">
                ${team.map(k => renderKnightCard(k)).join('')}
            </div>
            <div class="strategy-box">
                <h4>🛡️ Objetivo: Sobreviver ao Timer</h4>
                <p>Time focado em Imortalidade, Revive e Controle para esgotar o tempo do atacante.</p>
            </div>
        </div>
    `).join('');
}

function generateDefensiveTeam() {
    const available = knightsData.filter(k => 
        k.disponivel && 
        !generatedKnightsGlobal.has(k.id)
    );
    
    const scored = available.map(knight => ({
        knight,
        score: calculateDefenseScore(knight)
    }));
    
    scored.sort((a, b) => b.score - a.score);
    
    const team = [];
    const roles = { tanque: 0, suporte: 0 };
    
    for (const { knight } of scored) {
        if (team.length >= 5) break;
        
        if (team.length < 4) {
             if (knight.funcao !== 'tanque' && knight.funcao !== 'suporte' && knight.funcao !== 'mago') {
                 if (!knight.tags.includes('cc') && !knight.tags.includes('controle')) continue;
             }
        }
        
        team.push(knight);
        if (knight.funcao === 'tanque') roles.tanque++;
        if (knight.funcao === 'suporte') roles.suporte++;
    }
    
    return team;
}

function calculateDefenseScore(knight) {
    let score = 40;
    
    if (knight.elemento === 'luz' || knight.elemento === 'trevas') score += 25;
    
    if (knight.tags.includes('imortalidade')) score += 60;
    if (knight.tags.includes('revive')) score += 50;
    if (knight.tags.includes('escudo') || knight.tags.includes('escudo_global')) score += 40;
    if (knight.tags.includes('cura') || knight.tags.includes('cura_massiva')) score += 35;
    if (knight.tags.includes('cc') || knight.tags.includes('controle')) score += 30;
    if (knight.tags.includes('reflexao_dano')) score += 25;
    
    if (knight.funcao === 'tanque') score += 20;
    if (knight.funcao === 'suporte') score += 20;
    
    score += getArmorBonus(knight.armadura);
    
    return score;
}

// ============================================
// BOSS MODES (CORRIGIDO: MAX DANO + SOBREVIVÊNCIA)
// ============================================

function calculateBossScore(knight) {
    let score = 30; // Base menor, foco em utilidade
    
    // Supremacia de status Luz/Trevas
    if (knight.elemento === 'luz' || knight.elemento === 'trevas') score += 25;
    
    // 1. MAXIMIZAR DANO (AMPLIFICADORES)
    // Debuffs que multiplicam dano são mais valiosos que dano puro
    if (knight.tags.includes('reduz_defesa')) score += 100; // OBRIGATÓRIO
    if (knight.tags.includes('vulnerabilidade')) score += 90; // OBRIGATÓRIO
    if (knight.tags.includes('buff_ataque')) score += 70;
    if (knight.tags.includes('bateria') || knight.tags.includes('roubo_energia')) score += 60; // Mais ults = mais dano
    
    // Tipos de Dano
    if (knight.tags.includes('boss_killer') || knight.tags.includes('single_target')) score += 50;
    if (knight.tags.includes('dano_real')) score += 40; // Ignora defesa alta
    if (knight.tags.includes('aceleracao') || knight.tags.includes('velocidade')) score += 40;
    
    // 2. SOBREVIVÊNCIA (PONTOS DE UTILIDADE)
    // Pontua, mas não define sozinho (usaremos lógica de seleção para garantir 1 sup)
    if (knight.tags.includes('escudo_global')) score += 30;
    if (knight.tags.includes('cura_massiva')) score += 30;
    if (knight.tags.includes('cura')) score += 20;

    score += getArmorBonus(knight.armadura);
    if (knight.constelacao === '9p') score += 10;

    return score;
}

function generateBossTeam(customFilter = null) {
    let available = knightsData.filter(k => k.disponivel && !generatedKnightsGlobal.has(k.id));
    
    // Aplica filtro customizado se houver (ex: Vácuo)
    if (customFilter) {
        available = available.filter(customFilter);
    }
    
    // Score de Dano/Utilidade
    const scored = available.map(knight => ({
        knight,
        score: calculateBossScore(knight)
    }));
    
    // Score separado para Sobrevivência (quem segura o time vivo)
    const survivalScored = available.map(knight => {
        let survScore = 0;
        if (knight.tags.includes('cura_massiva')) survScore += 50;
        if (knight.tags.includes('escudo_global')) survScore += 50;
        if (knight.tags.includes('cura')) survScore += 30;
        if (knight.tags.includes('escudo')) survScore += 20;
        if (knight.funcao === 'suporte') survScore += 20;
        if (knight.elemento === 'luz' || knight.elemento === 'trevas') survScore += 20; // Status base
        return { knight, score: survScore };
    });

    const team = [];
    const teamIds = new Set();

    // 1º SLOT: GARANTIR SOBREVIVÊNCIA
    // Pega o melhor healer/shielder disponível
    survivalScored.sort((a, b) => b.score - a.score);
    const bestSurvival = survivalScored[0];
    
    if (bestSurvival && bestSurvival.score > 30) {
        team.push(bestSurvival.knight);
        teamIds.add(bestSurvival.knight.id);
    }

    // 4 SLOTS RESTANTES: MAXIMIZAR DANO
    scored.sort((a, b) => b.score - a.score);
    
    for (const { knight } of scored) {
        if (team.length >= 5) break;
        if (teamIds.has(knight.id)) continue;
        
        team.push(knight);
        teamIds.add(knight.id);
    }
    
    return team;
}

function generateBossMundialTeam() {
    const results = document.getElementById('boss-mundial-results');
    results.innerHTML = '<h3>Gerando time para Boss Mundial...</h3>';
    generatedKnightsGlobal.clear();
    
    const team = generateBossTeam();
    
    renderBossResult(results, team, "Boss Mundial", "1 Suporte de Sobrevivência + 4 Amplificadores/DPS para Score Máximo.");
}

function generateBossReliquiasTeam() {
    const results = document.getElementById('boss-reliquias-results');
    results.innerHTML = '<h3>Gerando time para Boss Relíquias...</h3>';
    generatedKnightsGlobal.clear();

    const team = generateBossTeam();
    
    renderBossResult(results, team, "Relíquias", "Foco total em Debuffs (Defesa/Vuln) mantendo o time vivo até o fim.");
}

function renderBossResult(container, team, title, strategy) {
    container.innerHTML = `
        <div class="result-team">
            <h3>Time Otimizado: ${title}</h3>
            <div class="result-knights">
                ${team.map(k => renderKnightCard(k)).join('')}
            </div>
            <div class="strategy-box">
                <h4>⚔️ Estratégia: Dano Máximo + Sobrevivência</h4>
                <p>${strategy}</p>
                <p style="font-size: 0.9em; margin-top: 5px; color: #aaa;">
                    Composição: 1 Pilar de Sobrevivência (Cura/Escudo) e 4 Especialistas em Dano/Debuff.
                </p>
            </div>
        </div>
    `;
}

// ============================================
// VÁCUO
// ============================================

function generateBossVacuoTeam() {
    const blockedElements = Array.from(document.querySelectorAll('.elem-check:checked')).map(c => c.value);
    const blockedFunctions = Array.from(document.querySelectorAll('.func-check:checked')).map(c => c.value);
    
    const results = document.getElementById('boss-vacuo-results');
    results.innerHTML = '<h3>Gerando time para Boss Vácuo...</h3>';
    generatedKnightsGlobal.clear();
    
    const vacuoFilter = (k) => 
        !blockedElements.includes(k.elemento) &&
        !blockedFunctions.includes(k.funcao);
        
    const team = generateBossTeam(vacuoFilter);
    
    results.innerHTML = `
        <div class="result-team">
            <h3>Time para Boss Vácuo</h3>
            <div class="result-knights">
                ${team.map(k => renderKnightCard(k)).join('')}
            </div>
            <div class="strategy-box">
                <h4>🌀 Limitadores Respeitados</h4>
                <p>Excluídos: ${blockedElements.join(', ')} e ${blockedFunctions.join(', ')}.</p>
                <p>Prioridade: Sobreviver aos ilusões e causar dano máximo.</p>
            </div>
        </div>
    `;
}

// ============================================
// HELPERS GERAIS
// ============================================

function createTeamBuilder(title, teamId) {
    const div = document.createElement('div');
    div.className = 'team-builder';
    div.innerHTML = `
        <h3>${title}</h3>
        <div class="team-slots" id="${teamId}">
            ${Array(5).fill().map((_, i) => `
                <div class="knight-slot" data-team="${teamId}" data-slot="${i}">
                    <div class="slot-placeholder">Clique para selecionar</div>
                </div>
            `).join('')}
        </div>
    `;
    div.querySelectorAll('.knight-slot').forEach(slot => {
        slot.addEventListener('click', () => openKnightSelector(slot));
    });
    return div;
}

function openKnightSelector(slot) {
    if (slot.classList.contains('filled')) return;
    currentModal = { slot };
    document.getElementById('knight-modal').classList.add('active');
    renderModalKnights();
}

function renderModalKnights(filter = '') {
    const grid = document.getElementById('modal-knights-grid');
    grid.innerHTML = '';
    
    const available = knightsData.filter(k => 
        k.disponivel && 
        !usedKnights.has(k.id) &&
        (filter === '' || k.nome.toLowerCase().includes(filter.toLowerCase()))
    );
    
    available.forEach(knight => {
        const card = document.createElement('div');
        const isMeta = ['luz', 'trevas'].includes(knight.elemento);
        card.className = 'modal-knight-card';
        if(isMeta) card.style.borderColor = 'var(--elem-luz)';
        
        card.innerHTML = `
            <img src="${knight.imagem}" alt="${knight.nome}" class="modal-knight-image" onerror="this.src='assets/placeholder.webp'">
            <div class="modal-knight-name">${knight.nome}</div>
            <div class="modal-knight-element">${ELEMENT_EMOJI[knight.elemento]} ${knight.elemento}</div>
        `;
        card.addEventListener('click', () => selectKnight(knight));
        grid.appendChild(card);
    });
}

function selectKnight(knight) {
    if (!currentModal || !currentModal.slot) return;
    const slot = currentModal.slot;
    slot.classList.add('filled');
    slot.innerHTML = `
        <div class="knight-card">
            <img src="${knight.imagem}" alt="${knight.nome}" class="knight-image" onerror="this.src='assets/placeholder.webp'">
            <div class="knight-name">${knight.nome}</div>
            <div class="knight-info">
                <span class="knight-badge">${ELEMENT_EMOJI[knight.elemento]}</span>
                <span class="knight-badge">${FUNCTION_EMOJI[knight.funcao]}</span>
            </div>
        </div>
        <button class="remove-knight" onclick="removeKnight(this)">×</button>
    `;
    slot.dataset.knightId = knight.id;
    usedKnights.add(knight.id);
    closeModal();
}

function removeKnight(btn) {
    const slot = btn.closest('.knight-slot');
    const knightId = parseInt(slot.dataset.knightId);
    usedKnights.delete(knightId);
    slot.classList.remove('filled');
    slot.innerHTML = '<div class="slot-placeholder">Clique para selecionar</div>';
    delete slot.dataset.knightId;
}

function closeModal() {
    document.getElementById('knight-modal').classList.remove('active');
    currentModal = null;
}

function filterModalKnights(e) { renderModalKnights(e.target.value); }
function filterKnightsConfig(e) { renderKnightsConfig(e.target.value); }
function getTeamKnights(teamId) {
    const slots = document.querySelectorAll(`#${teamId} .knight-slot.filled`);
    return Array.from(slots)
        .map(slot => knightsData.find(k => k.id === parseInt(slot.dataset.knightId)))
        .filter(k => k);
}
function hasElementalAdvantage(attacker, defender) {
    const advantages = { agua: 'fogo', fogo: 'vento', vento: 'terra', terra: 'agua', luz: 'trevas', trevas: 'luz' };
    return advantages[attacker] === defender;
}
function generateStrategy(team, enemyTeam) {
    const core = team.find(k => k.tags.includes('core') || k.tags.includes('dps') || k.tags.includes('controle'));
    return core ? `Foco em ${core.nome} para definir o ritmo.` : "Time balanceado para counterar mecânicas inimigas.";
}

// Config Functions - ATUALIZADAS PARA ESCALA 0-40
function initializeConfigTab() { renderKnightsConfig(); }

function renderKnightsConfig(filter = '') {
    const container = document.getElementById('knights-config-list');
    const filtered = knightsData.filter(k => filter === '' || k.nome.toLowerCase().includes(filter.toLowerCase()));
    
    container.innerHTML = filtered.map(knight => {
        const isMeta = ['luz', 'trevas'].includes(knight.elemento);
        
        return `
        <div class="knight-config-item ${knight.disponivel ? '' : 'disabled'}">
            <img src="${knight.imagem}" class="knight-config-avatar" onerror="this.src='assets/placeholder.webp'">
            <div class="knight-config-info">
                <h4>${knight.nome}</h4>
                <p>${ELEMENT_EMOJI[knight.elemento]} | ${FUNCTION_EMOJI[knight.funcao]}</p>
            </div>
            
            <select onchange="updateKnightConfig(${knight.id}, 'armadura', this.value)" style="min-width: 140px;">
                <option value="0" ${knight.armadura == 0 ? 'selected' : ''}>Nível 0 (Sem Hab)</option>
                <option value="1" ${knight.armadura == 1 ? 'selected' : ''}>Nível 1 (Hab 1)</option>
                <option value="10" ${knight.armadura == 10 ? 'selected' : ''}>Nível 10 (Hab 2)</option>
                <option value="20" ${knight.armadura == 20 ? 'selected' : ''}>Nível 20 (Hab 3)</option>
                <option value="30" ${knight.armadura == 30 ? 'selected' : ''}>Nível 30 (Hab 4)</option>
                ${isMeta ? `<option value="40" ${knight.armadura == 40 ? 'selected' : ''}>Nível 40 (Max Stats)</option>` : ''}
            </select>
            
            <select onchange="updateKnightConfig(${knight.id}, 'constelacao', this.value)">
                <option value="0p" ${knight.constelacao == '0p' ? 'selected' : ''}>0 pontos</option>
                <option value="3p" ${knight.constelacao == '3p' ? 'selected' : ''}>3 pontos</option>
                <option value="9p" ${knight.constelacao == '9p' ? 'selected' : ''}>9 pontos</option>
            </select>
            
            <input type="checkbox" ${knight.disponivel ? 'checked' : ''} onchange="updateKnightConfig(${knight.id}, 'disponivel', this.checked)">
        </div>
        `;
    }).join('');
}

function updateKnightConfig(id, field, value) {
    const k = knightsData.find(x => x.id === id);
    if(k) { k[field] = field === 'disponivel' ? value : (field === 'armadura' ? parseInt(value) : value); saveConfigurations(); }
}
function toggleAllKnights(enable) { knightsData.forEach(k => k.disponivel = enable); saveConfigurations(); renderKnightsConfig(); }

function maximizeAllKnights() { 
    knightsData.forEach(k => { 
        const isMeta = ['luz', 'trevas'].includes(k.elemento);
        k.armadura = isMeta ? 40 : 30; // Maximiza para 40 (Meta) ou 30 (Elementais)
        k.constelacao = '9p'; 
    }); 
    saveConfigurations(); 
    renderKnightsConfig(); 
}

function initializePveTab(c) { initializePvpAtaqueTab(c); } 
function generatePveTeams() { generatePvpAtaqueTeams(); } 
function initializeAnaliseTab(c) { initializePvpAtaqueTab(c); }
function generateAnalise() { /* Mantido */ }
function validateVacuoLimiters() { /* Mantido */ }