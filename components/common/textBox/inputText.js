//テキスト入力コンポーネント
const InputText = (props) => {
  //テンプレートリテラルが使用できないため、switch文でセット
  let divStyle;
  let inputStyle;
  switch (props.width) {
    case "48":
      divStyle = "w-48 h-8";
      inputStyle =
        "w-48 h-8 border border-solid rounded-sm border-gray-400 disabled:bg-gray-100 disabled:text-black";
      break;
    case "280":
      divStyle = "w-280 h-8";
      inputStyle =
        "w-280 h-8 border border-solid rounded-sm border-gray-400 disabled:bg-gray-100 disabled:text-black";
      break;
    case "408":
      divStyle = "w-408 h-8";
      inputStyle =
        "w-408 h-8 border border-solid rounded-sm border-gray-400 disabled:bg-gray-100 disabled:text-black";
      break;
    default:
      divStyle = "w-48 h-8";
      inputStyle =
        "w-48 h-8 border border-solid rounded-sm border-gray-400 disabled:bg-gray-100 disabled:text-black";
      break;
  }

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
