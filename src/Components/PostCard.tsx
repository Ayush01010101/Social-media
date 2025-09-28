// PostCard.tsx
import type { FC } from "react";
import type { PostType } from "./PostList";
import {
  Bookmark,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const PostCard: FC<{ post: PostType }> = ({ post }) => {
  const timeAgo = formatDistanceToNow(new Date(post.created_at), {
    addSuffix: true,
  });

  return (
    <article className="rounded-xl border border-gray-800 bg-[#11141a] px-4 py-4 md:px-5 md:py-5 shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset]">
      {/* Header */}
      <header className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={
              post.avatar_url ||
              `https://api.dicebear.com/7.x/thumbs/svg?seed=${post.author_name}`
            }
            alt={post.author_name}
            className="h-10 w-10 rounded-full border border-gray-800"
          />
          <div className="leading-tight">
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-medium text-white">
                {post.author_name}
              </span>
              <span className="text-xs text-gray-400">• {timeAgo}</span>
            </div>
            <div className="text-xs text-gray-400">
              Gaming Hub
              {/* replace with actual community name if available */}
            </div>
          </div>
        </div>

        <button
          className="text-gray-400 hover:text-gray-200 p-1 rounded-md hover:bg-white/5"
          aria-label="More options"
        >
          <MoreHorizontal size={18} />
        </button>
      </header>

      {/* Body */}
      {post.title && (
        <h3 className="mt-3 text-[15px] md:text-[16px] font-normal text-gray-100">
          {post.title}
        </h3>
      )}

      {post.content && (
        <p className="mt-2 text-[14px] leading-6 text-gray-300">
          {post.content}
        </p>
      )}

      {/* Media placeholder / image */}
      <div className="mt-3">
        {post.imageURL ? (
          <img
            src={post.imageURL}
            alt="post media"
            className="w-full rounded-md border border-gray-800 object-cover max-h-[420px]"
          />
        ) : (
          <div className="w-full rounded-md border border-gray-800 bg-[#1a1f2b] text-gray-400 flex items-center justify-center h-[220px]">
            Gaming Screenshot
          </div>
        )}
      </div>

      {/* Footer actions */}
      <footer className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Action icon={<Heart size={18} />} label="124" />
          <Action icon={<MessageCircle size={18} />} label="23" />
          <Action icon={<Share2 size={18} />} label="8" />
        </div>
        <button className="text-gray-400 hover:text-gray-200 p-2 rounded-md hover:bg-white/5">
          <Bookmark size={18} />
        </button>
      </footer>
    </article>
  );
};

const Action: FC<{ icon: React.ReactNode; label?: string }> = ({
  icon,
  label,
}) => (
  <button className="group inline-flex items-center gap-2 rounded-md px-2 py-1 text-gray-400 hover:text-gray-200 hover:bg-white/5">
    <span className="text-gray-400 group-hover:text-gray-200">{icon}</span>
    {label ? <span className="text-sm">{label}</span> : null}
  </button>
);

export default PostCard;

