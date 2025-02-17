export const TipoCliente = {
  RECORRENTE: "Recorrente",
  INADIMPLENTE: "Inadimplente",
  BOM_CLIENTE: "Bom Cliente",
  MAU_CLIENTE: "Mau Cliente",
  REGULAR: "Regular",
} as const;
  
  // Tipo derivado automaticamente
  export type TipoClienteType = keyof typeof TipoCliente;
  