import { useState } from "react";
import "./styles.css";
import Input from "../Input";

function Form(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [cpf, setCpf] = useState("");
  const [erro, setErro] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const isFormFilled = name && email && tel && cpf && checkboxChecked;

  const handleSubmite = () => {
    event.preventDefault();

    if (isFormFilled && validateCPF(cpf)) {
      setErro(false);

      props.click();
    } else if (name || email || tel || cpf == "") {
      setErro(true);
    } else if (cpf.length <= 11) {
      setErro(true);
    }
  };

  const formatCPF = (value) => {
    const numericValue = value.replace(/\D/g, "");

    let formattedValue = numericValue;
    if (numericValue.length > 3) {
      formattedValue = numericValue.replace(/(\d{3})(\d)/, "$1.$2");
    }
    if (numericValue.length > 6) {
      formattedValue = formattedValue.replace(/(\d{3})(\d)/, "$1.$2");
    }
    if (numericValue.length > 9) {
      formattedValue = formattedValue.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    return formattedValue;
  };

  const validateCPF = (value) => {
    const numericValue = value.replace(/\D/g, "");

    if (numericValue.length !== 11) {
      return false;
    }

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(numericValue.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(numericValue.substring(9, 10))) {
      return false;
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(numericValue.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(numericValue.substring(10, 11))) {
      return false;
    }

    return true;
  };

  const formatTel = (value) => {
    const numericValue = value.replace(/\D/g, "");

    let formattedValue = numericValue;
    if (numericValue.length > 2) {
      formattedValue = `(${numericValue.slice(0, 2)}) ${numericValue.slice(2)}`;
    }
    if (numericValue.length > 7) {
      formattedValue = `${formattedValue.slice(0, 10)}-${formattedValue.slice(
        10
      )}`;
    }

    return formattedValue;
  };

  return (
    <div className="container_form">
      <div className="div_text">
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
      </div>
      <form onSubmit={handleSubmite}>
        <Input value={name} setValue={setName} type="text" title="Nome" />

        <Input
          maxLength={14}
          value={formatCPF(cpf)}
          setValue={setCpf}
          type="text"
          title="CPF"
        />

        <Input value={email} setValue={setEmail} type="email" title="E-mail" />

        <Input
          maxLength={15}
          value={formatTel(tel)}
          setValue={setTel}
          type="text"
          title="Telefone"
        />

        <div>{props.children}</div>

        <br />
        {erro && <p className="message_error">CPF inválido</p>}
        <div className="group">
          <div className="politic_container">
            <input
              type="checkbox"
              required
              onChange={(e) => setCheckboxChecked(e.target.checked)}
            />
            <div>
              <span>{"---. "}</span>
              Concordo com o tratamento dos meus dados para finalidade de
              marketing, publicidade e divulgação de serviços da Descomplica,
              suas parceiras, contato e cumprimento de obrigações legais e
              contratuais, nos termos{" "}
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
        <button type="submit" className="button-4" disabled={props.disabled}>
          Gire a roleta
        </button>
      </form>
    </div>
  );
}

export default Form;
