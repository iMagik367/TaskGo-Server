"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Erro ao carregar dados</h2>
            <p className="text-gray-600 mb-4">
              {error.message || "Ocorreu um erro ao tentar carregar os dados."}
            </p>
            <Button onClick={reset}>Tentar novamente</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}