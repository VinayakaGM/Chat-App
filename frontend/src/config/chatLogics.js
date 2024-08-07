// export const getuserName = (loggedUserId, users) => {
//   // console.log("chatLogics", loggedUserId, users);
//   return users[0].name !== loggedUserId ? users[0].name : users[1].name;
// };

// export const getuserFull = (loggedUserId, users) => {
//   // console.log("users",users);
//   return users[0]._id !== loggedUserId ? users[0] : users[1];
// };
export const getuserName = (loggedUserId, users) => {
  return users[0]._id !== loggedUserId ? users[0].name : users[1].name;
};

export const getuserFull = (loggedUserId, users) => {
  return users[0]._id !== loggedUserId ? users[0] : users[1];
};
