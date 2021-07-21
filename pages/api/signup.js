import { CONST } from "../../apiConstants/const";
import { appLogInfo } from "../../apiUtils/appLogInfo";
import { UserAccount } from "../../domain/userAccount";
import { insertUserAccounts } from "../../infrastructure/insertUserAccounts";

export default async function handler(req, res) {
  appLogInfo(CONST.FILE_NAME.SIGNUP, "START");
  appLogInfo(CONST.FILE_NAME.SIGNUP, "REQUEST_DATA", req.body);

  try {
    //ユーザー情報ドメイン
    const userAccount = new UserAccount({
      userId: req.body.email,
      userName: req.body.userName,
      groupId: null,
    });

    //ユーザー情報登録
    console.log("ユーザー情報登録") // TODO 削除
    await insertUserAccounts(userAccount);

    appLogInfo(CONST.FILE_NAME.SIGNUP, "END");

    res.json({
      res: "",
    });
  } catch (e) {

  console.log(e) // TODO 削除
    //画面にエラー情報を返却
    //キー重複した場合
    if (e.parent.code === "23505") {
      res.json({
        errorCode: e.parent.code,
      });
    } else {
      throw e;
    }
  }
}
