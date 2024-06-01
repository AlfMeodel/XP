/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/WawaOffice.glb 
*/

import React, { useLayoutEffect, useRef } from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import { BufferGeometry, Material, Vector3 } from 'three'
import * as THREE from 'three'
import gsap from 'gsap'
import { useFrame } from '@react-three/fiber'

interface ModelProps {

}

interface GLTFTypes {
  nodes: { [name: string]: NodesProps }
  materials: { [name: string]: Material }
}

interface NodesProps {
  material?: Material,
  geometry?: BufferGeometry,
  position?: number[] | Vector3
}

export let ETAGE_NOMBRE = 3
export let ETAGE_TAILLE = 2.6

export let degreesToRadians = (degrees: number) => {
  return degrees * (Math.PI / 180)
}

export function ModelOffice(props: ModelProps) {
  const { nodes, materials } = useGLTF('/models/WawaOffice.glb') as GLTFTypes
  let wholeRef = useRef<THREE.Group | null>(null)
  let object1 = useRef<THREE.Group | null>(null)
  let object2 = useRef<THREE.Group | null>(null)
  let object3 = useRef<THREE.Group | null>(null)

  let scroll = useScroll()
  let tl = useRef<gsap.core.Timeline | null>(null)


  useFrame(() => {
    if (tl.current) {
      tl.current.seek(scroll.offset * tl.current.duration())
    }
  })

  useLayoutEffect(() => {
    tl.current = gsap.timeline()
    if (wholeRef.current) {
      tl.current.to(
        wholeRef.current.position, {
        duration: 2,
        y: -ETAGE_TAILLE * (ETAGE_NOMBRE - 1)
      }, 0
      )
    }
    if (object3.current) {
      tl.current.to(
        object3.current.rotation, {
        duration: 2,
        x: 0,
        y: 0,
        z: 0,
      }, 0
      )
    }

    if (object1.current) {
      tl.current.to(
        object1.current.rotation, {
        duration: 2,
        x: 0,
        y: degreesToRadians(-90),
        z: 0,
      }, 0
      )
    }




  }, [])



  return (
    <group {...props} dispose={null} ref={wholeRef}>

      <group >
        <group ref={object1}>
          <mesh geometry={nodes['01_office'].geometry} material={materials['01']} />

        </group>
      </group>

      <group>
        <group ref={object2}>
          <mesh geometry={nodes['02_library'].geometry} material={materials['02']} position={[0, 2.114, -2.23]} />

        </group>
      </group>

      <group>
        <group ref={object3}>
          <mesh geometry={nodes['03_attic'].geometry} material={materials['03']} position={[-1.97, 4.227, -2.199]} />

        </group>
      </group>

    </group>
  )
}

useGLTF.preload('/models/WawaOffice.glb')
