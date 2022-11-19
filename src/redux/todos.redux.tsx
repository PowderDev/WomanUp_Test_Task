import { AddTodoValues, ReduxAction, Todo } from 'types/types';

// ACTIONS

export enum ActionTypes {
  ADD_TODO = 'ADD_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
  EDIT_TODO = 'EDIT_TODO',
  FETCH_TODOS = 'FETCH_TODOS',
}

export const addTodo = (todo: AddTodoValues) => ({
  type: ActionTypes.ADD_TODO,
  payload: todo,
});

export const updateTodo = (todo: Todo) => {
  return { type: ActionTypes.EDIT_TODO, payload: todo };
};

export const removeTodo = (id: string) => {
  return { type: ActionTypes.REMOVE_TODO, payload: { id: id } };
};

export const fetchTodos = (todos: Todo[]) => {
  return { type: ActionTypes.FETCH_TODOS, payload: todos };
};

// REDUCERS

const initialState = {
  todoList: [] as Todo[],
};

export const rootReducer = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case ActionTypes.ADD_TODO:
      return {
        todoList: [action.payload, ...state.todoList],
      };
    case ActionTypes.REMOVE_TODO:
      return {
        todoList: state.todoList.filter(
          (todo) => todo.id !== action.payload.id
        ),
      };
    case ActionTypes.FETCH_TODOS:
      return {
        todoList: action.payload,
      };

    case ActionTypes.EDIT_TODO:
      const todoList = state.todoList;
      const idx = todoList.findIndex((t) => t.id == action.payload.id)!;
      todoList[idx] = action.payload;
      return { todoList };

    default:
      return state;
  }
};
