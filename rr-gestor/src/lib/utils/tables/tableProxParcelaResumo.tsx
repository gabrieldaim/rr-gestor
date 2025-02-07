import { Table, TableBody, TableHead, TableRow, TableCell, TableHeader } from "@/components/ui/table";
import { proxParcelaTrabalhosType } from "@/types";
import { useState } from "react";
import { TipoTrabalho, TipoTrabalhoType } from "../types/TipoTrabalho";
import { useNavigate } from "react-router-dom";
import { corrigirFusoData } from "@/lib/utils";
import { ParcelaStatus, ParcelaStatusType } from "../types/ParcelaStatus";
import FilterFormParcelas from "../Form/filterFormParcelas";


interface TableProxParcelasProps {
  data: proxParcelaTrabalhosType[];
}

export default function TableProxParcelas({ data }: TableProxParcelasProps) {
  const [filteredData, setFilteredData] = useState(data);

  const navigate = useNavigate();

  const handleFilterChange = (filters: { nome: string; tema: string,  statusParcelas: ParcelaStatusType | "TODOS", tipoTrabalho: TipoTrabalhoType | "TODOS"}) => {
    const { nome, tema , statusParcelas, tipoTrabalho } = filters;

    const nomeTrimmed = nome.trim();
    const temaTrimmed = tema.trim();

    const filtered = data.filter(
      (trabalho) =>
        (!nomeTrimmed || trabalho.nome.toLowerCase().includes(nomeTrimmed.toLowerCase())) &&
        (!temaTrimmed || trabalho.tema.toLowerCase().includes(temaTrimmed.toLowerCase())) &&
        (statusParcelas === "TODOS" || trabalho.statusParcela === statusParcelas) &&
        (tipoTrabalho === "TODOS" || trabalho.tipoTrabalho === tipoTrabalho)
    );
    setFilteredData(filtered);
  };

  const handleClickRow = (id: String) => {
    navigate(`/trabalho/${id}`);
  }
  return (
    <div className="p-6  mx-auto space-y-4">
              
          <FilterFormParcelas onFilterChange={handleFilterChange} />

      <div className="border rounded">

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tema</TableHead>
              <TableHead>Tipo de Trabalho</TableHead>
              <TableHead>Próximo Pagamento</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
                          filteredData.map((trabalho) => (
                            <TableRow key={trabalho.id} className="hover:cursor-pointer" onClick={() => handleClickRow(trabalho.id)}>
                              <TableCell>{trabalho.nome}</TableCell>
                              <TableCell>{trabalho.tema}</TableCell>
                              <TableCell>{TipoTrabalho[trabalho.tipoTrabalho as keyof typeof TipoTrabalho]}</TableCell>
                              <TableCell>{corrigirFusoData(trabalho.proxPrazo).toLocaleDateString('pt-BR')}</TableCell>
                              <TableCell>{ParcelaStatus[trabalho.statusParcela as keyof typeof ParcelaStatus]}</TableCell>
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
