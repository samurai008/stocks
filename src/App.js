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
    return Object.keys(data).map((key, i) => {
      return (<tr key={i}>
                <td>{data[key].name}</td>
                <td>{data[key].price}</td>
                <td>{data[key].time}</td>
             </tr>);
    })
  }

  componentWillMount() {
    this.getStockPrices();
    StockPriceStore.on('stockChange', () => {
      console.log('New batch of stocks!', StockPriceStore.getAll());
      this.setState({
        stocks: StockPriceStore.getAll()
      });
    })
  }

  render() {
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
