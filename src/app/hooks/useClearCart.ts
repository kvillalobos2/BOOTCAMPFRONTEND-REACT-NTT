
import { useGlobalAppDispatch } from '../context/app-context';
import { AppActions } from '../domain/actions-type'; // Ruta para tu enum de acciones

const useClearCart = () => {
  const dispatch = useGlobalAppDispatch(); 

  const clearCart = () => {
    dispatch({ type: AppActions.ClearCart }); 
  };

  return clearCart;
};

export default useClearCart;
