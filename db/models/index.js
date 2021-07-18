import * as pg from "pg";
import { appLogInfo } from "../../apiUtils/appLogInfo";
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "production";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

//ログ設定
config.logging = function (str) {
  //不要なデフォルトを除去
  const sql = str.replace("SET search_path to cloth_to;", "");
  appLogInfo("index.js(dbConfigFile)", "SQL", sql);
};

let sequelize;
sequelize = new Sequelize("cloth_to", "cloth_to_pro", "HY19940302hy", {
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

fs.readdirSync(path.resolve(__dirname, "../models"))
  // fs.readdirSync("./db/models/")
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require("./" + file)(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
