"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


import { showToast, UtilToast } from "../UtilToast";

import { ComboBoxIndicado } from "@/components/comboBoxIndicado";
import DialogConfirm from "@/components/dialogConfirmUtil";
import SelectTipoCliente from "@/components/selectTipoCliente";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { corrigirFusoData, preventEnter } from "@/lib/utils";
import { ClientesType, proxTrabalhosType } from "@/types";
import {
  Loader2
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  createCliente,
  deleteCliente,
  updateCliente,
} from "../req/cliente/cliente";
import {
  getTrabalhoEmail
} from "../req/trabalho/trabalho";
import { EntregaStatus } from "../types/EntregaStatus";
import { TipoClienteType } from "../types/tipoCliente";
import { TipoTrabalho } from "../types/TipoTrabalho";

const formSchema = z.object({
  nome: z.string().min(2, { message: "Nome é obrigatório." }),
  email: z.string().email({ message: "E-mail inválido." }),
  telefone: z.string().min(2, { message: "Telefone é obrigatório." }),
  tipoCliente: z.string().min(2, { message: "Tipo de cliente é obrigatório." }),
  observacao: z.string().optional(),
  indicadoPorEmail: z.string().nullable(),
  indicadoPorNome: z.string().nullable(),
  indicadoPorId: z.string().nullable(),
});

export default function ClienteForm({
  cliente,
  setCliente,
  tipoClienteForm,
}: {
  cliente: ClientesType | null;
  setCliente: React.Dispatch<React.SetStateAction<ClientesType | null>>;
  tipoClienteForm: "criacao" | "edicao";
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<proxTrabalhosType[] | []>([]);  
  const [isDeleting, setIsDeleting] = React.useState(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: cliente?.nome,
      email: cliente?.email,
      telefone: cliente?.telefone,
      tipoCliente: cliente?.tipoCliente,
      observacao: cliente?.observacao,
      indicadoPorEmail: cliente?.indicadoPorEmail,
      indicadoPorNome: cliente?.indicadoPorNome,
      indicadoPorId: cliente?.indicadoPorId,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let res = null;
    if (tipoClienteForm == "edicao") {
      res = await updateCliente(cliente?.id.toString(), values, setIsLoading);
    }
    if (tipoClienteForm == "criacao") {
      res = await createCliente(values, setIsLoading);
    }
    if (res?.status == "200") {
      showToast("success", "Cliente salvo com sucesso!");
      navigate("/");
    } else {
      if (
        res?.status == "404" &&
        res?.response?.data?.mensagem == "Usuário já cadastrado no sistema"
      ) {
        showToast("error", "Email já cadastrado anteriormente");
      } else {
        showToast("error", "Erro ao salvar o Cliente.");
      }
    }
  }

  const handleClickRow = (id: String) => {
    navigate(`/trabalho/${id}`);
  }

  async function handleSubmit() {
    const isValid = await form.trigger(); // Dispara a validação manualmente
    if (!isValid) {
      onError(form.formState.errors);
      return;
    }

    form.handleSubmit(onSubmit, onError)();
  }

  async function handleDelete() {
    const res = await deleteCliente(cliente?.id.toString(), setIsDeleting);
    if (res?.status == "200") {
      showToast("success", "Cliente deletado com sucesso!");
      navigate("/");
    } else {
      showToast("error", "Erro ao deletar o Cliente.");
    }
  }

  function onCancel() {
    navigate("/");
  }

  function onError(errors: any) {
    showToast("error", "Formulário possui valores fora do padrão esperado");
    Object.values(errors).forEach((error: any) => {
      if (error?.message) {
        showToast("error", error.message);
      }
    });
  }

    React.useEffect(() => {
      const fetchData = async () => {
        if(tipoClienteForm == "edicao"){
          const data = await getTrabalhoEmail(cliente?.email);
          setData(data); // Defina a variável com o valor correto
        }

      };
  
      fetchData();
    }, []);

  return (
<>
<Form {...form}>
      <UtilToast />
      <form className="">
        <div className="flex gap-8 flex-wrap mt-4">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem className="w-[200px]">
                <FormLabel>Nome do Cliente</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={cliente?.nome}
                    onChange={(e) => {
                      setCliente((prev) =>
                        prev ? { ...prev, nome: e.target.value } : prev
                      );
                      field.onChange(e);
                    }}
                    onKeyDown={(e) => {
                      preventEnter(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-[200px]">
                <FormLabel>Email do Cliente</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={cliente?.email}
                    onChange={(e) => {
                      setCliente((prev) =>
                        prev ? { ...prev, email: e.target.value } : prev
                      );
                      field.onChange(e);
                    }}
                    onKeyDown={(e) => {
                      preventEnter(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telefone"
            render={({ field }) => (
              <FormItem className="w-[200px]">
                <FormLabel>Telefone do Cliente</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={cliente?.telefone}
                    onChange={(e) => {
                      setCliente((prev) =>
                        prev ? { ...prev, telefone: e.target.value } : prev
                      );
                      field.onChange(e);
                    }}
                    onKeyDown={(e) => {
                      preventEnter(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="indicadoPorId"
            render={() => (
              <FormItem className="flex flex-col justify-end">
                <FormLabel className="h-[18.4px]">Indicado por</FormLabel>
                <FormControl>
                  <ComboBoxIndicado
                    setCliente={setCliente}
                    setValue={form.setValue}
                    id={cliente?.indicadoPorId}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="indicadoPorEmail"
            render={() => (
              <FormItem>
                <FormLabel>Email de quem indicou</FormLabel>
                <FormControl>
                  <Input
                    value={cliente?.indicadoPorEmail ?? ""}
                    disabled
                    className="w-[200px]"
                    onKeyDown={(e) => {
                      preventEnter(e);
                    }}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tipoCliente"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo Cliente</FormLabel>
                <FormControl>
                  <SelectTipoCliente
                  width="200"
                    {...field}
                    value={cliente?.tipoCliente as TipoClienteType}
                    onChange={(e) => {
                      setCliente((prev) =>
                        prev ? { ...prev, tipoCliente: e } : prev
                      );
                      field.onChange(e);
                    }}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="observacao"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={cliente?.observacao}
                    onChange={(e) => {
                      setCliente((prev) =>
                        prev ? { ...prev, observacao: e.target.value } : prev
                      );
                      field.onChange(e);
                    }}
                    className="h-[120px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-8">
        <h2 className="font-medium">Trabalhos do cliente</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tema</TableHead>
              <TableHead>Tipo de Trabalho</TableHead>
              <TableHead>Próximo Prazo</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
                          data.map((trabalho) => (
                            <TableRow key={trabalho.id} className="hover:cursor-pointer" onClick={() => handleClickRow(trabalho.id)}>
                              <TableCell>{trabalho.nome}</TableCell>
                              <TableCell>{trabalho.tema}</TableCell>
                              <TableCell>{TipoTrabalho[trabalho.tipoTrabalho as keyof typeof TipoTrabalho]}</TableCell>
                              <TableCell>{corrigirFusoData(trabalho.proxPrazo).toLocaleDateString('pt-BR')}</TableCell>
                              <TableCell>{EntregaStatus[trabalho.statusEntrega as keyof typeof EntregaStatus]}</TableCell>
                            </TableRow>
                          ))
            ) : (<div className="flex h-14 items-center relative left-2">
              <h3 className="text-lg font-semibold leading-none tracking-tight text-muted-foreground flex-shrink-0">
              Nenhum trabalho encontrado</h3>
            </div>)}
          </TableBody>
        </Table>
        </div>
        <div className="mt-8 flex flex-col items-center">
          <div className="flex gap-4">
            <Button
              variant="destructive"
              className="w-[100px]"
              type="button"
              onClick={onCancel}
            >
              Cancelar
            </Button>
            <DialogConfirm
              title="Manter alterações?"
              description="Deseja sair e salvar as alterações realizadas?"
              affirmative="Salvar"
              negative="Cancelar"
              handleClick={() => handleSubmit()}
              isLoading={isLoading}
            >
              <Button className="w-[100px]" disabled={isLoading}>
                {isLoading && <Loader2 className="animate-spin" />}
                {isLoading ? "Salvando..." : "Salvar"}
              </Button>
            </DialogConfirm>
          </div>

          {tipoClienteForm == "edicao" && (
            <DialogConfirm
              title="Deletar trabalho?"
              description="Deseja deletar permanentemente esse trabalho? Essa ação não pode ser desfeita."
              affirmative="Salvar"
              negative="Cancelar"
              handleClick={() => handleDelete()}
              isLoading={isDeleting}
            >
              <Button
                className="w-[216px] text-red-500 hover:text-red-600"
                variant="ghost"
              >
                Deletar Cliente
              </Button>
            </DialogConfirm>
          )}
        </div>
      </form>
    </Form>
    
    </>
  );
}
