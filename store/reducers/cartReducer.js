// Types
import * as actionTypes from "../actions/types";
const initialState = {
  list: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_ITEM:
      let drink = state.list.find(
        item =>
          item.drink === action.payload.drink &&
          item.option === action.payload.option
      );
      console.log(drink);
      if (drink) {
        drink.quantity++;
      } else {
        state.list.push(action.payload);
      }
      return {
        ...state
      };
    case actionTypes.REMOVE_ITEM:
      return {
        ...state,
        list: state.list.filter(item => item !== action.payload)
      };
    case actionTypes.CHECKOUT:
      return {
        ...state,
        list: []
      };
    default:
      return state;
  }
}
