export const TipoTrabalho = {
  TCC: "TCC",
  AVALIACAO: "Avaliação",
  PPT: "PPT (Slide)",
  OUTRO: "Outro tipo"
} as const;
  
  // Tipo derivado automaticamente
  export type TipoTrabalhoType = keyof typeof TipoTrabalho;
  