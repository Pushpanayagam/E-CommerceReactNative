import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, Text, Image } from "react-native";
import api from "../api";

export default function ProductListScreen({ navigation }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data.data));
  }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Detail", { id: item._id })}
        >
          <View style={{ padding: 15, borderBottomWidth: 1 }}>
            <Text>${item._id}</Text>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Text>${item.price}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
