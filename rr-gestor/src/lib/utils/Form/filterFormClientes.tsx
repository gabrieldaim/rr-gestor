import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { TipoClienteType } from "../types/tipoCliente";
import SelectTipoCliente from "@/components/selectTipoCliente";

interface FilterFormProps {
  onFilterChange: (filters: { nome: string; email: string; telefone: string; tipoCliente: TipoClienteType | "TODOS"}) => void;
}

export default function FilterFormClientes({ onFilterChange }: FilterFormProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tipoCliente, setTipoCliente] = useState<TipoClienteType | "TODOS">("TODOS");


  // Função para enviar os filtros sempre que um campo mudar
  const handleFilterChange = () => {
    onFilterChange({ nome, email, telefone, tipoCliente});
  };

  // useEffect para disparar o handleFilterChange sempre que um dos valores mudar
  useEffect(() => {
    handleFilterChange();
  }, [nome, email, telefone, tipoCliente]);

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
    name="email"
    placeholder="Email"
    className="flex-1 min-w-32"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />

<Input
    name="telefone"
    placeholder="telefone"
    className="flex-1 min-w-32"
    value={telefone}
    onChange={(e) => setTelefone(e.target.value)}
  />
    <SelectTipoCliente
    value={tipoCliente}
    onChange={(newTipoCliente) => setTipoCliente(newTipoCliente)}
    includeAllOption={true}
  />

</form>

    </div>
  );
}
