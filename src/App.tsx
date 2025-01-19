import './App.css';
import toneData from './assets/tones.json';
import audioData from './assets/audio.json';
import AudioDisplay from './components/AudioDisplay';

export default function App() {
  return (
    <div>
      <AudioDisplay
        audioData={audioData}
        toneData={toneData}
      />
    </div>
  );
}
