// Saint Seiya Formation Engine - Constants and Database
// Updated with corrected knight names and classifications

export const ELEMENTS = {
    WATER: 'Water',
    FIRE: 'Fire',
    WIND: 'Wind',
    EARTH: 'Earth',
    LIGHT: 'Light',
    DARK: 'Dark'
};

export const ROLES = {
    TANK: 'Tank',
    WARRIOR: 'Warrior',
    ASSASSIN: 'Assassin',
    MAGE: 'Mage',
    SUPPORT: 'Support'
};

// Portuguese Display Labels
export const ROLES_PT = {
    Tank: 'Tanque',
    Warrior: 'Guerreiro',
    Assassin: 'Assassino',
    Mage: 'Mago',
    Support: 'Suporte'
};

export const ELEMENTS_PT = {
    Water: 'Água',
    Fire: 'Fogo',
    Wind: 'Vento',
    Earth: 'Terra',
    Light: 'Luz',
    Dark: 'Trevas'
};

// Helper to resolve asset path
function getAssetPath(category, name) {
    if (name === 'Aldebaran' && category === 'Ouro') return 'assets/Ouro_Aldabaran.webp';
    if (name === 'Saori Kido') return 'assets/Deus_Saori.webp';
    const filename = `${category}_${name.replace(/ /g, '_')}.webp`;
    return `assets/${filename}`;
}

// ============================================
// KNIGHT DATABASE - Updated with Corrected Names
// ============================================

export const databaseCavaleiros = [
    // --- CAVALEIROS DE OURO ---
    { id: 'Aldebaran', nome: 'Aldebaran', elemento: ELEMENTS.EARTH, role: ROLES.TANK, asset: getAssetPath('Ouro', 'Aldabaran') },
    { id: 'Afrodite', nome: 'Afrodite', elemento: ELEMENTS.WATER, role: ROLES.MAGE, asset: getAssetPath('Ouro', 'Afrodite') },
    { id: 'Aiolos', nome: 'Aiolos', elemento: ELEMENTS.FIRE, role: ROLES.ASSASSIN, asset: getAssetPath('Ouro', 'Aiolos') },
    { id: 'Aiolia', nome: 'Aiolia', elemento: ELEMENTS.FIRE, role: ROLES.WARRIOR, asset: getAssetPath('Ouro', 'Aiolia') },
    { id: 'Albafica', nome: 'Albafica (LC)', elemento: ELEMENTS.WATER, role: ROLES.MAGE, asset: getAssetPath('Ouro', 'Albafica') },
    { id: 'Camus', nome: 'Camus (Aquário)', elemento: ELEMENTS.WIND, role: ROLES.MAGE, asset: getAssetPath('Ouro', 'Camus') },
    { id: 'Cardinale', nome: 'Cardinale', elemento: ELEMENTS.WATER, role: ROLES.ASSASSIN, asset: getAssetPath('Ouro', 'Cardinale') },
    { id: 'Contador_Morte', nome: 'Contador da Morte (ND)', elemento: ELEMENTS.WATER, role: ROLES.MAGE, asset: getAssetPath('Ouro', 'Contador_da_Morte') },
    { id: 'Dohko', nome: 'Dohko', elemento: ELEMENTS.WIND, role: ROLES.TANK, asset: getAssetPath('Ouro', 'Dohko') },
    { id: 'Ecarlate', nome: 'Ecarlate', elemento: ELEMENTS.EARTH, role: ROLES.ASSASSIN, asset: getAssetPath('Ouro', 'Ecarlate') },
    { id: 'Gestalt', nome: 'Gestalt', elemento: ELEMENTS.FIRE, role: ROLES.ASSASSIN, asset: getAssetPath('Ouro', 'Gestalt') },
    { id: 'Hyoga_Gold', nome: 'Hyoga (Aquário)', elemento: ELEMENTS.WIND, role: ROLES.MAGE, asset: getAssetPath('Ouro', 'Hyoga') },
    { id: 'Ikki_Gold', nome: 'Ikki (Leão)', elemento: ELEMENTS.FIRE, role: ROLES.MAGE, asset: getAssetPath('Ouro', 'Ikki') },
    { id: 'Izo', nome: 'Izo', elemento: ELEMENTS.EARTH, role: ROLES.WARRIOR, asset: getAssetPath('Ouro', 'Izo') },
    { id: 'Kain', nome: 'Kain & Abel', elemento: ELEMENTS.DARK, role: ROLES.ASSASSIN, asset: getAssetPath('Ouro', 'Kain-Abel') },
    { id: 'Kaiser', nome: 'Kaiser', elemento: ELEMENTS.FIRE, role: ROLES.WARRIOR, asset: getAssetPath('Ouro', 'Kaiser') },
    { id: 'Kanon_Gold', nome: 'Kanon (Ouro)', elemento: ELEMENTS.LIGHT, role: ROLES.ASSASSIN, asset: getAssetPath('Ouro', 'Kanon') },
    { id: 'MascaraMort', nome: 'Máscara da Morte', elemento: ELEMENTS.WATER, role: ROLES.MAGE, asset: getAssetPath('Ouro', 'Mascara_da_Morte') },
    { id: 'Milo', nome: 'Milo', elemento: ELEMENTS.WATER, role: ROLES.ASSASSIN, asset: getAssetPath('Ouro', 'Milo') },
    { id: 'Mu', nome: 'Mu', elemento: ELEMENTS.FIRE, role: ROLES.SUPPORT, asset: getAssetPath('Ouro', 'Mu') },
    { id: 'Mystoria', nome: 'Mystoria', elemento: ELEMENTS.WIND, role: ROLES.ASSASSIN, asset: getAssetPath('Ouro', 'Mystoria') },
    { id: 'Odisseu', nome: 'Odisseu', elemento: ELEMENTS.LIGHT, role: ROLES.SUPPORT, asset: getAssetPath('Ouro', 'Odisseu') },
    { id: 'Ox', nome: 'Ox', elemento: ELEMENTS.EARTH, role: ROLES.TANK, asset: getAssetPath('Ouro', 'Ox') },
    { id: 'Saga', nome: 'Saga', elemento: ELEMENTS.LIGHT, role: ROLES.WARRIOR, asset: getAssetPath('Ouro', 'Saga') },
    { id: 'SagaMaligno', nome: 'Saga Maligno', elemento: ELEMENTS.DARK, role: ROLES.MAGE, asset: getAssetPath('Ouro', 'Saga_Maligno') },
    { id: 'Seiya_Gold', nome: 'Seiya (Sagitário)', elemento: ELEMENTS.FIRE, role: ROLES.ASSASSIN, asset: getAssetPath('Ouro', 'Seiya') },
    { id: 'Shaka', nome: 'Shaka', elemento: ELEMENTS.LIGHT, role: ROLES.MAGE, asset: getAssetPath('Ouro', 'Shaka') },
    { id: 'Shaka_Arayashik', nome: 'Shaka Arayashiki', elemento: ELEMENTS.LIGHT, role: ROLES.MAGE, asset: getAssetPath('Ouro', 'Shaka_Arayashik') },
    { id: 'Shijima', nome: 'Shijima', elemento: ELEMENTS.LIGHT, role: ROLES.TANK, asset: getAssetPath('Ouro', 'Shijima') },
    { id: 'Shion_Gold', nome: 'Shion (Ouro)', elemento: ELEMENTS.LIGHT, role: ROLES.SUPPORT, asset: getAssetPath('Ouro', 'Shion') },
    { id: 'Shiryu_Gold', nome: 'Shiryu (Libra)', elemento: ELEMENTS.WATER, role: ROLES.TANK, asset: getAssetPath('Ouro', 'Shiryu') },
    { id: 'Shun_Gold', nome: 'Shun (Virgem)', elemento: ELEMENTS.EARTH, role: ROLES.MAGE, asset: getAssetPath('Ouro', 'Shun') },
    { id: 'Shura', nome: 'Shura', elemento: ELEMENTS.EARTH, role: ROLES.ASSASSIN, asset: getAssetPath('Ouro', 'Shura') },

    // --- CAVALEIROS DIVINOS ---
    { id: 'Afrodite_God', nome: 'Afrodite (Divino)', elemento: ELEMENTS.DARK, role: ROLES.MAGE, asset: getAssetPath('Divino', 'Afrodite') },
    { id: 'Aiolia_God', nome: 'Aiolia (Divino)', elemento: ELEMENTS.LIGHT, role: ROLES.WARRIOR, asset: getAssetPath('Divino', 'Aiolia') },
    { id: 'Aldebaran_God', nome: 'Aldebaran (Divino)', elemento: ELEMENTS.LIGHT, role: ROLES.TANK, asset: getAssetPath('Divino', 'Aldebaran') },
    { id: 'Camus_God', nome: 'Camus (Divino)', elemento: ELEMENTS.LIGHT, role: ROLES.WARRIOR, asset: getAssetPath('Divino', 'Camus') },
    { id: 'Dohko_God', nome: 'Dohko (Divino)', elemento: ELEMENTS.LIGHT, role: ROLES.TANK, asset: getAssetPath('Divino', 'Dohko') },
    { id: 'Hyoga_God', nome: 'Hyoga (Divino)', elemento: ELEMENTS.LIGHT, role: ROLES.MAGE, asset: getAssetPath('Divino', 'Hyoga') },
    { id: 'Ikki_God', nome: 'Ikki (Divino)', elemento: ELEMENTS.LIGHT, role: ROLES.ASSASSIN, asset: getAssetPath('Divino', 'Ikki') },
    { id: 'Milo_God', nome: 'Milo (Divino)', elemento: ELEMENTS.DARK, role: ROLES.ASSASSIN, asset: getAssetPath('Divino', 'Milo') },
    { id: 'Mu_God', nome: 'Mu (Divino)', elemento: ELEMENTS.LIGHT, role: ROLES.SUPPORT, asset: getAssetPath('Divino', 'Mu') },
    { id: 'Seiya_God', nome: 'Seiya (Divino)', elemento: ELEMENTS.LIGHT, role: ROLES.WARRIOR, asset: getAssetPath('Divino', 'Seiya') },
    { id: 'Shiryu_God', nome: 'Shiryu (Divino)', elemento: ELEMENTS.LIGHT, role: ROLES.TANK, asset: getAssetPath('Divino', 'Shiryu') },
    { id: 'Shun_God', nome: 'Shun (Divino)', elemento: ELEMENTS.LIGHT, role: ROLES.SUPPORT, asset: getAssetPath('Divino', 'Shun') },
    { id: 'Shura_God', nome: 'Shura (Divino)', elemento: ELEMENTS.DARK, role: ROLES.WARRIOR, asset: getAssetPath('Divino', 'Shura') },

    // --- DEUSES ---
    { id: 'Alone', nome: 'Alone', elemento: ELEMENTS.DARK, role: ROLES.WARRIOR, asset: getAssetPath('Deus', 'Alone') },
    { id: 'Apolo', nome: 'Apolo', elemento: ELEMENTS.LIGHT, role: ROLES.WARRIOR, asset: getAssetPath('Deus', 'Apolo') },
    { id: 'Artemis', nome: 'Artemis', elemento: ELEMENTS.LIGHT, role: ROLES.MAGE, asset: getAssetPath('Deus', 'Artemis') },
    { id: 'Atena', nome: 'Atena', elemento: ELEMENTS.LIGHT, role: ROLES.TANK, asset: getAssetPath('Deus', 'Atena') },
    { id: 'Hades', nome: 'Hades', elemento: ELEMENTS.DARK, role: ROLES.TANK, asset: getAssetPath('Deus', 'Hades') },
    { id: 'Hypnos', nome: 'Hypnos', elemento: ELEMENTS.DARK, role: ROLES.SUPPORT, asset: getAssetPath('Deus', 'Hypnos') },
    { id: 'Poseidon', nome: 'Poseidon', elemento: ELEMENTS.LIGHT, role: ROLES.MAGE, asset: getAssetPath('Deus', 'Poseidon') },
    { id: 'Saori', nome: 'Saori Kido', elemento: ELEMENTS.WATER, role: ROLES.SUPPORT, asset: getAssetPath('Deus', 'Saori') },
    { id: 'Shun_Hades', nome: 'Shun (Hades)', elemento: ELEMENTS.DARK, role: ROLES.TANK, asset: getAssetPath('Deus', 'Shun') },
    { id: 'Thanatos', nome: 'Thanatos', elemento: ELEMENTS.DARK, role: ROLES.MAGE, asset: getAssetPath('Deus', 'Thanatos') },

    // --- MARINAS ---
    { id: 'Bian', nome: 'Bian', elemento: ELEMENTS.WIND, role: ROLES.TANK, asset: getAssetPath('Marina', 'Bian') },
    { id: 'Io', nome: 'Io', elemento: ELEMENTS.WATER, role: ROLES.ASSASSIN, asset: getAssetPath('Marina', 'Io') },
    { id: 'Isaac', nome: 'Isaac', elemento: ELEMENTS.WIND, role: ROLES.WARRIOR, asset: getAssetPath('Marina', 'Isaac') },
    { id: 'Kanon_Marina', nome: 'Kanon (Marina)', elemento: ELEMENTS.DARK, role: ROLES.ASSASSIN, asset: getAssetPath('Marina', 'Kanon') },
    { id: 'Kasa', nome: 'Kasa', elemento: ELEMENTS.EARTH, role: ROLES.SUPPORT, asset: getAssetPath('Marina', 'Kasa') },
    { id: 'Krishna', nome: 'Krishna', elemento: ELEMENTS.FIRE, role: ROLES.WARRIOR, asset: getAssetPath('Marina', 'Krishna') },
    { id: 'Sorento', nome: 'Sorento', elemento: ELEMENTS.LIGHT, role: ROLES.SUPPORT, asset: getAssetPath('Marina', 'Sorento') },
    { id: 'Thetis', nome: 'Thetis', elemento: ELEMENTS.WATER, role: ROLES.SUPPORT, asset: getAssetPath('Marina', 'Thetis') },

    // --- ESPECTROS ---
    { id: 'Aiacos', nome: 'Aiacos', elemento: ELEMENTS.DARK, role: ROLES.MAGE, asset: getAssetPath('Espectro', 'Aiacos') },
    { id: 'Chagall', nome: 'Chagall', elemento: ELEMENTS.DARK, role: ROLES.WARRIOR, asset: getAssetPath('Espectro', 'Chagall') },
    { id: 'Charon', nome: 'Charon', elemento: ELEMENTS.WATER, role: ROLES.WARRIOR, asset: getAssetPath('Espectro', 'Charon') },
    { id: 'Farao', nome: 'Faraó', elemento: ELEMENTS.EARTH, role: ROLES.ASSASSIN, asset: getAssetPath('Espectro', 'Farao') },
    { id: 'Giganto', nome: 'Giganto', elemento: ELEMENTS.EARTH, role: ROLES.WARRIOR, asset: getAssetPath('Espectro', 'Giganto') },
    { id: 'Kagaho', nome: 'Kagaho', elemento: ELEMENTS.DARK, role: ROLES.MAGE, asset: getAssetPath('Espectro', 'Kagaho') },
    { id: 'Lune', nome: 'Lune', elemento: ELEMENTS.FIRE, role: ROLES.MAGE, asset: getAssetPath('Espectro', 'Lune') },
    { id: 'Minos', nome: 'Minos', elemento: ELEMENTS.DARK, role: ROLES.ASSASSIN, asset: getAssetPath('Espectro', 'Minos') },
    { id: 'Myu', nome: 'Myu', elemento: ELEMENTS.WIND, role: ROLES.SUPPORT, asset: getAssetPath('Espectro', 'Myu') },
    { id: 'Niobe', nome: 'Niobe', elemento: ELEMENTS.WATER, role: ROLES.ASSASSIN, asset: getAssetPath('Espectro', 'Niobe') },
    { id: 'Pandora', nome: 'Pandora', elemento: ELEMENTS.DARK, role: ROLES.SUPPORT, asset: getAssetPath('Espectro', 'Pandora') },
    { id: 'Pandora_ND', nome: 'Pandora (ND)', elemento: ELEMENTS.DARK, role: ROLES.SUPPORT, asset: getAssetPath('Espectro', 'Pandora_ND') },
    { id: 'Queen', nome: 'Queen', elemento: ELEMENTS.EARTH, role: ROLES.MAGE, asset: getAssetPath('Espectro', 'Queen') },
    { id: 'Radamanthys', nome: 'Radamanthys', elemento: ELEMENTS.DARK, role: ROLES.WARRIOR, asset: getAssetPath('Espectro', 'Radamanthys') },
    { id: 'Raimi', nome: 'Raimi', elemento: ELEMENTS.EARTH, role: ROLES.ASSASSIN, asset: getAssetPath('Espectro', 'Raimi') },
    { id: 'Shion_Espectro', nome: 'Shion (Espectro)', elemento: ELEMENTS.FIRE, role: ROLES.TANK, asset: getAssetPath('Espectro', 'Shion') },
    { id: 'Suikyo_Espectro', nome: 'Suikyo (Espectro)', elemento: ELEMENTS.DARK, role: ROLES.ASSASSIN, asset: getAssetPath('Espectro', 'Suikyo') },
    { id: 'Sylphid', nome: 'Sylphid', elemento: ELEMENTS.WIND, role: ROLES.ASSASSIN, asset: getAssetPath('Espectro', 'Sylphid') },
    { id: 'Zelos', nome: 'Zelos', elemento: ELEMENTS.EARTH, role: ROLES.TANK, asset: getAssetPath('Espectro', 'Zelos') },

    // --- CAVALEIROS DE PRATA ---
    { id: 'Algethi', nome: 'Algethi', elemento: ELEMENTS.FIRE, role: ROLES.TANK, asset: getAssetPath('Prata', 'Algethi') },
    { id: 'Algol', nome: 'Algol', elemento: ELEMENTS.EARTH, role: ROLES.TANK, asset: getAssetPath('Prata', 'Algol') },
    { id: 'Asterion', nome: 'Asterion', elemento: ELEMENTS.EARTH, role: ROLES.SUPPORT, asset: getAssetPath('Prata', 'Asterion') },
    { id: 'Babel', nome: 'Babel', elemento: ELEMENTS.FIRE, role: ROLES.MAGE, asset: getAssetPath('Prata', 'Babel') },
    { id: 'Capella', nome: 'Capella', elemento: ELEMENTS.EARTH, role: ROLES.MAGE, asset: getAssetPath('Prata', 'Capella') },
    { id: 'Dante', nome: 'Dante', elemento: ELEMENTS.FIRE, role: ROLES.WARRIOR, asset: getAssetPath('Prata', 'Dante') },
    { id: 'Dio', nome: 'Dio', elemento: ELEMENTS.WIND, role: ROLES.WARRIOR, asset: getAssetPath('Prata', 'Dio') },
    { id: 'Hakurei', nome: 'Hakurei', elemento: ELEMENTS.LIGHT, role: ROLES.WARRIOR, asset: getAssetPath('Prata', 'Hakurei') },
    { id: 'Jamian', nome: 'Jamian', elemento: ELEMENTS.WIND, role: ROLES.MAGE, asset: getAssetPath('Prata', 'Jamian') },
    { id: 'Marin', nome: 'Marin', elemento: ELEMENTS.WATER, role: ROLES.WARRIOR, asset: getAssetPath('Prata', 'Marin') },
    { id: 'Misty', nome: 'Misty', elemento: ELEMENTS.WIND, role: ROLES.SUPPORT, asset: getAssetPath('Prata', 'Misty') },
    { id: 'Moses', nome: 'Moses', elemento: ELEMENTS.WATER, role: ROLES.TANK, asset: getAssetPath('Prata', 'Moses') },
    { id: 'Orphee', nome: 'Orphée', elemento: ELEMENTS.LIGHT, role: ROLES.SUPPORT, asset: getAssetPath('Prata', 'Orphee') },
    { id: 'Shaina', nome: 'Shaina', elemento: ELEMENTS.EARTH, role: ROLES.ASSASSIN, asset: getAssetPath('Prata', 'Shaina') },
    { id: 'Sirius', nome: 'Sirius', elemento: ELEMENTS.EARTH, role: ROLES.WARRIOR, asset: getAssetPath('Prata', 'Sirius') },
    { id: 'Suikyo_Prata', nome: 'Suikyo (Prata)', elemento: ELEMENTS.WIND, role: ROLES.WARRIOR, asset: getAssetPath('Prata', 'Suikyo') },
    { id: 'Tremy', nome: 'Tremy', elemento: ELEMENTS.WIND, role: ROLES.ASSASSIN, asset: getAssetPath('Prata', 'Tremy') },

    // --- CAVALEIROS DE BRONZE ---
    { id: 'Hyoga_V1', nome: 'Hyoga (Bronze)', elemento: ELEMENTS.WIND, role: ROLES.MAGE, asset: getAssetPath('Bronze', 'Hyoga') },
    { id: 'June', nome: 'June', elemento: ELEMENTS.WIND, role: ROLES.SUPPORT, asset: getAssetPath('Bronze', 'June') },
    { id: 'Shiryu_V1', nome: 'Shiryu (Bronze)', elemento: ELEMENTS.WATER, role: ROLES.TANK, asset: getAssetPath('Bronze', 'Shiryu') },
    { id: 'Shun_V1', nome: 'Shun (Bronze)', elemento: ELEMENTS.EARTH, role: ROLES.SUPPORT, asset: getAssetPath('Bronze', 'Shun') },
    { id: 'Tenma', nome: 'Tenma', elemento: ELEMENTS.WIND, role: ROLES.WARRIOR, asset: getAssetPath('Bronze', 'Tenma') },

    // --- OUTROS ---
    { id: 'Callisto', nome: 'Callisto', elemento: ELEMENTS.LIGHT, role: ROLES.SUPPORT, asset: getAssetPath('Outros', 'Callisto') },
    { id: 'Hecate', nome: 'Hécate', elemento: ELEMENTS.DARK, role: ROLES.SUPPORT, asset: getAssetPath('Outros', 'Hecate') },
    { id: 'Hyoga_LC', nome: 'Hyoga (LC)', elemento: ELEMENTS.WIND, role: ROLES.MAGE, asset: getAssetPath('Outros', 'Hyoga') },
    { id: 'Lascoumune', nome: 'Lascoumune', elemento: ELEMENTS.WIND, role: ROLES.ASSASSIN, asset: getAssetPath('Outros', 'Lascoumune') },
    { id: 'MestreAnciao', nome: 'Mestre Ancião', elemento: ELEMENTS.WATER, role: ROLES.SUPPORT, asset: getAssetPath('Outros', 'Mestre_Anciao') },
    { id: 'Sasha_LC', nome: 'Sasha (LC)', elemento: ELEMENTS.LIGHT, role: ROLES.MAGE, asset: getAssetPath('Outros', 'Sasha') },
    { id: 'Seiya_LC', nome: 'Seiya (LC)', elemento: ELEMENTS.WIND, role: ROLES.WARRIOR, asset: getAssetPath('Outros', 'Seiya') },
    { id: 'Shion_LC', nome: 'Shion (LC)', elemento: ELEMENTS.EARTH, role: ROLES.WARRIOR, asset: getAssetPath('Outros', 'Shion') },
    { id: 'Shiryu_LC', nome: 'Shiryu (LC)', elemento: ELEMENTS.WATER, role: ROLES.TANK, asset: getAssetPath('Outros', 'Shiryu') },
    { id: 'Shun_LC', nome: 'Shun (LC)', elemento: ELEMENTS.EARTH, role: ROLES.SUPPORT, asset: getAssetPath('Outros', 'Shun') },
    { id: 'Toma', nome: 'Toma (Icarus)', elemento: ELEMENTS.LIGHT, role: ROLES.ASSASSIN, asset: getAssetPath('Outros', 'Toma') }
];

// ============================================
// BOSS DATABASE - Boss Mode
// ============================================

export const databaseBosses = [
    {
        id: 'Gemeos',
        nome: 'Gêmeos',
        elemento: ELEMENTS.DARK,
        role: ROLES.ASSASSIN,
        asset: 'assets/bosses/gemini_saga.jpg',
        habilidades: [
            { nome: 'Pentagrama da Morte', asset: 'assets/bosses/gemeos_02.jpg' },
            { nome: 'Força de Dominio Irresistível', asset: 'assets/bosses/gemeos_03.jpg' },
            { nome: 'Deus da Morte Imortal', asset: 'assets/bosses/gemeos_04.jpg' }
        ]
    },
    {
        id: 'Orfeu',
        nome: 'Orfeu',
        elemento: ELEMENTS.DARK,
        role: ROLES.MAGE,
        asset: 'assets/bosses/orpheus.jpg',
        habilidades: [
            { nome: 'Serenata da Viagem da Morte', asset: 'assets/bosses/orfeu_02.jpg' },
            { nome: 'Ilusão de Cordas', asset: 'assets/bosses/orfeu_03.jpg' },
            { nome: 'Ressonância de Cordas', asset: 'assets/bosses/orfeu_04.jpg' }
        ]
    },
    {
        id: 'Pandora',
        nome: 'Pandora',
        elemento: ELEMENTS.DARK,
        role: ROLES.SUPPORT,
        asset: 'assets/bosses/pandora.jpg',
        habilidades: [
            { nome: 'Lança da Demoníaca', asset: 'assets/bosses/pandora_02.jpg' },
            { nome: 'Ânsia da Rebeldia', asset: 'assets/bosses/pandora_03.jpg' },
            { nome: 'Astro da Calamidade', asset: 'assets/bosses/pandora_04.jpg' }
        ]
    },
    {
        id: 'Radamanthys',
        nome: 'Radamanthys',
        elemento: ELEMENTS.DARK,
        role: ROLES.ASSASSIN,
        asset: 'assets/bosses/radamanthys.jpg',
        habilidades: [
            { nome: 'Ataque Contínuo de Asa de Dragão', asset: 'assets/bosses/radamanthys_02.jpg' },
            { nome: 'Espírito de Guerra', asset: 'assets/bosses/radamanthys_03.jpg' },
            { nome: 'Dragão Voador', asset: 'assets/bosses/radamanthys_04.jpg' }
        ]
    }
];

// Helper to get boss by ID
export function getBossById(id) {
    return databaseBosses.find(b => b.id === id);
}


// 2. Logic: Multiplicador Elemental
export function calcularMultiplicadorElemental(atacante, defensor) {
    if (!atacante || !defensor) return 1.0;

    const atk = atacante.elemento;
    const def = defensor.elemento;

    // Light <-> Dark Mutual Weakness
    if ((atk === ELEMENTS.LIGHT && def === ELEMENTS.DARK) ||
        (atk === ELEMENTS.DARK && def === ELEMENTS.LIGHT)) {
        return 1.25;
    }

    // Standard Cycle: Water > Fire > Wind > Earth > Water
    const advantages = {
        [ELEMENTS.WATER]: ELEMENTS.FIRE,
        [ELEMENTS.FIRE]: ELEMENTS.WIND,
        [ELEMENTS.WIND]: ELEMENTS.EARTH,
        [ELEMENTS.EARTH]: ELEMENTS.WATER
    };

    if (advantages[atk] === def) {
        return 1.25;
    }

    return 1.0;
}


// 3. Logic: Bônus de Formação
export function calcularBonusFormacao(team) {
    const activeKnights = (team || []).filter(k => k);
    if (activeKnights.length < 3) {
        return { nome: 'Incompleto', dmg: 0, hp: 0 };
    }

    // Count elements
    const counts = {};
    activeKnights.forEach(k => {
        const elem = k.elemento;
        counts[elem] = (counts[elem] || 0) + 1;
    });

    const distinctElements = Object.keys(counts).length;
    const maxCount = Math.max(...Object.values(counts));
    const countValues = Object.values(counts).sort((a, b) => b - a);

    // Check for Mono (5 same)
    if (maxCount === 5) {
        return { nome: 'Mono Elemental', dmg: 25, hp: 25 };
    }

    // Check for Penta (5 different)
    if (distinctElements === 5) {
        return { nome: 'Penta Elemental', dmg: 20, hp: 20 };
    }

    // Check for Dominant (4 same)
    if (maxCount === 4) {
        return { nome: 'Dominante', dmg: 15, hp: 20 };
    }

    // Check for Mixed (3+2)
    if (countValues[0] === 3 && countValues[1] === 2) {
        return { nome: 'Misto', dmg: 15, hp: 15 };
    }

    // Check for Basic (3 same)
    if (maxCount === 3) {
        return { nome: 'Básico', dmg: 10, hp: 10 };
    }

    return { nome: 'Sem Bônus', dmg: 0, hp: 0 };
}


// 4. Validation: Global Selection
export function validateGlobalSelection(playerTeams) {
    const usedIds = new Set();
    for (const team of playerTeams) {
        for (const knight of team) {
            if (!knight) continue;
            if (usedIds.has(knight.id)) {
                return { valid: false, error: `Cavaleiro ${knight.nome} usado mais de uma vez!` };
            }
            usedIds.add(knight.id);
        }
    }
    return { valid: true };
}


// 5. Logic: Sugerir Contra-Time
export function sugerirContraTime(enemyTeam, availableKnights, boss = null) {
    // BOSS MODE: Otimizar para causar máximo dano ao boss
    if (boss) {
        return sugerirTimeDanoMaximo(boss, availableKnights);
    }

    // NORMAL MODE: Contra-time tradicional
    if (!enemyTeam || enemyTeam.length === 0) return [];

    const activeEnemies = enemyTeam.filter(k => k);
    if (activeEnemies.length === 0) return [];

    // 1. Analyze Enemy Composition
    const enemyElements = {};
    activeEnemies.forEach(k => {
        enemyElements[k.elemento] = (enemyElements[k.elemento] || 0) + 1;
    });

    // Find Dominant Enemy Element
    let dominantElement = null;
    let maxCount = 0;
    Object.entries(enemyElements).forEach(([elem, count]) => {
        if (count > maxCount) {
            maxCount = count;
            dominantElement = elem;
        }
    });

    // Determine Target Element (Counter)
    const counterMap = {
        [ELEMENTS.FIRE]: ELEMENTS.WATER,
        [ELEMENTS.WIND]: ELEMENTS.FIRE,
        [ELEMENTS.EARTH]: ELEMENTS.WIND,
        [ELEMENTS.WATER]: ELEMENTS.EARTH,
        [ELEMENTS.LIGHT]: ELEMENTS.DARK,
        [ELEMENTS.DARK]: ELEMENTS.LIGHT
    };

    const targetElement = counterMap[dominantElement] || null;

    // 2. Filter Pool for Counters
    // FILTER: Only use knights that are "Adquirido" by the player
    const playerPool = availableKnights.filter(k => isKnightAcquired(k.id));

    const potentialTeams = [];

    // Strategy A: Mono Counter
    if (targetElement) {
        const counters = playerPool.filter(k => k.elemento === targetElement || k.elemento === ELEMENTS.LIGHT || k.elemento === ELEMENTS.DARK);
        if (counters.length >= 5) {
            potentialTeams.push(counters.slice(0, 5));
        }
    }

    // Strategy B: Best Mono Available
    const poolCounts = {};
    playerPool.forEach(k => {
        poolCounts[k.elemento] = (poolCounts[k.elemento] || 0) + 1;
    });

    Object.keys(ELEMENTS).forEach(elem => {
        const candidates = playerPool.filter(k => k.elemento === elem || k.elemento === ELEMENTS.LIGHT || k.elemento === ELEMENTS.DARK);
        if (candidates.length >= 5) {
            potentialTeams.push(candidates.slice(0, 5));
        }
    });

    // Strategy C: Penta
    const distincts = [];
    const usedElems = new Set();
    for (const k of playerPool) {
        if (!usedElems.has(k.elemento)) {
            distincts.push(k);
            usedElems.add(k.elemento);
        }
        if (distincts.length === 5) break;
    }
    if (distincts.length === 5) potentialTeams.push(distincts);

    // 3. Evaluate Candidates
    let bestTeam = [];
    let bestScore = -1;

    if (potentialTeams.length === 0 && playerPool.length >= 5) {
        potentialTeams.push(playerPool.slice(0, 5));
    }

    potentialTeams.forEach(team => {
        const bonus = calcularBonusFormacao(team);
        let score = bonus.dmg + bonus.hp;

        // Elemental Advantage Bonus
        team.forEach(knight => {
            activeEnemies.forEach(enemy => {
                const mult = calcularMultiplicadorElemental(knight, enemy);
                if (mult > 1) score += 5;
            });
        });

        if (score > bestScore) {
            bestScore = score;
            bestTeam = team;
        }
    });

    return bestTeam;
}

// 5b. Logic: Sugerir Time para Dano Máximo no Boss
function sugerirTimeDanoMaximo(boss, availableKnights) {
    const playerPool = availableKnights.filter(k => isKnightAcquired(k.id));
    
    // Priorizar personagens com vantagem elemental contra o boss
    const counterMap = {
        [ELEMENTS.FIRE]: ELEMENTS.WATER,
        [ELEMENTS.WIND]: ELEMENTS.FIRE,
        [ELEMENTS.EARTH]: ELEMENTS.WIND,
        [ELEMENTS.WATER]: ELEMENTS.EARTH,
        [ELEMENTS.LIGHT]: ELEMENTS.DARK,
        [ELEMENTS.DARK]: ELEMENTS.LIGHT
    };
    
    const bossElement = boss.elemento;
    const targetElement = counterMap[bossElement] || bossElement;
    
    // MECÂNICA ESPECIAL: Boss TREVAS recebe mais dano de personagens TREVAS
    const bossIsDark = bossElement === ELEMENTS.DARK;
    
    // Pontuação de dano por role (baseado na mecânica real do jogo)
    const roleDamageScore = {
        [ROLES.ASSASSIN]: 15,  // Mayor dano, baixo HP - MÁXIMO DANO
        [ROLES.MAGE]: 12,      // Alto dano mágico
        [ROLES.WARRIOR]: 10,   // Balanceado
        [ROLES.SUPPORT]: 5,    // Menos dano
        [ROLES.TANK]: 3        // Mínimo dano
    };

    const potentialTeams = [];

    // Strategy A: Mono Elemento com vantagem
    let counters = playerPool.filter(k => {
        if (bossIsDark) {
            // MECÂNICA ESPECIAL: Boss TREVAS → personagens TREVAS causam mais dano
            return k.elemento === ELEMENTS.DARK;
        } else {
            // Boss normal → usar vantagem elemental
            return k.elemento === targetElement || 
                   k.elemento === ELEMENTS.LIGHT || 
                   k.elemento === ELEMENTS.DARK;
        }
    });
    
    // Ordenar por dano (role mais importante)
    counters.sort((a, b) => (roleDamageScore[b.role] || 0) - (roleDamageScore[a.role] || 0));
    
    if (counters.length >= 5) {
        potentialTeams.push(counters.slice(0, 5));
    }
    
    // Se não tem 5 TREVAS para boss TREVAS, usar a melhor combinação disponível
    if (bossIsDark && counters.length < 5) {
        const darkCount = playerPool.filter(k => k.elemento === ELEMENTS.DARK).length;
        if (darkCount > 0 && darkCount < 5) {
            // Usar todos os TREVAS + preenchimento com outros elementos
            const darkKnights = playerPool.filter(k => k.elemento === ELEMENTS.DARK);
            const othersNeeded = 5 - darkKnights.length;
            const others = playerPool.filter(k => k.elemento !== ELEMENTS.DARK);
            others.sort((a, b) => (roleDamageScore[b.role] || 0) - (roleDamageScore[a.role] || 0));
            const team = [...darkKnights, ...others.slice(0, othersNeeded)];
            if (team.length === 5) potentialTeams.push(team);
        }
    }

    // Strategy B: Melhor mono disponível
    Object.keys(ELEMENTS).forEach(elem => {
        const candidates = playerPool.filter(k => 
            k.elemento === elem || 
            k.elemento === ELEMENTS.LIGHT || 
            k.elemento === ELEMENTS.DARK
        );
        candidates.sort((a, b) => (roleDamageScore[b.role] || 0) - (roleDamageScore[a.role] || 0));
        if (candidates.length >= 5) {
            potentialTeams.push(candidates.slice(0, 5));
        }
    });

    // Strategy C: Penta (5 elementos diferentes) - ÚLTIMA OPÇÃO
    const distincts = [];
    const usedElems = new Set();
    for (const k of playerPool) {
        if (!usedElems.has(k.elemento)) {
            distincts.push(k);
            usedElems.add(k.elemento);
        }
        if (distincts.length === 5) break;
    }
    if (distincts.length === 5) potentialTeams.push(distincts);

    // Evaluate candidates for MAXIMUM DAMAGE
    let bestTeam = [];
    let bestScore = -1;

    if (potentialTeams.length === 0 && playerPool.length >= 5) {
        potentialTeams.push(playerPool.slice(0, 5));
    }

    potentialTeams.forEach(team => {
        const bonus = calcularBonusFormacao(team);
        let score = 0;

        // Score baseado em bônus (prioriza dano)
        score += bonus.dmg * 2;  // Dobrar peso para dano
        score += bonus.hp;       // HP é secundário

        // Bônus elemental contra o boss
        let elementalBonus = 0;
        team.forEach(knight => {
            if (bossIsDark && knight.elemento === ELEMENTS.DARK) {
                // MECÂNICA ESPECIAL: Boss TREVAS recebe +DANO de personagens TREVAS
                elementalBonus += 30;  // Grande bônus!
            } else {
                const mult = calcularMultiplicadorElemental(knight, boss);
                if (mult > 1) {
                    elementalBonus += 25;  // Grande bônus por vantagem elemental
                } else if (mult < 1) {
                    elementalBonus -= 20;  // Penalidade por desvantagem
                }
            }
        });
        score += elementalBonus;

        // Bônus por personagens de alto dano (ROLE É CHAVE)
        team.forEach(knight => {
            score += (roleDamageScore[knight.role] || 0);
        });

        if (score > bestScore) {
            bestScore = score;
            bestTeam = team;
        }
    });

    return bestTeam;
}

// 6. Logic: Configuration Management
export const knightConfig = {};

export function loadConfigs() {
    try {
        const saved = localStorage.getItem('saintSeiyaConfig');
        if (saved) {
            Object.assign(knightConfig, JSON.parse(saved));
        }
    } catch (e) {
        console.error("Erro ao carregar configs", e);
    }

    // Ensure defaults for all knights
    databaseCavaleiros.forEach(k => {
        if (!knightConfig[k.id]) {
            knightConfig[k.id] = {
                disponivel: true,
                adquirido: true,
                constelacao: 0,
                armadura: 0
            };
        }
    });
}

export function saveConfigs() {
    localStorage.setItem('saintSeiyaConfig', JSON.stringify(knightConfig));
}

export function isKnightAcquired(id) {
    return knightConfig[id]?.adquirido !== false;
}

export function isKnightAvailableAI(id) {
    return knightConfig[id]?.disponivel !== false;
}
