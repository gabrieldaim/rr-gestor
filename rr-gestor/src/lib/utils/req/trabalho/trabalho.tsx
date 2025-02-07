
  
import { proxTrabalhosType, TrabalhoType } from '@/types';
import axios from 'axios';
import { handleErrorResponse } from '../Auth/handleErrorResponse';
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const getTodosTrabalhos = async (
  onLoading?: (isLoading: boolean) => void
): Promise<proxTrabalhosType[]> => {
  try {
    onLoading?.(true); // Inicie o carregamento
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/trabalho/todosResumo`, {
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

export const getTrabalho = async (
  id: string | undefined,
    onLoading?: (isLoading: boolean) => void
  ): Promise<TrabalhoType> => {
    try {
      onLoading?.(true); // Inicie o carregamento
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/trabalho/${id}`, {
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

  export const updateTrabalho = async (
    id: string | undefined,
    trabalho: any,
    onLoading?: (isLoading: boolean) => void
  ): Promise<any> => {
    try {
      onLoading?.(true); // Inicie o carregamento
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/trabalho/${id}`, trabalho, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      handleErrorResponse(error);
      console.error('Error updating trabalho:', error);
      return error;
    } finally {
      onLoading?.(false); // Finalize o carregamento
    }
  };
  
  export const createTrabalho = async (
    trabalho: any,
    onLoading?: (isLoading: boolean) => void
  ): Promise<any> => {
    try {
      onLoading?.(true); // Inicie o carregamento
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/trabalho/criar`, trabalho, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      handleErrorResponse(error);
      console.error('Error creating trabalho:', error);
      return error;
    } finally {
      onLoading?.(false); // Finalize o carregamento
    }
  };

  export const deleteTrabalho = async (
    id: string | undefined,
      onLoading?: (isLoading: boolean) => void
    ): Promise<any> => {
      try {
        onLoading?.(true); // Inicie o carregamento
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${API_URL}/trabalho/${id}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        return response;
      } catch (error) {
        handleErrorResponse(error);
        console.error('Error deleting trabalhos:', error);
        return error;
      } finally {
        onLoading?.(false); // Finalize o carregamento
      }
    };