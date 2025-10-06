import type { FormEvent, ReactNode } from "react";
import { useAuth } from "../Context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import SupabaseClient from "../Instances/SupabaseClient";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

interface Props {
  postid: string;
}
interface CommentType {
  content: string;
}

const Comments: React.FC<Props> = ({ postid }): ReactNode => {
  const queryClient = useQueryClient()
  const { User } = useAuth();
  const [commentText, setCommentText] = useState<string>("");

  async function CreateComment(
    comment: CommentType,
    authorName: string,
    userid: string,
    PostId: string
  ) {
    const { data, error } = await SupabaseClient.from("Comments").insert({
      post_id: PostId,
      author_name: authorName,
      content: comment.content,
      user_id: userid,
    });
    if (error) throw new Error(error.message);
    return data;
  }

  const { mutate, isError, isPending
    , error } = useMutation({

      mutationFn: async (comment: CommentType) => {

        if (!User?.email) throw new Error("User not logged in");
        return await CreateComment(
          comment,
          User.email.split("@")[0],
          User.id,
          postid
        );


      },

      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [`comments-${postid}`] })
      }
    });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!commentText) return;
    e.preventDefault();

    mutate({ content: commentText })
    setCommentText("")

  };

  return (
    <div className="text-white">
      <h2 className="text-xl p-3 mt-2">Comments</h2> <form onSubmit={handleSubmit}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
          rows={4}
          placeholder="Add a comment"
          className="p-4 outline-none w-full border-[1px] border-gray-800 rounded-xl"
        />
        {isError && <p className="text-red-500">{error.message}</p>}
        <button
          type="submit"
          className="p-2 bg-purple-600 font-medium rounded-md mt-4 ml-1 cursor-pointer"
        >

          {isPending ? <div className="flex justify-center gap-3"><LoaderCircle className="animate-spin" /> Create Comment</div> : <p>Create Comment</p>}
        </button>

      </form>
    </div>
  );
};

export default Comments;
