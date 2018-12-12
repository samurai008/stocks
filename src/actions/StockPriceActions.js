import dispatcher from "../dispatcher/dispatcher";

export function reloadStocks(data) {
	dispatcher.dispatch({
		type: 'RELOAD_STOCKS',
		stocks: data
	})
}