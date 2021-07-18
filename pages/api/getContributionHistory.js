import { CONST } from "../../apiConstants/const";
import { appLogInfo } from "../../apiUtils/appLogInfo";
import { makeQueryConditions } from "../../apiUtils/makeQueryConditions";
import { selectContributionInfos } from "../../infrastructure/selectContributionInfos";
import { selectCountContributionInfos } from "../../infrastructure/selectCountContributionInfos";

export default async function handler(req, res) {
  appLogInfo(CONST.FILE_NAME.GET_CONTRIBUTION_HISTORY, "START");
  appLogInfo(
    CONST.FILE_NAME.GET_CONTRIBUTION_HISTORY,
    "REQUEST_DATA",
    req.query
  );

  if (req.query.page === undefined || req.query.searchCategory === undefined) {
    let dataList = [];
    dataList.push({
      imageUrl: "",
    });

    appLogInfo(CONST.FILE_NAME.GET_CONTRIBUTION_HISTORY, "END");
    res.json({ images: dataList, totalCount: 0 });
  } else {
    try {
      //検索条件生成
      const conditions = makeQueryConditions(req.query);

      //全取得件数
      const totalCount = await selectCountContributionInfos(conditions);

      const offset = (req.query.page - 1) * CONST.IMAGE_DISPLAY_LIMIT;

      //Xページのデータ取得
      const dataList = await selectContributionInfos(
        conditions,
        offset,
        CONST.IMAGE_DISPLAY_LIMIT
      );

      appLogInfo(CONST.FILE_NAME.GET_CONTRIBUTION_HISTORY, "END");

      res.json({
        images: dataList,
        totalCount: totalCount,
      });
    } catch (e) {
      //画面にエラー情報を返却
      throw e;
    }
  }
}
