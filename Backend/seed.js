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
  },
  {
    name: "Leather Wallet",
    description: "Genuine leather wallet with multiple card slots and coin pocket.",
    price: 799,
    category: "Accessories",
    stock: 40,
    imageUrl: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6",
    ratings: 4.3,
    numReviews: 22
  },
  {
    name: "Wireless Earbuds",
    description: "Noise-isolating true wireless earbuds with long battery life.",
    price: 2999,
    category: "Electronics",
    stock: 30,
    imageUrl: "https://images.unsplash.com/photo-1518444020870-8f2b7f8f1b4b",
    ratings: 4.6,
    numReviews: 48
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with deep bass and 12-hour playtime.",
    price: 1999,
    category: "Electronics",
    stock: 18,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    ratings: 4.5,
    numReviews: 31
  },
  {
    name: "Aviator Sunglasses",
    description: "Classic aviator sunglasses with UV protection and metal frame.",
    price: 1299,
    category: "Accessories",
    stock: 60,
    imageUrl: "https://images.unsplash.com/photo-1510797215324-95aa89f5acb3",
    ratings: 4.1,
    numReviews: 14
  },
  {
    name: "Denim Jeans",
    description: "Slim-fit stretch denim jeans with comfortable waistband.",
    price: 1599,
    category: "Clothing",
    stock: 35,
    imageUrl: "https://images.unsplash.com/photo-1520975698517-9b9a9e502d8d",
    ratings: 4.4,
    numReviews: 27
  },
  {
    name: "Coffee Maker",
    description: "Compact drip coffee maker with 1.2L capacity and timer.",
    price: 3499,
    category: "Home Appliances",
    stock: 12,
    imageUrl: "https://images.unsplash.com/photo-1517705008129-7dbb3f9c6aeb",
    ratings: 4.2,
    numReviews: 10
  },
  {
    name: "Yoga Mat",
    description: "Non-slip yoga mat with cushioning for all fitness levels.",
    price: 499,
    category: "Fitness",
    stock: 80,
    imageUrl: "https://images.unsplash.com/photo-1599058917212-6f69b8a9b0b7",
    ratings: 4.6,
    numReviews: 40
  },
  {
    name: "LED Desk Lamp",
    description: "Adjustable LED desk lamp with brightness and color modes.",
    price: 899,
    category: "Home",
    stock: 45,
    imageUrl: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
    ratings: 4.4,
    numReviews: 16
  },
  {
    name: "Gaming Mouse",
    description: "Ergonomic gaming mouse with customizable DPI and RGB.",
    price: 1499,
    category: "Electronics",
    stock: 22,
    imageUrl: "https://images.unsplash.com/photo-1587202372775-28b5f861f0a6",
    ratings: 4.5,
    numReviews: 29
  },
  {
    name: "Women Handbag",
    description: "Stylish women handbag with zip compartments and adjustable strap.",
    price: 2199,
    category: "Bags",
    stock: 28,
    imageUrl: "https://images.unsplash.com/photo-1520975698517-0f7c2f2a4d2b",
    ratings: 4.3,
    numReviews: 21
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
