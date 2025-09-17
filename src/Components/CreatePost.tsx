import type { FormEvent, ReactNode } from "react"
import { useAuth } from "../Context/AuthContext"
import { LoaderCircle } from "lucide-react"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import SupabaseClient from "../Instances/SupabaseClient"

const Createpost = (): ReactNode => {
  const { User } = useAuth();
  interface PostType {
    title: string;
    content: string;
    avatar_url?: string | null;
    imageURL?: string | null;
  }
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const createpostfunx = async (post: PostType) => {
    const { data, error } = await SupabaseClient.from("Posts").insert(post)

    if (error) {
      throw new Error("user not authenticate to post")
    }
    return data;
  }
  const { mutate, isPending, error, isSuccess, isError } = useMutation({ mutationFn: createpostfunx })
  const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let imageURL = null
    if (selectedFile) {
      const filepath = `${selectedFile.name}-${Date.now()}`
      const { data, error } = await SupabaseClient.storage.from("images").upload(filepath, selectedFile)
      if (data) {
        const { data: imagepublicURL } = await SupabaseClient.storage.from("images").getPublicUrl(data.path)
        imageURL = imagepublicURL?.publicUrl;
      }
    }
    if (imageURL) {
      mutate({ title, content, imageURL, avatar_url: User?.user_metadata.avatar_url })
      return;
    }
    mutate({ title, content, avatar_url: User?.user_metadata.avatar_url })
  }

  return (
    <div className="flex justify-center items-center  h-[70vh]">
      <div className="bg-[#232946]  shadow - 2xl p-8 border-white  rounded-2xl mx-4 sm:mx-0 ">
        < h2 className="text-3xl font-bold text-center mb-6 text-[#E5E5E5]" > Create a New Post</h2 >
        <form className="flex flex-col gap-5" onSubmit={HandleSubmit}>
          <div>
            <label className="block text-[#B8C1EC] font-semibold mb-2" htmlFor="title">Title</label>
            <input
              id="title"
              className="w-full px-4 py-2 rounded-lg bg-[#121629] text-[#E5E5E5] border border-[#393053] focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
              placeholder="Enter Title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>
          <div>
            <label className="block text-[#B8C1EC] font-semibold mb-2" htmlFor="content">Content</label>
            <textarea
              id="content"
              placeholder="Enter your content"
              className="w-full px-4 py-3 rounded-lg bg-[#121629] text-[#E5E5E5] border border-[#393053] focus:outline-none focus:ring-2 focus:ring-purple-600 transition resize-none min-h-[120px]"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              required
            />
          </div>
          <div>
            <label className="block text-[#B8C1EC] font-semibold mb-2" htmlFor="image">Image (optional)</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              className="block w-full text-[#B8C1EC] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#393053] file:text-[#E5E5E5] hover:file:bg-purple-700 transition"
              onChange={(e) => {
                if (e.target.files) {
                  setSelectedFile(e.target.files[0])
                }
              }}
            />
            {selectedFile && (
              <div className="mt-2 text-sm text-[#E5E5E5]">
                Selected: <span className="font-medium">{selectedFile.name}</span>
              </div>
            )}
          </div>
          {isError && <div className="text-red-700 font-light text-sm ">{error.message}</div>}
          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-bold py-3 rounded-lg shadow-lg transition transform hover:scale-105"
          >
            {isPending ? <div className="flex justify-center"><LoaderCircle className="animate-spin" /></div> : 'Create Post'}


          </button>
        </form>
      </div >
    </div >
  )
}

export default Createpost
