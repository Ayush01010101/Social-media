import type { ReactNode } from "react"
import { formatDistanceToNow } from "date-fns";
import type { FC } from "react";
import { useQuery } from "@tanstack/react-query"
import SupabaseClient from "../Instances/SupabaseClient";
import { useAuth } from "../Context/AuthContext";

export interface RepliesType {
  id: number
  created_at: string,
  author_name: string,
  content: string,
  user_id: string,
  comment_id: number
}

async function FetchReplies(commentid: number, userid: string): Promise<RepliesType[] | null> {
  const { data, error } = await SupabaseClient.from("Replies").select("*").eq('comment_id', commentid)
  console.log(data)
  if (error) return null;
  return data as RepliesType[]

}
const RepliesCard: FC<{ commentid: number }> = ({ commentid }): ReactNode => {
  const { User } = useAuth()
  if (!User?.id) return
  const { data } = useQuery({ queryFn: () => FetchReplies(commentid, User.id), queryKey: [`Replies-${commentid}`], refetchOnWindowFocus: false, refetchOnMount: false })
  return (
    <div className="bg-[#1e1e1e] flex gap-5 flex-col rounded-xl p-3 mt-5 max-h-1/2 ">
      <div className="flex max-h-96  no-scrollbar  flex-col gap-5 overflow-auto">

        {data?.map((Reply: RepliesType): ReactNode => {

          return (
            <div key={Reply.id} className="ml-4 shadow-[1px_2px_5px_1px_rgba(0,0,0,0.7)] shadow-black/45  text-white flex flex-col   rounded-md">
              <div className="text-sm py-1 flex gap-3  items-center">
                <p>{Reply.author_name}</p>
                <p className="p-2 bg-black/20 rounded-xl"> {formatDistanceToNow(new Date(Reply.created_at), { addSuffix: true })}</p>

              </div>
              <div className="font-medium text-xl">
                {Reply.content}
              </div>
            </div>
          )
        })}
      </div>
    </div >


  )
}

export default RepliesCard
