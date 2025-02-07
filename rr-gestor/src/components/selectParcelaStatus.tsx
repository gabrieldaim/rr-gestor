import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ParcelaStatus, ParcelaStatusType } from "@/lib/utils/types/ParcelaStatus";

interface SelectParcelaStatusProps {
  value: ParcelaStatusType | "TODOS";
  onChange: (value: ParcelaStatusType | "TODOS") => void;
  includeAllOption?: boolean;
  width?: string;
}

export default function SelectParcelaStatus({
  value,
  onChange,
  includeAllOption = false,
  width = "w-[180px]",
}: SelectParcelaStatusProps) {
  return (
    <Select value={value} onValueChange={(val) => onChange(val as ParcelaStatusType)}>
      <SelectTrigger className={width}>
        <SelectValue placeholder="Status da parcela" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status da parcela</SelectLabel>
          {includeAllOption && (
            <SelectItem key="TODOS" value="TODOS">
              Todos os status
            </SelectItem>
          )}
          {Object.entries(ParcelaStatus).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
