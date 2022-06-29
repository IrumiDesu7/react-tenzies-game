export default function Stats(props) {
  return (
    <footer>
      <h2 className='stats-title'>Game Stats</h2>
      <h3>The amount of rolls</h3>
      <p>
        : {props.rollAmount} {props.rollAmount > 1 ? 'rolls' : 'roll'}
      </p>
      <h3>The time it took to win</h3>
      <p>
        : {props.duration} {props.duration > 1 ? 'seconds' : 'second'}
      </p>
      <h3>Fastest winner time</h3>
      <p>
        : {props.fastestDuration}{' '}
        {props.fastestDuration > 1 ? 'seconds' : 'second'}
      </p>
    </footer>
  );
}
