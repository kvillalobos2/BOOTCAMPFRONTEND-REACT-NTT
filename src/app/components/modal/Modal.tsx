import { FC } from "react";
import "./Modal.css";
import useClearCart from "../../hooks/useClearCart";

interface ModalI {
  closeModal: () => void;
  isVisible: boolean;
}

const Modal: FC<ModalI> = ({ closeModal, isVisible }) => {
  const clearCart = useClearCart();

  const handleClose = () => {
    clearCart();
    closeModal();
  };

  return (
    <div className={`modal ${isVisible ? "show" : ""}`}>
      <div className="modal__content">
        <p className="modal__text">Su pedido se registró con éxito.</p>
        <button className="modal__button" onClick={handleClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
