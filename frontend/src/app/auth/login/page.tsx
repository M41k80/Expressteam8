'use client';

import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';

const LoginForm = () => {
  const { login } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      router.push('/dashboard'); 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-muted px-4">
        <Card className="w-full max-w-xs shadow-xl">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
            <p className="text-sm text-muted-foreground">
              Ingresa tus datos para continuar
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username">Usuario</Label>
                <Input
                  id="username"
                  placeholder="m41k80"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-[#4FC3F7] hover:bg-[#29B6F6]"
                disabled={loading}
              >
                {loading ? 'Cargando...' : 'Entrar'}
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
