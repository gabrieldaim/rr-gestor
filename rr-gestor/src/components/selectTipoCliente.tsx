import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TipoCliente, TipoClienteType } from "@/lib/utils/types/tipoCliente";

interface SelectTipoClienteProps {
  value: TipoClienteType | "TODOS";
  onChange: (value: TipoClienteType | "TODOS") => void;
  includeAllOption?: boolean;
  width?: string;
}

export default function SelectTipoCliente({
  value,
  onChange,
  includeAllOption = false,
  width = "240"
}: SelectTipoClienteProps) {
  return (
    <Select value={value} onValueChange={(val) => onChange(val as TipoClienteType)}>
      <SelectTrigger className={`w-[${width}px]`}>
        <SelectValue placeholder="Tipos de cliente" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tipos de Cliente</SelectLabel>
          {includeAllOption && (
            <SelectItem key="TODOS" value="TODOS">
              Todos os tipos de cliente
            </SelectItem>
          )}
          {Object.entries(TipoCliente).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
