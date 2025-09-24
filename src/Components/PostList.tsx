import type { FC, ReactNode } from "react"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../Context/AuthContext";
import PostCard from "./PostCard";
import SupabaseClient from "../Instances/SupabaseClient";
export interface PostType {
  id: number;
  created_at: string;
  title: string;
  avatar_url: string | null;
  content: string;
  imageURL: string | null;
  author_name: string;
  user_id: string
}
const PostList: FC = () => {


  const { User } = useAuth()
  const FetchPost = async (): Promise<PostType[]> => {
    const { data, error } = await SupabaseClient.from('Posts').select('*')
    if (error) throw new Error("failed to fetch posts")
    return data as PostType[]
  }
  const { data, error } = useQuery({ queryKey: ["postlist"], queryFn: FetchPost })
  console.log(data)
  return (
    <div className="flex sm:mx-0 mx-2 flex-col  items-center gap-6 ">
      {data?.map((post) => (
        < div key={post.id} className=" sm:w-[56%]">
          < PostCard authorAvatar={post.avatar_url || ""} createdAt={post.created_at} imageURL={post.imageURL} title={post.title} content={post.content} id={post.id} />
        </div>
      ))
      }
    </div >
  )

}
export default PostList
