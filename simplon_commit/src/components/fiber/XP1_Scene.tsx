/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/XP1_Scene.glb 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { BufferGeometry, Material, Vector3 } from 'three'


interface ModelProps {

}

interface NodeProps {
  material?: Material,
  geometry?: BufferGeometry,
  position?: number[] | Vector3
}

interface GLTFTypes {
  nodes: { [name: string]: NodeProps },
  materials: { [name: string]: Material }
}

export function Model(props: ModelProps) {
  const { nodes, materials } = useGLTF('/models/XP1_Scene.glb') as GLTFTypes
  return (
    <group {...props} dispose={null}>
      <group position={[1.258, 1.097, 0]} rotation={[0, -0.618, 0]} scale={0.048}>
        <mesh geometry={nodes.Mesh1_Model_1.geometry} material={materials._LightGray_} />
        <mesh geometry={nodes.Mesh1_Model_1_1.geometry} material={materials._Tan_} />
        <mesh geometry={nodes.Mesh1_Model_1_2.geometry} material={materials._SaddleBrown_} />
        <mesh geometry={nodes.Mesh1_Model_1_3.geometry} material={materials._Gold_} />
        <mesh geometry={nodes.Mesh1_Model_1_4.geometry} material={materials.scan_4} />
        <mesh geometry={nodes.Mesh1_Model_1_5.geometry} material={materials._Gray_} />
      </group>
      <group position={[0, 0, -0.208]} rotation={[0, -0.107, 0]} scale={0.795}>
        <mesh geometry={nodes.Box001_1.geometry} material={materials._crayfishdiffuse} />
        <mesh geometry={nodes.Box001_1_1.geometry} material={materials['02___Default']} />
      </group>
      <group position={[1.743, 0, -1.736]} scale={2.983}>
        <mesh geometry={nodes.lampRoundFloor_2.geometry} material={materials.metal} />
        <mesh geometry={nodes.lampRoundFloor_2_1.geometry} material={materials.lamp} />
      </group>
      <group position={[-1.265, 0, -1.736]} scale={2.983}>
        <mesh geometry={nodes.lampRoundFloor_3.geometry} material={materials['lamp.001']} />
        <mesh geometry={nodes.lampRoundFloor_3_1.geometry} material={materials['metal.001']} />
      </group>
      <group scale={2}>
        <mesh geometry={nodes.Plane_1.geometry} material={materials['Material.002']} />
        <mesh geometry={nodes.Plane_2.geometry} material={materials.parquet} />
        <mesh geometry={nodes.Plane_3.geometry} material={materials.papestry} />
        <mesh geometry={nodes.Plane_4.geometry} material={materials.brick} />
      </group>
      <mesh geometry={nodes.Cube001.geometry} material={materials['Material.005']} position={[-2.077, 1.002, 0]} scale={[0.147, 0.536, 1]} />
      <group position={[0, 2.333, -1.983]} scale={[0.883, 0.638, 0.076]}>
        <mesh geometry={nodes.Cube003.geometry} material={materials['Material.003']} />
        <mesh geometry={nodes.Cube003_1.geometry} material={materials['Material.004']} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/XP1_Scene.glb')
