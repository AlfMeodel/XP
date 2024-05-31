import React, { useState } from 'react'
import Navbar from './Navbar'
import { routes } from './Navlinks';
import Drawer from './Drawer';

const Navigation = () => {

    let [ouverture, setOuverture] = useState(false)
    let interrupteur = () => {
        setOuverture(!ouverture)
    }


    return (
        <>
            <Navbar
                routes={routes}
                interrupteur={interrupteur}
            />
            <Drawer
                routes={routes}
                ouverture={ouverture}
                interrupteur={interrupteur}
            />

        </>
    )
}

export default Navigation
