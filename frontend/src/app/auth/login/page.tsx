'use client';

import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login({
      id: '123',
      name: name || 'Usuario',
      email,
    });
  };

  return (
    <main>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
          <p className="text-sm text-muted-foreground">
            Ingresa tus datos para continuar
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                placeholder="Juan Pérez"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo</Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-[#4FC3F7] hover:bg-[#29B6F6]">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
    <Footer />
    </main>
    
  );
};

export default LoginForm;
