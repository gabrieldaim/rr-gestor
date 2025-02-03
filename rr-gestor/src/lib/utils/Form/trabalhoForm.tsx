"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EntregaType, TrabalhoType } from "@/types";
import { ComboBoxCliente } from "@/components/comboBoxCliente";
import { Input } from "@/components/ui/input";
import { ComboBoxResponsavel } from "@/components/comboBoxResponsavel";
import { formatarTelefone } from "@/lib/utils";
import { ComboboxTipoTrabalho } from "@/components/comboBoxTipoTrabalho";
import { ChevronDown, ChevronsUpDown, ExternalLink } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { EntregaStatus, EntregaStatusType } from "../types/EntregaStatus";
import EntregaForm from "./entregaForm";

const entregaSchema = z.object({
  id: z.number(),
  nome: z.string().min(1, { message: "Nome é obrigatório." }),
  data: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Data inválida.",
  }),
  status: z.string().min(1, { message: "Status é obrigatório." }),
});

const formSchema = z.object({
  clienteId: z.number().min(2, { message: "Cliente é obrigatório." }),
  email: z.string().email({ message: "E-mail inválido." }),
  telefone: z.string().min(2, { message: "Telefone é obrigatório." }),
  responsavelEmail: z.string().email({ message: "E-mail inválido." }),
  tema: z.string().min(2, { message: "Tema é obrigatório." }),
  faculdade: z.string().min(2, { message: "Faculdade é obrigatória." }),
  tipoTrabalho: z.string().min(2, { message: "Tipo de trabalho é obrigatório." }),
  curso: z.string().min(2, { message: "Curso é obrigatório." }),
  caminhoPendrive: z.string().optional(),
  caminhoDrive: z.string().optional(),
  observacao: z.string().optional(),
  entregas: z.array(entregaSchema).optional().refine((val) => val as unknown as EntregaType, {
    message: "Entregas inválidas.",
  }),
});

export default function TrabalhoForm({
  trabalho,
  setTrabalho,
}: {
  trabalho: TrabalhoType;
  setTrabalho: React.Dispatch<React.SetStateAction<TrabalhoType | null>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clienteId: trabalho.clienteId,
      email: trabalho.email,
      telefone: formatarTelefone(trabalho.telefone),
      responsavelEmail: trabalho.responsavelEmail,
      tema: trabalho.tema,
      faculdade: trabalho.faculdade,
      tipoTrabalho: trabalho.tipoTrabalho,
      curso: trabalho.curso,
      caminhoPendrive: trabalho.caminhoPendrive,
      caminhoDrive: trabalho.caminhoDrive,
      observacao: trabalho.observacao,
      entregas: trabalho.entregas,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {

    console.log(values);
  }

  function onError(errors: any) {
    const currentValues = form.getValues();
    console.log("Valores com erros:", currentValues);
    console.log("Erros:", errors);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className="">
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
                        id={trabalho.clienteId}
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
                        value={trabalho.email}
                        disabled
                        className="w-[200px]"
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
                        value={formatarTelefone(trabalho.telefone)}
                        disabled
                        className="w-[200px]"
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
                        email={trabalho.responsavelEmail}
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
                        value={trabalho.tema}
                        onChange={(e) => {
                          setTrabalho((prev) =>
                            prev ? { ...prev, tema: e.target.value } : prev
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
                name="faculdade"
                render={({ field }) => (
                  <FormItem className="w-[200px]">
                    <FormLabel>Faculdade</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={trabalho.faculdade}
                        onChange={(e) => {
                          setTrabalho((prev) =>
                            prev ? { ...prev, faculdade: e.target.value } : prev
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
                name="curso"
                render={({ field }) => (
                  <FormItem className="w-[200px]">
                    <FormLabel>Curso</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={trabalho.curso}
                        onChange={(e) => {
                          setTrabalho((prev) =>
                            prev ? { ...prev, curso: e.target.value } : prev
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
                        tipoTrabalhoOld={trabalho.tipoTrabalho}
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
                        value={trabalho.caminhoPendrive}
                        onChange={(e) => {
                          setTrabalho((prev) =>
                            prev
                              ? { ...prev, caminhoPendrive: e.target.value }
                              : prev
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
                name="caminhoDrive"
                render={({ field }) => (
                  <FormItem className="relative w-full">
                    <FormLabel>Link para o Drive</FormLabel>
                    <FormControl>
                      <>
                        <Input
                          {...field}
                          value={trabalho.caminhoDrive}
                          onChange={(e) => {
                            setTrabalho((prev) =>
                              prev
                                ? { ...prev, caminhoDrive: e.target.value }
                                : prev
                            );
                            field.onChange(e);
                          }}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            window.open(trabalho.caminhoDrive, "_blank")
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
                        value={trabalho.observacao}
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
                        entregas={trabalho.entregas ?? []}
                        setTrabalho={setTrabalho}
                        setValue={form.setValue}
                        onChange={(novasEntregas: EntregaType[]) => {
                          console.log("novasEntregas:", novasEntregas);
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
          </CollapsibleContent>
        </Collapsible>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
