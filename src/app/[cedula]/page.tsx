// app/[cedula]/page.tsx
import { kv } from "@vercel/kv";
import { notFound } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CIQueryResponse } from "@/types/types";
import { QueryForm } from "@/components/query-form";
import { CACHE_EXPIRATION } from "@/constants";
import Image from "next/image";

async function getCIData(cedula: string): Promise<CIQueryResponse> {
  const cacheKey = `v:${cedula}`;

  // Check cache first
  const cachedData = await kv.get(cacheKey);
  if (cachedData) {
    return cachedData as CIQueryResponse;
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
  await kv.set(cacheKey, data, { ex: CACHE_EXPIRATION });

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

    if (!queryResult.Success) {
      notFound();
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
                    <strong>Acta:</strong> {acta.serial}
                  </p>
                  <p>
                    <strong>URL:</strong>{" "}
                    <a
                      href={acta.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {acta.url}
                    </a>
                  </p>
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
    notFound();
  }
}
