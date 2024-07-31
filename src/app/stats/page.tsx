import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto mt-4 lg:mt-12">
      <h1 className="text-3xl text-center mb-8">
        Sección desactivada debido a su uso indebido para generar confusión.
      </h1>

      <p className="text-xl text-center mb-8">
        El sitio web{" "}
        <a
          className="text-blue-500 hover:text-blue-600 transition-colors"
          target="_blank"
          href="https://resultadosconvzla.com/"
        >
          resultadosconvzla.com
        </a>{" "}
        es el sitio web oficial para la consulta de actas recopiladas.
      </p>
      <div className="max-w-2xl mx-auto">
        <Link
          target="_blank"
          href="https://x.com/RoiLopezRivas/status/1818671002458390790"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/RoiLopezRivas.png" alt="" className="w-full" />
        </Link>
      </div>
    </div>
  );
}
