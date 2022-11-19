import { AddForm } from 'Todo/AddForm';
import { AllTodos } from 'Todo/AllTodos';
import React from 'react';

export const App = () => {
  return (
    <>
      <header>
        <h1>WomanUp test task</h1>
      </header>

      <AddForm />
      <hr />
      <AllTodos />
    </>
  );
};
