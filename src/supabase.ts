import { createClient } from '@supabase/supabase-js';

// Берём значения из .env (Vite подставляет их во время сборки)
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Простая проверка, чтобы не запускать приложение с пустыми ключами
if (!url || !key) {
  throw new Error('Не заданы VITE_SUPABASE_URL или VITE_SUPABASE_ANON_KEY в .env');
}

export const supabase = createClient(url, key);