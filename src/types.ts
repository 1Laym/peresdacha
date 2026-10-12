// Описание одной задачи. Совпадает со структурой таблицы todos в Supabase
export interface Todo {
  id: string;
  title: string;
  is_done: boolean;
  created_at: string;
}