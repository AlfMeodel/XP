import { Scroll } from '@react-three/drei'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import firestoreDatabase from '../firebase/firebaseConfig'
import Spiner from '../redux/Spiner'
import { Spin } from 'antd'

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

    interface EventInterface {
        name: string,
        description: string,
        edit: boolean
    }

    let { month, day } = useParams()

    let [loading, setLoading] = useState(true)
    let currentYear = new Date().getFullYear()
    let [evenements, setEvenements] = useState<EventInterface[]>([
        {
            name: "evenement",
            description: "",
            edit: false
        },
        {
            name: "section1",
            description: "",
            edit: false
        },
        {
            name: "section2",
            description: "",
            edit: false
        },
    ])

    useEffect(() => {
        let fetchData = async () => {
            try {
                let docRef = doc(firestoreDatabase, `/land/${currentYear}/${month}/${day}`)
                let docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    let data = docSnap.data()
                    setEvenements(oldValues =>
                        oldValues.map((prevState) => ({
                            ...prevState, description: data[prevState.name] || ""
                        }))
                    )
                } else {
                    console.log('Pas de données pour cette requete')
                }

            } catch (error: any) {
                console.error("fetch data error", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [month, day])


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

                {
                    evenements.map((evenement, index) => (
                        <Section key={index}>
                            <SuperMenu>
                                {
                                    loading ? (
                                        <Menu>
                                            <Spin size="large" />
                                        </Menu>
                                    ) : (
                                        <Menu>
                                            {evenement.description}
                                        </Menu>
                                    )
                                }

                            </SuperMenu>
                        </Section>
                    ))

                }

            </WidthContainer>

        </Scroll>
    )
}

export default Overlay


let SuperMenu = styled.div``

let MiniMenu = styled.div``

let Menu = styled.div``


let WidthContainer = styled.div``

let Title = styled.div``

let Texte = styled.div``
