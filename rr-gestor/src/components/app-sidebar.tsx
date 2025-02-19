import * as React from "react";
import { BookOpenText, LibraryBig, Wallet } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Estado para armazenar os dados do usuário
  const [userData, setUserData] = React.useState({
    name: "Usuário",
    tipo: "Auxiliar",
  });

  // Efeito para carregar os dados do localStorage
  React.useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userDataParsed = JSON.parse(userDataString);
      console.log("Dados de usuário encontrados no localStorage:", userDataParsed);
      setUserData({
        name: userDataParsed.name,
        tipo: userDataParsed.tipo === "ADMIN" ? "Administrador" : "Auxiliar",
      });
    } else {
      console.log("Nenhum dado de usuário encontrado no localStorage.");
    }
  }, []);

  // Definição do menu com base nos dados do usuário
  const data = {
    user: {
      name: userData.name,
      tipo: userData.tipo,
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Resumos",
        url: "/resumos",
        icon: BookOpenText,
        isActive: true,
        items:
          userData.tipo === "Administrador"
            ? [
                { title: "Meus trabalhos", url: "/" },
                { title: "Próximas entregas", url: "/proximas-entregas" },
                { title: "Próximos pagamentos", url: "/proximos-pagamentos" },
                { title: "Novos trabalhos", url: "/em-construcao" },
              ]
            : [{ title: "Meus trabalhos", url: "/" }],
      },
      {
        title: "Tabelas",
        url: "/tabelas",
        isActive: true,
        icon: LibraryBig,
        items:
          userData.tipo === "Administrador"
            ? [
                { title: "Trabalhos", url: "/todos-trabalhos" },
                { title: "Clientes", url: "/todos-clientes" },
              ]
            : [{ title: "Trabalhos", url: "/todos-trabalhos" }],
      },
    ],
    others: [
      {
        title: "Financeiro",
        url: "/financeiro",
        icon: Wallet,
        items: [],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <img src="/logo-azul-png.png" className="p-2 h-16 object-contain border-b" />
      <SidebarContent>
        <NavMain items={data.navMain} name="Projetos" />
        <NavMain items={data.others} name="Outros" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
