# Todo App

Список задач на React 18 + TypeScript + Vite + Supabase.

## Стек

- React 18, TypeScript, Vite
- Supabase (PostgreSQL + REST API)

## Функционал

- Загрузка задач из Supabase при открытии
- Добавление задачи (пустая не добавляется)
- Отметка выполненной / снятие отметки
- Удаление задачи
- Все изменения сохраняются в БД

## Запуск локально

1. Клонировать репозиторий:
   ```bash
   git clone <url>
   cd <папка>
   ```

2. Установить зависимости:
   ```bash
   npm install
   ```

3. Создать проект в [Supabase](https://supabase.com) и выполнить в SQL Editor:
   ```sql
   create table todos (
     id uuid primary key default gen_random_uuid(),
     title text not null,
     is_done boolean not null default false,
     created_at timestamp default now()
   );

   alter table todos enable row level security;

   create policy "todos: public access" on todos
     for all using (true) with check (true);
   ```

4. Скопировать `.env.example` в `.env` и заполнить значениями из Supabase
   (Project Settings → API):
   ```
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   ```

5. Запустить:
   ```bash
   npm run dev
   ```

Открыть http://localhost:5173