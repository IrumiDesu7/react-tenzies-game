import { useEffect, useState } from 'react';
import Die from './components/Die';
import Main from './components/Main';
import Stats from './components/Stats';
import { nanoid } from 'nanoid';

function App() {
  const [dices, setDices] = useState(allNewDice());
  const [isFinish, setIsFinish] = useState(false);
  const [rollAmount, setRollAmount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fastestDuration, setFastestDuration] = useState(
    () => localStorage.getItem('fastest') || 60
  );

  useEffect(() => {
    /* Checking if all the dice have the same value and are held. */
    const winCondition = dices.every(
      (dice) => dice.value === dices[0].value && dice.isHeld
    );
    if (winCondition) {
      setIsFinish(true);
    }
  }, [dices]);

  useEffect(() => {
    if (!isFinish) {
      const timer = setInterval(
        () => setDuration((oldDuration) => oldDuration + 1),
        1000
      );
      return () => {
        clearInterval(timer);
      };
    } else {
      setDuration((oldDuration) => oldDuration);
      duration < fastestDuration
        ? setFastestDuration(duration)
        : setFastestDuration((oldDuration) => oldDuration);
      localStorage.setItem('fastest', JSON.stringify(fastestDuration));
    }
  }, [isFinish, duration, fastestDuration]);

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
      setRollAmount(0);
      setDuration(0);
    } else {
      setDices((oldDices) =>
        oldDices.map((dice) => (dice.isHeld ? dice : generateDice()))
      );
      setRollAmount((oldAmount) => oldAmount + 1);
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
      <Stats
        rollAmount={rollAmount}
        duration={duration}
        fastestDuration={fastestDuration}
      />
    </div>
  );
}

export default App;
