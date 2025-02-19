import * as React from "react";
import {
//   AudioWaveform,
//   BookOpen,
//   Bot,
//   Command,
//   Divide,
//   Frame,
//   GalleryVerticalEnd,
//   Map,
//   PieChart,
//   Settings2,
//   SquareTerminal,
  BookOpenText,
  LibraryBig,
  Wallet
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
// import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  // SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
// import { DropdownMenuSeparator, Separator } from "@radix-ui/react-dropdown-menu";

// This is sample data.
const userDataString = localStorage.getItem('userData');
let userName = "Usuário";
let tipo = "Auxiliar";
if (userDataString) {
  const userData = JSON.parse(userDataString); 
  console.log("Dados de usuário encontrados no localStorage:", userData);
  userName = userData.name; 
  tipo = userData.tipo=="ADMIN" ? "Administrador" : "Auxiliar";
} else {
  console.log("Nenhum dado de usuário encontrado no localStorage.");
}
const data = {
  user: {
    name: userName,
    tipo: tipo,
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Resumos",
      url: "/resumos",
      icon: BookOpenText,
      isActive: true,
      items: tipo == "Administrador" ? [
        {
          title: "Meus trabalhos",
          url: "/",
        },
        {
          title: "Próximas entregas",
          url: "/proximas-entregas",
        },
        {
          title: "Próximos pagamentos",
          url: "/proximos-pagamentos",
        },
        {
          title: "Novos trabalhos",
          url: "/em-construcao",
        },
        
      ] : [
        {
          title: "Meus trabalhos",
          url: "/",
        },
        
      ],
    },
    {
      title: "Tabelas",
      url: "/tabelas",
      isActive: true,
      icon: LibraryBig,
      items: tipo == "Administrador" ? [
        {
          title: "Trabalhos",
          url: "/todos-trabalhos",
        },
        {
          title: "Clientes",
          url: "/todos-clientes",
        }
      ] : [
        {
          title: "Trabalhos",
          url: "/todos-trabalhos",
        }
      ] ,
    }
  ],
  others: [
    {
      title: "Financeiro",
      url: "/financeiro",
      icon: Wallet,
      items: [
        // {
        //   title: "Introduction",
        //   url: "#",
        // },
        // {
        //   title: "Get Started",
        //   url: "#",
        // },
        // {
        //   title: "Tutorials",
        //   url: "#",
        // },
        // {
        //   title: "Changelog",
        //   url: "#",
        // },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
<img src="/logo-azul-png.png" className="p-2 h-16 object-contain border-b" />


      <SidebarContent>
        <NavMain items={data.navMain} name="Projetos"/>
        <NavMain items={data.others} name="Outros"/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
