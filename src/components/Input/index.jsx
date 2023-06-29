import "./styles.css";

function Input(props) {
  const labelClass = props.value ? "active" : "";

  return (
    <div className="group">
      <input
        type={props.type}
        required
        onChange={(e) => props.setValue(e.target.value)}
        value={props.value}
        maxLength={props.maxLength}
      />
      <span className="highlight"></span>
      <span className="bar"></span>
      <label className={labelClass}>{props.title}</label>
    </div>
  );
}

export default Input;
