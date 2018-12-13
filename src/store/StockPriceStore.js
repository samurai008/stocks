import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/dispatcher';

class StockPriceStore extends EventEmitter {
	constructor() {
		super();
		this.stocks = [];
		this.stockDict = {}
	}

	reloadStocks(data) {
		let stockData = eval(data);
		stockData.forEach(val => {
			val = val.concat(new Date().toString());
			this.stockDict[val[0]] = { name: val[0], price: val[1], time: val[2] };
        	console.log(val, this.stockDict[val[0]]);
			// return Object.assign(this.stockDict[val[0]], {name: val[0], price: val[1], time: val[2]});
		});
		// console.log(this.stockDict);
		this.stocks = this.stocks.concat(stockData);
		this.emit('stockChange');
	}

	handleActions(action) {
		switch(action.type) {
			case 'RELOAD_STOCKS':
				this.reloadStocks(action.stocks);
				break;
		}
	}

	getAll() {
		return this.stocks;
	}
}

const stockPriceStore = new StockPriceStore;
dispatcher.register(stockPriceStore.handleActions.bind(stockPriceStore));
export default stockPriceStore;