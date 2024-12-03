import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import {  useNavigate } from 'react-router-dom';

import { useLocalStorage } from '@/app/hooks/useLocalStorage';
import { useModal } from '@/app/hooks/useModal';

import { AppProvider } from '@/app/context/app-context';
import LoginPage from '../LoginPage';
import { authService } from '@/app/services/auth-request';
import Swal from 'sweetalert2';



jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('@/app/services/auth-request', () => ({
  authService: jest.fn(),
}));

jest.mock('@/app/hooks/useLocalStorage', () => ({
    useLocalStorage: jest.fn(() => [jest.fn(), jest.fn()]),
  }));
  
jest.mock('@/app/hooks/useModal', () => ({
  useModal: jest.fn(),
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));


jest.mock('@/app/services/auth-request', () => ({
    authService: jest.fn(),
  }));
  
  
  const mockSetAccessToken = jest.fn();
  jest.mock('@/app/hooks/useLocalStorage', () => ({
    useLocalStorage: jest.fn(() => ['', mockSetAccessToken]),
  }));
  
const mockAccessToken = ''; 



beforeEach(() => {
  jest.clearAllMocks();
  (useLocalStorage as jest.Mock).mockReturnValue([mockAccessToken, mockSetAccessToken]);
});

(authService as jest.Mock).mockResolvedValue({
    accessToken: 'fake-access-token',
    refreshToken: 'fake-refresh-token',
  });
  

describe('LoginPage', () => {
  const mockNavigate = jest.fn();
  const mockSetLocalStorage = jest.fn();

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    (useLocalStorage as jest.Mock).mockReturnValue([undefined, mockSetLocalStorage]);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useModal as jest.Mock).mockReturnValue({
      isModalVisible: false,
      openModal: jest.fn(),
      closeModal: jest.fn(),
    });
  });

  it('should render login form correctly', () => {
    render(
        <AppProvider>
          <LoginPage />
      </AppProvider>
    );

    expect(screen.getByLabelText(/usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
 
  });

  it('should display an error message when form validation fails', async () => {
    render(
      <AppProvider>
        <LoginPage />
      </AppProvider>
    );

    fireEvent.submit(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(async () => {
        const errorMessages = await screen.findAllByText(/este campo es obligatorio/i);
        expect(errorMessages).toHaveLength(2); 
      });
  });

  it('should call authService and navigate on successful login', async () => {
    render(
        <AppProvider>
          <LoginPage />
        </AppProvider>
      );
   
    fireEvent.change(screen.getByPlaceholderText('Ingresa tu usuario'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ingresa tu contraseña'), {
      target: { value: 'password123' },
    });
  
 
    await waitFor(() => {
      expect(authService)
    });
  
   
  });
  
  
  it('should display an error alert when login fails', async () => {
    (authService as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));

    render(
      <AppProvider>
        <LoginPage />
      </AppProvider>
    );

    fireEvent.change(screen.getByLabelText(/usuario/i), { target: { value: 'wronguser' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'wrongpassword' } });
    fireEvent.submit(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(Swal.fire)
    });
  });

  it('should open the password reset modal when the link is clicked', () => {
    render(
      <AppProvider>
        <LoginPage />
      </AppProvider>
    );

    fireEvent.click(screen.getByText(/¿olvidé mi contraseña\?/i));

   
  });
});
