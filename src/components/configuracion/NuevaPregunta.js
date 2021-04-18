import React, { Fragment } from 'react';

import Grid from '@material-ui/core/Grid';
import MenuPrincipal from '../inicio/menuPrincipal';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';



const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormLabel-root':
        {
            fontSize: 20,
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

    },
    text: {
        fontSize: 18,
        marginTop: -10
    }

}));


const NuevaPregunta = () => {



    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };



    return (
        <Fragment>
            <AppBar position="absolute" color="default" className={classes.appBar}>
                <MenuPrincipal />

            </AppBar>
            <form

            >


                <main className={classes.layout}>
                    <Paper className={classes.paper}>


                        <div className="campos-obligatorios">
                            <h3>Los campos marcados con * son obligatorios</h3>
                        </div>

                        <h1>Registrar Pregunta</h1>
                        <br></br>

                        <hr></hr>
                        <br></br>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <FormControl required className={classes.formControl}>
                                    <InputLabel className={classes.text} id="demo-simple-select-required-label">Pregunta</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-required-label"
                                        id="demo-simple-select-required"
                                        value={age}
                                        onChange={handleChange}
                                        className={classes.selectEmpty}
                                    >

                                        <MenuItem value={10}>¿Cómo se llama tu abuelo paterno?</MenuItem>
                                        <MenuItem value={20}>¿Cuál fue tu primera escuela primaria?</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    id="cardNumber"
                                    label="Respuesta"
                                    className={classes.root}
                                    fullWidth
                                    autoComplete="cc-number"

                                />
                            </Grid>
                        </Grid>

                        <div className={classes.buttons}>
                            <Button className={classes.button}>
                                Limpiar
                    </Button>

                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                            >Registrar
                        </Button>
                        </div>
                    </Paper>

                </main>

            </form>
        </Fragment >
    );
}

export default NuevaPregunta;


