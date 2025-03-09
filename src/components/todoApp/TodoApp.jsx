import "./TodoApp.css";
import React from "react";
// icons
import { IoAddSharp } from "react-icons/io5";
import Todo from "../todo/Todo";

class TodoApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        // { id: 1, title: "learn html", isComplete: true },
        // { id: 2, title: "learn css", isComplete: true },
        // { id: 4, title: "learn js", isComplete: true },
        // { id: 5, title: "learn react", isComplete: false },
        // { id: 6, title: "learn redux", isComplete: false },
      ],

      todoTitle: "",
      todosFilter: "all",
    };

    // binding
    this.addNewTodo = this.addNewTodo.bind(this);
    this.todoInputHandler = this.todoInputHandler.bind(this);
    this.todosFilterasion = this.todosFilterasion.bind(this);
  }

  todoInputHandler(e) {
    this.setState({
      todoTitle: e.target.value,
    });
  }

  addNewTodo(e) {
    e.preventDefault();
    if (this.state.todoTitle !== "") {
      this.setState(prevState => {
        const newTodo = {
          id: prevState.todos.length + 1,
          title: this.state.todoTitle,
          isComplete: false,
        };

        return {
          todos: [...prevState.todos, newTodo],
          todoTitle: "",
        };
      });
    } else {
      alert("please write something in text input field");
    }
  }

  todosFilterasion(e) {
    this.setState({
      todosFilter: e.target.value,
    });
  }

  checkTodo(todoId) {
    console.log("todoId ➡️", todoId);

    this.setState(prevState => {
      const newTodos = prevState.todos.map(todo => {
        if (todo.id === todoId) {
          const newTodo = { ...todo, isComplete: !todo.isComplete };
          return newTodo;
        } else {
          return todo;
        }
      });

      return { todos: newTodos };
    });
  }

  removeTodo(todoId) {
    this.setState(prevState => {
      return { todos: prevState.todos.filter(todo => todo.id !== todoId) };
    });
  }

  render() {
    return (
      <section className="app">
        <div className="container">
          <div className="app-wrapper">
            <h1 className="app__title">todo app project</h1>
            <div className="todo-form-wrapper">
              <form action="" className="todo-form" onSubmit={this.addNewTodo.bind(this)}>
                <div className="input-group todo-field">
                  <input type="text" value={this.state.todoTitle} onChange={this.todoInputHandler} />
                  <div className="plus-icon" onClick={this.addNewTodo}>
                    <IoAddSharp />
                  </div>
                </div>
                <div className="input-group todos-filter">
                  <select value={this.state.todosFilter} onChange={this.todosFilterasion}>
                    <option value="all">all</option>
                    <option value="completed">completed</option>
                    <option value="uncompleted">uncompleted</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="todos">
              {this.state.todos
                .filter(todo => {
                  if (this.state.todosFilter === "completed") {
                    return todo.isComplete;
                  } else if (this.state.todosFilter === "uncompleted") {
                    return !todo.isComplete;
                  } else {
                    return true;
                  }
                })
                .map((todo, index) => (
                  <Todo key={index} {...todo} onCheck={this.checkTodo.bind(this)} onRemove={this.removeTodo.bind(this)} />
                ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default TodoApp;
