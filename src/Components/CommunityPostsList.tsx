import SupabaseClient from "../Instances/SupabaseClient";
import type { FC, ReactNode } from "react";
import type { PostType } from "./PostList";
import { useQuery } from "@tanstack/react-query";
import PostCard from "./PostCard";
import { useParams } from "react-router";

const CommunityPostsList: FC = (): ReactNode => {

  const { communityid } = useParams();

  async function FetchPosts(): Promise<PostType[]> {
    const { data, error } = await SupabaseClient.from('Posts').select('*').eq("community_id", communityid).limit(10)
    if (error) throw new Error("failed to get posts")
    return data as PostType[]
  }
  const { data, isPending, isError, error } = useQuery({ queryFn: FetchPosts, queryKey: ['community_posts'], refetchOnMount: false, refetchOnWindowFocus: false })
  return (
    <div>
      <div className="flex sm:mx-0 mx-2 flex-col  items-center gap-6 ">
        {data?.map((post) => (
          < div key={post.id} className=" sm:w-[56%]">
            < PostCard authorName={post.author_name} authorAvatar={post.avatar_url || ""} createdAt={post.created_at} imageURL={post.imageURL} title={post.title} content={post.content} id={post.id} />
          </div>
        ))
        }
      </div >

    </div >
  )

}

export default CommunityPostsList
