export const ParcelaStatus = {
  AGUARDANDO_DATA: "Aguardando Data",
  PAGA: "Paga",
  ATRASADA: "Atrasada",
} as const;
  
  // Tipo derivado automaticamente
  export type ParcelaStatusType = keyof typeof ParcelaStatus;
  