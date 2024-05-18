import React from 'react'
import Navbar from './Navbar'
import { routes } from './Navlinks';

const Navigation = () => {
    return (
        <>
            <Navbar
                routes={routes}
            />
        </>
    )
}

export default Navigation
