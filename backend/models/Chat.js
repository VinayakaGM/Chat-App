import { Schema, model } from "mongoose";

let chatSchema = new Schema(
  {
    chatName: {
      type: String,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin:{
      type:Schema.Types.ObjectId,
      ref:"Users"
    }
  },
  {
    timestamps: true,
  }
);

let Chat = model("Chat", chatSchema);

export default Chat;
