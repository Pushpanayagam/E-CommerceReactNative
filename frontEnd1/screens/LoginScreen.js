import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "../api";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const login = async () => {
    try {
      const res = await client.post("/auth/login", { email, password });
      await AsyncStorage.setItem("token", res.data.token);
      navigation.replace("Products");
    } catch (e) {
      setErr(e.response?.data?.message || "Login failed");
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      {err ? <Text style={{ color: "red" }}>{err}</Text> : null}
      <Button title="Login" onPress={login} />
    </View>
  );
}
