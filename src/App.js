import Die from './components/Die';

function App() {
  return (
    <main>
      <div className='game-container'>
        <div className='die-container'>
          <Die value={3} />
          <Die value={1} />
          <Die value={2} />
          <Die value={5} />
          <Die value={5} />
          <Die value={6} />
          <Die value={4} />
          <Die value={1} />
          <Die value={2} />
          <Die value={6} />
        </div>
      </div>
    </main>
  );
}

export default App;
