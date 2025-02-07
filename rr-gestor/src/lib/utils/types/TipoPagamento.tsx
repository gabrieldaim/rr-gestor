export const TipoPagamento = {
  A_VISTA: "A vista",
  PARCELADO: "Parcelado"
} as const;
  
  // Tipo derivado automaticamente
  export type TipoPagamentoType = keyof typeof TipoPagamento;
  