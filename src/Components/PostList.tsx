import type { FC, ReactNode } from "react"
import { useQuery } from "@tanstack/react-query"
import PostCard from "./PostCard";
import SupabaseClient from "../Instances/SupabaseClient";
const PostList: FC = () => {
  interface PostType {
    id: number;
    created_at: string;
    title: string;
    content: string;
    imageURL: string | null;
    user_id: string
  }
  const FetchPost = async (): Promise<PostType[]> => {
    const { data, error } = await SupabaseClient.from('Posts').select('*')
    if (error) throw new Error("failed to fetch posts")
    return data as PostType[]
  }
  const { data, error } = useQuery({ queryKey: ["postlist"], queryFn: FetchPost })
  console.log(data)
  return (
    <div>
      {data?.map((post) => (
        < div >
          <PostCard title={post.title} content={post.content} id={post.id} />

        </div>
      ))

    </div >
  )
}
export default PostList
