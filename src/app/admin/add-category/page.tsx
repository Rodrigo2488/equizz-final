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

  useEffect(() => {
    if (user === undefined) return;
    if (!user || !user.isAdmin) {
      router.push('/dashboard');
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!title.trim()) {
      setError('O título é obrigatório.');
      setIsLoading(false);
      return;
    }

    if (!description.trim()) {
      setError('A descrição é obrigatória.');
      setIsLoading(false);
      return;
    }

    const exists = categories.some(
      (cat) => cat.title.toLowerCase() === title.toLowerCase()
    );
    if (exists) {
      setError('Já existe uma categoria com esse título.');
      setIsLoading(false);
      return;
    }

    const id = title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
    const newCategory = { id, title, description, color };

    const stored = localStorage.getItem('adminCategories');
    const adminCategories = stored ? JSON.parse(stored) : [];
    adminCategories.push(newCategory);
    localStorage.setItem('adminCategories', JSON.stringify(adminCategories));

    router.push('/dashboard');
  };

  const colorOptions = ['blue', 'green', 'red', 'yellow', 'purple'];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Adicionar Categoria</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          className="w-full border rounded p-2"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
          className="w-full border rounded p-2"
        />
        <div className="flex space-x-2">
          {colorOptions.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-full bg-${c}-500 ${color === c ? 'ring-2 ring-black' : ''}`}
            />
          ))}
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isLoading}
        >
          {isLoading ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  );
}
