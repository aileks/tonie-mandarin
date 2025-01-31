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
      setIsAnsweredCorrectly(true);
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
    <div className='space-y-6 sm:space-y-8'>
      <audio ref={audioRef} />

      <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-purple-700 transform -rotate-1 will-change-transform'>
        Which tone do you hear?
      </h2>

      <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
        <button
          onClick={playAudio}
          className='w-full sm:w-auto bg-green-400 text-black text-xl sm:text-2xl font-bold py-3 sm:py-4 px-6 sm:px-8 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all'
        >
          Play Audio
        </button>
        <p className='text-2xl sm:text-3xl font-black bg-white border-4 border-black p-2 sm:p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]'>
          Score: <span className='text-red-600'>{score}</span>
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {choices.map(choice => (
          <button
            key={choice}
            onClick={() => handleChoice(choice)}
            disabled={isAnsweredCorrectly}
            className={`text-2xl sm:text-3xl font-bold py-4 sm:py-6 px-4 border-4 border-black ${
              userSelection === choice ?
                choice === correctAnswer ?
                  'bg-green-400'
                : 'bg-red-400'
              : 'bg-white'
            } ${
              isAnsweredCorrectly ?
                'opacity-50 cursor-not-allowed'
              : 'hover:bg-yellow-200'
            } shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all`}
          >
            {getText(choice)}
          </button>
        ))}
      </div>

      {isAnsweredCorrectly && (
        <div className='bg-green-200 border-4 border-black p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]'>
          <p className='text-xl sm:text-2xl font-bold mb-4'>Correct!</p>
          <button
            onClick={nextQuestion}
            className='w-full sm:w-auto bg-blue-400 text-white text-lg sm:text-xl font-bold py-2 px-6 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all'
          >
            Next Question
          </button>
        </div>
      )}
      {!isAnsweredCorrectly && userSelection && (
        <div className='bg-red-200 border-4 border-black p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]'>
          <p className='text-xl sm:text-2xl font-bold'>Incorrect! Try again.</p>
        </div>
      )}
    </div>
  );
};

export default ToneQuiz;
