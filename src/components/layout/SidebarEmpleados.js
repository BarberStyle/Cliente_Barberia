import React from 'react';
import { Fragment } from 'react';
import NuevoEmpleado from '../empleados/NuevoEmpleado';

const SidebarEmpleados = () => {
    return (

        <Fragment>
            <aside>
                <h1>BARBER<span>STYLE</span></h1>
                <NuevoEmpleado />

            </aside>
        </Fragment>

    );
}

export default SidebarEmpleados;