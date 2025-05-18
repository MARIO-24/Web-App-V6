import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, ref, set } from '../service/firebase';
import { useNavigate } from 'react-router-dom';
import Foto from '../assets/camilolo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './register.css'; // Importamos los estilos de color

function Register() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !contraseña || !nombre) {
      setError('Por favor completa todos los campos.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, contraseña);
      const user = userCredential.user;

      const userRef = ref(db, 'users/' + user.uid);
      await set(userRef, {
        nombre,
        email,
        diamantes: 0,
      });

      alert('Registro exitoso');
      navigate('/login');
    } catch (error) {
      setError(error.message);
      console.error("Error al registrar el usuario:", error);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center fondo-personalizado">
      <div className="container p-4 tarjeta-personalizada shadow rounded">
        <div className="row">
          {/* Columna izquierda con imagen y eslogan */}
          <div className="col-12 col-lg-6 d-flex flex-column align-items-center justify-content-center mb-4 mb-lg-0 fondo-lateral text-center text-white">
            <img src={Foto} alt="Camilo" className="img-fluid mb-3" style={{ maxWidth: "300px" }} />
            <p className="px-3 eslogan">
  Bienvenido al mundo de Camilo, cuídalo para obtener recompensas y hacer de él una vida mejor.
</p>

          </div>

          {/* Columna derecha con formulario */}
          <div className="col-12 col-lg-6 register-form-box">


            <h2 className="mb-4 texto-principal">Crear cuenta</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control campo-input"
                  placeholder="Nombre Completo"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control campo-input"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control campo-input"
                  placeholder="Contraseña"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  required
                />
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              <button type="submit" className="submit-button">
                Crear cuenta
              </button>

              <div className="text-center">
                <p></p>
                <a href="/login" className="enlace-login">¿Ya tienes cuenta? Inicia sesión</a>
                
              </div>
              <div>
                 <button
              className="btn btn-volver mb-3"
              onClick={() => navigate("/")}
            >
              🡐 Volver
            </button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;