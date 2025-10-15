import type { ReactNode } from "react";
import { formatDistanceToNow } from "date-fns";
import type { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import SupabaseClient from "../Instances/SupabaseClient";
import { useAuth } from "../Context/AuthContext";
import { ThumbsUp } from "lucide-react";

export interface RepliesType {
  id: number;
  created_at: string;
  author_name: string;
  content: string;
  user_id: string;
  comment_id: number;
}

async function FetchReplies(commentid: number): Promise<RepliesType[] | null> {
  const { data, error } = await SupabaseClient.from("Replies")
    .select("*")
    .eq("comment_id", commentid)
    .order("created_at", { ascending: false });
  if (error) return null;
  return data as RepliesType[];
}

const RepliesCard: FC<{ commentid: number }> = ({ commentid }): ReactNode => {
  const { User } = useAuth();
  if (!User?.id) return null;
  const { data } = useQuery({
    queryFn: () => FetchReplies(commentid),
    queryKey: [`Replies-${commentid}`],
    refetchOnWindowFocus: false,
    refetchOnMount: false,

  });

  return (
    <div className="bg-[#121212] flex gap-2 sm:gap-3 md:gap-5 flex-col rounded-xl mt-3 sm:mt-4 md:mt-5 max-h-[60vh]">
      <div className="flex max-h-60 md:max-h-96 no-scrollbar gap-2 sm:gap-3 md:gap-5 flex-col overflow-auto">
        {data?.map((Reply: RepliesType): ReactNode => {
          return (
            <div
              key={Reply.id}
              className="
              ml-0.5 sm:ml-1 md:ml-4 py-2 sm:py-3 md:py-5 px-2 sm:px-3 md:px-4 
              shadow-[1px_2px_5px_1px_rgba(0,0,0,0.7)]  
              shadow-black/45 text-white flex flex-col rounded-md
              w-full
              "
            >
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-3 py-1 text-xs sm:text-sm">
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                  className="h-5 w-5 sm:h-6 sm:w-6 rounded-2xl object-cover"
                  alt="profile"
                />
                <p className="truncate max-w-[5rem] sm:max-w-[8rem] md:max-w-[10rem] text-xs sm:text-sm">{Reply.author_name}</p>
                <p
                  className={`
                    bg-black/20 h-fit w-fit rounded-lg sm:rounded-xl 
                    text-[9px] xs:text-[10px] sm:text-[11px] md:text-sm
                    px-1.5 py-0.5 sm:px-2
                  `}
                >
                  {formatDistanceToNow(new Date(Reply.created_at), {
                    addSuffix: true,
                  })}
                </p>
                <ThumbsUp className="opacity-90 w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" color="white" />
              </div>
              <div className="font-medium text-sm md:text-base break-words mt-1">
                {Reply.content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RepliesCard;
