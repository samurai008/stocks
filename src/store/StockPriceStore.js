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
		let stockDictLocal = {};
		stockData.forEach(val => {
			val = val.concat(new Date().toString());
			// if (this.stockDict[val[0]]) {
			// 	console.log('Changing stock data', this.stockDict[val[0]])
			// }
			stockDictLocal[val[0]] = {
				name: val[0], 
				price: val[1], 
				time: val[2]
			};
		});
		this.stockDict = Object.assign(this.stockDict, stockDictLocal);
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
		return this.stockDict;
	}
}

const stockPriceStore = new StockPriceStore;
dispatcher.register(stockPriceStore.handleActions.bind(stockPriceStore));
export default stockPriceStore;