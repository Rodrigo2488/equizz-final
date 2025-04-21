'use client';

import ErrorSuppressor from '@/components/ErrorSuppressor';
import { useAuth } from '@/lib/auth';
import { categories, initializeDefaultData } from '@/lib/quiz-data';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [isClient, setIsClient] = useState(false);
  const [adminCategories, setAdminCategories] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  // Marcar que estamos no cliente
  useEffect(() => {
    setIsClient(true);
    
    // Inicializar dados padrão
    initializeDefaultData();
  }, []);

  // Carregar categorias adicionadas pelo administrador
  useEffect(() => {
    if (!isClient) return;
    
    try {
      const storedCategories = localStorage.getItem('adminCategories');
      if (storedCategories) {
        setAdminCategories(JSON.parse(storedCategories));
      }
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  }, [isClient]);

  // Filtrar categorias com base no termo de pesquisa
  useEffect(() => {
    if (!isClient) return;
    
    const allCategories = [...categories, ...adminCategories];
    
    if (!searchTerm.trim()) {
      setFilteredCategories(allCategories);
      return;
    }
    
    const filtered = allCategories.filter(category => 
      category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredCategories(filtered);
  }, [searchTerm, adminCategories, isClient]);

  // Verificar se o usuário está autenticado
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  // Função para obter classes de cor seguras
  const getColorClass = (colorName, type) => {
    const colorMap = {
      'blue': { bg: 'bg-blue-600', hover: 'hover:bg-blue-700', light: 'bg-blue-100', text: 'text-blue-800' },
      'green': { bg: 'bg-green-600', hover: 'hover:bg-green-700', light: 'bg-green-100', text: 'text-green-800' },
      'red': { bg: 'bg-red-600', hover: 'hover:bg-red-700', light: 'bg-red-100', text: 'text-red-800' },
      'yellow': { bg: 'bg-yellow-600', hover: 'hover:bg-yellow-700', light: 'bg-yellow-100', text: 'text-yellow-800' },
      'purple': { bg: 'bg-purple-600', hover: 'hover:bg-purple-700', light: 'bg-purple-100', text: 'text-purple-800' },
      'pink': { bg: 'bg-pink-600', hover: 'hover:bg-pink-700', light: 'bg-pink-100', text: 'text-pink-800' },
      'indigo': { bg: 'bg-indigo-600', hover: 'hover:bg-indigo-700', light: 'bg-indigo-100', text: 'text-indigo-800' },
      'orange': { bg: 'bg-orange-600', hover: 'hover:bg-orange-700', light: 'bg-orange-100', text: 'text-orange-800' }
    };
    
    return colorMap[colorName]?.[type] || colorMap['blue'][type];
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Componente para suprimir erros de console */}
      <ErrorSuppressor />
      
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">eQuizz</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Olá, {user.name}</span>
            <button
              onClick={logout}
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Sair
            </button>
          </div>
        </div>
      </header>
      
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Bem-vindo ao eQuizz!</h2>
          <p className="text-gray-600">
            Escolha uma categoria abaixo para começar um quiz ou use a barra de pesquisa para encontrar um tema específico.
          </p>
        </div>
        
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar quiz por categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute right-3 top-3 h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className={`${getColorClass(category.color, 'bg')} h-2`}></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <button
                  onClick={() => router.push(`/quiz/${category.id}`)}
                  className={`px-4 py-2 ${getColorClass(category.color, 'bg')} ${getColorClass(category.color, 'hover')} text-white rounded-md transition-colors`}
                >
                  Iniciar Quiz
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Botão flutuante para administradores */}
        {user.isAdmin && (
          <div className="fixed bottom-8 right-8">
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
              
              {/* Menu de opções */}
              {showMenu && (
                <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg overflow-hidden w-64">
                 <a
  href="/admin/add-category"
  className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center block"
>
  <svg className="w-5 h-5 mr-2 text-blue-600">...</svg>
  Adicionar nova categoria
</a>

<a
  href="/admin/add-question"
  className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center block"
>
  <svg className="w-5 h-5 mr-2 text-green-600">...</svg>
  Adicionar nova pergunta
</a>

<a
  href="/admin/edit-categories"
  className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center block"
>
  <svg className="w-5 h-5 mr-2 text-yellow-600">...</svg>
  Editar categorias
</a>

<a
  href="/admin/edit-questions"
  className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center block"
>
  <svg className="w-5 h-5 mr-2 text-purple-600">...</svg>
  Editar perguntas
</a>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
