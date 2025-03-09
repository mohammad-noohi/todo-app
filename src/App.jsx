// styles
import "./assets/styles/reset.css";
import "./assets/styles/my-reset.css";
import "./App.css";
// packages & components
import React from "react";
import TodoApp from "./components/todoApp/TodoApp";

class App extends React.Component {
  render() {
    return <TodoApp />;
  }
}

export default App;
