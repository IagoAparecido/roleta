import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';

import './App.css'

import Form from './components/Form';
import { Box, Modal, Typography } from '@mui/material';

const data = [
  { option: '2%', style: { backgroundColor: '#92e6a7', textColor: '#000000' } },
  { option: '5%', style: { backgroundColor: '#6ede8a', textColor: '#000000' } },
  { option: '15%', style: { backgroundColor: '#92e6a7', textColor: '#000000' } },
  { option: '1%', style: { backgroundColor: '#6ede8a', textColor: '#000000' } },
  { option: '30%', style: { backgroundColor: '#92e6a7', textColor: '#000000' } },
  { option: '10%', style: { backgroundColor: '#6ede8a', textColor: '#000000' } },
  { option: '3%', style: { backgroundColor: '#92e6a7', textColor: '#000000' } },
  { option: '20%', style: { backgroundColor: '#6ede8a', textColor: '#000000' } },
];
function App() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [loading, setLoading] = useState(false)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const handleSpinClick = () => {
    setLoading(true)
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setTimeout(() => {
      handleOpen()
      setLoading(false)
    }, 9000)
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    p: 10,
    borderRadius: 5,
    backgroundColor: "hsl(210, 11%, 85%)"
  };


  return (
    <div className='container_app'>
      <Wheel
        mustStartSpinning={mustSpin}
        data={data}
        onStopSpinning={() => {
          setMustSpin(false);
        }}
        spinDuration={.7}
        prizeNumber={prizeNumber}
        textColors={['#999']}

        fontSize={16}
        fontWeight={300}

        radiusLineColor='#6ede8a'

        outerBorderWidth={2}
        outerBorderColor={'#6ede8a'}

        innerRadius={11}
        innerBorderColor={'#6ede8a'}
        innerBorderWidth={8}

        radiusLineWidth={2}
        pointerProps={{ src: '../pointer-2.svg' }}

      />

      <Form click={handleSpinClick} disabled={loading} />
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal_prize">
          <Typography id="modal-modal-title" variant="h3" >Você ganhou mais {data[prizeNumber].option} de desconto</Typography>
          <Typography id="modal-modal-title" variant="h5" >Copie o cupom de desconto abaixo e aplique direto no carrinho</Typography>

          <a className="buttonfinalize" href="https://api.whatsapp.com/send?phone=556692518181&text=Olá%20eu%20eu%20participei%20da%20roleta%20da%20sorte%20e%20ganhei%20%%20de%20desconto" target="_blank" onClick={close} rel="noreferrer">
            <Typography id="modal-modal-title" variant="h6" >
              Parabéns! Hoje é o seu dia de sorte!
            </Typography>
          </a>
        </Box>
      </Modal>

    </div>
  );
}

export default App
