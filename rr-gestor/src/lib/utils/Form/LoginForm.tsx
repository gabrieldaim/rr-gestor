import { ButtonConfirmLoad } from "@/components/ui/buttonConfirmLoad";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../req/Auth/login";
import { showToast, UtilToast } from "../UtilToast";
import {  useNavigate } from "react-router-dom";

//Constante que valida o schema do formulário de login
const handleLoginSchema = z.object({
  // email: z.string().email("Informe um email válido"),

  email: z.string().email("Informe um email válido"),
  senha: z.string(),
});

type HandleLoginSchema = z.infer<typeof handleLoginSchema>;

export function LoginForm() {
      const navigate = useNavigate();

  //const que chama o handlesubmit e o schema de validação
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<HandleLoginSchema>({
    resolver: zodResolver(handleLoginSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(data: HandleLoginSchema) {

    type responseType = {
      status: number;
      code: string;
    }

    const response = await login(data.email, data.senha, setIsLoading) as responseType;
    if (response.status === 200) {
      showToast("success", "Login realizado com sucesso!");
  // Função assíncrona que verifica a presença de userData no localStorage
  const checkUserData = () => {
    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (localStorage.getItem('userData') !== null) {
          clearInterval(interval);  // Para o intervalo quando os dados estiverem no localStorage
          resolve();  // Resolve a Promise quando userData for encontrado
        }
      }, 100); // Verifica a cada 100ms
    });
  };

  // Espera a Promise ser resolvida antes de navegar
  checkUserData().then(() => {
    navigate("/", { state: { reload: Date.now() } });  // Agora navega após garantir que userData foi carregado
  });
    }
    if (response.status === 400 || response.status === 404) {
      showToast("error", "Email ou senha incorretos!");
    }
    if (response.code == "ERR_NETWORK") {
      showToast("error", "Erro de conexão!");
    }
    }

    return (
      <form className="p-6 md:p-8" onSubmit={handleSubmit(handleLogin)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Bem-vindo!</h1>
            <p className="text-balance text-muted-foreground">
              Faça o login na plataforma.
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@exemplo.com"
              required
              {...register("email")}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Senha</Label>
              <a
                href="#"
                className="ml-auto text-sm underline-offset-2 hover:underline"
              >
                Esqueceu a senha?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              required
              {...register("senha")}
            />
          </div>
          <ButtonConfirmLoad
            isLoading={isLoading}
            loadingText="Valindando"
            defaultText="Login"
          />

          <div className="text-center text-sm">
            Não tem uma conta?{" "}
            <a href="#" className="underline underline-offset-4">
              Clique aqui
            </a>
          </div>
        </div>
        <UtilToast />
      </form>
    );
  }

