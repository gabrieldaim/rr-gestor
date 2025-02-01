import { getTrabalho } from '@/lib/utils/req/trabalho/trabalho';
import { TrabalhoType } from '@/types';
import React from 'react';
import { useParams } from 'react-router-dom';

const Trabalho = () => {
  const { id } = useParams(); // Captura o parâmetro "id" da URL

    const [trabalho, setTrabalho] = React.useState<TrabalhoType | null>(null);  // Defina o tipo correto
    const [isLoaded, setIsLoaded] = React.useState(false);
  
    React.useEffect(() => {
      const fetchData = async () => {
        const data = await getTrabalho(id,setIsLoaded);
        setTrabalho(data); // Defina a variável com o valor correto
      };
  
      fetchData();
    }, []);

  return (
    <div>
      <h1>Trabalho</h1>
      {trabalho ? (
        <p>{trabalho.nome}</p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Trabalho;
