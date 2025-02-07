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
import { UseFormSetValue } from "react-hook-form"
import { TipoTrabalho, TipoTrabalhoType } from "@/lib/utils/types/TipoTrabalho"
import { TrabalhoType } from "@/types"

interface ComboboxTipoTrabalho {
  setTrabalho: React.Dispatch<React.SetStateAction<TrabalhoType | null>>;
  setValue: UseFormSetValue<{
    tipoTrabalho: TipoTrabalhoType;
}> | any;
tipoTrabalhoOld: string | any;
}

export function ComboboxTipoTrabalho({ setTrabalho, setValue, tipoTrabalhoOld }: ComboboxTipoTrabalho) {
  const [open, setOpen] = React.useState(false)
  const [valueAtual, setValueAtual] = React.useState<string>(tipoTrabalhoOld); 
  const [tipoTrabalho, setTipoTrabalho] = React.useState<TipoTrabalhoType[]>([]);  
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [commandInput, setCommandInput] = React.useState<string>("")
  const [results, setResults] = React.useState<TipoTrabalhoType[]>([])

  React.useEffect(() => {
    const filteredResults = tipoTrabalho.filter((tipo) =>
      tipo.toLowerCase().includes(commandInput.toLowerCase())
    );
    setResults(filteredResults);
  }, [commandInput, tipoTrabalho]); // Adicione clientes como dependência para re-filter quando eles mudarem
  

  React.useEffect(() => {
    const fetchData = () => {
      const data = Object.values(TipoTrabalho).map((tipo) => {return tipo}) as TipoTrabalhoType[];
      setTipoTrabalho(data);
      setResults(data);
    };

    fetchData();
  }, []);

  

  const handleSelect = (selectedValue: string) => {
    const selectedKey = Object.keys(TipoTrabalho).find(
      (key) => TipoTrabalho[key as TipoTrabalhoType] === selectedValue
    ) as TipoTrabalhoType;

    setValueAtual(selectedKey)
    setTrabalho((prev) => prev ? { ...prev, tipoTrabalho: selectedKey ?? prev.tipoTrabalho} : null)
    setValue("tipoTrabalho", selectedKey)
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
            ? TipoTrabalho[valueAtual as TipoTrabalhoType]
            : "Tipo de Trabalho"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
        <CommandInput
  placeholder="Procurar tipo..."
  value={commandInput}
  onChange={(e) => setCommandInput(e.target.value)} // Alteração aqui
/>
          <CommandList>
            <CommandEmpty>Nenhum tipo de trabalho encontrado</CommandEmpty>
            <CommandGroup>
              {results.map((tipo) => (
                <CommandItem
                  key={tipo}
                  value={tipo.toString()}
                  onSelect={() => handleSelect(tipo === valueAtual ? valueAtual : tipo)}
                >
                  <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    valueAtual === tipo ? "opacity-100" : "opacity-0"
                  )}
                  />
                  {tipo}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
