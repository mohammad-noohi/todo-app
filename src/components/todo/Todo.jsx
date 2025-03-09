import "./Todo.css";
import React from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";

class Todo extends React.Component {
  checkTodo(todoId) {
    this.props.onCheck(todoId);
  }

  removeTodo(todoId) {
    this.props.onRemove(todoId);
  }

  render() {
    const { id, title, isComplete } = this.props;

    return (
      <div className={`todo ${isComplete ? "todo--completed" : ""}`}>
        <span className="todo-text">{title}</span>
        <div className="todo-actions">
          <div className="todo-action" id="check-btn" onClick={this.checkTodo.bind(this, id)}>
            {isComplete ? <IoCheckmarkDoneSharp /> : <IoCheckmarkSharp />}
          </div>
          <div className="todo-action" id="remove-btn" onClick={this.removeTodo.bind(this, id)}>
            <IoTrashOutline />
          </div>
        </div>
      </div>
    );
  }
}

/* 

id
isComplete
tilte


*/

export default Todo;
