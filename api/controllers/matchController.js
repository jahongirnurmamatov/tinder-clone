import User from "../models/User.js";

export const swipeRight = async (req, res) => {
  try {
    const { likedUserId } = req.params;
    const currentUser = await User.findById(req.user._id);
    const likedUser = await User.findById(likedUserId);

    if (!likedUser) {
      return res.status(404).json({ message: "user not found" });
    }
    if (!currentUser.likes.includes(likedUser._id)) {
      currentUser.likes.push(likedUser._id);
      await currentUser.save();
    }
    if (likedUser.likes.includes(currentUser._id)) {
      if (!currentUser.matches.includes(likedUser._id)) {
        currentUser.matches.push(likedUser._id);
      }
      if (!likedUser.matches.includes(currentUser._id)) {
        likedUser.matches.push(currentUser._id);
      }
      await Promise.all([currentUser.save(), likedUser.save()]);
      // TO DO SENT NOTIFICATION IF IT IS A MATCH => SOCKET IO
    }
    res.status(200).json({succes:true,user:currentUser});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ succes: false, message: "Internal server error" });
  }
};

export const swipeLeft = async (req, res) => {
  try {
   
    const { dislikedUserId } = req.params;
    console.log(dislikedUserId)
    const currentUser = await User.findById(req.user._id);

    // Ensure the disliked user ID is added to the dislikes array
    if (!currentUser.dislikes.includes(dislikedUserId)) {
      currentUser.dislikes.push(dislikedUserId);
      await currentUser.save();
    }

    res.status(200).json({ success: true, user: currentUser });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getMatches = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "matches",
      "name image"
    );
    res.status(200).json(user.matches);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ succes: false, message: "Internal server error" });
  }
};
export const getsUserprofiles = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const users = await User.find({
      $and: [
        { _id: { $ne: currentUser._id } },
        { _id: { $nin: currentUser.likes } },
        { _id: { $nin: currentUser.dislikes } },
        { _id: { $nin: currentUser.matches } },
        {
          gender:
            currentUser.genderPreference === "both"
              ? { $in: ["male", "female"] }
              : currentUser.genderPreference,
        },
        { genderPreference: { $in: [currentUser.gender, "both"] } },
      ],
    });
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ succes: false, message: "Internal server error" });
  }
};
