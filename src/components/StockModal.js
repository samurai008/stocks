import React, { Component } from "react";
import StockPriceStore from "../store/StockPriceStore";

class StockModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentWillMount() {
    StockPriceStore.on("stockChange", () => {
      console.log("New batch of stocks!", StockPriceStore.getAll()[this.props.sKey]);
      this.setState({
        data: StockPriceStore.getAll()[this.props.sKey]
      })
    });
  }

  render() {
    const modalStyle = {
      position: "fixed",
      top: "50%",
      left: "50%",
      width: "50%",
      transform: "translateX(-50%) translateY(-50%)",
      minHeight: "400px",
      maxHeight: "70%",
      overflowY: "scroll",
      zIndex: 1
    };

    let displayPrices = (<div>Nothing to display!</div>);

    if (this.state.data !== null && this.state.data !== undefined) {
      console.log('enter', this.state.data);
      let listPrices = this.state.data.pastPrices || [];
      displayPrices = listPrices.map((value, i) => {
        console.log(this.props.data.base);
        return (
          <li
            key={i}
            className={i === this.state.data.pastPrices.length - 1 ? "font-weight-bold" : "font-weight-light"}
          >
            
            {value} {i === this.state.data.pastPrices.length - 1 ? (
              this.state.data.base ? (
                <i className="fas fa-arrow-up text-success" />
              ) : (
                <i className="fas fa-arrow-down text-danger" />
              )
            ) : (
              ""
            )}
          </li>
        );
      }).reverse();
    }

    return (
      <div
        style={modalStyle}
        className={!this.props.showModal ? "d-none" : "bg-light p-2 container"}
      >
        <div className="d-flex justify-content-between">
          <div>
            <h3>{this.props.data.name}</h3>
          </div>
          <div>
            <button className="btn" onClick={this.props.closeFn}>
              Close
            </button>
          </div>
        </div>
        <ul className="list-unstyled">{displayPrices}</ul>
      </div>
    );
  }
}

export default StockModal;
