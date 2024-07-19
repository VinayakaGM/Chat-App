export const getuserName = (loggedUserId, users) => {
  console.log("chatLogics", loggedUserId, users);
  return users.find((user) => user._id !== loggedUserId).name;
};
