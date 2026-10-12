import { supabase } from './supabase';
import type { Todo } from './types';

// Получить все задачи, новые сверху
export async function fetchTodos(): Promise<Todo[]> {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

// Добавить задачу и вернуть её (чтобы сразу положить в state)
export async function createTodo(title: string): Promise<Todo> {
  const { data, error } = await supabase
    .from('todos')
    .insert({ title })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// Переключить is_done
export async function updateTodo(id: string, is_done: boolean): Promise<Todo> {
  const { data, error } = await supabase
    .from('todos')
    .update({ is_done })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// Удалить задачу
export async function deleteTodo(id: string): Promise<void> {
  const { error } = await supabase.from('todos').delete().eq('id', id);
  if (error) throw new Error(error.message);
}