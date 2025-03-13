import "./TodoApp.css";
import React, { useState } from "react";
// icons
import { IoAddSharp } from "react-icons/io5";
import Todo from "../todo/Todo";

function TodoApp() {
  // State
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");
  const [todosFilter, setTodosFilter] = useState("all");

  // Methods
  const todoInputHandler = e => {
    setTodoTitle(e.target.value);
  };

  const addNewTodo = e => {
    e.preventDefault();

    if (todoTitle !== "") {
      const newTodo = {
        id: todos.length + 1,
        title: todoTitle,
        isComplete: false,
      };

      setTodos(prevState => {
        return [...prevState, newTodo];
      });

      setTodoTitle("");
    } else {
      alert("please write something in text input field");
    }
  };

  const todosFilterasion = e => {
    setTodosFilter(e.target.value);
  };

  const checkTodo = todoId => {
    setTodos(prevState => {
      const newTodos = prevState.map(todo => {
        if (todo.id === todoId) {
          return { ...todo, isComplete: !todo.isComplete };
        } else {
          return todo;
        }
      });

      return newTodos;
    });
  };

  const removeTodo = todoId => {
    setTodos(prevState => {
      return prevState.filter(todo => todo.id !== todoId);
    });
  };

  // JSX
  return (
    <section className="app">
      <div className="container">
        <div className="app-wrapper">
          <h1 className="app__title">todo app project</h1>
          <div className="todo-form-wrapper">
            <form action="" className="todo-form" onSubmit={addNewTodo}>
              <div className="input-group todo-field">
                <input type="text" value={todoTitle} onChange={todoInputHandler} />
                <div className="plus-icon" onClick={addNewTodo}>
                  <IoAddSharp />
                </div>
              </div>
              <div className="input-group todos-filter">
                <select value={todosFilter} onChange={todosFilterasion}>
                  <option value="all">all</option>
                  <option value="completed">completed</option>
                  <option value="uncompleted">uncompleted</option>
                </select>
              </div>
            </form>
          </div>
          <div className="todos">
            {todos
              .filter(todo => {
                if (todosFilter === "completed") {
                  return todo.isComplete;
                } else if (todosFilter === "uncompleted") {
                  return !todo.isComplete;
                } else {
                  return true;
                }
              })
              .map((todo, index) => (
                <Todo key={index} {...todo} onCheck={checkTodo} onRemove={removeTodo} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TodoApp;
