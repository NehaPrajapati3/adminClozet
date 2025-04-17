import mongoose from "mongoose";

const SellerStoreInfoSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      required: true,
    },
    storeAddress: {
      type: String,
      required: true,
    },

    coverPhotoUrl: {
      type: String,
      default: "",
    },
    logoUrl: {
      type: String,
      default: "",
    },
    storeTaxInfo: {
      type: String,
      default: "",
    },
    storeLocation: {
      latitude: {
        type: String,
        default: "",
      },
      longitude: {
        type: String,
        default: "",
      },
      zone: {
        type: String,
        default: "",
      },
      mapAddress: {
        type: String,
        default: "",
      },
    },

    sellerAuthId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SellerUserAuth",
   
    },
  },
  { timestamps: true }
);

export const StoreInfo = mongoose.model("StoreInfo", SellerStoreInfoSchema);
