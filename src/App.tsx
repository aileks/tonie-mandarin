import toneData from './assets/tones.json';
import audioData from './assets/audio.json';
// import AudioDisplay from './components/AudioDisplay';
import ToneQuiz from './components/ToneQuiz';

export default function App() {
  return (
    <div className='min-h-screen bg-yellow-300 p-8'>
      <header className='mb-12'>
        <h1 className='text-8xl font-black text-red-600 transform -rotate-2 mb-4'>
          Welcome to Tonie!
        </h1>
      </header>

      <main className='bg-white border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-6'>
        <ToneQuiz
          audioData={audioData}
          toneData={toneData}
        />
      </main>
    </div>
  );
}
