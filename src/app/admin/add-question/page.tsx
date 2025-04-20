'use client';

import ErrorSuppressor from '@/components/ErrorSuppressor';
import { useAuth } from '@/lib/auth';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminAddQuestion() {
  const { user } = useAuth();
  const router = useRouter();
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

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

  // Carregar categorias do localStorage
  useEffect(() => {
    if (!isClient) return;
    
    try {
      // Carregar categorias padrão
      const defaultCategories = [
        {
          id: 'conhecimentos-gerais',
          title: 'Conhecimentos Gerais',
          description: 'Teste seus conhecimentos sobre diversos assuntos do cotidiano.',
          color: 'blue'
        },
        {
          id: 'ciencias',
          title: 'Ciências',
          description: 'Desafie-se com perguntas sobre biologia, química, física e astronomia.',
          color: 'green'
        },
        {
          id: 'historia',
          title: 'História',
          description: 'Viaje pelo tempo e teste seus conhecimentos sobre eventos históricos importantes.',
          color: 'yellow'
        },
        {
          id: 'geografia',
          title: 'Geografia',
          description: 'Explore o mundo e teste seus conhecimentos sobre países, capitais e geografia mundial.',
          color: 'purple'
        },
        {
          id: 'entretenimento',
          title: 'Entretenimento',
          description: 'Perguntas sobre filmes, séries, música e cultura pop.',
          color: 'pink'
        },
        {
          id: 'esportes',
          title: 'Esportes',
          description: 'Teste seus conhecimentos sobre diversos esportes e competições.',
          color: 'red'
        }
      ];
      
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

  // Atualizar opção
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // Manipular seleção de categoria
  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  // Manipular upload de imagem
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      
      // Criar preview da imagem
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remover imagem
  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    if (document.getElementById('image-upload')) {
      (document.getElementById('image-upload') as HTMLInputElement).value = '';
    }
  };

  // Adicionar nova pergunta
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validação básica
    if (!questionText.trim()) {
      setError('O texto da pergunta é obrigatório.');
      setIsLoading(false);
      return;
    }

    if (options.some(option => !option.trim())) {
      setError('Todas as opções devem ser preenchidas.');
      setIsLoading(false);
      return;
    }

    if (selectedCategories.length === 0) {
      setError('Selecione pelo menos uma categoria para a pergunta.');
      setIsLoading(false);
      return;
    }

    try {
      // Processar imagem se existir
      let imageUrl = null;
      if (image) {
        const reader = new FileReader();
        imageUrl = await new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(image);
        });
        
        // Salvar no localStorage para persistência
        const storedImages = localStorage.getItem('questionImages');
        const images = storedImages ? JSON.parse(storedImages) : {};
        const imageId = `img-${Date.now()}`;
        images[imageId] = imageUrl;
        localStorage.setItem('questionImages', JSON.stringify(images));
      }

      // Criar nova pergunta
      const newQuestion = {
        id: `custom-${Date.now()}`,
        text: questionText,
        options: options,
        correctOptionIndex: correctOptionIndex,
        category: selectedCategories.length === 1 ? selectedCategories[0] : selectedCategories,
        ...(imageUrl && { imageUrl })
      };

      // Salvar no localStorage
      const storedQuestions = localStorage.getItem('adminQuestions');
      const adminQuestions = storedQuestions ? JSON.parse(storedQuestions) : [];
      adminQuestions.push(newQuestion);
      localStorage.setItem('adminQuestions', JSON.stringify(adminQuestions));

      // Redirecionar para o dashboard
      router.push('/dashboard');
    } catch (err) {
      setError('Ocorreu um erro ao salvar a pergunta. Tente novamente.');
      console.error(err);
      setIsLoading(false);
    }
  };

  // Função para obter classes de cor seguras
  const getColorClass = (colorName, type) => {
    const colorMap = {
      'blue': { border: 'border-blue-600', bg: 'bg-blue-50' },
      'green': { border: 'border-green-600', bg: 'bg-green-50' },
      'red': { border: 'border-red-600', bg: 'bg-red-50' },
      'yellow': { border: 'border-yellow-600', bg: 'bg-yellow-50' },
      'purple': { border: 'border-purple-600', bg: 'bg-purple-50' },
      'pink': { border: 'border-pink-600', bg: 'bg-pink-50' },
      'indigo': { border: 'border-indigo-600', bg: 'bg-indigo-50' },
      'orange': { border: 'border-orange-600', bg: 'bg-orange-50' }
    };
    
    return colorMap[colorName]?.[type] || colorMap['blue'][type];
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Componente para suprimir erros de console */}
      <ErrorSuppressor />
      
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">eQuizz - Adicionar Pergunta</h1>
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
          <h2 className="text-2xl font-bold mb-6">Nova Pergunta</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categorias
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {allCategories.map((category) => (
                  <div 
                    key={category.id}
                    onClick={() => handleCategoryToggle(category.id)}
                    className={`cursor-pointer p-3 rounded-md border-2 ${
                      selectedCategories.includes(category.id) 
                        ? `${getColorClass(category.color, 'border')} ${getColorClass(category.color, 'bg')}` 
                        : 'border-gray-200'
                    }`}
                  >
                    <p className="text-sm font-medium">{category.title}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Selecione uma ou mais categorias para esta pergunta
              </p>
            </div>
            
            <div>
              <label htmlFor="questionText" className="block text-sm font-medium text-gray-700 mb-1">
                Texto da Pergunta
              </label>
              <textarea
                id="questionText"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Qual é a capital do Brasil?"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Imagem da Pergunta (opcional)
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300"
                >
                  Selecionar Imagem
                </label>
                {image && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="ml-3 text-red-600 hover:text-red-800"
                  >
                    Remover
                  </button>
                )}
              </div>
              
              {imagePreview && (
                <div className="mt-3">
                  <div 
                    className="rounded-md bg-center bg-no-repeat bg-contain"
                    style={{ 
                      backgroundImage: `url(${imagePreview})`,
                      width: '100%',
                      height: '200px'
                    }}
                    aria-label="Preview da imagem"
                  ></div>
                </div>
              )}
            </div>
            
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-3">Opções</p>
              {options.map((option, index) => (
                <div key={index} className="flex items-center mb-3">
                  <input
                    type="radio"
                    id={`correct-${index}`}
                    name="correct-option"
                    checked={correctOptionIndex === index}
                    onChange={() => setCorrectOptionIndex(index)}
                    className="mr-2"
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Opção ${String.fromCharCode(65 + index)}`}
                  />
                </div>
              ))}
              <p className="text-sm text-gray-500">Selecione o botão ao lado da opção correta.</p>
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
                {isLoading ? 'Salvando...' : 'Salvar Pergunta'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
