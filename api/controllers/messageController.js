export const sendMessage = async (req, res) => {
  try {
    const { content, receiverId } = req.body;
    const newMessage = await Message.create({
      sender: req.user._id,
      receiver: receiverId,
      content,
    });
    // to do mesage in real time using socket io
    res.status(200).json({
      success: true,
      message: newMessage,
    });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getConversation = async (req, res) => {
  try {
  } catch (error) {}
};
