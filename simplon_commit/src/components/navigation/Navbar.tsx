import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaBars } from 'react-icons/fa'
import { FiLogIn } from 'react-icons/fi'
import { FaUser } from 'react-icons/fa'
import { Routes } from './Navlinks';
import ProtectedRoutes from '../protected/ProtectedRoutes'
import { useDispatch } from 'react-redux'
import { Logout } from '../redux/protectedSlice'
import { message } from 'antd'


interface Navprops {
    routes: Routes[],
    interrupteur: () => void
}

const Navbar: React.FC<Navprops> = ({ routes, interrupteur }) => {

    let dispatch = useDispatch()

    let handleLogout = () => {
        localStorage.removeItem('user')
        dispatch(Logout())
        message.success("Vous êtes deconnecté")
    }
    return (
        <Nav>
            <LeftNav>
                <NavDrawer>
                    <FaBars onClick={interrupteur} />
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

                <NavUser to="/inscription" key="isncriptionUser">
                    <FaUser />
                </NavUser>
                <ProtectedRoutes>
                    <NavLog onClick={handleLogout}>
                        <FiLogIn />
                    </NavLog>
                </ProtectedRoutes>


            </RightNav>
        </Nav>
    )
}

export default Navbar

let NavUser = styled(Link)`
display: flex;
justify-content: center;
align-items: center;

font-size: 1.8em;
color: white;
margin-right: 20px;
transition: 0.3s ease-in-out;

&:hover{
    transform: scale(1.05);
}
`

let NavLog = styled.div`
font-size: 2em;
margin-right: 20px;
display: flex;
justify-content: center;
align-items: center;
transition: 0.3S ease-in-out;

&:hover{
    transform: scale(1.05);
}
`

let Nav = styled.div`
background-color: #000000b3;
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
position: fixed;
box-shadow: 9px 9px 9px black;
color: white;
padding: 1% 0;
z-index: 1;
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

@media (min-width:750px){
    display: none;
}
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

@media (max-width:750px){
    display: none;
}
`

let Navroute = styled(Link)`
display: flex;
justify-content: center;
align-items: center;

text-decoration: none;
font-size: 1.2em;
color: white;
margin-right: 20px;
padding: 5px 10px;
border: 1px solid transparent;
border-radius: 9px;
transition: 0.3s ease-in-out;
&:hover{
    /* background-color: #8000809e; */
    border: 1px solid white;

}
`
