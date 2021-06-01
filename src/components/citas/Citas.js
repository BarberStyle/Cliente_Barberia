import React from 'react';
import MenuPrincipal from '../inicio/menuPrincipal';
import AppBar from '@material-ui/core/AppBar';
import Header from '../layout/Header';
import { makeStyles } from '@material-ui/core/styles';
import ListadoCitas from './ListadoCitas';


const useStyles = makeStyles((theme) => ({

    appBar: {
        position: 'relative',
    }

}));

const Citas = () => {

    const classes = useStyles();

    return (
        <div className="seccion-principal">
            <AppBar position="absolute" color="default" className={classes.appBar}>
                <Header />
                <MenuPrincipal />
            </AppBar>

            <div className="contenedor-principal">
                <main>
                    <br></br>
                    <ListadoCitas/>
                </main>
            </div>
        </div>
      );
}
 
export default Citas;