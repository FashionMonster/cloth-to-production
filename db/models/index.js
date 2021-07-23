import * as pg from "pg";
import { Sequelize } from "sequelize";
import { appLogInfo } from "../../apiUtils/appLogInfo";
const UserAccounts = require("./useraccounts");
const env = process.env.NODE_ENV || "production";
const config = require(__dirname + "/../config/config.json")[env];

//ログ設定
config.logging = function (str) {
  //不要なデフォルトを除去
  const sql = str.replace("SET search_path to cloth_to;", "");
  appLogInfo("index.js(dbConfigFile)", "SQL", sql);
};

//DB接続
let sequelize = new Sequelize("cloth_to", "cloth_to_pro", "HY19940302hy", {
  dialectModule: pg,
  dialect: "postgres",
  host: "cloth-to-production.cwrv527awugx.ap-northeast-1.rds.amazonaws.com",
  port: 5432,
  schema: "cloth_to",
  searchPath: "cloth_to",
  dialectOptions: {
    prependSearchPath: true,
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  migrationStorageTableName: "sequelize_meta",
  pool: {
    max: 5, // プールするコネクションの最大値
    idle: 10000, // コネクションがリリースされた後にアイドル状態になるまでの最大時間（ミリ秒、evictと合わせて使う）
    acquire: 30000, // poolがエラーをthrowする前に接続しようとする最大時間（ミリ秒）
    evict: 10000,
  },
});

//モデルを生成
const db = {
  UserAccounts: UserAccounts(sequelize, Sequelize.DataTypes),
  // GroupAccounts: GroupAccounts(sequelize, Sequelize.DataTypes),
  // ContributionInfos: ContributionInfos(sequelize, Sequelize.DataTypes),
  // ContributionImages: ContributionImages(sequelize, Sequelize.DataTypes),
};

Object.keys(db).forEach((modelName) => {
  console.log("modelName：" + modelName);
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
