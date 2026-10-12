import type { Todo } from './types';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api';
import { useEffect, useState } from 'react';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import './App.css';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка при первом рендере. [] = выполнить один раз
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchTodos();
        setTodos(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Ошибка загрузки');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleAdd(title: string) {
    try {
      const created = await createTodo(title);
      // Не мутируем массив, а создаём новый
      setTodos((prev) => [created, ...prev]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка добавления');
    }
  }

  async function handleToggle(id: string, isDone: boolean) {
    try {
      const updated = await updateTodo(id, isDone);
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка обновления');
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка удаления');
    }
  }

  if (loading) return <p>Загрузка…</p>;
  if (error) return <p style={{ color: 'red' }}>Ошибка: {error}</p>;

  return (
    <div className="app">
      <h1>Список задач</h1>
      <AddTodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}