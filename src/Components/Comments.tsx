import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { useState } from "react";
const Comments: React.FC = (): ReactNode => {
  const [commentText, setCommentText] = useState<string>('')
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

  }
  return (
    <>
      <div className="text-white">

        <h2 className="text-xl p-3 mt-2">Comments</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <textarea rows={4} placeholder="Add a comment" className="p-4 outline-none w-full border-[1px] border-gray-800 rounded-xl" />
          <button className="p-2 bg-purple-600 font-medium rounded-md mt-4 ml-1 cursor-pointer">Post Comment</button>

        </form>
      </div>
    </>
  )
}


export default Comments
