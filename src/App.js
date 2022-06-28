import { useState } from 'react';
import Die from './components/Die';

function App() {
  function allNewDice() {
    const randArray = [];
    for (let i = 0; i < 10; i++) {
      randArray.push(Math.ceil(Math.random() * 6));
    }
    return randArray;
  }

  const [dices, setDices] = useState(allNewDice());

  const diceElement = dices.map((item, index) => (
    <Die key={index} value={item} />
  ));

  function rollDice() {
    setDices(allNewDice());
  }

  return (
    <main>
      <div className='game-container'>
        <div className='die-container'>{diceElement}</div>
        <div className='roll-btn' onClick={rollDice}>
          Roll Dice
        </div>
      </div>
    </main>
  );
}

export default App;
