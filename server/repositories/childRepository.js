const pool = require("../config/database");

const getChildrenByUserId = async (userId) => {
  const result = await pool.query(
    `SELECT *
     FROM children
     WHERE user_id = $1
     ORDER BY id ASC`,
    [userId],
  );

  return result.rows;
};

const getChildById = async (id) => {
  const result = await pool.query(
    `SELECT *
     FROM children
     WHERE id = $1`,
    [id],
  );

  return result.rows[0];
};

const createChild = async (child) => {
  const { userId, name, birthDate, skillLevel, medicalNotes, napSchedule } =
    child;

  const result = await pool.query(
    `INSERT INTO children 
    (user_id, name, birth_date, skill_level, medical_notes, nap_schedule)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [userId, name, birthDate, skillLevel, medicalNotes, napSchedule],
  );

  return result.rows[0];
};

const updateChild = async (id, child) => {
  const { name, birthDate, skillLevel, medicalNotes, napSchedule } = child;

  const result = await pool.query(
    `UPDATE children
     SET name = $1,
         birth_date = $2,
         skill_level = $3,
         medical_notes = $4,
         nap_schedule = $5
     WHERE id = $6
     RETURNING *`,
    [name, birthDate, skillLevel, medicalNotes, napSchedule, id],
  );

  return result.rows[0];
};

const deleteChild = async (id) => {
  const result = await pool.query(
    `DELETE FROM children
     WHERE id = $1
     RETURNING id`,
    [id],
  );

  return result.rows[0];
};

module.exports = {
  getChildrenByUserId,
  getChildById,
  createChild,
  updateChild,
  deleteChild,
};
