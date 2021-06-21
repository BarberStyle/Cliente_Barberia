import React, { useState, useContext ,Fragment} from 'react';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { makeStyles } from '@material-ui/core/styles';
import ReporteContext from '../../context/reportes/reporteContext';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(18),
        fontWeight: theme.typography.fontWeightRegular,
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
    }


}));

const ListadoReportes = () => {
    const ref = React.createRef();
    const classes = useStyles();

    const reporteContext = useContext(ReporteContext);

    const { generarReporte,mostrarModalGanancias } = reporteContext;

    const mostrarModal = () => {
        mostrarModalGanancias();
    }

    return (
        <Fragment>
            <div className="contenedor-basico sombra-dark">
                <div className="row">
                    <div className="col-md-3 d-flex align-items-stretch " >
                        <div className="d-flex flex-grow-1 align-items-center bg-hover-light p-4 rounded">
                            <div className="mr-4 flex-shrink-0 text-center">
                                <button className="item-report" onClick={() => mostrarModal()}><MonetizationOnIcon /></button>
                            </div> <div className="text-muted">Ganancias</div>
                        </div>
                    </div>
                    <div className="col-md-3 d-flex align-items-stretch" >
                        <div className="d-flex flex-grow-1 align-items-center bg-hover-light p-4 rounded">
                            <div className="mr-4 flex-shrink-0 text-center" >
                                <a ><i className="icon-2x text-dark-50 la la-th-large"></i></a>
                            </div> <div className="text-muted">Inventario de Productos</div>
                        </div>
                    </div>
                    <div class="col-md-3 d-flex align-items-stretch" >
                        <div class="d-flex flex-grow-1 align-items-center bg-hover-light p-4 rounded">
                            <div class="mr-4 flex-shrink-0 text-center" >
                                <a class="icon"><i class="icon-2x text-dark-50 la la-th-large"></i></a>
                            </div> <div class="text-muted">Ingresos</div>
                        </div>
                    </div>
                    <div class="col-md-3 d-flex align-items-stretch" >
                        <div class="d-flex flex-grow-1 align-items-center bg-hover-light p-4 rounded">
                            <div class="mr-4 flex-shrink-0 text-center" >
                                <a class="icon"><i class="icon-2x text-dark-50 la la-th-large"></i></a>
                            </div> <div class="text-muted">Ingresos</div>
                        </div>
                    </div>

                </div>

            </div>
          
        </Fragment>
    );
}

export default ListadoReportes;