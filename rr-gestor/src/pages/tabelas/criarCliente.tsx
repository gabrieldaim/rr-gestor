import ClienteForm from '@/lib/utils/Form/clienteForm';
import TrabalhoForm from '@/lib/utils/Form/trabalhoForm';
import { ClientesType, TrabalhoType } from '@/types';
import React from 'react';

const CriarCliente = () => {

    const emptyCliente: ClientesType = {
      id: '',
      nome: '',
      email: '',
      telefone: '',
      tipoCliente: '',
      observacao: '',
      indicadoPorEmail: '',
      indicadoPorNome: '',
      indicadoPorId: '',
    };

    const [cliente, setCliente] = React.useState<ClientesType | null>(emptyCliente);

  return (
    <div className="p-6  mx-auto space-y-4 max-w-[712px] min-w-[50%]">
      <h2 className="text-lg font-semibold leading-none tracking-tight text-muted-foreground flex-shrink-0 text-center">
  Criar Cliente
</h2>
<ClienteForm cliente={cliente} setCliente={setCliente} tipoClienteForm='criacao'/>
    </div>
  );
};

export default CriarCliente;
