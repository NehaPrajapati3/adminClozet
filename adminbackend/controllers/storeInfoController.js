import { StoreInfo } from "../models/sellerStoreInfo.model.js"; 
import { SellerUserAuth } from "../models/sellerUserInfo.model.js"; 
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import bcrypt from "bcryptjs";

export const addStore = async (req, res) => {
  try {
    const {
      storeName,
      storeAddress,
      storeTaxInfo,
      latitude,
      longitude,
      zone,
      mapAddress,

    } = req.body;

   // const sellerAuthId = req.id;
    //console.log(`sellerAuthId: ${sellerAuthId}`);

    // Basic validation
    if (!storeName || !storeAddress) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    // Check if store name already exists
    let gotStore = await StoreInfo.findOne({ storeName });
    if (gotStore) {
      return res.status(400).json({
        message: "Store with this name already exists.",
        success: false,
      });
    }

    let logoUrl = "";
    let coverPhotoUrl = "";

    console.log("Files received:", req.files);

    // Upload logo if available

    if (req.files["logo"]) {
      const imagePath = req.files["logo"][0].path;
      const imageResult = await cloudinary.uploader.upload(imagePath, {
        folder: "uploads/stores/logos",
        resource_type: "image",
      });
      logoUrl = imageResult.secure_url;
      console.log(`Logo url : ${logoUrl}`);
      fs.unlinkSync(imagePath); // Delete local file after upload
    }
    // Upload cover photo if available

    if (req.files["coverPhoto"]) {
      const imagePath = req.files["coverPhoto"][0].path;
      const imageResult = await cloudinary.uploader.upload(imagePath, {
        folder: "uploads/stores/coverPhotos",
        resource_type: "image",
      });
      coverPhotoUrl = imageResult.secure_url;
      console.log(`cover photo url : ${coverPhotoUrl}`);
      fs.unlinkSync(imagePath); // Delete local file after upload
    }

    const newStore = new StoreInfo({
      storeName,
      storeAddress,
      coverPhotoUrl,
      logoUrl,
      storeTaxInfo,
      storeLocation:{
        latitude,
        longitude,
        zone,
        mapAddress
      },
     
    });

    const savedStore = await newStore.save();
    
    const { firstName, lastName, mobileNo, email, password, confirmPassword } = req.body;

    if(password !== confirmPassword){
      return res.status(400).json({
        message: "Password and cofirm password should be same.",
        success: false,
      });
    }

     const existingUser = await SellerUserAuth.findOne({
       "userInfo.mobileNo": mobileNo,
     });
     if (existingUser) {
       return res
         .status(400)
         .json({
           message: "Mobile number already registered.",
           success: false,
         });
     }

     const hashedPassword = await bcrypt.hash(password, 10);

     const newSeller = new SellerUserAuth({
       userInfo: { firstName, lastName, mobileNo },
       userAuth: { email, password: hashedPassword },
     });

     await newSeller.save();

    return res
      .status(201)
      .json({ message: "Store created successfully", store: savedStore, seller: newSeller, success: true});
  } catch (error) {
    console.error("Error creating store:", error);
    return res
      .status(500)
      .json({
        message: "Internal server error",
        error: error.message,
        success: false,
      });
  }
};

// export const registerSeller = async (req, res) => {
//   try {
//     const { firstName, lastName, mobileNo, email, password } = req.body;

//     const existingUser = await SellerUserAuth.findOne({
//       "userInfo.mobileNo": mobileNo,
//     });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ message: "Mobile number already registered.", success: false });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newSeller = new SellerUserAuth({
//       userInfo: { firstName, lastName, mobileNo },
//       userAuth: { email, password: hashedPassword },
//     });

//     await newSeller.save();
//     res
//       .status(201)
//       .json({ message: "Seller registered successfully.", success: true });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
