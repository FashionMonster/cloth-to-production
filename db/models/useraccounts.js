const userAccounts = (sequelize, DataTypes) => {
  const UserAccounts = sequelize.define(
    "UserAccounts",
    {
      user_id: {
        type: DataTypes.STRING(255),
        primaryKey: true,
      },
      user_name: DataTypes.STRING(20),
      group_id: DataTypes.STRING(255),
    },
    { underscored: true }
  );
  // UserAccounts.associate = function (models) {
  //   // associations can be defined here
  //   UserAccounts.hasMany(models.ContributionInfos, {
  //     foreignKey: "user_id",
  //     sourceKey: "user_id",
  //   });
  // };
  return UserAccounts;
};

export default userAccounts;
