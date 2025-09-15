import type { FormEvent, ReactNode } from "react"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
const Createpost = (): ReactNode => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')


  const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

  }
  return (
    < div className="p-2" >

      <form onSubmit={(e) => { HandleSubmit(e) }}>


        <input className="" type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
        <textarea placeholder="enter your contet" className="p-3" onChange={(e) => setContent(e.target.value)} value={content} />
        <button type="submit">create post</button>
      </form>


    </div >

  )

}
export default Createpost
