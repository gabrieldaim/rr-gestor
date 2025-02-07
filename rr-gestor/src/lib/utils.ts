import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatarTelefone(telefone:any) {
  if (!telefone) return "";
  telefone = telefone.replace(/\D/g, ""); // Remove tudo que não for número
  telefone = telefone.substring(0, 11); // Limita ao máximo de 11 caracteres
  if (telefone.length <= 10) {
    // Formato para números sem o dígito 9
    return telefone.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  } else {
    // Formato para números com o dígito 9
    return telefone.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  }
}

export function corrigirFusoData(data: string) {
  const [ano, mes, dia] = data.split("-").map(Number);
  return new Date(ano, mes - 1, dia);
}

export function formatarParaReal(valor: number) {
  const numero = (valor / 100).toFixed(2).replace(".", ",");
  return `R$ ${numero}`;
}

export function preventEnter(e: any){

    if (e.key === "Enter") {
        e.preventDefault(); // Evita que o Enter submeta o formulário
    }
}



