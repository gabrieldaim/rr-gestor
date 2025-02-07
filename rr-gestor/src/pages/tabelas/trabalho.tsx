import TrabalhoForm from '@/lib/utils/Form/trabalhoForm';
import { getTrabalho } from '@/lib/utils/req/trabalho/trabalho';
import { TrabalhoType } from '@/types';
import React from 'react';
import { useParams } from 'react-router-dom';

const Trabalho = () => {
  const { id } = useParams(); // Captura o parâmetro "id" da URL

    const [trabalho, setTrabalho] = React.useState<TrabalhoType | null>(null);  // Defina o tipo correto
    // const [isLoaded, setIsLoaded] = React.useState(false);
  
    React.useEffect(() => {
      const fetchData = async () => {
        const data = await getTrabalho(id);
        setTrabalho(data); // Defina a variável com o valor correto
      };
  
      fetchData();
    }, []);

  return (
    <div className="p-6  mx-auto space-y-4 max-w-[712px] min-w-[50%]">
      <h2 className="text-lg font-semibold leading-none tracking-tight text-muted-foreground flex-shrink-0 text-center">
  Visualizar trabalho
</h2>
      {trabalho ? (
        <TrabalhoForm trabalho={trabalho} setTrabalho={setTrabalho} tipoTrabalhoForm='edicao'/>
) : (
        <></>
      )}
    </div>
  );
};

export default Trabalho;
