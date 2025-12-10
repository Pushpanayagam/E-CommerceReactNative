import React, { useState } from "react";
import { View, TextInput, Button, Text,TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
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

  return (<SafeAreaView style={{ flex: 1, backgroundColor: "#f6f4e9" }}>
    <ScrollView contentContainerStyle={styles.container}>
    
      {/* Top Red Curved Header */}
      <Svg
        height="180"
        width="100%"
        viewBox="0 0 1440 320"
        style={styles.svgStyle}
      >
        <Path
          fill="#A52222"     // ← maroon color
          d="M0,64L80,80C160,96,320,128,480,133.3C640,139,800,117,960,106.7C1120,96,1280,96,1360,96L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        />
      </Svg>

{/* Palm Tree Image */}
<Image
    source={require("../assets/palmarass.png")}
    style={styles.palmImage}
    resizeMode="contain"
  />
  {/* Welcome Text */}
  <Text style={styles.welcome}>Welcome to</Text>
  <Text style={styles.title}>Eraddai Panai</Text>

  {/* Login Now */}
  <Text style={styles.loginNow}>Login Now</Text>

  {/* Username */}
  <Text style={styles.label}>User Name</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter username"
    value={email} onChangeText={setEmail} keyboardType="email-address"
  />

{/* Password */}
<Text style={styles.label}>Password</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter password"
    value={password} onChangeText={setPassword} secureTextEntry 
  />
{err ? <Text style={{ color: "red" }}>{err}</Text> : null}
  {/* Forgot Password */}
  <TouchableOpacity style={{ alignSelf: "flex-end", marginRight: 35 }}>
    <Text style={styles.forgot}>Forget password</Text>
  </TouchableOpacity>

  {/* Sign Up */}
  <View style={styles.signupRow}>
    <Text>Don’t have an account </Text>
    <TouchableOpacity>
      <Text style={styles.signup}>SignUp</Text>
    </TouchableOpacity>
  </View>

{/* Login Button */}
<TouchableOpacity style={styles.loginButton}onPress={login}>
    <Text style={styles.loginText}>Login</Text>
  </TouchableOpacity>

  {/* Social Login */}
  <Text style={styles.orSign}>Or Sign in with</Text>

  <View style={styles.socialRow}>
    <Image source={require("../assets/facebook.jpg")} style={styles.socialIcon} />
    <Image source={require("../assets/google.png")} style={styles.socialIcon} />
    <Image source={require("../assets/xtu.png")} style={styles.socialIcon} />
  </View>



    </ScrollView>
    </SafeAreaView>
    );
    }
    
    const styles = StyleSheet.create({
    container: {
    alignItems: "center",
    paddingBottom: 40,
    },
    
    svgStyle: {
      position: "absolute",
      top: 0,
      left: 0,
    },

    headerCurve: {
    backgroundColor: "#b3211f",
    height: 130,
    width: "100%",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    position: "absolute",
    top: 0,
    },
    
    palmImage: {
    width: 120,
    height: 150,
    marginTop: 60,
    },
    
    welcome: {
    fontSize: 22,
    marginTop: 10,
    color: "#ff5c33",
    fontWeight: "700",
    textShadowColor: "#00000040",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    },
    
    title: {
    fontSize: 24,
    color: "#ff5c33",
    fontWeight: "800",
    textShadowColor: "#00000040",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    },
    
    loginNow: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
    },
    
    label: {
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    alignSelf: "center",
   
    marginTop: 20,
    },
    
    input: {
    width: "80%",
    height: 45,
    backgroundColor: "#fff7cc",
    borderWidth: 1,
    borderColor: "#e6b26a",
    borderRadius: 6,
    alignSelf: "center",
    paddingHorizontal: 15,
    marginTop: 10,
    },
    
    forgot: {
    fontSize: 14,
    color: "black",
    marginTop: 8,
    },
    
    signupRow: {
    flexDirection: "row",
    marginTop: 15,
    },
    
    signup: {
    color: "purple",
    fontWeight: "700",
    },
    
    loginButton: {
    width: "50%",
    backgroundColor: "#7d6250",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    },
    
    loginText: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
    fontWeight: "700",
    },
    
    orSign: {
    marginTop: 20,
    },
    
    socialRow: {
    flexDirection: "row",
    marginTop: 10,
    },
    
    socialIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 8,
    },
    });
    
    
    
    