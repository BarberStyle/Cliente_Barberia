import React from 'react';
import ListaServicios from '../servicios/listadoServicios';
import MenuPrincipal from '../inicio/menuPrincipal';


const Servicios = () => {


    return (
        <div className="contenedor-app">
            <div className="seccion-principal">
                <MenuPrincipal />
                <main>
                    <br></br>
                    <div className="contenedor-tareas">
                        <ListaServicios/>
                    </div>

                </main>
            </div>
        </div>
    );
}

export default Servicios;