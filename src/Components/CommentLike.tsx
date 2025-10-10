import { Heart } from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useParams } from "react-router";
import SupabaseClient from "../Instances/SupabaseClient";

interface CommentLikeProps {
  comment_id: number;
  likes: number;
}

const CommentLike = ({ comment_id, likes }: CommentLikeProps): ReactNode => {
  const { id: PostId } = useParams();
  const { User } = useAuth();
  const queryClient = useQueryClient();

  const { data: likeStatus } = useQuery({
    queryKey: ['commentLikeStatus', comment_id, User?.id],
    queryFn: async () => {
      if (!User?.id) return null;

      const { data } = await SupabaseClient
        .from("CommentLikes")
        .select('isLike')
        .eq('user_id', User.id)
        .eq('comment_id', comment_id)
        .maybeSingle();

      return data;
    },
    enabled: !!User?.id,
  });

  const handleLikeToggle = async () => {
    if (!User?.id) throw new Error("User is not logged in");
    const { data: existingLike } = await SupabaseClient
      .from("CommentLikes")
      .select('id, isLike')
      .eq('user_id', User.id)
      .eq('comment_id', comment_id)
      .maybeSingle();

    if (existingLike) {
      const { error } = await SupabaseClient
        .from("CommentLikes")
        .update({ isLike: !existingLike.isLike })
        .eq('id', existingLike.id);
      if (error) throw new Error("Failed to update like: " + error.message);
    } else {
      const { error } = await SupabaseClient
        .from("CommentLikes")
        .insert({ comment_id: comment_id, user_id: User.id, isLike: true });
      if (error) throw new Error("Failed to insert like: " + error.message);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleLikeToggle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`comments-${PostId}`] });
      queryClient.invalidateQueries({ queryKey: ['commentLikeStatus', comment_id, User?.id] });
    },
    onError: (error) => {
      console.error("Like mutation failed:", error.message);
    }
  });

  // 2. Ek variable banayein jo batayega ki heart icon red hona chahiye ya nahi
  const isLikedByUser = likeStatus?.isLike === true;

  return (
    <div
      onClick={() => !isPending && mutate()}
      className="cursor-pointer text-white flex items-center gap-1"
    >
      <Heart
        size={20}
        // 3. Yahan hardcoded 'true' ki jagah `isLikedByUser` variable ka istemal karein
        className={isLikedByUser ? "text-red-500" : "text-gray-500"}
        fill={isLikedByUser ? "currentColor" : "none"}
      />
      {likes}
    </div>
  );
};

export default CommentLike;
