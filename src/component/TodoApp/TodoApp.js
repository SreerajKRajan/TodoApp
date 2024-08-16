import React, { Component } from "react";
import "./TodoApp.css";

export default class TodoApp extends Component {
  state = {
    input: "",
    items: [],
    editIndex: null,
    editInput: "",
  };

  componentDidMount() {
    const storedItems = JSON.parse(localStorage.getItem("todoItems"));
    if (storedItems) {
      this.setState({ items: storedItems });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.items !== this.state.items) {
      localStorage.setItem("todoItems", JSON.stringify(this.state.items));
    }
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  storeItems = (event) => {
    event.preventDefault();
    const { input, items } = this.state;

    if (input.trim() !== "") {
      if(items.length < 2){
      this.setState({
        items: [input, ...items],
        input: "",
      });
     

      } 
    }
  };

  deleteItem = (key) => {
    this.setState({
      items: this.state.items.filter((data, index) => index !== key),
    });
  };

  startEditing = (index) => {
    this.setState({
      editIndex: index,
      editInput: this.state.items[index],
    });
  };

  handleEditChange = (event) => {
    this.setState({
      editInput: event.target.value,
    });
  };

  saveEdit = (event) => {
    event.preventDefault();
    const { editIndex, editInput, items } = this.state;

    if (editInput.trim() !== "") {
      const updatedItems = [...items];
      updatedItems[editIndex] = editInput;

      this.setState({
        items: updatedItems,
        editIndex: null,
        editInput: "",
      });
    }
  };

  render() {
    const { input, items, editIndex, editInput } = this.state;

    return (
      <div className="todo-container">
        <form className="input-section" onSubmit={this.storeItems}>
          <h1>Todo App</h1>
          <input
            type="text"
            value={input}
            onChange={this.handleChange}
            placeholder="Enter Items..."
          />
        </form>
        <ul>
          {items.map((data, index) => {
            return (
              <li key={index}>
                <span className="text-content">{data}</span>
                <div className="icons">
                  <i
                    className="fa-solid fa-edit"
                    onClick={() => this.startEditing(index)}
                  ></i>
                  <i
                    className="fa-solid fa-trash-can"
                    onClick={() => this.deleteItem(index)}
                  ></i>
                </div>
              </li>
            );
          })}
        </ul>

        {editIndex !== null && (
          <div className="edit-section">
            <form onSubmit={this.saveEdit}>
              <input
                type="text"
                value={editInput}
                onChange={this.handleEditChange}
                placeholder="Edit Item..."
              />
              <button type="submit">Save</button>
              <button
                type="button"
                onClick={() => this.setState({ editIndex: null })}
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}
