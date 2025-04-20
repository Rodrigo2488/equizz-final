'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Question, getCategoryById, getRandomQuestions, saveQuizResult } from '@/lib/quiz-data';
import Image from 'next/image';

export default function QuizPage({ params }: { params: { categoryId: string } }) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [category, setCategory] = useState<any>(null);
  
  // Marcar que estamos no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Carregar categoria e perguntas quando o componente montar
  useEffect(() => {
    if (!isClient) return;
    
    try {
      const categoryObj = getCategoryById(params.categoryId);
      setCategory(categoryObj);
      
      if (params.categoryId) {
        const randomQuestions = getRandomQuestions(params.categoryId, 15);
        setQuestions(randomQuestions);
        setLoading(false);
      }
    } catch (error) {
      console.error("Erro ao carregar dados do quiz:", error);
      setLoading(false);
    }
  }, [params.categoryId, isClient]);
  
  // Verificar se o quiz foi concluído
  useEffect(() => {
    if (!isClient || loading) return;
    
    if (currentQuestionIndex >= questions.length && questions.length > 0) {
      setQuizCompleted(true);
      
      try {
        // Salvar resultado do quiz
        saveQuizResult({
          categoryId: params.categoryId,
          totalQuestions: questions.length,
          correctAnswers: score,
          date: new Date().toISOString()
        });
        
        // Redirecionar para a página de resultados
        router.push(`/quiz-result?score=${score}&total=${questions.length}&category=${params.categoryId}`);
      } catch (error) {
        console.error("Erro ao finalizar quiz:", error);
      }
    }
  }, [currentQuestionIndex, questions.length, loading, score, params.categoryId, router, isClient]);
  
  // Avançar para a próxima pergunta após 2 segundos
  useEffect(() => {
    if (!isClient) return;
    
    let timer: NodeJS.Timeout;
    
    if (selectedOption !== null) {
      timer = setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      }, 2000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [selectedOption, isClient]);
  
  // Lidar com a seleção de uma opção
  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null || !isClient) return; // Evitar seleções múltiplas
    
    setSelectedOption(optionIndex);
    
    const currentQuestion = questions[currentQuestionIndex];
    const correct = optionIndex === currentQuestion.correctOptionIndex;
    
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 1);
    }
  };
  
  // Renderização do lado do servidor ou quando está carregando
  if (!isClient || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700">Carregando quiz...</p>
        </div>
      </div>
    );
  }
  
  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Categoria não encontrada</h2>
          <button 
            onClick={() => router.push('/dashboard')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Voltar para o Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  if (quizCompleted || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700">Finalizando quiz...</p>
        </div>
      </div>
    );
  }
  
  // Garantir que temos uma pergunta atual válida
  if (currentQuestionIndex >= questions.length) {
    return null;
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  const categoryColor = category?.color || 'blue';
  
  // Função para obter classes de cor seguras
  const getColorClass = (colorName: string, type: 'bg' | 'border' | 'hover') => {
    const colorMap: Record<string, Record<string, string>> = {
      'blue': { bg: 'bg-blue-600', border: 'border-blue-500', hover: 'hover:bg-blue-700' },
      'green': { bg: 'bg-green-600', border: 'border-green-500', hover: 'hover:bg-green-700' },
      'red': { bg: 'bg-red-600', border: 'border-red-500', hover: 'hover:bg-red-700' },
      'yellow': { bg: 'bg-yellow-600', border: 'border-yellow-500', hover: 'hover:bg-yellow-700' },
      'purple': { bg: 'bg-purple-600', border: 'border-purple-500', hover: 'hover:bg-purple-700' },
      'pink': { bg: 'bg-pink-600', border: 'border-pink-500', hover: 'hover:bg-pink-700' },
      'indigo': { bg: 'bg-indigo-600', border: 'border-indigo-500', hover: 'hover:bg-indigo-700' },
      'orange': { bg: 'bg-orange-600', border: 'border-orange-500', hover: 'hover:bg-orange-700' }
    };
    
    return colorMap[colorName]?.[type] || colorMap['blue'][type];
  };
  
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Cabeçalho */}
          <div className={`p-6 text-white ${getColorClass(categoryColor, 'bg')}`}>
            <h1 className="text-2xl font-bold">{category.title}</h1>
            <div className="flex justify-between items-center mt-2">
              <span>Pergunta {currentQuestionIndex + 1} de {questions.length}</span>
              <span>Pontuação: {score}</span>
            </div>
          </div>
          
          {/* Progresso */}
          <div className="w-full bg-gray-200 h-2">
            <div 
              className={`${getColorClass(categoryColor, 'bg')} h-2`} 
              style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
            ></div>
          </div>
          
          {/* Pergunta */}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">{currentQuestion.text}</h2>
            
            {/* Imagem da pergunta (se existir) */}
            {currentQuestion.imageUrl && (
              <div className="mb-6 flex justify-center">
                {/* Usar div com estilo de background em vez de tag img */}
                <div 
                  className="rounded-lg bg-center bg-no-repeat bg-contain"
                  style={{ 
                    backgroundImage: `url(${currentQuestion.imageUrl})`,
                    width: '100%',
                    height: '200px'
                  }}
                  aria-label="Imagem da pergunta"
                ></div>
              </div>
            )}
            
            {/* Opções */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                // Determinar classes de estilo para a opção
                let optionClasses = "w-full text-left p-4 rounded-md border transition-colors ";
                
                if (selectedOption === null) {
                  optionClasses += "border-gray-300 hover:border-blue-500";
                } else if (selectedOption === index) {
                  if (index === currentQuestion.correctOptionIndex) {
                    optionClasses += "bg-green-100 border-green-500 text-green-800";
                  } else {
                    optionClasses += "bg-red-100 border-red-500 text-red-800";
                  }
                } else if (index === currentQuestion.correctOptionIndex) {
                  optionClasses += "bg-green-100 border-green-500 text-green-800";
                } else {
                  optionClasses += "border-gray-300";
                }
                
                return (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    disabled={selectedOption !== null}
                    className={optionClasses}
                  >
                    <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Feedback */}
          {isCorrect !== null && (
            <div className={`p-4 ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <p className="font-medium">
                {isCorrect 
                  ? '✓ Correto! Boa resposta!' 
                  : `✗ Incorreto. A resposta correta é: ${currentQuestion.options[currentQuestion.correctOptionIndex]}`
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
