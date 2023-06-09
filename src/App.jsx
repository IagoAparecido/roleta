import { useState } from 'react';
import { Wheel } from 'react-custom-roulette';

import './App.css'
import Form from './components/Form';

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

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  return (
    <div className='container_app'>
      <Wheel
        mustStartSpinning={mustSpin}
        data={data}
        onStopSpinning={() => {
          setMustSpin(false);
        }}
        spinDuration={.5}
        prizeNumber={prizeNumber}
        textColors={['#ffffff']}

        outerBorderWidth={2}
        outerBorderColor={'black'}

        innerRadius={10}
        innerBorderColor={'black'}
        innerBorderWidth={2}

        radiusLineWidth={2}
        pointerProps={{ src: './src/assets/pointer-2.svg' }}

      />

      <Form click={handleSpinClick} />

    </div>
  );
}

export default App
