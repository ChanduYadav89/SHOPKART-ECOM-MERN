import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./Config/db.js";
import Order from "./Models/orderModel.js";
import Product from "./Models/productModel.js";
import User from "./Models/userModel.js";

dotenv.config();

const users = [
  {
    name: "Admin User",
    email: "admin@shopkart.com",
    password: "admin123",
    role: "admin",
    verified: true
  },
  {
    name: "Chandan Kumar",
    email: "chandan@example.com",
    password: "user123",
    role: "user",
    verified: true
  },
  {
    name: "Priya Sharma",
    email: "priya@example.com",
    password: "user123",
    role: "user",
    verified: true
  }
];

const products = [
  {
    name: "Nike Running Shoes",
    description: "Lightweight running shoes for daily training and gym workouts.",
    price: 2499,
    category: "Shoes",
    stock: 25,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    ratings: 4.5,
    numReviews: 18
  },
  {
    name: "Cotton T-Shirt",
    description: "Comfortable regular-fit cotton t-shirt for everyday wear.",
    price: 699,
    category: "Clothing",
    stock: 50,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    ratings: 4.2,
    numReviews: 12
  },
  {
    name: "Smart Watch",
    description: "Fitness smartwatch with heart rate monitor and activity tracking.",
    price: 3999,
    category: "Electronics",
    stock: 15,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    ratings: 4.7,
    numReviews: 30
  },
  {
    name: "Travel Backpack",
    description: "Durable backpack with laptop compartment and water resistant fabric.",
    price: 1599,
    category: "Bags",
    stock: 20,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    ratings: 4.4,
    numReviews: 9
  }
];

const importData = async () => {
  try {
    await connectDB();

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      }))
    );

    const createdUsers = await User.insertMany(hashedUsers);
    const createdProducts = await Product.insertMany(products);

    const sampleUser = createdUsers.find((user) => user.role === "user");
    const sampleOrders = [
      {
        userId: sampleUser._id,
        items: [
          {
            productId: createdProducts[0]._id,
            qty: 1,
            price: createdProducts[0].price
          },
          {
            productId: createdProducts[1]._id,
            qty: 2,
            price: createdProducts[1].price
          }
        ],
        totalAmount: createdProducts[0].price + createdProducts[1].price * 2,
        address: {
          fullName: sampleUser.name,
          street: "123 Main Road",
          city: "Patna",
          postalCode: "800001",
          country: "India"
        },
        paymentId: "pay_dummy_001",
        status: "Delivered"
      },
      {
        userId: sampleUser._id,
        items: [
          {
            productId: createdProducts[2]._id,
            qty: 1,
            price: createdProducts[2].price
          }
        ],
        totalAmount: createdProducts[2].price,
        address: {
          fullName: sampleUser.name,
          street: "45 Market Street",
          city: "Delhi",
          postalCode: "110001",
          country: "India"
        },
        paymentId: "pay_dummy_002",
        status: "Pending"
      }
    ];

    await Order.insertMany(sampleOrders);

    console.log("Dummy data imported successfully");
    console.log("Admin login: admin@shopkart.com / admin123");
    console.log("User login: chandan@example.com / user123");
    process.exit();
  } catch (error) {
    console.error(`Seed failed: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Dummy data deleted successfully");
    process.exit();
  } catch (error) {
    console.error(`Delete failed: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
