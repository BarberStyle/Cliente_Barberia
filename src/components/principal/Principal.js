import React from 'react'
import { Fragment } from 'react';
import Barra from '../../components/layout/Barra';
import Header from '../layout/Header';
import Logo from '../principal/Logo';



const Principal = () => {


    return (
        <Fragment>
            <Header />
            <Barra />
            <Logo />
        </Fragment>
    )
}

export default Principal;
