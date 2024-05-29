import React from 'react'
import { ModelOffice } from './WawaOffice'
import { ScrollControls } from '@react-three/drei'
import Overlay from './Overlay'

const Experience = () => {
    return (
        <>

            <ScrollControls pages={3} damping={0.25}>
                <Overlay />
                <ambientLight />
                <ModelOffice />
            </ScrollControls>

        </>
    )
}

export default Experience
