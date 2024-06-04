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
position: fixed;
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
background-color: #000000db;
z-index: 1;

@media (min-width:750px){
    display: none;
}
`

let SDrawer = styled.div<{ $ouverture: boolean }>`
background-color: #f0f8ffc1;
position: fixed;
width: 50%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
transform: translateX(${(props: { $ouverture: boolean }) => (props.$ouverture ? "0" : "-100%")});
transition: 0.3s ease-in-out;
z-index: 2;

@media (min-width:750px){
    display: none;
}
`


let Navroutes = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
flex-direction: column;


`

let Navroute = styled(Link)`
display: flex;
justify-content: center;
align-items: center;
width: 100%;

text-decoration: none;
font-size: 1.2em;
color: #ffffff;
margin-right: 20px;
padding: 5px 10px;
border: 1px solid white;
border-radius: 9px;
transition: 0.3s ease-in-out;
margin-top: 10px;
background-color: #291a49c0;
&:hover{
    background-color: #731171c0;
}
`