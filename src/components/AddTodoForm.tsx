import { useState, type FormEvent } from 'react';

interface Props {
  onAdd: (title: string) => Promise<void>;
}

export function AddTodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState(''); // контролируемый input
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault(); // чтобы страница не перезагружалась
    const trimmed = title.trim();
    if (!trimmed) return; // пустая задача не добавляется

    setLoading(true);
    try {
      await onAdd(trimmed);
      setTitle('');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Новая задача"
      />
      <button type="submit" disabled={loading}>
        Добавить
      </button>
    </form>
  );
}