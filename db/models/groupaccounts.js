module.exports = (sequelize, DataTypes) => {
  const GroupAccounts = sequelize.define(
    "GroupAccounts",
    {
      group_id: {
        type: DataTypes.STRING(255),
        primaryKey: true,
      },
      group_pass: DataTypes.STRING(255),
      group_name: DataTypes.STRING(20),
    },
    { underscored: true }
  );

  return GroupAccounts;
};
