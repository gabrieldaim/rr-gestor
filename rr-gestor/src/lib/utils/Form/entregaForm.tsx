import SelectEntregaStatus from "@/components/selectEntregaStatus";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn, corrigirFusoData, preventEnter } from "@/lib/utils";
import { EntregaType, TrabalhoType } from "@/types";
import { Popover } from "@radix-ui/react-popover";
import { ptBR } from "date-fns/locale"; // Importa o locale em português
import { CalendarIcon, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { EntregaStatusType } from "../types/EntregaStatus";



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

export default function EntregaForm({ entregas  , setValue, onChange }: EntregaFormProps) {
    const [entregasAtual, setEntregasAtual] = React.useState<EntregaType[]>([]);

    
    const handleRemoveEntrega = (index: number) => {
      const novasEntregas = [...entregasAtual];
      novasEntregas.splice(index, 1);
      setEntregasAtual(novasEntregas);
      onChange(novasEntregas); 
    };

      const handleUpdateEntrega = () => {
        const novasEntregas = [...entregas];
        onChange(novasEntregas);
      }
      useEffect(() => {
        setEntregasAtual(entregas);
        setValue('entregas', entregas);


    }, [entregas, setValue]);

      useEffect(() => {
        const sortedEntregas = [...entregas].sort((a, b) => {
            if (!a.data) return 1;
            if (!b.data) return -1;
            return new Date(a.data).getTime() - new Date(b.data).getTime();
        });
        setEntregasAtual(sortedEntregas);


    }, [entregas]);


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
                            placeholder="Nome da entrega"
                            type="text"
                            value={entrega.nome}
                            onChange={(e) => {
                                const updatedEntregas = [...entregasAtual];
                                updatedEntregas[index].nome = e.target.value;
                                setEntregasAtual(updatedEntregas);
                                handleUpdateEntrega();
                            }}
                            className="w-[200px] border p-2"
                            onKeyDown={(e) => {
                                preventEnter(e)
                            }}
                        />
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[200px] pl-3 text-left font-normal",
                                                        !entrega.data && "text-muted-foreground"
                                                    )}
                                                >
                                                    {entrega.data ? (corrigirFusoData(entrega.data).toLocaleDateString('pt-BR')
                                                    ) : (
                                                        <span>Escolha uma data</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={corrigirFusoData(entrega.data)}
                                                onSelect={(date) => {
                                                    const updatedEntregas = [...entregasAtual];
                                                    setEntregasAtual(updatedEntregas);
                                                    if (date) {
                                                        updatedEntregas[index].data = date.toISOString().split('T')[0];
                                                        handleUpdateEntrega();
                                                    }
                                                }}
                                                locale={ptBR}
                                            />
                                        </PopoverContent>
                                    </Popover>
                          <SelectEntregaStatus
                            value={entrega.status as EntregaStatusType}
                            onChange={(newStatus) => {
                                const updatedEntregas = [...entregasAtual];
                                updatedEntregas[index].status = newStatus;
                                setEntregasAtual(updatedEntregas);
                                handleUpdateEntrega();
                            }}
                            width="w-[200px]"
                          />
                        
                        <Button
                            onClick={() => handleRemoveEntrega(index)}
                            variant={"ghost"}
                        >
                            <Trash2 className="text-red-500"/>
                        </Button>
                    </div>
                ))}
        </div>
        </>
    )
}