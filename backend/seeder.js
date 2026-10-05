import dotenv from "dotenv";

import users from "./data/users.js";
import products from "./data/products.js";

import User from "./models/userModel.js";

import Order from "./models/orderModel.js";

import connectDB from "./config/db.js";
import Product from "./models/productModel.js";

//To access the .env file
dotenv.config();

// Connect to database:
connectDB();

// import:
const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // store user in db (sets a unique _id):
    const createUsers = await User.insertMany(users);

    // add admin _id to each product:
    const adminUser = createUsers[0]._id;
    const sampleProducts = products.map((p) => {
      return { ...p, user: adminUser };
    });

    // add products to the db:
    await Product.insertMany(sampleProducts);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".blue.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] == "-d") {
  destroyData();
} else {
  importData();
}
