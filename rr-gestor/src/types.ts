// src/types.ts

import { EntregaStatusType } from "./lib/utils/types/EntregaStatus";

export type proxTrabalhosType = {
    id: string;
    nome: string;
    tema: string;
    tipoTrabalho: string;
    proxPrazo: string;
    statusEntrega: EntregaStatusType;
    email: string;
  };
  
  export type EntregaType = {
    id: number;
    nome: string;
    data: string;
    status: string;
  };

  export type ParcelaType = {
    id: number;
    nome: string;
    valor: number;
    data: string;
    status: string;
  };

  export type TrabalhoType = {
    id: number;
    responsavelEmail: string;
    nomeResponsavel: string;
    clienteId: number;
    nome: string;
    email: string;
    telefone: string;
    tipoTrabalho: string;
    faculdade: string;
    curso: string;
    tema: string;
    caminhoPendrive: string;
    caminhoDrive: string;
    observacao: string;
    valorTotal: number;
    statusEntregas: string;
    statusParcelas: string;
    tipoPagamento: string | null;
    entregas: EntregaType[];
    parcelas: ParcelaType[];
  };

  export type ClientesResumoType = {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    ultimoTrabalho: string;
    tipoCliente: string;
  }

  export type ResponsavelType = {
    id: string;
    nome: string;
    email: string;

  }
  