// AI-Powered Counter Team Generator
// Uses LLM to analyze enemy composition and suggest optimal counter teams

import { getKnightExtendedData, ELEMENTS, ROLES } from './SaintSeiyaFormationEngine.js';

// Configuration
const AI_CONFIG = {
    apiKey: null, // User must configure
    apiEndpoint: 'https://api.anthropic.com/v1/messages',
    model: 'claude-3-5-sonnet-20241022',
    maxTokens: 2000,
    enabled: false
};

// Load config from localStorage
export function loadAIConfig() {
    try {
        const saved = localStorage.getItem('saintSeiyaAIConfig');
        if (saved) {
            const config = JSON.parse(saved);
            Object.assign(AI_CONFIG, config);
        }
    } catch (e) {
        console.error('Erro ao carregar config da IA:', e);
    }
}

// Save config to localStorage
export function saveAIConfig(config) {
    Object.assign(AI_CONFIG, config);
    localStorage.setItem('saintSeiyaAIConfig', JSON.stringify(AI_CONFIG));
}

// Check if AI is configured and enabled
export function isAIEnabled() {
    return AI_CONFIG.enabled && AI_CONFIG.apiKey && AI_CONFIG.apiKey.length > 10;
}

// Build detailed knight description for AI
function buildKnightDescription(knight) {
    const extendedData = getKnightExtendedData(knight.id, knight.nome);

    let description = `**${knight.nome}** (${knight.elemento}, ${knight.role})`;

    if (extendedData) {
        if (extendedData.skills && extendedData.skills.length > 0) {
            description += `\n  Skills: ${extendedData.skills.join(', ')}`;
        }

        if (extendedData.analise && extendedData.analise.length > 50) {
            // Pegar primeiras 200 chars da análise
            const analiseShort = extendedData.analise.substring(0, 200).replace(/\n/g, ' ');
            description += `\n  Análise: ${analiseShort}...`;
        }

        if (extendedData.armadura && Object.keys(extendedData.armadura).length > 0) {
            description += `\n  Armadura: ${Object.values(extendedData.armadura).join('; ')}`;
        }

        if (extendedData.constelacao && Object.keys(extendedData.constelacao).length > 0) {
            description += `\n  Constelação: ${Object.values(extendedData.constelacao).join('; ')}`;
        }
    }

    return description;
}

// Generate counter team using AI
export async function generateAICounterTeam(enemyTeam, availableKnights, boss = null) {
    if (!isAIEnabled()) {
        throw new Error('IA não configurada. Configure a API key nas configurações.');
    }

    // Build enemy team description
    const activeEnemies = enemyTeam.filter(k => k);
    if (activeEnemies.length === 0) {
        throw new Error('Time inimigo vazio');
    }

    const enemyDescription = activeEnemies.map((knight, idx) =>
        `${idx + 1}. ${buildKnightDescription(knight)}`
    ).join('\n');

    // Build available knights description (limit to 30 best candidates to avoid token overflow)
    const availableDescription = availableKnights
        .slice(0, 30)
        .map((knight, idx) => `${idx + 1}. ${buildKnightDescription(knight)}`)
        .join('\n');

    // Build prompt
    const prompt = buildAIPrompt(enemyDescription, availableDescription, boss);

    // Call AI API
    try {
        const response = await fetch(AI_CONFIG.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': AI_CONFIG.apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: AI_CONFIG.model,
                max_tokens: AI_CONFIG.maxTokens,
                messages: [{
                    role: 'user',
                    content: prompt
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        const aiResponse = data.content[0].text;

        // Parse AI response to extract knight names
        const suggestedTeam = parseAIResponse(aiResponse, availableKnights);

        return {
            team: suggestedTeam,
            explanation: aiResponse
        };
    } catch (error) {
        console.error('Erro ao chamar IA:', error);
        throw error;
    }
}

// Build prompt for AI
function buildAIPrompt(enemyDescription, availableDescription, boss) {
    const bossPart = boss ? `\n\n**BOSS MODE ATIVO**\nBoss: ${boss.nome} (${boss.elemento}, ${boss.role})\nObjetivo: Maximizar dano no boss!\n` : '';

    return `Você é um especialista em Saint Seiya e deve analisar a composição do time inimigo e sugerir o MELHOR contra-time possível.

${bossPart}
**TIME INIMIGO:**
${enemyDescription}

**CAVALEIROS DISPONÍVEIS (Top 30):**
${availableDescription}

**SUA TAREFA:**
1. Analise a composição inimiga (elementos, roles, skills)
2. Identifique fraquezas e pontos fortes
3. Sugira exatamente 5 cavaleiros para o contra-time
4. Explique por que cada cavaleiro foi escolhido

**REGRAS:**
- Considere vantagem elemental: Água > Fogo > Vento > Terra > Água
- Luz e Trevas têm vantagem mútua
- Priorize cavaleiros com skills que countem o inimigo
- Considere sinergia entre os 5 cavaleiros escolhidos
- Se for BOSS MODE, priorize DANO MÁXIMO

**FORMATO DA RESPOSTA:**
CAVALEIROS SELECIONADOS:
1. [Nome Exato do Cavaleiro]
2. [Nome Exato do Cavaleiro]
3. [Nome Exato do Cavaleiro]
4. [Nome Exato do Cavaleiro]
5. [Nome Exato do Cavaleiro]

ANÁLISE:
[Explique sua escolha em 3-4 parágrafos considerando elementos, roles, skills e sinergia]

IMPORTANTE: Use os nomes EXATOS dos cavaleiros da lista disponível!`;
}

// Parse AI response to extract knight names
function parseAIResponse(aiResponse, availableKnights) {
    const lines = aiResponse.split('\n');
    const selectedKnights = [];

    // Try to find knight names in the response
    for (const line of lines) {
        // Look for numbered lines like "1. Aiolia" or "- Aiolia"
        const match = line.match(/^[\d\-\*]+\.?\s*(.+)$/);
        if (match) {
            const knightName = match[1].trim()
                .replace(/\*\*/g, '') // Remove markdown bold
                .replace(/\(.*\)/, '') // Remove parentheses info
                .trim();

            // Try to find this knight in available list
            const found = availableKnights.find(k =>
                k.nome.toLowerCase().includes(knightName.toLowerCase()) ||
                knightName.toLowerCase().includes(k.nome.toLowerCase())
            );

            if (found && !selectedKnights.includes(found)) {
                selectedKnights.push(found);
            }
        }

        // Stop after finding 5 knights
        if (selectedKnights.length >= 5) break;
    }

    // Fallback: if we didn't find 5, fill with best available
    while (selectedKnights.length < 5 && selectedKnights.length < availableKnights.length) {
        const nextKnight = availableKnights.find(k => !selectedKnights.includes(k));
        if (nextKnight) selectedKnights.push(nextKnight);
        else break;
    }

    return selectedKnights;
}

// Export config for UI
export { AI_CONFIG };
