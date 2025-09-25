import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import SupabaseClient from "../Instances/SupabaseClient";

interface CommunitiesType {
  id: number,
  created_at: string,
  name: string,
  description: string,


}

const Communities = (): ReactNode => {
  const navigate = useNavigate()
  const fetchCommunities = async (): Promise<CommunitiesType[]> => {
    const { data, error } = await SupabaseClient.from("Communities").select('*').limit(10)
    if (error) throw new Error('failed to fetch Communities')
    return data as CommunitiesType[]

  }
  const { data, error, isPending, isSuccess, isError } = useQuery({ queryFn: fetchCommunities, queryKey: ['communities'] })
  return (
    <div className="flex flex-col text-gray-200 items-center mt-5 gap-5 font-medium">
      {data?.map((community) => {
        return <div onClick={() => navigate(`/community/${community.id}`)} className="p-3 shadow-md shadow-gray-800 rounded-xl w-1/2" key={community.id}>
          <h2 className="text-xl">{community.name}</h2>
          <h3 className="text-sm">{community.description}</h3>
        </div>

      })}

    </div>
  )
}


export default Communities
