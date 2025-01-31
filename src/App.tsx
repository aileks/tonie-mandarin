import toneData from './assets/tones.json';
import audioData from './assets/audio.json';
import ToneQuiz from './components/ToneQuiz';
import { Github } from 'lucide-react';

export default function App() {
  return (
    <div className='font-sans min-h-screen bg-yellow-300 p-4 sm:p-8'>
      <header className='mb-4 sm:mb-10'>
        <h1 className='text-4xl sm:text-6xl md:text-8xl font-black text-red-600 transform -rotate-2 mb-2 sm:mb-4 will-change-transform'>
          Tonie Mandarin!
        </h1>
      </header>

      <main className='bg-white border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-4 sm:p-6 flex-grow'>
        <ToneQuiz
          audioData={audioData}
          toneData={toneData}
        />
      </main>

      <footer className='md:fixed bottom-3 left-0 right-0 text-center md:mt-0 mt-12'>
        <div className='md:inline-flex items-center gap-4'>
          <a
            href='https://github.com/aileks/tonie-mandarin'
            target='_blank'
            rel='noopener noreferrer'
            className='text-sm font-bold transform rotate-1 inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1 shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all will-change-auto'
          >
            <Github size={16} />
            View on GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
