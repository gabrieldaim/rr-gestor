import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { EntregaStatus, EntregaStatusType } from "@/lib/utils/types/EntregaStatus"

interface SelectEntregaStatusProps {
  value: EntregaStatusType | "TODOS";
  onChange: (value: EntregaStatusType | "TODOS") => void;
  includeAllOption?: boolean;
}

export default function SelectEntregaStatus({
  value,
  onChange,
  includeAllOption = false
}: SelectEntregaStatusProps) {
  return (
    <Select value={value} onValueChange={(val) => onChange(val as EntregaStatusType)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Status da entrega" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status da entrega</SelectLabel>
          {includeAllOption && (
            <SelectItem key="TODOS" value="TODOS">
              Todos os status
            </SelectItem>
          )}
          {Object.entries(EntregaStatus).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
