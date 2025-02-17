import { Table, TableBody, TableHead, TableRow, TableCell, TableHeader } from "@/components/ui/table";
import { proxParcelaTrabalhosType } from "@/types";
import { useState } from "react";
import { TipoTrabalho, TipoTrabalhoType } from "../types/TipoTrabalho";
import { useNavigate } from "react-router-dom";
import { corrigirFusoData } from "@/lib/utils";
import { ParcelaStatus, ParcelaStatusType } from "../types/ParcelaStatus";
import FilterFormParcelas from "../Form/filterFormParcelas";
import { ChevronsDown } from "lucide-react";


interface TableProxParcelasProps {
  data: proxParcelaTrabalhosType[];
}

export default function TableProxParcelas({ data }: TableProxParcelasProps) {
  const constExibData = 10
  const [exibData, setExibData] = useState(data);
  const [filteredData, setFilteredData] = useState(data);
  const [qtdExibData, setQtdExibData] = useState(constExibData);
  const [hasExibData, setHasExibData] = useState(data.length > constExibData);

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
    const exibFiltered = filtered.slice(0, qtdExibData)
    setExibData(exibFiltered)
    console.log("chamou a mudança de filtro e o hasexibdata é: ", filtered.length > qtdExibData)
    setHasExibData(filtered.length > qtdExibData)
  };

  const expandExibData = () =>{
    const newQtdExibData = qtdExibData + constExibData;
    setQtdExibData(newQtdExibData)
    const exibFiltered = filteredData.slice(0, newQtdExibData)
    setExibData(exibFiltered)
    console.log("chamou a mudança de expandExib e o hasexibdata é: ", filteredData.length > newQtdExibData)
    setHasExibData(filteredData.length > newQtdExibData)
  }

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
            {exibData.length > 0 ? (
                          exibData.map((trabalho) => (
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
      {hasExibData && (<p className="items-center justify-center flex text-sm text-gray-500 cursor-pointer" onClick={expandExibData}>Mostrar mais <ChevronsDown className="w-4"></ChevronsDown></p>)}
    </div>
  );
}
