import LoadingTable from "@/components/loadingTable";
import { Button } from "@/components/ui/button";
import { getTodosTrabalhos } from "@/lib/utils/req/trabalho/trabalho";
import TableProxTrabalhos from "@/lib/utils/tables/tableProxEntregaResumo";
import { proxTrabalhosType } from "@/types";
import { Plus } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function TodosTrabalhos() {
  const [todosTrabalhos, setTodosTrabalhos] = React.useState<proxTrabalhosType[] | "">("");  // Defina o tipo correto
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getTodosTrabalhos(setIsLoaded);
      setTodosTrabalhos(data); 
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-10 items-center">
      {isLoaded ? 
        <LoadingTable /> : 
        todosTrabalhos && todosTrabalhos.length > 0 ? 
          <TableProxTrabalhos data={todosTrabalhos} /> : 
          <div className="mt-10 flex flex-col items-center justify-center space-y-4 p-6 mx-auto">
    <img src="../../../public/Empty-amico.svg" alt="tudo vazio por aqui" className="w-[350px]" />
    <h3 className="text-lg font-semibold leading-none tracking-tight text-muted-foreground flex-shrink-0">
      Parece tudo vazio por aqui...</h3>
  </div>}
      <Button className="w-[250px]" onClick={() => navigate("/criar-trabalho")}><Plus></Plus> Criar novo trabalho</Button>
    </div>
  );
}

