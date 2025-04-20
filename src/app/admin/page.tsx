'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Question, Category, categories } from '@/lib/quiz-data';

// Interface para nova pergunta
interface NewQuestion {
  text: string;
  options: string[];
  correctOptionIndex: number;
  category: string;
}

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]?.id || '');
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  
  // Estados para nova pergunta
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newOptions, setNewOptions] = useState(['', '', '', '']);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);
  
  // Carregar perguntas do localStorage
  useEffect(() => {
    const storedQuestions = localStorage.getItem('adminQuestions');
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
  }, []);
  
  // Salvar perguntas no localStorage quando houver mudanças
  useEffect(() => {
    if (questions.length > 0) {
      localStorage.setItem('adminQuestions', JSON.stringify(questions));
    }
  }, [questions]);
  
  // Verificar se o usuário é administrador
  const isAdmin = user?.isAdmin === true;
  
  // Redirecionar se não for administrador
  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (!isAdmin) {
      router.push('/dashboard');
    }
  }, [user, isAdmin, router]);
  
  // Filtrar perguntas por categoria
  const filteredQuestions = questions.filter(q => q.category === selectedCategory);
  
  // Atualizar opção
  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...newOptions];
    updatedOptions[index] = value;
    setNewOptions(updatedOptions);
  };
  
  // Adicionar nova pergunta
  const handleAddQuestion = () => {
    // Validar campos
    if (!newQuestionText.trim()) {
      alert('Por favor, insira o texto da pergunta.');
      return;
    }
    
    if (newOptions.some(option => !option.trim())) {
      alert('Por favor, preencha todas as opções.');
      return;
    }
    
    // Criar nova pergunta
    const newQuestion: NewQuestion = {
      text: newQuestionText,
      options: newOptions,
      correctOptionIndex,
      category: selectedCategory
    };
    
    // Adicionar à lista com ID único
    const questionWithId: Question = {
      ...newQuestion,
      id: `custom-${Date.now()}`
    };
    
    setQuestions([...questions, questionWithId]);
    
    // Resetar formulário
    setNewQuestionText('');
    setNewOptions(['', '', '', '']);
    setCorrectOptionIndex(0);
    setIsAddingQuestion(false);
  };
  
  // Remover pergunta
  const handleRemoveQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };
  
  if (!user || !isAdmin) {
    return null; // Não renderizar nada enquanto redireciona
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">eQuizz - Painel de Administração</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Voltar ao Dashboard
            </button>
          </div>
        </div>
      </header>
      
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6">Gerenciamento de Perguntas</h2>
          
          {/* Seletor de categoria */}
          <div className="mb-6">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Selecione uma categoria
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          
          {/* Lista de perguntas */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Perguntas ({filteredQuestions.length})</h3>
              <button
                onClick={() => setIsAddingQuestion(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Adicionar Pergunta
              </button>
            </div>
            
            {filteredQuestions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Nenhuma pergunta encontrada para esta categoria.
              </p>
            ) : (
              <div className="space-y-4">
                {filteredQuestions.map((question) => (
                  <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{question.text}</h4>
                      <button
                        onClick={() => handleRemoveQuestion(question.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remover
                      </button>
                    </div>
                    <div className="mt-2 space-y-1">
                      {question.options.map((option, index) => (
                        <div key={index} className={`pl-2 ${index === question.correctOptionIndex ? 'border-l-4 border-green-500' : ''}`}>
                          {String.fromCharCode(65 + index)}. {option} {index === question.correctOptionIndex && '(Correta)'}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Formulário para adicionar pergunta */}
          {isAddingQuestion && (
            <div className="border border-gray-300 rounded-lg p-6 bg-gray-50">
              <h3 className="text-xl font-semibold mb-4">Adicionar Nova Pergunta</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="question-text" className="block text-sm font-medium text-gray-700 mb-1">
                    Texto da Pergunta
                  </label>
                  <input
                    id="question-text"
                    type="text"
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite a pergunta aqui..."
                  />
                </div>
                
                <div>
                  <p className="block text-sm font-medium text-gray-700 mb-1">Opções</p>
                  {newOptions.map((option, index) => (
                    <div key={index} className="flex items-center mb-2">
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
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsAddingQuestion(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAddQuestion}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Salvar Pergunta
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
