import type { FC, ReactNode } from "react";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import RepliesCard, { type RepliesType } from "./RepliesCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import SupabaseClient from "../Instances/SupabaseClient";
import { useAuth } from "../Context/AuthContext";


const ReplyComment: FC<{ commentID: number }> = ({ commentID }): ReactNode => {
  const [commentContent, setCommentContent] = useState<string>('')
  console.log(commentContent)
  const { User } = useAuth()
  const queryclient = useQueryClient()
  const addReply = async (Reply: Omit<RepliesType, 'id' | 'created_at'>) => {
    const { data, error } = await SupabaseClient.from("Replies").insert(Reply)

    if (error) throw new Error("Failed to add reply")

    return data

  }

  const { mutate
  } = useMutation({
    mutationFn: (content: string) => {
      return addReply({
        author_name: User?.email?.split('@')[0] || "Unknown",
        content: content,
        user_id: User?.id || "",
        comment_id: commentID

      })


    },
    onSuccess: () => {
      queryclient.invalidateQueries({
        queryKey: [`Replies-${commentID}`],
      })
    },

  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!User || !commentContent) {
      throw new Error("Please Login or provide content")
    }
    mutate(commentContent)

    setCommentContent('')

  }
  return (
    <div >
      < form className="flex text-white flex-wrap items-center gap-3" onSubmit={(e) => handleSubmit(e)}>
        <input onChange={(e) => setCommentContent(e.target.value)} value={commentContent} placeholder="Enter your comment" className="py-2 px-7 bg-[#121212] rounded-xl  " />
        <button className="self-start py-1 hover:scale-110 px-4 bg-purple-800 rounded-xl " type="submit">Submit</button>
      </form >
    </div >
  )
}

const RepliesList: FC<{ commentid: number }> = ({ commentid }) => {

  const [isopen, setIsopen] = useState<boolean>(false)


  return (
    <div className="flex flex-col">
      <div className="self-end  cursor-pointer " onClick={() => setIsopen((prev) => !prev)} >{isopen ? <ChevronUp /> : <ChevronDown />}</div>
      {isopen && <div className=""><ReplyComment commentID={commentid} /> <RepliesCard commentid={commentid} /></div>}

    </div >
  )

}


export default RepliesList
