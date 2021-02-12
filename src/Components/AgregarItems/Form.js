import React, { useState, useEffect, useRef } from 'react';

function Form(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input
    });
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      {props.edit ? (
        <div>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
          />
          <button onClick={handleSubmit} class="w-full py-3 mt-10 font-medium tracking-widest text-white uppercase bg-red-500 shadow-lg focus:outline-none hover:bg-red-700 hover:shadow-none">
            Actualizar
          </button>
        </div>
      ) : (
          <div>
            <input
              placeholder='detalle'
              value={input}
              onChange={handleChange}
              name='text'
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            />
            <button onClick={handleSubmit} class="w-full py-3 mt-10 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
              Agregar
          </button>
          <div class="py-2"/>
          </div>
        )}
    </form>
  );
}

export default Form;
