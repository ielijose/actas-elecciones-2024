import ErrorMessage from "@/components/error-message";
import { QueryForm } from "@/components/query-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CIQueryResponse } from "@/types/types";
import { createClient } from "@supabase/supabase-js";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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
      .select("data,url")
      .eq("ci", cedula)
      .single();

    console.log({ cachedData });

    if (cachedData && !error) {
      if (cachedData.url) {
        return cachedData as CIQueryResponse;
      }
      return cachedData.data as CIQueryResponse;
    }
  } catch (error) {
    console.error("Error fetching data from cache:", error);
  }

  // If not in cache, fetch from API
  // const response = await fetch(
  //   "https://gdp.sicee-api.net/api/Search/SearchCNEPointsByCid",
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       accept: "application/json",
  //       Referer: "https://resultadospresidencialesvenezuela2024.com/",
  //       "User-Agent":
  //         "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  //     },
  //     body: JSON.stringify({ cid: `V${cedula}` }),
  //   }
  // );

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

  const data: CIQueryResponse = await response.json();

  // Cache the response
  const { error } = await supabase
    .from("actas")
    .upsert({ ci: cedula, url: data.url });

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
    let actaImg = null;

    let person = null;
    let acta = null;

    if (queryResult.url) {
      actaImg = queryResult.url;
    } else if (queryResult?.Data?.acta?.url) {
      actaImg = queryResult.Data.acta.url;
      person = queryResult.Data.Person;
      acta = queryResult.Data.acta;
    }

    return (
      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="w-full">
          <QueryForm initialCedula={cedula} />
          <Alert className="mt-4">
            <AlertTitle className="text-xl text-center mb-2">
              Resultado de la consulta
            </AlertTitle>
            <AlertDescription>
              {person && (
                <>
                  <p>
                    <strong>Nombre:</strong> {person.fullname}
                  </p>
                  <p>
                    <strong>Cédula:</strong> {person.cid}
                  </p>
                  <p>
                    <strong>Fecha de Nacimiento:</strong> {person.date}
                  </p>
                  <p>
                    <strong>Estado:</strong> {person.state}
                  </p>
                  <p>
                    <strong>Municipio:</strong> {person.mun}
                  </p>
                  <p>
                    <strong>Parroquia:</strong> {person.par}
                  </p>
                  <p>
                    <strong>Centro de Votación:</strong> {person.center}
                  </p>
                  <p>
                    <strong>Dirección:</strong> {person.address}
                  </p>
                </>
              )}

              {acta && (
                <>
                  <p>
                    <strong>Serial del Acta:</strong> {acta.serial}
                  </p>
                </>
              )}

              {actaImg && (
                <div className="mt-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={actaImg} alt="Acta CNE" width={500} height={700} />

                  {/* <Image
                        src={acta.url}
                        alt="Acta CNE"
                        width={500}
                        height={700}
                        layout="responsive"
                        objectFit="contain"
                      /> */}
                </div>
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
