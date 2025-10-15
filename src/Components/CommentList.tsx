import type { ReactNode } from "react";
import CommentLike from "./CommentLike";
import { useQuery } from "@tanstack/react-query";
import SupabaseClient from "../Instances/SupabaseClient";
import RepliesList from "./RepliesList";
import { formatDistanceToNow } from "date-fns";

const CommentList = ({ postid }: { postid: number }): ReactNode => {
  interface comment {
    id: number
    created_at: string,
    post_id: number,
    author_name: string,
    content: string,
    likes: number,
    user_id: string
  }
  const FetchComments = async (): Promise<comment[]> => {
    const { data, error } = await SupabaseClient.from("Comments").select('*').eq('post_id', postid).order('created_at', { ascending: false })
    if (error) throw new Error("Failed to fetch commments")

    return data;
  }
  const { data } = useQuery({ queryFn: FetchComments, queryKey: [`comments-${postid}`], refetchOnWindowFocus: false, refetchOnMount: false })

  if (data && data.length == 0) {
    return <></>
  }
  return (
    <>
      <div className="bg-[#1e1e1e] flex gap-5 flex-col rounded-xl p-3 mt-5 max-h-[50vh] md:max-h-[60vh] md:p-5 w-full">
        <div className="flex max-h-[350px] md:max-h-[500px] no-scrollbar flex-col gap-5 overflow-auto">
          {data?.map((comment: comment): ReactNode => {
            return (
              <div
                key={comment.id}
                className="p-4 md:p-6 shadow-[1px_2px_5px_1px_rgba(0,0,0,0.7)] shadow-black/45 text-gray-300 flex flex-col rounded-md w-full"
              >
                <div className="text-xs sm:text-sm py-1 flex flex-wrap gap-2 sm:gap-3 items-center">
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                    className="h-6 w-6 rounded-2xl object-cover"
                    alt="profile"
                  />
                  <p className="truncate max-w-[5rem] sm:max-w-[10rem]">{comment.author_name}</p>
                  {/* Responsive date font size */}
                  <p
                    className={`
                      bg-black/20 h-fit w-fit rounded-xl 
                      text-[10px] sm:text-[11px] md:text-sm
                      px-2 py-0.5
                    `}
                  >
                    {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                  </p>
                  <CommentLike likes={comment.likes || 0} comment_id={comment.id} />
                </div>
                <div className="font-medium text-base md:text-xl break-words mt-1 mb-2 sm:mb-3">
                  {comment.content}
                </div>
                <div>
                  <RepliesList commentid={comment.id} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CommentList;
