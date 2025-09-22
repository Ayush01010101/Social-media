import type { ReactNode } from "react";
import LikeandDislike from "./LikeandDislike";
import { useQuery } from "@tanstack/react-query";

import { useParams } from "react-router";
import type { PostType } from "./PostList"; // Assuming this path is correct
import SupabaseClient from "../Instances/SupabaseClient";
import Comments from "./Comments";

const PostDetail = (): ReactNode => {
  const { id: postId } = useParams<{ id: string }>();

  const fetchPost = async (id: string): Promise<PostType> => {
    const { data, error } = await SupabaseClient.from("Posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error("Failed to fetch post details by id");
    }

    // Assuming your 'created_at' is a string. If not, adjust accordingly.
    // This is just for display purposes.
    const formattedData = {
      ...data,
      created_at_formatted: new Date(data.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    return formattedData as PostType;
  };

  const { data: post, isLoading, isError, error } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => {
      if (!postId) {
        throw new Error("Post ID is missing");
      }
      return fetchPost(postId);
    },
    enabled: !!postId,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
        <svg className="animate-spin h-8 w-8 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-lg">Loading Post...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="bg-red-900/20 border border-red-500/50 text-red-400 p-6 rounded-lg max-w-md text-center">
          <h3 className="font-bold text-xl mb-2">Something went wrong</h3>
          <p>Error: {error.message}</p>
        </div>
      </div>
    );
  }

  // Destructure post data for cleaner JSX
  const { title, content, imageURL, author_name, avatar_url, created_at_formatted } = post;

  return (
    <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <article className="bg-[#1e1e1e] border border-slate-800 rounded-2xl shadow-xl shadow-blue-500/5">

        <div className="p-6 sm:p-8">
          {/* Author Meta Information */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={avatar_url || "https://via.placeholder.com/40"}
              alt={author_name}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <p className="text-white font-semibold text-lg">{author_name}</p>
              <p className="text-slate-400 text-sm">{created_at_formatted}</p>
            </div>

          </div>

          {/* Post Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            {title}
          </h1>
        </div>

        {/* Post Image */}
        {imageURL && (
          <div className="px-2 sm:px-4">
            <img
              className="w-1/2 rounded-xl aspect-video object-cover"
              src={imageURL}
              alt={title}
            />
          </div>
        )}

        {/* Post Content */}
        <div className="p-6 sm:p-8 md:p-10">
          <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-line">
            {content}
          </p>
        </div>
      </article>
      <LikeandDislike postid={postId} />
      <Comments />
    </main>
  );
};

export default PostDetail;
