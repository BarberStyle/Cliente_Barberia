import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PreguntaContext from '../../context/preguntas/preguntaContext';


const NuevaContraseña = (props) => {



    const preguntaContext = useContext(PreguntaContext);


    const { preguntas, obtenerPreguntas, confirmarPregunta } = preguntaContext;


    useEffect(() => {

        obtenerPreguntas();
        // eslint-disable-next-line
    }, []);


    const [validarPregunta, guardarPregunta] = useState({
        doc: '',
        preg: '',
        resp: ''

    });

    const { doc, preg, resp } = validarPregunta;

    const onChangeCambio = e => {

        const { name, value } = e.target;

        guardarPregunta({
            ...validarPregunta,
            [name]: value
        })

    }

    const onSubmitCambio = e => {


        e.preventDefault();

        let preg = preguntas.find(pregunta => pregunta.pregunta === validarPregunta.preg)
        validarPregunta.preg = preg._id;
        confirmarPregunta(validarPregunta);


    }


    return (

        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Cambio de Contraseña</h1>

                <form
                    onSubmit={onSubmitCambio}
                >
                    <div className="campo-form">
                        <label htmlFor="documento">N° Documento</label>
                        <input
                            type="text"
                            id="documento"
                            name="doc"
                            className="camposNum"
                            placeholder="Tu numero de documento"
                            value={doc}
                            onChange={onChangeCambio}

                        />
                    </div>
                    <div className="campo-form">

                        <label>Elija La Pregunta de Seguridad</label>
                        <select
                            type="text"
                            className="input-text"
                            name="preg"
                            value={preg}
                            onChange={onChangeCambio}

                        >
                            <option>--Seleccione--</option>
                            {preguntas.map(pregunta => (
                                <option
                                    key={pregunta._id}
                                >{pregunta.pregunta}</option>
                            ))}

                        </select>
                    </div>

                    <div className="campo-form">

                        <label>Respuesta</label>
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Tu respuesta"
                            name="resp"
                            value={resp}
                            onChange={onChangeCambio}


                        />
                    </div>


                    <div className="campo-form">
                        <input type="submit" className="btn btn-primary btn-block" value="Validar" />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Volver a iniciar sesión
                </Link>
            </div>
        </div>
    );
}

export default NuevaContraseña;