import { Canvas } from '@react-three/fiber'
import React from 'react'
import styled from 'styled-components'
import Experience from '../components/scroll3D/Experience_Office'

const LandPage = () => {
    return (
        <Backy>
            <TroisD>
                <Experience />
            </TroisD>
        </Backy>
    )
}

export default LandPage

let Backy = styled.div`
background: linear-gradient(-45deg, white 0%, blue 100%);
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`

let TroisD = styled(Canvas)`

`
