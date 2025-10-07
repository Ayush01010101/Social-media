import type { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import SupabaseClient from "../Instances/SupabaseClient";
import RepliesList from "./RepliesList";
import { formatDistanceToNow } from "date-fns";
import { Heart } from "lucide-react";

const CommentList = ({ postid }: { postid: number }): ReactNode => {
  console.log(postid)
  interface comment {
    id: number
    created_at: string,
    post_id: number,
    author_name: string,
    content: string,
    user_id: string
  }
  const FetchComments = async (): Promise<comment[]> => {
    const { data, error } = await SupabaseClient.from("Comments").select('*').eq('post_id', postid).order('created_at', { ascending: false })
    if (error) throw new Error("Failed to fetch commments")

    return data;
  }
  const { data, error } = useQuery({ queryFn: FetchComments, queryKey: [`comments-${postid}`], refetchOnWindowFocus: false, refetchOnMount: false })

  if (data && data.length == 0) {
    return <></>
  }
  return (
    <>
      <div className="bg-[#1e1e1e] flex gap-5 flex-col rounded-xl p-3 mt-5 max-h-1/2 ">
        <div className="flex max-h-96  no-scrollbar  flex-col gap-5 overflow-auto">

          {data?.map((comment: comment): ReactNode => {



            return (
              <div className="p-6   shadow-[1px_2px_5px_1px_rgba(0,0,0,0.7)] shadow-black/45  text-gray-300 flex flex-col  rounded-md">
                <div className="text-sm py-1 flex gap-3  items-center">
                  <img src="https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" className="h-6 rounded-2xl" />
                  <p>{comment.author_name}</p>

                  <p className="p-2 bg-black/20 rounded-xl"> {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</p>

                  <Heart size={20} />
                </div>
                <div className="font-medium text-xl">

                  {comment.content}
                </div>

                <div className="">
                  <RepliesList commentid={comment.id} />
                </div>

              </div>
            )
          })}
        </div>
      </div >
    </>
  )
}

export default CommentList
