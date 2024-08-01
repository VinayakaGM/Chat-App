import asyncHandler from "express-async-handler";
import Message from "../models/Message.js";
import Chat from "../models/Chat.js";

export const createMessage = asyncHandler(async (req, res) => {

    const { content, chatId } = req.body;
    if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }

    let newMessage = {
      sender: req.userId,
      content: content,
      chat: chatId,
    };      

    try {
      let message = await Message.create(newMessage);
      message = await message.populate("sender", "name email photo");
      message = await message.populate("chat");
      message = await Message.populate(message, {
        path: "chat.users",
        select: "name email photo",
      })
      await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
      res.json(message);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
});

export const getMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name email photo")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});


