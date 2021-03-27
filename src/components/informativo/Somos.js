import React from 'react';
import { Fragment } from 'react';
import Barra from '../layout/Barra';
import ImagenSomos from '../../images/image1.jpeg';




const Somos = () => {
    return (
        <Fragment>
            <Barra />
            <div className="contentedor-externo">
                <div className="image-somos">
                    <img src={ImagenSomos} alt="Somos" />
                </div>

                <div className="texto-somos">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean condimentum, orci in tempor vehicula, odio dui elementum augue,
                    id ullamcorper urna neque sit amet lorem. Pellentesque tristique quis massa et tincidunt.
                    Pellentesque mollis justo vel lectus consectetur, a viverra lorem vestibulum.
                    Nam arcu ex, viverra quis blandit eget, varius nec lacus. Vivamus rhoncus,
                    velit eget pharetra viverra, justo quam ullamcorper libero, ut iaculis est diam nec augue.
                    Cras nec fermentum dolor, eget tincidunt ante.</p>
                    <p>
                        Quisque et lorem vel metus bibendum efficitur et sit amet lacus.
                        Nullam tempor elit sapien, a fringilla elit accumsan at.
                        Pellentesque eget vehicula odio. Nam ut porta tortor. Ut tempor dapibus tellus,
                        a ullamcorper arcu tempus ac. Mauris erat tortor, cursus in fermentum sed,
                            volutpat id velit. Donec ornare neque vitae placerat placerat.</p>
                </div>

            </div>
        </Fragment>
    );
}

export default Somos;