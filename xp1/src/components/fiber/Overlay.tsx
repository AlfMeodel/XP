import { Scroll } from '@react-three/drei'
import React from 'react'
import styled from 'styled-components'

interface SectionProps {
    children: React.ReactNode
}

let Section: React.FC<SectionProps> = ({ children }) => {
    return (
        <Container>
            <Element>
                <Item>
                    {children}
                </Item>
            </Element>
        </Container>
    )

}

let Container = styled.div`
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
/* align-items: center; */
flex-direction: column;
`

let Element = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 50%;
`

let Item = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 50%;
background-color: white;
border-radius: 10px;
padding: 5%;
box-shadow: 3px 3px 8px black;
`

const Overlay = () => {
    return (
        <Scroll html>
            <WidthContainer>
                <Section>
                    <Title>
                        Titre
                    </Title>
                    <Texte>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, quisquam.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, quisquam.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, quisquam.
                    </Texte>

                </Section>

            </WidthContainer>

        </Scroll>
    )
}

export default Overlay

let WidthContainer = styled.div``

let Title = styled.div``

let Texte = styled.div``
