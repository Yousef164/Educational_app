module.exports = (db, type) => {
  const topic = db.define("Topic", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roadmapId: {
      type: type.INTEGER,
      allowNull: false,
    },
    title: {
      type: type.STRING,
      allowNull: false,
    },
    description: {
      type: type.STRING,
      allowNull: false,
    },
    order: {
      type: type.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: "Topics"
  });

  topic.associate = (models) => {

    topic.belongsTo(models.Roadmap, {
      foreignKey: "roadmapId",
      as: "roadmap"
    });

    topic.hasMany(models.Resource, {
      foreignKey: "topicId",
      as: "resource"
    });

    topic.hasOne(models.Quiz, {
      foreignKey: "topicId",
      as: "quiz"
    })
  }
  return topic;
};
