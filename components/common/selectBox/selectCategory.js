//分類選択コンポーネント
const SelectCategory = (props) => {
  //テンプレートリテラルが使用できないため、switch文でセット
  let divStyle;
  let selectStyle;
  switch (props.width) {
    case "280":
      divStyle = "w-280 h-8";
      selectStyle =
        "w-280 h-8 border border-solid rounded-sm border-gray-400 disabled:bg-gray-100 disabled:text-black disabled:opacity-100";
      break;
    case "408":
      divStyle = "w-408 h-8";
      selectStyle =
        "w-408 h-8 border border-solid rounded-sm border-gray-400 disabled:bg-gray-100 disabled:text-black disabled:opacity-100";
      break;
    default:
      divStyle = "w-280 h-8";
      selectStyle =
        "w-48 h-8 border border-solid rounded-sm border-gray-400 disabled:bg-gray-100 disabled:text-black";
      break;
  }

  return (
    <div className={divStyle}>
      <select
        name={props.name}
        id={props.id}
        className={selectStyle}
        ref={props.register}
        disabled={props.isDisabled}
        defaultValue={props.defaultValue}
      >
        <option value=""></option>
        <option value="1">製品</option>
        <option value="2">生地</option>
        <option value="3">副資材</option>
        <option value="4">その他</option>
      </select>
      {props.errors && (
        <div className="text-red-600 text-sm relative">必須選択です</div>
      )}
    </div>
  );
};

export { SelectCategory };
