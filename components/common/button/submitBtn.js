//サブミットボタンコンポーネント
const SubmitBtn = (props) => {
  const inputStyle = `w-${props.width} h-8 bg-purple-700 text-white rounded text-center px-2 py-1 hover:bg-purple-800 hover:text-white`;

  return (
    <input
      type="submit"
      id="submit"
      value={props.value}
      className={inputStyle}
    />
  );
};
export { SubmitBtn };
