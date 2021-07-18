import axios from "axios";
import Router from "next/router";
import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { AuthContext } from "../components/common/auth/authProvider";
import { SubmitBtn } from "../components/common/button/submitBtn";
import { Error } from "../components/common/error";
import { Header } from "../components/common/header";
import { Loading } from "../components/common/loading/loading";
import { ModalWindow } from "../components/common/modal/modalWindow";
import { Navigation } from "../components/common/navigation";
import { SelectGroupName } from "../components/common/selectBox/selectGroupName";
import { InputPassword } from "../components/common/textBox/inputPassword";
import { CONST } from "../constants/const";
import { usePreviousValue } from "../utils/usePreviousValue";

export default function LinkUserToGroup() {
  const { handleSubmit, register, errors } = useForm();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const previousModalIsOpen = usePreviousValue(modalIsOpen);
  const modalMessage = useRef("");
  const value = useContext(AuthContext);

  const query = useQuery(
    "allGroupInfo",
    async () => {
      const { data } = await axios.get("./api/getAllGroupInfo");
      return data;
    },
    { refetchOnMount: "always" } //登録されたグループアカウントをすぐ反映するため
  );

  //グループ紐づけイベント
  const linkUserToGroups = async (data) => {
    data.userId = value.userInfo.userId;
    mutation.mutate(data);
  };

  const mutation = useMutation((formData) =>
    axios.post("./api/linkUserToGroup", formData).then((res) => {
      setIsOpen(true);

      if (res.data.errorCode === null) {
        //成功メッセージ表示設定
        setIsUpdateSuccess(true);
        modalMessage.current = CONST.OK_MSG.FIN_LINK_USER_TO_GROUP;
      } else if (res.data.errorCode === "WRONG_PASSWORD") {
        modalMessage.current = CONST.ERR_MSG.WRONG_PASSWORD;
      }
    })
  );

  //更新完了メッセージが開いた状態から閉じる時
  if (previousModalIsOpen && !modalIsOpen && isUpdateSuccess) {
    Router.push("/login");
  }

  if (
    query.isFetching ||
    query.isLoading ||
    mutation.isFetching ||
    mutation.isLoading
  )
    return <Loading />;

  //ログインしていない場合に、画面が見えないようにする
  //応急処置なので、対応予定
  if (value.userInfo.userId === "") {
    return <></>;
  }

  if (query.error)
    return (
      <Error
        backType={CONST.BACK_TYPE.RELOAD}
        href="/linkUserToGroups"
        errorMsg={query.error.message}
      />
    );

  if (mutation.isError)
    return (
      <Error
        backType={CONST.BACK_TYPE.RELOAD}
        href="/linkUserToGroups"
        errorMsg={mutation.error.message}
      />
    );

  return (
    <div>
      <body className="grid grid-rows-layout gap-8 min-h-screen">
        <div id="headerWrapper">
          <Header isLogined={true} />
          <Navigation />
        </div>
        <p className="text-center">
          自身がどのグループに所属するか選択します。
          <br />
          下記の項目を入力して登録・更新して下さい。
        </p>
        <main className="grid grid-cols-contents">
          <div className="col-start-2 col-end-3 grid grid-rows-form">
            <form
              onSubmit={handleSubmit(linkUserToGroups)}
              className=" row-start-2 row-end-3 grid grid-cols-2 gap-8 m-auto"
            >
              <label htmlFor="groupId">グループ名</label>
              <SelectGroupName
                name="groupId"
                id="groupId"
                register={register({ required: true })}
                errors={errors.groupId}
                width="48"
                groupInfoList={query.data.groupInfoList}
              />

              <label htmlFor="password">パスワード</label>
              <InputPassword
                name="password"
                id="password"
                register={register({
                  required: true,
                  minLength: 6,
                  maxLength: 12,
                })}
                errors={errors.password}
                width="48"
              />
              <div className="col-start-2 col-end-3 flex justify-center">
                <SubmitBtn value="登録/更新" width={28} />
              </div>
            </form>
          </div>
        </main>
      </body>
      <ModalWindow
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        message={modalMessage.current}
      />
    </div>
  );
}
