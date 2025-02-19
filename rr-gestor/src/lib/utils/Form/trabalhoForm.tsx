"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { motion } from "framer-motion";

import { showToast, UtilToast } from "../UtilToast";

import { ComboBoxCliente } from "@/components/comboBoxCliente";
import { ComboBoxResponsavel } from "@/components/comboBoxResponsavel";
import { ComboboxTipoTrabalho } from "@/components/comboBoxTipoTrabalho";
import DialogConfirm from "@/components/dialogConfirmUtil";
import SelectTipoPagamento from "@/components/selectTipoPagamento";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatarParaReal, formatarTelefone, preventEnter } from "@/lib/utils";
import { EntregaType, ParcelaType, TrabalhoType } from "@/types";
import {
  ChevronDown,
  ExternalLink,
  Loader2,
  PlusIcon
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { createTrabalho, deleteTrabalho, updateTrabalho } from "../req/trabalho/trabalho";
import { TipoPagamentoType } from "../types/TipoPagamento";
import EntregaForm from "./entregaForm";
import ParcelaForm from "./parcelaForm";


const entregaSchema = z.object({
  id: z.number().optional().nullable(),
  nome: z.string().min(2,{ message: "Nome é obrigatório." }),
  data: z.string().min(2,{ message: "Data é obrigatória." }),
  status: z.string().min(2,{ message: "Status é obrigatório." }),
});

const parcelaSchema = z.object({
  id: z.number().optional().nullable(),
  nome: z.string().min(2, { message: "Nome é obrigatório." }),
  data: z.string().min(2, { message: "Data é obrigatória." }),
  status: z.string().min(2, { message: "Status é obrigatório." }),
  valor: z.number().min(1, { message: "Valor é obrigatório." }),
});

const formSchema = z.object({
  clienteId: z.number().min(2, { message: "Cliente é obrigatório." }),
  email: z.string().email({ message: "E-mail inválido." }),
  telefone: z.string().min(2, { message: "Telefone é obrigatório." }),
  responsavelEmail: z.string().email({ message: "E-mail inválido." }),
  tema: z.string().min(2, { message: "Tema é obrigatório." }),
  faculdade: z.string().min(2, { message: "Faculdade é obrigatória." }),
  tipoTrabalho: z
    .string()
    .min(2, { message: "Tipo de trabalho é obrigatório." }),
  curso: z.string().min(2, { message: "Curso é obrigatório." }),
  caminhoPendrive: z.string().optional(),
  caminhoDrive: z.string().optional(),
  observacao: z.string().optional(),
  tipoPagamento: z.string().optional(),
  valorTotal: z.number().optional(),
  entregas: z
    .array(entregaSchema)
    .optional()
    .refine((val) => (val ?? []).every((entrega) => entregaSchema.safeParse(entrega).success), {
      message: "Um dos campos da entrega está vazio",
    }),
  parcelas: z
    .array(parcelaSchema)
    .optional()
    .refine((val) => (val ?? []).every((parcela) => parcelaSchema.safeParse(parcela).success), {
      message: "Um dos campos da parcela está vazio",
    }),
});

export default function TrabalhoForm({
  trabalho,
  setTrabalho,
  tipoTrabalhoForm,
}: {
  trabalho: TrabalhoType | null;
  setTrabalho: React.Dispatch<React.SetStateAction<TrabalhoType | null>>;
  tipoTrabalhoForm: "criacao" | "edicao";
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clienteId: trabalho?.clienteId,
      email: trabalho?.email,
      telefone: formatarTelefone(trabalho?.telefone),
      responsavelEmail: trabalho?.responsavelEmail,
      tema: trabalho?.tema,
      faculdade: trabalho?.faculdade,
      tipoTrabalho: trabalho?.tipoTrabalho,
      curso: trabalho?.curso,
      caminhoPendrive: trabalho?.caminhoPendrive,
      caminhoDrive: trabalho?.caminhoDrive,
      observacao: trabalho?.observacao,
      entregas: trabalho?.entregas,
      parcelas: trabalho?.parcelas,
      tipoPagamento: trabalho?.tipoPagamento ? String(trabalho?.tipoPagamento) : undefined,
      valorTotal: trabalho?.valorTotal,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let res = null;

    if (tipoTrabalhoForm == "edicao") {
      res = await updateTrabalho(trabalho?.id.toString(), values, setIsLoading);
    }
    if (tipoTrabalhoForm == "criacao") {
      res = await createTrabalho(values, setIsLoading);
    }
    if(res?.status == '200'){
      showToast("success", "Trabalho salvo com sucesso!")
      navigate("/")
    }else{
      showToast("error", "Erro ao salvar o trabalho.")
    }

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

    const res = await deleteTrabalho(trabalho?.id.toString(), setIsDeleting);
    if(res?.status == '200'){
      showToast("success", "Trabalho deletado com sucesso!")
      navigate("/")
    }else{
      showToast("error", "Erro ao deletar o trabalho.")
    }
  }

  function onCancel() {
    navigate('/')
  }

  function onError(errors: any) {
    showToast("error", "Formulário possui valores fora do padrão esperado");
    Object.values(errors).forEach((error: any) => {
      if (error?.message) {
      showToast("error", error.message);
      }
    });
  }

  return (
    <Form {...form}>
      <UtilToast />
      <form className="">
        <Collapsible>
          <CollapsibleTrigger asChild className="cursor-pointer">
            <div className="flex gap-2 min-w-[664px]">
              <h2 className="text-base font-normal leading-none tracking-tight text-muted-foreground flex-shrink-0 mt-8">
                Informações pessoais
              </h2>
              <ChevronDown className="w-5 h-5 mt-8"></ChevronDown>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="flex gap-8 flex-wrap mt-4">
              <FormField
                control={form.control}
                name="clienteId"
                render={() => (
                  <FormItem className="flex flex-col justify-end">
                    <FormLabel className="h-[18.4px]">Cliente</FormLabel>
                    <FormControl>
                      <ComboBoxCliente
                        setTrabalho={setTrabalho}
                        setValue={form.setValue}
                        id={trabalho?.clienteId}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={() => (
                  <FormItem>
                    <FormLabel>Email do Cliente</FormLabel>
                    <FormControl>
                      <Input
                        value={trabalho?.email}
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
                name="telefone"
                render={() => (
                  <FormItem>
                    <FormLabel>Telefone do Cliente</FormLabel>
                    <FormControl>
                      <Input
                        value={formatarTelefone(trabalho?.telefone)}
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
                name="responsavelEmail"
                render={() => (
                  <FormItem className="flex flex-col justify-end">
                    <FormLabel className="h-[18.4px]">Responsável</FormLabel>
                    <FormControl>
                      <ComboBoxResponsavel
                        setTrabalho={setTrabalho}
                        setValue={form.setValue}
                        email={trabalho?.responsavelEmail}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
        <div className="w-full border-t border-gray-300 my-4"></div>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <div className="flex gap-2 min-w-[664px]">
              <h2 className="text-base font-normal leading-none tracking-tight text-muted-foreground flex-shrink-0 mt-8">
                Informações gerais do trabalho
              </h2>
              <ChevronDown className="w-5 h-5 mt-8"></ChevronDown>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="flex gap-8 flex-wrap mt-4">
              <FormField
                control={form.control}
                name="tema"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Tema do trabalho</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={trabalho?.tema}
                        onChange={(e) => {
                          setTrabalho((prev) =>
                            prev ? { ...prev, tema: e.target.value } : prev
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
                name="faculdade"
                render={({ field }) => (
                  <FormItem className="w-[200px]">
                    <FormLabel>Faculdade</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={trabalho?.faculdade}
                        onChange={(e) => {
                          setTrabalho((prev) =>
                            prev ? { ...prev, faculdade: e.target.value } : prev
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
                name="curso"
                render={({ field }) => (
                  <FormItem className="w-[200px]">
                    <FormLabel>Curso</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={trabalho?.curso}
                        onChange={(e) => {
                          setTrabalho((prev) =>
                            prev ? { ...prev, curso: e.target.value } : prev
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
                name="tipoTrabalho"
                render={() => (
                  <FormItem className="flex flex-col justify-end">
                    <FormLabel className="h-[18.4px]">
                      Tipo de Trabalho
                    </FormLabel>
                    <FormControl>
                      <ComboboxTipoTrabalho
                        setTrabalho={setTrabalho}
                        setValue={form.setValue}
                        tipoTrabalhoOld={trabalho?.tipoTrabalho}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="caminhoPendrive"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Pasta do trabalho no Pendrive</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={trabalho?.caminhoPendrive}
                        onChange={(e) => {
                          setTrabalho((prev) =>
                            prev
                              ? { ...prev, caminhoPendrive: e.target.value }
                              : prev
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
                name="caminhoDrive"
                render={({ field }) => (
                  <FormItem className="relative w-full">
                    <FormLabel>Link para o Drive</FormLabel>
                    <FormControl>
                      <>
                        <Input
                          {...field}
                          value={trabalho?.caminhoDrive}
                          onChange={(e) => {
                            setTrabalho((prev) =>
                              prev
                                ? { ...prev, caminhoDrive: e.target.value }
                                : prev
                            );
                            field.onChange(e);
                          }}
                          onKeyDown={(e) => {
                            preventEnter(e);
                          }}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            window.open(trabalho?.caminhoDrive, "_blank")
                          }
                          className="absolute top-[42px] right-2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700"
                        >
                          <ExternalLink size={20} />
                        </button>
                      </>
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
                        value={trabalho?.observacao}
                        onChange={(e) => {
                          setTrabalho((prev) =>
                            prev
                              ? { ...prev, observacao: e.target.value }
                              : prev
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
          </CollapsibleContent>
        </Collapsible>
        <div className="w-full border-t border-gray-300 my-4"></div>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <div className="flex gap-2 min-w-[664px]">
              <h2 className="text-base font-normal leading-none tracking-tight text-muted-foreground flex-shrink-0 mt-8">
                Informações sobre as entregas
              </h2>
              <ChevronDown className="w-5 h-5 mt-8"></ChevronDown>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="flex gap-8 flex-wrap mt-4">
              <FormField
                control={form.control}
                name="entregas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lista de entregas</FormLabel>
                    <FormControl>
                      <EntregaForm
                        {...field}
                        entregas={trabalho?.entregas ?? []}
                        setTrabalho={setTrabalho}
                        setValue={form.setValue}
                        onChange={(novasEntregas: EntregaType[]) => {
                          setTrabalho((prev) =>
                            prev ? { ...prev, entregas: novasEntregas } : prev
                          );
                          field.onChange(novasEntregas); // Atualiza o estado do formulário
                          form.setValue("entregas", novasEntregas); // Atualiza explicitamente o valor
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              onClick={(e) => {
                e.preventDefault()
                const novasEntregas = [
                  ...(trabalho?.entregas ?? []),
                  {
                    id: null as any,
                    nome: "",
                    data: "",
                    status: "NAO_INICIADA",
                  },
                ];
                setTrabalho((prev) =>
                  prev ? { ...prev, entregas: novasEntregas } : prev
                );
                form.setValue("entregas", novasEntregas);
              }}
              variant={"link"}
              className="p-0 hover:no-underline"
            >
              <PlusIcon></PlusIcon>
              Adicionar nova Entrega
            </Button>
          </CollapsibleContent>
        </Collapsible>
        <div className="w-full border-t border-gray-300 my-4"></div>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <div className="flex gap-2 min-w-[664px]">
              <h2 className="text-base font-normal leading-none tracking-tight text-muted-foreground flex-shrink-0 mt-8">
                Informações sobre os pagamentos
              </h2>
              <ChevronDown className="w-5 h-5 mt-8"></ChevronDown>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="flex gap-8 flex-wrap mt-4">
              <FormField
                control={form.control}
                name="tipoPagamento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de pagamento</FormLabel>
                    <FormControl>
                      <SelectTipoPagamento
                      value={trabalho?.tipoPagamento ? (trabalho.tipoPagamento as TipoPagamentoType) : "A_VISTA"}
                      onChange={(newStatus) => {
                        setTrabalho((prev) =>
                        prev ? { ...prev, tipoPagamento: newStatus } : prev
                        );
                        field.onChange(newStatus);
                        form.setValue("tipoPagamento", newStatus);
                      }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="valorTotal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor total</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Valor da parcela"
                        type="text"
                        value={
                          trabalho?.tipoPagamento === "PARCELADO"
                            ? formatarParaReal(
                                trabalho?.parcelas?.reduce(
                                  (acc, parcela) => acc + parcela.valor,
                                  0
                                ) * 100 || 0
                              )
                            : formatarParaReal((trabalho?.valorTotal ?? 0) * 100)
                        }
                        onChange={(e) => {
                          if (trabalho?.tipoPagamento !== "PARCELADO") {
                            const rawValue = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
                            const centsValue = parseInt(rawValue, 10) || 0; // Converte para número, garantindo que seja 0 se vazio
                            setTrabalho((prev) =>
                              prev
                                ? { ...prev, valorTotal: centsValue / 100 }
                                : prev
                            );
                            field.onChange(centsValue / 100);
                            form.setValue("valorTotal", centsValue / 100);
                          }
                        }}
                        className="w-[150px] border p-2"
                        disabled={trabalho?.tipoPagamento === "PARCELADO"}
                        onKeyDown={(e) => {
                          preventEnter(e);
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {trabalho?.tipoPagamento === "PARCELADO" && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex gap-8 flex-wrap mt-4"
                >
                  <FormField
                    control={form.control}
                    name="parcelas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lista de Parcelas</FormLabel>
                        <FormControl>
                          <ParcelaForm
                            {...field}
                            parcelas={trabalho?.parcelas ?? []}
                            setTrabalho={setTrabalho}
                            setValue={form.setValue}
                            onChange={(novasParcelas: ParcelaType[]) => {
                              const valorTotalParcelas = novasParcelas.reduce(
                                (acc, parcela) => acc + (parcela.valor || 0),
                                0
                              );
                              setTrabalho((prev) =>
                                prev
                                  ? {
                                      ...prev,
                                      parcelas: novasParcelas,
                                      valorTotal: valorTotalParcelas,
                                    }
                                  : prev
                              );
                              field.onChange(novasParcelas); // Atualiza o estado do formulário
                              form.setValue("parcelas", novasParcelas); // Atualiza explicitamente o valor
                              form.setValue("valorTotal", valorTotalParcelas);
                            }}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    const novasParcelas = [
                      ...(trabalho?.parcelas ?? []),
                      {
                        id: null as any,
                        nome: "",
                        data: "",
                        status: "AGUARDANDO_DATA",
                        valor: 0,
                      },
                    ];
                    setTrabalho((prev) =>
                      prev ? { ...prev, parcelas: novasParcelas } : prev
                    );
                    form.setValue("parcelas", novasParcelas);
                  }}
                  variant={"link"}
                  className="p-0 hover:no-underline"
                >
                  <PlusIcon></PlusIcon>
                  Adicionar novo Pagamento
                </Button>
              </>
            )}
          </CollapsibleContent>
        </Collapsible>
        <div className="mt-8 flex flex-col items-center">
          <div className="flex gap-4">
            <Button variant="destructive" className="w-[100px]" type="button" onClick={onCancel}>
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
              
              <Button className="w-[100px]" disabled={isLoading} >
                  {isLoading && <Loader2 className="animate-spin" />}
                  {isLoading ? "Salvando..." : "Salvar"}
              </Button>
              
            </DialogConfirm>
          </div>

          {tipoTrabalhoForm == 'edicao' && (
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
                Deletar trabalho
              </Button>
              
            </DialogConfirm>
          )}
        </div>
      </form>
    </Form>
  );
}
