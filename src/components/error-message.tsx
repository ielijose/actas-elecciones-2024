import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>

      <Link href="/">
        <Button className="mt-4 w-full" variant="secondary">
          Volver al inicio
        </Button>
      </Link>
    </>
  );
}
