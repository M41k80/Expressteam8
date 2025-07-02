"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HistoryPage() {
  
  const [history, setHistory] = useState([
    {
      id: 1,
      prompt: "Email de bienvenida para nuevos usuarios",
      generated: "¡Hola! Bienvenido a nuestra plataforma...",
      createdAt: "2025-07-01",
    },
    {
      id: 2,
      prompt: "Recordatorio de carrito abandonado",
      generated: "Hola, notamos que olvidaste algo en tu carrito...",
      createdAt: "2025-07-02",
    },
  ]);

  const handleDelete = (id: number) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Historial de Correos Generados</h1>

      {history.length === 0 && (
        <p className="text-muted-foreground">Aún no tienes correos generados.</p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {history.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="text-base">{item.prompt}</CardTitle>
              <p className="text-xs text-muted-foreground">{item.createdAt}</p>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{item.generated}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    navigator.clipboard.writeText(item.generated)
                  }
                >
                  Copiar
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
