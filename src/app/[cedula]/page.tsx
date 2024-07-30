import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CIQueryResponse } from "@/types/types";
import { QueryForm } from "@/components/query-form";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast";
import ErrorMessage from "@/components/error-message";
import { Metadata } from "next";
import Link from "next/link";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const metadata: Metadata = {
  title: "Resultado | Consulta Actas CNE",
  description: "Informacion de Centros y mesas de votacion",
};

async function getCIData(cedula: string): Promise<CIQueryResponse> {
  // Check cache first
  try {
    const { data: cachedData, error } = await supabase
      .from("actas")
      .select("data")
      .eq("ci", cedula)
      .single();

    console.log({ cachedData });

    if (cachedData && !error) {
      return cachedData.data as CIQueryResponse;
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
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data from API");
  }

  const data: CIQueryResponse = await response.json();

  // Cache the response
  const { error } = await supabase
    .from("actas")
    .upsert({ ci: cedula, data: data });

  if (error) {
    console.error("Error caching data:", error);
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
                  <p className="text-center">
                    La consulta ha sido exitosa. Por favor, descargue el
                    archivo{" "}<br/>
                    <Link
                      href={url}
                      className="underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      a continuación
                    </Link>
                    .
                  </p>
                  <img src={url} alt="Actas CNE" />
                </>
              ) : (
                <p className="text-center">
                  La consulta no ha sido exitosa. Por favor, intente nuevamente
                  mas tarde.
                </p>
              )}
            </AlertDescription>
          </Alert>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error fetching data:", error);

    // notFound();

    return (
      <ErrorMessage message="Hubo un error al procesar su solicitud. Por favor, intente nuevamente más tarde." />
    );
  }
}
