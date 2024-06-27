import asyncHandler from "express-async-handler";
import Chat from "../models/Chat.js";

export const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("User id not sent");
    res.sendStatus(400);
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      {
        users: { $elemMatch: { $eq: userId } },
      },
      {
        users: { $elemMatch: { $eq: req.userId } },
      },
    ],
  })
    .populate("users", "-password", "-confirmPassword")
    .populate("latestMessage");

  isChat = await Chat.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email photo",
  });
});
