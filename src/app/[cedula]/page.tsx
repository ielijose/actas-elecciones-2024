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

  const myHeaders = new Headers();
  myHeaders.append(
    "sec-ch-ua",
    '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"'
  );
  myHeaders.append("Accept", "application/json, text/plain, */*");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Referer",
    "https://resultadospresidencialesvenezuela2024.com/"
  );
  myHeaders.append("sec-ch-ua-mobile", "?0");
  myHeaders.append(
    "User-Agent",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
  );
  myHeaders.append("sec-ch-ua-platform", '"macOS"');

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    // redirect: "follow",
  };

  const response = await fetch(
    "https://37latuqm766patrerdf5rvdhqe0wgrug.lambda-url.us-east-1.on.aws/?cedula=V21382772&recaptcha=03AFcWeA6uAJ1DkrUhGjbkyIjxdpMJ-0_SkOzs71Uh9iiY80oA4qHQXcBC1a3ZSiEpdmpuEDN4obipeI1BZENTbc-5z00dXUiBLdRFrVanokeiP0tYxA24od31QJUhyHrEjUOL8hVd2Br3WYd9qMi9hrburKyarkIKRceSj0WCc-CR_Sqa8ZyAodCnRAwHd8232wWqAiGRvbqIblaSFdqe0S4P5RJVanthTYykcfa70COuxe1yzOcOJ--YHVGeJE-MGJ9_dF_6rXkxj6T32mMAEsEeJxSyEw80u0UTez7aJe4WCvkngOndyTu3NXmPCa5zVsuq9FE2dA_tcpSa_lMIXWQ0AUPed6FvktJtK2mk-QAde5rubfpSoISbKhkEZ85qAwncCJGR-Wxq96ZNbPadUooy4EmnPjkLMFtVf8g6CfklHyP4I9Aw86d0Rm_zReJIiWaL-Ee6riYKTQBj4lnATH3nAfuxnPAytYCePnsIc-yv9WQo0aBd1A6sKQOfl0uVT9_dVZOq__UWKY3HUAAcr3mVdYgTY9XRjRAL1w0qJca71N2wwYnKMdk41CXOv0FYV8npdMngUVZ3NgaUAn6eONyfvPckxGhpP7M6aX_47Np1K39IOHdIBBdzr3Oq-06UbWS4KqHs7mhQ0i6InO-EWmpBo_1rxR5DuHegnaABHw91VFOLtYAo4iKOqBt-fc7xVImnuPQfIbwKA3A5_oK8QCI7JEDLNLCTnqZMNhB4HXS-3ToZTk1YtZTG3CbiiPr76rfrca1WPK4ZaK6dDjl9LBwvY4xqmUP1063mG3FKNR-1GWbYmDf75MztPvP9fr5I_nTZNeDDhYV7_D4WZCPQ3Jys-en0g5Rr8ObtqzrWTWEhPeCWfEoGQ9bcvP0GTTwTlPAyCdXJimXBnIwvI6ZVGXQ8YomOpoCr1Q122",
    requestOptions
  );

  if (!response.ok) {
    return response.text().then((text) => {
      throw new Error(text);
    });
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
        <div className="w-full max-w-md mx-auto">
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
      <div className="max-w-md mx-auto mt-12">
        <ErrorMessage message="Hubo un error al procesar su solicitud. Por favor, intente nuevamente más tarde." />
      </div>
    );
  }
}
