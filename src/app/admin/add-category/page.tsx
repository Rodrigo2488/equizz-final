'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { categories } from '@/lib/quiz-data';

export default function AddCategory() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('blue');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Marcar que estamos no cliente e verificar autenticação
  useEffect(() => {
    setIsClient(true);
    
    // Verificar se o usuário é administrador
    if (user) {
      const isAdmin = user.isAdmin === true;
      if (!isAdmin) {
        router.push('/dashboard');
      }
    } else {
      router.push('/dashboard');
    }
  }, [user, router]);

  // Cores disponíveis
  const availableColors = [
    { name: 'Azul', value: 'blue' },
    { name: 'Verde', value: 'green' },
    { name: 'Vermelho', value: 'red' },
    { name: 'Amarelo', value: 'yellow' },
    { name: 'Roxo', value: 'purple' },
    { name: 'Rosa', value: 'pink' },
    { name: 'Índigo', value: 'indigo' },
    { name: 'Laranja', value: 'orange' }
  ];

  // Adicionar nova categoria
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validação básica
    if (!title.trim()) {
      setError('O título da categoria é obrigatório.');
      setIsLoading(false);
      return;
    }

    if (!description.trim()) {
      setError('A descrição da categoria é obrigatória.');
      setIsLoading(false);
      return;
    }

    // Verificar se já existe uma categoria com o mesmo título
    const categoryExists = categories.some(
      cat => cat.title.toLowerCase() === title.toLowerCase()
    );

    if (categoryExists) {
      setError('Já existe uma categoria com este título.');
      setIsLoading(false);
      return;
    }

    // Criar ID a partir do título (slug)
    const id = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');

    // Criar nova categoria
    const newCategory = {
      id,
      title,
      description,
      color
    };

    // Salvar no localStorage
    const storedCategories = localStorage.getItem('adminCategories');
    const adminCategories = storedCategories ? JSON.parse(storedCategories) : [];
    adminCategories.push(newCategory);
    localStorage.setItem('adminCategories', JSON.stringify(adminCategories));

    // Redirecionar para o dashboard
    router.push('/dashboard');
  };

  // Função para voltar ao dashboard
  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

  // Mostrar tela de carregamento enquanto verificamos a autenticação
  if (!isClient || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  // Verificar se o usuário é administrador
  const isAdmin = user.isAdmin === true;
  
  // Se não for administrador, não renderizar o conteúdo (o redirecionamento já foi iniciado no useEffect)
  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">eQuizz - Adicionar Categoria</h1>
          <button 
            onClick={handleBackToDashboard}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Voltar ao Dashboard
          </button>
        </div>

        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-6 text-center">Adicionar Categoria</h2>
          
          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-300 p-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-gray-300 mb-2">Título</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                placeholder="Título da categoria"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-gray-300 mb-2">Descrição</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                placeholder="Descrição da categoria"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Cor</label>
              <div className="grid grid-cols-4 gap-2">
                <div 
                  onClick={() => setColor('blue')}
                  className={`h-12 bg-blue-600 rounded cursor-pointer ${color === 'blue' ? 'ring-2 ring-white' : ''}`}
                />
                <div 
                  onClick={() => setColor('green')}
                  className={`h-12 bg-green-600 rounded cursor-pointer ${color === 'green' ? 'ring-2 ring-white' : ''}`}
                />
                <div 
                  onClick={() => setColor('red')}
                  className={`h-12 bg-red-600 rounded cursor-pointer ${color === 'red' ? 'ring-2 ring-white' : ''}`}
                />
                <div 
                  onClick={() => setColor('yellow')}
                  className={`h-12 bg-yellow-600 rounded cursor-pointer ${color === 'yellow' ? 'ring-2 ring-white' : ''}`}
                />
                <div 
                  onClick={() => setColor('purple')}
                  className={`h-12 bg-purple-600 rounded cursor-pointer ${color === 'purple' ? 'ring-2 ring-white' : ''}`}
                />
                <div 
                  onClick={() => setColor('pink')}
                  className={`h-12 bg-pink-600 rounded cursor-pointer ${color === 'pink' ? 'ring-2 ring-white' : ''}`}
                />
                <div 
                  onClick={() => setColor('indigo')}
                  className={`h-12 bg-indigo-600 rounded cursor-pointer ${color === 'indigo' ? 'ring-2 ring-white' : ''}`}
                />
                <div 
                  onClick={() => setColor('orange')}
                  className={`h-12 bg-orange-600 rounded cursor-pointer ${color === 'orange' ? 'ring-2 ring-white' : ''}`}
                />
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50"
              >
                {isLoading ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
