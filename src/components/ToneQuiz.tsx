import React, { useState, useRef } from 'react';

interface AudioData {
  [key: string]: string;
}

interface ToneData {
  [key: string]: {
    [key: string]: string;
  };
}

interface ToneQuizProps {
  audioData: AudioData;
  toneData: ToneData;
}

const ToneQuiz: React.FC<ToneQuizProps> = ({ audioData, toneData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  const [choices, setChoices] = useState<string[]>([]);
  const [userSelection, setUserSelection] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const generateQuestion = () => {
    const syllables = Object.keys(audioData);
    const randomSyllable =
      syllables[Math.floor(Math.random() * syllables.length)];
    const base = randomSyllable.slice(0, -1);
    const correctAnswer = randomSyllable;

    // Get all syllables with the same base
    const allChoices = syllables.filter(syllable => syllable.startsWith(base));

    let shuffledChoices = [
      ...allChoices.filter(choice => choice !== correctAnswer),
    ];

    while (shuffledChoices.length < 3) {
      const randomChoice =
        syllables[Math.floor(Math.random() * syllables.length)];
      shuffledChoices.push(randomChoice);
    }

    // Ensure the correct answer is included
    shuffledChoices = shuffledChoices.slice(0, 3);
    shuffledChoices.push(correctAnswer);

    const finalChoices = shuffledChoices.sort(() => 0.5 - Math.random());

    setCorrectAnswer(correctAnswer);
    setChoices(finalChoices);
    setIsAnsweredCorrectly(false);
    setUserSelection(null);
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.src = audioData[correctAnswer];
      audioRef.current.play();
    }
  };

  const handleChoice = (choice: string) => {
    setUserSelection(choice);

    if (choice === correctAnswer) {
      if (!isAnsweredCorrectly) {
        setScore(score + 1);
      }
      setIsAnsweredCorrectly(true); // Lock the question as answered correctly
    }
  };

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    generateQuestion();
  };

  React.useEffect(() => {
    generateQuestion();
  }, []);

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

  return (
    <div>
      <audio ref={audioRef} />

      <h3>Which tone do you hear?</h3>

      <button onClick={playAudio}>Play Audio</button>

      <div>
        {choices.map(choice => (
          <button
            key={choice}
            onClick={() => handleChoice(choice)}
            disabled={isAnsweredCorrectly} // Allow retries if not correct
            style={{
              backgroundColor:
                userSelection === choice ?
                  choice === correctAnswer ?
                    'green'
                  : 'red'
                : '',
            }}
          >
            {getText(choice)}
          </button>
        ))}
      </div>

      {isAnsweredCorrectly && (
        <div>
          <p>Correct!</p>
          <button onClick={nextQuestion}>Next Question</button>
        </div>
      )}
      {!isAnsweredCorrectly && userSelection && (
        <div>
          <p>Incorrect! Try again.</p>
        </div>
      )}

      <p>Score: {score}</p>
    </div>
  );
};

export default ToneQuiz;
