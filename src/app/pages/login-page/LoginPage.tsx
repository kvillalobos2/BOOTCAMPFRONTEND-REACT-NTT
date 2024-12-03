import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import './LoginPage.css';
import { authService } from '@/app/services/auth-request';
import { useLocalStorage } from '@/app/hooks/useLocalStorage';
import { useModal } from '@/app/hooks/useModal';
import ForgotPasswordModal from '@/app/components/forgot-password/ForgotPassword';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { AppActions } from '@/app/domain/actions-type';
import { useGlobalAppDispatch } from '@/app/context/app-context';

type LoginFormData = {
  username: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { isModalVisible, openModal, closeModal } = useModal();
  const [accessToken, setAccessToken] = useLocalStorage<string>('accessToken', '');
  const dispatch = useGlobalAppDispatch();
  React.useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setError('');
    try {
      const credentials = {
        username: data.username,
        password: data.password,
      };

      const { accessToken: newAccessToken, refreshToken } = await authService(data.username, data.password, credentials);

      setAccessToken(newAccessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', data.username);
      dispatch({ type: AppActions.SetUser, payload: data.username });
      navigate('/');
    } catch (error) {

      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: error instanceof Error ? error.message : 'Credenciales incorrectas. Por favor, intenta nuevamente.',
        confirmButtonText: 'Entendido',
      });
    }
  };

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    openModal();
  };

  const handlePasswordReset = async () => {
    try {

      Swal.fire({
        title: '¡Éxito!',
        text: 'Se ha enviado un enlace para restablecer la contraseña a tu correo.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    } catch (error) {
      throw new Error('No se pudo enviar el enlace de restablecimiento');
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1 className="login__title">Iniciar sesión</h1>
        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="login__input-group">
            <label className="login__label" htmlFor="username">
              <FaUser className="login__icon" /> Usuario
            </label>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              rules={{ required: 'Este campo es obligatorio' }}
              render={({ field }) => (
                <input
                  className="login__input"
                  id="username"
                  type="text"
                  {...field}
                  placeholder="Ingresa tu usuario"
                />
              )}
            />
            {errors.username && <span className="login__error">{errors.username.message}</span>}
          </div>
          <div className="login__input-group">
            <label className="login__label" htmlFor="password">
              <FaLock className="login__icon" /> Contraseña
            </label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: 'Este campo es obligatorio' }}
              render={({ field }) => (
                <input
                  className="login__input"
                  id="password"
                  type="password"
                  {...field}
                  placeholder="Ingresa tu contraseña"
                />
              )}
            />
            {errors.password && <span className="login__error">{errors.password.message}</span>}
          </div>
          <button className="login__button" type="submit">Iniciar sesión</button>
        </form>
        {error && <div className="login__error-message">{error}</div>}
        <a href="#!" onClick={handleOpenModal} className="login__forgot-password">
          ¿Olvidé mi contraseña?
        </a>
      </div>

      <ForgotPasswordModal
        isVisible={isModalVisible}
        closeModal={closeModal}
        handlePasswordReset={handlePasswordReset}
      />
    </div>
  );
};

export default LoginPage;
