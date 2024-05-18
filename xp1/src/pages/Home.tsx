import React from 'react'
import styled from 'styled-components'

const Home = () => {
    return (
        <Backy>
            <Title>
                Home
            </Title>
        </Backy>
    )
}

export default Home

let Backy = styled.div`
background: linear-gradient(-45deg, white 0%, blue 100%);
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`

let Title = styled.div`
background-color: #000000bb;
padding: 5% 10%;
border-radius: 10px;
font-size: 5.5em;
color: white;
box-shadow: 9px 8px 8px black;
`
