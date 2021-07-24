//テキスト入力コンポーネント
const InputText = (props) => {
  // const divStyle = `w-${props.width} h-8`;
  // const inputStyle = `w-${props.width} h-8 border border-solid rounded-sm border-gray-400 disabled:bg-gray-100 disabled:text-black`;

  const divStyle = "w-408 h-8";
  const inputStyle =
    "w-408 h-8 border border-solid rounded-sm border-gray-400 disabled:bg-gray-100 disabled:text-black";

  return (
    <div className={divStyle}>
      <input
        type="text"
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        ref={props.register}
        disabled={props.isDisabled}
        defaultValue={props.defaultValue}
        className={inputStyle}
      />
      {props.errors?.type === "required" && (
        <div className="text-red-600 text-sm relative">必須入力です</div>
      )}
      {props.errors?.type === "maxLength" && (
        <div className="text-red-600 text-sm">
          最大は{props.maxLength}文字です
        </div>
      )}
      {props.errors?.type === "pattern" && (
        <div className="text-red-600 text-sm">半角数字のみ入力可です</div>
      )}
    </div>
  );
};

export { InputText };
