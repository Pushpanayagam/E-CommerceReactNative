import React, { useEffect, useState } from "react";
import { View, Text, Image, Button,ActivityIndicator, Alert,TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import api from "../api";
import CartScreen from "./CartScreen";
import { Ionicons } from "@expo/vector-icons";
export default function ProductDetailScreen({ route,navigation }) {
  const { id } = route.params;
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get(`/products/${id}`).then(res => {setProduct(res.data.data);setLoading(false);})
    .catch(err => {
      console.log(err);
      setLoading(false);
    });
  }, []);

// Add to Cart Function
const handleAddToCart = async () => {
  try {
    const res = await api.post("/cart/add", { productId: id, qty: 1 });

    if (res.data.success) {
      Alert.alert("Success", "Product added to cart!");
    } else {
      Alert.alert("Error", "Failed to add to cart.");
    }

  } catch (error) {
    console.log(error);
    Alert.alert("Error", "Server error while adding to cart.");
  }
};

if (loading) {
  return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
}



  if (!product) return null;

  return (
    <View style={{ flex: 1 }}>
    {/* Header Cart Icon */}
    <View style={{ flexDirection: "row", justifyContent: "flex-end", padding: 10 }}>
      <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
        
        <Ionicons name="cart-outline" size={30} color="black" />
      </TouchableOpacity>
    </View>

    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>{product.name}</Text>
      <Image source={{ uri: product.image }} style={{ width: 200, height: 200 }} />

      <Text style={{ marginTop: 10 }}>{product.description}</Text>

      <Button title="Add to Cart" onPress={handleAddToCart} color="green" />
    </View>
  </View>
  );
}
