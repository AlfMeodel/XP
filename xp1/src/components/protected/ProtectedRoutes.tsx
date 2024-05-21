import React from 'react'
import styled from 'styled-components'

interface ProtectedInterface {
    children: React.ReactNode
}

const ProtectedRoutes: React.FC<ProtectedInterface> = ({ children }) => {
    return (
        <ProtectedComponents>
            {children}
        </ProtectedComponents>
    )
}

export default ProtectedRoutes

let ProtectedComponents = styled.div``
