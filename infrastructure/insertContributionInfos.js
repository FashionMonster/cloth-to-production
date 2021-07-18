import { CONST } from "../apiConstants/const";
import { appLogError } from "../apiUtils/appLogError";
import { appLogInfo } from "../apiUtils/appLogInfo";
const models = require("../db/models");

export function insertContributionInfos(param, trn) {
  appLogInfo(CONST.FILE_NAME.INSERT_CONTRIBUTION_INFOS, "START");

  //insert処理
  return models.ContributionInfos.create(
    {
      group_id: param.groupId,
      user_id: param.userId,
      material_name: param.materialName,
      category: param.category,
      composition_1: param.composition1,
      composition_ratio_1: param.compositionRatio1,
      composition_2: param.composition2,
      composition_ratio_2: param.compositionRatio2,
      composition_3: param.composition3,
      composition_ratio_3: param.compositionRatio3,
      fabric_structure: param.fabricStructure,
      color: param.color,
      pattern: param.pattern,
      processing: param.processing,
      unit_price: param.unitPrice,
      supplier: param.supplier,
      comment: param.comment,
      is_deleted: param.isDeleted,
    },
    { transaction: trn }
  )
    .then(() => {
      appLogInfo(CONST.FILE_NAME.INSERT_CONTRIBUTION_INFOS, "END");
    })
    .catch((e) => {
      appLogError(CONST.FILE_NAME.INSERT_CONTRIBUTION_INFOS, "DATABASE", e);
      throw e;
    });
}
