// Script para parsear arquivos markdown e extrair dados completos dos cavaleiros
const fs = require('fs');
const path = require('path');

// Mapeamento de pastas para categorias
const FOLDER_TO_CATEGORY = {
    'Cavaleiros de Ouro': 'Ouro',
    'Cavaleiros Divinos': 'Divino',
    'Cavaleiros de Prata': 'Prata',
    'Cavaleiros de Bronze': 'Bronze',
    'Espectros': 'Espectro',
    'Marinas': 'Marina',
    'Deuses': 'Deus',
    'Outros Cavaleiros': 'Outros'
};

function parseMarkdownFile(filePath, folderName) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const fileName = path.basename(filePath, '.md');

        // Extrair informações básicas
        const data = {
            nome: fileName,
            categoria: FOLDER_TO_CATEGORY[folderName] || 'Outros',
            skills: [],
            armadura: {},
            constelacao: {},
            analise: '',
            rawContent: content
        };

        // Extrair elemento
        const elementoMatch = content.match(/Elemento:\s*[🔥💧💨🌍✨💜⚡🌊🍃⛰️☀️🌙]?\s*(Fogo|Água|Vento|Terra|Luz|Trevas|Escuridão|Fire|Water|Wind|Earth|Light|Dark)/i);
        if (elementoMatch) {
            const elem = elementoMatch[1].toLowerCase();
            const elementMap = {
                'fogo': 'Fire', 'fire': 'Fire',
                'água': 'Water', 'water': 'Water',
                'vento': 'Wind', 'wind': 'Wind',
                'terra': 'Earth', 'earth': 'Earth',
                'luz': 'Light', 'light': 'Light',
                'trevas': 'Dark', 'escuridão': 'Dark', 'dark': 'Dark'
            };
            data.elemento = elementMap[elem] || 'Light';
        }

        // Extrair função/role
        const funcaoMatch = content.match(/Função:\s*(Tanque|Guerreiro|Assassino|Mago|Suporte|Tank|Warrior|Assassin|Mage|Support)/i);
        if (funcaoMatch) {
            const role = funcaoMatch[1].toLowerCase();
            const roleMap = {
                'tanque': 'Tank', 'tank': 'Tank',
                'guerreiro': 'Warrior', 'warrior': 'Warrior',
                'assassino': 'Assassin', 'assassin': 'Assassin',
                'mago': 'Mage', 'mage': 'Mage',
                'suporte': 'Support', 'support': 'Support'
            };
            data.role = roleMap[role] || 'Warrior';
        }

        // Extrair skills (habilidades)
        const skillsSection = content.match(/(?:###?)?\s*🛠️?\s*Habilidades\s*\(Skills\)([\s\S]*?)(?=🛡️|###?\s*Armadura|Constelação|$)/i);
        if (skillsSection) {
            const skillsText = skillsSection[1];

            // Tentar capturar skills no formato **1. Nome:**
            let skillMatches = skillsText.match(/\*\*\d+\.\s*([^:*\n]+?)[:*]/g);

            // Se não encontrou, tentar formato "1. Nome:" sem ** **
            if (!skillMatches || skillMatches.length === 0) {
                const lines = skillsText.split('\n');
                const skills = [];

                for (let line of lines) {
                    const trimmed = line.trim();
                    // Capturar linhas que começam com número seguido de ponto e nome da skill
                    if (/^\d+\.\s+/.test(trimmed)) {
                        const match = trimmed.match(/^\d+\.\s+([^(:-]+)/);
                        if (match && match[1]) {
                            const skillName = match[1].trim();
                            // Evitar capturar linhas de descrição (que começam com "- ")
                            if (skillName && !skillName.startsWith('-')) {
                                skills.push(skillName);
                            }
                        }
                    }
                }
                data.skills = skills;
            } else {
                data.skills = skillMatches.map(s => {
                    const match = s.match(/\*\*\d+\.\s*([^:*]+)[:*]/);
                    return match ? match[1].trim() : '';
                }).filter(s => s);
            }
        }

        // Extrair informações de armadura
        const armaduraSection = content.match(/###?\s*🛡️?\s*Armadura[^#]*([\s\S]*?)(?=###?\s*📊|###?\s*Constelação|$)/i);
        if (armaduraSection) {
            const armText = armaduraSection[1];

            // Extrair efeitos por nível
            const nivelMatches = armText.match(/Nível\s+(\d+)[^:]*:([^-*]+)/gi);
            if (nivelMatches) {
                nivelMatches.forEach(match => {
                    const detailMatch = match.match(/Nível\s+(\d+)[^:]*:(.+)/i);
                    if (detailMatch) {
                        const nivel = detailMatch[1];
                        const efeito = detailMatch[2].trim();
                        data.armadura[`nivel${nivel}`] = efeito;
                    }
                });
            }
        }

        // Extrair informações de constelação
        const constelacaoSection = content.match(/Constelação:([^#]*?)(?=###|---|\*\*[^\*]+Adicionado|$)/i);
        if (constelacaoSection) {
            const constText = constelacaoSection[1];

            // Extrair efeitos 3p e 9p
            const efeitoMatches = constText.match(/Efeito\s+(\d+)p[^:]*:([^-]+)/gi);
            if (efeitoMatches) {
                efeitoMatches.forEach(match => {
                    const detailMatch = match.match(/Efeito\s+(\d+)p[^:]*:(.+)/i);
                    if (detailMatch) {
                        const pontos = detailMatch[1];
                        const efeito = detailMatch[2].trim();
                        data.constelacao[`efeito${pontos}p`] = efeito;
                    }
                });
            }
        }

        // Extrair análise tática
        const analiseSection = content.match(/###?\s*📊?\s*Análise\s+Tática([\s\S]*?)(?=---|\*\*[^\*]+Adicionado|$)/i);
        if (analiseSection) {
            data.analise = analiseSection[1].trim().substring(0, 500); // Limitar tamanho
        }

        return data;
    } catch (error) {
        console.error(`Erro ao parsear ${filePath}:`, error.message);
        return null;
    }
}

function parseAllKnights() {
    const personagensDir = path.join(__dirname, '..', 'personagens');
    const allData = {};

    // Ler todas as pastas
    const folders = fs.readdirSync(personagensDir);

    folders.forEach(folder => {
        const folderPath = path.join(personagensDir, folder);
        const stat = fs.statSync(folderPath);

        if (stat.isDirectory()) {
            console.log(`\nProcessando pasta: ${folder}`);

            const files = fs.readdirSync(folderPath);
            files.forEach(file => {
                if (file.endsWith('.md')) {
                    const filePath = path.join(folderPath, file);
                    const knightData = parseMarkdownFile(filePath, folder);

                    if (knightData) {
                        const key = path.basename(file, '.md');
                        allData[key] = knightData;
                        console.log(`  ✓ ${key} (${knightData.skills.length} skills)`);
                    }
                }
            });
        }
    });

    return allData;
}

// Executar parsing
console.log('=== Iniciando parsing dos cavaleiros ===');
const knightsData = parseAllKnights();

// Salvar em JSON
const outputPath = path.join(__dirname, 'knightsFullData.json');
fs.writeFileSync(outputPath, JSON.stringify(knightsData, null, 2));

console.log(`\n=== Parsing completo! ===`);
console.log(`Total de cavaleiros processados: ${Object.keys(knightsData).length}`);
console.log(`Dados salvos em: ${outputPath}`);

module.exports = { parseAllKnights, parseMarkdownFile };
