import React from "react";
import { Skeleton } from "./ui/skeleton";

interface LoadingTableProps {
  rows?: number; // Número de linhas da tabela
  columns?: number; // Número de colunas da tabela
}

export default function LoadingTable() {
  return (
    <div className="flex flex-col space-y-3 w-full p-6">
      <Skeleton className="w-full h-9"></Skeleton>
      <Skeleton className="w-full h-9"></Skeleton>
      <Skeleton className="w-full h-9"></Skeleton>
      <Skeleton className="w-full h-9"></Skeleton>
      <Skeleton className="w-full h-9"></Skeleton>
      <Skeleton className="w-full h-9"></Skeleton>
    </div>
  )
}
