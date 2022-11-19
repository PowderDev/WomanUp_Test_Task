import {
  firebaseWrite,
  firebaseUpdateCompletion,
  firebaseDelete,
} from '../firebase/firebaseCalls';
import { AddTodoValues, Todo } from 'types/types';
import { addTodo, updateTodo, removeTodo, fetchTodos } from './todos.redux';

export const addTodoThunk =
  (values: AddTodoValues) => async (dispatch: any) => {
    const todo = await firebaseWrite(values);
    dispatch(addTodo(todo));
  };

export const updateTodoThunk = (todo: Todo) => async (dispatch: any) => {
  const updatedTodo = await firebaseUpdateCompletion(todo);
  dispatch(updateTodo(updatedTodo));
};

export const removeTodoThunk = (todo: Todo) => async (dispatch: any) => {
  await firebaseDelete(todo);
  dispatch(removeTodo(todo.id));
};

export const fetchTodosThunk = (todos: Todo[]) => async (dispatch: any) => {
  dispatch(fetchTodos(todos));
};
