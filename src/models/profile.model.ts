import { Schema, model } from "mongoose";

const addressSchema = new Schema({
  street: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  zip: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
});

const socialSchema = new Schema({
  facebook: {
    type: String,
    trim: true,
  },
  twitter: {
    type: String,
    trim: true,
  },
  instagram: {
    type: String,
    trim: true,
  },
});

interface IProfileSchema {
  firstName: string;
  lastName: string;
  bio: string;
  phoneNumber: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
  user: any;
  wishlist: string[];
  cart: string[];
  orders: string[];
}

const profileSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    billingAddress: {
      type: addressSchema,
    },
    shippingAddress: {
      type: addressSchema,
    },
    social: {
      type: socialSchema,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    cart: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Profile = model<IProfileSchema>("Profile", profileSchema);

export default Profile;
