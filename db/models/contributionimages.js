module.exports = (sequelize, DataTypes) => {
  const ContributionImages = sequelize.define("ContributionImages", {
    contribution_id: { type: DataTypes.INTEGER, primaryKey: true },
    image_url_1: DataTypes.STRING,
    image_url_2: DataTypes.STRING,
    image_url_3: DataTypes.STRING,
    image_url_4: DataTypes.STRING,
    image_url_5: DataTypes.STRING,
  });

  return ContributionImages;
};
