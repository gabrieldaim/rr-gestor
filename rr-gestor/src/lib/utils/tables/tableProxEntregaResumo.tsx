import { Table, TableBody, TableHead, TableRow, TableCell, TableHeader } from "@/components/ui/table";
import { trabalho } from "@/types";


// Definindo corretamente o tipo de 'data' como sendo um array de 'trabalho'
interface TableProxTrabalhosProps {
  data: trabalho[];
}

// Componente recebendo 'data' como uma prop
export default function TableProxTrabalhos({ data }: TableProxTrabalhosProps) {
  return (
    <div className="p-6  mx-auto">
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
            {data.map((trabalho) => (
              <TableRow key={trabalho.id}>
                <TableCell>{trabalho.nome}</TableCell>
                <TableCell>{trabalho.tema}</TableCell>
                <TableCell>{trabalho.tipoTrabalho}</TableCell>
                <TableCell>{trabalho.proxPrazo}</TableCell>
                <TableCell>{trabalho.statusEntrega}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
