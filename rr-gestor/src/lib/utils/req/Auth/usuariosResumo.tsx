
  
import { ResponsavelType } from '@/types';
import axios from 'axios';
import { handleErrorResponse } from './handleErrorResponse';
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;


export const getUsuariosResumo = async (
    onLoading?: (isLoading: boolean) => void
  ): Promise<ResponsavelType> => {
    try {
      onLoading?.(true); // Inicie o carregamento
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/auth/listar`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      return response.data;
    } catch (error) {
      handleErrorResponse(error);
      console.error('Error fetching trabalhos:', error);
      throw error;
    } finally {
      onLoading?.(false); // Finalize o carregamento
    }
  };
  