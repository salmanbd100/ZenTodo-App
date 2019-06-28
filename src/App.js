import React, { Component } from "react";
import Todoitems from "./components/Todo/Todoitems/Todoitems";

const UserBlock = props => (
  <div className="user-block">
    <img src={props.img} alt="" className="user-thumb" />
    <h3 className="title">{props.title}</h3>
    <p className="date">{props.date}</p>
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createtodo: false,
      todoitems: []
    };
  }
  createTodoHandler = () => {
    this.setState({
      createtodo: true
    });
  };

  onChangeHandler = e => {
    if (e.key === "Enter") {
      var newtodoitems = [
        ...this.state.todoitems,
        { id: this.state.todoitems.length, text: e.target.value, isDone: false }
      ];
      this.setState({
        createtodo: false,
        todoitems: newtodoitems
      });
    }
  };

  todoCompleteHandler = id => {
    let newtodoitems = this.state.todoitems.map(items => {
      if (id === items.id) {
        return { ...items, isDone: true };
      }
      return items;
    });
    this.setState({ todoitems: newtodoitems });
  };
  todoItemsDeleteHandler = id => {
    let newtodoitems = this.state.todoitems.filter(items => {
      return id !== items.id;
    });
    this.setState({ todoitems: newtodoitems });
  };

  todoUpdateHandler = (text, id) => {
    let oldtodoitems = this.state.todoitems.map(item => {
      if (id === item.id) {
        return {
          ...item,
          text
        };
      }
      return item;
    });
    this.setState({ todoitems: oldtodoitems });
  };

  render() {
    return (
      <div className="todolist-wrap">
        {/* <img className="logo" src="asstes/images/logo.jpeg" alt="" /> */}
        <div className="date-time">Wed, 10:41 AM</div>
        <div className="bg-image">
          <img src="asstes/images/background.jpeg" alt="" />
        </div>
        <div className="todolist">
          <UserBlock
            img="https://picsum.photos/200/300/?random"
            title="Good Morning, Natalie"
            date="Wednesday January 3"
          />
          <h4 className="todo-title">Top Priority Task</h4>
          <Todoitems
            todoUpdateHandler={this.todoUpdateHandler}
            todoItemsDeleteHandler={this.todoItemsDeleteHandler}
            todoCompleteHandler={this.todoCompleteHandler}
            items={this.state.todoitems}
          />
          {this.state.createtodo ? (
            <input
              className="todo-input"
              onKeyPress={e => this.onChangeHandler(e)}
              type="text"
              placeholder="Type and hit Enter  "
            />
          ) : (
            <button onClick={this.createTodoHandler} className="btn-addnew">
              <i className="fa fa-plus-square" aria-hidden="true" />
              Add Task
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default App;
