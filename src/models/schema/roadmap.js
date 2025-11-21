module.exports = (db, type) => {
  const roadmap = db.define(
    "Roadmap",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      teacherId: {
        type: type.INTEGER,
        allowNull: false,
      },
      premuimPrice: {
        type: type.INTEGER,
        allowNull: true,
      },
      description: {
        type: type.STRING,
        allowNull: false,
      },
    }, {
      tableName: "Roadmaps",
    }
  );

  roadmap.associate = (models) => {
    roadmap.belongsTo(models.Teacher, {
      foreignKey: "teacherId",
      as: "teacher",
    });

    roadmap.hasMany(models.studentSubscription, {
      foreignKey: "roadmapId",
      as: "studentSubscription",
    });

    roadmap.hasMany(models.Topic, {
      foreignKey: "roadmapId",
      as: "topic",
    });
  };

  return roadmap;
};
