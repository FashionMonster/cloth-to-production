import { CONST } from "../apiConstants/const";
import { appLogError } from "../apiUtils/appLogError";
import { appLogInfo } from "../apiUtils/appLogInfo";
const models = require("../db/models");

export function updateUserAccounts(param, previousUserId) {
  appLogInfo(CONST.FILE_NAME.UPDATE_USER_ACCOUNTS, "START");

  //update処理
  return models.UserAccounts.update(
    {
      user_id: param.userId,
      user_name: param.userName,
    },
    { where: { user_id: previousUserId } }
  )
    .then(() => {
      appLogInfo(CONST.FILE_NAME.UPDATE_USER_ACCOUNTS, "END");
    })
    .catch((e) => {
      appLogError(CONST.FILE_NAME.UPDATE_USER_ACCOUNTS, "DATABASE", e);
      throw e;
    });
}
