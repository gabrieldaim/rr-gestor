import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export async function login(email: string, password: string, setIsLoading: (isLoading: boolean) => void) {
  setIsLoading(true);
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const { token, ...userData } = response.data;

    // Salvar token e dados do usuário localmente de forma segura
    localStorage.setItem('token', token);
    localStorage.setItem('userData', JSON.stringify(userData));

    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  } finally {
    setIsLoading(false);
  }
}
