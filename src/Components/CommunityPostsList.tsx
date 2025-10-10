import type { FC, ReactNode } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import SupabaseClient from "../Instances/SupabaseClient";
import PostCard from "./PostCard";
import type { PostType } from "./PostList";

// A Skeleton component to show while posts are loading using pure Tailwind CSS
const PostSkeleton: FC = (): ReactNode => (
  <div className="w-full max-w-2xl rounded-lg border border-neutral-800 bg-neutral-900 p-4 shadow-md animate-pulse">
    <div className="flex items-center gap-3 mb-4">
      <div className="h-10 w-10 rounded-full bg-neutral-700"></div>
      <div className="flex-1">
        <div className="h-4 w-1/4 rounded bg-neutral-700"></div>
        <div className="h-3 w-1/3 mt-1 rounded bg-neutral-700"></div>
      </div>
    </div>
    <div className="h-5 w-3/4 rounded bg-neutral-700 mb-2"></div>
    <div className="h-24 w-full rounded bg-neutral-700"></div>
  </div>
);

const CommunityPostsList: FC = (): ReactNode => {
  const { communityid } = useParams();

  async function fetchPosts(): Promise<PostType[]> {
    if (!communityid) return [];

    const { data, error } = await SupabaseClient.from('Posts')
      .select('*')
      .eq("community_id", communityid)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw new Error("Failed to get posts");
    return data as PostType[];
  }

  const { data, isPending, isError, error } = useQuery({
    queryFn: fetchPosts,
    queryKey: ['community_posts', communityid],
  });

  if (isPending) {
    return (
      <div className="flex flex-col items-center gap-6 pt-8">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-red-400 pt-20">
        <h2 className="text-xl font-semibold">Failed to Load Posts</h2>
        <p className="text-neutral-400">{error.message}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-neutral-500 pt-20">
        <h2 className="text-xl font-semibold">No Posts Yet</h2>
        <p className="text-neutral-400">Be the first to create a post in this community!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {data.map((post) => (
        <div
          key={post.id}
          className="w-full max-w-2xl px-2 sm:px-0 animate-fadeIn"
        >
          <PostCard
            authorName={post.author_name}
            authorAvatar={post.avatar_url || ""}
            createdAt={post.created_at}
            imageURL={post.imageURL}
            title={post.title}
            content={post.content}
            id={post.id}
          />
        </div>
      ))}
    </div>
  );
};

export default CommunityPostsList;
