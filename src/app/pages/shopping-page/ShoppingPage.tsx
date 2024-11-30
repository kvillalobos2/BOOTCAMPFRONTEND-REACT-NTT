import { FC, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../hooks/useModal';
import { useGlobalAppDispatch, useGlobalAppState } from "../../context/app-context";
import { AppActions } from "../../domain/actions-type";
import { formValidation } from '../../../utils/validation';
import ShoppingCart from "../../components/shopping-cart/ShoppingCart";
import Header from "../../components/header/Header";
import Form from "../../components/form/Form";
import "./ShoppingPage.css";


interface FormData {
  name: string;
  lastname: string;
  district: string;
  address: string;
  reference: string;
  phone: string;
}

const initialFormData: FormData = {
  name: '',
  lastname: '',
  district: '',
  address: '',
  reference: '',
  phone: '',
};

const initialErrors = {
  name: '',
  lastname: '',
  district: '',
  address: '',
  reference: '',
  phone: '',
};

const ShoppingPage: FC = () => {
  const { cart } = useGlobalAppState();
  const dispatch = useGlobalAppDispatch();
  const navigate = useNavigate();
  const { isModalVisible, openModal, closeModal } = useModal();

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState(initialErrors);

  const handleCartAction = (type: AppActions, productId: number) => {
    dispatch({ type, payload: productId });
  };

  const calculateTotal = (): number => 
    cart.reduce((total, item) => total + item.product.price * item.quantity, 0);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const trimmedValue = value.trimStart();
    
    const fieldName = name as keyof FormData;
    
    const updatedFormData = { ...formData, [fieldName]: trimmedValue };
    setFormData(updatedFormData);

    const validationErrors = formValidation(updatedFormData);
    setErrors(prev => ({ ...prev, [fieldName]: validationErrors[fieldName] }));
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
 
    const normalizedFormData: FormData = {
      name: formData.name.trim(),
      lastname: formData.lastname.trim(),
      district: formData.district.trim(),
      address: formData.address.trim(),
      reference: formData.reference.trim(),
      phone: formData.phone.trim(),
    };
  
  
    const validationErrors = formValidation(normalizedFormData) as FormData;
    setErrors(validationErrors);
  
  
    const isValid = Object.values(validationErrors).every(err => err === '');
    
    if (isValid) {
      console.log({
        nombre: normalizedFormData.name,
        apellido: normalizedFormData.lastname,
        telefono: normalizedFormData.phone,
        distrito: normalizedFormData.district,
        direccion: normalizedFormData.address,
        referencia: normalizedFormData.reference,
        total: calculateTotal(),
        productos: cart,
      });
  
      openModal();
      setFormData(initialFormData);
    }
  };
  

  return (
    <div className="shopping-page">
      <Header />
      <main className="shopping-page__main">
        <div className="shopping-page__cart">
          <ShoppingCart
            cart={cart}
            handleIncrement={(id) => handleCartAction(AppActions.IncrementProduct, id)}
            handleDecrement={(id) => handleCartAction(AppActions.DecrementProduct, id)}
            handleRemove={(id) => handleCartAction(AppActions.DeleteProduct, id)}
            calculateTotal={calculateTotal}
          />
        </div>
        <div className="shopping-page__form-container">
          <Form 
            formData={formData}
            errors={errors}
            isModalVisible={isModalVisible}
            onSubmit={handleSubmit}
            onChange={handleChange}
            onCloseModal={() => {
              closeModal();
              navigate('/');
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default ShoppingPage;