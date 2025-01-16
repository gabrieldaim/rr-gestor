import { LoginFormScreen } from "@/components/login-form"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redireciona para a rota principal
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginFormScreen />
      </div>
    </div>
  )
}
