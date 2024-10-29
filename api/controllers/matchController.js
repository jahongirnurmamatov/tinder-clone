import User from "../models/User.js";

export const swipeRight = async (req, res) => {
  try {
    const { likedUserId } = req.params;
    const currentUser = await User.findById(req.user._id);
    const likedUser = await User.findById(likedUserId);

    if (!likedUser) {
      return res.status(404).json({ message: "user not found" });
    }
    if (!likedUser.likes.includes(currentUser._id)) {
      likedUser.likes.push(currentUser._id);
      await likedUser.save();
    }
    if (likedUser.likes.includes(currentUser._id)) {
      currentUser.matches.push(likedUser._id);
      likedUser.matches.push(currentUser._id);
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
    const currentUser = await User.findById(req.user._id);
    if (!currentUser.dislikes.includes(dislikedUserId)) {
      currentUser.dislikes.push(dislikedUserId);
      await currentUser.save();
    }
    res.status(200).json({ succes: true, user: currentUser });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ succes: false, message: "Internal server error" });
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
