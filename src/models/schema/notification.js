module.exports = (db, type) => {
  const notification = db.define("Notification", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    studentId: {
      type: type.INTEGER,
      allowNull: false,
    },
    title: {
      type: type.STRING,
      allowNull: false,
    },
    message: {
      type: type.STRING,
      allowNull: false,
    },
    isRead: {
      type: type.BOOLEAN,
      defaultValue: false,
    },
  },{
    tableName: "Notifications"
  });

  notification.associate = (models) => {
    notification.belongsTo(models.Student, {
      foreginKey: "studentId",
      as: "student"
    })
  };
  return notification;
};
