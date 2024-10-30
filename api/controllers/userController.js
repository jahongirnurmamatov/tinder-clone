import cloudinary from "../config/cloudinary.js";
import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  try {
    const { image, ...otherData } = req.body;
    let updatedData = otherData;
    if (image) {
      
      if (image.startsWith("data:image")) {
        try {
          const uploadResponse = await cloudinary.uploader.upload(image);
          updatedData = { ...updatedData, image: uploadResponse.secure_url };
        } catch (error) {
          console.log(error.message);
          return res
            .status(400)
            .json({ success: false, message: "Error in uploading image" });
        }
      }
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updatedData,
      { new: true }
    );
    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
   