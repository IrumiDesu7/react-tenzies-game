import Confetti from 'react-confetti';

export default function Main(props) {
  return (
    <main>
      {props.isFinish && <Confetti />}
      <div className='game-container'>
        <h1 className='title'>Tenzies</h1>
        <p className='instruction'>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className='die-container'>{props.diceElement}</div>
        <div className='roll-btn' onClick={props.rollDice}>
          {props.isFinish ? 'New Game' : 'Roll Dice'}
        </div>
      </div>
    </main>
  );
}
