//テキスト入力コンポーネント
const InputTextarea = (props) => {
  const divStyle = "w-408 h-112";
  const textareaStyle =
    "w-408 h-112 border border-solid rounded-sm border-gray-400 disabled:bg-gray-100 disabled:text-black";

  return (
    <div className={divStyle}>
      <textarea
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        ref={props.register}
        disabled={props.isDisabled}
        defaultValue={props.defaultValue}
        className={textareaStyle}
      />
      {props.errors?.type === "maxLength" && (
        <div className="text-red-600 text-sm">最大は200文字です</div>
      )}
    </div>
  );
};

export { InputTextarea };
