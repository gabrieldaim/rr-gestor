
  
import { proxParcelaTrabalhosType } from '@/types';
import axios from 'axios';
import { handleErrorResponse } from '../Auth/handleErrorResponse';
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;


export const getProxParcelasTrabalhos = async (
    onLoading?: (isLoading: boolean) => void
  ): Promise<proxParcelaTrabalhosType[]> => {
    try {
      onLoading?.(true); // Inicie o carregamento
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/trabalho/todosResumoProxParcelas`, {
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
  