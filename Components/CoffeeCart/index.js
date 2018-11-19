import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../store/actions";

// NativeBase Components
import {
  Text,
  Left,
  Body,
  Right,
  List,
  Button,
  ListItem,
  Icon
} from "native-base";

class CoffeeCart extends Component {
  checkout() {
    this.props.checkout(), alert("Thank you! Enjoy your drink");
  }
  renderItem(item, index) {
    return (
      <ListItem key={index}>
        <Left>
          <Text style={{ color: "white", marginLeft: 16 }}> {item.drink} </Text>
          <Text note style={{ marginLeft: 16 }}>
            {item.option}
          </Text>
        </Left>
        <Body>
          <Text style={{ color: "white" }}>{item.quantity}</Text>
        </Body>
        <Right>
          <Button transparent onPress={() => this.props.removeItem(item)}>
            <Icon name="trash" style={{ color: "white", fontSize: 21 }} />
          </Button>
        </Right>
      </ListItem>
    );
  }

  render() {
    const { list } = this.props.cart;
    return (
      <List>
        {list.map((item, index) => this.renderItem(item, index))}
        <Button full danger onPress={() => this.checkout()}>
          <Text>Checkout</Text>
        </Button>
      </List>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

const mapActionToProps = dispatch => {
  return {
    removeItem: item => dispatch(actionCreators.removeItemFromCart(item)),
    checkout: () => dispatch(actionCreators.checkoutCart())
  };
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(CoffeeCart);
