
import { API_BASE_URL } from "../config/api-config";
import { AuthCredentials, AuthResponse } from "../domain/auth-response";


export const authService = async (_username: string, _password: string, credentials: AuthCredentials): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...credentials,
        expiresInMins: 30,
      }),
    });

    const data = await response.json();

    if (data.accessToken) {
      return {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
    } else {
      throw new Error('Credenciales incorrectas. Por favor, intenta nuevamente.');
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error en la autenticación');
  }
};
