"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboard } from "@/app/context/DashboardContext";

type EmailHistoryItem = {
  id: number;
  prompt: string;
  generatedSubject: string;
  generatedBody: string;
  timestamp: string;
};

export default function HistoryPage() {
  const { isLoading } = useDashboard();
  const [localHistory, setLocalHistory] = useState<EmailHistoryItem[]>([]);

  useEffect(() => {
    // ✅ Datos de ejemplo - correos de marketing
    const exampleData: EmailHistoryItem[] = [
      {
        id: 1,
        prompt: "Promoción de lanzamiento de nuevo producto",
        generatedSubject: "¡Nuevo Producto Exclusivo Ya Disponible!",
        generatedBody:
          "Conoce nuestra última innovación y sé de los primeros en probarla. ¡Haz tu pedido ahora con un 20% de descuento!",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 2,
        prompt: "Email de recuperación de carrito abandonado",
        generatedSubject: "¿Olvidaste algo en tu carrito?",
        generatedBody:
          "Tu selección sigue disponible. Finaliza tu compra ahora y recibe envío gratis por tiempo limitado.",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 3,
        prompt: "Campaña de Black Friday",
        generatedSubject: "🔥 Black Friday: Hasta 50% OFF solo por hoy",
        generatedBody:
          "Aprovecha nuestras ofertas más grandes del año. ¡Descuentos en toda la tienda solo por 24 horas!",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 4,
        prompt: "Invitación a programa de referidos",
        generatedSubject: "Invita a tus amigos y gana recompensas 🎁",
        generatedBody:
          "Comparte tu código único y gana hasta $100 por cada amigo que compre. ¡Es fácil y rápido!",
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 5,
        prompt: "Newsletter mensual con novedades",
        generatedSubject: "Novedades de este mes: Nuevas funciones y más",
        generatedBody:
          "Descubre las últimas actualizaciones de nuestra plataforma, historias de clientes y recursos gratuitos para ti.",
        timestamp: new Date().toISOString(),
      },
    ];

    // ⬇️ Activa esta línea si no tienes backend aún
    setLocalHistory(exampleData);

    // ⬇️ Y comenta esta cuando ya tengas backend funcional
    // loadHistory();
  }, []);

  const handleDelete = (id: number) => {
    setLocalHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Historial de Correos de Marketing</h1>

      {isLoading && <p>Cargando...</p>}

      {localHistory.length === 0 && !isLoading && (
        <p className="text-muted-foreground">Aún no tienes correos generados.</p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {localHistory.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="text-base">{item.prompt}</CardTitle>
              <p className="text-xs text-muted-foreground">
                {new Date(item.timestamp).toLocaleString()}
              </p>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold">{item.generatedSubject}</h3>
              <p className="mb-4">{item.generatedBody}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    navigator.clipboard.writeText(`${item.generatedSubject}\n\n${item.generatedBody}`)
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