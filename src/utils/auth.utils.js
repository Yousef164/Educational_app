const db = require("../models");
const checkTheRole = (role, level, subject) => {
  if (role !== "student" && role !== "teacher") {
    throw new Error("The role is incorrect");
  }
  if (role === "student" && !level) {
    throw new Error("Student must have a level.");
  }
  if (role === "teacher" && !subject) {
    throw new Error("Teacher must have a subject.");
  }
};

const insertTeacherOrStudent = async (id, role, level, subject) => {
  try {
    if (role === "student") {
      await db.Student.create({
        level,
        userId: id,
      });
    } else if (role === "teacher") {
      await db.Teacher.create({
        subject,
        userId: id,
      });
    }
  } catch (err) {
    console.log(err)
  }
};

module.exports = {
  checkTheRole,
  insertTeacherOrStudent
};
