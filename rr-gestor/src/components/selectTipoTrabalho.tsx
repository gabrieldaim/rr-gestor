import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TipoTrabalho, TipoTrabalhoType } from "@/lib/utils/types/TipoTrabalho"

interface SelectTipoTrabalhoProps {
  value: TipoTrabalhoType | "TODOS";
  onChange: (value: TipoTrabalhoType | "TODOS") => void;
  includeAllOption?: boolean;
}

export default function SelectTipoTrabalho({
  value,
  onChange,
  includeAllOption = false
}: SelectTipoTrabalhoProps) {
  return (
    <Select value={value} onValueChange={(val) => onChange(val as TipoTrabalhoType)}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Tipos de trabalho" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status da entrega</SelectLabel>
          {includeAllOption && (
            <SelectItem key="TODOS" value="TODOS">
              Todos os tipos
            </SelectItem>
          )}
          {Object.entries(TipoTrabalho).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
