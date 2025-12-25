module.exports = (sequelize, DataTypes) => {
  const Roadmap = sequelize.define(
    "Roadmap",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      premiumPrice: { 
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Roadmaps",
      freezeTableName: true,
    }
  );

  Roadmap.associate = (models) => {
    Roadmap.belongsTo(models.Teacher, {
      foreignKey: "teacherId",
      as: "teacher",
    });
    Roadmap.hasMany(models.studentSubscription, {
      foreignKey: "roadmapId",
      as: "studentSubscription",
    });

    Roadmap.hasMany(models.Topic, {
      foreignKey: "roadmapId",
      as: "topic",
    });
  };

  return Roadmap;
};
