import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-charcha-bg text-charcha-text-light text-center px-6">
      <div className="max-w-md mx-auto">
        <img
          src="https://freesvg.org/img/sad-kitten.png"
          alt="404 Not Found Illustration for Charcha Point"
          className="w-48 h-auto mx-auto mb-8"
        />
        <h1 className="text-6xl md:text-8xl font-extrabold mb-4">
          <span className="text-charcha-purple">404</span>
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold text-charcha-text-light mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-charcha-text-muted mb-8">
          Oops! Lagta hai yeh charcha abhi tak shuru nahi hui ya aap galat jagah aa gaye hain.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-charcha-purple text-white px-8 py-3 rounded-lg text-lg font-semibold transition-transform duration-300 hover:scale-105 shadow-lg shadow-charcha-purple/30"
        >
          <ArrowLeft size={20} />
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
