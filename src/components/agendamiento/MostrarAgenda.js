import React from 'react';
import { Fragment, useContext, useEffect } from 'react';
import AgendamientoContext from '../../context/agendamiento/agendamientoContext';
import {
    Table
} from "reactstrap";

const MostrarAgenda = () => {
    const agendamientoContext = useContext(AgendamientoContext);

    const { citas } = agendamientoContext;

    if (citas.length === 0) {
        return <p>No hay agendamiento</p>
    }

    let str;
    let str1;

    return (
        <Fragment>
            <h2>Citas Agendadas</h2>
            <Table className="table table-striped">
                <thead>
                    <tr>
                        <th>Inicia</th>
                        <th>Finaliza</th>
                    </tr>
                </thead>
                <tbody>
                    {citas ? (
                        citas.map((cita) => (
                           str  = new Date(cita.horaInicio),
                           str1  = new Date(cita.horaFin),

                           cita.horaInicio = str.toTimeString(),
                           cita.horaFin = str1.toTimeString(),

                            < tr key={cita._id} >
                                <td>{cita.horaInicio}</td>
                                <td>{cita.horaFin}</td>
                            </tr>
                        ))

                    ) : null}
                </tbody>
            </Table>
        </Fragment >

    );
}

export default MostrarAgenda;