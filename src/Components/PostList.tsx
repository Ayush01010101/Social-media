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
  community_id: number;
  author_name: string;
  user_id: string
}
const PostList: FC = () => {


  const FetchPost = async (): Promise<PostType[]> => {
    const { data, error } = await SupabaseClient.from('Posts').select('*').order('created_at', { ascending: false })
    if (error) throw new Error("failed to fetch posts")
    return data as PostType[]
  }
  const { data, error } = useQuery({ refetchOnMount: false, refetchOnWindowFocus: false, queryKey: ["postlist"], queryFn: FetchPost })
  return (
    <></>
  )

}
export default PostList
