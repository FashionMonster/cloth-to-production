//グループ選択コンポーネント
const SelectGroupName = (props) => {
  const divStyle = "w-48 h-8";
  const selectStyle = "w-48 h-8 border border-solid rounded-sm border-gray-400";

  return (
    <div className={divStyle}>
      <select
        name={props.name}
        id={props.id}
        className={selectStyle}
        ref={props.register}
      >
        <option value=""></option>
        {props.groupInfoList.map((item) => {
          return <option value={item.groupId}>{item.groupName}</option>;
        })}
      </select>
      {props.errors && (
        <div className="text-red-600 text-sm relative">必須選択です</div>
      )}
    </div>
  );
};
export { SelectGroupName };
