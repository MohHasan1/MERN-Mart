import express from "express";
import dotenv from "dotenv";
//import products from "./data/products.js"; // For testing...
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import connectDB from "./config/db.js";
import productRoutes from './routes/productRoutes.js';


dotenv.config();
const app = express();

//Connect to Mongo database:
connectDB();

app.get('/', (req, res) => { 
    res.send(" Testing Api successfull ");
});

//ROUTES MIDDLEWARE:
app.use('/api/products', productRoutes);

// ERROR HANDLER MIDDLEWARE:
app.use(notFound);
app.use(errorHandler);


// Port and listens
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port number ${port}`))



