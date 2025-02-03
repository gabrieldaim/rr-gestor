import { Input } from "@/components/ui/input";
import { EntregaType, TrabalhoType } from "@/types";
import React from "react";
import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";


interface EntregaFormProps {

    setTrabalho: React.Dispatch<React.SetStateAction<TrabalhoType | null>>;

  setValue: UseFormSetValue<{

    id: number;

    nome: string;

    data: string;

    status: string;

}>[] | any;

entregas: EntregaType[];

onChange: (e: EntregaType[]) => void;

}

export default function EntregaForm({ entregas , setTrabalho , setValue, onChange }: EntregaFormProps) {
    const [entregasAtual, setEntregasAtual] = React.useState<EntregaType[]>([]);

    const handleAddEntrega = (novaEntrega: any) => {
        const novasEntregas = [...entregas, novaEntrega];
        onChange(novasEntregas);
      };
    
      const handleRemoveEntrega = (index: number) => {
        console.log("index:", index);
        const novasEntregas = entregas.filter((entrega) => entrega.id !== index);
        console.log("novasEntregas:", novasEntregas);
        onChange(novasEntregas); 
      };

      const handleUpdateEntregaNome = () => {
        const novasEntregas = [...entregas];
        onChange(novasEntregas);
      }

      const handleUpdateEntregaData = (index: number, novaEntrega: any) => {
        const novasEntregas = [...entregas];
        novasEntregas[index] = novaEntrega;
        onChange(novasEntregas);
      }

      const handleUpdateEntregaStatus = (index: number, novaEntrega: any) => {
        const novasEntregas = [...entregas];
        novasEntregas[index] = novaEntrega;
        onChange(novasEntregas);
      }

    useEffect(() => {
        setEntregasAtual(entregas);
        setValue('entregas', entregas);
        console.log("entregas:", entregas);
    }, [entregas, setValue]);
    return (
        <>
        <div className="flex flex-col gap-2">
            <div className="flex gap-4">
                <h3 className="w-[200px]">
                    Nome
                </h3>
                <h3 className="w-[200px]">
                    Data
                </h3>
                <h3 className="w-[200px]">
                    Status
                </h3>
            </div>
            {entregasAtual.map((entrega, index) => (
                    <div key={index} className="flex gap-4">
                        <Input
                            type="text"
                            value={entrega.nome}
                            onChange={(e) => {
                                const updatedEntregas = [...entregasAtual];
                                updatedEntregas[index].nome = e.target.value;
                                setEntregasAtual(updatedEntregas);
                                handleUpdateEntregaNome();
                            }}
                            className="w-[200px] border p-2"
                        />
                        <input
                            type="date"
                            value={entrega.data}
                            onChange={(e) => {
                                handleUpdateEntregaData(entrega.id, e.target.value);
                            }}
                            className="w-[200px] border p-2"
                        />
                        <select
                            value={entrega.status}
                            onChange={(e) => {
                                
                                handleUpdateEntregaStatus(entrega.id, e.target.value);
                            }}
                            className="w-[200px] border p-2"
                        >
                            <option value="pendente">Pendente</option>
                            <option value="concluido">Concluído</option>
                            <option value="cancelado">Cancelado</option>
                        </select>
                        <button
                            onClick={() => handleRemoveEntrega(entrega.id)}
                            className="w-[100px] border p-2 bg-red-500 text-white"
                        >
                            Remover
                        </button>
                    </div>
                ))}
        </div>
        </>
    )
}