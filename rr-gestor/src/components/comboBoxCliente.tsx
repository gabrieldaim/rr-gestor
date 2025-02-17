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
import { ClientesResumoType, TrabalhoType } from "@/types"
import { UseFormSetValue } from "react-hook-form"
import { getClienteResumo } from "@/lib/utils/req/cliente/clienteResumo"

interface ComboboxClienteProps {
  setTrabalho: React.Dispatch<React.SetStateAction<TrabalhoType | null>>;
  setValue: UseFormSetValue<{
    clienteId: number;
}> | any;
id: number | any;
}

export function ComboBoxCliente({ setTrabalho, setValue, id }: ComboboxClienteProps) {
  const [open, setOpen] = React.useState(false)
  const [valueAtual, setValueAtual] = React.useState<number>(id); 
  const [clientes, setClientes] = React.useState<ClientesResumoType[]>([]);  
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
      const data = await getClienteResumo();
      setClientes(Array.isArray(data) ? data : [data]); // Defina a variável com o valor correto
      setResults(Array.isArray(data) ? data : [data]); // Defina a variável com o valor correto
    };

    fetchData();
  }, []);

  

  const handleSelect = (selectedValue: number, cliente:ClientesResumoType) => {

    setValueAtual(selectedValue)
    setTrabalho((prev) => prev ? { ...prev, clienteId: selectedValue ?? prev.clienteId, email:  cliente.email, telefone: cliente.telefone} : null)
    setValue("clienteId", selectedValue)
    setValue("email", cliente.email)
    setValue("telefone", cliente.telefone)
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
            ? clientes.find((cliente) => Number(cliente.id) === valueAtual)?.nome
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
                  onSelect={() => handleSelect(Number(cliente.id) === valueAtual ? valueAtual : Number(cliente.id), cliente)}
                >
                  <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    valueAtual === Number(cliente.id) ? "opacity-100" : "opacity-0"
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
