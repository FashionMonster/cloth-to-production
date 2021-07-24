//素材比率コンポーネント
const InputCompositionRatio = (props) => {
  const divStyle = `w-${props.width} h-8`;
  const inputStyle = `w-${props.width} h-8 border border-solid rounded-sm border-gray-400`;

  return (
    <div className={divStyle}>
      <input
        type="number"
        name={props.name}
        className={inputStyle}
        ref={props.register}
      />
      {props.errors?.type === "required" && (
        <div className="text-red-600 text-sm">必須入力です</div>
      )}
      {props.errors?.type === "max" && (
        <div className="text-red-600 text-sm">最大値は100です</div>
      )}
      {props.errors?.type === "min" && (
        <div className="text-red-600 text-sm">最小値は1です</div>
      )}
    </div>
  );
};

export { InputCompositionRatio };
