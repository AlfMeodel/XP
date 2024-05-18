import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaBars } from 'react-icons/fa'
import { Routes } from './Navlinks';

interface Navprops {
    routes: Routes[]
}

const Navbar: React.FC<Navprops> = ({ routes }) => {
    return (
        <Nav>
            <LeftNav>
                <NavDrawer>
                    <FaBars />
                </NavDrawer>
                <NavLogo>
                    LOGO
                </NavLogo>
            </LeftNav>
            <RightNav>
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

            </RightNav>
        </Nav>
    )
}

export default Navbar

let Nav = styled.div`
background-color: #000000bb;
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
position: fixed;
box-shadow: 9px 9px 9px black;
color: white;
padding: 1% 0;
`

let LeftNav = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
`

let RightNav = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
`

let NavDrawer = styled.div`
display: flex;
justify-content: center;
align-items: center;

font-size: 2em;
color: white;
margin-left: 20px;
`

let NavLogo = styled.div`
display: flex;
justify-content: center;
align-items: center;

font-size: 2em;
color: white;
margin-left: 20px;
`

let Navroutes = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
`

let Navroute = styled(Link)`
display: flex;
justify-content: center;
align-items: center;

text-decoration: none;
font-size: 1.2em;
color: white;
margin-left: 20px;
padding: 5px 10px;
border: 1px solid white;
border-radius: 9px;
transition: 0.3s ease-in-out;
&:hover{
    background-color: purple;
}
`
