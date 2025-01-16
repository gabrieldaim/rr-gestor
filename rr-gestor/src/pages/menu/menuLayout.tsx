import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet, useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import Home from "../home/home";


export default function MenuLayout() {
  const location = useLocation();
  const navigate = useNavigate();

    // Mapeamento de paths para mensagens
    const headerTextMap: Record<string, string> = {
      "/": "Meus Trabalhos",
      "/proximas-entregas": "Próximas entregas",
      "/proximos-pagamentos": "Próximos pagamentos",
      "/novos-trabalhos": "Novos trabalhos",
    };


  // Determina o texto do cabeçalho com base no path atual
  const headerText = headerTextMap[location.pathname] || "";

  // Função de logout
  const logout = () => {
    // Remover dados do localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    localStorage.removeItem('isAuthenticated');

    // Navegar para a página de login
    navigate('/login');
  };
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4 w-full justify-between">
          <SidebarTrigger className="-ml-1" />
          <h1 className="font-bold text-zinc-600 text-lg">{headerText}</h1>
          <Button variant={"ghost"} onClick={logout}>Sair</Button>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
