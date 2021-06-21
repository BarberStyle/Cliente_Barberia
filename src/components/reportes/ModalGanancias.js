import React, { Fragment, useContext, useState, useEffect } from 'react';
import ReporteContext from '../../context/reportes/reporteContext';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Pdf from "react-to-pdf";
import Alert from '@material-ui/lab/Alert';


import {
    Table,
    Button,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
} from "reactstrap";
import { CONSULTA_ERROR } from '../../types';

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

    },
    text: {
        fontSize: 14,
        marginTop: -10

    },
    textFecha: {
        fontSize: 14,
        marginTop: -2
    },
    textField: {
        marginRight: theme.spacing(1),
        fontSize: 14,
    },
    card: {
        width: 140,
        height: 230
    }

}));

const ref = React.createRef();

const Ganancias = () => {
    const classes = useStyles();
    let str;
    let str1;

    const reporteContext = useContext(ReporteContext);

    let submit = false;

    const [modalGanancias, setModalGanancias] = useState(false);

    const { abrirModalGanancias, generarReporte, mensajeConfirmación, citas, cerrarModalGanancias } = reporteContext;

    // Obtener proyectos cuando carga el componente
    useEffect(() => {
        // si hay un error
        if (abrirModalGanancias) {
            setModalGanancias(abrirModalGanancias);
        }

        // eslint-disable-next-line
    }, [abrirModalGanancias, citas]);


    const [rango, guardarRango] = useState({
        fechaInicio: new Date(),
        fechaFinal: new Date()
    });

    const { fechaInicio, fechaFinal } = rango;

    const onChange = evento => {
        const { name, value } = evento.target;

        guardarRango({
            ...rango,
            [name]: value
        })
    }



    const consultarGanancias = () => {

        generarReporte(rango);
    }

    const cerrarModal = () => {
        cerrarModalGanancias();
    }

    return (
        <Fragment>
            <Modal isOpen={modalGanancias}>
                <ModalHeader>
                    <h3>Generar Reporte</h3>
                </ModalHeader>

                <ModalBody>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <InputLabel className={classes.textFecha} id="required-label">Fecha Inicial</InputLabel>
                            <TextField
                                required
                                id="time"
                                type="date"
                                value={fechaInicio}
                                name="fechaInicio"
                                fullWidth
                                className={classes.textField}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <InputLabel className={classes.textFecha} id="required-label">Fecha Final</InputLabel>
                            <TextField
                                required
                                id="time"
                                type="date"
                                value={fechaFinal}
                                name="fechaFinal"
                                fullWidth
                                className={classes.textField}
                                onChange={onChange}
                            />
                        </Grid>
                    </Grid>
                    {mensajeConfirmación ? (
                        <Alert severity="success">{mensajeConfirmación}</Alert>
                    ) : null}
                    <div className="Post" ref={ref}>

                        <Container>
                            <Table className="table table-striped responsive">
                                <thead>
                                    <tr>
                                        <th>Servicio</th>

                                        <th>Hora Inicio</th>
                                        <th>Hora Fin</th>
                                        <th>Costo</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {citas ? (
                                        citas.map(cita => (
                                            str = new Date(cita.horaInicio),
                                            str1 = new Date(cita.horaFin),

                                            cita.horaInicio = str.toString(),
                                            cita.horaFin = str1.toString(),

                                            <tr key={cita._id}>
                                                <td>{cita.Servicio}</td>
                                                <td>{cita.horaInicio}</td>
                                                <td>{cita.horaFin}</td>
                                                <td>{cita.costo}</td>

                                            </tr>
                                        )))
                                        :
                                        null}
                                </tbody>
                            </Table>
                        </Container>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Pdf targetRef={ref} filename="result.pdf">
                        {({ toPdf }) => <button onClick={toPdf}>Generar PDF</button>}
                    </Pdf>
                    <Button
                        onClick={() => consultarGanancias()}
                        color="primary"
                    > Consultar</Button>
                    <Button
                        color="danger"
                        onClick={() => cerrarModal()}
                    > Cancelar </Button>
                </ModalFooter>

            </Modal>

        </Fragment>
    );
}

export default Ganancias;