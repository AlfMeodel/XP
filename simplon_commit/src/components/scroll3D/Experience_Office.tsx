import React from 'react'
import { ModelOffice } from './Office'
import { ScrollControls } from '@react-three/drei'
import Overlay from './Overlay'

const Experience = () => {
    return (
        <>

            <ScrollControls pages={4} damping={0.25}>
                <Overlay />
                <ambientLight />
                <ModelOffice scale={[1.2, 1.2, 1.2]} position={[0, -1, 0]} />
            </ScrollControls>

        </>
    )
}

export default Experience
