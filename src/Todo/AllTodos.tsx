import React from 'react';
import { Todo } from 'types/types';
import { useFirebaseRead } from '../firebase/firebaseCalls';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useActions, useAppSelector } from 'redux/hooks';
dayjs.extend(relativeTime);

export const AllTodos = () => {
  useFirebaseRead();

  const actions = useActions();
  const state = useAppSelector((state) => state);
  const todos = state.todoList;
  const checkExpired = (todo: Todo) => todo.deadline.toDate() < new Date();
  const checkCompleted = (todo: Todo) => checkExpired(todo) || todo.completed;
  const getDeadline = (todo: Todo) =>
    dayjs.unix(todo.deadline.seconds).fromNow();

  const updateTodo = (todo: Todo) => actions.updateTodoThunk(todo);
  const removeTodo = (id: Todo['id']) => actions.removeTodoThunk(id);

  return (
    <React.Fragment>
      <h3>All Todos</h3>

      <ul className="todos">
        {todos?.map((todo) => (
          <li
            className={`todo ${checkCompleted(todo) ? 'completed' : ''}`}
            key={todo.id}
          >
            <header className="todo__header">
              <h4>{todo.title}</h4>

              <div className="action_buttons">
                <button
                  className={checkExpired(todo) ? 'expired' : ''}
                  title={checkExpired(todo) ? 'The todo is expired' : ''}
                  disabled={checkExpired(todo)}
                  onClick={() => updateTodo(todo)}
                >
                  {checkExpired(todo)
                    ? 'Expired'
                    : checkCompleted(todo)
                    ? 'Uncomplete'
                    : 'Complete'}
                </button>
                <button onClick={() => removeTodo(todo.id)}>Remove</button>
              </div>
            </header>

            <p className="description">{todo.description}</p>
            <div className="info">
              <span className="deadline">deadline: {getDeadline(todo)}</span>
              {todo.file && (
                <a href={todo.file} target="_blank" rel="noopener noreferrer">
                  Attached file
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};
