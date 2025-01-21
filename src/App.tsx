import './App.css';
import toneData from './assets/tones.json';
import audioData from './assets/audio.json';
// import AudioDisplay from './components/AudioDisplay';
import ToneQuiz from './components/ToneQuiz';

export default function App() {
  return (
    <div>
      <h1>Welcome to Tonie!</h1>
      {/* <AudioDisplay */}
      {/*   audioData={audioData} */}
      {/*   toneData={toneData} */}
      {/* /> */}

      <ToneQuiz
        audioData={audioData}
        toneData={toneData}
      />
    </div>
  );
}
