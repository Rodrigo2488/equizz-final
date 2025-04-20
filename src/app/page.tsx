'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // Se o usuário estiver autenticado, redireciona para o dashboard
    // Caso contrário, redireciona para a página de login
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [user, router]);

  return null;
}
