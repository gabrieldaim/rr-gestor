import { getProxTrabalhos } from "@/lib/utils/req/resumos/proxEntregas";
import TableProxTrabalhos from "@/lib/utils/tables/tableProxEntregaResumo";
import { trabalho } from "@/types";
import React from "react";

export default function ProximosTrabalhos() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [proxTrabalhos, setProxTrabalhos] = React.useState<trabalho[] | null>(null);  // Defina o tipo correto

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getProxTrabalhos();
      setProxTrabalhos(data); // Defina a variável com o valor correto
    };

    fetchData();
  }, []);

  return (
    <div>
      {proxTrabalhos && proxTrabalhos.length > 0 ? (
        <TableProxTrabalhos data={proxTrabalhos} />  
      ) : (
        <></>
      )}
    </div>
  );
}
