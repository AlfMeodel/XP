import styled from "styled-components";

interface PropsBarrePV {
    pvActuels: number;
    pvMax: number;
}

const BarrePV: React.FC<PropsBarrePV> = ({ pvActuels, pvMax }) => {
    const pourcentagePV = (pvActuels / pvMax) * 100;

    let couleurPV;
    if (pourcentagePV <= 20) {
        couleurPV = 'rgba(255, 0, 0, 0.6)'; // Rouge semi-transparent
    } else {
        couleurPV = 'rgba(31, 253, 31, 0.693)'; // Vert semi-transparent
    }


    return (
        <ConteneurBarrePV>
            <TextePV>
                {Math.round(pvActuels)}/{pvMax}
            </TextePV>
            <BarrePVActuels style={{ width: `${pourcentagePV}%`, backgroundColor: couleurPV }} />
        </ConteneurBarrePV>
    );
};


export default BarrePV;

const ConteneurBarrePV = styled.div`
    width: 100%;
    height: 20px;
    border: 1px solid black;
    background-color: #000000ce;
    position: relative;  // Ajoutez cette ligne pour positionner absolument les enfants
    border-radius: 5px;
`;

const BarrePVActuels = styled.div`

    height: 100%;
    transition: width 1s ease-in-out;
    position: absolute;  // Positionner absolument pour superposer sous le texte
    top: 0;
    left: 0;
    border-radius: 5px;

`;

const TextePV = styled.div`
position: absolute;
top: 0;
left: 3.5rem;

    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    z-index: 1;  // Assurez-vous que le texte est au-dessus de la barre
`;
