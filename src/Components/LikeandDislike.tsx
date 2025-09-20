import type { FC, ReactNode } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import SupabaseClient from "../Instances/SupabaseClient";
interface Props {
  postid: string | undefined
}

const actionLike = (id: string | undefined) => {
  SupabaseClient.from('votes').insert({


  })

}
const actionDisLike = (id: string | undefined) => {

}

const LikeandDislike: FC<Props> = ({ postid }): ReactNode => {
  return (
    <>
      <div className="flex mt-3 bg-[#1e1e1e] w-fit p-3 rounded-xl ml-1 gap-3 items-center">
        <ThumbsUp
          onClick={() => actionLike(postid)}
          size={30}
          color="white"
          className="cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 hover:text-blue-400"
        />
        <ThumbsDown
          onClick={() => actionDisLike(postid)}
          size={30}
          color="white"
          className="cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 hover:text-red-400"
        />
      </div>
    </>
  );
};

export default LikeandDislike
