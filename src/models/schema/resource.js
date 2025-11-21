module.exports = (db, type) => {
  const resource = db.define("Resource", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    topicId: {
      type: type.INTEGER,
      allowNull: false,
    },
    title: {
      type: type.STRING,
      allowNull: false,
    },
    url: {
      type: type.STRING,
      allowNull: false,
    },
    typeUrl: {
      type: type.ENUM("video", "link", "pdf"),
      allowNull: false,
    },
  }, {
    tableName: "Resources"
  });

  resource.associate = (models) => {
    resource.belongsTo(models.Topic, {
      foreignKey: "topicId",
      as: "topic",
    });
  };
  return resource;
};
