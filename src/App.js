import React, { Component } from "react";
import "./App.css";
import StockPriceStore from "./store/StockPriceStore";
import * as StockPriceActions from "./actions/StockPriceActions";

const uri = "ws://stocks.mnet.website";
let stockSocket;
window.closeConnection = () => stockSocket.close();

class App extends Component {
  constructor() {
    super();
    this.state = {
      stocks: StockPriceStore.getAll(),
      sortFn: () => {}
    };
    console.log(Object.keys(this.state.stocks).length);
  }

  openConnection() {
    stockSocket = new WebSocket(uri, {
      rejectUnauthorized: false
    });
    this.getStockPrices();
  }

  closeConnection() {
    stockSocket.close();
  }

  getStockPrices() {
    stockSocket.onmessage = event => {
      StockPriceActions.reloadStocks(event.data);
    };
  }

  sortByName(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }

  sortByPrice(a, b) {
    return this[b].price - this[a].price;
  }

  sortByTime(a, b) {
    return Date.parse(this[a].time) - Date.parse(this[b].time) > 0
      ? -1
      : Date.parse(this[a].time) - Date.parse(this[a].time) < 0
      ? 1
      : 0;
  }

  createStockTable(data) {
    return Object.keys(data)
      .sort(this.state.sortFn.bind(data))
      .map((key, i) => {
        return (
          <tr
            data-key={i}
            key={i}
            className={
              data[key].base
                ? "bg-success text-white"
                : data[key].base === null
                ? "text-dark"
                : "bg-danger text-white"
            }
          >
            <td className="text-center">{data[key].name}</td>
            <td className="text-center">{data[key].price.toFixed(2)}</td>
            <td className="text-center">{data[key].time.slice(0, 24)}</td>
          </tr>
        );
      });
  }

  componentWillMount() {
    StockPriceStore.on("stockChange", () => {
      console.log("New batch of stocks!", StockPriceStore.getAll());
      this.setState({
        stocks: StockPriceStore.getAll()
      });
    });
  }

  render() {
    const StockTable = this.createStockTable(this.state.stocks);
    const AskToLoad = (
      <tr>
        <td className="text-center text-info" colSpan="3">
          Click open to load stream.
        </td>
      </tr>
    );

    return (
      <div>
        <div className="container p-2">
          <div className="d-flex justify-content-between">
            <div>
              <a href="#" onClick={this.openConnection.bind(this)}>
                Open Stream
              </a>
            </div>
            <div>
              <a href="#" onClick={this.closeConnection.bind(this)}>
                Close Stream
              </a>
            </div>
          </div>
          <table className="table mt-2">
            <thead>
              <tr>
                <th className="text-center">
                  <a
                    href="#"
                    onClick={e => this.setState({ sortFn: this.sortByName })}
                  >
                    Name
                  </a>
                </th>
                <th className="text-center">
                  <a
                    href="#"
                    onClick={e => this.setState({ sortFn: this.sortByPrice })}
                  >
                    Price
                  </a>
                </th>
                <th className="text-center">
                  <a
                    href="#"
                    onClick={e => this.setState({ sortFn: this.sortByTime })}
                  >
                    Last Updated
                  </a>
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(this.state.stocks).length === 0
                ? AskToLoad
                : StockTable}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
