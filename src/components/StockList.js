import React, { Component } from "react";

class StockList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stocks: props.stocks,
      sortFn: () => { },
      stockModalFn: props.stockModalFn
    }
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
    return data ? Object.keys(data)
      .sort(this.state.sortFn.bind(data))
      .map((key, i) => {
        return (
          <tr data-key={i} key={i}>
            <td className="text-center">
              <a
                href="#"
                onClick={e => this.state.stockModalFn(data[key], key)}
                data-name={key}
              >
                {data[key].name}
              </a>
            </td>
            <td
              className={
                data[key].base
                  ? "bg-success text-white text-center"
                  : data[key].base === null
                  ? "text-dark text-center"
                  : "bg-danger text-white text-center"
              }
            >
              {data[key].price.toFixed(2)}
            </td>
            <td className="text-center">{data[key].time.slice(0, 24)}</td>
          </tr>
        );
      }) : (<tr>
        <td>Loading data</td>
      </tr>);
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
    );
  }
}

export default StockList;