import React, { Fragment, useState, useEffect, useContext } from 'react';
import CitaContext from '../../context/citas/citaContext';
import AuthContext from '../../context/autenticacion/authContext';
import { makeStyles } from '@material-ui/core/styles';


import {
    Table,
    Container
} from "reactstrap";

function buscandoFiltro(consult) {
    return function (x) {
        return x.docCliente.includes(consult) || !consult;
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(18),
        fontWeight: theme.typography.fontWeightRegular,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        width: 105

    },
    formControl: {
        minWidth: 200,

    }

}));


const CitaEmpleado = () => {
    const classes = useStyles();
    let str;
    let str1;

    const authContext = useContext(AuthContext);
    const { usuarioAutenticado, usuario } = authContext;
    const citaContext = useContext(CitaContext);
    const { obtenerCitas, citas } = citaContext;

    const [consulta, guardarConsulta] = useState({
        consult: ''
    });

    let buscar = usuario.documento;

    const { consult } = consulta;

    useEffect(() => {

        usuarioAutenticado();
        obtenerCitas();
        // eslint-disable-next-line
    }, []);

    return ( 
        <Fragment>
        <div className="contenedor-basico sombra-dark">
            <h1>Listado de Citas</h1>

            <br></br>
            <Container>
                <Table className="table table-striped responsive">
                    <thead>
                        <tr>
                            <th>Doc. Cliente</th>
                            <th>Servicio</th>
                            <th>Doc. Empleado</th>
                            <th>Hora Inicio</th>
                            <th>Hora Fin</th>
                            <th>Costo</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citas ? (
                            citas.filter(cita => cita.docEmpleado == usuario.documento).map(cita => (
                                str = new Date(cita.horaInicio),
                                str1 = new Date(cita.horaFin),

                                cita.horaInicio = str.toString(),
                                cita.horaFin = str1.toString(),


                                <tr key={cita._id}>
                                    <td>{cita.docCliente}</td>
                                    <td>{cita.Servicio}</td>
                                    <td>{cita.docEmpleado}</td>
                                    <td>{cita.horaInicio}</td>
                                    <td>{cita.horaFin}</td>
                                    <td>{cita.costo}</td>
                                    <td>{cita.Estado}</td>
                                  
                                </tr>
                            )))
                            :
                            null}
                    </tbody>
                </Table>
            </Container>
        </div>
    </Fragment>
     );
}
 
export default CitaEmpleado;