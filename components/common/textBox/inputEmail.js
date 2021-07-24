//テキスト入力コンポーネント
const InputEmail = (props) => {
  const divStyle = `w-${props.width} h-8`;
  const inputStyle = `w-${props.width} h-8 border border-solid rounded-sm border-gray-400`;

  return (
    <div className={divStyle}>
      <input
        type="email"
        name={props.name}
        id={props.id}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        className={inputStyle}
        ref={props.register}
      />
      {props.errors?.type === "required" && (
        <div className="text-red-600 text-sm relative">必須入力です</div>
      )}
      {props.errors?.type === "pattern" && (
        <div className="text-red-600 text-sm relative">
          不正なメアド形式です
        </div>
      )}
      {props.errors?.type === "maxLength" && (
        <div className="text-red-600 text-sm relative">最大は255文字です</div>
      )}
    </div>
  );
};

export { InputEmail };
