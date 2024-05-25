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

let SpinerContainer = styled.div``
