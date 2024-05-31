import { Scroll } from '@react-three/drei'
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
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
@media (max-width:750px){
    width: 100%;
}
`

let Item = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 80%;
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
    let [oldEvenements, setOldEvenements] = useState<{ [key: string]: EventInterface | undefined }>({})
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

    let handleEdit = (name: string) => {
        setEvenements(oldValues =>
            oldValues.map((preventState) =>
                preventState.name === name ? { ...preventState, edit: true } : preventState
            )
        )

        setOldEvenements((prevState: { [key: string]: EventInterface | undefined }) => ({
            ...prevState, [name]: evenements.find(state => state.name === name)
        }))
    }

    let handleCancel = (name: string) => {
        setEvenements(oldValues =>
            oldValues.map((preventState) =>
                preventState.name === name ? { ...oldEvenements[preventState.name]!, edit: false } : preventState
            )
        )
    }

    let handleUpdate = async (name: string, description: string) => {
        try {
            let docRef = doc(firestoreDatabase, `/land/${currentYear}/${month}/${day}`)
            let docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                await updateDoc(docRef, { [name]: description })
            } else {
                await setDoc(docRef, { [name]: description })
                let addDefaultMonth = collection(firestoreDatabase, `/land/${currentYear}/${month}/${day}`)
                await addDoc(addDefaultMonth, {})
            }
            setEvenements(oldValues =>
                oldValues.map((current_event) =>
                    current_event.name === name ? { ...current_event, edit: false, description } : current_event
                )
            )

        } catch (error) {
            console.error("fetch data error :", error)
        }
    }


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
                                <Menu>
                                    {
                                        evenement.edit ? (
                                            <MiniMenu>
                                                <Textarea value={evenement.description} onChange={(e) => {
                                                    const newEvenements = [...evenements];
                                                    const index = newEvenements.findIndex((event) => event.name === evenement.name);
                                                    newEvenements[index].description = e.target.value;
                                                    setEvenements(newEvenements);
                                                }} />

                                                <BtnContainer>
                                                    <EditBtn onClick={() => handleUpdate(evenement.name, evenement.description)}>
                                                        Modifier
                                                    </EditBtn>
                                                    <EditBtn onClick={() => handleCancel(evenement.name)}>
                                                        Annuler
                                                    </EditBtn>
                                                </BtnContainer>
                                            </MiniMenu>
                                        ) : (
                                            <MiniMenu>
                                                <EditBtn onClick={() => handleEdit(evenement.name)}>
                                                    Modifier
                                                </EditBtn>
                                            </MiniMenu>
                                        )
                                    }
                                </Menu>

                            </SuperMenu>
                        </Section>
                    ))

                }

            </WidthContainer>

        </Scroll>
    )
}

export default Overlay

let EditBtn = styled.button`
background-color: #000000d8;
color: white;
font-size: 1.2em;
padding: 7px 12px;
margin-top: 8px;
border-radius: 9px;
margin: 0 10px;

transition: 0.3s ease-in-out;
&:hover{
    transform: scale(1.03);
}
`

let Textarea = styled.textarea`
padding: 5% 10%;
border-radius: 7px;
margin-top: 8px;

@media (max-width:750px){
    padding: 5% 0;
margin-top: 8px;
}
`

let BtnContainer = styled.div`
display: flex;

`

let SuperMenu = styled.div``

let MiniMenu = styled.div``

let Menu = styled.div``


let WidthContainer = styled.div``

let Title = styled.div``

let Texte = styled.div``
