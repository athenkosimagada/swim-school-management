const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");

const registerUser = async (data) => {
  const { fullName, email, phone, password } = data;

  const existingUser = await userRepository.getUserByEmail(email);
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await userRepository.createUser({
    fullName,
    email,
    phone,
    passwordHash,
  });

  return newUser;
};

const loginUser = async (data) => {
  const { email, password } = data;

  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  return user;
};

const getUserProfile = async (userId) => {
  const user = await userRepository.getUserById(userId);
  return user;
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
