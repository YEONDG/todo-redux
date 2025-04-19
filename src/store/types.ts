export interface Todo {
  id: number;
  todo: string;
  isCompleted: boolean;
}

export interface RootState {
  todos: Todo[];
}
