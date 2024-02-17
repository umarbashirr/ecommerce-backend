import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    total: {
      type: Number,
      required: true,
    },
    payment: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    orderDate: {
      type: String,
      required: true,
    },
    deliveryDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

export default Order;
