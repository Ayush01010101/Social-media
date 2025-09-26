import type { FC, ReactNode } from "react";
import { useParams } from "react-router";
import CommunityPostsList from "./CommunityPostsList";
import SupabaseClient from "../Instances/SupabaseClient";
import { useQuery } from "@tanstack/react-query";
import type { PostType } from "./PostList";
import type { CommunitiesType } from "./Communities";


const CommunityPosts: FC = (): ReactNode => {

  const { communityid } = useParams();
  async function fetchCommunityDetails(): Promise<CommunitiesType> {
    const { data, error } = await SupabaseClient.from("Communities").select('*').eq('id', communityid).single()
    if (error) throw new Error('failed to fetch community data')
    return data as CommunitiesType

  }


  const { data: CommunityData, error: CommunityError } = useQuery({ queryKey: ['communitiesDetails'], queryFn: fetchCommunityDetails })

  return (
    <div className="flex flex-col gap-5">

      <h1 className="text-2xl text-purple-500 ">{CommunityData?.name}</h1>

      <h3 className="text-xl text-gray-200"> {CommunityData?.description}</h3>

      <CommunityPostsList />

    </div>
  )

}
export default CommunityPosts
