import Player from './components/Player.jsx';
import TimeerChallenge from './components/TimerChallenge.jsx';
function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <TimeerChallenge title='Easy' targetTime={1}/>
        <TimeerChallenge title='nOT Easy' targetTime={10}/>
        <TimeerChallenge title='Medium' targetTime={15}/>
        <TimeerChallenge title='Hard' targetTime={30}/>
      </div>
    </>
  );
}

export default App;
