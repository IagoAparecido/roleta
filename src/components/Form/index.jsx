import { useState } from "react";
import "./styles.css";

function Form(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [erro, setErro] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const isFormFilled = name && email && tel && checkboxChecked;

  const handleClick = () => {
    // if (name || email || tel !== '') {
    //   setTimeout(() => {
    //     setEmail('')
    //     setName('')
    //     setTel('')
    //   }, 9000)
    // }
    if (isFormFilled) {
      setErro(false);

      props.click();
    } else if (name || email || tel == "") {
      setErro(true);
    }
  };

  return (
    <div className="container_form">
      <div className="div_text">
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
      </div>
      <form>
        <div className="group">
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={props.name}
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>Nome</label>
        </div>

        <div className="group">
          <input
            type="text"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>E-mail</label>
        </div>

        <div className="group">
          <input
            type="number"
            required
            onChange={(e) => setTel(e.target.value)}
            value={tel}
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>Telefone</label>

        </div>

        {erro && (
          <p className="message_error">Preencha os dados corretamente</p>
        )}
        <div className="group">
          <div className="politic_container">
            <input
              type="checkbox"
              required
              onChange={(e) => setCheckboxChecked(e.target.checked)}
            />
            <div>
              <span>{"--- "}</span>
              Concordo com o tratamento dos meus dados para finalidade de marketing,
              publicidade e divulgação de serviços da Descomplica, suas
              parceiras, contato e cumprimento de obrigações legais e
              contratuais, nos termos
              {" "}
              <a
                href="https://descomplica.com.br/sobre/politica-de-privacidade/"
                rel="noopener noreferrer"
                target="_blank"
                title=""
                aria-live="polite"
                tabIndex="7"
              >
                <strong>política de privacidade.</strong>
              </a>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="button-4"
          onClick={handleClick}
          disabled={props.disabled}
        >
          Gire a roleta
        </button>
      </form>
    </div>
  );
}

export default Form;
