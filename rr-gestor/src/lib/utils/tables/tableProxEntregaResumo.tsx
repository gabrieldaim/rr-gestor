import { Table, TableBody, TableHead, TableRow, TableCell, TableHeader } from "@/components/ui/table";
import { proxTrabalhosType } from "@/types";
import FilterForm from "../Form/filterForm";
import { useState } from "react";
import { EntregaStatus, EntregaStatusType } from "../types/EntregaStatus";
import { TipoTrabalho, TipoTrabalhoType } from "../types/TipoTrabalho";
import { useNavigate } from "react-router-dom";


interface TableProxTrabalhosProps {
  data: proxTrabalhosType[];
}

export default function TableProxTrabalhos({ data }: TableProxTrabalhosProps) {
  const [filteredData, setFilteredData] = useState(data);

  const navigate = useNavigate();

  const handleFilterChange = (filters: { nome: string; tema: string,  statusEntrega: EntregaStatusType | "TODOS", tipoTrabalho: TipoTrabalhoType | "TODOS"}) => {
    const { nome, tema , statusEntrega, tipoTrabalho } = filters;

    const nomeTrimmed = nome.trim();
    const temaTrimmed = tema.trim();

    const filtered = data.filter(
      (trabalho) =>
        (!nomeTrimmed || trabalho.nome.toLowerCase().includes(nomeTrimmed.toLowerCase())) &&
        (!temaTrimmed || trabalho.tema.toLowerCase().includes(temaTrimmed.toLowerCase())) &&
        (statusEntrega === "TODOS" || trabalho.statusEntrega === statusEntrega) &&
        (tipoTrabalho === "TODOS" || trabalho.tipoTrabalho === tipoTrabalho)
    );
    setFilteredData(filtered);
  };

  const handleClickRow = (id: String) => {
    navigate(`/trabalho/${id}`);
  }
  return (
    <div className="p-6  mx-auto space-y-4">
              
          <FilterForm onFilterChange={handleFilterChange} />

      <div className="border rounded">

        <Table>
          <TableHeader>
            <TableHead>Nome</TableHead>
            <TableHead>Tema</TableHead>
            <TableHead>Tipo de Trabalho</TableHead>
            <TableHead>Próximo Prazo</TableHead>
            <TableHead>Status</TableHead>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
                          filteredData.map((trabalho) => (
                            <TableRow key={trabalho.id} className="hover:cursor-pointer" onClick={() => handleClickRow(trabalho.id)}>
                              <TableCell>{trabalho.nome}</TableCell>
                              <TableCell>{trabalho.tema}</TableCell>
                              <TableCell>{TipoTrabalho[trabalho.tipoTrabalho as keyof typeof TipoTrabalho]}</TableCell>
                              <TableCell>{new Date(trabalho.proxPrazo).toLocaleDateString('pt-BR')}</TableCell>
                              <TableCell>{EntregaStatus[trabalho.statusEntrega as keyof typeof EntregaStatus]}</TableCell>
                            </TableRow>
                          ))
            ) : (<div className="flex h-14 items-center relative left-2">
              <h3 className="text-lg font-semibold leading-none tracking-tight text-muted-foreground flex-shrink-0">
              Nenhum trabalho encontrado</h3>
            </div>)}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
