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
    <div className="mt-2 sm:mt-3">
      <form className="flex text-white flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3" onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => setCommentContent(e.target.value)}
          value={commentContent}
          placeholder="Enter your reply..."
          className="py-2 px-3 sm:px-4 md:px-7 bg-[#121212] rounded-xl text-sm sm:text-base flex-1 min-w-0"
        />
        <button
          className="self-stretch sm:self-start py-2 sm:py-1 hover:scale-105 transition-transform px-3 sm:px-4 bg-purple-800 rounded-xl text-sm sm:text-base font-medium"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

const RepliesList: FC<{ commentid: number }> = ({ commentid }) => {

  const [isopen, setIsopen] = useState<boolean>(false)


  return (
    <div className="flex flex-col">
      <div
        className="self-end cursor-pointer p-1 hover:bg-gray-800/50 rounded-md transition-colors"
        onClick={() => setIsopen((prev) => !prev)}
      >
        {isopen ? (
          <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        )}
      </div>
      {isopen && (
        <div className="mt-1">
          <ReplyComment commentID={commentid} />
          <RepliesCard commentid={commentid} />
        </div>
      )}
    </div>
  )

}


export default RepliesList

