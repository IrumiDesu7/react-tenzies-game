import { useEffect, useState } from 'react';
import Die from './components/Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {
  const [dices, setDices] = useState(allNewDice());
  const [isFinish, setIsFinish] = useState(false);

  useEffect(() => {
    const winCondition = dices.every(
      (dice) => dice.value === dices[0].value && dice.isHeld
    );
    if (winCondition) {
      setIsFinish(true);
      console.log('you win the god damn game, man!');
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
    <main>
      {isFinish && <Confetti />}
      <div className='game-container'>
        <h1 className='title'>Tenzies</h1>
        <p className='instruction'>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className='die-container'>{diceElement}</div>
        <div className='roll-btn' onClick={rollDice}>
          {isFinish ? 'New Game' : 'Roll Dice'}
        </div>
      </div>
    </main>
  );
}

export default App;
