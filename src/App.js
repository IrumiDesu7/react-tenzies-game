import { useState } from 'react';
import Die from './components/Die';
import { nanoid } from 'nanoid';

function App() {
  const [dices, setDices] = useState(allNewDice());

  function generateDice() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateDice());
    }
    return newDice;
  }

  const diceElement = dices.map((dice) => (
    <Die
      toggleHold={() => toggleHold(dice.id)}
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
    />
  ));

  function rollDice() {
    setDices((oldDices) =>
      oldDices.map((dice, index) => (dice.isHeld ? dice : generateDice()))
    );
  }

  function toggleHold(id) {
    setDices((oldDices) =>
      oldDices.map((dice) =>
        dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
      )
    );
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
