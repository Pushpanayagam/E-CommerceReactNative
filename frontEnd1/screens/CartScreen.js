import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, TouchableOpacity, Alert } from "react-native";
import client from "../api";

export default function CartScreen({ navigation }) {
  const [cart, setCart] = useState(null);

  const load = async () => {
    const r = await client.get("/cart");
    setCart(r.data);
  };

  useEffect(() => {
    const unsub = navigation.addListener("focus", load);
    load();
    return unsub;
  }, [navigation]);

  // ⭐ REMOVE ITEM FUNCTION
  const removeItem = async (productId) => {
    try {
      // If your backend uses DELETE
      // const r = await client.delete(`/cart/remove/${productId}`);

      // If your backend uses POST (most common)
      const r = await client.post("/cart/remove", { productId });

      Alert.alert("Removed", "Item removed from cart");
      load(); // refresh cart

    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Server error");
    }
  };

  const placeOrder = async () => {
    const r = await client.post("/orders/place");
    navigation.navigate("Confirmation", { order: r.data.order });
  };

  if (!cart) return <View><Text>Loading cart...</Text></View>;

  const total = cart.items.reduce((s,i) => s + (i.product?.price || 0) * i.qty, 0);

  return (
    <View style={{ padding: 16 }}>
      
      <FlatList
        data={cart.items}
        keyExtractor={i => i.product._id}
        renderItem={({ item }) => (
          <View style={{ padding: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            
            <Text style={{ width: "70%" }}>
              {item.product.name} x {item.qty} — Rs. {item.product.price * item.qty}
            </Text>

            {/* ⭐ REMOVE BUTTON */}
            <TouchableOpacity
              onPress={() => removeItem(item.product._id)}
              style={{ backgroundColor: "red", padding: 6, borderRadius: 6 }}
            >
              <Text style={{ color: "white" }}>Remove</Text>
            </TouchableOpacity>

          </View>
        )}
      />

      <Text style={{ fontWeight: "bold", marginVertical: 8 }}>Total: Rs. {total}</Text>

      <Button title="Place Order" onPress={placeOrder} disabled={cart.items.length === 0} />

    </View>
  );
}
