import React from "react";
import PaypalButton from "./Paypal/PaypalButton";
import "./PaypalForm.css";

export default class PayPalForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkout: false,
      sum: "",
      currency: "",
      recipient: "recipient@yahoo.com",
    };

    this.handleSumChange = this.handleSumChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleRecipientChange = this.handleRecipientChange.bind(this);
  }

  handleSumChange(event) {
    this.setState({
      sum: event.target.value,
    });
  }

  handleCurrencyChange(event) {
    this.setState({
      currency: event.target.value,
    });
    window.curr = event.target.value;
    console.log(window.curr);
  }

  handleRecipientChange(event) {
    this.setState({
      recipient: event.target.value,
    });
  }

  render() {
    let formJSX = (
      <div id="Payments">
        <form>
          <label>Sum:</label>
          <input
            id="sumToBeSent"
            type="text"
            value={this.state.sum || ""}
            onChange={this.handleSumChange}
          />
          <br></br>
          <label>Currency: </label>
          <input
            id="currencyUsed"
            type="text"
            value={this.state.currency || ""}
            onChange={this.handleCurrencyChange}
          />
          <br></br>
          <label>Email: </label>
          <input
            id="recipientEmail"
            type="text"
            value={this.state.recipient || ""}
            onChange={this.handleRecipientChange}
          />
          <br></br>
          <button
            type="Submit"
            onClick={() => {
              this.setState({ checkout: true });
            }}
          >
            Continue
          </button>
        </form>
      </div>
    );

    return (
      <div>
        {this.state.checkout ? (
          <div id="Payments">
            <PaypalButton
              amount={this.state.sum}
              selectedCurrency={this.state.currency}
              payee={this.state.recipient}
            />
          </div>
        ) : (
          formJSX
        )}
      </div>
    );
  }
}
