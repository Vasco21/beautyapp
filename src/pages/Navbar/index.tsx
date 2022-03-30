import React, { useState, useRef, useEffect } from 'react';
import Logo from '../../assets/logo.png'
import {
    Nav,
    NavLogo,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./styles";


const Navbar = () => {
    return (
        <>
           <Nav>
            <NavLogo to="/">
            <div>
            <img src={Logo} />
          </div>
            </NavLogo>
            <Bars />

            <NavMenu>
                <NavLink 
                  to="/Cart/*" 
                >
                    Your Oder
                </NavLink>
                <NavLink 
                  to="/AboutUS" 
                >
                    About
                </NavLink>
                <NavLink 
                  to="/ContactUs" 
                >
                    Contact
                </NavLink>
                
            </NavMenu> 
           </Nav> 
        </>
    );
};
export default Navbar;