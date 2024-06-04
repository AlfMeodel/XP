import { Canvas } from '@react-three/fiber'
import React from 'react'
import styled from 'styled-components'
import { CustomizationProvider } from '../components/context/Customisation'
import Configurator from '../components/chair3D/Configurator'
import Experience_chair from '../components/chair3D/Experience'

const TroisD = () => {
    return (
        <CustomizationProvider>
            <Backy>

                <SCanvas>
                    <color attach="background" args={["#213547"]} />
                    <fog attach="fog" args={["#213547", 10, 20]} />
                    <Experience_chair />
                </SCanvas>
                <Configurator />
            </Backy>
        </CustomizationProvider>
    )
}

export default TroisD

let Backy = styled.div`
background: linear-gradient(-45deg, white 0%, blue 100%);
width: 100vw;
height: 100vh;
/* display: flex;
justify-content: center;
align-items: center; */

`

let SCanvas = styled(Canvas)`

`

