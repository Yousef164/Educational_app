module.exports = (db, type) => {
  const student =  db.define("Students", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: type.INTEGER,
      allowNull: false,
      unique: true,
    },
    level: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 4,
      },
      
    },
  }, {
    tableName: "Students"
  });

  student.associate = (models) => {

    student.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user"
    });

    student.hasMany(models.studentMark, {
      foreignKey: "studentId",
      as: "studentMark"
    })

    student.hasMany(models.studentSubscription, {
      foreignKey: "studentId",
      as: "studentSubscription"
    })

    student.hasMany(models.Notification, {
      foreignKey: "studentId",
      as: "notifications"
    })

    student.hasMany(models.studentAnswer, {
      foreignKey: "studentId",
      as: "studentAnswer"
    })
  }
  return student;
};
