import React from 'react'
import { ModelOffice } from './Office'
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
