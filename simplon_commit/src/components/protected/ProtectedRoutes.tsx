import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootProps } from '../redux/rootReducer'

interface ProtectedInterface {
    children: React.ReactNode
}


const ProtectedRoutes: React.FC<ProtectedInterface> = ({ children }) => {
    let pro = useSelector((state: RootProps) => state.protectedStore.protected)

    return (
        <ProtectedComponents>
            {pro && children}
        </ProtectedComponents>
    )
}

export default ProtectedRoutes

let ProtectedComponents = styled.div``
