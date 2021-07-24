//テキスト入力コンポーネント
const InputPassword = (props) => {
  const divStyle = "w-48 h-8";
  const inputStyle = "w-48 h-8 border border-solid rounded-sm border-gray-400";

  return (
    <div className={divStyle}>
      <input
        type="password"
        name={props.name}
        id={props.id}
        className={inputStyle}
        ref={props.register}
      />
      {props.errors?.type === "required" && (
        <div className="text-red-600 text-sm relative">必須入力です</div>
      )}
      {props.errors?.type === "minLength" && (
        <div className="text-red-600 text-sm">最小は6桁です</div>
      )}
      {props.errors?.type === "maxLength" && (
        <div className="text-red-600 text-sm">最大は12桁です</div>
      )}
    </div>
  );
};

export { InputPassword };
