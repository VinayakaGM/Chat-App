import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  accessChat,
  addPerson,
  createGroup,
  fetchChats,
  removePerson,
  renameGroup,
} from "../controllers/chatControllers.js";

const chatRoute = Router();

chatRoute.post("/", auth, accessChat);
chatRoute.get("/", auth, fetchChats);
chatRoute.post("/group", auth, createGroup);
chatRoute.put("/group", auth, renameGroup);
chatRoute.put("/group/add", auth, addPerson);
chatRoute.put("/group/remove", auth, removePerson);

export default chatRoute;
