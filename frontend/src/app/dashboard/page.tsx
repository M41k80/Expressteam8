"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useDashboard } from "@/app/context/DashboardContext";

export default function DashboardHome() {
  const { generateEmail, generatedEmail, isLoading } = useDashboard();
  const [prompt, setPrompt] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerate = () => {
    if (prompt.trim()) {
      generateEmail(prompt);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Generar Email</h1>
      <Textarea
        placeholder="Describe qué correo quieres generar..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button onClick={handleGenerate} disabled={isLoading}>
        {isLoading ? "Generando..." : "Generar Email"}
      </Button>

      {generatedEmail && (
        <div className="border p-4 rounded space-y-2 bg-muted/30">
          <h2 className="font-semibold">Correo Generado</h2>
          <p>
            <strong>Asunto:</strong> {generatedEmail.subject}
          </p>
          <p>
            <strong>Cuerpo:</strong>
          </p>
          <p>{generatedEmail.body}</p>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() =>
                navigator.clipboard.writeText(`${generatedEmail.subject}\n\n${generatedEmail.body}`)
              }
            >
              Copiar
            </Button>
            <Dialog open={showPreview} onOpenChange={setShowPreview}>
              <DialogTrigger asChild>
                <Button variant="secondary">Vista previa</Button>
              </DialogTrigger>
              <DialogContent>
                <h3 className="text-lg font-semibold mb-2">Vista previa del correo</h3>
                <div className="p-2 border rounded bg-background space-y-2">
                  <p><strong>{generatedEmail.subject}</strong></p>
                  <p>{generatedEmail.body}</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
}