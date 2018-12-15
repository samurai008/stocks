import React, { Component } from "react";

class StockModal extends Component {
  constructor(props) {
    super(props);
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

    let listPrices = this.props.data.pastPrices || [];
    const displayPrices = listPrices.reverse().map((value, i) => {
      console.log(this.props.data.base);
      return (
        <li
          key={i}
          className={i === 0 ? "font-weight-bold" : "font-weight-light"}
        >
          {value}{" "}
          {i === 0 ? (
            this.props.data.base ? (
              <i class="fas fa-arrow-up" />
            ) : (
              <i class="fas fa-arrow-down" />
            )
          ) : (
            ""
          )}
        </li>
      );
    });

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
