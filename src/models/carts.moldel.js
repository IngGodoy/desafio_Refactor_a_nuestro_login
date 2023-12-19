import mongoose, { Schema, model } from "mongoose";


export const cartsCollection = "carts"; // nombre de la carpeta collection en mongoDb

const cartSchema = new Schema({
    products: [
        {
          _id: false,
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
          },
          quantity: { type: Number, default: 1 }
        }
        
      ]
    });
    
export const CartModel = model(cartsCollection, cartSchema);