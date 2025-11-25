const authService = require("../../src/services/auth.service");
const db = require("../../src/models");
const bcrypt = require("bcrypt");
const { sendVerificationEmail } = require("../../src/utils/mailer");
const { insertTeacherOrStudent } = require("../../src/utils/auth.utils");

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../../src/models", () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));
jest.mock("../../src/utils/general", () => ({
  throwErr: jest.fn((msg) => {
    throw new Error(msg);
  }),
}));

jest.mock("crypto", () => ({
  randomBytes: jest.fn(() => ({
    toString: () => "fake-token",
  })),
}));

jest.mock("../../src/utils/mailer", () => ({
  sendVerificationEmail: jest.fn(),
}));

jest.mock("../../src/utils/auth.utils", () => ({
  checkTheRole: jest.fn(),
  insertTeacherOrStudent: jest.fn(),
}));

describe("AuthService.login", () => {
  it("should throw an error if user does not exist", async () => {
    db.User.findOne.mockResolvedValue(null);

    await expect(
      authService.login("test@test.com", "password")
    ).rejects.toThrow("This user is not exist");
  });

  it("should throw an error if email is not verified", async () => {
    db.User.findOne.mockResolvedValue({ emailVerified: false });

    await expect(
      authService.login("test@test.com", "password")
    ).rejects.toThrow("Please verify your email to login");
  });

  it("should throw an error if password is incorrect", async () => {
    db.User.findOne.mockResolvedValue({
      emailVerified: true,
      password: "hashedPassword",
    });
    bcrypt.compare.mockResolvedValue(false);

    await expect(
      authService.login("test@test.com", "password")
    ).rejects.toThrow("The password is incorrect");
  });
});

describe("AuthService.createUser", () => {
  it("should create a new user and send verification email", async () => {
    bcrypt.hash.mockResolvedValue("hashedPass");

    db.User.create.mockResolvedValue({ id: 1 });

    const response = await authService.createUser(
      "testuser",
      "test@test.com",
      "password",
      "student",
      "level1",
      "math"
    );

    expect(db.User.create).toHaveBeenCalled();
    expect(insertTeacherOrStudent).toHaveBeenCalledWith(
      1,
      "student",
      "level1",
      "math"
    );
    expect(sendVerificationEmail).toHaveBeenCalledWith(
      "test@test.com",
      "testuser",
      "fake-token"
    );
    expect(response).toBe("Check your email to verify your account.");
  });
});
