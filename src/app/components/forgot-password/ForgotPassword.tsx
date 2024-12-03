import { FC, useState } from "react";
import "./ForgotPassword.css";
import { ValidationRegex } from "@/app/domain/validation-rules";

type ForgotPasswordModalProps = {
  closeModal: () => void;
  isVisible?: boolean;
  handlePasswordReset: (email: string) => Promise<void>;  
};

const ForgotPasswordModal: FC<ForgotPasswordModalProps> = ({ closeModal, isVisible, handlePasswordReset }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  if (!isVisible) return null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!new RegExp(ValidationRegex.Email).test(email)) {
      setError('Por favor ingresa un correo electrónico válido');
      return;
    }

    try {
      await handlePasswordReset(email);  
      setError('');
      closeModal();
    } catch (error) {
      setError('Ocurrió un error al enviar el enlace de restablecimiento. Inténtalo nuevamente.');
    }
  };

  return (
    <div className={`modal ${isVisible ? "show" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">Recuperar contraseña</h2>
        <form onSubmit={onSubmit}>
          <label className="modal__label" htmlFor="email">
            Ingresa tu correo electrónico:
          </label>
          <input
            type="email"
            id="email"
            className="modal__input"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <span className="modal__error">{error}</span>}
          <div className="modal__actions">
            <button type="submit" className="modal__button modal__button--primary">
              Enviar
            </button>
            <button
              type="button"
              className="modal__button modal__button--cancel"
              onClick={closeModal}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
