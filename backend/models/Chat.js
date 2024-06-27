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
      type: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    },
    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  {
    timestamps: true,
  }
);

let Chat = model("Chat", chatSchema);

export default Chat;
