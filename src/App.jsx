import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';

import './App.css'
import Form from './components/Form';
import { Box, Modal, Typography } from '@mui/material';

const data = [
  { option: '5', style: { backgroundColor: '#92e6a7', textColor: '#fff' } },
  { option: '5%', style: { backgroundColor: '#6ede8a', textColor: '#fff' } },
  { option: '1', style: { backgroundColor: '#4ad66d', textColor: '#fff' } },
  { option: 'Não foi dessa vez', style: { backgroundColor: '#2dc653', textColor: '#fff' } },
  { option: '7', style: { backgroundColor: '#25a244', textColor: '#fff' } },
  { option: '6', style: { backgroundColor: '#208b3a', textColor: '#fff' } },
  { option: '9', style: { backgroundColor: '#1a7431', textColor: '#fff' } },
  { option: '0', style: { backgroundColor: '#155d27', textColor: '#fff' } },
  { option: '0', style: { backgroundColor: 'green', textColor: '#fff' } },
];
function App() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [loading, setLoading] = useState(false)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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
        textColors={['#ffffff']}

        outerBorderWidth={2}
        outerBorderColor={'black'}

        innerRadius={10}
        innerBorderColor={'black'}
        innerBorderWidth={2}

        radiusLineWidth={2}
        pointerProps={{ src: '../pointer-2.svg' }}

      />

      <Form click={handleSpinClick} disabled={loading} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Seu desconto:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {data[prizeNumber].option}
          </Typography>
        </Box>
      </Modal>

    </div>
  );
}

export default App
