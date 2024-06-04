import { Float, MeshReflectorMaterial, PresentationControls, Stage } from '@react-three/drei'
import React, { Suspense } from 'react'
import { useLoader } from '@react-three/fiber'
import ChairModel from './Chair';

const Experience_chair = () => {
    // const gltf = useLoader(GLTFLoader, './models/chair.gltf')
    return (
        <>
            <PresentationControls
                speed={1.5}
                global
                polar={[-0.1, Math.PI / 4]}
                rotation={[Math.PI / 8, Math.PI / 4, 0]}
            >
                <Stage
                    environment="city"
                    intensity={1}
                    castShadow={false}
                >
                    <Suspense fallback={null}>

                        <ChairModel scale={[0.8, 0.8, 0.8]} position={[0, -1, 0]} />

                    </Suspense>

                    {/* Ici nous allons rajouter notre chaise  */}
                </Stage>

                <mesh rotation={[-Math.PI / 2, 0, 0]} position-y={-2}>
                    <planeGeometry args={[170, 170]} />
                    <MeshReflectorMaterial
                        blur={[300, 100]}
                        resolution={2048}
                        mixBlur={1}
                        mixStrength={40}
                        roughness={1}
                        depthScale={1.2}
                        minDepthThreshold={0.4}
                        maxDepthThreshold={1.4}
                        color="#101010"
                        metalness={0.5}
                        mirror={0.5}
                    />
                </mesh>

            </PresentationControls>
        </>
    )
}

export default Experience_chair
