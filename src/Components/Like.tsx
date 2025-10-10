import { useState, type FC, type ReactNode } from "react";
import { Heart } from 'lucide-react'
import SupabaseClient from "../Instances/SupabaseClient";
import { useAuth } from "../Context/AuthContext";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import type { Likes } from "./PostList";
interface props {
  postID: number;
  LikesARR: Likes[]
  like: number
}



const Like: FC<props> = ({ postID, like, LikesARR }): ReactNode => {
  const queryclient = useQueryClient()
  const { User } = useAuth()
  const isLiked = LikesARR.find((obj: Likes) => obj.post_id == postID && obj.user_id == User?.id)
  async function addLike() {
    if (isLiked) {
      const { data, error } = await SupabaseClient.from("Likes").delete().match({
        user_id: User?.id,
        post_id: postID
      })
    } else {
      const { data, error } = await SupabaseClient.from("Likes").insert({
        user_id: User?.id,
        post_id: postID,
        likes: 1
      })

    }
  }


  const { mutate, error } = useMutation({
    mutationFn: addLike,
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["fetchUserslikes"] })
    }
  })
  return (
    <div onClick={(e) => {
      e.stopPropagation()
      mutate()
    }} className="flex items-center text-gray-400 hover:text-gray-200 flex-wrap gap-2 ">
      <Heart fill={isLiked ? 'red' : ''} size={18} />
      <div>{like}</div>

    </div>
  )
}
export default Like;
