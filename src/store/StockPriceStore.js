import { EventEmitter } from "events";
import dispatcher from "../dispatcher/dispatcher";

class StockPriceStore extends EventEmitter {
  constructor() {
    super();
    this.stockDict = {};
  }

  reloadStocks(data) {
    // val[0] = name
    // val[1] = price
    // val[2] = time
    let stockData = eval(data);

    stockData.forEach(val => {
      let base = null; // false = low, true = high
      let pastPrices = [];
      val = val.concat(new Date().toString());
      if (this.stockDict[val[0]]) {
        pastPrices = this.stockDict[val[0]].pastPrices;
        base = this.stockDict[val[0]].price < val[1] ? true : false;
      }
      pastPrices.push(val[1]);
      this.stockDict[val[0]] = {
        name: val[0],
        price: val[1],
        time: val[2],
        base: base,
        pastPrices: pastPrices
      };
    });
    this.emit("stockChange");
  }

  handleActions(action) {
    switch (action.type) {
      case "RELOAD_STOCKS":
        this.reloadStocks(action.stocks);
        break;
    }
  }

  getAll() {
    return this.stockDict;
  }
}

const stockPriceStore = new StockPriceStore();
dispatcher.register(stockPriceStore.handleActions.bind(stockPriceStore));
export default stockPriceStore;
