import { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import "./styles.css";
import Select from "../../components/Select";
import { Box, Modal, Typography } from "@mui/material";
import Input from "../../components/Input";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

function Home() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [valueSelect, setValueSelect] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataValue, setDataValue] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [cpf, setCpf] = useState("");
  const [cpfRegistered, setCpfRegistered] = useState(false);
  const [cpfRegisteredMessage, setCpfRegisteredMessage] = useState("");
  const [erro, setErro] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const [data, setData] = useState([
    {
      option: "??",
      style: { backgroundColor: "#92e6a7", textColor: "#000000" },
    },
    {
      option: "??",
      style: { backgroundColor: "#6ede8a", textColor: "#000000" },
    },
    {
      option: "??",
      style: { backgroundColor: "#92e6a7", textColor: "#000000" },
    },
    {
      option: "??",
      style: { backgroundColor: "#6ede8a", textColor: "#000000" },
    },
    {
      option: "??",
      style: { backgroundColor: "#92e6a7", textColor: "#000000" },
    },
    {
      option: "??",
      style: { backgroundColor: "#6ede8a", textColor: "#000000" },
    },
  ]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const isFormFilled = name && email && tel && cpf && checkboxChecked;

  const handleSubmit = async () => {
    setLoading(true);

    setCpfRegistered(false);

    event.preventDefault();

    if (isFormFilled && validateCPF(cpf)) {
      setErro(false);
      setLoading(false);
    } else if (name || email || tel || cpf === "") {
      setErro(true);
      setLoading(false);
      return;
    } else if (cpf.length <= 11) {
      setErro(true);
      setLoading(false);
      return;
    } else if (!validateCPF(cpf)) {
      setErro(true);
      setLoading(false);

      return;
    }

    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);

    try {
      const response = await fetch("http://localhost:3000/person", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          tel: tel,
          cpf: cpf,
          course: valueSelect,
          prize: data[newPrizeNumber].option,
        }),
      });

      if (!response.ok) {
        const content = await response.json();
        if (content.error === "CPF já participou da promoção") {
          setCpfRegistered(true);
          setCpfRegisteredMessage(content.error);
        } else {
          throw new Error(content.error);
        }
      } else {
        setCpfRegistered(false);
        setLoading(true);
        setMustSpin(true);
        setTimeout(() => {
          handleOpen();
          setLoading(false);
        }, 9000);
      }
    } catch (error) {
      setCpfRegisteredMessage(error.message);
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

  useEffect(() => {
    fetch("http://localhost:3000/course")
      .then((res) => res.json())
      .then((data) => {
        setDataValue(data);
      });
  }, []);

  useEffect(() => {
    const selectedOption = dataValue.find(
      (item) => item.course === valueSelect
    );

    if (selectedOption) {
      const newData = selectedOption.value.map((item) => ({
        option: item.option,
        style: {
          backgroundColor: `${item.backgroundColor}`,
          textColor: item.textColor,
        },
      }));
      setData(newData);
    }
  }, [valueSelect]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    p: 10,
    borderRadius: 5,
    backgroundColor: "hsl(210, 11%, 85%)",
  };

  const desconto = data[prizeNumber].option;

  return (
    <div className="container_app">
      <Wheel
        mustStartSpinning={mustSpin}
        data={data}
        onStopSpinning={() => {
          setMustSpin(false);
        }}
        spinDuration={0.7}
        prizeNumber={prizeNumber}
        textColors={["#999"]}
        fontSize={18}
        fontWeight={400}
        radiusLineColor="#6ede8a"
        outerBorderWidth={2}
        outerBorderColor={"#6ede8a"}
        innerRadius={11}
        innerBorderColor={"#6ede8a"}
        innerBorderWidth={8}
        radiusLineWidth={2}
        pointerProps={{ src: "../pointer-2.svg" }}
      />

      <div className="container_form">
        <div className="div_text">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <Input value={name} setValue={setName} type="text" title="Nome" />

          <Input
            maxLength={14}
            value={formatCPF(cpf)}
            setValue={setCpf}
            type="text"
            title="CPF"
          />

          <Input
            value={email}
            setValue={setEmail}
            type="email"
            title="E-mail"
          />

          <Input
            maxLength={15}
            value={formatTel(tel)}
            setValue={setTel}
            type="text"
            title="Telefone"
          />

          <div>
            {" "}
            <Select setValueSelect={setValueSelect}>
              {dataValue.map((option, index) => (
                <option key={index} value={option.course}>
                  {option.course}
                </option>
              ))}
            </Select>
          </div>

          <br />
          {erro && <p className="message_error">CPF inválido.</p>}
          {cpfRegistered && (
            <p className="message_error">{cpfRegisteredMessage}</p>
          )}

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
          <button type="submit" className="button-4" disabled={loading}>
            Gire a roleta
          </button>
        </form>
      </div>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal_prize">
          <Typography id="modal-modal-title" variant="h3">
            Você ganhou {desconto}
          </Typography>
          <Typography id="modal-modal-title" variant="h5">
            Clique no botão abaixo para conversar conosco
          </Typography>

          <a
            className="buttonfinalize"
            href={`https://api.whatsapp.com/send?phone=556692518181&text=Olá,%20eu%20participei%20da%20roleta%20da%20sorte%20e%20ganhei%20${desconto}%20de%20desconto`}
            target="_blank"
            rel="noreferrer"
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <WhatsAppIcon />
              Parabéns! Hoje é o seu dia de sorte!
            </Typography>
          </a>
        </Box>
      </Modal>
    </div>
  );
}

export default Home;
