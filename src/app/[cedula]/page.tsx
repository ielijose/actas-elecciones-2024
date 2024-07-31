import ErrorMessage from "@/components/error-message";
import { QueryForm } from "@/components/query-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CIQueryResponse } from "@/types/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCIData } from "@/lib/getCIData";
import {VideoForm} from "@/components/videoForm";

export const metadata: Metadata = {
  title: "Resultado | Consulta Actas CNE",
  description: "Informacion de Centros y mesas de votacion",
};

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
                </div>
              )}
            </AlertDescription>
          </Alert>
          {cedula && <VideoForm cedula={cedula} />}
        </div>
      </main>
    );
  } catch (error) {
    console.log(error);

    return (
      <div className="max-w-md mx-auto mt-12">
        <ErrorMessage message="Hubo un error al procesar su solicitud. Por favor, intente nuevamente más tarde." />
      </div>
    );
  }
}
