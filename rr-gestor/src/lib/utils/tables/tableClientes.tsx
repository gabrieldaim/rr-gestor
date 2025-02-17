import { Table, TableBody, TableHead, TableRow, TableCell, TableHeader } from "@/components/ui/table";
import { ClientesResumoType } from "@/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronsDown } from "lucide-react";
import { TipoCliente, TipoClienteType } from "../types/tipoCliente";
import FilterFormClientes from "../Form/filterFormClientes";
import { formatarTelefone } from "@/lib/utils";


interface TableClientesProps {
  data: ClientesResumoType[];
}

export default function TableClientes({ data }: TableClientesProps) {
  const constExibData = 10
  const [exibData, setExibData] = useState(data);
  const [filteredData, setFilteredData] = useState(data);
  const [qtdExibData, setQtdExibData] = useState(constExibData);
  const [hasExibData, setHasExibData] = useState(data.length > constExibData);



  const navigate = useNavigate();

  const handleFilterChange = (filters: { nome: string; email: string; telefone: string; tipoCliente: TipoClienteType | "TODOS"}) => {
    const { nome, email , telefone, tipoCliente } = filters;

    const nomeTrimmed = nome.trim();
    const emailTrimmed = email.trim();
    const telefoneTrimmed = telefone.trim();


    const filtered = data.filter(
      (cliente) =>
      (!nomeTrimmed || cliente.nome.toLowerCase().includes(nomeTrimmed.toLowerCase())) &&
      (!emailTrimmed || cliente.email.toLowerCase().includes(emailTrimmed.toLowerCase())) &&
      (!telefoneTrimmed || cliente.telefone.toLowerCase().includes(nomeTrimmed.toLowerCase())) &&
      (tipoCliente === "TODOS" || cliente.tipoCliente === tipoCliente)
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
    navigate(`/cliente/${id}`);
  }
  return (
    <div className="p-6  mx-auto space-y-4">
              
          <FilterFormClientes onFilterChange={handleFilterChange} />

      <div className="border rounded">

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Tipo de Cliente</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exibData.length > 0 ? (
                          exibData.map((cliente) => (
                            <TableRow key={cliente.id} className="hover:cursor-pointer" onClick={() => handleClickRow(cliente.id)}>
                              <TableCell>{cliente.nome}</TableCell>
                              <TableCell>{cliente.email}</TableCell>
                              <TableCell>{formatarTelefone(cliente.telefone)}</TableCell>
                              <TableCell>{TipoCliente[cliente.tipoCliente as keyof typeof TipoCliente]}</TableCell>                        
                            </TableRow>
                          ))
            ) : (<div className="flex h-14 items-center relative left-2">
              <h3 className="text-lg font-semibold leading-none tracking-tight text-muted-foreground flex-shrink-0">
              Nenhum Cliente encontrado</h3>
            </div>)}
          </TableBody>
        </Table>
      </div>
      {hasExibData && (<p className="items-center justify-center flex text-sm text-gray-500 cursor-pointer" onClick={expandExibData}>Mostrar mais <ChevronsDown className="w-4"></ChevronsDown></p>)}
    </div>
  );
}
