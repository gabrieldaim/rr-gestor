import TrabalhoForm from '@/lib/utils/Form/trabalhoForm';
import { TrabalhoType } from '@/types';
import React from 'react';

const CriarTrabalho = () => {

    const emptyTrabalho: TrabalhoType = {
      id: 0,
      responsavelEmail: '',
      nomeResponsavel: '',
      clienteId: 0,
      nome: '',
      email: '',
      telefone: '',
      tipoTrabalho: '',
      faculdade: '',
      curso: '',
      tema: '',
      caminhoPendrive: '',
      caminhoDrive: '',
      observacao: '',
      valorTotal: 0,
      statusEntregas: '',
      statusParcelas: '',
      tipoPagamento: null,
      entregas: [],
      parcelas: []
    };

    const [trabalho, setTrabalho] = React.useState<TrabalhoType | null>(emptyTrabalho);

  return (
    <div className="p-6  mx-auto space-y-4 max-w-[712px] min-w-[50%]">
      <h2 className="text-lg font-semibold leading-none tracking-tight text-muted-foreground flex-shrink-0 text-center">
  Criar trabalho
</h2>
<TrabalhoForm trabalho={trabalho} setTrabalho={setTrabalho} tipoTrabalhoForm='criacao'/>
    </div>
  );
};

export default CriarTrabalho;
