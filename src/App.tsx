import { useState, useEffect } from 'react';
import './App.css';
import tonesData from './assets/tones.json';
import audioData from './assets/audio.json';

type Tones = {
  [syllable: string]: {
    [tone: string]: string;
  };
};

type Audio = {
  [key: string]: string;
};

type ToneAudioMap = {
  syllable: string;
  tone: number;
  pinyin: string;
  audio: string | null;
};

function App() {
  const [toneAudioMap, setToneAudioMap] = useState<ToneAudioMap[]>([]);

  useEffect(() => {
    const tonesWithAudio: ToneAudioMap[] = Object.entries(
      tonesData as Tones
    ).flatMap(([syllable, tones]) =>
      Object.entries(tones).map(([tone, pinyin]) => ({
        syllable,
        tone: parseInt(tone, 10),
        pinyin,
        audio: (audioData as Audio)[`${syllable}${tone}`] || null,
      }))
    );

    setToneAudioMap(tonesWithAudio);
  }, []);

  return (
    <div>
      <h1>Tonie</h1>

      <div>
        {toneAudioMap.map(({ syllable, tone, pinyin, audio }) => (
          <h2 key={`${syllable}${tone}`}>
            <p>{pinyin}</p>
            {audio ?
              <audio controls>
                <source
                  src={audio}
                  type='audio/mpeg'
                />
                Your browser does not support the audio element.
              </audio>
            : <span>Audio not available</span>}
          </h2>
        ))}
      </div>
    </div>
  );
}

export default App;
