import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ForgotPasswordModal from '../ForgotPassword';

const mockHandlePasswordReset = jest.fn();
const mockCloseModal = jest.fn();

describe('ForgotPasswordModal', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it('Should render the modal when isVisible is true', () => {
    render(
      <ForgotPasswordModal
        closeModal={mockCloseModal}
        isVisible={true}
        handlePasswordReset={mockHandlePasswordReset}
      />
    );

    expect(screen.getByText('Recuperar contraseña')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Correo electrónico')).toBeInTheDocument();
  });

  it('Should not render the modal when isVisible is false', () => {
    render(
      <ForgotPasswordModal
        closeModal={mockCloseModal}
        isVisible={false}
        handlePasswordReset={mockHandlePasswordReset}
      />
    );

    expect(screen.queryByText('Recuperar contraseña')).not.toBeInTheDocument();
  });


  it('Should call handlePasswordReset and close the modal on success', async () => {
    mockHandlePasswordReset.mockResolvedValueOnce(undefined); 

    render(
      <ForgotPasswordModal
        closeModal={mockCloseModal}
        isVisible={true}
        handlePasswordReset={mockHandlePasswordReset}
      />
    );

    const emailInput = screen.getByPlaceholderText('Correo electrónico');
    const submitButton = screen.getByText('Enviar');

    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandlePasswordReset).toHaveBeenCalledWith('valid@example.com');
      expect(mockCloseModal).toHaveBeenCalled();
    });
  });

  it('Should show an error message when handlePasswordReset fails', async () => {
    mockHandlePasswordReset.mockRejectedValueOnce(new Error('Error')); 

    render(
      <ForgotPasswordModal
        closeModal={mockCloseModal}
        isVisible={true}
        handlePasswordReset={mockHandlePasswordReset}
      />
    );

    const emailInput = screen.getByPlaceholderText('Correo electrónico');
    const submitButton = screen.getByText('Enviar');

    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Ocurrió un error al enviar el enlace de restablecimiento. Inténtalo nuevamente.')).toBeInTheDocument();
    });
  });

  it('Should call closeModal when cancel button is clicked', () => {
    render(
      <ForgotPasswordModal
        closeModal={mockCloseModal}
        isVisible={true}
        handlePasswordReset={mockHandlePasswordReset}
      />
    );

    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);

    expect(mockCloseModal).toHaveBeenCalled();
  });
});
