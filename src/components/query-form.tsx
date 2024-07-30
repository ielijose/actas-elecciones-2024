"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { FormData } from "@/types/types";

interface QueryFormProps {
  initialCedula?: string;
}

export function QueryForm({ initialCedula = "" }: QueryFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    defaultValues: {
      cedula: initialCedula,
    },
  });

  useEffect(() => {
    form.setValue("cedula", initialCedula);
  }, [initialCedula, form]);

  async function onSubmit(values: FormData) {
    if (values.cedula === initialCedula) {
      return;
    }

    if (values.cedula.length > 8) {
      toast({
        title: "Error",
        description: "La cédula no puede tener más de 8 dígitos",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      router.push(`/${values.cedula}`);
    } catch (error) {
      toast({
        title: "Error",
        description:
          "No se pudo realizar la consulta. Por favor, intente nuevamente.",
        variant: "destructive",
      });
      setIsLoading(false);
    } finally {
    }
  }

  return (
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
              maxLength: {
                value: 8,
                message: "La cédula no puede tener más de 8 dígitos",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cédula *</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese número de cédula" {...field} />
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
  );
}
