import React from 'react';
import NuevoServicio from '../servicios/nuevoServicio';

const Sidebar = () => {
    return (
        <aside>
            <h1>BARBER<span>STYLE</span></h1>
            <NuevoServicio />

        </aside>
    );
}

export default Sidebar;