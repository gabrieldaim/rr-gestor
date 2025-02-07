import SelectEntregaStatus from "@/components/selectEntregaStatus";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { EntregaStatusType } from "../types/EntregaStatus";
import SelectTipoTrabalho from "@/components/selectTipoTrabalho";
import { TipoTrabalhoType } from "../types/TipoTrabalho";

interface FilterFormProps {
  onFilterChange: (filters: { nome: string; tema: string; statusEntrega: EntregaStatusType | "TODOS" , tipoTrabalho: TipoTrabalhoType | "TODOS" }) => void;
}

export default function FilterFormEntregas({ onFilterChange }: FilterFormProps) {
  const [nome, setNome] = useState("");
  const [tema, setTema] = useState("");
  const [statusEntrega, setStatusEntrega] = useState<EntregaStatusType | "TODOS">("TODOS");
  const [tipoTrabalho, setTipoTrabalho] = useState<TipoTrabalhoType | "TODOS">("TODOS");


  // Função para enviar os filtros sempre que um campo mudar
  const handleFilterChange = () => {
    onFilterChange({ nome, tema, statusEntrega, tipoTrabalho });
  };

  // useEffect para disparar o handleFilterChange sempre que um dos valores mudar
  useEffect(() => {
    handleFilterChange();
  }, [nome, tema, statusEntrega, tipoTrabalho]);

  return (
    <div className="flex items-center justify-between gap-4">
<h2 className="text-lg font-semibold leading-none tracking-tight text-muted-foreground flex-shrink-0">
  Filtrar Tabela
</h2>

      <form className="flex items-center gap-2 w-full">
  <Input
    name="nome"
    placeholder="Nome"
    className="flex-1 min-w-32"
    value={nome}
    onChange={(e) => setNome(e.target.value)}
  />
  <Input
    name="tema"
    placeholder="Tema"
    className="flex-1 min-w-32"
    value={tema}
    onChange={(e) => setTema(e.target.value)}
  />
      <SelectTipoTrabalho
    value={tipoTrabalho}
    onChange={(newTipoTrabalho) => setTipoTrabalho(newTipoTrabalho)}
    includeAllOption={true}
  />
  <SelectEntregaStatus
    value={statusEntrega}
    onChange={(newStatus) => setStatusEntrega(newStatus)}
    includeAllOption={true}
  />

</form>

    </div>
  );
}
