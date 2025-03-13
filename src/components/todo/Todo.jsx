import "./Todo.css";
import React from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";

function Todo({ id, title, isComplete, onCheck, onRemove }) {
  // Methods
  const checkTodo = todoId => {
    onCheck(todoId);
  };

  const removeTodo = todoId => {
    onRemove(todoId);
  };

  return (
    <div className={`todo ${isComplete ? "todo--completed" : ""}`}>
      <span className="todo-text">{title}</span>
      <div className="todo-actions">
        <div className="todo-action" id="check-btn" onClick={() => checkTodo(id)}>
          {isComplete ? <IoCheckmarkDoneSharp /> : <IoCheckmarkSharp />}
        </div>
        <div className="todo-action" id="remove-btn" onClick={() => removeTodo(id)}>
          <IoTrashOutline />
        </div>
      </div>
    </div>
  );
}

export default Todo;
