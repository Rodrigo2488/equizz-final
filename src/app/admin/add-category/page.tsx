'use client';

import { useState } from 'react';
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

  // Verificar se o usuário é administrador
  const isAdmin = user?.isAdmin === true;
  
  // Redirecionar se não for administrador
  if (!user || !isAdmin) {
    router.push('/dashboard');
    return null;
  }

  // Cores disponíveis
  const availableColors = [
    { name: 'Azul', value: 'blue' },
    { name: 'Verde', value: 'green' },
    { name: 'Roxo', value: 'purple' },
    { name: 'Vermelho', value: 'red' },
    { name: 'Amarelo', value: 'yellow' },
    { name: 'Indigo', value: 'indigo' },
    { name: 'Rosa', value: 'pink' },
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

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">eQuizz - Adicionar Categoria</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </header>
      
      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6">Nova Categoria</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Título da Categoria
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Geografia"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Teste seus conhecimentos sobre países, capitais e geografia mundial!"
              />
            </div>
            
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                Cor da Categoria
              </label>
              <div className="grid grid-cols-4 gap-3">
                {availableColors.map((colorOption) => (
                  <div 
                    key={colorOption.value}
                    onClick={() => setColor(colorOption.value)}
                    className={`cursor-pointer p-3 rounded-md border-2 ${
                      color === colorOption.value 
                        ? `border-${colorOption.value}-600 bg-${colorOption.value}-50` 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className={`h-6 w-full rounded bg-${colorOption.value}-600 mb-1`}></div>
                    <p className="text-xs text-center">{colorOption.name}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {error && (
              <div className="rounded-md bg-red-50 p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="px-4 py-2 border border-gray-300 rounded-md mr-3 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
              >
                {isLoading ? 'Salvando...' : 'Salvar Categoria'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
