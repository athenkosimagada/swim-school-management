const pool = require("../config/database");

const getUserById = async (id) => {
  const result = await pool.query(
    "SELECT id, name, email, phone, created_at FROM users WHERE id = $1",
    [id],
  );
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

const createUser = async (user) => {
  const { name, email, phone, passwordHash } = user;

  const result = await pool.query(
    `INSERT INTO users (name, email, phone, password_hash, created_at)
     VALUES ($1, $2, $3, $4, NOW())
     RETURNING id, name, email, phone, created_at`,
    [name, email, phone, passwordHash],
  );

  return result.rows[0];
};

const updateUser = async (id, user) => {
  const { name, email, phone } = user;

  const result = await pool.query(
    `UPDATE users
     SET name = $1, email = $2, phone = $3
     WHERE id = $4
     RETURNING id, name, email, phone, created_at`,
    [name, email, phone, id],
  );

  return result.rows[0];
};

const deleteUser = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING id",
    [id],
  );

  return result.rows[0];
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUser,
  deleteUser,
};
