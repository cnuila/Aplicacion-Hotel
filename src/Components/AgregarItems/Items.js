import React, { useState } from 'react';
import Form from './Form';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

const Items = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  //variables
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  //lleva los atributos al form.js
  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  //si esta en modo editar manda sus props
  if (edit.id) {
    return <Form edit={edit} onSubmit={submitUpdate} />;
  }

  //mapea todo los detalles
  return todos.map((todo, index) => (
    <div
      class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
      key={index}
    >
      <div class="grid grid-cols-3">
        <div class="col-span-2" key={todo.id} onClick={() => completeTodo(todo.id)}>
          {todo.text}
        </div>
        <div>
          <RiCloseCircleLine
            onClick={() => removeTodo(todo.id)}
            className="hover:bg-red-600"
          />
          <TiEdit
            onClick={() => setEdit({ id: todo.id, value: todo.text })}
            className='hover:bg-purple-600'
          />
        </div>
      </div>
    </div>
  ));
};

export default Items;
