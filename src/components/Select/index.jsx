import "./styles.css";

function Select() {
  return (
    <div className="group">
      <select className="select" required>
        <option value="" disabled selected>
          Selecione o curso
        </option>
        <option value="">Direito</option>
        <option value="">Arquitetura</option>
        <option value="">Análise e Desenvolvimento de Software</option>
        <option value="">Gastronomia</option>
        <option value="">Odontologia</option>
        <option value="">Administração</option>
      </select>
      <span className="highlight"></span>
      <span className="bar"></span>
      <label></label>
    </div>
  );
}

export default Select;
