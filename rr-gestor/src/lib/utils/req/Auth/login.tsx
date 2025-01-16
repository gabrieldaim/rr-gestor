import axios from 'axios';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export async function login(email: string, senha: string, setIsLoading: (isLoading: boolean) => void) {
  setIsLoading(true);
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, senha });
    if(response.status === 200) {
      const { token, ...userData } = response.data;

      // Salvar token e dados do usuário localmente de forma segura
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
    }

    return response;
  } catch (error) {
    return error;
  } finally {
    setIsLoading(false);
  }
}
