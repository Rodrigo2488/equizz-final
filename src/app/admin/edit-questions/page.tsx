'use client';

import ErrorSuppressor from '@/components/ErrorSuppressor';
import { useAuth } from '@/lib/auth';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { categories, getAllQuestionsForCategory, updateQuestion, deleteQuestion } from '@/lib/quiz-data';

export default function AdminEditQuestions() {
  const { user } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [editForm, setEditForm] = useState({
    text: '',
    options: ['', '', '', ''],
    correctOptionIndex: 0,
    imageUrl: null
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  // Carregar perguntas quando uma categoria é selecionada
  useEffect(() => {
    if (!isClient || !selectedCategory) return;
    
    try {
      const categoryQuestions = getAllQuestionsForCategory(selectedCategory.id);
      setQuestions(categoryQuestions);
      setSelectedQuestion(null);
      setEditForm({
        text: '',
        options: ['', '', '', ''],
        correctOptionIndex: 0,
        imageUrl: null
      });
      setImage(null);
      setImagePreview(null);
      setError('');
      setSuccess('');
    } catch (error) {
      console.error("Erro ao carregar perguntas:", error);
      setQuestions([]);
    }
  }, [isClient, selectedCategory]);

  // Selecionar categoria
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  // Selecionar pergunta para edição
  const handleSelectQuestion = (question) => {
    setSelectedQuestion(question);
    setEditForm({
      text: question.text,
      options: [...question.options],
      correctOptionIndex: question.correctOptionIndex,
      imageUrl: question.imageUrl || null
    });
    setImagePreview(question.imageUrl || null);
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

  // Atualizar opção
  const handleOptionChange = (index, value) => {
    const newOptions = [...editForm.options];
    newOptions[index] = value;
    setEditForm(prev => ({
      ...prev,
      options: newOptions
    }));
  };

  // Manipular upload de imagem
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      
      // Criar preview da imagem
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remover imagem
  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    setEditForm(prev => ({
      ...prev,
      imageUrl: null
    }));
    if (document.getElementById('image-upload')) {
      (document.getElementById('image-upload') as HTMLInputElement).value = '';
    }
  };

  // Salvar alterações
  const handleSaveChanges = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validação básica
      if (!editForm.text.trim()) {
        setError('O texto da pergunta é obrigatório.');
        setIsLoading(false);
        return;
      }

      if (editForm.options.some(option => !option.trim())) {
        setError('Todas as opções devem ser preenchidas.');
        setIsLoading(false);
        return;
      }

      // Processar imagem se existir
      let imageUrl = editForm.imageUrl;
      if (image) {
        const reader = new FileReader();
        imageUrl = await new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result);
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

      // Verificar se é uma pergunta padrão
      const isDefaultQuestion = selectedQuestion.id.startsWith('cg-') || 
                               selectedQuestion.id.startsWith('ci-') || 
                               selectedQuestion.id.startsWith('hi-') || 
                               selectedQuestion.id.startsWith('ge-') || 
                               selectedQuestion.id.startsWith('en-') || 
                               selectedQuestion.id.startsWith('es-');
      
      if (isDefaultQuestion) {
        // Criar uma cópia modificada da pergunta padrão
        const updatedQuestion = {
          text: editForm.text,
          options: editForm.options,
          correctOptionIndex: editForm.correctOptionIndex,
          category: selectedCategory.id,
          ...(imageUrl && { imageUrl })
        };
        
        const success = updateQuestion(selectedQuestion.id, updatedQuestion);
        
        if (success) {
          // Recarregar perguntas
          const categoryQuestions = getAllQuestionsForCategory(selectedCategory.id);
          setQuestions(categoryQuestions);
          
          // Limpar seleção
          setSelectedQuestion(null);
          setEditForm({
            text: '',
            options: ['', '', '', ''],
            correctOptionIndex: 0,
            imageUrl: null
          });
          setImage(null);
          setImagePreview(null);
          
          setSuccess('Pergunta atualizada com sucesso! Uma cópia da pergunta padrão foi criada com suas modificações.');
        } else {
          setError('Ocorreu um erro ao atualizar a pergunta.');
        }
      } else {
        // Atualizar pergunta personalizada
        const updatedQuestion = {
          text: editForm.text,
          options: editForm.options,
          correctOptionIndex: editForm.correctOptionIndex,
          ...(imageUrl && { imageUrl })
        };
        
        const success = updateQuestion(selectedQuestion.id, updatedQuestion);
        
        if (success) {
          // Recarregar perguntas
          const categoryQuestions = getAllQuestionsForCategory(selectedCategory.id);
          setQuestions(categoryQuestions);
          
          // Atualizar pergunta selecionada
          const updatedSelectedQuestion = {
            ...selectedQuestion,
            ...updatedQuestion
          };
          
          setSelectedQuestion(updatedSelectedQuestion);
          setSuccess('Pergunta atualizada com sucesso!');
        } else {
          setError('Ocorreu um erro ao atualizar a pergunta.');
        }
      }
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      setError('Ocorreu um erro ao salvar as alterações.');
    } finally {
      setIsLoading(false);
    }
  };

  // Excluir pergunta
  const handleDeleteQuestion = () => {
    if (!confirm('Tem certeza que deseja excluir esta pergunta? Esta ação não pode ser desfeita.')) {
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Verificar se é uma pergunta padrão
      const isDefaultQuestion = selectedQuestion.id.startsWith('cg-') || 
                               selectedQuestion.id.startsWith('ci-') || 
                               selectedQuestion.id.startsWith('hi-') || 
                               selectedQuestion.id.startsWith('ge-') || 
                               selectedQuestion.id.startsWith('en-') || 
                               selectedQuestion.id.startsWith('es-');
      
      if (isDefaultQuestion) {
        setError('Não é possível excluir perguntas padrão do sistema.');
        setIsLoading(false);
        return;
      }

      // Excluir pergunta
      const success = deleteQuestion(selectedQuestion.id);

      if (success) {
        // Recarregar perguntas
        const categoryQuestions = getAllQuestionsForCategory(selectedCategory.id);
        setQuestions(categoryQuestions);
        
        // Limpar seleção
        setSelectedQuestion(null);
        setEditForm({
          text: '',
          options: ['', '', '', ''],
          correctOptionIndex: 0,
          imageUrl: null
        });
        setImage(null);
        setImagePreview(null);
        
        setSuccess('Pergunta excluída com sucesso!');
      } else {
        setError('Ocorreu um erro ao excluir a pergunta.');
      }
    } catch (error) {
      console.error("Erro ao excluir pergunta:", error);
      setError('Ocorreu um erro ao excluir a pergunta.');
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
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">eQuizz - Editar Perguntas</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </header>
      
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {!selectedCategory ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Selecione uma Categoria</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {allCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleSelectCategory(category)}
                  className={`p-4 rounded-md cursor-pointer border-2 border-gray-200 hover:border-gray-300 ${getColorClass(category.color, 'light')}`}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full ${getColorClass(category.color, 'bg')} mr-2`}></div>
                    <p className="font-medium">{category.title}</p>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Lista de perguntas */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Perguntas</h2>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Voltar às Categorias
                </button>
              </div>
              
              <div className={`p-3 mb-4 rounded-md ${getColorClass(selectedCategory.color, 'light')}`}>
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full ${getColorClass(selectedCategory.color, 'bg')} mr-2`}></div>
                  <p className="font-medium">{selectedCategory.title}</p>
                </div>
              </div>
              
              {questions.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Nenhuma pergunta encontrada nesta categoria.</p>
              ) : (
                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                  {questions.map((question) => (
                    <div
                      key={question.id}
                      onClick={() => handleSelectQuestion(question)}
                      className={`p-3 rounded-md cursor-pointer border ${
                        selectedQuestion?.id === question.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <p className="font-medium line-clamp-2">{question.text}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {question.id.startsWith('cg-') || 
                         question.id.startsWith('ci-') || 
                         question.id.startsWith('hi-') || 
                         question.id.startsWith('ge-') || 
                         question.id.startsWith('en-') || 
                         question.id.startsWith('es-') 
                          ? '(Pergunta padrão do sistema)'
                          : '(Pergunta personalizada)'}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Formulário de edição */}
            <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
              {selectedQuestion ? (
                <div>
                  <h2 className="text-xl font-bold mb-4">Editar Pergunta</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
                        Texto da Pergunta
                      </label>
                      <textarea
                        id="text"
                        name="text"
                        value={editForm.text}
                        onChange={handleFormChange}
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
                          {imagePreview ? 'Trocar Imagem' : 'Selecionar Imagem'}
                        </label>
                        {imagePreview && (
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
                      {editForm.options.map((option, index) => (
                        <div key={index} className="flex items-center mb-3">
                          <input
                            type="radio"
                            id={`correct-${index}`}
                            name="correctOptionIndex"
                            checked={parseInt(editForm.correctOptionIndex as any) === index}
                            onChange={() => setEditForm(prev => ({ ...prev, correctOptionIndex: index }))}
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
                    
                    {success && (
                      <div className="rounded-md bg-green-50 p-3">
                        <p className="text-sm text-green-600">{success}</p>
                      </div>
                    )}
                    
                    <div className="flex justify-end space-x-3">
                      {!(selectedQuestion.id.startsWith('cg-') || 
                         selectedQuestion.id.startsWith('ci-') || 
                         selectedQuestion.id.startsWith('hi-') || 
                         selectedQuestion.id.startsWith('ge-') || 
                         selectedQuestion.id.startsWith('en-') || 
                         selectedQuestion.id.startsWith('es-')) && (
                        <button
                          type="button"
                          onClick={handleDeleteQuestion}
                          disabled={isLoading}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-300"
                        >
                          {isLoading ? 'Processando...' : 'Excluir'}
                        </button>
                      )}
                      
                      <button
                        type="button"
                        onClick={handleSaveChanges}
                        disabled={isLoading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                      >
                        {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                      </button>
                    </div>
                    
                    {(selectedQuestion.id.startsWith('cg-') || 
                      selectedQuestion.id.startsWith('ci-') || 
                      selectedQuestion.id.startsWith('hi-') || 
                      selectedQuestion.id.startsWith('ge-') || 
                      selectedQuestion.id.startsWith('en-') || 
                      selectedQuestion.id.startsWith('es-')) && (
                      <p className="text-sm text-gray-500 italic">
                        Nota: As perguntas padrão do sistema não podem ser excluídas. Ao salvar alterações, uma cópia modificada será criada.
                      </p>
                    )}
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
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma pergunta selecionada</h3>
                  <p className="mt-1 text-sm text-gray-500">Selecione uma pergunta da lista para editar.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
