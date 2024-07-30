import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CIQueryResponse } from "@/types/types";
import { QueryForm } from "@/components/query-form";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast";
import ErrorMessage from "@/components/error-message";
import { Metadata } from "next";

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
    "https://gdp.sicee-api.net/api/Search/SearchCNEPointsByCid",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Referer: "https://resultadospresidencialesvenezuela2024.com/",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({ cid: `V${cedula}` }),
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

    if (queryResult.Success) {
      // notFound();
      // return (
      //   // <ErrorMessage message="No se encontraron datos para la cédula proporcionada." />
      // );
    }

    const { Person, acta } = queryResult.Data;

    return (
      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="w-full">
          <QueryForm initialCedula={cedula} />
          <Alert className="mt-4">
            <AlertTitle className="text-xl text-center mb-2">
              Resultado de la consulta
            </AlertTitle>
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
              {acta ? (
                <>
                  <p>
                    <strong>Serial del Acta:</strong> {acta.serial}
                  </p>
                  {acta.url && (
                    <div className="mt-4">
                      <p>
                        <strong>Imagen del Acta:</strong>
                      </p>
                      <Image
                        src={acta.url}
                        alt="Acta CNE"
                        width={500}
                        height={700}
                        layout="responsive"
                        objectFit="contain"
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

    // notFound();

    return (
      <ErrorMessage message="Hubo un error al procesar su solicitud. Por favor, intente nuevamente más tarde." />
    );
  }
}
