export default function Die(props) {
  return (
    <div
      className={props.isHeld ? 'box held' : 'box'}
      onClick={props.toggleHold}
    >
      {props.value}
    </div>
  );
}
