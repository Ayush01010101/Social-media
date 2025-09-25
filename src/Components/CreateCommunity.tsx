import type { ReactNode } from "react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import SupabaseClient from "../Instances/SupabaseClient";

interface CreateCommunityType {
  name: string;
  description: string
}
const CreateCommunity: React.FC = (): ReactNode => {


  const [name, Setname] = useState<string>('');
  const [description, setDescription] = useState<string>('')
  const createcommunity = async (CommunityDataOBJ: CreateCommunityType) => {

    if (!CommunityDataOBJ.name || !CommunityDataOBJ.description) {
      throw new Error("Provide name and description")
    }
    const { data, error } = await SupabaseClient.from("Communities").insert({

      name: CommunityDataOBJ.name,
      description: CommunityDataOBJ.description

    })

    if (error) throw new Error('Failed to make community')
    return data;
  }

  const { mutate, data, isError, error, isSuccess, isPending
  } = useMutation({
    mutationFn: createcommunity,

  })
  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !description) {
      throw new Error("Please pass name and description")
    }
    mutate({ name, description })

    Setname('')
    setDescription('')



  }
  console.log(data)
  return (
    <>
      <div className="text-gray-200 ">
        <form className="flex flex-col gap-5" onSubmit={(e) => HandleSubmit(e)}>
          <label >Name</label>
          <input placeholder="enter community name" type='text' onChange={(e: React.ChangeEvent<HTMLInputElement>) => Setname(e.target.value)} />

          <label>description</label>
          <textarea rows={3} className="w-full p-2" placeholder="description" onChange={(e) => setDescription(e.target.value)} />

          <button className="text-purple-600 text-xl font-medium  p-4" type="submit" >Create Community</button>
          {isError && <p className="text-red-500  text-sm"> {error.message}</p>}
        </form >
      </div >
    </>
  )
}

export default CreateCommunity
