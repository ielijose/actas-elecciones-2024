"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface FormData {
  cedula: string;
}

interface Person {
  cid: string;
  fullname: string;
  date: string;
  location: string;
  state: string;
  mun: string;
  par: string;
  center: string;
  address: string;
  table: string | null;
  book: string | null;
  page: string | null;
  row: string | null;
  markCheck: boolean;
}

interface Acta {
  geo: string | null;
  serial: string;
  documentId: number;
  url: string;
  stages: string | null;
}

interface CNEQueryResponse {
  Success: boolean;
  Messages: string[];
  Errors: string[];
  Data: {
    Points: null;
    Person: Person;
    isSelectedMember: boolean;
    MemberInfo: null;
    acta: Acta;
  };
}

export default function Home() {
  const { toast } = useToast();
  const [queryResult, setQueryResult] = useState<CNEQueryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    defaultValues: {
      cedula: "",
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cedula: values.cedula }),
      });

      if (!response.ok) {
        throw new Error("Failed to query CNE");
      }

      const data: CNEQueryResponse = await response.json();
      setQueryResult(data);
      toast({
        title: "Consulta exitosa",
        description: "Se han obtenido los datos del CNE.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          "No se pudo realizar la consulta. Por favor, intente nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const renderQueryResult = () => {
    if (!queryResult || !queryResult.Success) return null;

    const { Person, acta } = queryResult.Data;

    return (
      <Alert className="mt-4">
        <AlertTitle>Resultado de la consulta</AlertTitle>
        <AlertDescription>
          <p>
            <strong>Nombre:</strong> {Person.fullname}
          </p>
          <p>
            <strong>Cédula:</strong> {Person.cid}
          </p>
          <p>
            <strong>Fecha de Nacimiento:</strong> {Person.date}
          </p>
          <p>
            <strong>Estado:</strong> {Person.state}
          </p>
          <p>
            <strong>Municipio:</strong> {Person.mun}
          </p>
          <p>
            <strong>Parroquia:</strong> {Person.par}
          </p>
          <p>
            <strong>Centro de Votación:</strong> {Person.center}
          </p>
          <p>
            <strong>Dirección:</strong> {Person.address}
          </p>
          <p>
            <strong>Serial del Acta:</strong> {acta.serial}
          </p>
          {acta.url && (
            <div className="mt-4">
              <p>
                <strong>Imagen del Acta:</strong>
              </p>
              <img src={acta.url} alt="Acta CNE" width={500} />
            </div>
          )}
        </AlertDescription>
      </Alert>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Consulta Actas CNE
        </h1>
        <Card className="p-6 rounded-lg shadow-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="cedula"
                rules={{
                  required: "Este campo es requerido",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Por favor ingrese solo números",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cédula *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese número de cédula"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Consultando..." : "Consultar"}
              </Button>
            </form>
          </Form>
        </Card>

        {renderQueryResult()}
      </div>
    </main>
  );
}
