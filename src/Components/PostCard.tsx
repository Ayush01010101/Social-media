import type React from "react";
import { useNavigate } from "react-router";
import { formatDistanceToNow } from "date-fns";
import type { ReactNode } from "react";
import { Heart, MessageSquare, Share2 } from "lucide-react";
import { Link } from "react-router";

interface Props {
  id: number | string;
  authorName: string;
  authorAvatar?: string; // URL to the author's avatar image
  title: string;
  content: string;
  imageURL?: string | null;
  createdAt: string; // e.g., "5h ago" or "Sep 17"
}

const PostCard: React.FC<Props> = ({
  id,
  authorName,
  authorAvatar,
  title,
  content,
  imageURL,
  createdAt,
}): ReactNode => {


  const timeago: string = formatDistanceToNow(new Date(createdAt), { addSuffix: true })
  const navigate = useNavigate()

  return (


    <div className="
      w-full
      bg-[#111827] 
      border border-gray-700
      rounded-xl
      p-6
      mx-auto
      cursor-pointer
      transition-all duration-300 ease-in-out
      hover:border-purple-500   
      hover:-translate-y-1        
      hover:shadow-lg hover:shadow-purple-500/20    ">
      {/* Card Header: Author Info */}
      <div className="flex items-center gap-4">
        <img
          className="w-12 h-12 object rounded-full object-cover border-2 border-gray-600"
          src={authorAvatar || `https://api.dicebear.com/8.x/initials/svg?seed=${authorName}`} // Fallback to initials avatar
          alt={`${authorName || "unknown"}'s avatar`}
        />
        <div className="flex flex-col">
          <p className="font-bold text-white text-lg">{authorName}</p>
          <p className="text-sm text-gray-400"> {timeago}</p>
        </div>
      </div>

      <div onClick={() => navigate(`/post/${id}`)} className="mt-5 ">
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2> <p className="text-gray-300 line-clamp-3"> {/* Truncates content to 3 lines */} {content}
        </p>
      </div>

      {
        imageURL && (
          <div className="mt-5">
            <img src={imageURL} alt={title} className="w-12 h-auto rounded-lg object-cover" />
          </div>
        )
      }

      <div className="mt-6 pt-4 border-t border-gray-700 flex justify-between items-center">
        <div className="flex items-center gap-6 text-gray-400">
          {/* Likes */}
          <button className="flex items-center gap-2 transition-colors hover:text-pink-500">
            <Heart size={20} strokeWidth={2.5} />
            <span className="font-medium">{0}</span>
          </button>
          {/* Comments */}
          <button className="flex items-center gap-2 transition-colors hover:text-blue-400">
            <MessageSquare size={20} strokeWidth={2.5} />
            <span className="font-medium">{0}</span>
          </button>
        </div>

        {/* Share Button */}
        <button className="text-gray-400 transition-colors hover:text-purple-500">
          <Share2 size={20} strokeWidth={2.5} />
        </button>
      </div>
    </div >
  );
};

export default PostCard;
