import React, { Component } from "react";
import { ImageBackground, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

// NativeBase Components
import {
  List,
  ListItem,
  Card,
  CardItem,
  Button,
  Thumbnail,
  Text,
  Left,
  Content,
  Icon
} from "native-base";

// Style
import styles from "./styles";

class CoffeeList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Coffee List",
    headerLeft: null,
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

  handlePress(shop) {
    this.props.navigation.navigate("CoffeeDetail", {
      shop: shop
    });
  }

  componentDidMount() {
    this.props.navigation.setParams({ length: this.props.cart.length });
  }

  renderItem(shop) {
    return (
      <TouchableOpacity key={shop.id} onPress={() => this.handlePress(shop)}>
        <ImageBackground
          source={{ uri: shop.background }}
          style={styles.background}
        >
          <View style={styles.overlay} />
          <ListItem style={styles.transparent}>
            <Card style={styles.transparent}>
              <CardItem style={styles.transparent}>
                <Left>
                  <Thumbnail
                    bordered
                    source={{ uri: shop.img }}
                    style={styles.thumbnail}
                  />
                  <Text style={styles.text}>{shop.name}</Text>
                  <Text note style={styles.text}>
                    {shop.distance}
                  </Text>
                </Left>
              </CardItem>
            </Card>
          </ListItem>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
  render() {
    const { coffeeshops } = this.props.coffee;
    let ListItems;
    if (coffeeshops) {
      ListItems = coffeeshops.map(shop => this.renderItem(shop));
    }
    return (
      <Content>
        <List>{ListItems}</List>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  coffee: state.coffee,
  cart: state.cart.list
});

export default connect(
  mapStateToProps,
  {}
)(CoffeeList);
