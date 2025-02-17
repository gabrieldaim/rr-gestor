"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ClientesResumoType, ClientesType, TrabalhoType } from "@/types"
import { UseFormSetValue } from "react-hook-form"
import { getClienteResumo } from "@/lib/utils/req/cliente/clienteResumo"

interface ComboboxClienteProps {
  setCliente: React.Dispatch<React.SetStateAction<ClientesType | null>>;
  setValue: UseFormSetValue<{
    clienteId: number;
}> | any;
id: number | any;
}

export function ComboBoxIndicado({ setCliente, setValue, id }: ComboboxClienteProps) {
  const [open, setOpen] = React.useState(false)
  const [valueAtual, setValueAtual] = React.useState<string>(id); 
  const [clientes, setClientes] = React.useState<ClientesResumoType[]>([]);  
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [commandInput, setCommandInput] = React.useState<string>("")
  const [results, setResults] = React.useState<ClientesResumoType[]>([])

  React.useEffect(() => {
    const filteredResults = clientes.filter((cliente) =>
      cliente.nome.toLowerCase().includes(commandInput.toLowerCase())
    );
    setResults(filteredResults);
  }, [commandInput, clientes]); // Adicione clientes como dependência para re-filter quando eles mudarem
  

  React.useEffect(() => {
    const clienteId = valueAtual || 1; 
    setValue("clienteId", clienteId);
    const fetchData = async () => {
      const data = await getClienteResumo(setIsLoaded);
      setClientes(Array.isArray(data) ? data : [data]); // Defina a variável com o valor correto
      setResults(Array.isArray(data) ? data : [data]); // Defina a variável com o valor correto
    };

    fetchData();
  }, []);

  

  const handleSelect = (selectedValue: string, cliente:ClientesResumoType) => {

    setValueAtual(selectedValue)
    setCliente((prev) => prev ? { ...prev, indicadoPorId: selectedValue.toString() ?? prev.indicadoPorId, indicadoPorEmail:  cliente.email} : null)
    setValue("indicadoPorId", selectedValue)
    setValue("indicadoPorEmail", cliente.email)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
            {valueAtual
            ? clientes.find((cliente) => cliente.id.toString() === valueAtual.toString())?.nome
            : "Selecione o cliente..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
        <CommandInput
  placeholder="Procurar cliente..."
  value={commandInput}
  onChange={(e) => setCommandInput(e.target.value)} // Alteração aqui
/>
          <CommandList>
            <CommandEmpty>Nenhum Cliente encontrado</CommandEmpty>
            <CommandGroup>
              {results.map((cliente) => (
                <CommandItem
                  key={cliente.id}
                  value={cliente.id.toString()}
                  onSelect={() => handleSelect(cliente.id.toString() === valueAtual.toString() ? valueAtual.toString() : cliente.id.toString(), cliente)}
                >
                  <Check
                  className={cn(
                  "mr-2 h-4 w-4",
                  valueAtual === cliente.id.toString() ? "opacity-100" : "opacity-0"
                  )}
                  />
                  {cliente.nome}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
