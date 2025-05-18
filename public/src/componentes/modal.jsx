import React from 'react';
import { useNavigate } from 'react-router-dom';

const VeterinarianModal = ({ show, message, onClose, type = 'info' }) => {
  const navigate = useNavigate();

  // Si no se debe mostrar, no renderiza nada
  if (!show) return null;

  const handleClose = () => {
    if (onClose) onClose(); // Llama a la función de cierre si se proporciona
    navigate("/login");     // Redirige a /login
  };

  // Puedes adaptar estilos según el tipo, si luego quieres (por ejemplo: success, error)
  const headerStyle = {
    backgroundColor:
      type === 'success' ? '#4CAF50' :
      type === 'error' ? '#f44336' :
      '#4CAF50' // por defecto verde
  };

  return (
    <div className="modal-overlay">
      <div
        className="modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
      >
        <div className="modal-header justify-content-center" style={headerStyle}>
          <h3 id="modal-title">Mundo Camilo</h3>
        </div>
        <div className="modal-body" id="modal-desc">
          <p>{message}</p>
        </div>
        <div className="modal-footer justify-content-center">
          <button className="close-modal-button" onClick={handleClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default VeterinarianModal;