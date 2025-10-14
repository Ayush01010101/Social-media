import { useNavigate } from 'react-router';
import { ArrowLeft, HardHat } from 'lucide-react';

const UnderConstruction = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-charcha-bg text-charcha-text-light text-center px-6">
      <div className="max-w-lg mx-auto">
        <img
          src="https://media.tenor.com/LtF6lgB8FdsAAAAi/mochi-peach.gif"
          alt="Page Under Construction Illustration"
          className="w-44 rounded-2xl h-auto mx-auto mb-8 opacity-90"
        />
        <div className="flex items-center justify-center gap-3 mb-6">
          <HardHat className="w-10 h-10 text-charcha-purple" />
          <h1 className="text-4xl md:text-5xl font-bold text-charcha-text-light">
            Under Construction
          </h1>
        </div>
        <p className="text-lg text-charcha-text-muted mb-8">
          Hum is page ko behtar banane ke liye kaam kar rahe hain. Yeh jald hi aapke liye taiyaar ho jaayega. Dhanyavaad!
        </p>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 bg-charcha-purple text-white px-8 py-3 rounded-lg text-lg font-semibold transition-transform duration-300 hover:scale-105 shadow-lg shadow-charcha-purple/30"
        >
          <ArrowLeft size={20} />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default UnderConstruction;
