"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useDashboard } from "@/app/context/DashboardContext";
import { Loader2, Mail, ClipboardCopy, Eye, StarsIcon } from "lucide-react";

export default function DashboardHome() {
  const { generateEmail, generatedEmail, isLoading } = useDashboard();
  const [prompt, setPrompt] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerate = () => {
    if (prompt.trim()) {
      generateEmail(prompt);
    }
  };

  const handleCopy = () => {
    if (generatedEmail) {
      navigator.clipboard.writeText(
        `${generatedEmail.subject}\n\n${generatedEmail.body}`
      );
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          <StarsIcon className="inline-block mr-2 h-8 w-8 text-yellow-500" />
          Generador de Correos AI 
        </h1>
        <p className="text-muted-foreground">
          Describe lo que necesitas y genera un correo listo para enviar.
        </p>
      </div>

      <Textarea
        placeholder="Ej: Quiero un correo promocionando el nuevo producto de la tienda con 20% de descuento."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="min-h-[120px]"
      />

      <Button
        onClick={handleGenerate}
        disabled={isLoading || !prompt.trim()}
        className="flex items-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Generando...
          </>
        ) : (
          <>
            <Mail className="h-4 w-4" />
            Generar Email
          </>
        )}
      </Button>

      {generatedEmail && (
        <div className="border rounded-lg p-5 bg-muted/40 space-y-4">
          <h2 className="text-xl font-semibold">📬 Correo Generado</h2>
          <div className="space-y-2">
            <p className="text-muted-foreground">
              <strong>Asunto:</strong> {generatedEmail.subject}
            </p>
            <div className="border rounded bg-background p-3 whitespace-pre-wrap">
              {generatedEmail.body}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleCopy}
              className="flex items-center gap-2"
            >
              <ClipboardCopy className="h-4 w-4" />
              Copiar
            </Button>

            <Dialog open={showPreview} onOpenChange={setShowPreview}>
              <DialogTrigger asChild>
                <Button variant="secondary" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Vista previa
                </Button>
              </DialogTrigger>
              <DialogContent>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Vista previa del correo
                  </h3>
                  <div className="p-4 border rounded bg-white dark:bg-zinc-900 space-y-2">
                    <p className="text-lg font-bold">
                      {generatedEmail.subject}
                    </p>
                    <hr />
                    <p className="whitespace-pre-wrap">{generatedEmail.body}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
}
