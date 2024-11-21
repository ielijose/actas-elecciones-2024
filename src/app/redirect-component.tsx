"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

export default function RedirectComponent() {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          router.push("https://macedoniadelnorte.com/");
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <Card className="w-[400px] bg-white/90">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          ¡Gracias!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center mb-4">
          Estás siendo redirigido a Macedonia del Norte.
        </p>
        <Progress value={(5 - countdown) * 20} className="w-full" />
        <p className="text-center mt-2">
          Redirigiendo en {countdown} segundos...
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={() => router.push("https://macedoniadelnorte.com/")}>
          Ir ahora
        </Button>
      </CardFooter>
    </Card>
  );
}
