import React, { Component } from "react";
import Wrapper from "../../hoc/Wrapper";
import axios from '../../axios-orders';

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
   salad: 0.5,
   cheese: 0.4,
   meat: 1.3,
   bacon: 0.7
};

class BurgerBuilder extends Component {
   state = {
      ingredients: {
         salad: 0,
         bacon: 0,
         cheese: 0,
         meat: 0
      },
      totalPrice: 4,
      purchaseble: false,
      purchasing: false,
      loading: false
   };

   updatePurchaseState (ingredients) {
      const sum = Object.keys(ingredients)
                  .map(igKey => {
                     return ingredients[igKey];
                  })
                  .reduce( (sum, el) => {
                     return sum + el;
                  }, 0 );
                  this.setState( {purchaseble: sum > 0} );
   }

   addIngredientHandler = type => {
      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount + 1;

      const updatedIngredients = {
         ...this.state.ingredients
      };

      updatedIngredients[type] = updatedCount;
      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice + priceAddition;
      this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
      this.updatePurchaseState(updatedIngredients);
   };

   removeIngredientHandler = type => {
      const oldCount = this.state.ingredients[type];
      if (oldCount <= 0) {
         return;
      }
      const updatedCount = oldCount - 1;

      const updatedIngredients = {
         ...this.state.ingredients
      };

      updatedIngredients[type] = updatedCount;
      const priceDeduction = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceDeduction;
      this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
      this.updatePurchaseState(updatedIngredients);
   };

   purchaseHandler =  () => {
      this.setState({purchasing: true});
   }

   purchaseCancelHandler = () => {
      this.setState( {purchasing: false} );
   }

   purchaseContinueHandler = () => {
      this.setState({loading: true});
      const order = {
         ingredients: this.state.ingredients,
         price: this.state.totalPrice,
         customer: {
            name: 'My Name',
            address: {
               street: 'Random 1',
               zipCode: '51251',
               country: 'Poland'
            },
            email: 'test@test.com'
         },
         deliveryMethod: 'fastest'
      }
      axios.post('/orders.json', order)
         .then(response => {
            this.setState({ loading: false, purchasing: false });
         })
         .catch(error => {
            this.setState({ loading: false, purchasing: false });
         });
   }

   render() {
      const disabledInfo = {
         ...this.state.ingredients
      };
      for (let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <= 0;
      }
      let orderSummary =                <OrderSummary
      ingredients={this.state.ingredients}
      purchaseCanceled={this.purchaseCancelHandler}
      purchaseContinued={this.purchaseContinueHandler}
      price={this.state.totalPrice}
       />;
      if (this.state.loading) {
         orderSummary = <Spinner />;
      }
      return (
         <Wrapper>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            {orderSummary}
            </Modal>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls
               ingredientAdded={this.addIngredientHandler}
               ingredientRemoved={this.removeIngredientHandler}
               disabled={disabledInfo}
               price={this.state.totalPrice}
               purchaseble={this.state.purchaseble}
               ordered={this.purchaseHandler}
            />
         </Wrapper>
      );
   }
}

export default BurgerBuilder;