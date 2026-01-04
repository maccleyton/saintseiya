// ============================================
// SAINT SEIYA TEAM BUILDER - JAVASCRIPT
// Complete Team Building System
// ============================================

// Global State
let knightsData = [];
let usedKnights = new Set();
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
        
        // Load saved configurations from localStorage
        loadConfigurations();
        
        // Initialize all tabs
        initializeConfigTab();
        initializePvpAtaqueTab(1);
        initializePveTab(1);
        initializeAnaliseTab(1);
        
        console.log(`✅ Loaded ${knightsData.length} knights`);
    } catch (error) {
        console.error('Error loading knights data:', error);
        alert('Erro ao carregar dados dos cavaleiros. Verifique se o arquivo knights_complete.json está na mesma pasta.');
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
                    knight.armadura = config.armadura;
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
    // Tab navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
    
    // Team count selectors
    document.querySelectorAll('.team-count-selector').forEach(selector => {
        selector.querySelectorAll('.count-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const parent = this.closest('.team-count-selector');
                parent.querySelectorAll('.count-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const count = parseInt(this.dataset.count);
                const tabId = this.closest('.tab-content').id;
                
                if (tabId === 'pvp-ataque') {
                    initializePvpAtaqueTab(count);
                } else if (tabId === 'pve') {
                    initializePveTab(count);
                } else if (tabId === 'analise') {
                    initializeAnaliseTab(count);
                } else if (tabId === 'pvp-defesa') {
                    currentTeamCount = count;
                }
            });
        });
    });
    
    // Boss type selectors
    document.querySelectorAll('.boss-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.boss-type-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateBossSequence(parseInt(this.dataset.type));
        });
    });
    
    // Vacuo boss selectors
    document.querySelectorAll('.vacuo-boss-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.vacuo-boss-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Vacuo checkboxes
    document.querySelectorAll('.elem-check, .func-check').forEach(checkbox => {
        checkbox.addEventListener('change', validateVacuoLimiters);
    });
    
    // Generate buttons
    document.getElementById('btn-generate-pvp-ataque')?.addEventListener('click', generatePvpAtaqueTeams);
    document.getElementById('btn-generate-pvp-defesa')?.addEventListener('click', generatePvpDefesaTeams);
    document.getElementById('btn-generate-pve')?.addEventListener('click', generatePveTeams);
    document.getElementById('btn-generate-boss-mundial')?.addEventListener('click', generateBossMundialTeam);
    document.getElementById('btn-generate-boss-reliquias')?.addEventListener('click', generateBossReliquiasTeam);
    document.getElementById('btn-generate-boss-vacuo')?.addEventListener('click', generateBossVacuoTeam);
    document.getElementById('btn-generate-analise')?.addEventListener('click', generateAnalise);
    
    // Config buttons
    document.getElementById('btn-enable-all')?.addEventListener('click', () => toggleAllKnights(true));
    document.getElementById('btn-disable-all')?.addEventListener('click', () => toggleAllKnights(false));
    document.getElementById('btn-max-all')?.addEventListener('click', maximizeAllKnights);
    
    // Search
    document.getElementById('knight-search')?.addEventListener('input', filterKnightsConfig);
    document.getElementById('modal-search')?.addEventListener('input', filterModalKnights);
    
    // Modal
    document.querySelector('.modal-close')?.addEventListener('click', closeModal);
    document.getElementById('knight-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'knight-modal') closeModal();
    });
}

// ============================================
// TAB SWITCHING
// ============================================

function switchTab(tabId) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === tabId);
    });
}

// ============================================
// PVP ATAQUE TAB
// ============================================

function initializePvpAtaqueTab(teamCount) {
    currentTeamCount = teamCount;
    usedKnights.clear();
    
    const container = document.getElementById('pvp-ataque-teams');
    container.innerHTML = '';
    
    for (let i = 0; i < teamCount; i++) {
        const teamDiv = createTeamBuilder(`Time Inimigo ${i + 1}`, `pvp-ataque-team-${i}`);
        container.appendChild(teamDiv);
    }
    
    document.getElementById('pvp-ataque-results').innerHTML = '';
}

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
    
    // Add click listeners to slots
    div.querySelectorAll('.knight-slot').forEach(slot => {
        slot.addEventListener('click', () => openKnightSelector(slot));
    });
    
    return div;
}

function openKnightSelector(slot) {
    if (slot.classList.contains('filled')) return;
    
    currentModal = { slot };
    const modal = document.getElementById('knight-modal');
    modal.classList.add('active');
    
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
        card.className = 'modal-knight-card';
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
                <span class="knight-badge">${ELEMENT_EMOJI[knight.elemento]} ${knight.elemento}</span>
                <span class="knight-badge">${FUNCTION_EMOJI[knight.funcao]} ${knight.funcao}</span>
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

function filterModalKnights(e) {
    renderModalKnights(e.target.value);
}

// ============================================
// TEAM GENERATION - PVP ATAQUE
// ============================================

function generatePvpAtaqueTeams() {
    const results = document.getElementById('pvp-ataque-results');
    results.innerHTML = '<h3>Gerando contra-times...</h3>';
    
    const enemyTeams = [];
    for (let i = 0; i < currentTeamCount; i++) {
        const team = getTeamKnights(`pvp-ataque-team-${i}`);
        if (team.length === 0) {
            results.innerHTML = `<p style="color: var(--accent-red);">⚠️ Time Inimigo ${i + 1} está vazio!</p>`;
            return;
        }
        enemyTeams.push(team);
    }
    
    // Generate counter teams
    const counterTeams = enemyTeams.map((enemyTeam, i) => ({
        index: i + 1,
        enemyTeam,
        counterTeam: generateOptimalCounterTeam(enemyTeam)
    }));
    
    // Render results
    results.innerHTML = counterTeams.map(({ index, enemyTeam, counterTeam }) => `
        <div class="result-team">
            <h3>Contra-Time ${index}</h3>
            <div class="result-knights">
                ${counterTeam.map(k => renderKnightCard(k)).join('')}
            </div>
            <div class="strategy-box">
                <h4>💡 Estratégia</h4>
                <p>${generateStrategy(counterTeam, enemyTeam)}</p>
            </div>
        </div>
    `).join('');
}

function getTeamKnights(teamId) {
    const slots = document.querySelectorAll(`#${teamId} .knight-slot.filled`);
    return Array.from(slots)
        .map(slot => knightsData.find(k => k.id === parseInt(slot.dataset.knightId)))
        .filter(k => k);
}

function generateOptimalCounterTeam(enemyTeam) {
    const available = knightsData.filter(k => k.disponivel && !usedKnights.has(k.id));
    
    // Score each knight
    const scored = available.map(knight => ({
        knight,
        score: calculateCounterScore(knight, enemyTeam)
    }));
    
    // Sort by score
    scored.sort((a, b) => b.score - a.score);
    
    // Select top 5 with role balance
    const team = [];
    const roles = { tanque: 0, suporte: 0, guerreiro: 0, mago: 0, assassino: 0 };
    
    for (const { knight } of scored) {
        if (team.length >= 5) break;
        
        // Ensure role diversity
        if (roles[knight.funcao] < 2 || team.length >= 4) {
            team.push(knight);
            roles[knight.funcao]++;
            usedKnights.add(knight.id);
        }
    }
    
    return team;
}

function calculateCounterScore(knight, enemyTeam) {
    let score = 50; // Base score
    
    // Elemental advantage
    enemyTeam.forEach(enemy => {
        if (hasElementalAdvantage(knight.elemento, enemy.elemento)) {
            score += 15;
        }
    });
    
    // Amplifier tags
    if (knight.tags.includes('reduz_defesa')) score += 30;
    if (knight.tags.includes('vulnerabilidade')) score += 25;
    if (knight.tags.includes('buff_ataque')) score += 20;
    
    // Tank/Healer counters
    const hasTanks = enemyTeam.some(e => e.funcao === 'tanque');
    const hasHealers = enemyTeam.some(e => e.funcao === 'suporte');
    
    if (hasTanks && knight.tags.includes('execute')) score += 25;
    if (hasHealers && knight.tags.includes('anti_cura')) score += 25;
    
    // Configuration bonuses
    score += knight.armadura / 10;
    if (knight.constelacao === '9p') score += 15;
    else if (knight.constelacao === '3p') score += 5;
    
    return score;
}

function hasElementalAdvantage(attacker, defender) {
    const advantages = {
        agua: 'fogo',
        fogo: 'vento',
        vento: 'terra',
        terra: 'agua',
        luz: 'trevas',
        trevas: 'luz'
    };
    return advantages[attacker] === defender;
}

function renderKnightCard(knight) {
    return `
        <div class="result-knight-card">
            <img src="${knight.imagem}" alt="${knight.nome}" class="knight-image" onerror="this.src='assets/placeholder.webp'">
            <div class="knight-name">${knight.nome}</div>
            <div class="knight-info">
                <span class="knight-badge">${ELEMENT_EMOJI[knight.elemento]}</span>
                <span class="knight-badge">${FUNCTION_EMOJI[knight.funcao]}</span>
            </div>
        </div>
    `;
}

function generateStrategy(team, enemyTeam) {
    const strategies = [];
    
    const amplifiers = team.filter(k => k.tags.includes('reduz_defesa') || k.tags.includes('vulnerabilidade'));
    if (amplifiers.length > 0) {
        strategies.push(`Use ${amplifiers[0].nome} para amplificar dano no time inimigo`);
    }
    
    const healers = team.filter(k => k.funcao === 'suporte');
    if (healers.length > 0) {
        strategies.push(`${healers[0].nome} fornece sustentação para luta prolongada`);
    }
    
    const counters = team.filter(k => 
        k.tags.includes('anti_cura') || 
        k.tags.includes('execute') || 
        k.tags.includes('cc')
    );
    if (counters.length > 0) {
        strategies.push(`${counters[0].nome} countera elementos-chave do time inimigo`);
    }
    
    return strategies.join('. ') || 'Time balanceado com boa distribuição de funções.';
}

// ============================================
// PVP DEFESA
// ============================================

function generatePvpDefesaTeams() {
    const count = currentTeamCount;
    const results = document.getElementById('pvp-defesa-results');
    results.innerHTML = '<h3>Gerando times defensivos...</h3>';
    
    usedKnights.clear();
    const teams = [];
    
    for (let i = 0; i < count; i++) {
        teams.push(generateDefensiveTeam());
    }
    
    results.innerHTML = teams.map((team, i) => `
        <div class="result-team">
            <h3>Time Defensivo ${i + 1}</h3>
            <div class="result-knights">
                ${team.map(k => renderKnightCard(k)).join('')}
            </div>
            <div class="strategy-box">
                <h4>🛡️ Estratégia Defensiva</h4>
                <p>Time focado em sobrevivência com ${team.filter(k => k.funcao === 'tanque').length} tanque(s) e ${team.filter(k => k.funcao === 'suporte').length} suporte(s).</p>
            </div>
        </div>
    `).join('');
}

function generateDefensiveTeam() {
    const available = knightsData.filter(k => k.disponivel && !usedKnights.has(k.id));
    
    const scored = available.map(knight => ({
        knight,
        score: calculateDefenseScore(knight)
    }));
    
    scored.sort((a, b) => b.score - a.score);
    
    const team = [];
    const roles = { tanque: 0, suporte: 0 };
    
    // Prioritize tanks and healers
    for (const { knight } of scored) {
        if (team.length >= 5) break;
        
        if ((knight.funcao === 'tanque' && roles.tanque < 2) ||
            (knight.funcao === 'suporte' && roles.suporte < 2) ||
            (team.length >= 3 && knight.funcao !== 'tanque' && knight.funcao !== 'suporte')) {
            team.push(knight);
            if (knight.funcao === 'tanque') roles.tanque++;
            if (knight.funcao === 'suporte') roles.suporte++;
            usedKnights.add(knight.id);
        }
    }
    
    return team;
}

function calculateDefenseScore(knight) {
    let score = 40;
    
    if (knight.funcao === 'tanque') score += 40;
    if (knight.funcao === 'suporte') score += 35;
    
    if (knight.tags.includes('cura')) score += 30;
    if (knight.tags.includes('escudo')) score += 25;
    if (knight.tags.includes('imortalidade')) score += 50;
    if (knight.tags.includes('revive')) score += 45;
    
    score += knight.armadura / 10;
    if (knight.constelacao === '9p') score += 15;
    
    return score;
}

// ============================================
// PVE TAB
// ============================================

function initializePveTab(teamCount) {
    currentTeamCount = teamCount;
    usedKnights.clear();
    
    const container = document.getElementById('pve-teams');
    container.innerHTML = '';
    
    for (let i = 0; i < teamCount; i++) {
        const teamDiv = createTeamBuilder(`Time PVE ${i + 1}`, `pve-team-${i}`);
        container.appendChild(teamDiv);
    }
    
    document.getElementById('pve-results').innerHTML = '';
}

function generatePveTeams() {
    const results = document.getElementById('pve-results');
    results.innerHTML = '<h3>Gerando contra-times PVE...</h3>';
    
    const enemyTeams = [];
    for (let i = 0; i < currentTeamCount; i++) {
        const team = getTeamKnights(`pve-team-${i}`);
        if (team.length === 0) {
            results.innerHTML = `<p style="color: var(--accent-red);">⚠️ Time PVE ${i + 1} está vazio!</p>`;
            return;
        }
        enemyTeams.push(team);
    }
    
    usedKnights.clear();
    const counterTeams = enemyTeams.map((enemyTeam, i) => ({
        index: i + 1,
        enemyTeam,
        counterTeam: generateOptimalCounterTeam(enemyTeam)
    }));
    
    results.innerHTML = counterTeams.map(({ index, counterTeam }) => `
        <div class="result-team">
            <h3>Contra-Time PVE ${index}</h3>
            <div class="result-knights">
                ${counterTeam.map(k => renderKnightCard(k)).join('')}
            </div>
        </div>
    `).join('');
}

// ============================================
// BOSS MUNDIAL
// ============================================

function updateBossSequence(type) {
    const sequences = {
        1: ['Geki', 'Babel', 'Moses', 'Saga Maligno'],
        2: ['Geki', 'Babel', 'Capella', 'Saga Maligno'],
        3: ['Io', 'Isaac', 'Krishna', 'Poseidon']
    };
    
    const sequence = sequences[type];
    document.getElementById('boss-mundial-sequence').innerHTML = sequence.map((boss, i) => `
        <span class="boss-tag">${boss}</span>
        ${i < sequence.length - 1 ? '<span class="arrow">→</span>' : ''}
    `).join('');
}

function generateBossMundialTeam() {
    const results = document.getElementById('boss-mundial-results');
    results.innerHTML = '<h3>Gerando time para Boss Mundial...</h3>';
    
    const team = generateBossTeam();
    
    results.innerHTML = `
        <div class="result-team">
            <h3>Time Otimizado para Boss Mundial</h3>
            <div class="result-knights">
                ${team.map(k => renderKnightCard(k)).join('')}
            </div>
            <div class="strategy-box">
                <h4>⚔️ Estratégia</h4>
                <p>Time versátil com amplificadores de dano e sustentação para sequência completa de bosses.</p>
            </div>
        </div>
    `;
}

function generateBossTeam() {
    const available = knightsData.filter(k => k.disponivel);
    
    const scored = available.map(knight => ({
        knight,
        score: calculateBossScore(knight)
    }));
    
    scored.sort((a, b) => b.score - a.score);
    
    return scored.slice(0, 5).map(s => s.knight);
}

function calculateBossScore(knight) {
    let score = 50;
    
    if (knight.tags.includes('reduz_defesa')) score += 50;
    if (knight.tags.includes('vulnerabilidade')) score += 40;
    if (knight.tags.includes('buff_ataque')) score += 35;
    if (knight.tags.includes('buff_velocidade')) score += 30;
    
    if (knight.funcao === 'guerreiro' || knight.funcao === 'mago') score += 25;
    if (knight.funcao === 'suporte' && knight.tags.includes('cura')) score += 20;
    
    score += knight.armadura / 10;
    if (knight.constelacao === '9p') score += 15;
    
    return score;
}

// ============================================
// BOSS RELÍQUIAS
// ============================================

function generateBossReliquiasTeam() {
    const target = document.getElementById('boss-reliquias-target').value;
    const results = document.getElementById('boss-reliquias-results');
    results.innerHTML = '<h3>Gerando time para Boss Relíquias...</h3>';
    
    const team = generateBossTeam(); // Use same logic as Boss Mundial
    
    results.innerHTML = `
        <div class="result-team">
            <h3>Time para Boss Relíquias</h3>
            <div class="result-knights">
                ${team.map(k => renderKnightCard(k)).join('')}
            </div>
            <div class="strategy-box">
                <h4>⚡ Estratégia</h4>
                <p>Time otimizado para ${target === 'all' ? 'todos os bosses' : target}. Foco em amplificadores e DPS sustentado.</p>
            </div>
        </div>
    `;
}

// ============================================
// BOSS VÁCUO
// ============================================

function validateVacuoLimiters() {
    const elemChecked = document.querySelectorAll('.elem-check:checked').length;
    const funcChecked = document.querySelectorAll('.func-check:checked').length;
    
    const warnings = document.getElementById('vacuo-warnings');
    const generateBtn = document.getElementById('btn-generate-boss-vacuo');
    
    const messages = [];
    
    if (elemChecked !== 2) {
        messages.push(`⚠️ Selecione exatamente 2 elementos (${elemChecked}/2 selecionados)`);
    }
    
    if (funcChecked !== 2) {
        messages.push(`⚠️ Selecione exatamente 2 funções (${funcChecked}/2 selecionadas)`);
    }
    
    if (messages.length > 0) {
        warnings.innerHTML = messages.join('<br>');
        warnings.style.display = 'block';
        generateBtn.disabled = true;
    } else {
        warnings.style.display = 'none';
        generateBtn.disabled = false;
    }
}

function generateBossVacuoTeam() {
    const blockedElements = Array.from(document.querySelectorAll('.elem-check:checked')).map(c => c.value);
    const blockedFunctions = Array.from(document.querySelectorAll('.func-check:checked')).map(c => c.value);
    
    const results = document.getElementById('boss-vacuo-results');
    results.innerHTML = '<h3>Gerando time para Boss Vácuo...</h3>';
    
    // Filter out blocked knights
    const validKnights = knightsData.filter(k => 
        k.disponivel &&
        !blockedElements.includes(k.elemento) &&
        !blockedFunctions.includes(k.funcao)
    );
    
    // Score and select top 5
    const scored = validKnights.map(knight => ({
        knight,
        score: calculateBossScore(knight)
    }));
    
    scored.sort((a, b) => b.score - a.score);
    const team = scored.slice(0, 5).map(s => s.knight);
    
    results.innerHTML = `
        <div class="result-team">
            <h3>Time para Boss Vácuo</h3>
            <div class="result-knights">
                ${team.map(k => renderKnightCard(k)).join('')}
            </div>
            <div class="strategy-box">
                <h4>🌀 Limitadores Ativos</h4>
                <p>Elementos bloqueados: ${blockedElements.map(e => ELEMENT_EMOJI[e]).join(' ')}<br>
                Funções bloqueadas: ${blockedFunctions.map(f => FUNCTION_EMOJI[f]).join(' ')}<br>
                Time otimizado considerando -90% de dano em cavaleiros bloqueados.</p>
            </div>
        </div>
    `;
}

// ============================================
// ANÁLISE TAB
// ============================================

function initializeAnaliseTab(teamCount) {
    currentTeamCount = teamCount;
    usedKnights.clear();
    
    const container = document.getElementById('analise-teams');
    container.innerHTML = '';
    
    for (let i = 0; i < teamCount; i++) {
        const teamDiv = createTeamBuilder(`Time ${i + 1}`, `analise-team-${i}`);
        container.appendChild(teamDiv);
    }
    
    document.getElementById('analise-results').innerHTML = '';
}

function generateAnalise() {
    const results = document.getElementById('analise-results');
    results.innerHTML = '<h3>Analisando sinergias...</h3>';
    
    const teams = [];
    for (let i = 0; i < currentTeamCount; i++) {
        const team = getTeamKnights(`analise-team-${i}`);
        if (team.length > 0) {
            teams.push({ index: i + 1, knights: team });
        }
    }
    
    if (teams.length === 0) {
        results.innerHTML = '<p style="color: var(--accent-red);">⚠️ Nenhum time montado!</p>';
        return;
    }
    
    results.innerHTML = teams.map(({ index, knights }) => {
        const analysis = analyzeTeamSynergy(knights);
        return `
            <div class="result-team">
                <h3>Análise do Time ${index}</h3>
                <div class="result-knights">
                    ${knights.map(k => renderKnightCard(k)).join('')}
                </div>
                ${renderAnalysis(analysis)}
            </div>
        `;
    }).join('');
}

function analyzeTeamSynergy(team) {
    const elements = {};
    const functions = {};
    const tags = new Set();
    
    team.forEach(k => {
        elements[k.elemento] = (elements[k.elemento] || 0) + 1;
        functions[k.funcao] = (functions[k.funcao] || 0) + 1;
        k.tags.forEach(t => tags.add(t));
    });
    
    // Detect formation bonuses
    const bonuses = [];
    const elementCounts = Object.values(elements);
    const uniqueElements = Object.keys(elements).length;
    
    if (elementCounts.includes(5)) bonuses.push({ name: 'Mono Elementar', bonus: '+25%' });
    else if (elementCounts.includes(4)) bonuses.push({ name: 'Elemento Dominante', bonus: '+20%' });
    else if (elementCounts.includes(3)) bonuses.push({ name: 'Elemento Dominante', bonus: '+15%' });
    else if (elementCounts.filter(c => c === 2).length === 2 && uniqueElements === 3) {
        bonuses.push({ name: 'Full House', bonus: '+15%' });
    } else if (uniqueElements === 5) {
        bonuses.push({ name: 'Arco-Íris', bonus: '+20%' });
    }
    
    // Special synergies
    const synergies = [];
    if (tags.has('reduz_defesa') && tags.has('high_dps')) {
        synergies.push('Amplificador + DPS = Burst Massivo');
    }
    if (functions.suporte >= 2) {
        synergies.push('Múltiplos Suportes = Sustentação Extrema');
    }
    if (tags.has('buff_velocidade')) {
        synergies.push('Buff de Velocidade = Múltiplas Ultimates');
    }
    
    return { elements, functions, bonuses, synergies };
}

function renderAnalysis(analysis) {
    return `
        <div class="strategy-box">
            <h4>📊 Bônus de Formação</h4>
            ${analysis.bonuses.length > 0 
                ? analysis.bonuses.map(b => `<p>✨ ${b.name}: ${b.bonus}</p>`).join('')
                : '<p>Sem bônus de formação elemental</p>'
            }
            
            <h4 style="margin-top: 1rem;">🔄 Distribuição Elemental</h4>
            <p>${Object.entries(analysis.elements).map(([elem, count]) => 
                `${ELEMENT_EMOJI[elem]} ${elem}: ${count}`
            ).join(' | ')}</p>
            
            <h4 style="margin-top: 1rem;">⚔️ Composição de Funções</h4>
            <p>${Object.entries(analysis.functions).map(([func, count]) => 
                `${FUNCTION_EMOJI[func]} ${func}: ${count}`
            ).join(' | ')}</p>
            
            ${analysis.synergies.length > 0 ? `
                <h4 style="margin-top: 1rem;">💫 Sinergias Especiais</h4>
                ${analysis.synergies.map(s => `<p>• ${s}</p>`).join('')}
            ` : ''}
        </div>
    `;
}

// ============================================
// CONFIG TAB
// ============================================

function initializeConfigTab() {
    renderKnightsConfig();
}

function renderKnightsConfig(filter = '') {
    const container = document.getElementById('knights-config-list');
    
    const filtered = knightsData.filter(k => 
        filter === '' || k.nome.toLowerCase().includes(filter.toLowerCase())
    );
    
    container.innerHTML = filtered.map(knight => `
        <div class="knight-config-item ${knight.disponivel ? '' : 'disabled'}">
            <img src="${knight.imagem}" alt="${knight.nome}" class="knight-config-avatar" onerror="this.src='assets/placeholder.webp'">
            <div class="knight-config-info">
                <h4>${knight.nome}</h4>
                <p>${ELEMENT_EMOJI[knight.elemento]} ${knight.elemento} | ${FUNCTION_EMOJI[knight.funcao]} ${knight.funcao}</p>
            </div>
            <select onchange="updateKnightConfig(${knight.id}, 'armadura', this.value)">
                <option value="0" ${knight.armadura === 0 ? 'selected' : ''}>Armadura 0</option>
                <option value="10" ${knight.armadura === 10 ? 'selected' : ''}>Armadura 10</option>
                <option value="20" ${knight.armadura === 20 ? 'selected' : ''}>Armadura 20</option>
                <option value="30" ${knight.armadura === 30 ? 'selected' : ''}>Armadura 30</option>
                <option value="40" ${knight.armadura === 40 ? 'selected' : ''}>Armadura 40</option>
            </select>
            <select onchange="updateKnightConfig(${knight.id}, 'constelacao', this.value)">
                <option value="0p" ${knight.constelacao === '0p' ? 'selected' : ''}>0 pontos</option>
                <option value="3p" ${knight.constelacao === '3p' ? 'selected' : ''}>3 pontos</option>
                <option value="9p" ${knight.constelacao === '9p' ? 'selected' : ''}>9 pontos</option>
            </select>
            <input type="checkbox" ${knight.disponivel ? 'checked' : ''} 
                onchange="updateKnightConfig(${knight.id}, 'disponivel', this.checked)">
        </div>
    `).join('');
}

function updateKnightConfig(knightId, field, value) {
    const knight = knightsData.find(k => k.id === knightId);
    if (knight) {
        if (field === 'armadura') {
            knight.armadura = parseInt(value);
        } else if (field === 'constelacao') {
            knight.constelacao = value;
        } else if (field === 'disponivel') {
            knight.disponivel = value;
        }
        saveConfigurations();
        
        // Re-render to update disabled state
        if (field === 'disponivel') {
            renderKnightsConfig(document.getElementById('knight-search').value);
        }
    }
}

function toggleAllKnights(enable) {
    knightsData.forEach(k => k.disponivel = enable);
    saveConfigurations();
    renderKnightsConfig();
}

function maximizeAllKnights() {
    knightsData.forEach(k => {
        k.armadura = 40;
        k.constelacao = '9p';
    });
    saveConfigurations();
    renderKnightsConfig();
}

function filterKnightsConfig(e) {
    renderKnightsConfig(e.target.value);
}

console.log('✅ Saint Seiya Team Builder loaded successfully!');
