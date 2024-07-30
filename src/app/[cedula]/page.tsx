import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CIQueryResponse } from "@/types/types";
import { QueryForm } from "@/components/query-form";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast";
import ErrorMessage from "@/components/error-message";
import { Metadata } from "next";

const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if(!NEXT_PUBLIC_SUPABASE_URL || !NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("Missing Supabase credentials");
}

// Initialize Supabase client
const supabase = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY
);


export const metadata: Metadata = {
  title: "Resultado | Consulta Actas CNE",
  description: "Informacion de Centros y mesas de votacion",
};

async function getCIData(cedula: string): Promise<any> {
  // Check cache first
  try {
    const cedulaInt = parseInt(cedula);
    if (!cedulaInt) {
      throw new Error("Cedula Invalida");
    }

    const { data: cachedData, error } = await supabase
      .from("actas")
      .select("data")
      .eq("ci", cedulaInt)
      .single();

    console.log({ cachedData });

    if (cachedData && !error) {
      console.log('Data cached...');
      return cachedData.data;
    }
  } catch (error) {
    console.error("Error fetching data from cache:", error);
  }

  // If not in cache, fetch from API
  const response = await fetch(
    `https://tvtcrhau2vo336qa5r66p3bygy0hazyk.lambda-url.us-east-1.on.aws/?cedula=V${cedula}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Referer: "https://resultadospresidencialesvenezuela2024.com/",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data from API");
  }

  const data = await response.json();

  // Cache the response if the acta is founded
  if(data.url) {
    console.log('Acta founded, caching data');
    const { error } = await supabase
    .from("actas")
    .upsert({ ci: cedula, data: data });
    
    if (error) {
      console.error("Error caching data:", error);
    }
  }

  return data;
}

export default async function CedulaPage({
  params,
}: {
  params: { cedula: string };
}) {
  const { cedula } = params;

  if (!/^\d+$/.test(cedula)) {
    notFound();
  }

  try {
    const queryResult = await getCIData(cedula);

    const { url } = queryResult;

    return (
      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="w-full">
          <QueryForm initialCedula={cedula} />
          <Alert className="mt-4">
            <AlertTitle className="text-xl text-center mb-2">
              Resultado de la consulta
            </AlertTitle>
            <AlertDescription>
              {url ? (
                <>
                  {url && (
                    <div className="mt-4">
                      <p>
                        <strong>Imagen del Acta:</strong>
                      </p>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url}
                        alt="Acta CNE"
                        width={500}
                        height={700}
                      />
                    </div>
                  )}
                </>
              ) : (
                <p className="text-xl text-center text-red-600">
                  No se encontró el acta
                </p>
              )}
            </AlertDescription>
          </Alert>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error fetching data:", error);

    return (
      <ErrorMessage message="Hubo un error al procesar su solicitud. Es posible que el servidor esté caído por muchas peticiones o el acta todavia no ha sido cargada. Por favor, intente nuevamente más tarde." />
    );
  }
}
