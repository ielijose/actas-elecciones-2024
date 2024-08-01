import { Metadata } from "next";
import { Storage } from "@google-cloud/storage";

export const metadata: Metadata = {
    title: "Videos | Consulta Actas CNE",
    description: "Lista de videos almacenados en el bucket",
};

const bucketName = process.env.GOOGLE_BUCKET_NAME;
const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

if (!bucketName) {
    throw new Error("Environment variable GOOGLE_BUCKET_NAME is not defined");
}

if (!serviceAccountJson) {
    throw new Error("Environment variable GOOGLE_SERVICE_ACCOUNT_JSON is not defined");
}

const serviceAccount = JSON.parse(serviceAccountJson);

const storage = new Storage({
    projectId: serviceAccount.project_id,
    credentials: {
        client_email: serviceAccount.client_email,
        private_key: serviceAccount.private_key,
    },
});

async function fetchVideos() {
    try {
        if (!bucketName) throw Error("Not bucket name")
        const [files] = await storage.bucket(bucketName).getFiles({ prefix: "videos/" });
        // console.log(files);
        const filesUrls = files.map(file => `https://storage.googleapis.com/${bucketName}/${file.name}`)
        console.log(filesUrls, "URLS");
        
        return filesUrls;
    } catch (err) {
        console.error("Error fetching videos:", err);
        throw new Error("Hubo un error al obtener los videos. Por favor, intente nuevamente más tarde.");
    }
}

export default async function VideosPage() {
    let videos: string[] = [];
    let error: string | null = null;

    try {
        videos = await fetchVideos();
    } catch (err) {
        // @ts-ignore
        error = err.message;
    }

    if (error) {
        return (
            <div className="max-w-md mx-auto mt-12">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <div className="w-full max-w-md mx-auto">
                <h1 className="text-2xl text-center mb-4">Lista de Videos</h1>
                {videos.length === 0 ? (
                    <p>No hay videos disponibles.</p>
                ) : (
                    <ul>
                        {videos.map((videoUrl, index) => (
                            <li key={index} className="mb-4">
                                <video width="500" controls>
                                    <p>{videoUrl}</p>
                                    <source src={videoUrl} type="video/mp4" />
                                    Tu navegador no soporta la etiqueta de video.
                                </video>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </main>
    );
}
