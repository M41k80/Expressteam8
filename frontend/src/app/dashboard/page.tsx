"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";


export default function DashboardHome() {
  const [prompt, setPrompt] = useState("");
  const [generated, setGenerated] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerate = () => {
    // Aquí llamas a tu API o a OpenAI
    setGenerated(`📧 Ejemplo de correo generado para: "${prompt}"`);
  };

  return (
    
    <div className="space-y-6">
       
      <h1 className="text-2xl font-bold">Generar Email</h1>
      <Textarea
        placeholder="Describe qué correo quieres generar..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button onClick={handleGenerate}>Generar Email</Button>

      {generated && (
        <div className="border p-4 rounded space-y-2 bg-muted/30">
          <h2 className="font-semibold">Correo Generado</h2>
          <p>{generated}</p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigator.clipboard.writeText(generated)}
            >
              Copiar
            </Button>
            <Dialog open={showPreview} onOpenChange={setShowPreview}>
              <DialogTrigger asChild>
                <Button variant="secondary">Envíar</Button>
              </DialogTrigger>
              <DialogContent>
                <h3 className="text-lg font-semibold mb-2">Vista previa del correo</h3>
                <div className="p-2 border rounded bg-background">
                  {generated}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
}
