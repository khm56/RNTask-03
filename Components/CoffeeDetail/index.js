import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../store/actions";

// NativeBase Components
import {
  Thumbnail,
  Text,
  Button,
  Left,
  Body,
  Right,
  Icon,
  List,
  ListItem,
  Picker,
  Content
} from "native-base";

// Style
import styles from "./styles";
import { bindActionCreators } from "redux";

class CoffeeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drink: "Coffee",
      option: "Small"
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("shop", {}).name,
    headerRight: (
      <Button
        light
        transparent
        onPress={() => navigation.navigate("CoffeeCart")}
      >
        <Text>
          {navigation.getParam("length")}
          <Icon
            type="FontAwesome"
            name="coffee"
            style={{ color: "white", fontSize: 15 }}
          />
        </Text>
      </Button>
    )
  });

  changeDrink(value) {
    this.setState({
      drink: value
    });
  }

  changeOption(value) {
    this.setState({
      option: value
    });
  }

  addToCart() {
    let item = {
      drink: this.state.drink,
      option: this.state.option,
      quantity: 1
    };
    this.props.addItem(item);
    this.props.navigation.setParams({ length: this.props.cart.length });
  }

  componentDidMount() {
    this.props.navigation.setParams({ length: this.props.cart.length });
  }
  componentDidUpdate() {
    if (this.props.navigation.getParam("length") !== this.props.cart.length) {
      this.props.navigation.setParams({ length: this.props.cart.length });
    }
  }

  render() {
    const coffeeshop = this.props.navigation.getParam("shop", {});
    return (
      <Content>
        <List>
          <ListItem style={styles.top}>
            <Left>
              <Text style={styles.text}>
                {coffeeshop.name + "\n"}
                <Text note>{coffeeshop.location}</Text>
              </Text>
            </Left>
            <Body />
            <Right>
              <Thumbnail bordered source={{ uri: coffeeshop.img }} />
            </Right>
          </ListItem>
          <ListItem style={{ borderBottomWidth: 0 }}>
            <Left>
              <Picker
                note
                mode="dropdown"
                style={{ width: 150 }}
                selectedValue={this.state.drink}
                onValueChange={this.changeDrink.bind(this)}
              >
                <Picker.Item label="Coffee" value="Coffee" />
                <Picker.Item label="Lattee" value="Lattee" />
                <Picker.Item label="Espresso" value="Espresso" />
              </Picker>
            </Left>
            <Body>
              <Picker
                note
                mode="dropdown"
                style={{ width: 150 }}
                selectedValue={this.state.option}
                onValueChange={this.changeOption.bind(this)}
              >
                <Picker.Item label="Small" value="Small" />
                <Picker.Item label="Medium" value="Medium" />
                <Picker.Item label="Large" value="Large" />
              </Picker>
            </Body>
          </ListItem>
          <Button full danger onPress={() => this.addToCart()}>
            <Text>Add</Text>
          </Button>
        </List>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart.list
});

const mapActionToProps = dispatch => {
  return {
    addItem: item => dispatch(actionCreators.addItemToCart(item))
  };
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(CoffeeDetail);
