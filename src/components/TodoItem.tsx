import type { Todo } from '../types';

interface Props {
  todo: Todo;
  onToggle: (id: string, isDone: boolean) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li style={{ textDecoration: todo.is_done ? 'line-through' : 'none' }}>
      <input
        type="checkbox"
        checked={todo.is_done}
        onChange={(e) => onToggle(todo.id, e.target.checked)}
      />
      <span>{todo.title}</span>
      <button onClick={() => onDelete(todo.id)}>Удалить</button>
    </li>
  );
}