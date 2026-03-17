const pool = require("../config/database");

const getAllInstructors = async () => {
  const result = await pool.query(
    `SELECT *
     FROM instructors
     ORDER BY name ASC`,
  );

  return result.rows;
};

const getInstructorById = async (id) => {
  const result = await pool.query(
    `SELECT *
     FROM instructors
     WHERE id = $1`,
    [id],
  );

  return result.rows[0];
};

const createInstructor = async (instructor) => {
  const { name, certification, experience } = instructor;

  const result = await pool.query(
    `INSERT INTO instructors (name, certification, experience)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, certification, experience],
  );

  return result.rows[0];
};

const updateInstructor = async (id, instructor) => {
  const { name, certification, experience } = instructor;

  const result = await pool.query(
    `UPDATE instructors
     SET name = $1,
         certification = $2,
         experience = $3
     WHERE id = $4
     RETURNING *`,
    [name, certification, experience, id],
  );

  return result.rows[0];
};

const deleteInstructor = async (id) => {
  const result = await pool.query(
    `DELETE FROM instructors
     WHERE id = $1
     RETURNING id`,
    [id],
  );

  return result.rows[0];
};

module.exports = {
  getAllInstructors,
  getInstructorById,
  createInstructor,
  updateInstructor,
  deleteInstructor,
};
