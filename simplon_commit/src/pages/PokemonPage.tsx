import React from 'react'
import styled from 'styled-components'
import PokemonV1 from '../components/pokemon/PokemonV1'

const PokemonPage = () => {
    return (
        <Backy>
            <Title>
                <PokemonV1 />
            </Title>
        </Backy>
    )
}

export default PokemonPage

let Backy = styled.div`
background: linear-gradient(-45deg, white 0%, blue 100%);
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`

let Title = styled.div`
background-color: #00000084;
padding: 5% 10%;
border-radius: 10px;
box-shadow: 9px 8px 8px black;
`
