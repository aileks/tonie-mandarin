import React, { useRef } from 'react';

interface AudioData {
  [key: string]: string;
}

interface ToneData {
  [key: string]: {
    [key: string]: string;
  };
}

interface AudioDisplayProps {
  audioData: AudioData;
  toneData: ToneData;
}

const AudioDisplay: React.FC<AudioDisplayProps> = ({ audioData, toneData }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getText = (syllable: string): string => {
    const base = syllable.slice(0, -1);
    const tone = syllable.slice(-1);
    const vowels = ['a', 'e', 'i', 'o', 'u', 'ü'];
    let vowelToModify = '';

    for (const vowel of vowels) {
      if (base.includes(vowel)) {
        vowelToModify = vowel;
        break;
      }
    }

    if (!vowelToModify || !toneData[vowelToModify]) {
      return syllable;
    }

    return base.replace(vowelToModify, toneData[vowelToModify][tone]);
  };

  const playAudio = (url: string) => {
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.play();
    }
  };

  const groupedSyllables: { [key: string]: string[] } = {};
  Object.keys(audioData).forEach(syllable => {
    const base = syllable.slice(0, -1);
    if (!groupedSyllables[base]) {
      groupedSyllables[base] = [];
    }
    groupedSyllables[base].push(syllable);
  });

  return (
    <div>
      <audio ref={audioRef} />

      <h1>Tonie Audio</h1>

      {Object.entries(groupedSyllables).map(([base, syllables]) => (
        <div key={base}>
          <h2>{base}</h2>
          <div>
            {syllables.map(syllable => (
              <div key={syllable}>
                <button onClick={() => playAudio(audioData[syllable])}>
                  Play {getText(syllable)}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AudioDisplay;
