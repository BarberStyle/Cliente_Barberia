import React from 'react';
import { Fragment } from 'react';
import Barra from '../layout/Barra';
import { RViewerTrigger, RViewer } from 'react-viewerjs';

const Galeria = () => {

    let imagenes = [
        require("../../images/image2.jpeg"),
        require("../../images/image3.jpeg"),
        require("../../images/image4.jpeg")
    ];

    return (
        <Fragment>
            <Barra />
            <br></br>
            <h1>Galeria</h1>
            <hr></hr>
            <RViewer imageUrls={imagenes}>
                <div style={{ display: 'flex', marginTop: '40px' }}>
                    {imagenes.map((imagen, index) => {
                        return (
                            <RViewerTrigger index={index}>
                                <img src={imagen} style={{ width: '150px', height: '150px', marginLeft: '15%', border: '2px solid black' }} />
                            </RViewerTrigger>
                        )
                    })}
                </div>

            </RViewer>
        </Fragment>
    );
}

export default Galeria;