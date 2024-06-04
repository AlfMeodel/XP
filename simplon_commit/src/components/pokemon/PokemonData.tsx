export interface Attaque {
    nom: string;
    type: string;
    puissance: number;
    precision: number;
}

export interface DonneesPokemon {
    nom: string;
    sprite: string;
    modele: string;
    pv: number;
    pvMax: number;
    attaques: Attaque[];
}

interface CorrespondanceType {
    [key: string]: {
        sansEffet?: string[];
        superEfficace?: string[];
        peuEfficace?: string[];
    };
}

export const listePokemon: DonneesPokemon[] = [
    {
        nom: 'Dracaufeu',
        modele: './models/perso0.glb',
        sprite: 'https://img.pokemondb.net/sprites/black-white/normal/charizard.png',
        pv: 360,
        pvMax: 360,
        attaques: [
            { nom: 'Deflagration', type: 'feu', puissance: 95, precision: 0.95 },
            { nom: 'Griffe', type: 'dragon', puissance: 100, precision: 0.95 },
            { nom: 'Lameair', type: 'vol', puissance: 75, precision: 0.25 },
            { nom: 'Tranche', type: 'normal', puissance: 70, precision: 1 }
        ]
    },
    {
        nom: 'Tortank',
        modele: './models/perso1.glb',
        sprite: 'https://img.pokemondb.net/sprites/black-white/normal/blastoise.png',
        pv: 362,
        pvMax: 362,
        attaques: [
            { nom: 'Surf', type: 'eau', puissance: 90, precision: 0.95 },
            { nom: 'Machouille', type: 'normal', puissance: 80, precision: 0.95 },
            { nom: 'Poing-glace', type: 'glace', puissance: 75, precision: 0.25 },
            { nom: 'Luminocanon', type: 'acier', puissance: 80, precision: 0.95 }
        ]
    },
    {
        nom: 'Florizard',
        modele: './models/perso2.glb',
        sprite: 'https://img.pokemondb.net/sprites/black-white/normal/venusaur-f.png',
        pv: 364,
        pvMax: 364,
        attaques: [
            { nom: 'Tranchherbe', type: 'plante', puissance: 90, precision: 0.95 },
            { nom: 'Bomb-beurk', type: 'poison', puissance: 90, precision: 0.95 },
            { nom: 'Seisme', type: 'sol', puissance: 100, precision: 0.25 },
            { nom: 'Plaquage', type: 'normal', puissance: 85, precision: 0.95 }
        ]
    }
];

export const correspondanceType: CorrespondanceType = {
    'Dracaufeu': {
        sansEffet: ['sol'],
        superEfficace: ['eau', 'roche'],
        peuEfficace: ['feu', 'plante', 'acier']
    },
    'Tortank': {
        superEfficace: ['plante'],
        peuEfficace: ['feu', 'eau']
    },
    'Florizard': {
        sansEffet: ['poison'],
        superEfficace: ['feu', 'vol', 'glace', 'acier'],
        peuEfficace: ['plante', 'eau']
    }
};

