
  
import { trabalho } from '@/types';
import axios from 'axios';
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;


export const getProxTrabalhos = async (): Promise<trabalho[]> => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/trabalho/todosResumo`, {
            headers: {
            Authorization: `${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching trabalhos:', error);
        throw error;
    }
};
  