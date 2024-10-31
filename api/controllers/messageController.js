import { getConnectedUsers, getIO } from "../socket/socket.server";

export const sendMessage = async (req, res) => {
  try {
    const { content, receiverId } = req.body;
    const newMessage = await Message.create({
      sender: req.user._id,
      receiver: receiverId,
      content,
    });
    // to do mesage in real time using socket io
    const io = getIO();
    const connectedUsers = getConnectedUsers();
    const receiverSocketId = connectedUsers.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMesage", { message: newMessage });
    }

    res.status(200).json({
      success: true,
      message: newMessage,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getConversation = async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: req.user._id },
        { sender: req.user._id, receiver: userId },
      ],
    }).sort({ createdAt: 1 });
    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
