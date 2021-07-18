import { CONST } from "../../apiConstants/const";
import { appLogInfo } from "../../apiUtils/appLogInfo";
import { UserAccount } from "../../domain/userAccount";
import { updateUserAccounts } from "../../infrastructure/updateUserAccounts";

export default async function handler(req, res) {
  appLogInfo(CONST.FILE_NAME.UPDATE_USER_INFO, "START");
  appLogInfo(CONST.FILE_NAME.UPDATE_USER_INFO, "REQUEST_DATA", req.body);

  try {
    //ユーザー情報ドメイン
    const userAccount = new UserAccount({
      userId: req.body.email,
      userName: req.body.userName,
    });

    //ユーザー情報更新
    await updateUserAccounts(userAccount, req.body.previousUserId);

    appLogInfo(CONST.FILE_NAME.UPDATE_USER_INFO, "END");

    res.json({
      res: "",
    });
  } catch (e) {
    //画面にエラー情報を返却
    throw e;
  }
}
