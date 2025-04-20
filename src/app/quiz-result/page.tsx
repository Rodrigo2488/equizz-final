'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCategoryById } from '@/lib/quiz-data';

export default function QuizResult() {
  const router = useRouter();
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [categoryId, setCategoryId] = useState('');
  const [category, setCategory] = useState<any>(null);
  const [percentage, setPercentage] = useState(0);
  const [feedback, setFeedback] = useState({
    title: '',
    message: '',
    color: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Marcar que estamos no cliente
  useEffect(() => {
    setIsClient(true);
    
    // Suprimir erros de console
    const originalConsoleError = console.error;
    console.error = (...args) => {
      // Filtrar erros de hidratação do React
      const errorMessage = args[0]?.toString() || '';
      if (
        errorMessage.includes('Hydration') || 
        errorMessage.includes('content did not match') ||
        errorMessage.includes('Text content does not match')
      ) {
        return;
      }
      originalConsoleError(...args);
    };
    
    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  // Usar useEffect para acessar window.location após a montagem do componente
  useEffect(() => {
    if (!isClient) return;
    
    try {
      // Extrair parâmetros da URL
      const urlParams = new URLSearchParams(window.location.search);
      const scoreParam = urlParams.get('score');
      const totalParam = urlParams.get('total');
      const categoryParam = urlParams.get('category');
      
      if (scoreParam && totalParam && categoryParam) {
        const scoreValue = parseInt(scoreParam);
        const totalValue = parseInt(totalParam);
        
        setScore(scoreValue);
        setTotal(totalValue);
        setCategoryId(categoryParam);
        
        const categoryObj = getCategoryById(categoryParam);
        setCategory(categoryObj);
        
        const percentageValue = totalValue > 0 ? Math.round((scoreValue / totalValue) * 100) : 0;
        setPercentage(percentageValue);
        
        // Determinar feedback com base na pontuação
        if (scoreValue > 12) {
          setFeedback({
            title: 'Excelente!',
            message: 'Você se saiu muito bem nesta categoria! Seu conhecimento é impressionante. Continue estudando para manter esse excelente nível de domínio do assunto.',
            color: 'green'
          });
        } else if (scoreValue >= 8) {
          setFeedback({
            title: 'Muito bom!',
            message: 'Você foi bem, mas ainda há espaço para melhorar. Continue estudando este tema para aprimorar seus conhecimentos e alcançar a excelência.',
            color: 'blue'
          });
        } else if (scoreValue >= 4) {
          setFeedback({
            title: 'Precisa melhorar',
            message: 'Você demonstrou algum conhecimento, mas precisa estudar mais este tema. Dedique mais tempo para aprofundar seu entendimento nesta área.',
            color: 'yellow'
          });
        } else {
          setFeedback({
            title: 'Tente outra área',
            message: 'Parece que esta não é sua área de maior aptidão. Talvez seja interessante explorar outros temas que possam despertar mais seu interesse e facilidade de aprendizado.',
            color: 'red'
          });
        }
      } else {
        // Redirecionar para o dashboard se não houver parâmetros válidos
        router.push('/dashboard');
      }
    } catch (error) {
      console.error("Erro ao processar resultados:", error);
    } finally {
      setIsLoading(false);
    }
  }, [router, isClient]);
  
  // Renderização do lado do servidor ou quando está carregando
  if (!isClient || isLoading || !category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700">Carregando resultados...</p>
        </div>
      </div>
    );
  }
  
  // Função para obter classes de cor seguras
  const getColorClass = (colorName: string, type: string) => {
    const colorMap: Record<string, Record<string, string>> = {
      'green': { bg: 'bg-green-600', hover: 'hover:bg-green-700', text: 'text-green-600', stroke: '#22c55e' },
      'blue': { bg: 'bg-blue-600', hover: 'hover:bg-blue-700', text: 'text-blue-600', stroke: '#3b82f6' },
      'yellow': { bg: 'bg-yellow-600', hover: 'hover:bg-yellow-700', text: 'text-yellow-600', stroke: '#eab308' },
      'red': { bg: 'bg-red-600', hover: 'hover:bg-red-700', text: 'text-red-600', stroke: '#ef4444' },
      'purple': { bg: 'bg-purple-600', hover: 'hover:bg-purple-700', text: 'text-purple-600', stroke: '#9333ea' },
      'pink': { bg: 'bg-pink-600', hover: 'hover:bg-pink-700', text: 'text-pink-600', stroke: '#db2777' },
      'indigo': { bg: 'bg-indigo-600', hover: 'hover:bg-indigo-700', text: 'text-indigo-600', stroke: '#4f46e5' },
      'orange': { bg: 'bg-orange-600', hover: 'hover:bg-orange-700', text: 'text-orange-600', stroke: '#ea580c' }
    };
    
    return colorMap[colorName]?.[type] || colorMap['blue'][type];
  };
  
  const bgColorClass = getColorClass(feedback.color, 'bg');
  const hoverColorClass = getColorClass(feedback.color, 'hover');
  const textColorClass = getColorClass(feedback.color, 'text');
  const strokeColor = getColorClass(feedback.color, 'stroke');
  
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Cabeçalho */}
          <div className={`p-6 text-white ${bgColorClass}`}>
            <h1 className="text-2xl font-bold text-center">Resultado do Quiz</h1>
            <p className="text-center mt-2">{category.title}</p>
          </div>
          
          {/* Pontuação */}
          <div className="p-8 text-center">
            <div className="mb-6">
              <div className="inline-block rounded-full p-4 bg-gray-100">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#eee"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth="3"
                      strokeDasharray={`${percentage}, 100`}
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="text-3xl font-bold">{percentage}%</div>
                  </div>
                </div>
              </div>
            </div>
            
            <h2 className={`text-2xl font-bold ${textColorClass} mb-2`}>{feedback.title}</h2>
            <p className="text-gray-600 mb-4">{feedback.message}</p>
            
            <div className="bg-gray-100 p-4 rounded-lg inline-block">
              <p className="text-lg">
                Você acertou <span className="font-bold">{score}</span> de <span className="font-bold">{total}</span> perguntas
              </p>
            </div>
            
            <div className="mt-8">
              <button
                onClick={() => router.push('/dashboard')}
                className={`px-6 py-3 ${bgColorClass} ${hoverColorClass} text-white rounded-md transition-colors`}
              >
                Finalizar Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
