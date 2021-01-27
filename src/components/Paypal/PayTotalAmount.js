import React, { useRef, useEffect } from "react";
import "./PayTotalAmount.css";

export default function PayTotalAmount() {
  const paypal = useRef();

  //dummy
  let totalAmount = 100.12;
  let productDescription = "";

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: productDescription,
                amount: {
                  currency_code: "AUD",
                  value: totalAmount,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          if (order.status === "COMPLETE") {
            console.log(order.status);
          }
        },
        onError: (err) => {
          console.err(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <form>
        <input
          id="totalAmount"
          type="text"
          disabled
          value={totalAmount}
          style={{ textAlign: "right", width: "100px", height: "25px" }}
        ></input>
      </form>
      <br></br>
      <div ref={paypal}></div>
    </div>
  );
}
