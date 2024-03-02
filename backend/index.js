import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import connectDB from "./config/db.js";
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoute.js';

dotenv.config();
const app = express();

//Connect to Mongo database:
connectDB();


//Body parser Middleware:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookie parser Middleware:
app.use(cookieParser());


app.get('/', (req, res) => { 
    res.send(" Testing Api successfull ");
});

//ROUTES MIDDLEWARE:
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.get('/api/config/paypal', (req, res) => res.send({clientId: process.env.PAYPAL_CLIENT_ID}))

// ERROR HANDLER MIDDLEWARE:
app.use(notFound);
app.use(errorHandler);


// Port and listens
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port number ${port}`))



