import React, { FC } from 'react';
import useDistricts from '../../hooks/useDistrict';
import Modal from '../modal/Modal';
import "./Form.css";

interface FormProps {
  formData: {
    name: string;
    lastname: string;
    district: string;
    address: string;
    reference: string;
    phone: string;
  };
  errors: {
    name: string;
    lastname: string;
    district: string;
    address: string;
    reference: string;
    phone: string;
  };
  isModalVisible: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCloseModal: () => void;
}

const Form: FC<FormProps> = ({ 
  formData, 
  errors, 
  isModalVisible, 
  onSubmit, 
  onChange, 
  onCloseModal 
}) => {
  const { districts, loading, error } = useDistricts();

  if (loading) return <div>Loading districts...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <h2>Información de envío</h2>
        <div className="form-group">
          <label htmlFor="name" className="form-group__label">Nombres</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={onChange}
            className="form-group__input"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="lastname" className="form-group__label">Apellidos</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={onChange}
            className="form-group__input"
          />
          {errors.lastname && <span className="error">{errors.lastname}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="district" className="form-group__label">Distrito</label>
          <select
            id="district"
            name="district"
            value={formData.district}
            onChange={onChange}
            className="form-group__select"
          >
            <option value="">Selecciona un distrito</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
          {errors.district && <span className="error">{errors.district}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="address" className="form-group__label">Dirección</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={onChange}
            className="form-group__input"
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="reference" className="form-group__label">Referencia</label>
          <input
            type="text"
            id="reference"
            name="reference"
            value={formData.reference}
            onChange={onChange}
            className="form-group__input"
          />
          {errors.reference && <span className="error">{errors.reference}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-group__label">Celular</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            className="form-group__input"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <button type="submit" className="form__button">Comprar</button>
      </form>

      {isModalVisible && (
        <Modal
          closeModal={onCloseModal}
          isVisible={isModalVisible}
        />
      )}
    </div>
  );
};

export default Form;