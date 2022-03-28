import Icon from "./Icon.js";

const Button = (props) => {
  return (
    <button
      id={props.id}
      className={props.className}
      value={props.value}
      onClick={props.onClick}
    >
      <Icon icon={props.icon} className={props.btnClass} />
    </button>
  );
};

export default Button;
