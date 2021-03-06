import React, { Fragment, useState, useContext, useEffect } from 'react';
import EmpleadoContext from '../../context/empleados/empleadoContext';
import MenuPrincipal from '../inicio/menuPrincipal';
import Header from '../layout/Header';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import ServicioContext from '../../context/servicios/servicioContext';



const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormLabel-root':
        {
            fontSize: 14,
            marginTop: -10

        }
    },
    appBar: {
        position: 'relative',
    },

    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    formControl: {
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        width: 265

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

}));


const NuevoEmpleado = () => {

    const classes = useStyles();


    //obtener el state de empleados y todas sus funciones
    const empleadoContext = useContext(EmpleadoContext);
    const servicioContext = useContext(ServicioContext);


    //extraer objetos del state
    const { mostrarError, errorformulario,
        agregarEmpleado, limpiarEmpleado, mensajeConfirmación, mensaje,limpiarAlert } = empleadoContext;


    const { tipos, obtenerTipos } = servicioContext;


    // Effect que detecta si hay un empleado seleccionado

    useEffect(() => {
        obtenerTipos();
        // eslint-disable-next-line
    }, []);

    //State para guardar los datos personales del empleado
    const [empleado, guardarEmpleado] = useState({
        tipo: '',
        documento: '',
        nombres: '',
        apellidos: '',
        correo: '',
        confirmarCorreo: '',
        telefono: '',
        fecha: '',
        perfil: '',
        contraseña: '',
        confirmarcontraseña: ''
    });

    //extraer atributos del empleado
    const { tipo, documento, nombres, apellidos, correo, telefono, fecha,
        perfil, contraseña, confirmarcontraseña, confirmarCorreo } = empleado;


    //funcion que lee los inputs
    const onChange = e => {
        const { name, value } = e.target;//destructure de los valores enviados por el metodo onchange de cada input

        if (name !== "telefono" && name !== "fecha" && name !== "documento" && name !== "correo" && name !== "confirmarCorreo"
            && name !== "confirmarcontraseña" && name !== "contraseña" && name !== "perfil"

        ) {
            let regex = new RegExp("^[ñíóáéú a-zA-Z ]+$");
            for (let i = 0; i <= value.length - 1; i++) {
                let letra = value[i]
                if (!regex.test(letra) || !letra === " ") {
                    return;
                }
            }
        }
        guardarEmpleado({
            ...empleado,
            [name]: value
        })

        limpiarAlert();
    }

    //funcion onsubmit
    const onSubmit = e => {

        e.preventDefault();

        if (contraseña.length < 6) {
            mostrarError('LA CONTRASEÑA DEBE SER MINIM DE 6 CARACTERES');
            return;
        }
        // Los 2 passwords son iguales
        if (contraseña !== confirmarcontraseña) {
            mostrarError('LAS CONTRASEÑAS NO SON IGUALES');
            return;
        }
        // confirma que Los 2 correos son iguales
        if (correo !== confirmarCorreo) {
            mostrarError('LOS CORREOS NO SON IGUALES');
            return;
        }
        if (documento <= 0) {
            mostrarError("INGRESE UN DOCUMENTO VALIDO")
            return;
        }
        if (telefono <= 0) {
            mostrarError("INGRESE UN TELÉFONO VALIDO")
            return;
        }

        agregarEmpleado(empleado);

        // Elimina empleado seleccionado del state
        limpiarEmpleado();

        //reiniciar formulario
        limpiarForm();

    }
    const limpiarForm = () => {
        guardarEmpleado({
            tipo: '',
            documento: '',
            nombres: '',
            apellidos: '',
            correo: '',
            confirmarCorreo: '',
            telefono: '',
            fecha: '',
            perfil: '',
            contraseña: '',
            confirmarcontraseña: ''
        })
    }

    return (
        <Fragment>
            <AppBar position="absolute" color="default" className={classes.appBar}>
                <Header />
                <MenuPrincipal />
            </AppBar>

            <div className="contenedor-principal">
                <br></br>

                <form
                    onSubmit={onSubmit}
                >

                    <main className={classes.layout}>
                        {errorformulario ? (<Alert severity="error">{mensaje?.msg}</Alert>) : null}
                        {mensajeConfirmación ? (<Alert severity="success">{mensajeConfirmación}</Alert>) : null}

                        <Paper className={classes.paper}>
                            <div className="campos-obligatorios">
                                <h3>Los campos marcados con * son obligatorios</h3>
                            </div>

                            <h1>Nuevo Empleado</h1>
                            <hr></hr>
                            <br></br>

                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl required className={classes.formControl}>
                                        <InputLabel className={classes.text} id="required-label">Tipo Documento</InputLabel>
                                        <Select
                                            labelId="required-label"
                                            id="select-required"
                                            value={tipo}
                                            name="tipo"
                                            className={classes.selectEmpty}
                                            fullWidth
                                            onChange={onChange}

                                        >
                                            <MenuItem value='CC'>CC</MenuItem>
                                            <MenuItem value='PASAPORTE'>PASAPORTE</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        type="number"
                                        id="documento"
                                        name="documento"
                                        label="N° Documento"
                                        value={documento}
                                        className={classes.root}
                                        fullWidth
                                        onChange={onChange}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="nombres"
                                        name="nombres"
                                        label="Nombres"
                                        value={nombres}
                                        className={classes.root}
                                        fullWidth
                                        onChange={onChange}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="apellidos"
                                        name="apellidos"
                                        label="Apellidos"
                                        value={apellidos}
                                        className={classes.root}
                                        fullWidth
                                        onChange={onChange}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        type="email"
                                        id="correo"
                                        name="correo"
                                        label="Correo Electrónico"
                                        value={correo}
                                        className={classes.root}
                                        fullWidth
                                        onChange={onChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        type="email"
                                        id="confirmarCorreo"
                                        name="confirmarCorreo"
                                        label="Confirmar correo"
                                        value={confirmarCorreo}
                                        className={classes.root}
                                        fullWidth
                                        onChange={onChange}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        required
                                        type="number"
                                        id="telefono"
                                        name="telefono"
                                        label="Teléfono"
                                        value={telefono}
                                        className={classes.root}
                                        fullWidth
                                        onChange={onChange}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>

                                    <InputLabel className={classes.textFecha} id="required-label">Fecha de nacimiento</InputLabel>
                                    <TextField
                                        required
                                        type="date"
                                        id="fecha"
                                        name="fecha"
                                        value={fecha}
                                        className={classes.textField}
                                        fullWidth
                                        onChange={onChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl required className={classes.formControl}>
                                        <InputLabel className={classes.text} id="required-label">Tipo</InputLabel>

                                        <Select
                                            required
                                            labelId="required-label"
                                            id="select-required"
                                            value={perfil}
                                            name="perfil"
                                            className={classes.selectEmpty}
                                            fullWidth
                                            onChange={onChange}
                                        >
                                            {tipos ? (
                                                tipos.map(tipo => (
                                                    <MenuItem
                                                        key={tipo._id}
                                                        value={tipo.nombreTipo}
                                                    >
                                                        {tipo.nombreTipo}
                                                    </MenuItem>
                                                )))
                                                :
                                                null}

                                        </Select>

                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        type="password"
                                        id="contraseña"
                                        name="contraseña"
                                        label="Contraseña"
                                        value={contraseña}
                                        className={classes.root}
                                        fullWidth
                                        onChange={onChange}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        type="password"
                                        id="confirmarcontraseña"
                                        name="confirmarcontraseña"
                                        label="Confirmar contraseña"
                                        value={confirmarcontraseña}
                                        className={classes.root}
                                        fullWidth
                                        onChange={onChange}

                                    />
                                </Grid>

                            </Grid>
                            <div className={classes.buttons}>

                                <Button className={classes.button}
                                    onClick={() => limpiarForm()}>
                                    Limpiar  </Button>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                >Registrar </Button>
                            </div>

                        </Paper>

                    </main>

                </form>
            </div>

        </Fragment>
    );
}

export default NuevoEmpleado;