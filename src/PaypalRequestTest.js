import React, { Component } from "react";
import axios from "axios";
import querystring from "querystring";

export default class PaypalRequestTest extends Component {
  constructor() {
    super();
    this.PAYPAL_OAUTH_API = "https://api-m.sandbox.paypal.com/v1/oauth2/token/";
    this.PAYPAL_ORDER_API =
      "https://api-m.sandbox.paypal.com/v2/checkout/orders/";

    this.PAYPAL_CLIENT =
      "ARzxYVkymOZ1FrSzyd9mXssEi3fdEXgcxPtCKEAxL0AGjljKR5-M3yutbf4kFP66kuCGqtpWHc9Q0K-q";
    this.PAYPAL_SECRET =
      "EBShUKGylJoUKun_fZdQi5ty6pDmTilVyYMS-R88O0X3lYo3qY4Nj-8252qNUiGrd_qeAmlIT_meDX11";
    this.basicAuth = Buffer.from(
      `${this.PAYPAL_CLIENT}:${this.PAYPAL_SECRET}`,
      "utf8"
    ).toString("base64");
  }

  render() {
    console.clear();
    return <div></div>;
  }

  componentDidMount() {
    axios
      .post(
        this.PAYPAL_OAUTH_API,
        querystring.stringify({ grant_type: "client_credentials" }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${this.basicAuth}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("Access Token OK.");
          // this.sendOrder(response.data.access_token);
        }
        console.log("------------------");
      });
  }

  sendOrder(token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    let data = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "1.00",
          },
          payee: {
            email_address: "sb-leczz4905902@business.example.com",
          },
        },
      ],
    };

    // let data = {};

    axios.post(this.PAYPAL_ORDER_API, data, config);
  }
}
