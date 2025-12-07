import React from "react";
import { View, Text, Button } from "react-native";

export default function PurchaseConfirmationScreen({ route, navigation }) {
  const { order } = route.params;
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Order Confirmed</Text>
      <Text>Order ID: {order._id}</Text>
      <Text>Total: Rs. {order.total}</Text>
      <Button title="Back to Products" onPress={() => navigation.navigate("Products")} />
    </View>
  );
}
