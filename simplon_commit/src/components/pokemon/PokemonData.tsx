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
        pvMax: 362,
        attaques: [
            { nom: 'Deflagration', type: 'feu', puissance: 130, precision: 0.75 },
            { nom: 'Griffe', type: 'normal', puissance: 60, precision: 1 },
            { nom: 'Lance-Flamme', type: 'feu', puissance: 85, precision: 0.95 },
            { nom: 'Tranche', type: 'normal', puissance: 100, precision: 0.85 }
        ]
    },
    {
        nom: 'Tortank',
        modele: './models/perso1.glb',
        sprite: 'https://img.pokemondb.net/sprites/black-white/normal/blastoise.png',
        pv: 424,
        pvMax: 424,
        attaques: [
            { nom: 'HydroCanon', type: 'eau', puissance: 120, precision: 0.75 },
            { nom: 'Griffe', type: 'normal', puissance: 50, precision: 1 },
            { nom: 'Surf', type: 'eau', puissance: 75, precision: 0.95 },
            { nom: 'Tranche', type: 'normal', puissance: 90, precision: 0.85 }
        ]
    },
    {
        nom: 'Florizard',
        modele: './models/perso2.glb',
        // sprite: 'https://www.pokebip.com/pokedex-images/300/3.png?v=ev-blueberry',
        sprite: 'https://img.pokemondb.net/sprites/black-white/normal/venusaur-f.png',
        pv: 484,
        pvMax: 484,
        attaques: [
            { nom: 'Tranchherbe', type: 'plante', puissance: 120, precision: 0.75 },
            { nom: 'Griffe', type: 'normal', puissance: 50, precision: 1 },
            { nom: 'Fouet-Liane', type: 'plante', puissance: 75, precision: 0.95 },
            { nom: 'Plaquage', type: 'normal', puissance: 90, precision: 0.85 }
        ]
    },
    {
        nom: 'Mew',
        modele: './models/perso2.glb',
        sprite: 'https://img.pokemondb.net/sprites/black-white/normal/mew.png',
        pv: 404,
        pvMax: 404,
        attaques: [
            { nom: 'Psyko', type: 'psy', puissance: 120, precision: 0.85 },
            { nom: 'Deflagration', type: 'feu', puissance: 100, precision: 0.85 },
            { nom: 'HydroCanon', type: 'eau', puissance: 100, precision: 0.85 },
            { nom: 'Tranchherbe', type: 'plante', puissance: 100, precision: 0.85 }
        ]
    },
];





export const correspondanceType: CorrespondanceType = {
    'Dracaufeu': {
        sansEffet: ['null'],
        superEfficace: ['eau'],
        peuEfficace: ['feu', 'plante']
    },
    'Tortank': {
        sansEffet: ['null'],
        superEfficace: ['plante'],
        peuEfficace: ['feu', 'eau']
    },
    'Florizard': {
        sansEffet: ['null'],
        superEfficace: ['feu'],
        peuEfficace: ['plante', 'eau']
    },
    'Mew': {
        sansEffet: ['psy'],
        superEfficace: ['normal'],
        peuEfficace: ['feu', 'eau', 'plante']
    }
};

