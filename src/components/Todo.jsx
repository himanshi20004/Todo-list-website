import React, { useRef, useState, useEffect } from 'react'; // Import useEffect
import todoicon from '../assets/todoicon.png';
import TodoItems from './TodoItems';

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []
  );
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  // Deleting functionality
  const deleteTodo = (id) => {
    setTodoList((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Update localStorage after deletion
      return updatedTodos;
    });
  };

  // Toggle functionality
  const toggle = (id) => {
    setTodoList((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Update localStorage after toggle
      return updatedTodos;
    });
  };

  // Sync local storage with todoList state
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex 
     flex-col p-7 min-h-[500px] rounded-xl'>
      {/* ----title---*/}
      <div className='flex items-center mt-7 gap-2'>
        <img className='w-8' src={todoicon} alt="" />
        <h1 className='text-2xl font-semibold'>To-Do List</h1>
      </div>
      {/* ----input box---*/}
      <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input
          ref={inputRef}
          className='bg-transparent border-0 outline-none 
          flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600'
          type="text"
          placeholder='Add your task'
        />
        <button onClick={add} className='border-none rounded-full bg-black
        w-32 h-12 text-white text-lg font-medium cursor-pointer'>Add +</button>
      </div>
      {/* ----todolist // variable so a new component is made---*/}
      <div>
        {todoList.map((item) => {
          return (
            <TodoItems 
              key={item.id} // Use unique id as the key
              text={item.text} 
              id={item.id} 
              isComplete={item.isComplete}
              deleteTodo={deleteTodo} 
              toggle={toggle} 
            />
          );
        })}
      </div>
    </div>
  );
}

export default Todo;
