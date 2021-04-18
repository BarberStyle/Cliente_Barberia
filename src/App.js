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
import Principal from './components/principal/Principal';
import Inicio from './components/inicio/inicio';
import Somos from './components/informativo/Somos';
import Galeria from './components/informativo/Galeria';
import NuevoEmpleado from './components/empleados/NuevoEmpleado';
import NuevoProducto from './components/productos/NuevoProducto';
import Productos from './components/productos/Productos';
import ProductoState from './context/productos/productoState';
import ContraseñaState from './context/contraseñas/contrasenaState';
import IngresarCodigo from './components/seguridad/IngresarCodigo';
import NuevaPregunta from './components/configuracion/NuevaPregunta';



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
              <ProductoState>
                <AlertaState>
                  <AuthState>
                    <ContraseñaState>
                      <Router>
                        <Switch>
                          <RutaPrivada exact path="/inicio" component={Inicio} />
                          <RutaPrivada exact path="/nueva-cuenta" component={NuevaCuenta} />
                          <RutaPrivada exact path='/nuevo-servicio' component={NuevoServicio} />
                          <RutaPrivada exact path='/empleados' component={Empleados} />
                          <RutaPrivada exact path='/nuevo-empleado' component={NuevoEmpleado} />
                          <RutaPrivada exact path='/nuevo-producto' component={NuevoProducto} />
                          <RutaPrivada exact path='/productos' component={Productos} />
                          <Route exact path="/iniciar-sesion" component={Login} />
                          <Route exact path="/cambio-contrasena" component={NuevaContraseña} />
                          <RutaPrivada exact path="/nueva-pregunta" component={NuevaPregunta} />
                          <Route exact path="/ingresar-codigo" component={IngresarCodigo} />
                          <Route exact path='/servicios' component={Servicios} />
                          <Route exact path='/lista-servicios' component={ListadoServicios} />
                          <Route exact path="/somos" component={Somos} />
                          <Route exact path="/galeria" component={Galeria} />
                          <Route exact path="/" component={Principal} />
                        </Switch>
                      </Router>
                    </ContraseñaState>
                  </AuthState>
                </AlertaState>
              </ProductoState>
            </EstudioState>
          </DetalleState>
        </CitaState>
      </ServicioState>
    </EmpleadoSatate>
  );
}

export default App;