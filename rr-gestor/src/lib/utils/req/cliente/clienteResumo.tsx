
  
import { ClientesResumoType } from '@/types';
import axios from 'axios';
import { handleErrorResponse } from '../Auth/handleErrorResponse';
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;


export const getClienteResumo = async (
    onLoading?: (isLoading: boolean) => void
  ): Promise<ClientesResumoType[]> => {
    try {
      onLoading?.(true); // Inicie o carregamento
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/cliente/todosResumo`, {
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

export const getClienteResumoTable = async (
  onLoading?: (isLoading: boolean) => void
): Promise<ClientesResumoType[]> => {
  try {
    onLoading?.(true); // Inicie o carregamento
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/cliente/todosResumoTable`, {
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

