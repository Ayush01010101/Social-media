import { PlusCircle } from 'lucide-react';

interface EmptyPostsStateProps {
  onCreatePost: () => void;
}

const NoPosts = ({ onCreatePost }: EmptyPostsStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center bg-[#121212] p-8 md:p-16 rounded-2xl charcha-text-center">
      <img
        src="https://media.tenor.com/ggjli1Kk3s4AAAAi/phone.gif"
        alt="No posts yet in Charcha Point"
        className="w-42 h-auto mx-auto opacity-80"
      />
      <h2 className="text-2xl font-bold text-charcha-text-light mt-6">
        The Conversation Starts With You
      </h2>
      <p className="text-charcha-text-muted mt-2 max-w-sm">
        It's a bit quiet in here. Be the first to share something and get the charcha going!
      </p>
      <button
        onClick={onCreatePost}
        className="inline-flex items-center gap-2 bg-charcha-purple text-white px-6 py-3 mt-8 rounded-lg text-lg font-semibold transition-transform duration-300 hover:scale-105 shadow-lg shadow-charcha-purple/30"
      > <PlusCircle size={22} />
        Create Post
      </button>
    </div>
  )
};

export default NoPosts;
