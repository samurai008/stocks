import React, { Component } from "react";
import "./App.css";
import StockPriceStore from "./store/StockPriceStore";
import * as StockPriceActions from "./actions/StockPriceActions";
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import StockModal from "./components/StockModal";
import StockList from "./components/StockList";

const uri = "wss://livestocks5.herokuapp.com";
let stockSocket;
window.closeConnection = () => stockSocket.close(); // From the console BO

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
      showStockModal: false,
      sKey: null
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



  showStockModal(data, key) {
    this.setState({
      stockModalData: data,
      showStockModal: !this.state.showStockModal,
      sKey: key
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

          <StockList stocks={this.state.stocks} stockModalFn={this.showStockModal.bind(this)} />

        </div>

        <StockModal showModal={this.state.showStockModal} data={this.state.stockModalData} 
        closeFn={this.closeModal.bind(this)}
        sKey={this.state.sKey} />

        <div style={backdropStyle} className={!this.state.showStockModal ? "d-none" : ""}></div>
      </div>
    );
  }
}

export default App;
