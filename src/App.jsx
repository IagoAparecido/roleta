import { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import "./App.css";
import Form from "./components/Form";
import Select from "./components/Select";
import { Box, Modal, Typography } from "@mui/material";

function App() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [valueSelect, setValueSelect] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataValue, setDataValue] = useState([]);
  const [newDataValue, setNewDataValue] = useState([]);

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

  console.log(newDataValue);

  useEffect(() => {
    fetch("../../data.json")
      .then((res) => res.json())
      .then((data) => {
        setDataValue(data);
      });
  }, []);

  useEffect(() => {
    const selectedOption = dataValue.find((item) => item.curso === valueSelect);
    setNewDataValue(selectedOption);

    if (selectedOption) {
      const newData = selectedOption.value.map((item) => ({
        option: item.option,
        style: { backgroundColor: `${item.color}`, textColor: "#000000" },
      }));
      setData(newData);
    }
  }, [valueSelect]);

  const handleSpinClick = () => {
    setLoading(true);
    const newPrizeNumber = Math.floor(Math.random() * dataValue.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setTimeout(() => {
      handleOpen();
      setLoading(false);
    }, 9000);
  };

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

      <Form click={handleSpinClick} disabled={loading}>
        <Select setValueSelect={setValueSelect}>
          {dataValue.map((option, index) => (
            <option key={index} value={option.curso}>
              {option.curso}
            </option>
          ))}
        </Select>
      </Form>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal_prize">
          <Typography id="modal-modal-title" variant="h3">
            Você ganhou mais {desconto} de desconto
          </Typography>
          <Typography id="modal-modal-title" variant="h5">
            Copie o cupom de desconto abaixo e aplique direto no carrinho
          </Typography>

          <a
            className="buttonfinalize"
            href={`https://api.whatsapp.com/send?phone=556692518181&text=Olá,%20eu%20participei%20da%20roleta%20da%20sorte%20e%20ganhei%20${desconto}%%20de%20desconto`}
            target="_blank"
            rel="noreferrer"
          >
            <Typography id="modal-modal-title" variant="h6">
              Parabéns! Hoje é o seu dia de sorte!
            </Typography>
          </a>
        </Box>
      </Modal>
    </div>
  );
}

export default App;
