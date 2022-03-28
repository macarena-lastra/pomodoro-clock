import Button from "./Button.js";

const BlockLength = ({ title, changeTime, type, time, formatTime }) => {
  const decrementBtnId = type + "-decrement";
  const incrementBtnId = type + "-increment";
  const labelId = type + "-label";
  const displayId = type + "-length";

  return (
    <div id={type}>
      <label id={labelId}>{title}</label>
      <div>
        <Button
          id={decrementBtnId}
          value="down"
          onClick={() => changeTime(-60, type)}
          icon="decrement"
          btnClass="small-btn"
        />
        <span id={displayId}>{formatTime(time)}</span>
        <Button
          id={incrementBtnId}
          value="up"
          onClick={() => changeTime(+60, type)}
          icon="increment"
          btnClass="small-btn"
        />
      </div>
    </div>
  );
};

export default BlockLength;
