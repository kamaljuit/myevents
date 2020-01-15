const User = require("./UserModel");
const formatResponse = require("../Utilities/FormatResponse");

//Admin Routes

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();
  const response = formatResponse(200, users);
  res.status(200).send(response);
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.body._id;
  const user = await User.findById(userId);
  if (!user) res.status(400).send(formatResponse(400, null, "User Not Found!"));
  res.status(204).send(formatResponse(204, null));
};
