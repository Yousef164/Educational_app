module.exports = (db, type) => {
  const user = db.define("Users", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: type.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: type.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: type.STRING,
      allowNull: false,
    },
    image: {
      type: type.STRING,
      allowNull: true
    },
    role: {
      type: type.ENUM("student", "teacher", "manager"),
      allowNull: false,
    },
    emailToken: {
      type: type.STRING,
      allowNull: true
    },
    emailVerified: {
      type: type.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: "Users"
  });

  user.associate = (models) => {
    user.hasOne(models.Student, {
        foreignKey: "userId",
        as: "student"
    });

    user.hasOne(models.Teacher, {
      foreignKey: "userId",
      as: "teacher"
    })
  }
  
  return user;
};
