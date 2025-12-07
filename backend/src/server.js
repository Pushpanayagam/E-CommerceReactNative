import app from "./app.js"; 
import dotenv from "dotenv";
import Product from "./models/product.model.js"

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 