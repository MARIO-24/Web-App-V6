import { useState } from 'react';
import "./login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../service/firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !contraseña) {
      setError('Por favor ingresa todos los campos.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, contraseña);
      const user = userCredential.user;
      setSuccess(true);
      setError('');
      console.log('Login exitoso. ID de usuario:', user.uid);
      navigate('/camilo');
    } catch (error) {
      setSuccess(false);
      setError("Contraseña o Email incorrecto");
    }
  };

  return (
    <div className="login-page">
      <form className="login-container" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="submit-button">Ingresar</button>

        <div className="footer-links">
          <p>
            <a href="/resetpassword" className="forgot-password-link">¿Olvidaste tu contraseña?</a>
          </p>
        </div>

        <div className="footer-links" style={{ marginTop: '25px' }}>
          <a href="/" className="back-link">🡐 Volver</a>
        </div>
      </form>
    </div>
  );
}

export default Login;