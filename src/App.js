import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoStore from './store/TodoStore';
import StockPriceStore from "./store/StockPriceStore";
import * as TodoActions from "./actions/TodoActions";
import * as StockPriceActions from './actions/StockPriceActions';

const uri = 'ws://stocks.mnet.website';
const stockSocket = new WebSocket(uri);
window.closeConnection = () => stockSocket.close();

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: TodoStore.getAll(),
      text: 'hello2u',
      stocks: StockPriceStore.getAll()
    };
  }

  closeConnection() {
    stockSocket.close();
  }

  getStockPrices() {
    stockSocket.onmessage = (event) => {
      StockPriceActions.reloadStocks(event.data);
    }
  }

  createStockTable(data) {
    return data.map(([name, price, time]) => {
      return (<tr>
                <td>{name}</td>
                <td>{price}</td>
                <td>{time}</td>
             </tr>);
    })
  }

  componentWillMount() {
    TodoStore.on('change', () => {
      this.setState({
        todos: TodoStore.getAll()
      });
    });

    this.getStockPrices();

    StockPriceStore.on('stockChange', () => {
      console.log('New batch of stocks!');
      this.setState({
        stocks: StockPriceStore.getAll()
      })
    })
  }

  createTodo(text) {
    console.log(text)
    TodoActions.createTodo(Date.now() + text);
  }

  handleTextChange(event) {
    console.log(event.target.value);
    this.setState({
      text: event.target.value
    })
  }

  render() {
    const { todos } = this.state;

    const TodoComponents = todos.map((todo) => {
      return <li key={todo.id}>{todo.text}</li>
    });

    const onChangeText = e => this.handleTextChange(e);

    const StockTable = this.createStockTable(this.state.stocks);

    return (
      <div>
        <button type="button" className="btn btn-danger" onClick={this.closeConnection.bind(this)}>Close</button>
        <table>
          <tbody>
            {StockTable}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
