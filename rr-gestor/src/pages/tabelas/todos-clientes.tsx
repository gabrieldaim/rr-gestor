import LoadingTable from "@/components/loadingTable";
import { Button } from "@/components/ui/button";
import { getClienteResumo, getClienteResumoTable } from "@/lib/utils/req/cliente/clienteResumo";
import TableClientes from "@/lib/utils/tables/tableClientes";
import { ClientesResumoType } from "@/types";
import { Plus } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function TodosClientes() {
  const [todosClientes, setTodosClientes] = React.useState<ClientesResumoType[] | "">("");  // Defina o tipo correto
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getClienteResumoTable(setIsLoaded);
      setTodosClientes(data); 
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-10 items-center">
      {isLoaded ? 
        <LoadingTable /> : 
        todosClientes && todosClientes.length > 0 ? 
          <TableClientes data={todosClientes} /> : 
          <div className="mt-10 flex flex-col items-center justify-center space-y-4 p-6 mx-auto">
    <img src="../../../public/Empty-amico.svg" alt="tudo vazio por aqui" className="w-[350px]" />
    <h3 className="text-lg font-semibold leading-none tracking-tight text-muted-foreground flex-shrink-0">
      Parece tudo vazio por aqui...</h3>
  </div>}
      <Button className="w-[250px]" onClick={() => navigate("/criar-cliente")}><Plus></Plus> Cadastrar novo cliente</Button>
    </div>
  );
}

