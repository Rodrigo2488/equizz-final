export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
  category: string | string[]; // Pode ser uma única categoria ou um array de categorias
  imageUrl?: string; // URL opcional para imagem da pergunta
}

export interface Category {
  id: string;
  title: string;
  description: string;
  color: string;
}

export interface QuizResult {
  categoryId: string;
  totalQuestions: number;
  correctAnswers: number;
  date: string;
}
