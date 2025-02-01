export const handleErrorResponse = (error: any) => {
    if (error.response?.status === 403) {
      // Limpa os dados do usuário e redireciona para o login
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      localStorage.removeItem('isAuthenticated');
      window.location.href = '/login';
    } else {
      // Log de outros erros para depuração
      console.error('An error occurred:', error);
    }
  };