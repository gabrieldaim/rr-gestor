import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TipoPagamento, TipoPagamentoType } from "@/lib/utils/types/TipoPagamento";

interface SelectTipoPagamentoProps {
  value: TipoPagamentoType | "TODOS";
  onChange: (value: TipoPagamentoType | "TODOS") => void;
  includeAllOption?: boolean;
  width?: string;
}

export default function SelectTipoPagamento({
  value,
  onChange,
  width = "w-[180px]",
}: SelectTipoPagamentoProps) {
  return (
    <Select value={value} onValueChange={(val) => onChange(val as TipoPagamentoType)}>
      <SelectTrigger className={width}>
        <SelectValue placeholder="Tipo de pagamento" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tipo de pagamento</SelectLabel>
          {Object.entries(TipoPagamento).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
