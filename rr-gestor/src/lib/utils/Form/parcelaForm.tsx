import SelectParcelaStatus from "@/components/selectParcelaStatus";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn, corrigirFusoData, formatarParaReal, preventEnter } from "@/lib/utils";
import { ParcelaType, TrabalhoType } from "@/types";
import { Popover } from "@radix-ui/react-popover";
import { ptBR } from "date-fns/locale"; // Importa o locale em português
import { CalendarIcon, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { ParcelaStatusType } from "../types/ParcelaStatus";



interface parcelaFormProps {

    setTrabalho: React.Dispatch<React.SetStateAction<TrabalhoType | null>>;

  setValue: UseFormSetValue<{

    id: number;

    nome: string;

    data: string;

    status: string;

    valor: number;

}>[] | any;

parcelas: ParcelaType[];

onChange: (e: ParcelaType[]) => void;

}

export default function ParcelaForm({ parcelas , setValue, onChange }: parcelaFormProps) {
    const [parcelasAtual, setParcelasAtual] = React.useState<ParcelaType[]>([]);
    
    
    
    const handleRemoveParcela = (index: number) => {
      const novasParcelas = [...parcelasAtual];
      novasParcelas.splice(index, 1);
      setParcelasAtual(novasParcelas);

      onChange(novasParcelas); 
    };

      const handleUpdateParcela = () => {
        const novasEntregas = [...parcelas];
        onChange(novasEntregas);
      }

      useEffect(() => {
        setParcelasAtual(parcelas);
        setValue('parcelas', parcelas);


    }, [parcelas, setValue]);

      useEffect(() => {

        const sortedParcelas = [...parcelas].sort((a, b) => {
            if (!a.data) return 1;
            if (!b.data) return -1;
            return new Date(a.data).getTime() - new Date(b.data).getTime();
        });
        setParcelasAtual(sortedParcelas);


    }, [parcelas]);


    return (
        <>
        <div className="flex flex-col gap-2">
            <div className="flex gap-4">
                <h3 className="w-[150px]">
                    Nome
                </h3>
                <h3 className="w-[150px]">
                    Data
                </h3>
                <h3 className="w-[150px]">
                    Valor
                </h3>
                <h3 className="w-[150px]">
                    Status
                </h3>
            </div>
            {parcelasAtual.map((parcela, index) => 
                    (
                        (
                            <div key={index} className="flex gap-4">
                                <Input
                                    placeholder="Nome da parcela"
                                    type="text"
                                    value={parcela.nome}
                                    onChange={(e) => {
                                        const updatedParcelas = [...parcelasAtual];
                                        updatedParcelas[index].nome = e.target.value;
                                        setParcelasAtual(updatedParcelas);
                                        handleUpdateParcela();
                                    }}
                                    className="w-[150px] border p-2"
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
                                                                "w-[150px] pl-3 text-left font-normal",
                                                                !parcela.data && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {parcela.data ? (corrigirFusoData(parcela.data).toLocaleDateString('pt-BR')
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
                                                        selected={corrigirFusoData(parcela.data)}
                                                        onSelect={(date) => {
                                                            const updatedParcelas = [...parcelasAtual];
                                                            setParcelasAtual(updatedParcelas);
                                                            if (date) {
                                                                updatedParcelas[index].data = date.toISOString().split('T')[0];
                                                                handleUpdateParcela();
                                                            }
                                                        }}
                                                        locale={ptBR}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <Input
                                    placeholder="Valor da parcela"
                                    type="text"
                                    value={formatarParaReal(parcelasAtual[index]?.valor * 100 || 0)}
                                    onChange={(e) => {
                                        const rawValue = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
                                        const centsValue = parseInt(rawValue, 10) || 0; // Converte para número, garantindo que seja 0 se vazio
                                    
                                        // Atualiza o estado com valor numérico
                                        const updatedParcelas = [...parcelasAtual];
                                        updatedParcelas[index].valor = centsValue / 100; // Armazena o valor em centavos
                                        setParcelasAtual(updatedParcelas);
                                        handleUpdateParcela();
                                    }}
                                    className="w-[150px] border p-2"
                            onKeyDown={(e) => {
                                preventEnter(e)
                            }}
                                />
                                  <SelectParcelaStatus
                                    value={parcela.status as ParcelaStatusType}
                                    onChange={(newStatus) => {
                                        const updatedParcelas = [...parcelasAtual];
                                        updatedParcelas[index].status = newStatus;
                                        setParcelasAtual(updatedParcelas);
                                        handleUpdateParcela();
                                    }}
                                    width="w-[150px]"
                                  />
                                
                                <Button
                                    onClick={() => handleRemoveParcela(index)}
                                    variant={"ghost"}
                                >
                                    <Trash2 className="text-red-500"/>
                                </Button>
                            </div>
                        )
                    )
        )}
        </div>
        </>
    )
}