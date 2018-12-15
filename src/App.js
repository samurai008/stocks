import React, { Component } from "react";
import "./App.css";
import StockPriceStore from "./store/StockPriceStore";
import * as StockPriceActions from "./actions/StockPriceActions";
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import StockModal from "./components/StockModal";

const uri = "wss://livestocks5.herokuapp.com";
let stockSocket;
window.closeConnection = () => stockSocket.close();

class App extends Component {
  constructor() {
    super();
    this.state = {
      stocks: StockPriceStore.getAll(),
      sortFn: () => {},
      mockPrices: [
        '12.2',
        '233.2',
        '22.21',
        '65.75'
      ],
      stockModalData: {},
      showStockModal: false
    };
  }

  openConnection() {
    stockSocket = new WebSocket(uri);
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
        let element = document.querySelector('a[data-name="' + key + '"]')

        return (
          <tr data-key={i} key={i}>
            <td className="text-center"><a href="#" onClick={e => this.showStockModal(data[key])} data-name={key}>{data[key].name}</a></td>
            <td
              className={
                data[key].base
                  ? "bg-success text-white text-center"
                  : data[key].base === null
                  ? "text-dark"
                  : "bg-danger text-white text-center"
              }
            >
              {data[key].price.toFixed(2)}
            </td>
            <td className="text-center">{data[key].time.slice(0, 24)}</td>
          </tr>
        );
      });
  }

  showStockModal(data) {
    this.setState({
      stockModalData: data,
      showStockModal: !this.state.showStockModal
    })
  }

  diffInfo(base) {
    return base ? "On the rise!" : "On the low";
  }

  closeModal() {
    this.setState({
      showStockModal: !this.state.showStockModal
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

  componentDidMount() {
  }

  render() {
    const backdropStyle = {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.7)"
    }

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

        <StockModal showModal={this.state.showStockModal} data={this.state.stockModalData} closeFn={this.closeModal.bind(this)} />

        <div style={backdropStyle} className={!this.state.showStockModal ? "d-none" : ""}></div>
      </div>
    );
  }
}

export default App;
