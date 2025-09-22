import type { FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import SupabaseClient from "../Instances/SupabaseClient";
import { useAuth } from "../Context/AuthContext";

interface Props {
  postid: string | undefined;
}

interface updateOBJtype {
  dislikes?: number;
  likes?: number;
}

const LikeandDislike: React.FC<Props> = ({ postid }) => {
  const { User } = useAuth();

  // Helper to get the correct table name (case sensitive)
  const TABLE_NAME = "LikeAndDislike"; // Make sure this matches your Supabase table exactly

  const actionLikeAndDislike = async (updateOBJ: updateOBJtype) => {
    if (!User?.id || !postid) throw new Error("User or Post ID missing");

    // Check if a row already exists for this user and post
    const { data, error } = await SupabaseClient
      .from(TABLE_NAME)
      .select("*")
      .eq("user_id", User.id)
      .eq("post_id", postid);

    if (error) throw new Error("Select query failed: " + error.message);

    if (data && data.length > 0) {
      // --- Update existing row ---
      // Only update the field that is being changed (like or dislike)
      const updateFields: updateOBJtype = {};
      if (typeof updateOBJ.likes !== "undefined") {
        updateFields.likes = updateOBJ.likes;
        updateFields.dislikes = 0;
      }
      if (typeof updateOBJ.dislikes !== "undefined") {
        updateFields.dislikes = updateOBJ.dislikes;
        updateFields.likes = 0;
      }

      const { data: updatedata, error: updateerror } = await SupabaseClient
        .from(TABLE_NAME)
        .update(updateFields)
        .eq("user_id", User.id)
        .eq("post_id", postid)
        .select();

      if (updateerror) throw new Error("Failed to update row: " + updateerror.message);

      return updatedata;
    } else {
      // --- Insert new row ---
      const insertFields = {
        user_id: User.id,
        post_id: postid,
        likes: updateOBJ.likes ?? 0,
        dislikes: updateOBJ.dislikes ?? 0,
      };

      const { data: insertData, error: insertError } = await SupabaseClient
        .from(TABLE_NAME)
        .insert([insertFields])
        .select();

      if (insertError) throw new Error("Failed to insert row: " + insertError.message);

      return insertData;
    }
  };

  const { mutate } = useMutation({
    mutationFn: (obj: updateOBJtype) => actionLikeAndDislike(obj),
  });

  return (
    <div className="flex mt-3 bg-[#1e1e1e] w-fit p-3 rounded-xl ml-1 gap-3 items-center">
      <ThumbsUp
        onClick={() => mutate({ likes: 1 })}
        size={30}
        color="white"
        className="cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 hover:text-blue-400"
      />
      <ThumbsDown
        onClick={() => mutate({ dislikes: 1 })}
        size={30}
        color="white"
        className="cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 hover:text-red-400"
      />
    </div>
  );
};

export default LikeandDislike;
