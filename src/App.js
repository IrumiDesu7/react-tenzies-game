import { useEffect, useState } from 'react';
import Die from './components/Die';
import Main from './components/Main';
import Stats from './components/Stats';
import { nanoid } from 'nanoid';

function App() {
  const [dices, setDices] = useState(allNewDice());
  const [isFinish, setIsFinish] = useState(false);

  useEffect(() => {
    const winCondition = dices.every(
      (dice) => dice.value === dices[0].value && dice.isHeld
    );
    if (winCondition) {
      setIsFinish(true);
    }
  }, [dices]);

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
    if (isFinish) {
      setDices(allNewDice());
      setIsFinish(false);
    } else {
      setDices((oldDices) =>
        oldDices.map((dice) => (dice.isHeld ? dice : generateDice()))
      );
    }
  }

  function toggleHold(id) {
    setDices((oldDices) =>
      oldDices.map((dice) =>
        dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
      )
    );
  }

  return (
    <div className='parent-container'>
      <Main isFinish={isFinish} diceElement={diceElement} rollDice={rollDice} />
      <Stats />
    </div>
  );
}

export default App;
