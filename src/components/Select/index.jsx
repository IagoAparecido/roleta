import "./styles.css";

function Select(props) {
  return (
    <div className="group">
      <select
        className="select"
        required
        onChange={(e) => props.setValueSelect(e.target.value)}
      >
        <option value="" disabled selected>
          Selecione o curso
        </option>
        {props.children}
      </select>
      <span className="highlight"></span>
      <span className="bar"></span>
      <label></label>
    </div>
  );
}

export default Select;
