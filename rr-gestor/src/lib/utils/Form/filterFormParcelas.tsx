import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import SelectTipoTrabalho from "@/components/selectTipoTrabalho";
import { TipoTrabalhoType } from "../types/TipoTrabalho";
import { ParcelaStatusType } from "../types/ParcelaStatus";
import SelectParcelaStatus from "@/components/selectParcelaStatus";

interface FilterFormProps {
  onFilterChange: (filters: { nome: string; tema: string; statusParcelas: ParcelaStatusType | "TODOS" , tipoTrabalho: TipoTrabalhoType | "TODOS" }) => void;
}

export default function FilterFormParcelas({ onFilterChange }: FilterFormProps) {
  const [nome, setNome] = useState("");
  const [tema, setTema] = useState("");
  const [statusParcelas, setStatusParcelas] = useState<ParcelaStatusType | "TODOS">("TODOS");
  const [tipoTrabalho, setTipoTrabalho] = useState<TipoTrabalhoType | "TODOS">("TODOS");


  // Função para enviar os filtros sempre que um campo mudar
  const handleFilterChange = () => {
    onFilterChange({ nome, tema, statusParcelas, tipoTrabalho });
  };

  // useEffect para disparar o handleFilterChange sempre que um dos valores mudar
  useEffect(() => {
    handleFilterChange();
  }, [nome, tema, statusParcelas, tipoTrabalho]);

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
  <SelectParcelaStatus
    value={statusParcelas}
    onChange={(newStatus) => setStatusParcelas(newStatus)}
    includeAllOption={true}
  />

</form>

    </div>
  );
}
