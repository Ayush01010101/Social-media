import type { FormEvent, ReactNode } from "react"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import SupabaseClient from "../Instances/SupabaseClient"
const Createpost = (): ReactNode => {
  interface PostType {
    title: string;
    content: string;

  }
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const createpostfunx = async (post: PostType) => {
    const { data, error } = await SupabaseClient.from("Posts").insert(post)

    if (error) {
      throw new Error("user not authenticate to post")
    }
    return data;
  }
  const { mutate
  } = useMutation({ mutationFn: createpostfunx })
  const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate({ title, content })
  }
  return (
    < div className="p-2 text-white" >

      <form className="flex flex-col w-fit " onSubmit={(e) => { HandleSubmit(e) }}>


        <input className="text-gray-300 " placeholder="Enter Title" type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
        <textarea placeholder="enter your contet" className="p-3" onChange={(e) => setContent(e.target.value)} value={content} />
        <button type="submit">create post</button>
      </form>


    </div >

  )

}
export default Createpost
