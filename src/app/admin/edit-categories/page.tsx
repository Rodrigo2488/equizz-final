'use client';

import ErrorSuppressor from '@/components/ErrorSuppressor';
import { useAuth } from '@/lib/auth';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { categories, getAllQuestionsForCategory, updateCategory, deleteCategory } from '@/lib/quiz-data';

export default function AdminEditCategories() {
  const { user } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    color: 'blue'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Marcar que estamos no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Verificar se o usuário é administrador
  useEffect(() => {
    if (!isClient) return;
    
    try {
      if (!user) {
        router.push('/login');
        return;
      }
      
      if (!user.isAdmin) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error("Erro ao verificar permissões:", error);
      router.push('/dashboard');
    }
  }, [isClient, router, user]);

  // Carregar categorias
  useEffect(() => {
    if (!isClient) return;
    
    try {
      // Carregar categorias padrão
      const defaultCategories = [...categories];
      
      // Carregar categorias adicionadas pelo administrador
      const storedCategories = localStorage.getItem('adminCategories');
      const adminCategories = storedCategories ? JSON.parse(storedCategories) : [];
      
      // Combinar categorias padrão com as adicionadas pelo administrador
      setAllCategories([...defaultCategories, ...adminCategories]);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
      setAllCategories([]);
    }
  }, [isClient]);

  // Selecionar categoria para edição
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setEditForm({
      title: category.title,
      description: category.description,
      color: category.color
    });
    setError('');
    setSuccess('');
  };

  // Atualizar campo do formulário
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Salvar alterações
  const handleSaveChanges = () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validação básica
      if (!editForm.title.trim()) {
        setError('O título da categoria é obrigatório.');
        setIsLoading(false);
        return;
      }

      if (!editForm.description.trim()) {
        setError('A descrição da categoria é obrigatória.');
        setIsLoading(false);
        return;
      }

      // Verificar se é uma categoria padrão
      const isDefaultCategory = categories.some(c => c.id === selectedCategory.id);
      
      if (isDefaultCategory) {
        setError('Não é possível editar categorias padrão do sistema.');
        setIsLoading(false);
        return;
      }

      // Atualizar categoria
      const success = updateCategory(selectedCategory.id, {
        title: editForm.title,
        description: editForm.description,
        color: editForm.color
      });

      if (success) {
        // Atualizar lista de categorias
        const storedCategories = localStorage.getItem('adminCategories');
        const adminCategories = storedCategories ? JSON.parse(storedCategories) : [];
        
        setAllCategories([...categories, ...adminCategories]);
        
        // Atualizar categoria selecionada
        const updatedCategory = {
          ...selectedCategory,
          title: editForm.title,
          description: editForm.description,
          color: editForm.color
        };
        
        setSelectedCategory(updatedCategory);
        setSuccess('Categoria atualizada com sucesso!');
      } else {
        setError('Ocorreu um erro ao atualizar a categoria.');
      }
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      setError('Ocorreu um erro ao salvar as alterações.');
    } finally {
      setIsLoading(false);
    }
  };

  // Excluir categoria
  const handleDeleteCategory = () => {
    if (!confirm('Tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita.')) {
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Verificar se é uma categoria padrão
      const isDefaultCategory = categories.some(c => c.id === selectedCategory.id);
      
      if (isDefaultCategory) {
        setError('Não é possível excluir categorias padrão do sistema.');
        setIsLoading(false);
        return;
      }

      // Excluir categoria
      const success = deleteCategory(selectedCategory.id);

      if (success) {
        // Atualizar lista de categorias
        const storedCategories = localStorage.getItem('adminCategories');
        const adminCategories = storedCategories ? JSON.parse(storedCategories) : [];
        
        setAllCategories([...categories, ...adminCategories]);
        
        // Limpar seleção
        setSelectedCategory(null);
        setEditForm({
          title: '',
          description: '',
          color: 'blue'
        });
        
        setSuccess('Categoria excluída com sucesso!');
      } else {
        setError('Ocorreu um erro ao excluir a categoria.');
      }
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
      setError('Ocorreu um erro ao excluir a categoria.');
    } finally {
      setIsLoading(false);
    }
  };

  // Renderização do lado do servidor ou quando está carregando
  if (!isClient || !user || !user.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700">Carregando...</p>
        </div>
      </div>
    );
  }

  // Função para obter classes de cor seguras
  const getColorClass = (colorName, type) => {
    const colorMap = {
      'blue': { bg: 'bg-blue-600', hover: 'hover:bg-blue-700', light: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-600' },
      'green': { bg: 'bg-green-600', hover: 'hover:bg-green-700', light: 'bg-green-100', text: 'text-green-800', border: 'border-green-600' },
      'red': { bg: 'bg-red-600', hover: 'hover:bg-red-700', light: 'bg-red-100', text: 'text-red-800', border: 'border-red-600' },
      'yellow': { bg: 'bg-yellow-600', hover: 'hover:bg-yellow-700', light: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-600' },
      'purple': { bg: 'bg-purple-600', hover: 'hover:bg-purple-700', light: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-600' },
      'pink': { bg: 'bg-pink-600', hover: 'hover:bg-pink-700', light: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-600' },
      'indigo': { bg: 'bg-indigo-600', hover: 'hover:bg-indigo-700', light: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-600' },
      'orange': { bg: 'bg-orange-600', hover: 'hover:bg-orange-700', light: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-600' }
    };
    
    return colorMap[colorName]?.[type] || colorMap['blue'][type];
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Componente para suprimir erros de console */}
      <ErrorSuppressor />
      
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">eQuizz - Editar Categorias</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </header>
      
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Lista de categorias */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Categorias</h2>
            <div className="space-y-2">
              {allCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleSelectCategory(category)}
                  className={`p-3 rounded-md cursor-pointer border-2 ${
                    selectedCategory?.id === category.id
                      ? `${getColorClass(category.color, 'border')} ${getColorClass(category.color, 'light')}`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full ${getColorClass(category.color, 'bg')} mr-2`}></div>
                    <p className="font-medium">{category.title}</p>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                  {categories.some(c => c.id === category.id) && (
                    <p className="text-xs text-gray-400 mt-1 italic">(Categoria padrão do sistema)</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Formulário de edição */}
          <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
            {selectedCategory ? (
              <div>
                <h2 className="text-xl font-bold mb-4">Editar Categoria</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={editForm.title}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: Tecnologia"
                      disabled={categories.some(c => c.id === selectedCategory.id)}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Descrição
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={editForm.description}
                      onChange={handleFormChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: Perguntas sobre tecnologia, gadgets e inovações."
                      disabled={categories.some(c => c.id === selectedCategory.id)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cor
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {['blue', 'green', 'red', 'yellow', 'purple', 'pink', 'indigo', 'orange'].map((color) => (
                        <div
                          key={color}
                          onClick={() => !categories.some(c => c.id === selectedCategory.id) && setEditForm(prev => ({ ...prev, color }))}
                          className={`w-full h-10 rounded-md cursor-pointer ${getColorClass(color, 'bg')} ${
                            editForm.color === color ? 'ring-2 ring-offset-2 ring-gray-500' : ''
                          } ${categories.some(c => c.id === selectedCategory.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {error && (
                    <div className="rounded-md bg-red-50 p-3">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}
                  
                  {success && (
                    <div className="rounded-md bg-green-50 p-3">
                      <p className="text-sm text-green-600">{success}</p>
                    </div>
                  )}
                  
                  <div className="flex justify-end space-x-3">
                    {!categories.some(c => c.id === selectedCategory.id) && (
                      <>
                        <button
                          type="button"
                          onClick={handleDeleteCategory}
                          disabled={isLoading}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-300"
                        >
                          {isLoading ? 'Processando...' : 'Excluir'}
                        </button>
                        
                        <button
                          type="button"
                          onClick={handleSaveChanges}
                          disabled={isLoading}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                        >
                          {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                      </>
                    )}
                    
                    {categories.some(c => c.id === selectedCategory.id) && (
                      <p className="text-sm text-gray-500 italic">As categorias padrão do sistema não podem ser editadas.</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma categoria selecionada</h3>
                <p className="mt-1 text-sm text-gray-500">Selecione uma categoria da lista para editar.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
