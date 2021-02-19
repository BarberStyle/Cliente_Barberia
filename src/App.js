import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Servicios from './components/servicios/Servicios';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';
import tokenAuth from './config/token';
import ServicioState from './context/servicios/servicioState';
import NuevoServicio from './components/servicios/nuevoServicio';
import RutaPrivada from './components/rutas/RutaPrivada';
import ListadoServicios from './components/servicios/listadoServicios';
import Empleados from './components/empleados/Empleados';
import EmpleadoSatate from './context/empleados/empleadoState';
import Agendamiento from './components/agendamiento/Agendamientos';
import CitaState from './context/citas/citaState';


//Revisar si tenemos un token
const token = localStorage.getItem('token');
if (token) {
  tokenAuth(token);
}

function App() {
  return (

    <EmpleadoSatate>
      <ServicioState>
        <CitaState>
          <AlertaState>
            <AuthState>
              <Router>
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                  <RutaPrivada path='/servicios' exact component={Servicios} />
                  <RutaPrivada path='/nuevo-servicio' exact component={NuevoServicio} />
                  <RutaPrivada path='/lista-servicios' exact component={ListadoServicios} />
                  <RutaPrivada path='/empleados' exact component={Empleados} />
                  <RutaPrivada path='/agendamiento' exact component={Agendamiento} />
                </Switch>
              </Router>
            </AuthState>
          </AlertaState>
        </CitaState>
      </ServicioState>
    </EmpleadoSatate>
  );
}

export default App;