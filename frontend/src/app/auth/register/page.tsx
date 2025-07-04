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

const RegisterForm = () => {
  const { register } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: '' });
  };

  const validate = () => {
    const newErrors = {
      username: '',
      password: '',
      confirmPassword: '',
    };

    if (!formData.username.trim()) newErrors.username = 'El nombre de usuario es obligatorio.';
    if (!formData.password) newErrors.password = 'La contraseña es obligatoria.';
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Debe repetir la contraseña.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validate()) return;

    setLoading(true);
    try {

      await register(formData.username, formData.password);
      router.push('/dashboard'); 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Error al registrarse.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-muted">
      <Header />
      <div className="flex-1 flex justify-center items-center px-4 py-12">
        <Card className="w-full max-w-xs shadow-xl bg-background">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl">Registrarse</CardTitle>
            <p className="text-sm text-muted-foreground">Crea tu cuenta</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <Label htmlFor="username">Usuario</Label>
                <Input
                  id="username"
                  placeholder="Ej. m41k80"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirmPassword">Repetir contraseña</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-[#4FC3F7] hover:bg-[#29B6F6]"
                disabled={loading}
              >
                {loading ? 'Cargando...' : 'Registrarse'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </main>
  );
};

export default RegisterForm;
