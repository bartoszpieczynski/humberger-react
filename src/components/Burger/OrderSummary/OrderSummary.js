import React from "react";
import Wrapper from "../../../hoc/Wrapper";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
   const ingredientSummary = Object.keys(props.ingredients).map(ingKey => {
      return (
         <li key={ingKey}>
            <span style={{ textTransform: "capitalize" }}>{ingKey}</span> :{" "}
            {props.ingredients[ingKey]}
         </li>
      );
   });
   return (
      <Wrapper>
         <h3>Your Order</h3>
         <p>A delicious burger with the following ingredients:</p>
         <ul>{ingredientSummary}</ul>
         <p>Total Price: {props.price.toFixed(2)}$</p>
         <p>Continue to checkout?</p>
         <Button btnType="Danger" clicked={props.purchaseCanceled}>
            Cancel
         </Button>
         <Button btnType="Success" clicked={props.purchaseContinued}>
            Continue
         </Button>
      </Wrapper>
   );
};

export default orderSummary;
