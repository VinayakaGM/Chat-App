import asyncHandler from "express-async-handler";
import Chat from "../models/Chat.js";

//@description   Create or fetch one-on-one chat
//@Path          POST /api/v1/chat
//@access         Private 

export const accessChat = asyncHandler(async (req, res, next) => {
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

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [userId, req.userId],
    };
  }
  try {
    let newChat = await Chat.create(chatData);
    newChat = await Chat.findById(newChat._id)
      .populate("users", "name email photo")
      .populate("latestMessage");
    res.send(newChat);
  } catch (error) {
    let err = new Error(error.message);
    next(err);
  }
});


//@description   fetch all chats for the logged in user
//@Path          GET /api/v1/chat
//@access         Private 

export const fetchChats = asyncHandler(async (req, res, next) => {
  let chats = await Chat.find({ users: { $elemMatch: { $eq: req.userId } } })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage").sort({updatedAt:-1});

  let finalChats = await Chat.populate(chats, {
    path: "latestMessage.sender",
    select: "name email photo",
  });

  res.status(200).json(finalChats);
});

//@description   create group chat
//@Path          post /api/v1/chat/group
//@access         Private 

export const createGroup = asyncHandler(async (req, res, next) => {
  if (!req.body.users || !req.body.chatName) {
    res.status(400).json("Please fill all the fields");
  }

  let users = JSON.parse(req.body.users.replace(/'/g, '"'));

  if (users<2) {
    res.status(400).json("To create group there must be atleast 2 users");
  }

  users.push(req.userId);

  try {
    let groupChat = await Chat.create({
      chatName: req.body.chatName,
      users: users,
      isGroupChat: true,
      groupAdmin: req.userId,
    });

    groupChat = await Chat.findById(groupChat._id)
      .populate("users", "-password -confirmPassword")
      .populate("groupAdmin", "-password -confirmPassword")
      .populate("latestMessage");

    groupChat = await Chat.populate(groupChat, {
      path: "latestMessage.sender",
      select: "name email photo",
    });
    res.status(201).json(groupChat);
    
  } catch (error) {
    let err = new Error(error.message);
    next(err);
  }
});
