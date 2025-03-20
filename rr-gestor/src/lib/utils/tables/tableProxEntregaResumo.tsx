import { Table, TableBody, TableHead, TableRow, TableCell, TableHeader } from "@/components/ui/table";
import { proxTrabalhosType } from "@/types";
import FilterFormEntregas from "../Form/filterFormEntregas";
import { useState } from "react";
import { EntregaStatus, EntregaStatusType } from "../types/EntregaStatus";
import { TipoTrabalho, TipoTrabalhoType } from "../types/TipoTrabalho";
import { useNavigate } from "react-router-dom";
import { corrigirFusoData } from "@/lib/utils";
import { ChevronsDown } from "lucide-react";


interface TableProxTrabalhosProps {
  data: proxTrabalhosType[];
}

export default function TableProxTrabalhos({ data }: TableProxTrabalhosProps) {
  const constExibData = 10
  const [exibData, setExibData] = useState(data);
  const [filteredData, setFilteredData] = useState(data);
  const [qtdExibData, setQtdExibData] = useState(constExibData);
  const [hasExibData, setHasExibData] = useState(data.length > constExibData);



  const navigate = useNavigate();

  const handleFilterChange = (filters: { nome: string; responsavel:String; tema: string,  statusEntrega: EntregaStatusType | "TODOS", tipoTrabalho: TipoTrabalhoType | "TODOS"}) => {
    const { nome, responsavel, tema , statusEntrega, tipoTrabalho } = filters;

    const nomeTrimmed = nome.trim();
    const responsavelTrimmed = responsavel.trim();
    const temaTrimmed = tema.trim();

    const filtered = data.filter(
      (trabalho) =>
      (!nomeTrimmed || trabalho.nome.toLowerCase().includes(nomeTrimmed.toLowerCase())) &&
      (!responsavelTrimmed || trabalho.responsavel.toLowerCase().includes(responsavelTrimmed.toLowerCase())) &&
      (!temaTrimmed || trabalho.tema.toLowerCase().includes(temaTrimmed.toLowerCase())) &&
      (statusEntrega === "TODOS" || trabalho.statusEntrega === statusEntrega) &&
      (tipoTrabalho === "TODOS" || trabalho.tipoTrabalho === tipoTrabalho)
    )
    setFilteredData(filtered);
    const exibFiltered = filtered.slice(0, qtdExibData)
    setExibData(exibFiltered)
    setHasExibData(filtered.length > qtdExibData)
  };

  const expandExibData = () =>{
    const newQtdExibData = qtdExibData + constExibData;
    setQtdExibData(newQtdExibData)
    const exibFiltered = filteredData.slice(0, newQtdExibData)
    setExibData(exibFiltered)
    setHasExibData(filteredData.length > newQtdExibData)
  }

  const handleClickRow = (id: String) => {
    navigate(`/trabalho/${id}`);
  }
  return (
    <div className="p-6  mx-auto space-y-4">
              
          <FilterFormEntregas onFilterChange={handleFilterChange} />

      <div className="border rounded">

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="border-r border-gray-100">Nome</TableHead>
              <TableHead className="border-r border-gray-100">Responsável</TableHead>
              <TableHead className="border-r border-gray-100">Tema</TableHead>
              <TableHead className="border-r border-gray-100">Tipo de Trabalho</TableHead>
              <TableHead className="border-r border-gray-100">Próximo Prazo</TableHead>
              <TableHead className="border-r border-gray-100">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exibData.length > 0 ? (
                          exibData.map((trabalho) => (
                            <TableRow key={trabalho.id} className="hover:cursor-pointer" onClick={() => handleClickRow(trabalho.id)}>
                              <TableCell className="border-r border-gray-100">{trabalho.nome}</TableCell>
                              <TableCell className="border-r border-gray-100">{trabalho.responsavel.split(' ')[0]}</TableCell>
                              <TableCell className="border-r border-gray-100">{trabalho.tema}</TableCell>
                              <TableCell className="border-r border-gray-100">{TipoTrabalho[trabalho.tipoTrabalho as keyof typeof TipoTrabalho]}</TableCell>
                              <TableCell className="border-r border-gray-100">{corrigirFusoData(trabalho.proxPrazo).toLocaleDateString('pt-BR')}</TableCell>
                              <TableCell className="border-r border-gray-100">{EntregaStatus[trabalho.statusEntrega as keyof typeof EntregaStatus]}</TableCell>
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
