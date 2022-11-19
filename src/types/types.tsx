import { Timestamp } from 'firebase/firestore';
import { ActionTypes } from 'redux/todos.redux';

export type ReduxState = {
  todoList: Todo[];
};

export type ReduxAction =
  | ADD_TODO_ACTION
  | REMOVE_TODO_ACTION
  | FETCH_TODOS_ACTION
  | EDIT_TODO_ACTION;

type ADD_TODO_ACTION = {
  type: ActionTypes.ADD_TODO;
  payload: Todo;
};
type REMOVE_TODO_ACTION = {
  type: ActionTypes.REMOVE_TODO;
  payload: {
    id: string;
  };
};

type FETCH_TODOS_ACTION = {
  type: ActionTypes.FETCH_TODOS;
  payload: Todo[];
};

type EDIT_TODO_ACTION = {
  type: ActionTypes.EDIT_TODO;
  payload: Todo;
};

export type Todo = AddTodoValues & {
  id: string;
  file: string;
  completed: boolean;
  deadline: Timestamp;
  createdAt: Timestamp;
  filePath: string;
};

export type AddTodoValues = {
  title: string;
  description: string;
  file: File | null;
  deadline: string;
};
