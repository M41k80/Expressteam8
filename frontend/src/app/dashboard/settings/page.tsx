"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    newsletter: true,
    productUpdates: false,
  });

  return (
    <section className="max-w-2xl mx-auto py-12 px-4 space-y-10">
      <h1 className="text-3xl font-bold">Configuración de Cuenta</h1>

      {/* Avatar */}
      <div className="space-y-2">
        <Label>Foto de Perfil</Label>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
          <Button variant="outline">Cambiar Imagen</Button>
        </div>
      </div>

      {/* Información de Cuenta */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" type="text" placeholder="Tu nombre" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="tucorreo@ejemplo.com" />
        </div>
      </div>

      {/* Contraseña */}
      <div className="space-y-4">
        <Label htmlFor="password">Nueva Contraseña</Label>
        <Input id="password" type="password" placeholder="********" />
      </div>

      {/* Preferencias de Notificaciones */}
      <div className="space-y-2">
        <Label>Notificaciones</Label>
        <div className="flex items-center justify-between py-2">
          <span>Recibir newsletter</span>
          <Switch
            checked={notifications.newsletter}
            onCheckedChange={(checked) =>
              setNotifications({ ...notifications, newsletter: checked })
            }
          />
        </div>
        <div className="flex items-center justify-between py-2">
          <span>Actualizaciones de producto</span>
          <Switch
            checked={notifications.productUpdates}
            onCheckedChange={(checked) =>
              setNotifications({ ...notifications, productUpdates: checked })
            }
          />
        </div>
      </div>

      {/* Idioma */}
      <div className="space-y-2">
        <Label>Idioma</Label>
        <Select defaultValue="es">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona un idioma" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="en">English</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Plan Actual */}
      <div className="space-y-2">
        <Label>Plan Actual</Label>
        <div className="p-4 rounded border bg-muted/50">
          <p className="font-semibold">Pro</p>
          <p className="text-muted-foreground">5,000 emails/mes</p>
        </div>
      </div>

      {/* Botón Guardar */}
      <Button className="bg-[#4FC3F7] hover:bg-[#29B6F6]">Guardar Cambios</Button>
    </section>
  );
}
