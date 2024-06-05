import React from 'react'
import { Routes } from './Navlinks'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

interface DrawerInterface {
    routes: Routes[],
    ouverture: boolean,
    interrupteur: () => void
}

const Drawer: React.FC<DrawerInterface> = ({ routes, ouverture, interrupteur }) => {
    return (
        <>
            {ouverture && <Backdrop onClick={interrupteur} />}

            <SDrawer $ouverture={ouverture}>
                <Navroutes>
                    {
                        routes.map((route) => {
                            return (
                                <Navroute to={route.path} key={route.name}>
                                    {route.name}
                                </Navroute>
                            )
                        })
                    }
                </Navroutes>

            </SDrawer>
        </>
    )
}

export default Drawer


let Backdrop = styled.div`
background-color: #000000bb;
width: 100%;
height: 100vh;
position: fixed;
z-index: 1;

@media (min-width:750px){
    display: none;
}

`

let SDrawer = styled.div<{ $ouverture: boolean }>`
background: linear-gradient(-45deg, #ffffffd0 0%, #93c1c0a0 100%);
width: 60%;
height: 100vh;
position: fixed;
z-index: 1;
transition: 0.3s ease-in-out;
display: flex;
justify-content: center;
align-items: center;
box-shadow:inset -1px 0px 15px #21225fb5;

transform: translateX(${(props: { $ouverture: boolean }) => (props.$ouverture ? "0" : "-100%")});

@media (min-width:750px){
    display: none;
}
`
let Navroutes = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
flex-direction: column;
border: 1px solid white;
border-radius: 15px;
padding: 5% 15%;
/* background-color: #053671a8; */
background: linear-gradient(-45deg, #32465363 0%, #45286062 100%);
box-shadow: 7px 7px 7px #0000004b,inset 2px 2px 3px #000000ba;

`

let Navroute = styled(Link)`
display: flex;
justify-content: center;
align-items: center;

text-decoration: none;
color: white;
font-size: 1.2em;
border: 1px solid white;
padding: 5px 10px;
border-radius: 10px;
transition: 0.3s ease-in-out;
width:100%;
margin: 9px 0;
background-color: #032e41ae;
box-shadow: 3px 3px 7px #0000004b,inset 2px 2px 3px #000000ba;


&:hover{
    background-color: #670167b0;
}
`