export const EntregaStatus = {
  NAO_INICIADA: "Não Iniciada",
  EM_ANDAMENTO: "Em Andamento",
  CONCLUIDA: "Concluída",
  EM_REVISAO: "Em Revisão",
  ATRASADA: "Atrasada",
} as const;
  
  // Tipo derivado automaticamente
  export type EntregaStatusType = keyof typeof EntregaStatus;
  