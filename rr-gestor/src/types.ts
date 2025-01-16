// src/types.ts

export type trabalho = {
    id: string;
    nome: String;
    tema: string;
    tipoTrabalho: string;
    proxPrazo: string;
    statusEntrega: StatusEntrega;
    email: string;
  };
  
  export enum StatusEntrega {
    NAO_INICIADA,
    EM_ANDAMENTO,
    CONCLUIDA,
    EM_REVISAO,
    ATRASADA,
  }
  