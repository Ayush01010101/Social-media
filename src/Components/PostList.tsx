import type { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import SupabaseClient from "../Instances/SupabaseClient";
import PostCard from "./PostCard";

export interface PostType {
  id: number;
  created_at: string;
  title: string;
  avatar_url: string | null;
  content: string;
  imageURL: string | null;
  community_id: number;
  author_name: string;
  user_id: string;
}

const PostList: FC = () => {
  const FetchPost = async (): Promise<PostType[]> => {
    const { data, error } = await SupabaseClient
      .from("Posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error("failed to fetch posts");
    return (data || []) as PostType[];
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["postlist"],
    queryFn: FetchPost,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="space-y-4 w-full ">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse  rounded-xl border border-gray-800 bg-[#11141a] h-60 p-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-9 w-9 rounded-full bg-gray-800" />
              <div className="flex-1">
                <div className="h-3 w-32 bg-gray-800 rounded mb-2" />
                <div className="h-3 w-20 bg-gray-800 rounded" />
              </div>
            </div>
            <div className="h-24 bg-gray-900 rounded-md" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl  border border-red-900/40 bg-red-900/10 p-4 text-red-300">
        Failed to load posts. Please try again.
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="rounded-xl border border-gray-800 bg-[#11141a] p-8 text-center text-gray-300">
        No posts yet. Be the first to share something!
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {data.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
};

export default PostList;

