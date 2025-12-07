import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const client = axios.create({
    baseURL:"http://192.168.8.135:3000/api" // replace with your backend URLcd
});

client.interceptors.request.use(async config => {
    const token = await AsyncStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
export default client;