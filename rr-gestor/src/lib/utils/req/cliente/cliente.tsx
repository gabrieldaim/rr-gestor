
  
import { ClientesType } from '@/types';
import axios from 'axios';
import { handleErrorResponse } from '../Auth/handleErrorResponse';
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const getCliente = async (
  id: string | undefined,
    onLoading?: (isLoading: boolean) => void
  ): Promise<ClientesType> => {
    try {
      onLoading?.(true); // Inicie o carregamento
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/cliente/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      return response.data;
    } catch (error) {
      handleErrorResponse(error);
      console.error('Error fetching clientes:', error);
      throw error;
    } finally {
      onLoading?.(false); // Finalize o carregamento
    }
  };

  export const updateCliente = async (
    id: string | undefined,
    cliente: any,
    onLoading?: (isLoading: boolean) => void
  ): Promise<any> => {
    try {
      onLoading?.(true); // Inicie o carregamento
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/cliente/${id}`, cliente, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      handleErrorResponse(error);
      console.error('Error updating cliente:', error);
      return error;
    } finally {
      onLoading?.(false); // Finalize o carregamento
    }
  };
  
  export const createCliente = async (
    cliente: any,
    onLoading?: (isLoading: boolean) => void
  ): Promise<any> => {
    try {
      onLoading?.(true); // Inicie o carregamento
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/cliente/criar`, cliente, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      handleErrorResponse(error);
      console.error('Error creating cliente:', error);
      return error;
    } finally {
      onLoading?.(false); // Finalize o carregamento
    }
  };

  export const deleteCliente = async (
    id: string | undefined,
      onLoading?: (isLoading: boolean) => void
    ): Promise<any> => {
      try {
        onLoading?.(true); // Inicie o carregamento
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${API_URL}/cliente/${id}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        return response;
      } catch (error) {
        handleErrorResponse(error);
        console.error('Error deleting cliente:', error);
        return error;
      } finally {
        onLoading?.(false); // Finalize o carregamento
      }
    };