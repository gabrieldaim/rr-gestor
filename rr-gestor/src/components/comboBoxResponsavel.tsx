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
import { ResponsavelType, TrabalhoType } from "@/types"
import { UseFormSetValue } from "react-hook-form"
import { getUsuariosResumo } from "@/lib/utils/req/Auth/usuariosResumo"

interface ComboboxResponsavelProps {
  setTrabalho: React.Dispatch<React.SetStateAction<TrabalhoType | null>>;
  setValue: UseFormSetValue<{
    responsavelEmail: string;
}> | any;
email: string | any;
}

export function ComboBoxResponsavel({ setTrabalho, setValue, email }: ComboboxResponsavelProps) {
  const [open, setOpen] = React.useState(false)
  const [valueAtual, setValueAtual] = React.useState<string>(email); 
  const [responsaveis, setResponsaveis] = React.useState<ResponsavelType[]>([]);  
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [commandInput, setCommandInput] = React.useState<string>("")
  const [results, setResults] = React.useState<ResponsavelType[]>([])

  React.useEffect(() => {
    const filteredResults = responsaveis.filter((responsavel) =>
      responsavel.nome.toLowerCase().includes(commandInput.toLowerCase())
    );
    setResults(filteredResults);
  }, [commandInput, responsaveis]); // Adicione clientes como dependência para re-filter quando eles mudarem
  

  React.useEffect(() => {
    const responsavelEmail = valueAtual || ""; 
    setValue("responsavelEmail", responsavelEmail);
    const fetchData = async () => {
      const data = await getUsuariosResumo(setIsLoaded);
      setResponsaveis(Array.isArray(data) ? data : [data]); // Defina a variável com o valor correto
      setResults(Array.isArray(data) ? data : [data]); // Defina a variável com o valor correto
    };

    fetchData();
  }, []);

  

  const handleSelect = (selectedValue: string) => {

    setValueAtual(selectedValue)
    setTrabalho((prev) => prev ? { ...prev, responsavelEmail: selectedValue ?? prev.responsavelEmail} : null)
    setValue("responsavelEmail", selectedValue)
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
            ? responsaveis.find((responsavel) => responsavel.email === valueAtual)?.nome
            : "Responsável..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
        <CommandInput
  placeholder="Procurar responsável..."
  value={commandInput}
  onChange={(e) => setCommandInput(e.target.value)} // Alteração aqui
/>
          <CommandList>
            <CommandEmpty>Nenhum responsável encontrado</CommandEmpty>
            <CommandGroup>
              {results.map((responsavel) => (
                <CommandItem
                  key={responsavel.id}
                  value={responsavel.id.toString()}
                  onSelect={() => handleSelect(responsavel.email === valueAtual ? valueAtual : responsavel.email)}
                >
                  <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    valueAtual === responsavel.email ? "opacity-100" : "opacity-0"
                  )}
                  />
                  {responsavel.nome}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
