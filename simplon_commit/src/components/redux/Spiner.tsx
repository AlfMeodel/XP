import { Spin } from 'antd'
import React from 'react'
import styled from 'styled-components'

const Spiner = () => {
    return (
        <SpinerContainer>
            <Spin size='large' />
        </SpinerContainer>
    )
}

export default Spiner

let SpinerContainer = styled.div`
width: 100%;
height: 100vh;
position: fixed;
z-index: 10;
background-color: #00000044;
display: flex;
justify-content: center;
align-items: center;
`
