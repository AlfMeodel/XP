import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BarrePV from './HPBar';
import { DonneesPokemon, Attaque, listePokemon, correspondanceType } from './PokemonData';

const PokemonV1: React.FC = () => {
    const [creature1, setCreature1] = useState<DonneesPokemon | null>(null);
    const [creature2, setCreature2] = useState<DonneesPokemon | null>(null);
    const [commentaire, setCommentaire] = useState<string>("");
    const [fileDesCommentaires, setfileDesCommentaires] = useState<string[]>([]);
    const [combatTermine, setCombatTermine] = useState<boolean>(false);
    const delaiAttaque = React.useRef<NodeJS.Timeout | null>(null);
    const refAlerte = React.useRef(false);
    const [affichageBtnAttaque, setAffichageBtnAttaque] = useState<boolean>(true);
    const [compteurVictoires, setCompteurVictoires] = useState<number>(0);

    useEffect(() => {
        initialiserAccueil();
    }, []);

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////// GESTION DES COMMENTAIRES ///////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////


    useEffect(() => {
        if (fileDesCommentaires.length > 0) {
            const prochainCommentaire = fileDesCommentaires[0];
            setCommentaire(prochainCommentaire);
            const timer = setTimeout(() => {
                setfileDesCommentaires(oldValue => oldValue.slice(1));
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [fileDesCommentaires]);

    const majCommentaires = (nouveauCommentaire: string) => {
        setfileDesCommentaires(oldValue => [...oldValue, nouveauCommentaire]);
    };

    const commentaireAttaque = (attaquant: DonneesPokemon, attaque: Attaque) => {
        majCommentaires(`${attaquant.nom} a utilise ${attaque.nom} !`);
    };

    ////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////// INVOQUER CREATURES ///////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////

    const selectionCreatureRandom = (): DonneesPokemon => {
        return listePokemon[Math.floor(Math.random() * listePokemon.length)];
    };

    const initialiserAccueil = () => {
        let creature1 = selectionCreatureRandom();
        let creature2 = selectionCreatureRandom();

        while (creature1.nom === creature2.nom || creature1.pv <= 0 || creature2.pv <= 0) {
            creature1 = selectionCreatureRandom();
            creature2 = selectionCreatureRandom();
        }

        setCreature1(creature1);
        setCreature2(creature2);
        setAffichageBtnAttaque(true);
    };

    /////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////// CYCLE DE COMBAT ///////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    const initierCurrentAttaque = (attaque: Attaque, attaquant: DonneesPokemon, defenseur: DonneesPokemon) => {
        if (!attaquant || !defenseur || combatTermine) return;

        setAffichageBtnAttaque(false);
        commentaireAttaque(attaquant, attaque)

        delaiAttaque.current = setTimeout(() => {
            cycleCombat(attaque, attaquant, defenseur);
        }, 1000);
    };

    ///////////////////////////////// MOTEUR DU COMBAT /////////////////////////////////

    const cycleCombat = (attaque: Attaque, attaquant: DonneesPokemon, defenseur: DonneesPokemon) => {
        if (Math.random() < attaque.precision) {
            const dommages = calculDesDommages(attaque, attaquant, defenseur);
            animationPV(defenseur, dommages);
        } else {
            majCommentaires("L'attaque a echoue !");
        }
        tourAdverse(attaquant);
    };
    //////////////////////////////////////////////////////////////////////

    const animationPV = (defenseur: DonneesPokemon, dommages: number) => {
        if (combatTermine) return;

        let nouveauxPV = defenseur.pv - dommages;
        if (nouveauxPV < 0) nouveauxPV = 0;

        const intervalle = 10;
        const decrement = dommages / (1000 / intervalle);

        const majIntervalle = () => {
            if (defenseur === creature1) {
                setCreature1(precedent => {
                    const pokeMisAJour = precedent ? { ...precedent, pv: precedent.pv - decrement } : null;
                    if (pokeMisAJour && pokeMisAJour.pv <= nouveauxPV) {
                        pokeMisAJour.pv = nouveauxPV;
                        clearInterval(idIntervalle);
                    }
                    return pokeMisAJour;
                });
            } else if (defenseur === creature2) {
                setCreature2(precedent => {
                    const pokeMisAJour = precedent ? { ...precedent, pv: precedent.pv - decrement } : null;
                    if (pokeMisAJour && pokeMisAJour.pv <= nouveauxPV) {
                        pokeMisAJour.pv = nouveauxPV;
                        clearInterval(idIntervalle);
                    }
                    return pokeMisAJour;
                });
            }
        };
        const idIntervalle = setInterval(majIntervalle, intervalle);
    };

    const calculDesDommages = (attaque: Attaque, attaquant: DonneesPokemon, defenseur: DonneesPokemon): number => {
        let puissance = attaque.puissance + Math.floor(Math.random() * 10);
        const typedefenseur = correspondanceType[defenseur.nom];
        const typeAttaque = attaque.type;
        let echelle = 1;

        if (typedefenseur.sansEffet?.includes(typeAttaque)) {
            echelle = 0;
            majCommentaires("Ca n'a eu aucun effet !");
        } else if (typedefenseur.superEfficace?.includes(typeAttaque)) {
            echelle = 2;
            majCommentaires("C'etait super efficace !");
        } else if (typedefenseur.peuEfficace?.includes(typeAttaque)) {
            echelle = 0.5;
            majCommentaires("Ce n'etait pas tres efficace...");
        }

        return Math.floor(puissance * echelle);
    };

    const tourAdverse = (attaquant: DonneesPokemon) => {
        if (attaquant === creature1 && creature2) {
            delaiAttaque.current = setTimeout(() => {
                const attaqueAleatoire = creature2.attaques[Math.floor(Math.random() * creature2.attaques.length)];
                initierCurrentAttaque(attaqueAleatoire, creature2, creature1);
            }, 2000);
        } else {
            setAffichageBtnAttaque(true);

            // Ajout du délai pour effacer le commentaire
            setTimeout(() => {
                setCommentaire("");
            }, 2000);
        }
    };

    /////////////////////////////////////////////////////////////////////////////////
    //////////////////// VERIFICATION SI PV EN DESSOUS DE ZERO  ////////////////////
    //////////////////////////////////////////////////////////////////////////////


    useEffect(() => {
        if (creature1 && creature1.pv <= 0) {
            verifierGagnant(creature1);
        }
        if (creature2 && creature2.pv <= 0) {
            verifierGagnant(creature2);
        }
    }, [creature1, creature2]);



    /////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////// FIN DU COMBAT  ///////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    const verifierGagnant = (pokemon: DonneesPokemon) => {
        if (pokemon.pv <= 0 && !refAlerte.current && !combatTermine) {
            if (delaiAttaque.current) {
                clearTimeout(delaiAttaque.current);
                delaiAttaque.current = null;
            }

            setCombatTermine(true);
            setfileDesCommentaires([]);

            if (pokemon === creature1) {
                setCreature1({ ...pokemon, pv: 0 });
            } else {
                setCreature2({ ...pokemon, pv: 0 });
                setCompteurVictoires(precedent => precedent + 1);
            }

            // Augmenter le délai à 1 seconde pour correspondre à la durée de la transition
            setTimeout(() => {
                refAlerte.current = true;
                alert(`Combat terminé : ${pokemon.nom} a perdu !`);
                refAlerte.current = false;
                setCommentaire("");  // Effacer le commentaire

                initialiserAccueil();
                setCombatTermine(false);

            }, 1000);  // 1 seconde, la même durée que la transition
        }
    };
    return (
        <Scene>
            <p>Victoires : {compteurVictoires}</p>
            <ConteneurImage>
                {/* {creature1 && <Scene3D pokemon={creature1} />}
                {creature2 && <Scene3D pokemon={creature2} />} */}
                {creature1 && <img src={creature1.sprite} alt={creature1.nom} />}
                {creature2 && <img src={creature2.sprite} alt={creature2.nom} />}
            </ConteneurImage>
            <ConteneurPV>
                {creature1 && <BarrePV pvActuels={creature1.pv} pvMax={creature1.pvMax} />}
                {creature2 && <BarrePV pvActuels={creature2.pv} pvMax={creature2.pvMax} />}
            </ConteneurPV>

            <ConteneurCommentaires>
                {commentaire}
            </ConteneurCommentaires>


            <ConteneurBoutons>
                {creature1?.attaques.map((attaque, index) => (
                    <Bouton
                        key={index}
                        onClick={() => {
                            if (creature1 && creature2) {
                                initierCurrentAttaque(attaque, creature1, creature2);
                            }
                        }}
                        disabled={!affichageBtnAttaque}
                    >
                        {attaque.nom}
                    </Bouton>
                ))}
            </ConteneurBoutons>
        </Scene>
    )
}

export default PokemonV1

const Scene = styled.div`
display: flex;
flex-direction: column;
background-color: white;
padding: 5% 10%;
border-radius: 10px;`

const ConteneurImage = styled.div`
background-color: white;
display: flex;
justify-content: center;
align-items: center;`

const ConteneurPV = styled.div`
background-color: white;
display: flex;
justify-content: center;
align-items: center;
`

const Bouton = styled.button`padding: 5px 10px;
border-radius: 8px;
background-color: #075162;
color: white;`;

const ConteneurCommentaires = styled.div`background-color: white;
padding: 2%;
border-radius: 9px;`;
const ConteneurBoutons = styled.div`background-color: white;
padding: 2%;
border-radius: 9px;`;

let ContainerImg = styled.div``

let ElementImg = styled.div``



