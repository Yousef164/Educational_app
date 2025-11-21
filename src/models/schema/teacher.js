module.exports = (db, type) => {
  const teacher = db.define("Teacher", {
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
    subject: {
      type: type.STRING,
      allowNull: false,
    },
  }, {
    tableName: "Teachers"
  });

  teacher.associate = (models) => {

    teacher.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user"
    });

    teacher.hasMany(models.Roadmap, {
      foreignKey: "teacherId",
      as: "roadmap"
    })
  }
  return teacher;
};
