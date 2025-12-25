const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const { sendVerificationEmail } = require("../utils/mailer");
const { checkTheRole, insertTeacherOrStudent } = require("../utils/auth.utils");
const { throwErr } = require("../utils/general");
const { jwtSecret } = require("../config/env");
const db = require("../models");

class AuthService {
  static async login(email, password) {
    try {
      const user = await db.User.findOne({ where: { email } });
      if (!user) {
        throwErr("This user is not exist");
      }
      if(user.emailVerified === false) {
        throwErr("Please verify your email to login");
      }
      const same = await bcrypt.compare(password, user.password);
      if (!same) {
        throwErr("The password is incorrect");
      }

      const token = jwt.sign(
        {
          userId: user.id,
          role: user.role,
          emailVerified: user.emailVerified,
        },
        jwtSecret,
        { expiresIn: "1h" }
      );
      return token;
    } catch (error) {
      throwErr(error);
    }
  }

  static async createUser(username, email, password, role, level, subject) {
    try {
      checkTheRole(role, level, subject);
      const hashpassword = await bcrypt.hash(password, 10);
      const token = await crypto.randomBytes(32).toString("hex");
      const newUser = await db.User.create({
        username,
        email,
        password: hashpassword,
        role,
        emailToken: token,
      });
      await insertTeacherOrStudent(newUser.id, role, level, subject);

      await sendVerificationEmail(email, username, token);

      return "Check your email to verify your account.";
    } catch (error) {
      throwErr(error);
    }
  }
}

module.exports = AuthService;
