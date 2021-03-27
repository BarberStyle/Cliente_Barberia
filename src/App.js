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
import CitaState from './context/citas/citaState';
import DetalleState from './context/detalle/detalleState';
import EstudioState from './context/estudios/estudioState';
import NuevaContraseña from './components/seguridad/NuevaContraseña';
import PreguntaState from './context/preguntas/preguntaState';
import Principal from './components/principal/Principal';
import Inicio from './components/inicio/inicio';
import Somos from './components/informativo/Somos';
import Galeria from './components/informativo/Galeria';
import NuevoEmpleado from './components/empleados/NuevoEmpleado';



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
          <DetalleState>
            <EstudioState>
              <PreguntaState>
                <AlertaState>
                  <AuthState>
                    <Router>
                      <Switch>
                        <Route exact path="/iniciar-sesion" component={Login} />
                        <RutaPrivada exact path="/nueva-cuenta" component={NuevaCuenta} />
                        <Route path='/servicios' exact component={Servicios} />
                        <RutaPrivada path='/nuevo-servicio' exact component={NuevoServicio} />
                        <Route path='/lista-servicios' exact component={ListadoServicios} />
                        <RutaPrivada path='/empleados' exact component={Empleados} />
                        <RutaPrivada path='/nuevo-empleado' exact component={NuevoEmpleado} />
                        <Route exact path="/cambio-contrasena" component={NuevaContraseña} />
                        <RutaPrivada exact path="/inicio" component={Inicio} />
                        <Route exact path="/somos" component={Somos} />
                        <Route exact path="/galeria" component={Galeria} />
                        <Route exact path="/" component={Principal} />
                      </Switch>
                    </Router>
                  </AuthState>
                </AlertaState>
              </PreguntaState>
            </EstudioState>
          </DetalleState>
        </CitaState>
      </ServicioState>
    </EmpleadoSatate>
  );
}

export default App;